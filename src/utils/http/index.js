import axios from 'axios'
import { getUser } from '../storage/'
import store from '@/store/'
import router from '@/router/router.js'

import JSONbig from 'json-bigint'

// 以后项目大的话，可能要发几十几百条接口的请求
// 有的做登录，有的做数据请求，删除，等等各种数据
// 就意味着我们把它独立到一个文件里，到时候要改，也方便

// 以后项目大，可能接口地址不一样
// 例：可能要对 http://www.a.com 发请求 也可能要对 http://www.b.com 可能要跟c.com发请求
// 我们以前还会配置基地址
// 我要想办法，三个网站的基地址，都要设置好
// create可以创建一个新的axios对象，传入baseURL，就代表这个新的axios对象用设置这个基地址
// axios一个项目中多基地址

// export const axiosA = axios.create({

//     baseURL:"http://www.a.com"
// })

// axiosA.get('') //基地址都是a.com

// export const axiosB = axios.create({

//     baseURL:"http://www.b.com"
// }) 

// axiosB.get('') //通过axiosB发的请求基地址都是b.com

// 只是用来放一些发请求的对象工具，再暴露出去
export const http = axios.create({

    baseURL: "http://ttapi.research.itcast.cn/"
})


// 添加请求拦截器
http.interceptors.request.use(function (config) {

    // if(getUser()){

    let userInfo = store.state.userInfo;
    if (userInfo) {

        config.headers.Authorization = `Bearer ${userInfo.token}`
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截
http.interceptors.response.use(function (response) {


    return response;
}, async function (error) {

    // console.dir(error)
    // 要等token失效，才去用refresh_token去请求最新的token
    // 响应状态如果为401就代表token有问题：1.压根就没有token  2.token过期
    // 1.压根就没有token要打回登录页
    // 2.如果有token只是代表过期了，就用refresh_token去获取一个新的token
    if (error.response.status == 401) { //要保证只有401错误才会进来

        // 有token，但是token失效
        if (store.state.userInfo) {

            //有token，就去获取新的token
            // 注意：这里用axios发请求，这样的话，就不会经过http的请求拦截，那样就不容易出错
            // axios.put('http://ttapi.research.itcast.cn/app/v1_0/authorizations', {}, {

            //     headers: {

            //         Authorization: `Bearer ${store.state.userInfo.refresh_token}`
            //     }
            // })
            // .then(res => {

            //         console.log(res);

            // })

            /*
                // 上面那种发请求和下面这种完全一样
                axios({
    
                    url:"http://ttapi.research.itcast.cn/app/v1_0/authorizations",
                    method:"put",
                    headers:{
                        Authorization: `Bearer ${store.state.userInfo.refresh_token}`
                    }
                })
                .then( res => {
    
                    //替换到我们自己的token里
                    store.commit('setUserInfo',{
    
                        // 除了有最新的token
                        token:res.data.data.token,
                        // 还有refresh_token
                        refresh_token: store.state.userInfo.refresh_token
                    })
    
                    // 再重新发一个之前报错的请求
                    // 重新请求的结果再return出去
                    return http(error.config);
                })
                */

            let res = await axios({

                url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
                method: "put",
                headers: {
                    Authorization: `Bearer ${store.state.userInfo.refresh_token}`
                }
            });

            //替换到我们自己的token里
            store.commit('setUserInfo', {

                // 除了有最新的token
                token: res.data.data.token,
                // 还有refresh_token
                refresh_token: store.state.userInfo.refresh_token
            })

            // 再重新发一个之前报错的请求
            // 重新请求的结果再return出去
            return http(error.config);


        } else {

            //没token
            router.push('/login')
        }

    }



    // 对响应错误做点什么
    return Promise.reject(error);
});



// 自定义axios对响应体的转换
http.defaults.transformResponse = [function (data) {
    // Do whatever you want to transform the data

    try {

        return JSONbig.parse(data)
    }
    catch{

        return data;
    }


}];