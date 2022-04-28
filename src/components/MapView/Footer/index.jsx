import React, { useContext, useEffect, useState } from 'react';
import './styles.scss'
import { API_URL, IMAGE_URL } from '../../../config';
import MapContext from '../../../map/context';

const Footer = props => {
    const [topFeedbackList, setTopFeedbackList] = useState([])
    const [sumOfAllFeedback, setSumOfAllFeedback] = useState(0)
    const { setLoading } = useContext(MapContext)

    useEffect(() => {
        getTopFeedback();
    }, [])

    const getTopFeedback = () => {
        setLoading(true);
        fetch(API_URL.PROD_URL + '/dashboard/survey/top-feedback')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    let tempTopFeedbackList = data.data;
                    tempTopFeedbackList.sort((a, b) => b.count - a.count);
                    setSumOfAllFeedback(tempTopFeedbackList.reduce((acc, obj) => { return acc + obj.count }, 0));
                    tempTopFeedbackList = tempTopFeedbackList.slice(0, 5);
                    setTopFeedbackList(tempTopFeedbackList);
                }
            })
            .finally(setLoading(false));
    }

    return (
        <footer className='footer'>
            <h1 className='footer-label'>ความต้องการที่เราพบจาก {sumOfAllFeedback} คน</h1>
            <div className='card-container'>
                {topFeedbackList.map(({ code, count, text, src }, index) =>
                    <div className='card' key={code}>
                        <img className='image' src={IMAGE_URL.PROD_URL + src} />
                        <h1 className='footer-image-label'>{count} คน</h1>
                    </div>
                )}
            </div>
        </footer>
    )
}

export default Footer;