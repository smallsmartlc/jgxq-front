/**
 * axios的二次封装，统一捕获异常接口，鉴权，重定向，消息提示功能
 * Created by ls on 2018/4/20.
 */
import axios from 'axios'
// import {
//     Message,
//     Loading
// } from 'element-ui'
// // import * as utils from '@wallejs/utils'
// // import {
// //     setLocalCookieDomain
// // } from '@/utils/cookie'
// import {
//     BaseUrl,
//     // userTokenStorageKey
// } from "../constants";
// import router from '@/router/index'
// import _this from '../main'
 
// let loading = null
// let timer = null
// const messageTime = 1600


// // 使用Element loading-start 方法
// function startLoading() {
//     loading = Loading.service({
//         lock: false,
//         text: '加载中',
//         background: 'rgba(0, 0, 0, 0)'
//     })
// }

// // 使用Element loading-close 方法
// function endLoading() {
//     loading.close()
// }

// // 确保将同一时刻的请求合并
// let needLoadingRequestCount = 0

// // 展示加载效果
// export function showFullScreenLoading() {
//     if (needLoadingRequestCount === 0) {
//         timer = setTimeout(() => {
//             startLoading()
//             clearTimeout(timer)
//         }, 1500)
//     }
//     needLoadingRequestCount++
// }

// 关闭加载效果
// export function tryHideFullScreenLoading() {
//     if (needLoadingRequestCount <= 0) return
//     needLoadingRequestCount--
//     if (needLoadingRequestCount === 0) {
//         timer && clearTimeout(timer)
//         loading && endLoading()
//     }
// }

// 创建axios实例
const http = axios.create({
    baseURL: "http://localhost:6800",
    // BaseUrl: '/api',
    timeout: 10000,
    responseType: 'json',
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        'Content-type': 'application/json;charset=UTF-8'
    },
    retry: 4,
    retryDelay: 1000
})
// request拦截器
// http.interceptors.request.use(
//     config => {
//         let isLoad = true
//         // 鉴权token , 给头部带上token
//         // if (Cookies.get(userTokenStorageKey)) {
//         //     // token的获取需要根据中间层决定
//         //     config.headers.Authorization = Cookies.get(userTokenStorageKey);
//         //     // teamId
//         //     config.headers.teamId = window.localStorage.getItem('teamId');
//         // }
//         config.headers.teamId = window.localStorage.getItem('teamId') || '';
//         // 角色管理分类
//         // console.log(_this.$route.meta.auth.roleType)

//         if (_this.$route.meta && _this.$route.meta.auth && _this.$route.meta.auth.roleType) {
//             config.headers.appId = _this.$route.meta.auth.roleType;
//         }

//         if (config.params && config.params.roleType) {
//             config.headers.appId = config.params.roleType;
//         }
//         // 在发送请求之前做某件事
//         if (config.method === 'post' ||
//             config.method === 'put' ||
//             config.method === 'delete') {
//             // 序列化
//             if (!utils.is.isEmpty(config.data)) {
//                 isLoad = config.data.isLoad
//                 if (!isLoad) {
//                     delete config.data.isLoad
//                 }
//             }
//         }
//         if (!utils.is.isEmpty(config.params)) {
//             isLoad = config.params.isLoad
//             if (!isLoad) {
//                 delete config.params.isLoad
//             }
//         }
//         if (isLoad === undefined || isLoad) {
//             showFullScreenLoading()
//         }
//         return config
//     },
//     error => {
//         Message({
//             showClose: true,
//             message: error,
//             type: 'error.data.error.message'
//         })
//         return Promise.reject(error.data.error.message)
//     }
// )
// // respone拦截器
// http.interceptors.response.use(
//     res => {
//         // code为非200是抛错
//         if (res.status !== 200) {
//             Message({
//                 message: res.statusText,
//                 type: 'error',
//                 duration: messageTime
//             })
//             tryHideFullScreenLoading()
//             return Promise.reject(res.message)
//         } else {
//             // token失效返回code，后台还在开发中
//             tryHideFullScreenLoading()
//             const data = res.datas
//             if (data && data.code === '200') {
//                 data.code = 200
//             }
//             return data
//         }
//     },
//     error => {
//         let errorStr = error + ''
//         if (errorStr.search('timeout') !== -1 && utils.is.isEmpty(error.response)) {
//             // 超时处理
//             let config = error.config
//             let url = config.url.replace(BaseUrl, '')
//             config.__retryCount = config.__retryCount || 0
//             if (config.__retryCount >= config.retry) {
//                 tryHideFullScreenLoading()
//                 return Promise.reject(error)
//             }
//             config.__retryCount += 1
//             let backoff = new Promise(function (resolve) {
//                 setTimeout(function () {
//                     resolve()
//                 }, config.retryDelay || 1)
//             })
//             tryHideFullScreenLoading()
//             return backoff.then(function () {
//                 config.url = url
//                 return http(config)
//             })
//         } else {
//             if (error.response && !utils.is.isEmpty(error.response.status)) {
//                 if (error.response.status === 401) {
//                     const domain = window.location.host
//                         .split('.')
//                         .slice(1)
//                         .join('.')
//                     // setLocalCookieDomain(userTokenStorageKey, '', domain)
//                     localStorage.clear()
//                     router.push('/login')
//                 }
//                 console.log(error.response)
//                 // 400,500异常处理，统一提示错误消息
//                 if (error.response.status === 500 || error.response.status === 400) {
//                     Message({
//                         message: error.response.data.message || '服务器异常，请联系管理员',
//                         type: 'error',
//                         duration: messageTime
//                     })
//                 }
//                 if (error.response.status === 404) {
//                     router.push({
//                         path: '/error/404'
//                     })
//                 }
//                 if (error.response.status === 403) {
//                     // router.push({
//                     //     path: '/error/403'
//                     // })
//                     Message({
//                         message: '没有权限！',
//                         type: 'error'
//                     });
//                 }
//             }
//             // let errorInfo = error.message ? error.message : error.data
//             tryHideFullScreenLoading()
//             // return Promise.reject(errorInfo)
//             return Promise.reject(error.response)
//         }
//     }
// )
export default http
