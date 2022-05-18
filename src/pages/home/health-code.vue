<template>
  <view class="health-code">
    <view class="code-box">
      <view class="qrcode-time">
        {{ qrcodeData.time }}
      </view>
      <view class="qrcode-box">
        <ayQrcode
            ref="qrcode"
            :modal="modal_qr"
            :themeColor="qrcodeData.color"
            :url="qrcodeData.url"
            qrcode_id="qrcode"
            @hideQrcode="hideQrcode"/>
      </view>
      <view :style="{
        color:qrcodeData.color,
        background:qrcodeData.bgColor
      }" class="qrcode-text">
        {{ qrcodeData.text }}
      </view>
    </view>
  </view>
</template>

<script>
import ayQrcode from "../component/ay-qrcode/ay-qrcode.vue"

export default {
  name: "health-code",
  components: {
    ayQrcode
  },
  data() {
    return {
      //二维码相关参数
      modal_qr: false,
      qrcodeData: {
        color: 'green',
        bgColor: 'rgba(0, 255, 0, 0.1)',
        url: "https://www.baidu.com",
        text: '绿码',
        time: this.getNowTime()
      },
      timer: null
    }
  },
  mounted() {
    this.qrcode()
    this.timer = setInterval(() => {
      this.qrcodeData.time = this.getNowTime()
    }, 1000)
  },
  methods: {
    qrcode() {
      this.modal_qr = true;
      // uni.showLoading()
      setTimeout(() => {
        // uni.hideLoading()
        this.$refs.qrcode.crtQrCode()
      }, 50)
    },
    //传入组件的方法
    hideQrcode() {
      this.modal_qr = false;
    },

    // 获取时间

    //获取当前时间
    getNowTime() {
      let date = new Date();
      //年 getFullYear()：四位数字返回年份
      let year = date.getFullYear();  //getFullYear()代替getYear()
      //月 getMonth()：0 ~ 11
      let month = date.getMonth() + 1;
      //日 getDate()：(1 ~ 31)
      let day = date.getDate();
      //时 getHours()：(0 ~ 23)
      let hour = date.getHours();
      //分 getMinutes()： (0 ~ 59)
      let minute = date.getMinutes();
      //秒 getSeconds()：(0 ~ 59)
      let second = date.getSeconds();

      return (
          year
          + '-' + this.zeroFill(month)
          + '-' + this.zeroFill(day)
          + ' ' + this.zeroFill(hour)
          + ':' + this.zeroFill(minute)
          + ':' + this.zeroFill(second)
      )
    },

    // 补 0
    zeroFill(num) {
      return num.toString().padStart(2, "0")
    }
  },
  deactivated() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.health-code {
  width: 100%;
  height: 100vh;
  background: #3B65E4;
  padding-top: 100rpx;

  .code-box {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 10rpx;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 50rpx;

    .qrcode-time {
      width: 80%;
      margin: 50rpx auto;
      border-radius: 4px;
      padding: 10rpx 20rpx;
      border: 1px solid #ccc;
      color: #333;
      font-size: 36rpx;
      text-align: center;
      font-weight: 500;
    }

    .qrcode-text {
      width: 40%;
      display: block;
      text-align: center;
      margin: 0 auto;
      padding: 10rpx 30rpx;
      border-radius: 4px;
      font-size: 30rpx;
    }
  }
}
</style>
