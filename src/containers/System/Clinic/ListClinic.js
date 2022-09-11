import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ListClinic.scss'
import { getAllClinic, deleteClinicService } from '../../../services/userService';
import { toast } from 'react-toastify';

class ListClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrClinics: []
        }
    }

    async componentDidMount() {
        this.fetchAllClinic();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    fetchAllClinic = async () => {
        let res = await getAllClinic();
        this.setState({
            arrClinics: res.data
        })
    }

    handleDeleteUser = async (clinicData) => {
        let res = await deleteClinicService(clinicData.id);

        if (res && res.errCode === 0) {
            this.fetchAllClinic();
            toast.success('Delete Clinic Suceed!')
        } else {
            toast.error('Delete Clinic Failed!')
        }
    }

    render() {
        let { arrClinics } = this.state
        return (
            <div className='list-clinic-container'>
                <div className='list-clinic-body'>
                    <div className='list-clinic-title title'>
                        Danh sách phòng khám
                    </div>
                    <div className='list-clinic-table mt-3 mx-2'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>Tên phòng khám</th>
                                    <th>Địa chỉ phòng khám</th>
                                    <th className='action-table'>Chức năng</th>
                                </tr>
                                {arrClinics && arrClinics.map((item, index) => {
                                    return (
                                        //Fragment
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-delete' onClick={() => { this.handleDeleteUser(item) }}>
                                                    <i className="far fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
