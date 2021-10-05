const initialState = {
    headNavs: []
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setHeadNavs':
            return {
                ...state,
                headNavs: action.headNavs
            }
        default:
            return {...state}
    }
}

export default globalReducer;