<template>
  <view class="help">
    <u-cell-group>
      <u-cell v-for="(item,index) in cellList"
              :key="index"
              :title="item.title"
              arrow-direction="down"
              @tap="handleCellItemClick(item)">
        <u-icon slot="icon" :name="item.nameIcon" size="30"></u-icon>
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  name: "help",
  data() {
    return {
      cellList: [
        {
          title: '客服电话 : 400-3456-7890',
          nameIcon: 'phone',
        },
        {
          title: '常见问题 ?',
          nameIcon: 'question-circle',
          path: '/pages/order/index'
        },
      ]
    }
  },
  methods: {
    handleCellItemClick(item) {
      if (item.path) {
        uni.switchTab({
          url: item.path,
          success: (res) => {
          }
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
