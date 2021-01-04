import request from '@/utils/request'

export const getCode = (email) => request({
    method: 'post',
    url: `/check/getCode/${email}/REG`
})
export const userRegister = (data) => request({
    method: 'post',
    url: `/check/register`,
    data
})
