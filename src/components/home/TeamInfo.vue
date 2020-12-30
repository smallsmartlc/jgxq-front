<template>
  <div style="height:100%;width:100%;">
    <el-scrollbar style="height:100%;">
      <infos-box v-if="teamInfo.infos.normal" title = "基本信息" :items = 'teamInfo.infos.normal'></infos-box>
      <infos-box v-if="teamInfo.infos.contact" title = "联系方式" :items = 'teamInfo.infos.contact'></infos-box>
      <champion-box v-if="teamInfo.infos.champions" title = "荣誉记录" :items = 'teamInfo.infos.champions'></champion-box>
    </el-scrollbar>
  </div>
</template>

<script>
import InfosBox from '../common/InfosBox'
import ChampionBox from '../common/ChampionBox'
export default {
    components : {InfosBox,ChampionBox},
    data() {
        return {
          count: 2,
          loading: false,
          teamInfo : {
          "id": 1,
          "name": "重邮经管",
          "enName": "JINGGUAN FC",
          "logo": "images/jgxq/headimg/abbaff7386d74a5286a73c8bf59c608e.png",
          "infos": {
              "normal": [
                  {
                      "name": "成立时间",
                      "value": "xxxx年"
                  },
                  {
                      "name": "所在地区",
                      "value": "中国 重庆"
                  },
                  {
                      "name": "球队主场",
                      "value": "风华体育场"
                  }
              ],
              "contact": [
                  {
                      "name": "qq",
                      "value": "cquptjgxq"
                  },
                  {
                      "name": "bilibili",
                      "value": "经管雄起"
                  },
                  {
                      "name": "email",
                      "value": "jgxq@foxmail.com"
                  },
                  {
                      "name": "地址",
                      "value": "重庆邮电大学18栋705"
                  }
              ],
              "champions": [
                  {
                      "name": "重庆邮电大学超级联赛乙组",
                      "time": [
                          "2019/2020","2020/2021","2020/2021","2020/2021","2020/2021","2020/2021"
                      ]
                  },
                  {
                      "name": "重庆邮电大学青春杯",
                      "time": [
                          "2012/2013"
                      ]
                  }
              ]
          }
        }
      }
    },
    props : {
    },
    computed: {
    },
}
</script>

<style scoped>

</style>