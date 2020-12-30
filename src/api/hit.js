import request from '@/utils/request'

export const commentObj = (commentReq)=> request({
    method: 'post',
    url: `/comment`,
    data :  commentReq 
})