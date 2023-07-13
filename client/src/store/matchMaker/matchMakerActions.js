import {
    ADD_CANDIDATE_TO_CART, LOAD_FAVORITED_CANDIDATES,
    CLOSE_MATCH, LOAD_MEORASIM
} from './matchMakerTypes';


export const loadMeorasim = (meorasim) => {
    return {
        type: LOAD_MEORASIM,
        payload: meorasim
    }
}

export const addCandidateToCart = (updatetedCart) => {
    return {
        type: ADD_CANDIDATE_TO_CART,
        payload: updatetedCart
    }
}

export const loadFavoritedCandidates = (candidatesIDs) => {
    return {
        type: LOAD_FAVORITED_CANDIDATES,
        payload: candidatesIDs
    }
}


export const closedMatched = (matchObj) => {
    return {
        type: CLOSE_MATCH,
        payload: matchObj
    }
}
export default {
    loadMeorasim,
    closedMatched,
    addCandidateToCart,
    loadFavoritedCandidates

}
