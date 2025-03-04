import * as React from "@theia/core/shared/react";
import { useState, useEffect } from 'react';

// type Image = {
//     id: string;
//     url: string;
//     title: string;
// }

const ImageList: React.FC = () => {    
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('https://api.aquifer.bible/resources/search?BookCode=GEN&ResourceType=Images&api-key=', {
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