const initialState = {
    topss: [],
    types: [],
    hots: []
}

const videoReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'setTopss':
            return {
                ...state,
                topss: action.list
            }
        case 'setTypes':
            return {
                ...state,
                types: action.list
            }
        case 'setHots':
            return {
                ...state,
                hots: action.list
            }
        default:
            return {...state};
    }
}

export default videoReducer;