import http from './http'

const homeApi = {
    async getMenu() { //获取首页菜单
        const res = await http.get(`/home/getHomeMenu`);
        return res.data
    },
    async getContentList(tabId) { //获取首页列表
        const res = await http.post('/home/getContentListByTab', {tabId})
        return res.data
    },
    async getPageData(pageData) { //分页
        const res = await http.post('/home/getPageData', pageData)
        return res.data;
    },
    async refresh(tabId) { //根据tabId刷新
        const res = await http.get('/home/refresh', {tabId})
        return res.data;
    },
    async getMatch(start) {
        const res = await http.post(`/match/getMatchMenu`, {
            api: 'https://api.dongqiudi.com/data/tab/league/new/5',
            start
        })
        return res.data
    },
    async getTops() {
        const res = await http.get(`/home/getPcTop`)
        return res.data.data;
    },
    async getPlats() {
        const res = await http.get(`/home/getPcHomePlat`)
        return res.data.data_tabs;
    },
    async getStanding(seasonId) {
        const res = await http.get(`/ranking/getRankingByType`, {
            seasonId,
            ranking: 'standing'
        })
        return res.data
    },
    async getRecommend() {
        const res = await http.get(`/home/getRecommend`)
        return res.data;
    },
    async getImportant() {
        const res = await http.get('/home/getImportantMatch');
        return res.data;
    }
}

export default homeApi