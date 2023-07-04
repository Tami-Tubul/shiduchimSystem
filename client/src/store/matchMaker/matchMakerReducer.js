export const matchMakerReducer = (state = { faoritedCandidates: [], closedRegisters: [] }, action) => {
    switch (action.type) {
        case "Add_CANDIDATE":
            return {
                ...state,
                faoritedCandidates: action.payload
            }
        case "CLOSE_MATCH":
            return {
                ...state,
                closedRegisters: action.payload
            }
        default:
            return state;
    }
}