<template>
  <div class="result">
    <van-nav-bar title="搜索结果" left-arrow />

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell class="my-cell" v-for="(item,index) in list" :key="index" :title="item.aut_name">
        <template slot="label">
          <p @click="$router.push(`/detail/${item.art_id}`)">{{item.title}}</p>
          <van-grid :column-num="3">
            <van-grid-item text="评论" @click="$isLogin" />
            <van-grid-item text="点赞" />
            <van-grid-item text="收藏" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { searchResult } from "@/api/article.js";
export default {
  name: "searchResult",
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      per_page: 10
    };
  },

  methods: {
    // isLogin() {
    //   this.$isLogin()
    // },
    //只要没铺满且loading值为false就会调用onLoad
    async onLoad() {
      let res = await searchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.$route.params.key
      });

      this.list.push(...res.data.data.results);
      this.page++;
      //要记得自己改成false,它才会遇到以后再次来调用
      this.loading = false;

      // 如果当前页等于总页数，那么就要停止，也就是把finshed改为true
      let totalPage = Math.ceil(res.data.data.total_count / this.per_page);

      if (this.page == totalPage) {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.result {
  margin-top: 46px;

  .van-list {
    background-color: #eeeeee;

    .my-cell {
      margin-bottom: 10px;
    }
  }
}

.van-nav-bar {
  z-index: 999 !important;
  .van-icon {
    color: #fff;
  }
}
</style>