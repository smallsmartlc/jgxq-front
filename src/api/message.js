import request from '@/utils/request'

export const hasMessage = () => request({
    method: 'get',
    url: `/message/message`,
})