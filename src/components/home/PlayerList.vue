<template>
  <div style="height:100%;width:100%;">
    <el-scrollbar style="height:100%;">
    <ul>
    <li v-for="item in playerList" :key="item.id" style="font-size:14px">
      <div style="background-color:#f7f7f7;padding:5px;color:#666;">{{item.name}}</div>
      <div v-for="player in item.playerList" :key="player.id" style="padding:5px;display:flex">
        <div><el-avatar :size="60" 
                :src="'http://localhost:6800/images/'+player.headImage" 
                fit="cover"
                style="background:#fff;margin:auto 0"
                ></el-avatar></div>
        <div style="margin:auto 0">
          <div>{{player.name}}</div>
          <div style="color:#666;font-size:12px">{{player.age}}岁·{{player.number}}号·{{player.nation}}</div>
        </div>
      </div>
    </li>
    </ul>
    </el-scrollbar>
  </div>
</template>

<script>

export default {
   
    data() {
        return {
          count: 2,
          loading: false,
          playerList : [
        {
            "name": "前锋",
            "playerList": [
                {
                    "id": 0,
                    "name": "梅西",
                    "headImage": "images/jgxq/playerimg/a952b1aca54f4344ac2a4630163cdd94.jpg",
                    "nation": "阿根廷",
                    "number": 10,
                    "position": 3,
                    "age": 33
                }
            ]
        },
        {
            "name": "中场",
            "playerList": [
                {
                    "id": 6,
                    "name": "小聪明",
                    "headImage": "images/jgxq/headimg/6413a281ef1f4a7a9a81f9933a8482b6.gif",
                    "nation": "中国",
                    "number": 7,
                    "position": 2,
                    "age": 22
                }
            ]
        },
        {
            "name": "后卫",
            "playerList": [
                {
                    "id": 5,
                    "name": "刘柏辛",
                    "headImage": "images/jgxq/playerimg/7eb65ce2c4474c5b9cdc08ffdf7ad00b.jpg",
                    "nation": "中国",
                    "number": 1,
                    "position": 1,
                    "age": 22
                }
            ]
        },
        {
            "name": "门将",
            "playerList": [
                {
                    "id": 4,
                    "name": "胡杰洋",
                    "headImage": "images/jgxq/playerimg/9e6bcad3a6e04c3fb753433337357f51.png",
                    "nation": "中国",
                    "number": 1,
                    "position": 0,
                    "age": 22
                }
            ]
        }
    ]
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