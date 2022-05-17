<template>
  <u-cell-group>
    <u-cell v-for="(item,index) in cellList"
            :key="index"
            :title="item.title"
            arrow-direction="down"
            @tap="handleCellItemClick(item)">
      <u-icon slot="icon" :name="item.nameIcon" size="30"></u-icon>
    </u-cell>
  </u-cell-group>
</template>

<script>
export default {
  name: "cell-list",
  data() {
    return {
      cellList: [
        {
          title: '我的消息',
          nameIcon: 'chat',
          path: 'pages/account/my-message'
        },
        {
          title: '我的卡包',
          nameIcon: 'coupon',
          path: 'pages/account/my-card'
        },
        {
          title: '帮助',
          nameIcon: 'question-circle',
          path: 'pages/account/help'
        },
        {
          title: '关于我们',
          nameIcon: 'heart',
          path: 'pages/account/about'
        },
      ]
    }
  },
  methods: {
    handleCellItemClick(item) {
      uni.$u.route({
        url: item.path,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .u-cell__body {
  padding: 30rpx 15px;
}
</style>
