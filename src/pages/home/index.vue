<template>
  <view class="home">
    <u-notice-bar :text="noticeBar" bgColor="#F8FEF1" color="#77C545"></u-notice-bar>
    <banner/>
    <gridMenu class="grid-menu"/>
  </view>
</template>

<script>
import banner from "../component/home/banner.vue"
import gridMenu from "../component/home/grid-menu.vue"

export default {
  components: {
    banner,
    gridMenu
  },

  data() {
    return {
      noticeBar: '欢迎来到物业管理系统 ~ '
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.home {
  .grid-menu {
    margin: 30rpx 0;
  }
}
</style>
