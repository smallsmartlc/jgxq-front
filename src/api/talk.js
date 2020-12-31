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