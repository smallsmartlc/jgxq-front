<template>
<div>
<div class="fomations">
    <div class="fomation">
        <div v-for="(item,index) in homeGroup(matchInfo)" :key="'home'+index" class="line">
            <div class="player_container" v-for="(player,index2) in item" :key="`home${index}-${index2}`">
                <div class="player home">{{player.number}}</div>
                <div style="color:#fff;font-size:14px">{{player.name}}</div>
            </div>
        </div>
    </div>
    <div class="fomation">
        <div v-for="(item,index) in visitingGroup(matchInfo).reverse()" :key="'home'+index" class="line">
            <div class="player_container" v-for="(player,index2) in item" :key="`visit${index}-${index2}`">
                <div class="player visiting">{{player.number}}</div>
                <div style="color:#fff;font-size:14px">{{player.name}}</div>
            </div>
        </div>
    </div>
</div>
<div class="row">替补阵容</div>
<div style="width:100%;display:flex;">
    <div class="col">
        <div class="row">主队</div>
        <div v-for="(item,index) in matchInfo.homeSubstitute" :key="'home_sub'+index" class="row">
            <div class="player home" style="margin-right:10px">{{item.number}}</div>
            <div>{{item.name}}</div>
        </div>
    </div>
    <div class="col">
        <div class="row">客队</div>
        <div v-for="(item,index) in matchInfo.visitingSubstitute" :key="'visiting_sub'+index" class="row">
            <div class="player visiting" style="margin-right:10px">{{item.number}}</div>
            <div>{{item.name}}</div>
        </div>      
    </div>
</div>
</div>
</template>

<script>
export default {
data() {
    return {
        
    }
},
props : {
matchInfo:Object,
},
computed: {
    homeGroup(){
        return (matchInfo)=>{
            var newArr = [];
            if(!this.matchInfo.homeLineUp) return;
            this.matchInfo.homeLineUp.forEach(e => {
                if(!newArr[e.matchPos]){
                    newArr[e.matchPos] = [];
                }
                newArr[e.matchPos].push(e);
            });
            return newArr;
        }
    },
    visitingGroup(){
        return (matchInfo)=>{
            var newArr = [];
            if(!this.matchInfo.visitingLineUp) return;
            this.matchInfo.visitingLineUp.forEach(e => {
                if(!newArr[e.matchPos]){
                    newArr[e.matchPos] = [];
                }
                newArr[e.matchPos].push(e);
            });
            return newArr;
        }
    }
},
}
</script>

<style scoped>
.player_container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.row{
    display: flex;
    align-items: center;
    padding: 20px;
    border: 1px solid #E6E4DC;
    font-size: 20px;
}
.col{
    width:50%;
}
.home{
    border: 2px solid #000;
    background-color: red;
}
.visiting{
    border: 2px solid red;
    background-color: #191970;
}
.player{
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
}
.line{
    display: flex;
    justify-content: space-around;  
}
.fomation{
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.fomations{
    height:1000px;
    background:  url("../../assets/playground.jpg") no-repeat;
    background-size: 100% 100%; 
}
</style>