import { USER_LOGIN ,LOAD_CANDIDATES,LOAD_FILTERED_CANDIDATES, REMOVE_CANDIDATE} from './userType';

export const userLogin = (currentUser) => {
    return {
        type: USER_LOGIN,
        payload: currentUser
    }
}

export const loadCandidates = (candidates) => {
    return {
        type: LOAD_CANDIDATES,
        payload: candidates
    }
}

export const loadFilteredCandidates = (candidates) => {
    return {
        type: LOAD_FILTERED_CANDIDATES,
        payload: candidates
    }
}

export const removeCandidate = (candidateID) => {
    return {
        type: REMOVE_CANDIDATE,
        payload: candidateID
    }
}




export default {
    userLogin,
    loadCandidates,
    loadFilteredCandidates,
    removeCandidate
}


