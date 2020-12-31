<template>
    <el-row>
        <el-col :span="16">
            <news-list/>
        </el-col>
            <el-col :span="6" :offset="2" class = "hidden-md-and-down">
            <follow-us/>
        </el-col>
    </el-row>
</template>

<script>
import FollowUs from './news/FollowUs.vue'
import NewsList from "./news/NewsList.vue"

export default {
  components: { NewsList, FollowUs },
  name: 'JGNews',
  data () {
    return {

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>