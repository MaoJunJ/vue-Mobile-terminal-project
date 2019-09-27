<template>
  <div class="home">
    <van-nav-bar title="首页" />

    <van-tabs v-model="tabActive" @change="onTabChange">
      <van-tab v-for="item in channelList" :title="item.name">
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
          <!-- 列表 -->
          <van-list v-model="loading" :finished="finished" finished-text="我是有底线的！" @load="onLoad">
            <van-cell v-for="(item,index) in articlList" :key="index" :title="item.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <!-- 右边要一个图标，但是用van-tab是无法实现的 -->
      <div class="my-right-tab" @click="channelShow=true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- <channel :show="channelShow" @change-show="channelShow = $event"></channel> -->
    <!-- <channel v-model="channelShow" :myList="channelList" :active='tabActive' @change-active="tabActive = $event"></channel> -->

    <!-- 
      如果有多个双向绑定，一个v-model不够用
      可以用 :属性.sync 来解决
      但是要用这种写法： 子给父传的事件名前面必须加 update: 事件名 并且事件名要跟父传子的属性一样 
      这样写了后，就可以用 :属性.sync做双向绑定
    -->
    <channel v-model="channelShow" :myList="channelList" :active.sync="tabActive"></channel>
  </div>
</template>

<script>
// 导入请求工具
import { getChannel } from "@/api/channel.js";
import { getArticleByTime } from "@/api/article.js";
import channel from "./channel.vue";
import { getUser, getChannel as localChannel } from "@/utils/storage/";
import { setUser, setChannel } from '../../utils/storage';

export default {
  name: "home",
  components: {
    channel
  },
  data() {
    return {
      channelShow: false,
      // 设置下拉的加载状态，默认为false
      pullLoading: false,
      // 跟tabs绑定的下标，现在默认让下标0的tab激活
      tabActive: 0,
      loading: false,
      finished: false,
      articlList: [],
      //频道数据
      channelList: []
    };
  },

  methods: {
    async onTabChange(name, title) {
      // 要去加载你这一个频道下面的新闻，然后渲染到列表
      let res = await this.loadArticle();
      // console.log(res);
      this.articlList = res.data.data.results;
    },

    // 封装的加载文章数据的方法
    async loadArticle() {
      // 以当前时间去发个请求
      let channel_id = this.channelList[this.tabActive].id;

      let timestamp = Date.now();
      let with_top = 1;

      let res = await getArticleByTime({ channel_id, timestamp, with_top });
      if (res.data.data.results.length == 0) {
        this.finished = true;
      }
      return res;
    },

    // 只要下拉了，会触发这个事件
    // 触发这个事件会自动把它绑定加载状态改成true
    async onRefresh() {
      //因为loadArticle里面用了await，所以这里也要用await，要等它里面的先执行完了
      //我才往下面赋值，如果不加await，代表函数里面异步还没执行，我就开始往下赋值了
      let res = await this.loadArticle();
      //  console.log(res);
      this.articlList.unshift(...res.data.data.results);
      this.pullLoading = false;
    },

    // 需要加载数据的事件
    // 什么时候需要加载数据？
    // 本质上是：如果格子还没铺满就会调用这个事件
    async onLoad() {
      let res = await this.loadArticle();
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

  async created() {
    let local = localChannel();

    if (this.$store.state.userInfo || !local) {
      // 获取用户自己频道
      let res = await getChannel();
      

      // 获取本地的频道
      // 拿到本地的频道的所有id
      // 先对本地存储的频道做一个过滤，把它去掉我自己有的，再加到我们自己的频道里
      let list = local.filter(item => {

        let flag = true;

        res.data.data.channels.forEach(two => {
          // 如果有相等的代表return false不保留
          if (two.id == item.id) {
            flag = false;
            return; //相当于只是结束循环，类似于break的作用
          }
        });

        return flag;
      });

      // 下面这个是自己写的循环
      // let list = local.filter( item => {

      //   for(let i = 0; i < res.data.data.channels.length; i++){

      //     if(item.id == res.data.data.channels[i].id){

      //       return false;
      //     }
      //   }
      //   return true;

      // } )

      

      res.data.data.channels.push( ...list );

      //   console.log(res);
      this.channelList = res.data.data.channels;

      // 合并后频道再保存一次，方便下次我不登录直接打开也有你合并后的结果
      setChannel(this.channelList)

    } else {
      //读取本地的
      // this.channelList = JSON.parse(window.localStorage.getItem('channel'))
      this.channelList = local;

      // 如果没有登录，或者也没有本地存储也要去发请求
    }
  }
};
</script>


<style lang="less" scoped>
// scoped对于自己组件里的组件没用，因为太深了，所以你要在这里设置组件里的组件的样式，就不要加scoped
// 我既要自己能用scoped，也要让自己组件里的组件也能用上我这个样式，那么要用vue给我们提供的一个选择器：深度选择器(/deep/)
.home {
  margin-top: 90px;
  margin-bottom: 44px;

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