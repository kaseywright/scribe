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
    const [urls, setUrls] = useState<string[]>([]);
    const [imageIds, setImageIds] = useState<number[]>([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Only fetch images when the config is ready and we have the necessary props
    useEffect(() => {        
        
        // If config isn't ready yet, don't try to fetch
        if (!isConfigReady) {
            return;
        }
        
        async function fetchImages() {
            if (!apiKey) {
                console.error('API key is not provided');
                    setError('API key is not configured');
                    // setLoading(false);

                return;
            }
            
            if (!apiUrl) {
                console.error('API URL is not provided');
                    setError('API URL is not configured');
                    // setLoading(false);
                
                return;
            }
            
            console.log('Using API URL:', apiUrl);
            console.log('API Key available:', apiKey ? 'Yes' : 'No');
            
            try {
                const response = await fetch(`${apiUrl}/resources/search?BookCode=GEN&ResourceType=Images&api-key=${apiKey}&languageId=1`);
                const data: ResourceImageList = await response.json();
                console.log('API response:', data);

                setImageIds(data.items.map((item) => item.id));

                
                    console.log('Images Ids', imageIds);
                
                
            } catch (error) {
                console.error('Error fetching images:', error);
                
                    setError('Error loading images from API');
                    // setLoading(false); 
            }
        }

        fetchImages();

    }, [apiKey, apiUrl, isConfigReady]);


    useEffect(() => {
        // let isMounted = true;
        // If config isn't ready yet, don't try to fetch
        if (!isConfigReady) {
            return;
        }
        async function fetchImageUrls() {
            try {

                    var urls:string[] = [];
                    imageIds.map(async id => {
                        const resp = await fetch(`${apiUrl}/resources/${id}?api-key=${apiKey}`);
                        const respData = await resp.json();
                        urls.push(respData.content?.url);
                    });
                
                        setUrls(urls);
                        // setLoading(false);


                        console.log('Images Urls', urls);

            } catch (error) {
                console.error('Error fetching url:', error);
                
                    setError('Error loading urls from API');
                    // setLoading(false);
            }
        }
        if(imageIds.length > 0){
            fetchImageUrls();
        }

    }, [apiKey, apiUrl, isConfigReady, imageIds]);
    
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }
    
    return (
        <div>
            {urls?.map((url) => (
                <div key={url || Math.random().toString()}>
                    <img src={url} />
                </div>
            ))}
        </div>
    );
};

export default ImageList;