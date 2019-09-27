<template>
  <!-- 
         v-model绑定它是否显示
         position：设置弹出的位置，不写代表从中间出来，也可以写left,right,top,bottom
  -->
  <van-popup v-model="show">
    <van-row>
      <van-col span="8">
        <van-icon name="cross" @click="doClose" />
      </van-col>
    </van-row>

    <van-row class="two-row">
      <van-col span="12">我的频道</van-col>
      <van-col span="12" style="text-align:right;">
        <van-button color="red" plain round size="mini" @click="doEdit">{{editText}}</van-button>
      </van-col>
    </van-row>

    <van-row gutter="5">
      <van-col span="6" v-for="(item,index) in myList">
        <van-button
          color="#f4f5f6"
          size="large"
          class="my-channel"
          :class="{ 'checked':index == active }"
          @click="$emit('update:active',index)"
        >
          {{item.name}}
          <van-icon @click="doDel(item)" v-show="isEdit && item.name != '推荐'" name="clear" />
        </van-button>
      </van-col>
    </van-row>

    <van-row class="two-row">
      <van-col span="12">频道推荐</van-col>
    </van-row>

    <van-row gutter="5">
      <van-col span="6" v-for="item in newList">
        <van-button
          :disabled="!isEdit"
          @click="addChannel(item)"
          color="#f4f5f6"
          size="large"
        >{{item.name}}</van-button>
      </van-col>
    </van-row>
  </van-popup>
</template>

<script>
import { getAllChannel, changeChannel } from "@/api/channel.js";

export default {
  name: "channel",
  props: ["show", "myList", "active"],

  model: {
    prop: "show",
    event: "change-show"
  },
  data() {
    return {
      allList: [],
      // 默认不显示编辑状态
      isEdit: false,
      editText: "编辑"
    };
  },

  methods: {
    async doClose() {
      this.$emit("change-show", false);
    },
    // 删除
    doDel(item) {
      // 删除元素 map你有多少个元素还是多少长度的数组
      for (let i = 0; i < this.myList.length; i++) {
        // 找到要删除的那个元素
        if (this.myList[i].id == item.id) {
          // 根据下标删除
          this.myList.splice(i, 1);
          break;
        }
      }
    },

    // 编辑被点
    async doEdit() {

      // 判断当前状态是否为编辑状态，如果是，就保存数据
      if(this.isEdit){

          //保存数据
          // 先切割掉推荐
          // slice方法：切割数组，参数1是从哪个下标开始截取，参数2是截取到哪个下标为止，如果不传代表截取到最后
          let channels = this.myList.slice(1).map( (item,index) => {

             return { 
                id:item.id,
                // 因为0是固定的推荐，所以我们的顺序应该从1开始，1开始就是+1
                seq: index + 1
              }

          } )

          // 发请求
          let res = await changeChannel(channels);
      }

      this.isEdit = !this.isEdit;

      this.editText = this.isEdit ? "完成" : "编辑";

      //判断是不是非编辑状态
    },

    // 添加频道
    addChannel(item) {
      this.myList.push(item);
    }
  },

  //   计算属性里用到的数据，一旦发生变化，都会来重新计算一次
  //   如果没变化就不计算
  computed: {
    newList() {
      //   let arr = [];

      //   for (let i = 0; i < this.allList.length; i++) {
      //     //我就认为你们我当前这个值跟myList的值都不相等
      //     //跪求打脸
      //     let flag = true;

      //     for (let j = 0; j < this.myList.length; j++) {

      //       if (this.allList[i].id == this.myList[j].id) {
      //         flag = false;
      //         break;
      //       }
      //     }

      //     //能到这而且还为true就没有相等的
      //     if (flag) {
      //       arr.push(this.allList[i]);
      //     }
      //   }
      //   return arr;

      // 拿到所有自己已经有的频道的id组成新的数组
      let ids = this.myList.map(item => item.id);
      // ids如果包含了所有频道里的某个id，就代表这个频道已经在自己有的频道里了
      // 所以这个频道不要加到剩余频道里，而ids不包含某个频道的id的话，就代表没到我的频道，就要到剩余频道里
      // 相当于就是取反
      return this.allList.filter(item => !ids.includes(item.id));
    }
  },

  async created() {
    // 获取所有频道
    let res = await getAllChannel();
    //   console.log(res);
    this.allList = res.data.data.channels;
  }
};
</script>

<style lang="less" scoped>
.van-popup {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;

  .van-row {
    margin-bottom: 20px;

    .van-col {
      margin-bottom: 10px;

      .my-channel {
        position: relative;

        &.checked {
          .van-button__text {
            color: orangered;
          }
        }

        .van-icon {
          position: absolute;
          right: -5px;
          top: -5px;
        }
      }

      .van-button__text {
        color: black;
      }
    }
  }

  .two-row {
    font-size: 14px;
  }
}
</style>