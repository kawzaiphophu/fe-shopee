import { useEffect, useState } from 'react';
import { useParams,Link  } from 'react-router-dom';
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
                img: productDetail.thumbnail,
                totle: productDetail.price * count
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
                            <div className='d-flex flex-row '>
                                <div className={`btn btn-sm btn-dark m-2  ${count <= 0 ? 'disabled' : ''}`} onClick={() => setCount(count - 1)}> - </div>
                                <div className='btn btn-sm disabled' >{count}</div>
                                <div className={`btn btn-sm btn-dark m-2  ${count >= productDetail.stock ? 'disabled' : ''}`} onClick={() => setCount(count + 1)}>+</div>
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='pe-2 p-3 '>Total : {productDetail.price * count} $</div>
                                <div className='btn p-3 btn-sm btn-success ' onClick={handleAddToCart}>Add To Cart</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="card-product text-white position-relative" style={{ height: "20rem" }}>
                                <Link to={`/product/${productDetail.id}`}>
                                    <div className="card">
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "13rem" }}>
                                            <img className="card-img-top p-1 w-100" src={productDetail.thumbnail} alt="" style={{ maxWidth: "244px", height: "10rem" }} />
                                        </div>
                                        <div className="card-body">
                                            <h6 className="card-title">{productDetail.title}</h6>
                                            <div className='d-flex justify-content-between'>
                                                <span className="card-text fs-5 text-dark">{productDetail.price}$</span>
                                                <span className='fs-6 text-danger'> -{productDetail.discountPercentage}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default ShopeeDetail;
