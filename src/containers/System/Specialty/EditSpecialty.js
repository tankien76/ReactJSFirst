import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './EditSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getAllSpecialty, getDetailSpecialtyById, editSpecialtyService } from '../../../services/userService'
import Select from 'react-select';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: [],
            contentMarkdown: '',
            contentHTML: '',
            imageBase64: '',
            selectedSpecialty: '',
            isOpen: false,
            isBtnOpen: false
        }
    }

    async componentDidMount() {
        this.fetchAllSpecialty();
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
                object.image = item.image;
                result.push(object)
            })
        }
        return result
    }

    fetchAllSpecialty = async () => {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                listSpecialty: res.data ? this.buildDataInputSelect(res.data) : []
            })
        }
    }

    handleChangeSelect = async (selectedSpecialty) => {
        this.setState({ selectedSpecialty })
        let data = {
            id: selectedSpecialty.value,
            location: 'ALL'
        }

        let res = await getDetailSpecialtyById(data);

        if (res && res.errCode === 0 && res.data && res.data.image) {
            let imgBase64 = Buffer.from(res.data.image, 'base64').toString('binary');
            this.setState({
                contentMarkdown: res.data.descriptionMarkdown,
                contentHTML: res.data.descriptionHTML,
                imageBase64: imgBase64,
                isBtnOpen: true
            })
        }
    }

    handleMarkdownChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
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

    openPreviewImage = () => {
        if (!this.state.imageBase64) return;
        this.setState({
            isOpen: true
        })
    }

    handleEditSpecialty = async () => {
        let res = await editSpecialtyService({
            id: this.state.selectedSpecialty.value,
            descriptionMarkdown: this.state.contentMarkdown,
            descriptionHTML: this.state.contentHTML,
            image: this.state.imageBase64
        });
        if (res && res.errCode === 0) {
            toast.success('Specialty Updated Succeed!')
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                imageBase64: '',
                selectedSpecialty: '',
                isBtnOpen: false
            })
        } else {
            toast.error('Specialty Updated Failed!')
        }
    }

    render() {
        let { listSpecialty } = this.state;
        return (
            <div className='edit-specialty-container'>
                <div className='edit-specialty-title title'>
                    Chỉnh sửa thông tin chuyên khoa
                </div>
                <div className='edit-specialty-body row'>
                    <div className='specialty-name col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelect}
                            options={listSpecialty}
                        // placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
                        />
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

                    <div className='edit-specialty-editor col-12'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleMarkdownChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>

                    {this.state.isBtnOpen === true &&
                        <button className='edit-button btn btn-warning'
                            onClick={() => this.handleEditSpecialty()}> Save
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

export default connect(mapStateToProps, mapDispatchToProps)(EditSpecialty);
