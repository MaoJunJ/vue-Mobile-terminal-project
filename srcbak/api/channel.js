import { http } from '../utils/http/'

// 获取用户频道
export const getChannel = () => {

    return http.get('/app/v1_0/user/channels')
}


// 获取所有频道
export const getAllChannel = () => {

    return http.get('/app/v1_0/channels')
}


// 修改频道
export const changeChannel = ( channels ) =>{

    return http.put('/app/v1_0/user/channels',{
        channels
    })
}