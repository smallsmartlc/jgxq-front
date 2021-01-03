<template>
  <el-row>
      <el-col :span="14" :offset="2">
        <div>
            
        </div>
      </el-col>
      <el-col :span="6" :offset="2" class = "hidden-md-and-down">
        
      </el-col>
  </el-row>
</template>

<script>
import {getPlayerById} from '@/api/player'

export default {
    components: { MatchFomation,MatchRight, NewsLBox },
    mounted() {
        this.getPlayerById();
    },
    data() {
        return {
            player : {},
        }
    },
    methods: {
        getPlayerById(){
            getPlayerById(this.$route.params.id).then((res)=>{
                if(res.code == 200){
                    this.player = res.data;
                }
            })
        }
    },
    computed: {

    },
}
</script>

<style scoped>

</style>