import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ShopeeDetail.css';
import Loading from './Loading';
import ProductCard from '../component/ProductCard';

interface Product {
    id: string;
    images: string[];
    discountPercentage: string;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    brand: string;
    rating: number;
    stock: number;
    count: number;
}

interface ShopeeDetailProps {
    addToCart: (item: any) => void;
}


function ShopeeDetail({ addToCart }: Readonly<ShopeeDetailProps>) {
    const { id } = useParams<{ id: any }>();
    const [productDetail, setProductDetail] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [count, setCount] = useState<number>(1);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
                setProductDetail(response.data);
                setSelectedImage(response.data.thumbnail);
                setCount(1);
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
                img: productDetail.thumbnail,
                totle: productDetail.price * count
            };
            addToCart(itemToAdd);
        }
    };

    return (
        <div className='container-fluid'>
            {productDetail ? (
                <div>
                    <div className='details-box py-5'>
                        <div className='grid w-100'>
                            <div className='big-image w-100'>
                                <div className='image-container' style={{ position: 'relative', display: 'flex' }}>
                                    <img
                                        src={selectedImage ?? productDetail.images[0]}
                                        alt="Selected product"
                                        className="main-image"
                                    />
                                    <div className='discount-banner'>-{productDetail.discountPercentage}%</div>
                                </div>
                            </div>
                            <div className="mini-images">
                                {productDetail.images.slice(1).map((img) => (
                                    <img
                                        key={img}
                                        src={img}
                                        alt={`product ${img}`}
                                        onClick={() => handleImageClick(img)}
                                        className="mini-image" />
                                ))}
                            </div>
                        </div>
                        <div className='w-100 container p-5 detaildiv'>
                            <h1>{productDetail.title}</h1>
                            <div className='detail'>
                                <h5>Price : {productDetail.price} $</h5>
                                <h5>Rating : {productDetail.rating}</h5>
                            </div>
                            <hr />
                            <div >
                                <div className=' justify-content-start detail'>
                                    <div> Brand : {productDetail.brand}</div>
                                    <div> Stock : {productDetail.stock - count} ea</div>
                                    <hr />
                                </div>
                                <div> Detail : {productDetail.description}</div>
                            </div>
                            <div className=' d-flex justify-content-between detail py-3'>
                                <div
                                    className='d-flex flex-row'
                                    onKeyDown={(e) => {
                                        if (e.key === "ArrowUp" && count < productDetail.stock) {
                                            setCount(count + 1);
                                        } else if (e.key === "ArrowDown" && count > 0) {
                                            setCount(count - 1);
                                        }
                                    }}
                                    tabIndex={0}
                                >
                                    <div className={`btn btn-sm btn-dark m-2  ${count <= 0 ? 'disabled' : ''}`} onClick={() => setCount(count - 1)}> - </div>
                                    <div className='btn btn-sm disabled' >{count}</div>
                                    <div className={`btn btn-sm btn-dark m-2  ${count >= productDetail.stock ? 'disabled' : ''}`} onClick={() => setCount(count + 1)}>+</div>
                                </div>
                                <div className='d-flex flex-row'>
                                    <div className='pe-2 p-3 '>Total : {productDetail.price * count} $</div>
                                    <button className='btn p-3 btn-sm btn-success' onClick={handleAddToCart}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className='text-center p-5'>Other Product</h2>
                    <div className='row'>
                        <ProductCard id={Number(id) > 2 ? id - 2 : id + 3} />
                        <ProductCard id={Number(id) > 3 ? id - 1 : id + 4} />
                        <ProductCard id={Number(id) + 1} />
                        <ProductCard id={Number(id) + 2} />
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default ShopeeDetail;
