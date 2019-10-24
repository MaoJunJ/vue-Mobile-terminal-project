<template>
  <van-dialog
    :value="dialogShow"
    :showConfirmButton="false"
    :closeOnClickOverlay="true"
    :beforeClose="beforeClose"
  >
    <van-cell-group v-show="!jubaoShow">
      <van-cell icon="location-o" title="不喜欢此文章" @click="doHide" />
      <van-cell icon="location-o" title="举报" is-link @click="jubaoShow=true" />
      <van-cell icon="location-o" title="拉黑" @click="blockAut" />
    </van-cell-group>

    <van-cell-group v-show="jubaoShow">
      <van-cell icon="arrow-left" title @click="jubaoShow=false" />
      <van-cell
        v-for="(item,index) in jubaoList"
        icon="location-o"
        :title="item"
        @click="report(index)"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { hideArticle, blockUser, reportArticle } from "@/api/article.js";

export default {
  props: ["dialogShow", "art_id", "artList", "aut_id"],

  model: {
    prop: "dialogShow",
    event: "show-dialog"
  },

  data() {
    return {
      jubaoShow: false,
      jubaoList: [
        "其他问题",
        "标题夸张",
        "低俗色情",
        "错别字多",
        "旧闻重复",
        "广告软文",
        "内容不实",
        "涉嫌违法犯罪",
        "侵权"
      ]
    };
  },

  methods: {
    // 举报文章
    async report(type) {
      try {
        let res = await reportArticle({
          target: this.art_id,
          type
        });

        // 删除文章
        this.artList.forEach((item, index) => {
          if (item.art_id == this.art_id) {
            this.artList.splice(index, 1);
            return;
          }
        });

        // 弹出提示
        this.$toast('感谢您的举报，为净网行动贡献了一份力量！')

        // 隐藏对话框
         this.$emit("show-dialog", false);

      } catch (error) {
        // console.dir(error);
        if (error.response.status == 401) {
          this.$notify("请先登录");
          this.$router.push("/login");
        }
      }
    },

    // 点击隐藏文章触发
    async doHide() {
      //有文章id this.art_id
      let res = await hideArticle(this.art_id);
      // 隐藏自己
      this.$emit("show-dialog", false);

      // 还要操作数组删除，删掉我点击的那篇文章
      // 根据id来找
      this.artList.forEach((item, index) => {
        if (item.art_id == this.art_id) {
          this.artList.splice(index, 1);
          return;
        }
      });
    },

    async blockAut() {
      try {
        let res = await blockUser(this.aut_id);

        // 找到所有用户id等于要拉黑的id，删掉它
        for (let i = 0; i < this.artList.length; i++) {
          if (this.artList[i].aut_id == this.aut_id) {
            this.artList.splice(i, 1);
            i--;
          }
        }

        this.$emit("show-dialog", false);
      } catch (error) {
        if (error.response.status == 400) {
          this.$toast.fail("你脑子what了？");
        }
      }
    },

    //  关闭前触发
    beforeClose(action, done) {
      //通过事件改掉父的值   this.dialogShow = false;
      this.$emit("show-dialog", false);
      done();
    }
  }
};
</script>

<style>
</style>