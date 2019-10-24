import { http } from '../utils/http/'


// 获取评论的接口
export const getComments = ( { type,source,offset,limit } ) => {

    return http.get('/app/v1_0/comments',{

        params:{

            type,
            source,
            offset,
            limit
        }
    })
}


// 发表评论或回复
export const sendComment = ( { target,content,art_id } ) => {

    return http.post('/app/v1_0/comments',{

        target,
        content,
        art_id
    })
}


// 给评论或回复点赞
export const addZan = ( target ) => {

    return http.post('/app/v1_0/comment/likings',{

        target
    })
}


// 取消评论或回复的点赞
export const cancelZan = (target) => {

    return http.delete(`/app/v1_0/comment/likings/${target}`)
}