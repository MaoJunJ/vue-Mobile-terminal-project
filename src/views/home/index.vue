<template>
  <div class="home">
    <van-nav-bar title="首页" />

    <van-tabs v-model="tabActive">
      <van-tab v-for="item in channelList" :title="item.name">

      <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
        <!-- 列表 -->
        <van-list v-model="loading" :finished="finished" finished-text="我是有底线的！" @load="onLoad">
          <van-cell v-for="(item,index) in articlList" :key="index" :title="item.title" />
        </van-list>
      </van-pull-refresh>

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
import { getChannel } from '@/api/channel.js'
import { getArticleByTime } from '@/api/article.js'

export default {
  data() {
    return {
      // 设置下拉的加载状态，默认为false
      pullLoading:false,
      // 跟tabs绑定的下标，现在默认让下标0的tab激活
      tabActive: 0,
      loading: false,
      finished: false,
      articlList: [],
      //频道数据
      channelList:[]
    };
  },

  methods: {

    // 只要下拉了，会触发这个事件
    // 触发这个事件会自动把它绑定加载状态改成true
    async onRefresh(){

       // 以当前时间去发个请求
       let channel_id = this.tabActive;
       let timestamp = Date.now();
       let with_top = 1;

       let res = await getArticleByTime( { channel_id, timestamp, with_top } )
       this.articlList.unshift(...res.data.data.results)
       this.pullLoading = false;
      
    },
    
    // 需要加载数据的事件
    // 什么时候需要加载数据？
    // 本质上是：如果格子还没铺满就会调用这个事件
    async onLoad() {
      
      // 拿到当前的频道id
      let channel_id =  this.tabActive;
      let timestamp = Date.now();
      let with_top = 1;
      

      //发请求获取当前频道的新闻列表
      let res = await getArticleByTime( { channel_id,timestamp,with_top } )
      // 这里要用push，要把数组展开后再push
      this.articlList.push(...res.data.data.results);
      this.loading = false;

      // 任何数据可能很多，但最终也会到一个底线，这个底线我们可以自己设置
      // 如果需要设置底线，把这个代码加上，只想无限刷就把它去掉
      // if( this.articlList.length >= 400 ){
        
      //   this.finished = true;
      // }

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