export const managerReducer = (state = {messages: []}, action) => {
    switch (action.type) {
        case "SAVE_MESSAGE":
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
}