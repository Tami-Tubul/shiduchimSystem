import { LOAD_MESSAGES, SAVE_MESSAGE } from './managerTypes';

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

export const deleteMessage = (id) => { //צריך לממש
    return {
       
    }
}

export default {
    loadMessages,
    saveMessage,
    deleteMessage
}
