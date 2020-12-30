<template>  
    <div class="block" style="width:100%">
        <el-carousel trigger="click" height="400px" indicator-position="outside" style="background-color:#fff;border:10px solid #fff;box-sizing:border-box;">
            <el-carousel-item v-for="item in news.slice(0,5)" :key="item.id" style="display:relative">
                <div>
                    <el-image
                    :src="'http://localhost:6800/images/'+item.cover"
                    fit="cover"></el-image>
                    <div class="small">{{ item.title }}</div>
                </div>
               
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
            loading: false,
            news : [{
                "id": 5,
                "title": "19日NBA综述：篮网大胜绿军，湖人逆转险胜太阳",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 4,
                "title": "为了世界杯入场券，这两个国家真的诉诸战争",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 1,
                "title": "我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 6
            },
            {
                "id": 3,
                "title": "tag修改了!!!!!",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            },
            {
                "id": 2,
                "title": "我是一则好新闻",
                "cover": "images/jgxq/cover/b6b628f361a647e8acd1032ef93a30c8.png",
                "comments": 0
            }
            ],
        }
    }, 
    computed: {
      noMore () {
        return this.count>= 10
      },
      disabled () {
        return this.loading || this.noMore
      }
    }, 
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          //TODO 无限滚动逻辑
          
          this.loading = false
        }, 2000)
      }
    }
} 
</script>

<style scoped>
    .small{
        position:absolute;
        bottom:0;
        font-size:20px;
        color:#fff;
        background-color:rgba(0,0,0,0.5);
        width:100%;
        padding : 10px;
        padding-right: 30%;
        box-sizing:border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow:hidden;
    }
    .el-carousel{
        width: 800px;
    }
    .el-carousel__item h3 {
    color: #696447;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #bfbb99;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #e6e5d3;
  }
</style>