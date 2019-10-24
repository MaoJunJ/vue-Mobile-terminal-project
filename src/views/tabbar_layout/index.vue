<template>
  <div>
    <!-- 上面放路由，内容会变化 -->
    <keep-alive include="mine">
      <router-view></router-view>
    </keep-alive>

    <!-- 下面写tabbar -->
    <van-tabbar route v-model="active" class="my-tabbar">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

    name:"tabbar",
    data() {
        return {
            active:0
        }
    },
};
</script>

<style>

</style>