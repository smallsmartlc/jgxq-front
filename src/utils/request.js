import axios from 'axios'
import {BaseUrl} from "../constants";
import router from '@/router/index'
import _this from '../main'
import {Message,Loading} from 'element-ui'
import * as utils from './common.js'

let loading = null
let timer = null
const messageTime = 1600


var http = axios.create({
    baseURL:BaseUrl,
    timeout: 10000,
    responseType: 'json',
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        'Content-type': 'application/json;charset=UTF-8'
    },
    retry: 4,
    retryDelay: 1000
})
export default http

// 使用Element loading-start 方法
function startLoading() {
    loading = Loading.service({
        lock: false,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0)'
    })
}

// 使用Element loading-close 方法
function endLoading() {
    loading.close()
}

// 确保将同一时刻的请求合并
let needLoadingRequestCount = 0

// 展示加载效果
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        timer = setTimeout(() => {
            startLoading()
            clearTimeout(timer)
        }, 1500)
    }
    needLoadingRequestCount++
}

//关闭加载效果
export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        timer && clearTimeout(timer)
        loading && endLoading()
    }
}

http.interceptors.response.use(
    res => {
        // code为非200是抛错
        if (res.status != 200) {
            if(res.status == 204){
                Message({
                    message: '您还不能发表新闻哦,去申请成为创作者吧!!!',
                    type: 'warning',
                    duration: messageTime
                })
                tryHideFullScreenLoading()
                return Promise.reject(res.message)
            }
            Message({
                message: res.statusText,
                type: 'error',
                duration: messageTime
            })
            tryHideFullScreenLoading()
            return Promise.reject(res.message)
        } else {
            // token失效返回code，后台还在开发中
            
            tryHideFullScreenLoading()
            const data = res.data
            if (data && data.code === '200') {
                data.code = 200
            }
            return data
        }
    },
    error => {
        let errorStr = error + ''
        if (errorStr.search('timeout') !== -1 && utils.isEmpty(error.response)) {
            // 超时处理
            let config = error.config
            let url = config.url.replace(BaseUrl, '')
            config.__retryCount = config.__retryCount || 0
            if (config.__retryCount >= config.retry) {
                tryHideFullScreenLoading()
                return Promise.reject(error)
            }
            config.__retryCount += 1
            let backoff = new Promise(function (resolve) {
                setTimeout(function () {
                    resolve()
                }, config.retryDelay || 1)
            })
            tryHideFullScreenLoading()
            return backoff.then(function () {
                config.url = url
                return http(config)
            })
        } else {
            if (error.response && !utils.isEmpty(error.response.status)) {
                if (error.response.status === 401) {
                    const domain = window.location.host
                        .split('.')
                        .slice(1)
                        .join('.')
                    // setLocalCookieDomain(userTokenStorageKey, '', domain)
                    localStorage.clear()
                    Message({
                        message: '请先登陆再操作',
                        type: 'warning'
                    });
                    router.push('/login')
                }
                // 400,500异常处理，统一提示错误消息
                if (error.response.status === 500 || error.response.status === 400) {
                    Message({
                        message: error.response.data.message || '服务器异常，请联系管理员',
                        type: 'error',
                        duration: messageTime
                    })  
                }
                if (error.response.status === 404) {
                    router.push({
                        path: '/error/404'
                    })
                }
                if (error.response.status === 403) {
                    // router.push({
                    //     path: '/error/403'
                    // })
                    Message({
                        message: '没有权限！',
                        type: 'error'
                    });
                }
                let errorInfo =  error.response.data.error ? error.response.data.error.message : error.response.data;
                return Promise.reject(errorInfo);
            }
            // let errorInfo = error.message ? error.message : error.data
            tryHideFullScreenLoading()
            // return Promise.reject(errorInfo)
            // return Promise.reject(error.response)
        }
    }
)