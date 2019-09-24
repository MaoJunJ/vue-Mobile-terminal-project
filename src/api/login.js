import { http } from '../utils/http'

export const login = (data) => {

    // 把这个promise返回出去了
    return http.post('/app/v1_0/authorizations',data)
}


// 退出

// 判断是否登录