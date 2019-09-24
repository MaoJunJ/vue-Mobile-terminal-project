import { http } from '../utils/http/'

// 获取用户频道
export const getChannel = () => {

    return http.get('/app/v1_0/user/channels')
}