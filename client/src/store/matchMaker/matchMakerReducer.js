export const matchMakerReducer = (state = {}, action) => {
    switch (action.type) {
        case "Add_CANDIDATE":
            return {
                ...state,
                faoritedCandidates: action.payload
            }
            break;
            case "CLOSE_MATCH":
                return {
                    ...state,
                    closedRegisters: action.payload
                }
        default:
            return state;
    }
}