import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './SearchKey.scss'

class SearchKey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameHeader: '',
            listSearch: []
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        console.log('check props >>>>>>>>>>', this.props)
        return (
            <div className='search-key-container'>
                <div className='search-key-header'>
                    check man
                </div>
                <div className='search-key-body'>
                    <div className='search-key-option'>
                        <div className='content-left'></div>
                        <div className='content-right'></div>
                    </div>
                    <div className='search-key-option'>
                        <div className='content-left'></div>
                        <div className='content-right'></div>
                    </div>
                    <div className='search-key-option'>
                        <div className='content-left'></div>
                        <div className='content-right'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchKey);
