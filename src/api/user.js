import { http } from '../utils/http/'

export const follow = (aut_id) => {

    return http.post('app/v1_0/user/followings', {
        target: aut_id
    })
}


export const cancelFollow = (aut_id) => {

    return http.delete(`/app/v1_0/user/followings/${aut_id}`)
}


// 获取用户自己信息
export const getUser = () => {

    return http.get('/app/v1_0/user');
}


// 获取用户详细资料
export const getProfile = () => {

    return http.get('/app/v1_0/user/profile')
}


// 修改用户详细资料
export const setProfile = ({ name, gender, birthday }) => {

    return http.patch('/app/v1_0/user/profile', {
        name,
        gender,
        birthday
    })
}


// 修改用户头像
export const setPhoto = (file) => {

    // 只有谁可以传递文件？
    // FormData
    let fm = new FormData();
    fm.append('photo', file)

    return http.patch('/app/v1_0/user/photo', fm)
}