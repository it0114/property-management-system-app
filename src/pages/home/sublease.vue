<template>
  <view class="sublease">
    <u--form
        ref="uForm"
        :model="model"
        :rules="rules"
        labelPosition="top"
        labelWidth="180rpx"
    >
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
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="面积 :"
          prop="userInfo.area">
        <u--input
            v-model="model.userInfo.area"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="出租人 :"
          prop="userInfo.lessorName">
        <u--input
            v-model="model.userInfo.lessorName"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="出租人电话 :"
          prop="userInfo.tel">
        <u--input
            v-model="model.userInfo.tel"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="租赁人 :"
          prop="userInfo.checkinUserName">
        <u--input
            v-model="model.userInfo.tenantName"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="租赁人电话 :"
          prop="userInfo.tel">
        <u--input
            v-model="model.userInfo.tenantTel"
            border="none"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="用途 :"
          prop="userInfo.purpose">
        <u--input
            v-model="model.userInfo.purpose"
            border="none"/>
      </u-form-item>
      <u-form-item>
        <u-button color="#2F6DEF" shape="circle" type="primary" @click="submit">
          提 交
        </u-button>
      </u-form-item>
    </u--form>
    <u-modal :content='modalContent' :show="modalShow" title="提示" @confirm="handleModalOK"></u-modal>
  </view>
</template>

<script>
export default {
  name: "sublease",
  data() {
    return {
      modalShow: false,
      modalContent: '',
      model: {
        userInfo: {
          name: '',      // 房屋
          displayTitle: '',  // 名称
          area: '',   // 面积
          lessorName: '',  // 出租人
          lessorTel: '',   // 出租人电话
          tenantName: '', // 租赁人
          tenantTel: '', // 租赁电话
          purpose: '',  // 用途
        }
      },
      rules: {
        'userInfo.name': {
          type: 'string',
          required: true,
          message: '请填写房屋',
          trigger: ['blur']
        },
        'userInfo.area': {
          type: 'string',
          required: true,
          message: '请填写面积',
          trigger: ['blur']
        },
        'userInfo.displayTitle': {
          type: 'string',
          required: true,
          message: '请填写名称',
          trigger: ['blur']
        },
        'userInfo.lessorName': {
          type: 'string',
          required: true,
          message: '请填写出租人',
          trigger: ['blur']
        },
        'userInfo.lessorTel': {
          type: 'string',
          required: true,
          message: '请填写出租人电话',
          trigger: ['blur']
        },
      },
    }
  },
  mounted() {
    this.getData()
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
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
            // console.log(resData.data);
            // 如果有数据 ,则赋值
            this.model.userInfo = {
              ...resData.data[0],
              lessorName: resData.data[0].checkinUser.displayTitle, // 出租人
              lessorTel: resData.data[0].tel // 出租人电话
            }

          } else {
            uni.$u.toast('数据获取失败')
          }
        }
      })
    },
    setUserInfoEmpty() {
      this.model.userInfo = {
        name: '',      // 房屋
        displayTitle: '',
        area: '',
        lessorName: '',  // 出租人
        lessorTel: '',   // 出租人电话
        tenantName: '', // 租赁人
        tenantTel: '', // 租赁电话
        purpose: '',
      }
    },
    submit() {
      this.$refs.uForm.validate().then(async () => {

        // 提交
        let res = await uni.$u.http.post('/api/subleaseLog', {
          ...this.model.userInfo,
          // house: {
          //   area: this.model.userInfo.area,
          //   building: this.model.userInfo.building
          // }
          houseId: this.model.userInfo.buildingId
        })

        // 提交成功
        if (res) {
          this.modalShow = true
          this.modalContent = '提交成功, 请耐心等待物业管理员进行审核 ~ '
        }

      }).catch(errors => {
        uni.$u.toast('校验失败 , 内容不能为空')
      })
    },
    handleModalOK() {
      this.$refs.uForm.resetFields()
      uni.switchTab({
        url: '/pages/home/index',
        success() {
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.sublease {
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
