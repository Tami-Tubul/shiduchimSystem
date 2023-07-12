import { USER_LOGIN ,LOAD_CANDIDATES} from './userType';

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


export default {
    userLogin,
    loadCandidates
}


