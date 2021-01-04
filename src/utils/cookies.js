import jsCookie from 'js-cookie'
import { jgCookie } from '@/constants/index'

export function logOut(){
    jsCookie.remove(jgCookie);
}