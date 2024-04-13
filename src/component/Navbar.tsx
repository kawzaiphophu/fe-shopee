import React, { useState } from 'react'
import "../css/nav.css"
import { Link } from "react-router-dom";


interface NavbarProps {
    setSearchTerm: (searchTerm: string | null) => void;
    cart: any;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchTerm, cart }) => {
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
        <>
            <nav className='sticky-top'>
                <div className='nav-top d-flex justify-content-between'>
                    <div>
                        <span>Seller Centre | </span>
                        <span>เริ่มต้นขายสินค้า | </span>
                        <span>ดาวน์โหลด | </span>
                        <span>ติดตามเราบน
                            <img src="https://cdn.icon-icons.com/icons2/642/PNG/96/facebook_icon-icons.com_59205.png" alt="" />
                            <img src="https://cdn.icon-icons.com/icons2/2037/PNG/96/ig_instagram_media_social_icon_124260.png" alt="" />
                            <img src="https://cdn.icon-icons.com/icons2/1099/PNG/96/1485482196-line_78675.png" alt="" />
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
                        <Link to="/" className="navbar-brand text-white">
                            <img className='pe-2' src="https://freelogopng.com/images/all_img/1656180872shopee-icon-png.png" alt="" style={{ width: "60px", borderRadius: "20%" }} />
                            Shopee
                        </Link>
                        <form className="position-relative d-flex w-75">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search"
                                value={searchInput}
                                onChange={(e) => { setSearchInput(e.target.value) }}
                                onKeyDown={handleKeyDown}
                            />
                            <Link className="btn position-absolute end-0" to="/" onClick={handleSearch}>Search</Link>
                        </form>
                        <div>
                            <div data-bs-toggle="modal" data-bs-target="#showCart">
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <img className='cart' src="https://img.icons8.com/?size=48&id=0DBkCUANmgoQ&format=png" alt="" />
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map((item: any, index: number) => (
                                                        <tr key={item.id}>
                                                            <td className='text-center align-middle'>{index + 1}</td>
                                                            <td className='text-center'><img className='w-75' src={item.img} alt="" /></td>
                                                            <td className='text-center align-middle '>{item.name}</td>
                                                            <td className='text-center align-middle'>{item.price}</td>
                                                            <td className='text-center align-middle'>{item.quantity}</td>
                                                            <td className='text-center align-middle'>{item.totle}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Navbar
