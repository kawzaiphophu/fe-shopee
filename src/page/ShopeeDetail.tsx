import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ShopeeDetail.css'


interface Product {
    id: string;
    images: string[];
    discountPercentage: string;
    title: string;
    price: number;
    description: string;
    brand: string;
}

const ShopeeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [productDetail, setProductDetail] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
                setProductDetail(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        if (id) {
            fetchProductDetail();
        }
    }, [id]);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    return (
        <div className='container-fluid'>
            <h1 className='d-flex justify-content-center'>Shopee Detail</h1>
            {productDetail ? (
                <div className='details-box'>
                    <div className='grid w-100'>
                        <div className='big-image'>
                            <div className='image-container' style={{ position: 'relative', display: 'flex' }}>
                                <img
                                    src={selectedImage || productDetail.images[0]}
                                    alt="Selected Image"
                                    className="main-image"
                                />
                                <div className='discount-banner'>-{productDetail.discountPercentage}%</div>
                            </div>
                        </div>
                        <div className="mini-images">
                            {productDetail.images.slice(1).map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Image ${index}`}
                                    onClick={() => handleImageClick(img)}
                                    className="mini-image"
                                />
                            ))}
                        </div>
                    </div>
                    <div className='w-100 container p-5'>
                        <h1>{productDetail.title}</h1>
                        <h3>{productDetail.price} $</h3>
                        <p>
                            brand: {productDetail.brand} <br />
                            Detail: {productDetail.description}
                        </p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ShopeeDetail;
