import * as React from "@theia/core/shared/react";
import { useState, useEffect, useCallback, useRef } from 'react';

// Inline styles for the component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '100%',
        padding: '10px'
    },
    searchControls: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
        marginBottom: '15px',
        width: '100%'
    },
    modeToggle: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '5px'
    },
    toggleButton: {
        padding: '6px 12px',
        borderRadius: '4px',
        border: '1px solid var(--theia-button-border, #ccc)',
        backgroundColor: 'var(--theia-button-background, #f5f5f5)',
        color: 'var(--theia-button-foreground, #333)',
        cursor: 'pointer',
        fontSize: '12px',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    toggleButtonActive: {
        backgroundColor: 'var(--theia-successBackground, #007ACC)',
        borderColor: 'var(--theia-successBorder, #d6e9c6)'
    },
    toggleButtonInactive: {
        backgroundColor: 'var(--theia-button-background, #0b5ed7)',
        borderColor: 'var(--theia-button-border, #0a58ca)',
        color: 'var(--theia-button-foreground, #fff)'
    },
    searchInputContainer: {
        display: 'flex',
        width: '100%',
        gap: '5px'
    },
    searchInput: {
        flex: 1,
        padding: '8px 10px',
        borderRadius: '4px',
        border: '1px solid var(--theia-input-border, #ccc)',
        backgroundColor: 'var(--theia-input-background, #fff)',
        color: 'var(--theia-input-foreground, #333)',
        fontSize: '14px'
    },
    searchButton: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid var(--theia-button-border, #ccc)',
        backgroundColor: 'var(--theia-button-background, #f5f5f5)',
        color: 'var(--theia-button-foreground, #333)',
        cursor: 'pointer'
    },
    bookSelector: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%'
    },
    bookSelect: {
        flex: 1,
        padding: '6px 10px',
        borderRadius: '4px',
        border: '1px solid var(--theia-dropdown-border, #ccc)',
        backgroundColor: 'var(--theia-dropdown-background, #fff)',
        color: 'var(--theia-dropdown-foreground, #333)',
        fontSize: '14px'
    },
    refreshButton: {
        padding: '6px 12px',
        borderRadius: '4px',
        border: '1px solid var(--theia-button-border, #ccc)',
        backgroundColor: 'var(--theia-button-background, #f5f5f5)',
        color: 'var(--theia-button-foreground, #333)',
        cursor: 'pointer'
    },
    loading: {
        padding: '15px',
        textAlign: 'center' as const,
        color: 'var(--theia-foreground, #333)',
        fontStyle: 'italic'
    },
    errorMessage: {
        padding: '15px',
        textAlign: 'center' as const,
        color: 'var(--theia-errorForeground, #a94442)',
        backgroundColor: 'var(--theia-errorBackground, #f2dede)',
        borderRadius: '4px',
        margin: '10px 0'
    },
    noImages: {
        padding: '20px',
        textAlign: 'center' as const,
        color: 'var(--theia-descriptionForeground, #666)',
        fontStyle: 'italic',
        backgroundColor: 'var(--theia-editorWidget-background, #f5f5f5)',
        borderRadius: '4px',
        margin: '10px 0'
    },
    imageGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '15px',
        width: '100%'
    },
    imageItem: {
        border: '1px solid var(--theia-border, #ddd)',
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'transform 0.2s ease'
    },
    clickableImage: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover' as const,
        cursor: 'pointer',
        display: 'block'
    },
    imageCaption: {
        padding: '5px',
        fontSize: '12px',
        textAlign: 'center' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
        backgroundColor: 'var(--theia-editor-background, #f8f8f8)',
        color: 'var(--theia-foreground, #333)',
        borderTop: '1px solid var(--theia-border, #ddd)'
    },
    paginationControls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15px 0',
        gap: '10px'
    },
    paginationButton: {
        padding: '5px 10px',
        backgroundColor: 'var(--theia-button-background, #f5f5f5)',
        color: 'var(--theia-button-foreground, #333)',
        border: '1px solid var(--theia-button-border, #ccc)',
        borderRadius: '3px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '12px'
    },
    paginationInfo: {
        padding: '0 10px',
        color: 'var(--theia-foreground, #333)',
        fontSize: '12px'
    }
};

