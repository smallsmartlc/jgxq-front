import request from '@/utils/request'

export const getAuthorInfo = () => request({
    method: 'get',
    url: `/user/authorInfo`,
})
