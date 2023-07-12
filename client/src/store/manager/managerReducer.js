import { LOAD_MESSAGES, SAVE_MESSAGE, DELETE_MESSAGE, LOAD_NEW_CANDIDATES, DELETE_NEW_CANDIDATE, LOAD_NEW_MATCHMAKERS, DELETE_NEW_MATCHMAKER } from "./managerTypes";

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

        case DELETE_NEW_CANDIDATE:
            let candidateID = action.payload;
            let allNewCandidates = [...state.newCandidates]
            let indexCand = allNewCandidates.findIndex(x => x._id == candidateID)
            if (indexCand > -1) {
                allNewCandidates.splice(indexCand, 1)
            }
            return {
                ...state,
                newCandidates: allNewCandidates
            }

        case LOAD_NEW_MATCHMAKERS:
            return {
                ...state,
                newMatchmakers: action.payload
            }

        case DELETE_NEW_MATCHMAKER:
            let matchmakerID = action.payload;
            let allNewMatchmakers = [...state.newMatchmakers]
            let indexMatch = allNewMatchmakers.findIndex(x => x._id == matchmakerID)
            if (indexMatch > -1) {
                allNewCandidates.splice(indexMatch, 1)
            }
            return {
                ...state,
                newMatchmakers: allNewCandidates
            }

        default:
            return state;
    }
}