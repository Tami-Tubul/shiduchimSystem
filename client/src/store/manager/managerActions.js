import { LOAD_MESSAGES, SAVE_MESSAGE, DELETE_MESSAGE, LOAD_NEW_CANDIDATES, DELETE_NEW_CANDIDATE, LOAD_NEW_MATCHMAKERS,DELETE_NEW_MATCHMAKER } from './managerTypes';

export const loadMessages = (messages) => {
    return {
        type: LOAD_MESSAGES,
        payload: messages
    }
}

export const saveMessage = (message) => {
    return {
        type: SAVE_MESSAGE,
        payload: message
    }
}

export const deleteMessage = (messageID) => {
    return {
        type: DELETE_MESSAGE,
        payload: messageID
    }
}

export const loadNewCandidates = (newCandidates) => {
    return {
        type: LOAD_NEW_CANDIDATES,
        payload: newCandidates
    }
}

export const deleteNewCandidate = (candidateID) => {
    return {
        type: DELETE_NEW_CANDIDATE,
        payload: candidateID
    }
}

export const loadNewMatchMakers = (newMatchmakers) => {
    return {
        type: LOAD_NEW_MATCHMAKERS,
        payload: newMatchmakers
    }
}

export const deleteNewMatchMaker = (matchmakerID) => {
    return {
        type: DELETE_NEW_MATCHMAKER,
        payload: matchmakerID
    }
}


export default {
    loadMessages,
    saveMessage,
    deleteMessage,
    loadNewCandidates,
    deleteNewCandidate,
    loadNewMatchMakers,
    deleteNewMatchMaker
   
}
