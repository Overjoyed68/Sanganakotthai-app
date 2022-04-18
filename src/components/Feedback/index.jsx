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
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/images/h1.jpeg'} />
                    </div>

                    <div className='order'>
                        2
                    </div>

                    <div className='demand-image-container'>
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/images/h2.jpeg'} />
                    </div>

                    <div className='order'>
                        3
                    </div>

                    <div className='demand-image-container'>
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/images/h3.jpeg'} />
                    </div>

                    <div className='order'>
                        4
                    </div>

                    <div className='demand-image-container'>
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/images/h4.jpeg'} />
                    </div>

                    <div className='order'>
                        5
                    </div>

                    <div className='demand-image-container'>
                        <img className='demand-image' src={process.env.PUBLIC_URL + '/images/h5.jpeg'} />
                    </div>
                </div>

                <div className='feedback-container'>
                    <div className='feedback-header'>
                        <label>Feedback ประชาชน</label>
                    </div>

                    <div className='feedback-box'>
                        <div className='feedback-date'>
                            12 เมษายน 2565 เวลา 16:45
                        </div>

                        <div className='feedbak-question-wrapper'>
                            <select className='feedback-question'>
                                <option className='feedback-question-options'>ธุรกิจฉันไประดับโลกได้</option>
                                <option className='feedback-question-options'>เป็น Unicorn startup</option>
                                <option className='feedback-question-options'>ส่งสินค้าไปต่างประเทศได้</option>
                                <option className='feedback-question-options'>พัฒนาสินค้าให้มีประสิทธิภาพได้</option>
                            </select>
                        </div>

                        <div className='feedback-answer-wrapper'>
                            <textarea className='feedback-answer' defaultValue={'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}>
                            </textarea>
                            <div className='feedback-answer-label-wrapper'>
                                <span>
                                    <label>ชื่อ - นามสกุล</label>
                                    <label> | </label>
                                    <label>เบอร์โทรศัพท์</label>
                                    <label> | </label>
                                    <label> จังหวัด </label>
                                    <label> เขต </label>
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

                    <div className='feedback-box'>
                        <div className='feedback-date'>
                            11 เมษายน 2565 เวลา 09:29
                        </div>
                        <div className='feedbak-question-wrapper'>
                            <select className='feedback-question'>
                                <option className='feedback-question-options'>ธุรกิจฉันไประดับโลกได้</option>
                                <option className='feedback-question-options'>เป็น Unicorn startup</option>
                                <option className='feedback-question-options'>ส่งสินค้าไปต่างประเทศได้</option>
                                <option className='feedback-question-options'>พัฒนาสินค้าให้มีประสิทธิภาพได้</option>
                            </select>
                        </div>

                        <div className='feedback-answer-wrapper'>
                            <textarea className='feedback-answer' defaultValue={'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}>
                            </textarea>
                            <div className='feedback-answer-label-wrapper'>
                                <label>ชื่อ - นามสกุล</label>
                                <label> | </label>
                                <label>เบอร์โทรศัพท์</label>

                                <div className='feedback-answer-tag tag-blue'>
                                    ติดต่อแล้ว
                                </div>

                                <div className='feedback-answer-tag tag-green'>
                                    แก้ปัญหาแล้ว
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='feedback-box'>
                        <div className='feedback-date'>
                            9 เมษายน 2565 เวลา 12:15
                        </div>

                        <div className='feedbak-question-wrapper'>
                            <select className='feedback-question'>
                                <option className='feedback-question-options'>ธุรกิจฉันไประดับโลกได้</option>
                                <option className='feedback-question-options'>เป็น Unicorn startup</option>
                                <option className='feedback-question-options'>ส่งสินค้าไปต่างประเทศได้</option>
                                <option className='feedback-question-options'>พัฒนาสินค้าให้มีประสิทธิภาพได้</option>
                            </select>
                        </div>

                        <div className='feedback-answer-wrapper'>
                            <textarea className='feedback-answer' defaultValue={'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}>
                            </textarea>
                            <div className='feedback-answer-label-wrapper'>
                                <label> ชื่อ - นามสกุล </label>
                                <label> | </label>
                                <label> เบอร์โทรศัพท์ </label>

                                <label> | </label>
                                <label> เขต </label>
                                <label> จังหวัด </label>
                                
                                <div className='feedback-answer-tag tag-blue'>
                                    ติดต่อแล้ว
                                </div>

                                <div className='feedback-answer-tag tag-green'>
                                    แก้ปัญหาแล้ว
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withRouter(Feedback);