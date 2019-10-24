<template>
  <van-cell class="cmt-bottom">
    <template slot="title">
      <div class="cmt-box">
        <!-- 左边的输入框 -->
        <van-cell-group class="inpt">
          <van-field
            v-model="content"
            style="background-color:#eeeeee;border-radius:20px;"
            placeholder="写评论"
            left-icon="edit"
          />
        </van-cell-group>
        <!-- 中间的按钮 -->
        <van-button type="danger" size="small" @click="doSend">发送</van-button>
        <!-- 右边的图标按钮 -->
        <van-icon name="star-o"></van-icon>
      </div>
    </template>
  </van-cell>
</template>

<script>

import { sendComment } from '@/api/comment.js'

export default {
    props:[ 'detail','cmtList','isReply','currentCmt','popCmtList' ],
    data() {
        return {
            content:"",
        }
    },

    methods: {
        // 发送的点击事件
        async doSend(){

            // 发请求
            if(this.$isLogin()){

                //发请求判断是否为空
                if(this.content.trim() == ""){
                    this.$toast('请输入点内容')
                    return;
                }

              if(this.isReply){
               
                  // 给评论加回复
                  let res = await sendComment( {

                    target:this.currentCmt.com_id.toString(),
                    content:this.content,
                    art_id:this.detail.art_id
                  } )

                  this.popCmtList.unshift(res.data.data.new_obj)
                  this.currentCmt.reply_count++;
                  this.content = "";
                  
              }else{
                 // 给文章加评论
                 // 能来到这代表既登录了而且不为空，就应该发请求了
                let res = await sendComment( {
                    target:this.detail.art_id,
                    content:this.content,
                } )

                // console.log(res);
                
                // 给评论数组加一条数据（避免刷新才能看到）
                this.cmtList.unshift(res.data.data.new_obj)

                this.content = "";

              }

            }
        }
    },
};
</script>

<style lang="less" scoped>
.cmt-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;

  .cmt-box {
    display: flex;
    align-items: center;

    .inpt{
        flex:1;
    }

    .van-button{

        margin: 0 10px;
    }
  }
}
</style>