import { LOAD_MESSAGES, SAVE_MESSAGE } from "./managerTypes";

export const managerReducer = (state = {messages: []}, action) => {
    switch (action.type) {
       
        case LOAD_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }   
       
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
}