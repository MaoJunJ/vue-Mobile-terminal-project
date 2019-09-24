import axios from 'axios'
import { getUser } from '../storage/'

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
    
    if(getUser()){

        config.headers.Authorization = `Bearer ${getUser().token}`
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});