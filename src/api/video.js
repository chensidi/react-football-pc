import http from './http';

export default {
    async getLeagueVideo(
        {league, before, after}
    ) {
        const res = await http.post('/video/getVideoList', {league, before, after});
        return res.data;
    },

    async getHotVideoList() {
        const res = await http.get('/video/getHotVideo');
        return res.data;
    }
}