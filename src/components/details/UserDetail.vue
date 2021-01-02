<template>
  <user-interact :user="user"/>
</template>

<script>
import {getUserInfo} from '@/api/user'
import UserInteract from '../user/UserInteract.vue'
export default {
components: { UserInteract },
mounted() {
    this.loadingUser();
},
methods:{
    loadingUser(){
        getUserInfo({target:this.$route.params.userkey}).then((res)=>{
        if(res.code == 200){
            this.user = res.data;
        }
        })
    }
},
data() {
    return {
        user :{}
    }
},
}
</script>

<style>

</style>