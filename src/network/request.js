import axios from "axios";

const service = axios.create({
    baseURL:"",
    timeout:5000,
    withCredentials:true
})

// 发送请求前处理request的数据
axios.defaults.transformRequest = [function (data) {
    let newData = ''
    for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
}]

// request拦截器
service.interceptors.request.use(
    config => {
        // 发送请求之前，要做的业务
        return config
    },
    error => {
        // 错误处理代码

        return Promise.reject(error)
    }
)

// response拦截器
service.interceptors.response.use(
    response => {
        // 数据响应之后，要做的业务
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
