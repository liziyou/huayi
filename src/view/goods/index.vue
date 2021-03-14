<template>
  <div class="classify-goods">
    <van-search
      v-model="value"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch"> 查询
        </div>
      </template>
    </van-search>
    <div class="goods-idx">
      <van-sidebar v-model="activeKey" class="goods-idx-left" @change="changeSibebar">
        <van-sidebar-item
          v-for="item in categoryData"
          :key="item.Name"
          :title="item.Name"
        />

      </van-sidebar>
      <div class="goods-idx-right">
        <Classify
          :current-sidebar="currentSidebar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  SidebarItem,
  Toast,
  Sidebar,
  Search,
  CellGroup
} from 'vant'
import Classify from './classify'
import testImportJson from '../home/index.json'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    Classify,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Search.name]: Search
  },

  data() {
    return {
      activeKey: null,
      value: '',
      categoryData: testImportJson.Data.Category,
      currentSidebar: testImportJson.Data.Category[0]
    }
  },
  computed: {
    ...mapState({
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      count(state) {
        return state.count
      },
      currentBar(state) {
        return state.currentBar
      }
    }),
    ...mapGetters(['getCurrentBar'])

  },
  created() {
    console.log('getCurrentBar')
    console.log(this.getCurrentBar)
    this.activeKey = this.currentBar.activeKey
    if (this.$route.query.activeKey) {
      this.activeKey = Number(this.$route.query.activeKey)
      console.log('current-----')
      console.log(this.activeKey)

      const current = this.categoryData[this.activeKey]
      console.log('current------')
      console.log(current)

      this.changeSibebar(this.activeKey)
    }
  },
  methods: {
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2)
    },

    onClickCart() {
      this.$router.push('cart')
    },

    sorry() {
      Toast('暂无后续逻辑~')
    },
    onSearch() {
      this.$router.push({ name: 'activities', query:
      {
        key: this.value
      }})
    },
    ...mapMutations({ setbar: 'setCurrentBar' }),
    changeSibebar(e) {
      console.log('categoryData')
      console.log(this.categoryData[e])
      this.currentSidebar = this.categoryData[e]
      this.currentSidebar.activeKey = this.activeKey
      console.log('this.currentSidebar')
      console.log(this.currentSidebar)

      this.setbar(this.currentSidebar)
      console.log('currentBar')
      console.log(this.currentBar)
    }
  }
}
</script>

<style lang="less" scope>
.goods-idx {
  display: flex;
  justify-content:space-between;
  // background: #fff;
  &-left {
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 0;
    width: 30%;
    overflow-y: scroll;
    background: #f8f8f8;
    .van-sidebar-item--select{
      color: #FE3A3B;
    }
  }
  &-right{
    background: #fff;
    position: fixed;
    top: 50px;
    bottom: 50px;
    right: 0;
    width: 75%;
    overflow-y: scroll;
    border-right: 1px solid #ddd;
  }
}
</style>
