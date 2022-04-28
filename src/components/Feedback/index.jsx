import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';
import { API_URL, IMAGE_URL } from '../../config';
import MapContext from '../../map/context';

const Feedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [feedbakDataList, setFeedbackDataList] = useState([])
    const { setLoading } = useContext(MapContext)

    useEffect(() => {
        getTopFeedback();
        getAllFeedback();
    }, [])

    const getAllFeedback = () => {
        setLoading(true);
        fetch(API_URL.PROD_URL + '/dashboard/survey/all-feedback')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFeedbackDataList(data.data);
                }
            })
            .finally(setLoading(false));
    }

    const getTopFeedback = () => {
        setLoading(true);
        fetch(API_URL.PROD_URL + '/dashboard/survey/top-feedback')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    let tempTopFeedbackList = data.data;
                    tempTopFeedbackList.sort((a, b) => b.count - a.count);
                    setFeedbackList(tempTopFeedbackList);
                }
            })
            .finally(setLoading(false));
    }

    return (
        <div className='body'>
            <div className='container'>
                <div className='demand-container'>
                    <div className='demand-row'>
                        <div className='header'>
                            อันดับ
                        </div>
                        <div className='header'>
                            ความต้องการ
                        </div>
                    </div>


                    {feedbackList.map(({ code, text, src, count }, index) =>
                        <div className='demand-row' key={code}>
                            <div className='order'>
                                {index + 1}
                            </div>

                            <div className='demand-image-container'>
                                <img className='demand-image' src={IMAGE_URL.PROD_URL + src} alt='' />
                            </div>
                        </div>
                    )}
                </div>

                <div className='feedback-container'>
                    <div className='feedback-header'>
                        <label>Feedback ประชาชน</label>
                    </div>

                    {feedbakDataList.map(({ name, feedback, other, createdAt }, index) =>
                        <div className='feedback-box' key={index}>
                            <div className='feedback-date'>
                                {createdAt}
                            </div>

                            <div className='feedback-question-label'>
                                {feedback}
                            </div>

                            <div className='feedback-answer-wrapper'>
                                <textarea className='feedback-answer' defaultValue={other}>
                                </textarea>
                                <div className='feedback-answer-label-wrapper'>
                                    <span>
                                        <label>{name}</label>
                                    </span>

                                    <div className='feedback-answer-tag tag-blue'>
                                        ติดต่อแล้ว
                                    </div>

                                    <div className='feedback-answer-tag tag-green'>
                                        แก้ปัญหาแล้ว
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Feedback);