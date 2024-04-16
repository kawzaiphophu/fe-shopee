import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/shopee.css';

interface ProductCardProps {
    id: any;
}
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

const ProductCard: React.FC<ProductCardProps> = ({ id }) => {

    const [productDetail, setProductDetail] = useState<Product | null>(null);
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

    return (
        <div key={productDetail?.id} className="col-lg-3 col-md-6 col-sm-12 mb-3 productdiv">
            <div className="card-product text-white position-relative" style={{ height: "20rem" }}>
                <Link to={`/product/${productDetail?.id}`}>
                    <div className="card">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "13rem" }}>
                            <img className="card-img-top p-1 w-100" src={productDetail?.thumbnail} alt="product thumbnail" style={{ maxWidth: "244px", height: "10rem" }} />
                        </div>
                        <div className="card-body">
                            <h6 className="card-title">{productDetail?.title}</h6>
                            <div className='d-flex justify-content-between'>
                                <span className="card-text fs-5 text-dark">{productDetail?.price}$</span>
                                <span className='fs-6 text-danger'> -{productDetail?.discountPercentage}%</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;