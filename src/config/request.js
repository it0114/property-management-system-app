module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/

        // console.log(uni.$u.platform);
        // 判断是否是 h5
        if (uni.$u.platform === 'h5') {
            config.baseURL = '/http'; /* 根域名 */
        } else {
            config.baseURL = 'http://106.15.183.149:9000'; /* 根域名 */
        }

        return config
    })

    // 请求拦截
    // 可使用async await 做异步操作
    uni.$u.http.interceptors.request.use((config) => {
        // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
        config.data = config.data || {}
        config.header = {
            // 'content-type': "multipart/form-data; charset=UTF-8"
            'content-type': "application/json; charset=UTF-8"
        }
        return config
    }, config => {
        return Promise.reject(config)
    })

    // 响应拦截
    uni.$u.http.interceptors.response.use((response) => {
        const data = response.data

        // 自定义参数
        const custom = response.config?.custom
        if (data.code !== 0) {
            // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
            if (custom.toast !== false) {
                uni.$u.toast(data.message)
            }
        }
        // return data
        return data.data === undefined ? {} : data.data
    }, (response) => {
        // 对响应错误做点什么 （statusCode !== 200）
        return Promise.reject(response)
    })
}
