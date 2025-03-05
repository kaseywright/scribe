import * as React from "@theia/core/shared/react";
import { useState, useEffect } from 'react';

// Accept the API key and URL as props instead of using context
interface ImageListProps {
    apiKey?: string;
    apiUrl?: string;
    isConfigReady?: boolean;
}

type ResourceImageId = {
    id: number;
}

type ResourceImageList = {
    items: ResourceImageId[]
}

const ImageList: React.FC<ImageListProps> = ({ apiKey, apiUrl, isConfigReady = false }) => {    
    const [imageIds, setImageIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Only fetch images when the config is ready and we have the necessary props
    useEffect(() => {
        let isMounted = true;
        
        // If config isn't ready yet, don't try to fetch
        if (!isConfigReady) {
            return;
        }
        
        async function fetchImages() {
            if (!apiKey) {
                console.error('API key is not provided');
                if (isMounted) {
                    setError('API key is not configured');
                    setLoading(false);
                }
                return;
            }
            
            if (!apiUrl) {
                console.error('API URL is not provided');
                if (isMounted) {
                    setError('API URL is not configured');
                    setLoading(false);
                }
                return;
            }
            
            console.log('Using API URL:', apiUrl);
            console.log('API Key available:', apiKey ? 'Yes' : 'No');
            
            try {
                const response = await fetch(`${apiUrl}/resources/search?BookCode=GEN&ResourceType=Images&api-key=${apiKey}&languageId=1`);
                const data: ResourceImageList = await response.json();
                console.log('API response:', data);
                
                if (isMounted) {
                    setImageIds(data.items.map((item) => item.id));
                    setLoading(false);
                }

                console.log('Images Ids', imageIds);
            } catch (error) {
                console.error('Error fetching images:', error);
                if (isMounted) {
                    setError('Error loading images from API');
                    setLoading(false);
                }
            }
        }

        fetchImages();

        return () => {
            isMounted = false;
        };
    }, [apiKey, apiUrl, isConfigReady]);

    if (!isConfigReady) {
        return <div>Waiting for configuration...</div>;
    }

    if (loading) {
        return <div>Loading images...</div>;
    }
    
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }
    
    if (imageIds.length === 0) {
        return <div>No images found</div>;
    }
    
    return (
        <div>
            hello

            {/* {imageIds.map((image: ImageData) => (
                <div key={image.id || Math.random().toString()}>
                    {image.url && <img src={image.url} alt={image.title || 'Image'} />}
                    {image.title && <p>{image.title}</p>}

                </div>
            ))} */}
        </div>
    );
};

export default ImageList;