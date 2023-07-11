
import { USER_LOGIN } from "./userType";
import authService from './../../authService';

export const userReducer = (state = { currentUser: authService.getUser() }, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }

}

