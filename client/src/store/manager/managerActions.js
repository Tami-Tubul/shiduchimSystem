import { LOAD_MESSAGES, SAVE_MESSAGE, DELETE_MESSAGE, LOAD_NEW_CANDIDATES, LOAD_NEW_MATCHMAKERS } from './managerTypes';

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

export const loadNewMatchMakers = (newMatchmakers) => {
    return {
        type: LOAD_NEW_MATCHMAKERS,
        payload: newMatchmakers
    }
}


export default {
    loadMessages,
    loadNewCandidates,
    loadNewMatchMakers,
    saveMessage,
    deleteMessage
}
