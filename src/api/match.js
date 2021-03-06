import http from './http'

const matchApi = {
    async getMatchListByApiPc(api, start) {
        const res = await http.post(`/match/getMatchMenu`, {api, start})
        return res.data
    },
    async getMenu() {
        const res = await http.get(`/match/getMatchMenuPc`)
        return res.data.data.list
    },
    async getMatchList(type, startTime) {
        const res = await http.post('/match/getMatchListPc', {type, startTime})
        return res.data.list;
    },
    async getMatchList2(type, time) {
        const res = await http.post('/match/getMatchList', {type, time})
        return res.data.list;
    },
    async getSituation(matchId) {
        const res = await http.get(`/match/getSituation`, {
            matchId
        })
        return res.data
    },
    async getLineup(matchId) {
        const res = await http.get(`/match/getLineup`, {
            matchId
        })
        return res.data;
    },
    async getAnalysis(matchId) {
        const res = await http.get(`/match/getAnalysis`, {
            matchId
        })
        return res.data;
    },
    async getHighlights(matchId) {
        const res = await http.get(`/match/getHighlights`, {
            matchId
        })
        return res.data;
    }
}

export default matchApi;