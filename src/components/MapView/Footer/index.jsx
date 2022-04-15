import React, { useContext, useEffect, useState } from 'react';
import './styles.scss'

const Footer = props => {
    return (
        <footer className='footer'>
            <h1 className='footer-label'>ความต้องการที่เราพบจาก xxxxxxx คน</h1>
            <div className='card-container'>
                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/images/h1.jpeg`} />
                    <h1 className='footer-image-label'>xxx</h1>
                </div>

                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/images/h2.jpeg`} />
                    <h1 className='footer-image-label'>xxx</h1>
                </div>

                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/images/h3.jpeg`} />
                    <h1 className='footer-image-label'>xxx</h1>
                </div>

                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/images/h4.jpeg`} />
                    <h1 className='footer-image-label'>xxx</h1>
                </div>

                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/images/h5.jpeg`} />
                    <h1 className='footer-image-label'>xxx</h1>
                </div>
            </div>
        </footer>
    )
}

export default Footer;