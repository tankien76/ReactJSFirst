import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './SearchKey.scss'
import { getAllSpecialty, getAllClinic, getAllDoctorsSearch } from '../../services/userService';
import { SEARCH_PATH } from '../../utils';
import { withRouter } from 'react-router'


class SearchKey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameHeader: '',
            listSearch: [],
            isDoctor: false
        }
    }

    async componentDidMount() {
        this.fetchDataRequired();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    fetchDataRequired = async () => {
        let caseFetch = this.props.history.location.pathname;
        if (caseFetch && caseFetch === SEARCH_PATH.SPECIALTY) {
            let resSpecialty = await getAllSpecialty();
            if (resSpecialty && resSpecialty.errCode === 0) {
                this.setState({
                    listSearch: resSpecialty.data ? resSpecialty.data : [],
                    nameHeader: 'Chuyên khoa'
                })
            }
        }
        if (caseFetch && caseFetch === SEARCH_PATH.CLINIC) {
            let resClinic = await getAllClinic();
            if (resClinic && resClinic.errCode === 0) {
                this.setState({
                    listSearch: resClinic.data ? resClinic.data : [],
                    nameHeader: 'Cơ sở y tế'
                })
            }
        }
        if (caseFetch && caseFetch === SEARCH_PATH.OD) {
            let resOD = await getAllDoctorsSearch();
            if (resOD && resOD.errCode === 0) {
                this.setState({
                    listSearch: resOD.data ? resOD.data : [],
                    nameHeader: 'Bác sĩ nổi bật',
                    isDoctor: true
                })
            }
        }
    }

    handleBackBtn = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleViewDetail = (dataInput) => {
        let casePath = this.props.history.location.pathname;
        if (this.props.history && this.props.history.location && casePath) {
            if (casePath && casePath === SEARCH_PATH.SPECIALTY) {
                this.props.history.push(`/detail-specialty/${dataInput.id}`)
            }
        }
        if (this.props.history && this.props.history.location && casePath) {
            if (casePath && casePath === SEARCH_PATH.CLINIC) {
                this.props.history.push(`/detail-clinic/${dataInput.id}`)
            }
        }
        if (this.props.history && this.props.history.location && casePath) {
            if (casePath && casePath === SEARCH_PATH.OD) {
                this.props.history.push(`/detail-doctor/${dataInput.id}`)
            }
        }
    }

    render() {
        let { listSearch, nameHeader, isDoctor } = this.state;
        return (
            <div className='search-key-container'>
                <div className='search-key-header'>
                    <button className='btn-back' onClick={() => this.handleBackBtn()}><i className="fas fa-arrow-left"></i></button>
                    <p className='title-search'>{nameHeader}</p>
                </div>
                <div className='search-key-body'>
                    {listSearch && listSearch.length > 0 && isDoctor === false &&
                        listSearch.map((item, index) => {
                            return (
                                <div className='search-key-option' key={index}>
                                    <div className='content-left' onClick={() => this.handleViewDetail(item)}
                                        style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className='content-right'>
                                        <p className='text' onClick={() => this.handleViewDetail(item)}> {item.name} </p>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {listSearch && listSearch.length > 0 && isDoctor === true &&
                        listSearch.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                <div className='search-key-option' key={index}>
                                    <div className='content-left-doctor' onClick={() => this.handleViewDetail(item)}
                                        style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                    <div className='content-right'>
                                        <p className='text' onClick={() => this.handleViewDetail(item)}> {item.lastName} {item.firstName} </p>
                                        <p className='text-specialty'> {item.Doctor_infor.specialtyData.name} </p>
                                    </div>
                                </div>
                            )
                        })
                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchKey));
