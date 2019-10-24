<template>
  <van-cell>
    <span slot="title">
      <div class="my-author">
        <!-- 左边图片 -->
        <div>
          <img :src="cmt.aut_photo" alt />
        </div>
        <!-- 中间cell -->
        <van-cell>
          <template slot="title">
            <div>
              <div>{{ cmt.aut_name }}</div>
              <div>{{ cmt.content }}</div>
              <div>
                <span>{{ cmt.pubdate | relvTime }}</span>
                <span @click="doReply">回复({{ cmt.reply_count }})</span>
              </div>
            </div>
          </template>
        </van-cell>
        <!-- 右边按钮 -->
        <div class="zan-box" @click="zan">
          <van-icon
            :class="{ zanColor : cmt.is_liking }"
            :name="cmt.is_liking ? 'good-job': 'good-job-o'"
          ></van-icon>
          <span>{{ cmt.like_count }}</span>
        </div>
      </div>
    </span>
  </van-cell>
</template>

<script>
import { addZan,cancelZan } from "@/api/comment.js";
export default {
  props: ["cmt"],

  methods: {
    doReply() {
      this.$emit("reply", {
        replyShow: true,
        cmt: this.cmt
      });
    },

    async zan() {
      // 如果没点过赞，才发请求去点赞并且+1
      if (!this.cmt.is_liking) {
        //点赞就要发请求
        let res = await addZan(this.cmt.com_id);

        this.cmt.like_count++;
        this.cmt.is_liking = true;

      }else{

        //点过赞了，所以现在要去取消点赞
        let res = await cancelZan(this.cmt.com_id)
        this.cmt.like_count--;
        this.cmt.is_liking = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my-author {
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  span {
    margin-right: 10px;
  }

  .zan-box {
    display: flex;
    align-items: center;
    width: 100px;
    .van-icon {
      font-size: 20px;
      margin-right: 5px;
    }

    .zanColor::before {
      color: red;
    }
  }
}
</style>