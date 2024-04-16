import { useEffect, useState } from 'react';
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
interface ShopeeProps {
    searchTerm: string | null;
}

const Shopee: React.FC<Readonly<ShopeeProps>> = ({ searchTerm }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product[]>([]);
    const [filterType, setFilterType] = useState<string>("0");

    useEffect(() => {
        if (searchTerm !== null) {
            searchByName(searchTerm);
        } else {
            fetchProducts();
        }
    }, [searchTerm]);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://dummyjson.com/products?limit=100`);
            setProduct(response.data.products);
            setIsLoading(false);
        } catch (err) {
            console.log("Error fetching products:", err);
            setIsLoading(false);
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


    return (
        <div className='container-fluid pt-3'>

            <div className='container d-flex justify-content-center w-100'>
                <div className='w-75 p-1'>
                    <div id="carouselExampleIndicators" className="carousel slide w-100" data-bs-ride="carousel">
                        <div className="carousel-indicators ">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner bg-light w-100" style={{ width: 'auto', height: 'auto', margin: 'auto', marginRight: 'auto', overflow: "hidden" }}>
                            <div className="carousel-item active ">
                                <img src="https://cf.shopee.co.th/file/th-50009109-e9e051ce2920cd210d4ed6dfa8d09b89_xxhdpi" className="d-block w-100" alt="shopee ads" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://cf.shopee.co.th/file/th-50009109-1bd405082103f6fc8b3a8380a91bda56_xxhdpi" className="d-block w-100" alt="shopee ads" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://cf.shopee.co.th/file/th-50009109-88bead437d7beea4edae76abba9af2f0_xxhdpi" className="d-block w-100" alt="shopee ads" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className='w-25 d-flex flex-column gap-1'>
                    <img className='w-100' src="https://cf.shopee.co.th/file/th-50009109-9758a1737bc9f99487152f2f017de248_xhdpi" alt="shopee ads" />
                    <img className='w-100' src="https://cf.shopee.co.th/file/th-50009109-cce213dc0f82af13c5efc841dba843e9_xhdpi" alt="shopee ads" />
                </div>
            </div>
            <div className={`container w-100 h-100 py-5 my-5 productdiv`}>
                <div className='d-flex justify-content-center' style={{ textAlign: 'center' }} >
                    <button
                        className='btn btn-danger head p-3 fs-1 '
                        onClick={() => { fetchProducts(); setFilterType("0"); }}>
                        สินค้าทั้งหมด
                    </button>
                </div>
                <div className="my-3 d-flex justify-content-between">
                    <select
                        className="form-select"
                        value={filterType}
                        onChange={(e) => { setIsLoading(true); setFilterType(e.target.value); searchByType(e.target.value); }}
                    >
                        {categories.map((type) => (
                            <option value={type} key={type}>{type}</option>
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
                            <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
                                <div className="card-product text-white position-relative" style={{ height: "20rem" }}>
                                    <Link to={`/product/${product.id}`}>
                                        <div className="card">
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "13rem" }}>
                                                <img className="card-img-top p-1 w-100" src={product.thumbnail} alt="product thumbnail" style={{ maxWidth: "244px", height: "10rem" }} />
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title">{product.title}</h6>
                                                <div className='d-flex justify-content-between'>
                                                    <span className="card-text fs-5 text-dark">{product.price}$</span>
                                                    <span className='fs-6 text-danger'> -{product.discountPercentage}%</span>
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
        </div>
    );
}

export default Shopee;
