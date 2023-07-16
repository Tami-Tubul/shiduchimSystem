
import { USER_LOGIN, LOAD_CANDIDATES, LOAD_FILTERED_CANDIDATES, REMOVE_CANDIDATE } from './userType';
import authService from './../../authService';

export const userReducer = (state = { currentUser: authService.getUser(), candidates: [], filteredCandidates: [] }, action) => {
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

        case LOAD_FILTERED_CANDIDATES:
            return {
                ...state,
                filteredCandidates: action.payload
            }

        case REMOVE_CANDIDATE:
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

        default:
            return state;
    }

}

