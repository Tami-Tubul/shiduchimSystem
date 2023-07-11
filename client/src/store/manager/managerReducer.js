import { LOAD_MESSAGES, SAVE_MESSAGE, DELETE_MESSAGE, LOAD_NEW_CANDIDATES, LOAD_NEW_MATCHMAKERS } from "./managerTypes";

export const managerReducer = (state = { messages: [], newCandidates: [], newMatchmakers: [] }, action) => {
    switch (action.type) {

        case LOAD_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }

        case SAVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }

        case DELETE_MESSAGE:
            let msgID = action.payload;
            let allMessages = [...state.messages]
            let index = allMessages.findIndex(x => x._id == msgID)
            if (index > -1) {
                allMessages.splice(index, 1)
            }
            return {
                ...state,
                messages: allMessages
            }

        case LOAD_NEW_CANDIDATES:
            return {
                ...state,
                newCandidates: action.payload
            }

        case LOAD_NEW_MATCHMAKERS:
            return {
                ...state,
                newMatchmakers: action.payload
            }


        default:
            return state;
    }
}