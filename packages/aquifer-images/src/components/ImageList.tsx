import * as React from "@theia/core/shared/react";
import { useState, useEffect } from 'react';

// Accept the API key and URL as props instead of using context
interface ImageListProps {
    apiKey?: string;
    apiUrl?: string;
    isConfigReady?: boolean;
    onImageClick?: (image: ResourceImage, bookCode: string) => void;
}

type BibleBookImageList = {
    items: ResourceContentImage[]
}

type ResourceContentImage = {
    id: number;
    name: string;
    localizedName: string;
    mediaType: string;
    languageCode: string;
    // grouping (if wanted)
}

type ResourceImageList = {
    items: ResourceImage[]
}

export type ResourceImage = {
    id: number;
    name: string;
    url: string;
}

// List of available books
const AVAILABLE_BOOKS = [
    { code: 'GEN', name: 'Genesis' },
    { code: 'EXO', name: 'Exodus' },
    { code: 'LEV', name: 'Leviticus' },
    { code: 'NUM', name: 'Numbers' },
    { code: 'DEU', name: 'Deuteronomy' },
    { code: 'MAT', name: 'Matthew' },
    { code: 'MRK', name: 'Mark' },
    { code: 'LUK', name: 'Luke' },
    { code: 'JHN', name: 'John' },
    { code: 'REV', name: 'Revelation' }
];

const ImageList: React.FC<ImageListProps> = ({ apiKey, apiUrl, isConfigReady = false, onImageClick }) => {
    const [images, setImages] = useState<ResourceImageList>({
        items: []
    });
    const [imageIds, setImageIds] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedBook, setSelectedBook] = useState<string>('GEN');
    const [loading, setLoading] = useState<boolean>(false);

    // Function to fetch images for the selected book
    const fetchImagesForBook = async () => {
        if (!isConfigReady || !apiKey || !apiUrl) {
            return;
        }
        
        setLoading(true);
        setImages({ items: [] });
        setImageIds([]);
        setError(null);
        
        try {
            console.log(`Fetching images for book: ${selectedBook}`);
            console.log('Using API URL:', apiUrl);
            console.log('API Key available:', apiKey ? 'Yes' : 'No');
            
            const response = await fetch(`${apiUrl}/resources/search?BookCode=${selectedBook}&ResourceType=Images&api-key=${apiKey}&languageId=1`);
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data: BibleBookImageList = await response.json();
            console.log('API response:', data.items);
            
            if (data.items && data.items.length > 0) {
                setImageIds(data.items.map((item) => item.id));
            } else {
                setLoading(false);
                console.log('No images found for this book');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setError('Error loading images from API');
            setLoading(false);
        }
    };
    
    // Fetch images when the selected book changes or when config becomes ready
    useEffect(() => {
        fetchImagesForBook();
    }, [selectedBook, apiKey, apiUrl, isConfigReady]);

    // Fetch image URLs when we have image IDs
    useEffect(() => {
        if (!isConfigReady || !apiKey || !apiUrl || imageIds.length === 0) {
            return;
        }
        
        const fetchImages = async () => {
            try {
                console.log("Fetching URLs for image IDs:", imageIds);
                
                // Clear existing URLs
                setImages({ items: [] });
                
                // Create an array of promises for all fetch requests
                const promises = imageIds.map(async id => {
                    const resp = await fetch(`${apiUrl}/resources/${id}?api-key=${apiKey}`);
                    if (!resp.ok) {
                        throw new Error(`Failed to fetch image ${id}`);
                    }
                    const respData = await resp.json();
                    console.log("Image data for ID", id, ":", respData);
                    return {
                        id: respData.id,
                        name: respData.name,
                        url: respData.content?.url
                    };
                });
                
                // Wait for all promises to resolve
                const results = await Promise.all(promises);
                
                // Filter out any undefined URLs
                const validImages = results.filter(item => item?.url);
                setImages({ items: validImages });
                setLoading(false);
                
                console.log("Loaded Valid images:", validImages);
            } catch (error) {
                console.error('Error fetching URLs:', error);
                setError('Error loading image URLs from API');
                setLoading(false);
            }
        };
        
        fetchImages();
    }, [apiKey, apiUrl, isConfigReady, imageIds]);

    // Handle book selection change
    const handleBookChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBook(event.target.value);
    };

    if (!isConfigReady) {
        return <div>Waiting for configuration...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="image-list-container">
            <div className="book-selector">
                <label htmlFor="book-select">Select a Book: </label>
                <select 
                    id="book-select" 
                    value={selectedBook} 
                    onChange={handleBookChange}
                    className="book-select"
                >
                    {AVAILABLE_BOOKS.map(book => (
                        <option key={book.code} value={book.code}>
                            {book.name}
                        </option>
                    ))}
                </select>
                <button 
                    onClick={fetchImagesForBook} 
                    className="refresh-button"
                    disabled={loading}
                    title="Refresh images"
                >
                    {loading ? <i className="fa fa-refresh fa-spin" aria-hidden="true"></i> : <i className="fa fa-refresh" aria-hidden="true"></i>}
                </button>
            </div>
            
            {loading && <div className="loading">Loading images...</div>}
            
            {!loading && images.items.length === 0 && (
                <div className="no-images">No images found for {AVAILABLE_BOOKS.find(b => b.code === selectedBook)?.name || selectedBook}</div>
            )}
            
            <div className="image-grid">
                {images.items.map((image) => (
                    <div key={image.id || Math.random().toString()} className="image-item">
                        <img 
                            src={image.url} 
                            alt={`Image from ${selectedBook}`} 
                            onClick={() => onImageClick && onImageClick(image, selectedBook)}
                            className="clickable-image"
                            title="Click to open in editor"
                        />
                    </div>
                ))}
            </div>
            <style>{`
                .image-list-container {
                    padding: 10px;
                    font-family: var(--theia-ui-font-family);
                }
                .book-selector {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .book-select {
                    padding: 5px;
                    border-radius: 3px;
                    background-color: var(--theia-dropdown-background);
                    color: var(--theia-dropdown-foreground);
                    border: 1px solid var(--theia-dropdown-border);
                }
                .refresh-button {
                    padding: 5px 10px;
                    background-color: var(--theia-button-background);
                    color: var(--theia-button-foreground);
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                }
                .refresh-button:hover {
                    background-color: var(--theia-button-hoverBackground);
                }
                .refresh-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .loading, .no-images, .error-message {
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 3px;
                }
                .loading {
                    background-color: var(--theia-infoBackground);
                    color: var(--theia-infoForeground);
                }
                .no-images {
                    background-color: var(--theia-editorWarningBackground);
                    color: var(--theia-editorWarningForeground);
                }
                .error-message {
                    background-color: var(--theia-errorBackground);
                    color: var(--theia-errorForeground);
                }
                .image-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 15px;
                    margin-top: 15px;
                }
                .image-item {
                    border: 1px solid var(--theia-border);
                    border-radius: 4px;
                    overflow: hidden;
                    background-color: var(--theia-editor-background);
                }
                .clickable-image {
                    width: 100%;
                    height: auto;
                    display: block;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }
                .clickable-image:hover {
                    transform: scale(1.02);
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </div>
    );
};

export default ImageList;