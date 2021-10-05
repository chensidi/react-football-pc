import http from './http';

const rankingsApi = {
    async getSeasons(competitionId) {
        const res = await http.get(`/ranking/getSeasons`, {
            competitionId
        })
        return res.data
    },
    async getStanding(seasonId) {
        const res = await http.get(`/ranking/getRankingByType`, {
            seasonId,
            ranking: 'standing'
        })
        return res.data
    },
    async getCateByType(seasonId, type) {
        const res = await http.get(`/ranking/getCateByType`, {
            seasonId,
            type
        })
        return res.data
    },
    async getRankingByType(type, seasonId, ranking) {
        const res = await http.get(`/ranking/getRankingByType`, {
            seasonId,
            type,
            ranking
        })
        return res.data
    }
}

export default rankingsApi;