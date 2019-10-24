<template>
  <van-cell>
    <template slot="title">
      <div class="my-author">
        <!-- 左边图片，尝试不要单独用img，而是包一个div，特别是在用弹性布局的时候 -->
        <div>
          <img :src="detail.aut_photo" alt />
        </div>
        <!-- 中间cell -->
        <van-cell :title="detail.aut_name" :label="detail.pubdate | relvTime"></van-cell>
        <!-- 右边按钮 -->
        <van-button v-if="detail.is_followed" size="small" @click="doCancel(detail.aut_id)">取关</van-button>
        <van-button v-else type="danger" size="small" @click="doFollow(detail.aut_id)">关注</van-button>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { follow, cancelFollow } from "@/api/user.js";

export default {
  props: ["detail"],

  methods: {
    async doFollow(aut_id) {
      //先判断是否登录
      if (this.$isLogin()) {
          
        await follow(aut_id);
        this.detail.is_followed = true;
      }
    },

    async doCancel(aut_id) {
      if (this.$isLogin()) {
        await cancelFollow(aut_id);
        this.detail.is_followed = false;
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
}
</style>