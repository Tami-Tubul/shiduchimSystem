import { USER_LOGIN } from './userType';

export const userLogin = (currentUser) => {
    return {
        type: USER_LOGIN,
        payload: currentUser
    }
}


export default {
    userLogin,
}


