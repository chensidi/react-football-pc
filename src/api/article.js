import http from './http'

export default {
    async getDetails(id) {
        const res = await http.get(`/article/getArticlePc`, {id})
        return res.data.data
    },
    async getRelatedArticle(id, size) {
        const res = await http.get(`/article/getRelatedArticle`, {id, size})
        return res.data
    },
}