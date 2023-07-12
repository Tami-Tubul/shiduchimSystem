import { DELETE_CANDIDATE ,ADD_CANDIDATE, CLOSE_MATCH, LOAD_MEORASIM} from './matchMakerTypes';

export const deleteCandidate = (candidateID) => {
    return {
        type: DELETE_CANDIDATE,
        payload: candidateID
    }
}

export const loadMeorasim = (meorasim) => {
    return {
        type: LOAD_MEORASIM,
        payload: meorasim
    }
}

export const addFavoritedCandidate = (candidate) => {
    return {
        type: ADD_CANDIDATE,
        payload: candidate
    }
}
export const closedMatched = (matchObj) => {
    return {
        type: CLOSE_MATCH,
        payload: matchObj
    }
}
export default {
    deleteCandidate,
    loadMeorasim,
    closedMatched,
    addFavoritedCandidate
    
}
