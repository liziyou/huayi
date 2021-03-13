<template>
  <div class="user">
    <van-nav-bar :title="title" :fixed="true" class="left-icon">
      <template #right>
        <van-icon name="setting-o" size="20" />
      </template>
    </van-nav-bar>
    <div class="user-poster" :style="bgImg">
      <div class="poster-box">
        <img :src="avatar">
      </div>
      <p>用户名</p>
    </div>
    <van-row class="user-img">
      <van-col v-for="img in payImgs" :key="img.id" span="4" @click="goOrder(img)">
        <div class="item">
          <img :src="img.url">
          {{ img.name }}
        </div>
      </van-col>
    </van-row>
    <van-cell-group class="user-group">
      <van-cell icon="orders-o" title="全部订单" is-link @click="goOrder({id: 0})" />
    </van-cell-group>
    <van-cell-group>
      <van-cell icon="location-o" title="地址管理" is-link to="/address" />
      <van-cell icon="chat-o" title="联系店铺" is-link to="/userInfo" />
      <van-cell icon="coupon-o" title="我的优惠券" is-link to="/coupon" />
      <!-- <van-cell icon="gift-o" title="我收到的礼物" @click.native="handleClose" /> -->
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Image, NavBar } from 'vant'
export default {
  components: {
    [Row.name]: Row,
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      avatar: require('/static/images/default-headImg.png'),
      bgImg: {
        backgroundImage: 'url(' + require('/static/images/bg_mycenter.png') + ')',
        backgroundSize: '100% 100%'
      },
      userBgImg: require('/static/images/bg_mycenter.png'),
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
      ]
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  },
  methods: {
    goOrder(img) {
      this.$router.push({ name: 'order', query:
      {
        search: img.id
      }})
    },
    handleClose() {
      try {
        window.location.href = 'about:blank'
        window.open(window.location.href, '_self').close()
      } catch (e) {
        console.log(';;')
      }
    }
  }
}
</script>

<style lang="less" scope>
.user {
  &-poster {
    margin-top: 44px;
    width: 100%;
    height: 35vw;
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    font-size: 14px;
    .poster-box {
      width: 64px;
      height: 64px;
      border-radius: 100%;
      display: block;
      background: #fff;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    p {
      line-height: 30px;
    }
  }

  &-group {
    margin-bottom: 15px;
  }

  &-img {
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    .item {
      flex: 1;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-align: center;
      align-items: center;
    }
    img {
      width: 38px;
      height: 38px;
    }
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
