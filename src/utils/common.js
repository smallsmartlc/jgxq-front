import { imgUrl } from '@/constants/index'

export function isEmpty(str){
    if(typeof str == "undefined" || str == null || str == ""){
        return true;
    }else{
        return false;
    }
}
export function url2img(str){
    return imgUrl + str;
}