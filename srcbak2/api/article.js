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
export const getArticleByTime = ( { channel_id,timestamp,with_top } ) => {

    return http.get('/app/v1_1/articles',{

        params:{

            channel_id,
            timestamp,
            with_top
        }
    })
}
