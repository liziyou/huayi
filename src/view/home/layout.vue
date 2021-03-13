<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow :fixed="true">
      <van-icon slot="right" name="search" />
    </van-nav-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image">
      </van-swipe-item>
    </van-swipe>
    <van-row class="user-links" type="flex" justify="space-between">
      <van-col span="4">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="4">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="4">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="4">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="4">
        <van-icon name="records" />
        lll
      </van-col>
    </van-row>
    <Footer />
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload } from 'vant'
import Footer from './footer'
import Vue from 'vue'
Vue.use(Lazyload)
export default {
  components: {
    [Row.name]: Row,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    Footer
  },
  data() {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  }
}
</script>

<style lang="less" scope>
.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    top:40px;
    background-color:#fff;
    height: 300px;
    img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 240px;
      padding: 30px 60px;
      background-color: #fff;
      pointer-events: none;
    }
  }
  .van-swipe__indicator {
    background: gray;
  }
}
</style>
