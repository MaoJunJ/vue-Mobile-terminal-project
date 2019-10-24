<template>
  <div class="profile">
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="doSave"
    />

    <!-- 下面的单元格 -->
    <van-cell-group>
      <van-cell is-link title="头像" @click="iconShow = true">
        <template slot="default">
          <div>
            <img :src="user.photo" alt />
          </div>
        </template>
      </van-cell>
      <van-cell is-link title="姓名" :value="user.name" @click="show=true;type=1;" />
      <van-cell
        is-link
        title="性别"
        :value="user.gender == 0 ? '男' : '女' "
        @click="show=true;type=2;"
      />
      <van-cell is-link title="生日" :value="user.birthday" @click="show=true;type=3" />
    </van-cell-group>

    <!-- 头像弹出层 -->
    <van-popup v-model="iconShow" style="width:70%;">
      <van-cell-group>
        <van-cell is-link>
          <template slot="title">
            <div class="filebox">
              <span>从相册中选择</span>
              <input class="file" ref="file" type="file" @change="doPhoto" />
            </div>
          </template>
        </van-cell>
        <van-cell is-link title="拍照" />
        <van-cell is-link title="取消" />
      </van-cell-group>
    </van-popup>

    <!-- 输入资料的弹出层 -->
    <van-popup class="popup" v-model="show" position="bottom" :style="{ height: '20%' }">
      <van-field v-if="type==1" v-model="user.name" class="input" placeholder="请输入用户名" />
      <van-picker
        v-else-if="type==2"
        :default-index="user.gender"
        @change="genderChange"
        class="picker"
        :columns="['男','女']"
      />
      <van-datetime-picker
        v-else
        class="date"
        v-model="currentDate"
        type="date"
        @change="dateChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { getProfile, setProfile,setPhoto } from "@/api/user.js";
import dayjs from "dayjs";

import { ImagePreview, Dialog } from "vant";

export default {
  name: "profile",
  data() {
    return {
      iconShow: false,
      user: {},
      show: false,
      type: 1,
      currentDate: ""
    };
  },

  methods: {
    // 文件选择改变的事件
    doPhoto() {
      // 要拿到选择的文件
      // console.log(this.$refs.file.files[0]);

      // 创建FileReader对象
      let reader = new FileReader();
      reader.readAsDataURL(this.$refs.file.files[0]);
      // 监听读取完成事件
      reader.onload = () => {
        // 把读取出来的base64放到图片预览里
        ImagePreview({
          // 指定预览的图片路径
          images: [reader.result],
          // 当关闭时触发
          onClose: () => {

            // 弹出确认框
            Dialog.confirm({
              title: "提示",
              message: "当前图片是否保存？"
            })
              .then( async () => {
                // on confirm
                this.user.photo = reader.result;
                // 隐藏对话框
                this.iconShow = false;

                // 发请求给服务器去修改头像
                let res = await setPhoto(this.$refs.file.files[0])
                // console.log(res);
                
              })
              .catch(() => {
                // on cancel
                this.$refs.file.value = "";
              });
          }
        });
      };
    },
    //保存的点击事件
    async doSave() {

      let res = await setProfile(this.user);
      console.log(res);
    },

    // picker是这个选择器对象
    // value是选中的值
    // index是选中的下标
    genderChange(picker, value, index) {
      // console.log(picker);
      // console.log(value);
      // console.log(index);
      this.user.gender = index;
    },

    dateChange() {
      // console.log(this.currentDate);
      this.user.birthday = dayjs(this.currentDate).format("YYYY-MM-DD");
    }
  },

  async created() {
    let res = await getProfile();
    // console.log(res);
    this.user = res.data.data;

    this.currentDate = new Date(this.user.birthday);
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  .van-icon,
  .van-nav-bar__text {
    color: white;
  }
}

.profile {
  margin-top: 46px;

  img {
    width: 30px;
    height: 30px;
  }
}

.popup {
  display: flex;
  align-items: center;

  .input {
    border: 1px solid #ccc;
  }

  .picker,
  .date {
    width: 100%;
  }
}

.filebox {
  width: 100%;
  position: relative;

  .file {
    position: absolute;
    left: 0;
    top: -2px;
    opacity: 0;
  }
}
</style>