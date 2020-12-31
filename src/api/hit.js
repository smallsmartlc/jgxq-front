import request from '@/utils/request'

export const thumbById = (type,id)=>request({
    method: 'post',
    url: `/thumb/${type}/${id}`,
});
export const collectById = (type,id,collected)=>request({
    method: 'post',
    url: `/collect/${type}/${id}`,
    params : {collected}
})