<template>
  <div class="detail">
    <!-- 导航栏部分 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 标题部分 -->
    <van-cell>
      <template slot="title">
        <h2>{{ detail.title }}</h2>
      </template>
    </van-cell>

    <!-- 作者部分 -->
    <author :detail="detail"></author>

    <!-- 内容部分 -->
    <van-cell>
      <template slot="title">
        <div class="my-content" style="word-break:break-all;" v-html="detail.content"></div>
      </template>
    </van-cell>

    <!-- 点赞和喜欢 -->
    <like :detail="detail"></like>

    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <comment v-for="item in cmtList" :cmt="item" @reply="doShowReply"></comment>
    </van-list>

    <!-- 底部发送评论的界面 -->
    <send :detail="detail" :cmtList="cmtList" :isReply="false"></send>

    <!-- 弹出的评论回复 -->
    <van-popup v-model="replyShow" position="bottom" :style="{ height: '60%' }">
      <div style="margin-bottom:64px;">
        <van-cell>
          <h3>当前评论</h3>
        </van-cell>

        <comment :cmt="currentCmt"></comment>

        <van-cell>
          <h3>当前评论的回复</h3>
        </van-cell>

        <van-list v-model="popLoading" :finished="popFinished" finished-text="没有更多了" @load="popOnLoad">
          <comment v-for="item in popCmtList" :cmt="item"></comment>
        </van-list>
      </div>

      <send :isReply="true" :detail="detail" :currentCmt="currentCmt" :popCmtList="popCmtList"></send>

    </van-popup>
  </div>
</template>

<script>
import { getDetail } from "@/api/article.js";
import author from "./components/author.vue";
import like from "./components/like.vue";
import comment from "./components/comment.vue";
import send from "./components/send.vue";

import { getComments } from "@/api/comment.js";

export default {
  name: "artDetail",

  components: {
    author,
    like,
    comment,
    send
  },
  data() {
    return {
      // 弹出层的查询参数
      popQuery: {
        type: "c",
        source: 0,
        offset: undefined,
        limit: 10
      },
      // 弹出层里面的回复评论列表
      popCmtList:[],
      popLoading: false,
      popFinished: false,

      // 保存当前被点击回复的评论
      currentCmt: {},

      // 控制弹出层的属性
      replyShow: false,
      loading: false,
      finished: false,

      detail: {},
      // 文章id
      artId: this.$route.params.artId,

      // 查询的参数对象
      query: {
        type: "a",
        source: this.$route.params.artId,
        offset: undefined,
        limit: 10
      },

      // 保存评论的数组
      cmtList: []
    };
  },

  methods: {

    // 弹出层的加载列表方法
    async popOnLoad(){
      
      let res = await getComments(this.popQuery)
      this.popCmtList.push( ...res.data.data.results )
      this.popQuery.offset = res.data.data.last_id;

      this.popLoading = false;

      if(res.data.data.last_id == res.data.data.end_id){

        this.popFinished = true;
      }
    },

    // 点击回复绑定的方法
    // 形参就是写在行内的$event
    doShowReply(value) {

      // 每次打开新的弹出层前先把上一次数据清空
      this.popCmtList = [];
      this.popQuery.offset = undefined;
      this.popFinished = false;

      this.replyShow = value.replyShow;
      this.currentCmt = value.cmt;
      this.popQuery.source = value.cmt.com_id.toString();
    },

    // 列表加载数据的方法
    async onLoad() {
      let res = await getComments(this.query);
      // 查到数据要追加而不是重新覆盖
      this.cmtList.push(...res.data.data.results);
      // 把最后一条id记录到offset，方便下次来查下一页
      this.query.offset = res.data.data.last_id;

      // 在这里把loading改成false就会又来调用onLoad
      this.loading = false;

      // 当last_id 如果等于 end_id就代表到最后了，就没必要再加载了
      if (res.data.data.last_id == res.data.data.end_id) {
        this.finished = true;
      }
    }
  },

  async created() {
    //获取文章详情
    let res = await getDetail(this.artId);
    this.detail = res.data.data;
  }
};
</script>

<style lang="less" scoped>
.detail {
  margin-top: 46px;
  margin-bottom: 64px;
  .van-nav-bar {
    z-index: 999 !important;
    .van-icon {
      color: #fff;
    }
  }

  /deep/ .my-content img {
    max-width: 100%;
  }
}
</style>