import request from '@/utils/request'

export const getUserInfo = (params) => request({
    method: 'get',
    url: `/user/info`,
    params : params
})