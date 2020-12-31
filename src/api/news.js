import request from '@/utils/request'

export const getNewsById = (id) => request({
    method: 'get',
    url: `/news/${id}`,
})
export const pageComment = (objId,cur,pageSize) => request({
    method : 'get',
    url: `/comment/0/${objId}/${cur}/${pageSize}`,
})
export const pageNewsByTag = (cur,pageSize,objectId,type) =>request({
    method: 'get',
    url: `news/page/tag/${cur}/${pageSize}`,
    params:{
        objectId,
        type
    }
})
export const pageNews = (cur,pageSize) =>request({
    method: 'get',
    url: `news/page/${cur}/${pageSize}`,
})
export const homeNews = (size)=>request({
    method : "get",
    url: `news/home/top`,
    params:{
        size,
    }
})
