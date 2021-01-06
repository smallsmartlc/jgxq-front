import request from '@/utils/request'

export const userUploadImg = (data,type)=>request({
    method: 'post',
    url: `/file/img/upload/${type}`,
    data,
});