// Accept the API key and URL as props instead of using context
interface ImageListProps {
    apiKey?: string;
    apiUrl?: string;
    isConfigReady?: boolean;
    onImageClick?: (image: ResourceImage, bookCode: string) => void;
}

type BibleBookImageList = {
    items: ResourceContentImage[];
    offset: number;
    returnedItemCount: number;
    totalItemCount: number;
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
    // Old Testament
    { code: 'GEN', name: 'Genesis' },
    { code: 'EXO', name: 'Exodus' },
    { code: 'LEV', name: 'Leviticus' },
    { code: 'NUM', name: 'Numbers' },
    { code: 'DEU', name: 'Deuteronomy' },
    { code: 'JOS', name: 'Joshua' },
    { code: 'JDG', name: 'Judges' },
    { code: 'RUT', name: 'Ruth' },
    { code: '1SA', name: '1 Samuel' },
    { code: '2SA', name: '2 Samuel' },
    { code: '1KI', name: '1 Kings' },
    { code: '2KI', name: '2 Kings' },
    { code: '1CH', name: '1 Chronicles' },
    { code: '2CH', name: '2 Chronicles' },
    { code: 'EZR', name: 'Ezra' },
    { code: 'NEH', name: 'Nehemiah' },
    { code: 'EST', name: 'Esther' },
    { code: 'JOB', name: 'Job' },
    { code: 'PSA', name: 'Psalms' },
    { code: 'PRO', name: 'Proverbs' },
    { code: 'ECC', name: 'Ecclesiastes' },
    { code: 'SNG', name: 'Song of Solomon' },
    { code: 'ISA', name: 'Isaiah' },
    { code: 'JER', name: 'Jeremiah' },
    { code: 'LAM', name: 'Lamentations' },
    { code: 'EZK', name: 'Ezekiel' },
    { code: 'DAN', name: 'Daniel' },
    { code: 'HOS', name: 'Hosea' },
    { code: 'JOL', name: 'Joel' },
    { code: 'AMO', name: 'Amos' },
    { code: 'OBA', name: 'Obadiah' },
    { code: 'JON', name: 'Jonah' },
    { code: 'MIC', name: 'Micah' },
    { code: 'NAM', name: 'Nahum' },
    { code: 'HAB', name: 'Habakkuk' },
    { code: 'ZEP', name: 'Zephaniah' },
    { code: 'HAG', name: 'Haggai' },
    { code: 'ZEC', name: 'Zechariah' },
    { code: 'MAL', name: 'Malachi' },
    // New Testament
    { code: 'MAT', name: 'Matthew' },
    { code: 'MRK', name: 'Mark' },
    { code: 'LUK', name: 'Luke' },
    { code: 'JHN', name: 'John' },
    { code: 'ACT', name: 'Acts' },
    { code: 'ROM', name: 'Romans' },
    { code: '1CO', name: '1 Corinthians' },
    { code: '2CO', name: '2 Corinthians' },
    { code: 'GAL', name: 'Galatians' },
    { code: 'EPH', name: 'Ephesians' },
    { code: 'PHP', name: 'Philippians' },
    { code: 'COL', name: 'Colossians' },
    { code: '1TH', name: '1 Thessalonians' },
    { code: '2TH', name: '2 Thessalonians' },
    { code: '1TI', name: '1 Timothy' },
    { code: '2TI', name: '2 Timothy' },
    { code: 'TIT', name: 'Titus' },
    { code: 'PHM', name: 'Philemon' },
    { code: 'HEB', name: 'Hebrews' },
    { code: 'JAS', name: 'James' },
    { code: '1PE', name: '1 Peter' },
    { code: '2PE', name: '2 Peter' },
    { code: '1JN', name: '1 John' },
    { code: '2JN', name: '2 John' },
    { code: '3JN', name: '3 John' },
    { code: 'JUD', name: 'Jude' },
    { code: 'REV', name: 'Revelation' }
];

