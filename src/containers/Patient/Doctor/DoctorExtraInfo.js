import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';
import { getExtraInfoById } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';


class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInfoById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInfoById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo, extraInfor } = this.state;
        let { language } = this.props;


        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id='patient.extra-infor-doctor.text-address' />
                    </div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfo === false &&
                        <div className='short-infor'>
                            <FormattedMessage id='patient.extra-infor-doctor.price' />
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }


                            <span className='detail' onClick={() => { this.showHideDetailInfo(true) }}>
                                <FormattedMessage id='patient.extra-infor-doctor.detail' />
                            </span>
                        </div>
                    }

                    {isShowDetailInfo === true &&
                        <>
                            <div className='title-table'><FormattedMessage id='patient.extra-infor-doctor.price' /></div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id='patient.extra-infor-doctor.price' /></span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }

                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>

                            <div className='payment-content'>
                                <FormattedMessage id='patient.extra-infor-doctor.payment' />
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVi : ''}
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => { this.showHideDetailInfo(false) }}>
                                    <FormattedMessage id='patient.extra-infor-doctor.hide-price' />
                                </span>
                            </div>
                        </>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
