import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ShopeeDetail.css';

interface Product {
    id: string;
    images: string[];
    discountPercentage: string;
    title: string;
    price: number;
    description: string;
    thumbnail:string;
    brand: string;
    rating: number;
    stock: number;
    count: number;
}

interface ShopeeDetailProps {
    addToCart: (item: any) => void;
}

function ShopeeDetail({ addToCart }: ShopeeDetailProps) {
    const { id } = useParams<{ id: string }>();
    const [productDetail, setProductDetail] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [count, setCount] = useState<number>(1);

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

    const handleAddToCart = () => {
        if (productDetail) {
            const itemToAdd = {
                id: productDetail.id,
                name: productDetail.title,
                price: productDetail.price,
                quantity: count,
                img:productDetail.thumbnail,
                totle:productDetail.price * count
            };
            addToCart(itemToAdd);
        }
    };

    return (
        <div className='container-fluid p-5'>
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
                        <div className='d-flex justify-content-between'>
                            <h3>{productDetail.price} $</h3>
                            <h3>Rating : {productDetail.rating}</h3>
                        </div>
                        <hr />
                        <h5>
                            <div className='d-flex justify-content-between'>
                                <div> Brand : {productDetail.brand}</div>
                                <div> Stock : {productDetail.stock - count} ea</div>
                            </div>
                            <br />
                            <br />
                            {productDetail.description}
                        </h5>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex flex-row'>
                                <div className={`btn btn-dark m-2 p-3 ${count <= 0 ? 'disabled' : ''}`} onClick={() => setCount(count - 1)}> - </div>
                                <div className='my-5 px-5 fs-2 btn disabled' >{count}</div>
                                <div className={`btn btn-dark m-2 p-3 ${count >= productDetail.stock ? 'disabled' : ''}`} onClick={() => setCount(count + 1)}>+</div>
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='pe-2 fs-4'>Total : {productDetail.price * count} $</div>
                                <div className='btn btn-lg btn-success' onClick={handleAddToCart}>Add To Cart</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ShopeeDetail;
