import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    <FormattedMessage id='homepage.about' />
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
                        <p>Health is the biggest wealth for a human being in his/her entire lifetime.
                            One can survive without excess money but can not survive without good health.
                            Health is something that we can not buy with money but we can take care of it and we can cure it when needed with the help of the money.
                            If a person is not having good health, he will not be able to enjoy his/her life to the fullest.
                            Money does not make a person rich and happy but good health does. Moreover, a person can not feel complete and happy without good health.
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
