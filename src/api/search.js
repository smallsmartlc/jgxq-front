import request from '@/utils/request'

export const searchTag = (keyword) => request({
    method: 'get',
    url: `/tag/search`,
    params : {keyword}
})