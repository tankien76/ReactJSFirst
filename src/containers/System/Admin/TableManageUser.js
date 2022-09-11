import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    customActionTable = (cell, row) => {
        if (row) {
            return (
                <>
                    <button className='btn-edit' onClick={() => this.handleEditUser(row)}><i className="fas fa-edit"></i></button>
                    <button className='btn-delete' onClick={() => this.handleDeleteUser(row)} ><i className="far fa-trash-alt"></i></button>
                </>
            )
        }
    }

    render() {
        let arrUsers = this.state.usersRedux;
        console.log(arrUsers)
        let columns = [
            { dataField: "id", text: "#", sort: true, hidden: true },
            { dataField: "email", text: "Email", sort: true },
            { dataField: "firstName", text: "First name", sort: true },
            { dataField: "lastName", text: "Last name", sort: true },
            { dataField: "address", text: "Address", sort: true },
            { dataField: "acction", text: "Action", sort: true, formatter: this.customActionTable },
        ];
        let defaultSorted = [
            {
                dataField: "id",
                order: "asc"
            }
        ];
        let pagination = paginationFactory({
            page: 10,
            sizePerPage: 5,
            lastPageText: ">>",
            firstPageText: "<<",
            nextPageText: ">",
            prePageText: "<",
            showTotal: true,
            alwaysShowAllBtns: false,
        });
        return (
            <React.Fragment>
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={arrUsers}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    pagination={pagination}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
