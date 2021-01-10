import jsCookie from 'js-cookie'
import { jgCookie,cookieDomain } from '@/constants/index'

export function logOut(){
    jsCookie.remove(jgCookie, { domain: cookieDomain });
}