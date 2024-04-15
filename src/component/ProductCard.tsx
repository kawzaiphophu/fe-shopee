import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: string;
    thumbnail: string;
    title: string;
    price: number;
    discountPercentage: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, thumbnail, title, price, discountPercentage }) => {
    return (
        <Link to={`/product/${id}`}>
            <div className="card">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "13rem" }}>
                    <img className="card-img-top p-1 w-100" src={thumbnail} alt="" style={{ maxWidth: "244px", height: "10rem" }} />
                </div>
                <div className="card-body">
                    <h6 className="card-title">{title}</h6>
                    <div className='d-flex justify-content-between'>
                        <span className="card-text fs-5 text-dark">{price}$</span>
                        <span className='fs-6 text-danger'> -{discountPercentage}%</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;