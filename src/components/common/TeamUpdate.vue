<template>
    <el-dialog
    v-loading = "dloading"
    title="选择你的主队"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="400px">
        <div class="teamBoxes">
            <el-scrollbar style="height:100%;">
                <div class="box_wrap"  v-infinite-scroll="loadTeam" infinite-scroll-distance="10" infinite-scroll-disabled="tdisabled">
                    <div class="teamItem" v-for="item in teams" :key="item.id">
                        <div @click="focusThis(item.id)" style="position:relative">
                            <el-image  class="team_hover" :class="focus===item.id?'isactive':''"
                            :src="$utils.url2img(item.logo)"
                            fit="contain"><el-badge class="mark" :value="12" /></el-image>
                            <div v-if="focus===item.id" style="position:absolute;bottom:0;right:0;">
                                <el-badge class="mark" value="选好了" />
                            </div> 
                        </div>
                        <div style="font-size:14px">{{item.name}}</div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="addTeam">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {pageTeams} from '@/api/team'
import {updateHomeTeam} from '@/api/user'
export default {
    data() {
        return {
            teams : [],
            tcur : 0,
            tsize : 10,
            total : 1,
            tloading: false,
            dloading : false,
            focus : null,
        }
    },
    props : {
        dialogVisible:Boolean,
    },
    methods:{
        loadTeam(){
            this.tloading = true
            this.tcur++;
            pageTeams(this.tcur,this.tsize,'HEAT').then((res)=>{
                if(res.code == 200){
                    var temp = res.data.data;
                    this.ttotal = res.data.total
                    this.teams = this.teams.concat(temp);
                }else this.tcur--;
                this.tloading = false;
            })
        },
        focusThis(id){
            if(this.focus == id){
                this.focus = null
            }else{
                this.focus = id;
            }
        },
        addTeam(){
            if(!this.focus){
                this.$message({
                    type:"warning",
                    message : "你还没有选择主队",
                })
                return;
            }
            this.dloading = true;
            updateHomeTeam(this.focus).then((res)=>{
                if(res.code == 200){
                    if(res.data){
                        this.$message({
                            type:"success",
                            message : "主队更新成功!",
                        })
                        this.close();
                        window.location.reload();
                    }else{
                        this.$message({
                        type:"error",
                        message : '更新失败,检查主队是否选择正确',
                    })
                    }
                }else{
                    this.$message({
                        type:"error",
                        message : res.msg,
                    })
                }
                this.dloading = false;
            })
            this.close();
        },
        close(){
            this.$emit("close")
        }
    },
    computed:{
        tnoMore () {
            return this.teams.length >= this.ttotal
        },
        tdisabled () {
            return this.tloading || this.tnoMore
        }
    }
}
</script>

<style scpoed>
    .teamBoxes{
        height:300px;
    }
    .box_wrap{
        display: flex;
        flex-wrap: wrap;
    }
    .teamItem{
        margin: 15px;
        /* display: flex; */
    }
    .team_hover:hover{
        border: 2px solid #fc0!important;
        background-color: rgba(255,204,0,0.2)!important;
    }
    .teamItem .el-image{
        border: 2px solid #fff;
        background-color: #f2f2f2;
        border-radius: 50%;
        width: 60px; 
        height: 60px;
        padding:10px;
        cursor: pointer;
    }
    .isactive{
        border: 2px solid #fc0!important;
        background-color: rgba(255,204,0,0.2)!important;
    }
</style>