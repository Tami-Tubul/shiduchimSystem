import { LOAD_MEORASIM, LOAD_CANDIDATES, DELETE_CANDIDATE, ADD_CANDIDATE, CLOSE_MATCH } from "./matchMakerTypes"

export const matchMakerReducer = (state = { faoritedCandidates: [], closedRegisters: [] }, action) => {
    switch (action.type) {

        case LOAD_MEORASIM:
            return {
                ...state,
                closedRegisters: action.payload
            }

        case CLOSE_MATCH:
            return {
                ...state,
                closedRegisters: [...state.closedRegisters, action.payload]
            }

        case DELETE_CANDIDATE:
            let candidateID = action.payload;
            let allCandidates = [...state.candidates]
            let index = allCandidates.findIndex(x => x._id == candidateID)
            if (index > -1) {
                allCandidates.splice(index, 1)
            }
            return {
                ...state,
                candidates: allCandidates
            }

        case ADD_CANDIDATE:
            return {
                ...state,
                faoritedCandidates: action.payload
            }

        default:
            return state;
    }
}

