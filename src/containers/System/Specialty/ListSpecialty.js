import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
// import './ListSpecialty.scss'
import { getAllSpecialty } from '../../../services/userService';

class ListSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: []
        }
    }

    async componentDidMount() {
        this.fetchAllSpecialty();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    fetchAllSpecialty = async () => {
        let res = await getAllSpecialty();
        this.setState({
            arrSpecialty: res.data
        })
    }


    render() {
        let { arrSpecialty } = this.state
        return (
            <div className='list-specialty-container'>
                <div className='list-specialty-body'>
                    <div className='list-specialty-title title'>
                        Danh sách chuyên khoa
                    </div>
                    <div className='list-specialty-table mt-3 mx-2'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>Tên chuyên khoa</th>
                                    <th className='action-table'>Chức năng</th>
                                </tr>
                                {arrSpecialty && arrSpecialty.map((item, index) => {
                                    return (
                                        //Fragment
                                        <tr key={index}>
                                            <td>{item.name}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
