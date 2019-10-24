// 此文件跟所有新闻操作有关

import { http } from '../utils/http/'

// export const getArticleByTime = ( obj ) => {

//     return http.get('/app/v1_1/articles',{

//         params:{

//             channel_id: obj.channel_id,
//             timestamp: obj.timestamp,
//             with_top: obj.with_top
//         }
//     })
// }

// 这个写法跟上面是一样的，只不过是ES6的一个语法
// 代表需要你传入一个对象，对象里必须有channel_id,timestamp,with_top这三个属性
// 这样写了后，那么在函数内部，可以直接用属性名来取值
export const getArticleByTime = ({ channel_id, timestamp, with_top }) => {

    return http.get('/app/v1_1/articles', {

        params: {

            channel_id,
            timestamp,
            with_top
        }
    })
}


export const hideArticle = (art_id) => {

    return http.post('/app/v1_0/article/dislikes', {

        target: art_id
    })
}

export const blockUser = (aut_id) => {


    return http.post('/app/v1_0/user/blacklists', {

        target: aut_id
    })
}

// 举报文章的接口调用
export const reportArticle = ({ target, type }) => {

    return http.post('/app/v1_0/article/reports', {

        target,
        type,
        remark: "看你不爽，老子就是要举报，咋地了？"
    })
}


// 获得联想的词汇结果
export const suggest = (q) => {

    return http.get('/app/v1_0/suggestion', {

        params: {

            q
        }
    })
}


// 获得搜索结果
export const searchResult = ({ page, per_page, q }) => {

    return http.get('/app/v1_0/search', {

        params: {

            page,
            per_page,
            q
        }
    })
}


// 获得搜索历史
export const getHistory = () => {

    return http.get('/app/v1_0/search/histories')
}

// 删除搜索历史
export const delHistory = () => {

    return http.delete('/app/v1_0/search/histories')
}



// 获得文章详情
export const getDetail = (art_id) => {

    return http.get(`/app/v1_0/articles/${art_id}`)
}


// 点赞文章
export const zanArt = (target) => {

    return http.post('/app/v1_0/article/likings', {

        target
    });
}

// 取消点赞文章
export const unZanArt = (target) => {

    return http.delete(`/app/v1_0/article/likings/${target}`);
}

// 不喜欢文章
export const unLike = (target) => {

    return http.post('/app/v1_0/article/dislikes', {

        target
    })
}

// 取消不喜欢文章
export const cancelUnLike = ( target ) => {

    return http.delete(`/app/v1_0/article/dislikes/${target}`)
}