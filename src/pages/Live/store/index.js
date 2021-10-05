const initialState = {
    matchMenus: null
}

const liveReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setMatchMenus':
            return {
                ...state,
                matchMenus: action.matchMenus
            }
        default:
            return {...state}
    }
}

export default liveReducer;