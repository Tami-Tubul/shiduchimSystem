import { USER_LOGIN ,LOAD_CANDIDATES, DELETE_CANDIDATE} from './userType';

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

export const deleteCandidate = (candidateID) => {
    return {
        type: DELETE_CANDIDATE,
        payload: candidateID
    }
}




export default {
    userLogin,
    loadCandidates,
    deleteCandidate
}


