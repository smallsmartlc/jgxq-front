import request from '@/utils/request'

export const searchTag = (keyword) => request({
    method: 'get',
    url: `/tag/search`,
    params : {keyword}
})

export const pageTag = (cur,size,keyword) => request({
    method: 'get',
    url : `/tag/page/${cur}/${size}`,
    params : {keyword}
})
export const searchAutocomplete = (keyword) =>  request({
    method: 'get',
    url: `/tag/recommend`,
    params : {keyword}
})