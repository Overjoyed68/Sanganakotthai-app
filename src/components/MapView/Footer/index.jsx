import React, { useContext, useEffect, useState } from 'react';
import './styles.scss'

const Footer = props => {
    return (
        <footer className='footer'>
            <h1>ความต้องการที่เราพบจาก xxxxxxx คน</h1>
            <div className='card-container'>
                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/h1.jpeg`} />
                    <h1>xxx</h1>
                </div>

                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/h2.jpeg`} />
                    <h1>xxx</h1>
                </div>

                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/h3.jpeg`} />
                    <h1>xxx</h1>
                </div>

                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/h4.jpeg`} />
                    <h1>xxx</h1>
                </div>

                <div className='card'>
                    <img className='image' src={process.env.PUBLIC_URL + `/h5.jpeg`} />
                    <h1>xxx</h1>
                </div>
            </div>
        </footer>
    )
}

export default Footer;