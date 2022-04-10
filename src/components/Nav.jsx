import React from 'react';
import { useLocation } from 'react-router-dom';

const Nav = () => {
    const location = useLocation();
    const isCompareView = location.pathname.split('/')[1] === 'compare';
    return (
        <nav className="nav">
            <a href="https://sanganakotthai.com/" target="_blank" className="nav--logo nav--logo__elect">
                <img src={process.env.PUBLIC_URL + `/logo/site_logo.png`} className="nav--logo-image"></img >
            </a>
        </nav>
    );
};

export default Nav;
