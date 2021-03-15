<template>
  <div class="activities">
    <van-search
      v-model="searchValue"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template v-if="toHome" #left>
        <van-icon name="arrow-left" @click="goBack" />
      </template>
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-tabs v-model="active" @change="changeTab">
      <van-tab v-for="(item, index) in activeList" :key="index">
        <template #title>
          <div class="activities-sort">
            {{ item.name }}
            <div v-if="index === 0" class="tabs-arrow" @click="sortGoods">
              <i class="sort" :class="active === 0 ? sortType : ''" />
            </div>
          </div>
        </template>
        <van-pull-refresh
          v-model="isLoading"
          :head-height="80"
          @refresh="onRefresh"
        >
          <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
          <template>
            <van-cell>
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title class="">
                <div class="goods-list-box">
                  <div
                    v-for="goods in searchList"
                    :key="goods.ProId"
                    class="goods-list-item"
                    @click="goDetail(goods)"
                  >
                    <div class="img-box">
                      <img :src="filterImg(goods.Images)">
                    </div>
                    <div class="info">
                      <p class="title">
                        {{ goods.ProName }}
                      </p>
                      <p class="text-light text-ellipsis">
                        <span
                          class="goods-spec"
                        >规格：{{ goods.SpecStr }}</span>
                      </p>
                      <div class="origin-price">
                        ¥
                        <span class="price text-small">
                          <span class="price-large">{{ goods.ProPrice }}</span>
                        </span>
                        .00
                      </div>
                    </div>
                  </div>
                  <div v-if="searchList.length < 1" class="table-data-empty">
                    暂无相关数据
                  </div>
                </div>
              </template>
            </van-cell>
          </template>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Icon,
  Cell,
  CellGroup,
  NavBar,
  Tabbar,
  TabbarItem,
  Search,
  Tabs,
  Tab,
  PullRefresh
} from 'vant'

export default {
  components: {
    [Row.name]: Row,
    [PullRefresh.name]: PullRefresh,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Search.name]: Search,
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
      searchValue: '',
      searchSortType: 1,
      active: 0,
      isLoading: false,
      sortType: 'down',
      activeList: [
        {
          name: '价格'
        },
        {
          name: '新品优先'
        },
        {
          name: '有货优先'
        }
      ],
      searchList: []
    }
  },
  computed: {
    toHome() {
      return this.$route.query.key
    }
  },
  created() {
    this.searchValue = this.toHome
    this.onSearch()
  },
  methods: {
    onSearch() {
      const url = 'https://api.jdhui.com/api/JdhOrder/SearchB2c'
      this.$ajax
        .post(url, {
          SortType: this.searchSortType,
          clubSN: 'M4703407',
          key: this.searchValue
        })
        .then((res) => {
          console.log('res')
          console.log(res)
          this.searchList = res.data.Data.GoodsList
          console.log('this.searchList')
          console.log(this.searchList)
        })
        .catch((err) => {})
    },
    sortGoods() {
      this.sortType = this.sortType === 'down' ? 'up' : 'down'
      this.searchSortType = this.sortType === 'down' ? 1 : 2
      this.onSearch()
    },
    onRefresh() {},
    filterImg(imgs = []) {
      const imgData = imgs.split(',')
      return imgData.length > 0 ? imgData[0] : ''
    },
    changeTab() {
      this.searchSortType = this.active === 0 ? 1 : this.active + 2
      this.onSearch()
    },
    goBack() {
      this.$router.back(-1)
    },
    goDetail(item) {
      console.log('item--- ')

      this.$router.push({
        name: 'detail',
        query: {
          ProId: item.ProId
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
.activities {
  .van-tab--active {
    color: #fe3a3b;
  }
  .van-cell {
    background: #f8f8f8;
  }
  &-sort {
    display: flex;
    .tabs-arrow {
      display: flex;
      align-items: center;
      justify-content: left;
      flex-direction: column;
      .sort {
        position: absolute;
        top: 29px;
        margin-left: 25px;
      }
      .sort::before {
        content: "";
        position: absolute;
        left: -5px;
        margin-top: -12px;
        border-style: solid;
        border-color: #646566;
        border-width: 0 5px 5px 5px;
        border-left-color: transparent;
        border-right-color: transparent;
      }
      .sort::after {
        content: "";
        position: absolute;
        left: -5px;
        margin-top: -5px;
        border-style: solid;
        border-width: 5px 5px 0px 5px;
        border-color: #646566;
        border-left-color: transparent;
        border-right-color: transparent;
      }
      .down::after {
        border-color: #fe3a3b;
        border-left-color: transparent;
        border-right-color: transparent;
      }
      .up::before {
        border-color: #fe3a3b;
        border-left-color: transparent;
        border-right-color: transparent;
      }
    }
  }
  .goods-list-box {
    .goods-list-item {
      display: table;
      width: 100%;
      overflow: hidden;
      vertical-align: top;
      table-layout: fixed;
      border-spacing: 0;
      .img-box {
        position: relative;
        display: table-cell;
        width: 110px;
        height: 100px;
        padding-right: 15px;
        box-sizing: content-box;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .info {
        position: relative;
        display: table-cell;
        vertical-align: top;
        flex: 1;
        font-size: 14px;
        .title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          word-break: break-all;
        }
        .text-ellipsis {
          color: #999;
          max-width: 100%;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          .goods-spec {
            display: inline-block;
            padding: 2px 4px;
            margin-top: 4px;
            line-height: 1;
            font-size: 12px;
            border-radius: 4px;
            background: #f8f9fb;
          }
        }
        .origin-price {
          color: #fe3a3b;
          position: absolute;
          width: 100%;
          bottom: 0;
          line-height: 16px;
          font-size: 12px;
          .price-large {
            font-size: 16px;
          }
        }
      }
    }
  }
  .table-data-empty {
    padding: 10px;
    border-top: 0;
    text-align: center;
    line-height: 2.5;
    font-size: 14px;
    color: #666;
  }
}
</style>
