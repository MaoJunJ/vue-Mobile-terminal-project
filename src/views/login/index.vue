<template>
  <van-cell-group>
    <van-nav-bar class="nav-bar" title="标题" />

    <form class="form-wrap">
      <van-cell-group>
        <van-field
          v-model="form.mobile"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
          :error-message="errorMsg1"
          @blur="errorMsg1 = /0?(13|14|15|18|17)[0-9]{9}/.test(form.mobile) ? '' : '请输入正确的手机号' "
        />
        <van-field
          v-model="form.code"
          label="验证码"
          placeholder="请输入验证码"
          required
          :error-message="errorMsg2"
          @blur=" errorMsg2 = /^\d{6}$/.test(form.code) ? '' : '请输入6位数字' "
        />
      </van-cell-group>

      <van-button type="info" class="login-btn" @click.prevent="login">信息按钮</van-button>
    </form>
  </van-cell-group>
</template>

<script>
// import axios from "axios";
// import { axiosA } from '../../utils/http/'
// import { axiosB } from '../../utils/http/'

// import { http } from '../../utils/http/'

import { login } from '../../utils/http/'


export default {
  data() {
    return {
      errorMsg1: "",
      errorMsg2: "",
      form: {
        mobile: "",
        code: ""
      }
    };
  },

  methods: {

    async login() {

      // 验证所有是不是符合规则
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.mobile)) {
        //不通过
        this.errorMsg1 = "请输入正确的手机号";
      }

      if (!/^\d{6}$/.test(this.form.code)) {
        this.errorMsg2 = "请输入6位数字";
      }
      
      // 如果都为空就代表通过了
      if (this.errorMsg1 == "" && this.errorMsg2 == "") {

        // let res = await http.post(
        //   "/app/v1_0/authorizations",
        //   this.form
        // );

        // console.log(res);
        let res = await login(this.form)
        console.log(res);
        
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form-wrap {
  padding: 20px;

  .login-btn {
    margin-top: 20px;
    width: 100%;
    border-radius: 15px;
  }
}
</style>