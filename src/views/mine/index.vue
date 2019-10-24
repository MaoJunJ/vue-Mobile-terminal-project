<template>
  <div class="mine">
    <!-- 上面区域 -->

    <van-cell-group class="top">
      <van-cell :border="false">
        <template slot="title">
          <div class="top-top">
            <div class="ziliao-left" @click="$router.push('/profile')">
              <div>
                <img :src="user.photo" alt />
              </div>
              <van-cell>
                <template slot="title">
                  <div class="name">{{user.name}}</div>
                </template>
                <template slot="label">
                  <div class="renzhen">申请认证</div>
                </template>
              </van-cell>
            </div>
            <div class="read-right">
              <div>今日阅读</div>
              <div>5分钟</div>
            </div>
          </div>
        </template>
      </van-cell>

      <van-cell>
        <template slot="title">
          <div class="tongji">
            <div class="cell">
              <div>{{user.art_count}}</div>
              <div>动态</div>
            </div>

            <div class="cell">
              <div>{{user.follow_count}}</div>
              <div>关注</div>
            </div>

            <div class="cell">
              <div>{{user.fans_count}}</div>
              <div>粉丝</div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 中间区域 -->
    <van-cell-group>
      <van-cell :border="false">
        <template slot="title">
          <van-grid :column-num="3" class="grid">
            <van-grid-item icon="star-o" text="收藏" />
            <van-grid-item icon="clock-o" text="历史" />
            <van-grid-item icon="edit" text="作品" />
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="实名认证" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell title="系统设置" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUser } from "@/api/user.js";
export default {
  name: "mine",
  data() {
    return {
      user: {}
    };
  },

  activated(){

    console.log('激活');

  },
  deactivated(){

    console.log('离开（隐藏了）');

  },

  async created() {
    console.log('组件创建完毕');

    if (this.$isLogin()) {

      let res = await getUser();
      // console.log(res);
      this.user = res.data.data;

      // 以下是自己做的数据缓存
      // 先看本地有没有数据，直接拿出来
      // vue提供的组件缓存，也可以实现

      // let info = localStorage.getItem("mine");
      // if (info) {
      //   console.log('从本地获取');

      //   this.user = JSON.parse(info);

      // } else {
      //   console.log('发请求了');

      //   let res = await getUser();
      //   // console.log(res);
      //   this.user = res.data.data;
      // }
    }
  },

  destroyed() {
    //保存当前界面的数据，保存到本地
    // console.log('销毁了');
    // window.localStorage.setItem("mine", JSON.stringify(this.user));
  }
};
</script>

<style lang="less">
.top {
  height: 180px;
  background-color: #3f9dfa !important;

  .van-cell {
    background-color: rgba(255, 255, 255, 0);
  }

  .top-top {
    display: flex;

    .ziliao-left {
      flex: 1;
      display: flex;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .name {
        color: white;
        font-size: 17px;
      }
      .renzhen {
        background-color: #fff;
        color: #3f9dfa;
        width: 80px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 10px;
        font-weight: bold;
        margin-top: 10px;
      }
    }
    .read-right {
      position: absolute;
      text-align: center;
      padding-left: 20px;
      border-radius: 25px 0 0 25px;
      right: 0;
      top: 20px;
      width: 120px;
      height: 50px;
      color: white;
      background-color: #3981c9;
    }
  }

  .tongji {
    display: flex;

    .cell {
      color: white;
      font-size: 16px;
      flex: 1;
      text-align: center;
    }
  }
}

.van-grid-item /deep/ .van-grid-item__content::after {
  border: none;
  border-right: 1px;
}
</style>