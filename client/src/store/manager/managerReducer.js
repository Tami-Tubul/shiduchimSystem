export const managerReducer = (state = {}, action) => {
    switch (action.type) {
        case "SAVE_MESSAGE":
            return {
                ...state,
                messages: action.payload
            }
            break;
        default:
            return state;
    }
}