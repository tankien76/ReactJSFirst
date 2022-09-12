import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUser = (inputId) => {
    //template string
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveInforDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctor = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-by-id?doctorId=${doctorId}`)
}

const getProfileById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}

const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getAllPatient = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}

const editClinicService = (inputData) => {
    return axios.put('/api/edit-clinic', inputData)
}

const deleteClinicService = (clinicId) => {
    return axios.delete('/api/delete-clinic', { data: { id: clinicId } })
}

const editSpecialtyService = (inputData) => {
    return axios.put('/api/edit-specialty', inputData)
}

const getAllDoctorsSearch = () => {
    return axios.get(`/api/get-all-doctor-for-search`)
}

export {
    handleLoginApi, getAllUser, createNewUserService,
    deleteUserService, editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctors, saveInforDoctorService,
    getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctor,
    getExtraInfoById, getProfileById, postPatientBookAppointment, postVerifyBookAppointment,
    createNewSpecialty, getAllSpecialty, getDetailSpecialtyById, createNewClinic, getAllClinic,
    getDetailClinicById, getAllPatient, postSendRemedy, editClinicService, deleteClinicService,
    editSpecialtyService, getAllDoctorsSearch
}