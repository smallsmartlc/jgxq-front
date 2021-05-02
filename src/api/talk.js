import request from '@/utils/request'

export const pageTalk = (cur,size) => request({
    method: 'get',
    url: `/talk/page/${cur}/${size}`,
})
export const pageComment = (objId,cur,pageSize) => request({
    method : 'get',
    url: `/comment/1/${objId}/${cur}/${pageSize}`,
})
export const deleteTalk = (id) => request({
    method : 'delete',
    url: `/talk/${id}`
})
export const getTalkById = (id) => request({
    method: 'get',
    url: `/talk/${id}`,
})
export const pageTalkList = (params) => request({
    method: 'get',
    url: `/talk/page/user`,
    params : params,
})
export const addTalk = (text) => request({
    method: 'post',
    url: `/talk`,
    data : {text},
})