import React, { useState } from 'react'
import "../css/nav.css"
import { Link } from "react-router-dom";


interface NavbarProps {
    setSearchTerm: (searchTerm: string | null) => void;
    cart: any;
    clearCart: () => void;
    removeItem: (index: number) => void;
}


const Navbar: React.FC<NavbarProps> = ({ setSearchTerm, cart, clearCart, removeItem }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        setSearchTerm(searchInput.trim() !== '' ? searchInput : null);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <nav className='sticky-top'>
            <div className='nav-top'>
                <div>
                    <span>Seller Centre | </span>
                    <span>เริ่มต้นขายสินค้า | </span>
                    <span>ดาวน์โหลด | </span>
                    <span>ติดตามเราบน</span>
                    <span>ติดตามเราบน
                        <span>
                            <img src="https://cdn.icon-icons.com/icons2/642/PNG/96/facebook_icon-icons.com_59205.png" alt="facebook ico" />
                            <img src="https://cdn.icon-icons.com/icons2/2037/PNG/96/ig_instagram_media_social_icon_124260.png" alt="ig ico" />
                            <img src="https://cdn.icon-icons.com/icons2/1099/PNG/96/1485482196-line_78675.png" alt="line ico" />
                        </span>
                    </span>
                </div>
                <div>
                    <span>การแจ้งเตือน</span>
                    <span>ช่วยเหลือ</span>
                    <span>ไทย</span>
                    <span>Profile</span>
                </div>
            </div>
            <div className="navbar nav-mid pt-3">
                <div className="container-fluid d-flex justify-content-between">
                    <div onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }} className="navbar-brand text-white w-20">
                        <img className='pe-2' src="https://freelogopng.com/images/all_img/1656180872shopee-icon-png.png" alt="shopee ico" style={{ width: "60px", borderRadius: "20%" }} />
                        <span className='logo fs-4'>Shopee</span>
                    </div>
                    <form className="position-relative d-flex w-70">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e) => { setSearchInput(e.target.value) }}
                            onKeyDown={handleKeyDown}
                        />
                        <Link className="position-absolute end-0 btn-search" to="/" onClick={handleSearch}>Search</Link>
                    </form>
                    <div className='w-auto'>
                        <div data-bs-toggle="modal" data-bs-target="#showCart">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img className='cart' src="https://img.icons8.com/?size=48&id=0DBkCUANmgoQ&format=png" alt="cart ico" />
                                <div className={cart.length <= 0 ? "d-none" : "cart"} style={{ position: 'absolute', top: '0', right: '0', background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px' }}>{cart.length}</div>
                            </div>
                        </div>
                        <div className="modal modal-xl fade w-100 h-100" id="showCart" tabIndex={-1} aria-labelledby="editbtn" aria-hidden="true">
                            <div className="modal-dialog ">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="editbtn">Cart</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className='w-1 text-center'>No.</th>
                                                    <th className='w-25 text-center'>Image</th>
                                                    <th className='w-25 text-center'>Name</th>
                                                    <th className='w-25 text-center'>Price</th>
                                                    <th className='w-25 text-center'>Quantity</th>
                                                    <th className='w-25 text-center'>Totle</th>
                                                    <th className='w-25 text-center'>Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((item: any, index: number) => (
                                                    <tr key={index}>
                                                        <td className='text-center align-middle'>{index + 1}</td>
                                                        <td className='text-center'><img className='w-75' src={item.img} alt="item product" /></td>
                                                        <td className='text-center align-middle '>{item.name}</td>
                                                        <td className='text-center align-middle'>{item.price}</td>
                                                        <td className='text-center align-middle'>{item.quantity}</td>
                                                        <td className='text-center align-middle'>{item.totle}</td>
                                                        <td className='text-center align-middle'>
                                                            <button className="btn btn-danger" onClick={() => removeItem(index)}>X</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-danger" onClick={() => { clearCart() }}>Clear All</button>
                                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
