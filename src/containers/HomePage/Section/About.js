import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về M
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        {/* <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/jvZmVkWJphI?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                            title="#54 Phép Màu Khiến Redux Là Lựa Chọn Number 1 với React App | React - Redux cho người mới bắt đầu"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe> */}

                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/eK41R9lGBWg"
                            title="Khoa xét nghiệm đạt chuẩn ISO 15189:2012 - Bệnh viện Gia An 115"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Track your progress with the free "My Learning" program here at W3Schools.
                            Log into your account, and start earning points!
                            This is an optional feature, you can study W3Schools without using My Learning.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
