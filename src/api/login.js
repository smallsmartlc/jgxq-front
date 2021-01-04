import request from '@/utils/request'

export const userLogOut = () => request({
    method: 'post',
    url: `/check/logout`,
})
export const checkUser = () => request({
    method: 'get',
    url: `/check`,
})
export const userLogin = (data) => request({
    method: 'post',
    url: `/check/login`,
    data
})
export const emailLogin = (data) => request({
    method: 'post',
    url: `/check/emailLogin`,
    data
})
export const getCode = (email) => request({
    method: 'post',
    url: `/check/getCode/${email}/LOG`
})