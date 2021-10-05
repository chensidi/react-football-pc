import * as type from './type';

const initialState = {
    matchBanner: [], //德甲赛事轮播
    tops: null, //首页推荐板块
    ranks: null, //首页排名（球队，射手榜）
    hotVideos: null, //热门视频
    recommend: null, //热门推荐
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.Set_Matches:
            return {
                ...state,
                matchBanner: action.matchBanner
            }
        case type.Set_Tops:
            return {
                ...state,
                tops: action.tops
            }
        case type.Set_Ranks:
            return {
                ...state,
                ranks: action.ranks
            }
        case type.Set_Hot_Videos:
            return {
                ...state,
                hotVideos: action.hotVideos
            }
        case type.Set_Recommend:
            return {
                ...state,
                recommend: action.recommend
            }
        default:
            return {
                ...state
            }
    }
}


export default homeReducer;