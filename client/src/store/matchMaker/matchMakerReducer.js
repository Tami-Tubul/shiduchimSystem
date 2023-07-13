import { LOAD_MEORASIM, LOAD_FAVORITED_CANDIDATES, ADD_CANDIDATE_TO_CART, REMOVE_CANDIDATE_FROM_CART, CLOSE_MATCH } from "./matchMakerTypes"

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


        case ADD_CANDIDATE_TO_CART:
            return {
                ...state,
                faoritedCandidates: action.payload
            }

        case REMOVE_CANDIDATE_FROM_CART:
            return {
                ...state,
                faoritedCandidates: action.payload
            }

        

        case LOAD_FAVORITED_CANDIDATES:
            return {
                ...state,
                faoritedCandidates: action.payload
            }

        default:
            return state;
    }
}

