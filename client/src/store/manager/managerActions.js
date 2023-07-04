import {SAVE_MESSAGE} from './managerTypes';

export const saveMessage = (message) => {
    return {
        type: SAVE_MESSAGE,
        payload: message
    }
}

export default {
    saveMessage
}
