import {USER_LOGIN, ADD_REGISTER, DELETE_REGISTER} from './userType';

export const userLogin = (currentUser) => {
    return {
        type: USER_LOGIN,
        payload: currentUser
    }
}

export const addRegister = (registers) => {
    return {
        type: ADD_REGISTER,
        payload: registers
    }
}
export const deleteRegister = (registers) => {
    return {
        type: DELETE_REGISTER,
        payload: registers
    }
}

export default {
    userLogin,
    addRegister,
    deleteRegister
}


