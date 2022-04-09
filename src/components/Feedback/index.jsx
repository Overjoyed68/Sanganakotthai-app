import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

const Feedback = () => {
    return (
        <div className='body'>
            <div className='container'>
                <div className='demand-container'>
                    <div className='header'>
                        อันดับ
                    </div>
                    <div className='header'>
                        ความต้องการ
                    </div>

                    <div className='order'>
                        1
                    </div>

                    <div className='demand-image-container'>
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/h1.jpeg'} />
                    </div>

                    <div className='order'>
                        2
                    </div>

                    <div className='demand-image-container'>
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/h2.jpeg'} />
                    </div>

                    <div className='order'>
                        3
                    </div>

                    <div className='demand-image-container'>
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/h3.jpeg'} />
                    </div>

                    <div className='order'>
                        4
                    </div>

                    <div className='demand-image-container'>
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/h4.jpeg'} />
                    </div>

                    <div className='order'>
                        5
                    </div>

                    <div className='demand-image-container'>
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/h5.jpeg'} />
                    </div>
                </div>

                <div className='feedback-container'>
                    <div className='feedback-header'>
                        <label>Feedback ประชาชน</label>
                    </div>

                    <div className='feedback-box'>
                        <div className='feedback-date'>
                            9 เมษายน 2565
                        </div>

                        <div className='feedback-question'>
                            ธุรกิจฉันไประดับโลกได้
                        </div>

                        <div className='feedback-answer'>
                            ความต้องการ
                        </div>
                    </div>

                    <div className='feedback-box'>
                        <div className='feedback-date'>
                            9 เมษายน 2565
                        </div>
                        <div className='feedback-question'>
                            ธุรกิจฉันไประดับโลกได้
                        </div>

                        <div className='feedback-answer'>
                            ความต้องการ
                        </div>
                    </div>

                    <div className='feedback-box'>
                        <div className='feedback-date'>
                            9 เมษายน 2565
                        </div>

                        <div className='feedback-question'>
                            ธุรกิจฉันไประดับโลกได้
                        </div>

                        <div className='feedback-answer'>
                            ความต้องการ
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withRouter(Feedback);