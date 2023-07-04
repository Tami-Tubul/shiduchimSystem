import {Add_CANDIDATE, CLOSE_MATCH} from './matchMakerTypes';

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
    addFavoritedCandidate
}
