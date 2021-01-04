import request from '@/utils/request'

export const getCode = (email) => request({
    method: 'post',
    url: `/check/getCode/${email}/FIND`
})
export const findPassword = (data) => request({
    method: 'post',
    url: `/check/findPassword`,
    data
})
