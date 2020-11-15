import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const instance = axios.create({
    baseURL: '/api',
    timeout: 2000
})

// Add a request interceptor
// 请求拦截器当中一般都只去处理成功的,因为几乎不会失败
// 无论是请求拦截器还是响应拦截器  都可以干两件事情
// 1.修改请求报文和响应报文   2.添加额外功能
// 请求拦截器回调函数,接收一个参数,叫config就是我们的请求报文

instance.interceptors.request.use((config) => {
    // 在请求拦截器中开启进度条(添加功能)
    // 每一次请求都在请求头当中添加用户临时标识
    let userTempId = store.state.users.userTempId
    if (userTempId) {
        config.headers.userTempId = userTempId
    }

    //每次请求带上用户的登录标识
    let token = store.state.users.token
    if (token) {
        config.headers.token = token
    }
    Nprogress.start()
    return config
});


instance.interceptors.response.use(
    (response) => {
        // 返回的响应不再需要从data属性当中拿数据,而是响应就是我们要的数据
        Nprogress.done()
        return response.data
    },
    (error) => {
        Nprogress.done()
        // 统一处理请求错误,具体请求也可以选择处理或不处理
        alert('请求失败' + error.message || '未知错误')
        return new Promise(() => { })//中断promise链
    }
);

export default instance