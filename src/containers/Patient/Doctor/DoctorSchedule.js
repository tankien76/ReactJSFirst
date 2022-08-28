import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctor } from '../../../services/userService'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDays: []
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language);
        }
    }

    setArrDays = (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM");
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(object);
        }

        this.setState({
            arrDays: arrDate
        })
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctor(doctorId, date)
            console.log('check res ', res)
        }
    }

    render() {
        let { arrDays } = this.state;

        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {arrDays && arrDays.length > 0 &&
                            arrDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                    </select>
                </div>
                <div className='all-available-time'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
