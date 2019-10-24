import store from '@/store/'
import router from '@/router/router.js'
import { Dialog } from 'vant';

let myPlugin = {}

myPlugin.install = (Vue) => {

    // 我在这个插件里给Vue扩展了一个方法
    // 方法叫isLogin
    Vue.prototype.$isLogin = function () {

        //判断是否登录
        if (store.state.userInfo) {
            //登录了，让你可以评论
            // Dialog({ message: "可以评论了" });
            return true;

        } else {

            Dialog
                .confirm({
                    title: "提示",
                    message: "该功能需要先登录，是否去登录？"
                })
                .then(() => {
                    // on confirm
                    router.push('/login')

                })
                .catch(() => {
                    // on cancel
                    // console.log('取消了');

                });

            return false;
        }
    }
}


export default myPlugin