<template>
  <view class="my-home">
    <u--form
        ref="uForm"
        :model="model"
        labelPosition="top"
        labelWidth="160rpx"
    >
      <u-form-item
          borderBottom
          label="楼宇 :"
          prop="userInfo.building">
        <u--input
            v-model="model.userInfo.building"
            :disabled="true"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="单元 :"
          prop="userInfo.buildingUnit">
        <u--input
            v-model="model.userInfo.buildingUnit"
            :disabled="true"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="房屋 :"
          prop="userInfo.name">
        <u--input
            v-model="model.userInfo.name"
            :disabled="true"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="名称 :"
          prop="userInfo.displayTitle">
        <u--input
            v-model="model.userInfo.displayTitle"
            :disabled="true"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="面积 :"
          prop="userInfo.area">
        <u--input
            v-model="model.userInfo.area"
            :disabled="true"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="入住人 :"
          prop="userInfo.checkinUserName">
        <u--input
            v-model="model.userInfo.checkinUserName"
            :disabled="true"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="用途 :"
          prop="userInfo.purpose">
        <u--input
            v-model="model.userInfo.purpose"
            :disabled="true"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="手机 :"
          prop="userInfo.tel">
        <u--input
            v-model="model.userInfo.tel"
            :disabled="true"
            border="none"/>
      </u-form-item>
    </u--form>
  </view>
</template>

<script>
export default {
  name: "my-home",
  data() {
    return {
      model: {
        userInfo: {
          building: '', // 楼宇
          buildingUnit: '',// 单元
          name: '',
          displayTitle: '',
          area: '',
          checkinUserName: '',  // 入住人
          purpose: '',
          tel: ''
        }
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 请求数据
    getData() {
      uni.getStorage({
        key: "propertyUserId",
        success: async user => {
          let userId = user.data

          // 用户id 请求用户信息, 然后用用户信息返回的 houseId 请求 房屋信息

          let userInfo = await uni.$u.http.get('/api/user', {params: {id: userId}})
          // console.log(userInfo.data[0].houseId);
          if (userInfo.data[0].houseId === null) {
            this.setUserInfoEmpty()
            return
          }
          // 2. 根据 houseId 获取对应数据
          let resData = await uni.$u.http.get('/api/house',
              {params: {id: userInfo.data[0].houseId}})
          if (resData.data) {
            // 如果是没有数据的情况, 则不处理
            if (resData.data[0] === undefined) {
              this.setUserInfoEmpty()
              return
            }
            // 如果有数据 ,则赋值
            this.model.userInfo = {
              ...resData.data[0],
              building: resData.data[0].building.name + ' - ' + resData.data[0].building.type, // 楼宇
              buildingUnit: resData.data[0].buildingUnit.name,  //单元
              checkinUserName: resData.data[0].checkinUser.displayTitle // 入住人
            }

          } else {
            uni.$u.toast('数据获取失败')
          }
        }
      })
    },
    setUserInfoEmpty() {
      this.model.userInfo = {
        building: '暂无数据', // 楼宇
        buildingUnit: '暂无数据',// 单元
        name: '暂无数据',
        displayTitle: '暂无数据',
        area: '暂无数据',
        checkinUserName: '暂无数据',  // 入住人
        purpose: '暂无数据',
        tel: '暂无数据'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-home {
  padding: 30rpx;
  box-sizing: border-box;

  ::v-deep uni-input {
    min-height: 2.4em;
  }

  ::v-deep .uni-input-input {
    color: #999;
    padding: 20rpx;
  }
}
</style>
