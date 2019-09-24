<template>
  <div class="home">
    <van-nav-bar title="首页" />

    <van-tabs v-model="tabActive">
      <van-tab v-for="item in channelList" :title="item.name">
        <!-- 列表 -->
        <van-list v-model="loading" :finished="finished" finished-text="我是有底线的！" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>

      <!-- 右边要一个图标，但是用van-tab是无法实现的 -->
      <div class="my-right-tab">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

  </div>
</template>

<script>

// 导入请求工具
import { getChannel } from '@/api/channel'

export default {
  data() {
    return {
      // 跟tabs绑定的下标，现在默认让下标0的tab激活
      tabActive: 0,
      loading: false,
      finished: false,
      list: [],
      //频道数据
      channelList:[]
    };
  },

  methods: {
    // 需要加载数据的事件
    // 什么时候需要加载数据？
    // 本质上是：如果格子还没铺满就会调用这个事件
    onLoad() {
      // 这个方法一旦调用，会自动先把loading改成true

      // console.log('123');

      //   // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        // 如果数据回来了，记得把加载动画要改为false
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 2500);
    }
  },

  async created(){

      let res = await getChannel()
    //   console.log(res);
     this.channelList = res.data.data.channels;
      
  }
};
</script>


<style lang="less" scoped>
// scoped对于自己组件里的组件没用，因为太深了，所以你要在这里设置组件里的组件的样式，就不要加scoped
// 我既要自己能用scoped，也要让自己组件里的组件也能用上我这个样式，那么要用vue给我们提供的一个选择器：深度选择器(/deep/)
.home {
  margin-top: 90px;
  margin-bottom:44px;

  /deep/.van-tabs__wrap {
    position: fixed;
    left: 0;
    top: 46px;
    z-index: 999;
    width: 90%;
  }

  .my-right-tab {
    position: fixed;
    right: 10px;
    top: 53px;
  }
}
</style>