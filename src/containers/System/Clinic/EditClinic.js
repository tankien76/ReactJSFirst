import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import './EditClinic.scss';
import { getAllClinic, getDetailClinicById, editClinicService } from '../../../services/userService';
import Lightbox from 'react-image-lightbox';
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            listClinic: [],
            selectedClinic: '',
            addressClinic: '',
            isOpen: false,
            imageBase64: '',
            isBtnOpen: false
        }
    }

    async componentDidMount() {
        this.fetchAllClinic();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                object.id = item.id;
                object.image = item.image;
                result.push(object)
            })
        }
        return result
    }

    fetchAllClinic = async () => {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                listClinic: res.data ? this.buildDataInputSelect(res.data) : [],
            })
        }
    }

    handleChangeSelect = async (selectedClinic) => {
        this.setState({ selectedClinic })

        let res = await getDetailClinicById(selectedClinic);
        console.log('check res >>>>>>', res)

        if (res && res.errCode === 0 && res.data && res.data.image) {
            let imgBase64 = Buffer.from(res.data.image, 'base64').toString('binary');
            this.setState({
                contentMarkdown: res.data.descriptionMarkdown,
                contentHTML: res.data.descriptionHTML,
                addressClinic: res.data.address,
                imageBase64: imgBase64,
                isBtnOpen: true
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleMarkdownChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    openPreviewImage = () => {
        if (!this.state.imageBase64) return;
        this.setState({
            isOpen: true
        })
    }

    handleEditClinic = async () => {
        let res = await editClinicService({
            id: this.state.selectedClinic.id,
            descriptionMarkdown: this.state.contentMarkdown,
            descriptionHTML: this.state.contentHTML,
            address: this.state.addressClinic,
            image: this.state.imageBase64
        });
        if (res && res.errCode === 0) {
            toast.success('Clinic Updated Succeed!')
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                selectedClinic: '',
                addressClinic: '',
                imageBase64: '',
                isBtnOpen: false
            })
        } else {
            toast.error('Clinic Updated Failed!')
        }
    }

    render() {
        return (
            <div className='edit-clinic-container'>
                <div className='edit-clinic-title title'>
                    Thêm/Chỉnh sửa thông tin phòng khám
                </div>
                <div className='edit-clinic-body'>
                    <div className='clinic-name form-group'>
                        <label>Tên phòng khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelect}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
                        />
                    </div>
                    <div className='content-clinic row'>
                        <div className='col-6 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control'
                                onChange={(event) => this.handleChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic} />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-user.image' /></label>
                            <div className='preview-img-container'>
                                <input type='file' id='preview-img' className='form-control' hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label className='label-upload' htmlFor='preview-img'>
                                    Tải ảnh <i className="fas fa-upload"></i>
                                </label>
                                <div className='preview-image'
                                    style={{ backgroundImage: `url(${this.state.imageBase64})` }}
                                    onClick={() => this.openPreviewImage()}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className='edit-clinic-editor'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleMarkdownChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>

                    {this.state.isBtnOpen === true &&
                        <button className='edit-button btn btn-warning'
                            onClick={() => this.handleEditClinic()}> Save
                        </button>
                    }

                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.imageBase64}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(EditClinic);
