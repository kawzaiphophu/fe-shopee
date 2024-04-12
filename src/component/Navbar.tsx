import React from 'react'
import "../css/nav.css"

const Navbar: React.FC = () => {
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
                        <a className="navbar-brand text-white " href="javascript:void(0)"><img className='pe-2' src="https://freelogopng.com/images/all_img/1656180872shopee-icon-png.png" alt="" style={{ width: "60px", borderRadius: "20%" }} />Shopee</a>
                        <form className="position-relative d-flex w-75">
                            <input className="form-control" type="text" placeholder="Search" />
                            <button className="btn position-absolute end-0 " type="button">Search</button>
                        </form>
                        <img className='cart' src="https://img.icons8.com/?size=48&id=0DBkCUANmgoQ&format=png" alt="" />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar