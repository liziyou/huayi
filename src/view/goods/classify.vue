<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <van-cell v-for="(item) in lastList" :key="item.ProId" class="classify-list" @click="goDetail(item)">
          <template #left-icon />
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <img :src="filterImg(item.Images)">
            <div class="list-title">
              <div class="name">{{ item.ProName }}</div>
              <div class="specStr">
                <span>规格：{{ item.SpecStr }}</span>
              </div>
              <div class="price">¥ <span>{{ formatPrice(item.ProPrice) }}</span></div>
            </div>
          </template>
        </van-cell>
        <template #finished>
          <div v-if="lastList.length>0">没有更多了</div>
          <div v-else>暂无数据</div>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import {
  PullRefresh,
  Cell,
  List,
  CellGroup
} from 'vant'
import oneFiveFour from '../../../static/bjson/154.json'
import fiveFive from '../../../static/bjson/55.json'
export default {
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh
  },
  props: {
    currentSidebar: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [],
      lastList: [],
      loading: false,
      finished: false,
      refreshing: false,
      currentPage: 1,
      sibaList: [
        {
          id: 154,
          data: oneFiveFour
        },
        {
          id: 55,
          data: fiveFive
        }
      ]
    }
  },
  watch: {
    currentSidebar(val) {
      console.log('val,old')
      console.log(val)
      this.list = []
      this.lastList = []
      this.loading = true
      this.finished = false
      this.onLoad()
    }
  },
  methods: {
    onLoad() {
      console.log('sibaList')
      console.log(this.sibaList)
      console.log(this.currentSidebar)
      const findCurrent = this.sibaList.find((item) => item.id === this.currentSidebar.CategoryId)
      console.log('findCurrent')
      console.log(findCurrent)
      this.lastList = []
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        if (!findCurrent) {
          this.list = []
          this.finished = true
          this.loading = false
          return false
        }
        const currentData = findCurrent.data.Data.GoodsList || []

        const arrLength = currentData.length // 数组长度
        const num = 10 // 每页显示 10 条
        let index = 0
        for (let i = 0; i < arrLength; i++) {
          if (i % num === 0 && i !== 0) { // 可以被 10 整除
            this.list.push(currentData.slice(index, i))
            index = i
          }
          if ((i + 1) === arrLength) {
            this.list.push(currentData.slice(index, (i + 1)))
          }
        }
        this.loading = false
        console.log('this.list')
        console.log(this.list)
        for (let i = 0; i < this.list.length; i++) {
          console.log('this.list[i]')
          console.log(this.list[i])
          this.lastList = this.lastList.concat(this.list[i])
        }
        console.log('lastList')
        console.log(this.lastList)
        if (this.lastList.length >= arrLength) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    filterImg(imgs = []) {
      const imgData = imgs.split(',')
      return imgData.length > 0 ? imgData[0] : ''
    },
    formatPrice(price = 0) {
      const a = price.toFixed(2).toLocaleString()
      return a
    },
    goDetail(item) {
      console.log('item')
      console.log(item)
      this.$router.push({ name: 'detail', query:
      {
        ProId: item.ProId,
        CategoryId: this.currentSidebar.CategoryId
      }})
    }
  }
}
</script>
<style lang="less" scoped>
.classify-list {
  .van-cell__title {
    display: flex;
    img {
      width: 80px;
      height: 80px;
    }
  .list-title {
    display: flex;
    flex-flow: column;
    .name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-all;
      color: #333;
     line-height: 20px;
    }
    .specStr {
      span{
        display: inline-block;
        padding: 2px 4px;
        margin-top: 4px;
        line-height: 1;
        font-size: 12px;
        border-radius: 4px;
        background: #F8F9FB;
      }
    }
    .price {
      font-size: 12px;
      color: #FE3A3B;
      span{
        font-size: 16px;
      }
    }
   }
  }

}
</style>
