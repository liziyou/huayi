<template>
  <div class="coupon">
    <van-nav-bar
      title="优惠券"
      left-arrow
      class="left-icon"
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active">
      <van-tab v-for="(item,index) in couponTabs" :key="index" :title="item.name">
        <van-cell v-if="couponList.lenth > 0" />
        <van-cell v-else class="coupon-content">
          <div class="coupon-content-empty">
            <div class="empty-img">
              <img :src="couponEmpty">
            </div>
            <div class="empty-txt">
              <p>无优惠券可用</p>
            </div>
          </div>
        </van-cell>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { Tabs, Tab, NavBar, Cell } from 'vant'
export default {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell
  },
  data() {
    return {
      active: 0,
      couponEmpty: require('/static/images/img_coupon.png'),
      payImgs: [
        {
          id: 1,
          url: require('/static/images/user/index/icon-01.png'),
          name: '待付款'
        },
        {
          id: 2,
          url: require('/static/images/user/index/icon-02.png'),
          name: '待发货'
        },
        {
          id: 3,
          url: require('/static/images/user/index/icon-03.png'),
          name: '待收货'
        },
        {
          id: 4,
          url: require('/static/images/user/index/icon-04.png'),
          name: '交易完成'
        },
        {
          id: 5,
          url: require('/static/images/user/index/icon-05.png'),
          name: '退款/售后'
        }
      ],
      couponTabs: [
        {
          id: 0,
          name: '领取优惠券'
        },
        {
          id: 1,
          name: '可使用'
        },
        {
          id: 2,
          name: '已使用'
        },
        {
          id: 3,
          name: '已过期'
        }
      ],
      couponList: []
    }
  },
  created() {
    this.active = this.$route.query.search
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    }
  }

}

</script>

<style lang="less" scope>
.coupon {
  .left-icon {
    .van-icon {
      color: #323233;
    }
  }
  &-content {
    background: #fafafa;
    &-empty {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      .empty-img {
         margin: 0 auto;
        img {
          width: 120px;
          margin-top: 80px;
        }
      }
      .empty-txt {
        margin: 0 auto;
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>
