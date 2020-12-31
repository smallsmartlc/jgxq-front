import request from '@/utils/request'

export const commentObj = (commentReq)=> request({
    method: 'post',
    url: `/comment`,
    data :  commentReq
})
export const pageReply = (objId,cur,pageSize) => request({
    method : 'get',
    url: `/comment/reply/${objId}/${cur}/${pageSize}`,
})
export const deleteComment = (id)=> request({
    method : 'delete',
    url:`/comment/${id}`
})