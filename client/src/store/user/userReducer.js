
import { USER_LOGIN ,LOAD_CANDIDATES } from "./userType";
import authService from './../../authService';

export const userReducer = (state = { currentUser: authService.getUser() , candidates:[] }, action) => {
    switch (action.type) {

        case USER_LOGIN:
            return {
                ...state,
                currentUser: action.payload
            }

        case LOAD_CANDIDATES:
            return {
                ...state,
                candidates: action.payload
            }

        default:
            return state;
    }

}

