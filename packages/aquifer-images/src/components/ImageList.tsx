import * as React from "@theia/core/shared/react";
import { useState, useEffect } from 'react';
import { EnvConfigContext } from '../browser/aquifer-images-widget';

// type Image = {
//     id: string;
//     url: string;
//     title: string;
// }

interface ImageData {
    id: string;
    url: string;
    title: string;
}

const ImageList: React.FC = () => {    
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Use the EnvConfigContext to get the service
    const envConfigService = React.useContext(EnvConfigContext);

    useEffect(() => {
        let mounted = true;
        
        const fetchImages = async () => {
            try {
                // If we don't have the service, show a message
                if (!envConfigService) {
                    console.error('EnvConfigService not available');
                    setError('Configuration service not available');
                    setLoading(false);
                    return;
                }
                
                // Use try/catch for each async call
                let apiKey: string;
                let apiUrl: string;
                
                try {
                    apiKey = await envConfigService.getApiKey();
                    apiUrl = await envConfigService.getApiUrl();
                } catch (err) {
                    console.error('Error getting API configuration:', err);
                    setError('Error loading API configuration');
                    setLoading(false);
                    return;
                }
                
                if (!apiKey) {
                    console.error('API key is empty');
                    setError('API key is not configured');
                    setLoading(false);
                    return;
                }
                
                console.log('Using API URL:', apiUrl);
                console.log('API Key available:', apiKey ? 'Yes' : 'No');
                
                try {
                    const response = await fetch(`${apiUrl}/resources/search?BookCode=GEN&ResourceType=Images&api-key=${apiKey}&languageId=1`);
                    
                    const data = await response.json();
                    console.log('API response:', data);
                    
                    if (mounted) {
                        setImages(Array.isArray(data) ? data : []);
                        setLoading(false);
                    }
                } catch (fetchError) {
                    console.error('Error fetching images:', fetchError);
                    if (mounted) {
                        setError('Error loading images from API');
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                if (mounted) {
                    setError('An unexpected error occurred');
                    setLoading(false);
                }
            }
        };

        fetchImages();

        return () => {
            mounted = false;
        };
    }, [envConfigService]);

    if (loading) {
        return <div>Loading images...</div>;
    }
    
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }
    
    if (images.length === 0) {
        return <div>No images found</div>;
    }
    
    return (
        <div>

            {images.map((image: ImageData) => (
                <div key={image.id || Math.random().toString()}>
                    {image.url && <img src={image.url} alt={image.title || 'Image'} />}
                    {image.title && <p>{image.title}</p>}

                </div>
            ))}
        </div>
    );
};

export default ImageList;