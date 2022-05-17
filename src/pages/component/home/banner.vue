<template>
  <u-swiper
      :list="swiperList"
      circular
      height="200"
      imgMode="aspectFill"
      indicator
      indicatorMode="line"
      radius="0"
      @change="handleSwiperClick"
      @click="handleSwiperChange"
  />
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      swiperList: [
        // 需要使用 require 进行图片引入, 否则路径不正确的
        require("../../../static/banner/1.jpg"),
        require("../../../static/banner/2.jpg"),
        require("../../../static/banner/3.jpg"),
      ]
    }
  },
  methods: {
    handleSwiperChange(e) {
      // console.log(e);
    },
    handleSwiperClick(e) {
      // console.log(e);
    }
  }
}
</script>
