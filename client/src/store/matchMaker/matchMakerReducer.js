import { Add_CANDIDATE, CLOSE_MATCH, LOAD_MEORASIM } from "./matchMakerTypes";

export const matchMakerReducer = (state = { faoritedCandidates: [], closedRegisters: [] }, action) => {
    switch (action.type) {

        case LOAD_MEORASIM:
            return {
                ...state,
                closedRegisters: action.payload
            }

        case Add_CANDIDATE:
            return {
                ...state,
                faoritedCandidates: action.payload
            }
        case CLOSE_MATCH:
            return {
                ...state,
                closedRegisters: action.payload
            }
        default:
            return state;
    }
}