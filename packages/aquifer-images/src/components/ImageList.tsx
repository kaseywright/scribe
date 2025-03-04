import * as React from "@theia/core/shared/react";
import { useState, useEffect } from 'react';

const ImageList: React.FC = () => {    
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    //todo: some sort of environment vars or config file for these...
    let api_key="foo"
    let api_base_url="http://bar"
    let bibleBookCode="GEN"

    let fetchImageIdsUrl = `${api_base_url}/resources/search?BookCode=${bibleBookCode}&ResourceType=Images&api-key=${api_key}`


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`${fetchImageIdsUrl}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                const data = await response.json();
                console.log(data);
                setImages(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            {images && images.map((image: any) => (
                <div key={image.id}>
                    <img src={image.url} alt={image.title} />
                    <p>{image.title}</p>
                </div>
            ))}
        </div>
    );
};

export default ImageList;