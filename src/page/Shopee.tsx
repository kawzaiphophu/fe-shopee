import React, { useEffect, useState } from 'react';
import { categories } from '../data/shopee';
import Loading from './Loading';
import axios from 'axios';
import '../css/shopee.css';
import { Link } from 'react-router-dom';

interface Product {
    id: string;
    thumbnail: string;
    title: string;
    price: number;
    discountPercentage: number;
}

function Shopee() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<string>("0");
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://dummyjson.com/products?limit=100`);
            setProduct(response.data.products);
            setIsLoading(false);
        } catch (err) {
            console.log("Error fetching products:", err);
            setIsLoading(false);t
        }
    };

    const searchByType = async (filterType: string) => {
        try {
            if (filterType !== "ALL-Product") {
                setIsLoading(true);
                const response = await axios.get(`https://dummyjson.com/products/category/${filterType}`);
                setProduct(response.data.products);
                setIsLoading(false);
            } else {
                fetchProducts();
            }
        } catch (error) {
            console.log("Error fetching products by type:", error);
            setIsLoading(false);
        }
    };

    const searchByName = async (x: string | undefined | null) => {
        if (x && x.trim() !== "") {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://dummyjson.com/products/search?q=${x}`);
                setProduct(response.data.products);
                setIsLoading(false);
            } catch (error) {
                console.log("Error fetching products by name:", error);
                setIsLoading(false);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchByName(searchTerm);
        }
    };

    return (
        <div className={`container w-100 h-100 py-5 my-5 productdiv`}>
            <div className='d-flex justify-content-center' style={{ textAlign: 'center' }} >
                <h1 className='btn head ' onClick={() => { fetchProducts(); setFilterType("0"); setSearchTerm(null); }}>Shopee</h1>
            </div>
            <div className="my-3 d-flex justify-content-between">
                <div className="input-group ">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Product By Name"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="btn btn-light me-2 w-25"
                        type="button"
                        id="button-addon2"
                        onClick={() => searchByName(searchTerm)}
                    >
                        Search
                    </button>
                </div>
                <select
                    className="form-select"
                    value={filterType}
                    onChange={(e) => { setIsLoading(true); setFilterType(e.target.value); searchByType(e.target.value); }}
                >
                    {categories.map((type, index) => (
                        <option value={type} key={index}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="row">
                {isLoading ? (
                    <>
                        {[...Array(24)].map((_, index) => (
                            <div key={index} className='col-6 col-sm-6 col-md-4 col-lg-3 mb-4 '>
                                <div className="card loading">
                                    <div className="card-body" style={{ height: "300px" }}>
                                        <Loading />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    product.map((product) => (
                        <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card-product text-white position-relative" style={{ height: "22rem" }}>
                                <Link to={`/product/${product.id}`}>
                                    <div className="card">
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "16rem" }}>
                                            <img className="card-img-top p-2 w-100" src={product.thumbnail} alt="" style={{ width: "auto", height: "200px" }} />
                                        </div>
                                        <div className="card-body">
                                        <h6 className="card-title">{product.title}</h6>
                                            <div className='d-flex justify-content-between'>
                                                <span className="card-text fs-5 text-dark">{product.price} $
                                                    <span className='fs-6 text-danger'> -{product.discountPercentage}%</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Shopee;
