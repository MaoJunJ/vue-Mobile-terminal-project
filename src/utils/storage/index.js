const USER_KEY = 'userInfo'

// 设置用户信息
export const setUser = (data) => {

    window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}


// 获取用户信息
export const getUser = () => {

    return JSON.parse(window.localStorage.getItem(USER_KEY))
}


// 删除用户信息
export const delUser = () => {

   
    window.localStorage.removeItem(USER_KEY)
}