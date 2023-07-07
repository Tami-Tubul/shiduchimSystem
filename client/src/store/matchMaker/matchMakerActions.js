import {Add_CANDIDATE, CLOSE_MATCH, LOAD_MEORASIM} from './matchMakerTypes';

export const loadMeorasim = (meorasim) => {
    return {
        type: LOAD_MEORASIM,
        payload: meorasim
    }
}
export const addFavoritedCandidate = (candidate) => {
    return {
        type: Add_CANDIDATE,
        payload: candidate
    }
}
export const closedMatched = (matchList) => {
    return {
        type: CLOSE_MATCH,
        payload: matchList
    }
}
export default {
    loadMeorasim,
    addFavoritedCandidate,
    closedMatched
}
