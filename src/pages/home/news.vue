<template>
  <view class="news">
    <u-cell-group>
      <u-cell
          v-for="(item,index) in cellList"
          :key="index"
          :isLink="true"
          :title="item.title"
          :url="item.path"
          arrow-direction="right"
          icon="file-text" size="large"/>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  name: "news",
  data() {
    return {
      cellList: [
        {title: '上海北蔡一小区发通知每单元派一名代表购物一小时？居委回应', path: ''},
        {title: '海曙段塘：专业领域党建联盟助力 老旧小区改造按下"加速键"', path: ''},
        {title: '十年芜湖世茂滨江小区逆生长', path: ''},
        {title: '永定河孔雀城精品物业，专业缔造幸福生活', path: ''},
        {title: '三个老旧小区上调物业费后 生活环境变好了 服务标准提高了', path: ''},
        {title: '业主不交停车费，车子就不能进小区？', path: ''},
        {title: '小区物业亟待建立服务评价和淘汰制度', path: ''},
        {title: '佳兆业美好成都分公司“第一届邻里杯”社区趣味运动会圆满结束', path: ''},
        {title: '云景东里社区携手物业开展底商消防安全培训活动', path: ''},
        {title: '武汉公布物业服务小区双评议前十和后十名单 看看有没有你家的小区？', path: ''},
        {title: '业委会赶走物业自治，2万电费没交被断电，业主：电梯都用不了', path: ''},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .u-cell__body {
  padding: 30rpx 15px;
}
</style>