// Helper function to highlight matching text in image names
const highlightMatchingText = (text: string, query: string): React.ReactNode => {
    if (!query || query.length < 3 || !text) {
        return text;
    }
    
    // Case insensitive search
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    // If no match, return the original text
    if (lowerText.indexOf(lowerQuery) === -1) {
        return text;
    }
    
    const parts = [];
    let lastIndex = 0;
    let index = lowerText.indexOf(lowerQuery, lastIndex);
    
    while (index !== -1) {
        // Add the text before the match
        if (index > lastIndex) {
            parts.push(text.substring(lastIndex, index));
        }
        
        // Add the matched text with bold styling
        const matchedText = text.substring(index, index + query.length);
        parts.push(<span key={index} style={{ fontWeight: 'bold' }}>{matchedText}</span>);
        
        // Update indices
        lastIndex = index + query.length;
        index = lowerText.indexOf(lowerQuery, lastIndex);
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    
    return <>{parts}</>;
};

const ImageList: React.FC<ImageListProps> = ({ apiKey, apiUrl, isConfigReady = false, onImageClick }) => {
    const [images, setImages] = useState<ResourceImageList>({
        items: []
    });
    const [imageIds, setImageIds] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedBook, setSelectedBook] = useState<string>('GEN');
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchEnabled, setSearchEnabled] = useState<boolean>(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const itemsPerPage = 10; // Number of items per page

    // Function to fetch images for the selected book or search query
    const fetchImagesForBook = useCallback(async () => {
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
            
            // Calculate offset based on current page
            const offset = (currentPage - 1) * itemsPerPage;
            console.log(`Offset: ${offset}`, `Current Page: ${currentPage}`, `Items per page: ${itemsPerPage}`);
            
            // Build the query URL based on whether search is enabled
            let queryUrl = `${apiUrl}/resources/search?ResourceType=Images&api-key=${apiKey}&languageId=1&offset=${offset}&count=${itemsPerPage}`;
            
            // Add book code if search is not enabled
            if (!searchEnabled) {
                queryUrl += `&BookCode=${selectedBook}`;
            } 
            // Add search query if search is enabled and query is valid
            else if (searchQuery && searchQuery.length >= 3) {
                queryUrl += `&query=${encodeURIComponent(searchQuery)}`;
                console.log(`Searching for: ${searchQuery}`);
            } else {
                setLoading(false);
                setError('Search query must be at least 3 characters');
                // Don't clear images if we already have results
                // This allows users to see previous results while typing
                return;
            }
            
            const response = await fetch(queryUrl);
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data: BibleBookImageList = await response.json();
            console.log('API response:', data);
            
            // Update pagination information
            if (data.totalItemCount !== undefined) {
                setTotalItems(data.totalItemCount);
                setTotalPages(Math.ceil(data.totalItemCount / itemsPerPage));
            } else {
                // Fallback if API doesn't return pagination info
                setTotalItems(data.items?.length || 0);
                setTotalPages(1);
            }
            
            if (data.items && data.items.length > 0) {
                setImageIds(data.items.map((item) => item.id));
            } else {
                setLoading(false);
                console.log('No images found');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setError('Error loading images from API');
            setLoading(false);
        }
    }, [apiKey, apiUrl, isConfigReady, searchEnabled, searchQuery, selectedBook, currentPage, itemsPerPage]);

    // Fetch images when the selected book changes, search query changes, or when config becomes ready
    useEffect(() => {
        // Only fetch if we have a valid search query or search is disabled
        if (!searchEnabled || (searchQuery && searchQuery.length >= 3)) {
            fetchImagesForBook();
        }
    }, [selectedBook, apiKey, apiUrl, isConfigReady, searchEnabled, searchQuery, currentPage]);

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
    
    // Memoized version of fetchImagesForBook
    const fetchImagesForBookMemoized = useCallback(async () => {
        await fetchImagesForBook();
    }, [fetchImagesForBook, selectedBook, searchQuery, searchEnabled]);

    // Handle book selection change
    const handleBookChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBook(event.target.value);
        setCurrentPage(1); // Reset to first page when changing books
        setSearchEnabled(false); // Disable search when book is selected
        // Fetch images for the newly selected book
        setTimeout(() => fetchImagesForBook(), 0);
    };
    
    // Handle search query change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page when changing search query
        // Clear error when user is typing
        if (error) {
            setError(null);
        }
    };
    
    // Use a ref to store the timeout ID
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Effect for debounced search
    useEffect(() => {
        // Clear any existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        // Only set a new timeout if search is enabled and query is valid
        if (searchEnabled && searchQuery.length >= 3) {
            searchTimeoutRef.current = setTimeout(() => {
                fetchImagesForBookMemoized();
            }, 500); // 500ms debounce delay
        }
        
        // Cleanup function to clear timeout when component unmounts or dependencies change
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery, searchEnabled, fetchImagesForBookMemoized]);
    
    // Toggle between book selection and search
    const toggleSearchMode = () => {
        setSearchEnabled(!searchEnabled);
        // Reset pagination when toggling modes
        setCurrentPage(1);
        if (!searchEnabled) {
            // If enabling search, clear any previous results
            setImages({ items: [] });
            setImageIds([]);
        } else {
            // If disabling search, fetch by book
            fetchImagesForBook();
        }
    };
    
    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            console.log(`Page change: ${newPage}`);
            setCurrentPage(newPage);
            setLoading(true);
            fetchImagesForBook();
        }
    };

    if (!isConfigReady) {
        return <div>Waiting for configuration...</div>;
    }

    // Show error as a notification but don't replace the entire component
    const errorNotification = error ? (
        <div style={styles.errorMessage}>Error: {error}</div>
    ) : null;

    return (
        <div style={styles.container}>
            {errorNotification}
            <div style={styles.searchControls}>
                <div style={styles.modeToggle}>
                    <button 
                        onClick={toggleSearchMode} 
                        style={{
                            ...styles.toggleButton,
                            ...(searchEnabled ? styles.toggleButtonActive : styles.toggleButtonInactive)
                        }}
                        title={searchEnabled ? 'Switch to book selection' : 'Switch to search'}
                    >
                        {searchEnabled ? 
                            <><i className="fa fa-book" aria-hidden="true"></i> Browse by Book</> : 
                            <><i className="fa fa-search" aria-hidden="true"></i> Search Images</>}
                    </button>
                </div>
                
                {searchEnabled ? (
                    <div style={styles.searchInputContainer}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search images (min 3 characters)"
                            style={styles.searchInput}
                            minLength={3}
                        />
                        <button 
                            onClick={() => {
                                if (searchQuery.length >= 3) {
                                    setError(null); // Clear any previous errors
                                    fetchImagesForBookMemoized();
                                } else if (searchQuery.length > 0) {
                                    setError('Search query must be at least 3 characters');
                                }
                            }} 
                            style={{
                                ...styles.searchButton,
                                opacity: (loading || searchQuery.length < 3) ? 0.6 : 1,
                                cursor: (loading || searchQuery.length < 3) ? 'not-allowed' : 'pointer'
                            }}
                            disabled={loading || searchQuery.length < 3}
                            title="Search images"
                        >
                            {loading ? 
                                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : 
                                <i className="fa fa-search" aria-hidden="true"></i>}
                        </button>
                    </div>
                ) : (
                    <div style={styles.bookSelector}>
                        <label htmlFor="book-select">Select a Book: </label>
                        <select 
                            id="book-select" 
                            value={selectedBook} 
                            onChange={handleBookChange}
                            style={styles.bookSelect}
                        >
                            {AVAILABLE_BOOKS.map(book => (
                                <option key={book.code} value={book.code}>
                                    {book.name}
                                </option>
                            ))}
                        </select>
                        <button 
                            onClick={() => fetchImagesForBookMemoized()} 
                            style={{
                                ...styles.refreshButton,
                                opacity: loading ? 0.6 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                            disabled={loading}
                            title="Refresh images"
                        >
                            {loading ? <i className="fa fa-refresh fa-spin" aria-hidden="true"></i> : <i className="fa fa-refresh" aria-hidden="true"></i>}
                        </button>
                    </div>
                )}
            </div>
            
            {loading && <div style={styles.loading}>Loading images...</div>}
            
            {!loading && images.items.length === 0 && (
                <div style={styles.noImages}>
                    {searchEnabled 
                        ? searchQuery.length >= 3 
                            ? `No images found for search: "${searchQuery}"` 
                            : 'Enter at least 3 characters to search'
                        : `No images found for ${AVAILABLE_BOOKS.find(b => b.code === selectedBook)?.name || selectedBook}`
                    }
                </div>
            )}
            
            {/* Pagination controls */}
            {totalPages > 1 && (
                <div style={styles.paginationControls}>
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                        style={{
                            ...styles.paginationButton,
                            opacity: (currentPage === 1 || loading) ? 0.5 : 1,
                            cursor: (currentPage === 1 || loading) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <i className="fa fa-chevron-left" aria-hidden="true"></i> Previous
                    </button>
                    
                    <span style={styles.paginationInfo}>
                        Page {currentPage} of {totalPages} ({totalItems} images)
                    </span>
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || loading}
                        style={{
                            ...styles.paginationButton,
                            opacity: (currentPage === totalPages || loading) ? 0.5 : 1,
                            cursor: (currentPage === totalPages || loading) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </div>
            )}
            
            <div style={styles.imageGrid}>
                {images.items.map((image) => (
                    <div 
                        key={image.id || Math.random().toString()} 
                        style={styles.imageItem}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <img 
                            src={image.url} 
                            alt={`Image from ${selectedBook}`} 
                            onClick={() => onImageClick && onImageClick(image, selectedBook)}
                            style={styles.clickableImage}
                            title="Click to open in editor"
                        />
                        <div style={styles.imageCaption}>
                            {searchEnabled && searchQuery.length >= 3 
                                ? highlightMatchingText(image.name, searchQuery)
                                : image.name
                            }
                        </div>
                    </div>
                ))}
            </div>

                        {/* Pagination controls */}
                        {totalPages > 1 && (
                <div style={styles.paginationControls}>
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                        style={{
                            ...styles.paginationButton,
                            opacity: (currentPage === 1 || loading) ? 0.5 : 1,
                            cursor: (currentPage === 1 || loading) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <i className="fa fa-chevron-left" aria-hidden="true"></i> Previous
                    </button>
                    
                    <span style={styles.paginationInfo}>
                        Page {currentPage} of {totalPages} ({totalItems} images)
                    </span>
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || loading}
                        style={{
                            ...styles.paginationButton,
                            opacity: (currentPage === totalPages || loading) ? 0.5 : 1,
                            cursor: (currentPage === totalPages || loading) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </div>
            )}
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
                .pagination-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 15px 0;
                    padding: 8px 0;
                    border-top: 1px solid var(--theia-border);
                    border-bottom: 1px solid var(--theia-border);
                }
                .pagination-button {
                    background-color: var(--theia-button-background);
                    color: var(--theia-button-foreground);
                    border: none;
                    border-radius: 3px;
                    padding: 6px 12px;
                    font-size: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    transition: background-color 0.2s;
                }
                .pagination-button:hover:not(:disabled) {
                    background-color: var(--theia-button-hoverBackground);
                }
                .pagination-info {
                    font-size: 12px;
                    color: var(--theia-foreground);
                }
            `}</style>
        </div>
    );
};

export default ImageList;