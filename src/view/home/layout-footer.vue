<template>
  <div>
    <router-view class="view-content" />
    <Footer />
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, NavBar, Tabbar, TabbarItem } from 'vant'
import Footer from './footer'

export default {
  components: {
    [Row.name]: Row,
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    Footer
  }
}
</script>

<style lang="less" scope>
.view-content {
  padding-bottom: 60px;
}
</style>
