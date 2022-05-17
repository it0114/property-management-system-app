module.exports = {
    transpileDependencies: ['uview-ui'],
    devServer: {
        // open: true,
        // host: 'localhost',
        // port: 8080,
        // https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/http': {
                target: 'http://106.15.183.149:9000', //这里后台的地址模拟的;这里最好使用公共地址
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/http': ''//请求的时候使用这个api就可以写公共地址后的地址
                },
                logLevel: 'debug' // 用于检查代理的真实地址
            }
        }
    }
}
