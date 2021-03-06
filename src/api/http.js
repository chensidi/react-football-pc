import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

class Http {
    instance;
    constructor() {
        this.init();
    }
    init() {
        // 创建 axios 实例
        this.instance = axios.create({
            baseURL: isDev ? '/api' : 'http://zhoup.top:8089/api',
            timeout: 10000 // 请求超时时间
        })
        // 拦截器配置---------------------------------------------------------------------------------------------------------------
        this.instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config
        }, function (error) {
            return Promise.reject(error)
        })
        this.instance.interceptors.response.use(function (res) {
            // do something
            return res.data;
        }, function (error) {
            return Promise.reject(error)
        })
    }
    get(url, params = {}) {
        return this.instance.get(url, {
            params
        })
    }
    post(url, data = {}) {
        return this.instance.post(url, {
            ...data
        })
    }
}

const http = new Http();

export default http;