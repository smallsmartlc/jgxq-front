import request from '@/utils/request'

export const getUserInfo = (params) => request({
    method: 'get',
    url: `/user/info`,
    params : params
})
export const getFocusUser = (params) => request({
    method: 'get',
    url: `/user/page/focus`,
    params : params
})
export const getFansUser = (params) => request({
    method: 'get',
    url: `/user/page/fans`,
    params : params
})
export const pageMessage = (pageNum,pageSize) => request({
    method: 'get',
    url: `/message`,
    params :{
        pageNum,pageSize
    }
})
export const getCollectNews = (pageNum,pageSize) => request({
    method: 'get',
    url: `/user/page/collect`,
    params :{
        pageNum,pageSize
    }
})
