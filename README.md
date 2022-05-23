# property-management-system-app

### 启动
`npm install`

`h5 : npm run sever`

`ios / android : 把文件拖进 HBuilderX 中,点击 scr 文件夹 , 选择运行终端`

### 遇到的坑总结

#### 键盘会把登录框页面顶上去的问题

需要在 `pages.js`中, 把你目前需要操作的界面的路由添加一下代码 

```JavaScript
{
      "path": "pages/login/index",
      "style": {
        "navigationBarTitleText": "登陆",
        "app-plus": { // 声明是移动端独有的
          "titleNView": false,
          "softinputMode": "adjustResize"  //这个代码是重点 
        }
      }
    },
```

#### 配置跨域问题

在 vue-cli 根目录中创建 `vue.config.js` 文件, 然后把以下的代码放进去 

```JavaScript
module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
      '/api': {
        target: 'http://127.0.0.1:5000/',//这里后台的地址模拟的;这里最好使用公共地址
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': ''//请求的时候使用这个api就可以写公共地址后的地址
        },
        logLevel: 'debug' // 用于检查代理的真实地址
      }
    }
  }
}
```

但是跨域是浏览器的特性, 而不是App 的特性, 所以还需要在请求的时候判断是否是H5 , 然后决定是否使用跨域 

```JavaScript
 // 判断是否是 h5 ($u.platform 是 uview 的封装方法, 具体的uniapp方法可以查查文档 ) 
        if (uni.$u.platform === 'h5') {
            config.baseURL = '/api'; /* 根域名 */
        } else {
            config.baseURL = 'http://127.0.0.1:5000'; /* 根域名 */
        }
```



#### uni-app修改顶部状态栏颜色问题

有两种方案

1. 单独修改某一个通栏的颜色 (优先级比全局的大)

   在`pages.json`中, 找到你需要配置的路由 ,然后使用以下代码

   ```JavaScript
   {
   			"path": "pages/index/index",
   			"style": {
   				"navigationBarTitleText": "首页",
   				"app-plus":{
   					"titleNView":false    //去掉当前页的顶部导航栏
   				},
   				"navigationBarBackgroundColor":"#FE5786",
   				"navigationBarTextStyle":"white"  //状态栏字体颜色
   			}
   		},
   ```

   

2. 全局修改通栏颜色

   在`pages.json`中, `globalStyle`,使用以下代码

   ```JavaScript
    "globalStyle": {
       "navigationBarTextStyle": "white",  // 文字颜色
       "navigationBarTitleText": "物业管理系统App",  // 名称
       "navigationBarBackgroundColor": "#2C66EC",  // 状态栏颜色
       "backgroundColor": "#F8F8F8"  // 背景颜色
     }
   ```

#### webstrom 书写 uniapp rpx格式化出现空格爆红的解决方法

下载 `wechat mini program support` 插件,在`languanes`设置里面将小程序支持选为启用。并且使用的时候, 需要在 `style`中开启 `lang=scss`



#### uniapp加载本地图片的问题

在`uniapp`中加载图片, 一般使用网络图片, 如果无法使用网络图片, 而是需要引用本地图片, 则一定要使用 `requires` 否则会出现 web端可以显示, 但是 ios, 或者 Android 无法显示的问题 

```JavaScript
        require("../../../static/banner/1.jpg"),
```

#### uniapp 生命周期问题

这个具体详细的直接看文档 

这个是***页面***的生命周期 : https://uniapp.dcloud.io/collocation/App.html#applifecycle

这个是***组件***的生命周期: 组件的生命周期参考 vue 的生命周期即可 

注意点 : 组件中没有 页面的生命周期 

> 强烈建议看完这个 : https://blog.csdn.net/sslcsq/article/details/108669451

#### uniapp 实现截取字符串最后一个字符作为名字的问题

```JavaScript
// html
 <u-avatar
    v-if="userInfo.realname" 
    :text="avatarText"
    fontSize="26"
    randomBgColor
    size="60"/>

// js 
computed: {
    // 计算用户名  (配合 v-if 使用, 否则会出现读取不到数据报错 )
    avatarText() {
      let str = this.userInfo.realname
      return str.substring(str.length - 1, str.length)
    }
  },
```

#### uniapp 页面上下滚动时出现的背景的背景色更换 

```JavaScript
// 在你的路由中 
{
     "path" : "pages/index/index",
       "style" : {
				"navigationBarTitleText": "主页",
				"onReachBottomDistance": 50,
				"navigationBarBackgroundColor":"#FF4B4B",  //标题栏背景颜色
				"backgroundColorTop":"#ff4b4b"             //下拉的背景颜色
	}
}

```

#### 苹果手机 安全区域的配置

安全区域正常来说都是白色, 我们一般需要两种需求, 自适应颜色或者直接不留出安全区域 (无tabbar)的情况 

1. 自适应 

```JavaScript
// manifest.json
// app-plus

"safearea": {
  "bottom": {  
        "offset": "none" 
    }   
}
```

2. 统一设置同一种颜色 

```javascript
// manifest.json
// app-plus

"safearea": {  
    "background": "#CCCCCC", //背景色
    "bottom": {  
        "offset": "auto"  
    }  
}
```

#### uniapp 路由传参的问题 

```JavaScript
// 获取上一个页面的路由传参 
onLoad:function select(msg){
			console.log(msg)
},

```

#### 路由跳转问题

1. 要配置 pages (如果有tabbar 也需要单独配置 pages )

2. 在不含有 tabBar 的页面跳转到 含有 tabBar 的页面

   `uni.switchTab()`

   switchTab 中的 url 需要 /pages ,而不是pages

3. 在含有 tabBar 的页面跳转到 不含有 tabBar 的页面

   `uni.reLaunch()`

   跳转之后, 页面将没有返回按钮 

4. 普通跳转

   `uni.navigateTo()`

#### uniapp 二维码的生成

推荐使用这个 uQRcode , 对比下来最好用 , 地址如下 : 

https://ext.dcloud.net.cn/plugin?id=1287

文档有坑, 一定要详细看文档! 一定要详细看文档! 一定要详细看文档!

#### 打包的通讯录权限问题 

1. 在 `manifest.json` 文件中找到 App权限配置, 把下面这个配置取消勾选

`<uses-permission android:name="android.permission.READ_ CONTACTS'/>`

2. 在App模块配置中把 `Contact(通讯录)` 取消勾选
