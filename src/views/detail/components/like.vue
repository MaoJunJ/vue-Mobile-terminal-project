<template>
  <van-cell>
    <template slot="title">
      <div style="display:flex;">
        <div v-show="detail.attitude != 0">
          <van-button v-if="detail.attitude == -1" icon="star-o" @click="zan">点赞</van-button>
          <van-button v-else icon="star" type="danger" @click="unZan">取消点赞</van-button>
        </div>

        <div>
            <van-button v-if="detail.attitude != 0" icon="like-o" @click="doUnLike">不喜欢</van-button>
            <van-button v-else icon="like" type="danger" @click="doCancel">取消不喜欢</van-button>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { zanArt, unZanArt, unLike, cancelUnLike } from "@/api/article.js";
export default {
  props: ["detail"],
  data() {
      return {
   
      }
  },
  methods: {
    async zan() {
      await zanArt(this.detail.art_id);
      // 点赞后变成1，所以先本地改成1，那样就不用手动刷新了
      this.detail.attitude = 1;
    },

    async unZan() {
      await unZanArt(this.detail.art_id);
      // -1代表没有点赞
      this.detail.attitude = -1;
    },

    async doUnLike() {
      await unLike(this.detail.art_id);
      this.detail.attitude = 0;
    },

    async doCancel(){

        await cancelUnLike(this.detail.art_id);
        this.detail.attitude = -1;
    }
  }
};
</script>

<style>
</style>