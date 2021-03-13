<template>
  <div>

    <van-tabbar v-model="footerData.active" active-color="#ee0a24" inactive-color="#000" route @change="onChange">
      <van-tabbar-item icon="wap-home-o" name="home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" name="goods" to="/goods"> 分类</van-tabbar-item>
      <van-tabbar-item icon="fire-o" :name="2" to="/activities">活动</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :name="3" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" :name="5" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, NavBar, Tabbar, TabbarItem } from 'vant'

export default {
  components: {
    [Row.name]: Row,
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      footerData: {
        active: 'home'
      }

    }
  },
  methods: {
    onChange(e) {
      console.log('ddd')
      console.log(e)

      this.$nextTick(() => {
        this.footerData.active = e
        console.log('ddd')
        // console.log(this.active)
        // this.$set(this.active, 'red', true)
      })
    }
  }
}
</script>

<style lang="less" scope>

</style>
