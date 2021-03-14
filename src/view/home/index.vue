<template>
  <div>
    <van-search
      v-model="value"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(image, index) in AdsData" :key="index">
        <img v-lazy="image.ADImageUrl">
      </van-swipe-item>
    </van-swipe>

    <van-row class="user-links" type="flex" justify="space-between">
      <van-col v-for="(head, index) in headLinks" :key="head.CategoryId" class="head-col">
        <div v-if="index < 9" @click="handleLink(head)">
          <div class="img-box">
            <img :src="head.Image">
          </div>
          {{ head.Name }}
        </div>
        <div v-if="index === 9">
          <div class="img-box">
            <img :src="moreImg">
          </div>
          更多
        </div>
      </van-col>
    </van-row>
    <div class="classify">
      <div v-for="(classify, index) in imgFloors" :key="classify.CategoryId" class="classify-content">
        <div class="classify-head">
          <van-cell value="查看更多" is-link @click="handleClassifyMore(classify,index)">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span class="custom-title">{{ classify.FloorName }}</span>
            </template>
          </van-cell>
        </div>

        <van-row class="classify-item-img" type="flex" justify="space-between">
          <van-col v-for="(goods,idx) in classify.GoodsList" :key="goods.ProId" span="7">
            <div v-if="idx < 3" @click="goGoodsDetail(goods,classify)">
              <div class="img-box">
                <img :src="filterImg(goods.Images)">
              </div>
              <div class="detail-txt">
                {{ goods.ProName }}
              </div>
              <div class="detail-price">
                {{ formatPrice(goods.ProPrice) }}
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-divider>我是有底线的</van-divider>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Search, Card, Divider } from 'vant'
import Vue from 'vue'
import testImportJson from './index.json'
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
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Card.name]: Card,
    [Divider.name]: Divider
  },
  data() {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ],
      value: '',
      testImportJson,
      headLinks: testImportJson.Data.Category,
      moreImg: require('/static/images/img_category_more.png'),
      imgFloors: testImportJson.Data.Floor,
      AdsData: testImportJson.Data.Ads
    }
  },
  methods: {
    onSearch() {
      this.$router.push({ name: 'activities', query:
      {
        key: this.value
      }})
    },
    handleLink(item) {
      console.log('lll')
      console.log(item)
    },
    filterImg(imgs = []) {
      const imgData = imgs.split(',')
      return imgData.length > 0 ? imgData[0] : ''
    },
    formatPrice(price = 0) {
      const a = price.toFixed(2).toLocaleString()
      return `¥` + a
    },
    goGoodsDetail(item, classify) {
      console.log('item')
      console.log(item)

      this.$router.push({ name: 'detail', query:
      {
        ProId: item.ProId,
        CategoryId: classify.CategoryId
      }})
    },
    handleClassifyMore(item, index) {
      console.log('lll')
      console.log(item)
      if (index > 0) {
        index = index - 1
      }
      this.$router.push({ name: 'goods',
        query: {
          activeKey: index
        }})
    }
  }
}
</script>

<style lang="less" scope>
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    flex-flow: row wrap;
    justify-content: flex-start;
    text-align: center;
    background-color: #fff;
    .head-col {
      width: 20%;
      padding-top: 10px;
      .img-box {
        width: 46px;
        height: 46px;
        line-height: 46px;
        margin: 0 auto;
        border-radius: 50%;
      }
      img {
        width: 100%;
      }
    }
  }
}
.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color:#fff;
    img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 175px;
      // padding: 30px 60px;
      background-color: #fff;
      pointer-events: none;
    }
  }
  .van-swipe__indicator {
    background: gray;
  }
}
.classify {
  margin: 2%;
  justify-content: flex-start;
  &-item-img {
    .img-box {
      img {
        width: 100%;
      }
    }
    .detail-txt {
      margin-top:10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-all;
      height: 38px;
      line-height: 1.4;
      font-size: 14px;
    }
    .detail-price {
      color: #FE3A3B;
      font-weight: 700;
      padding: 4px 0;
    }
  }
  &-head {
    margin-top: 20px;
    margin-bottom: 12px;
    .van-cell--clickable {
      padding-left: 6px;
      padding-right: 2px;
    }
    .van-cell__title {
      color: #333;
      font-size: 16px;
      font-weight: 700
    }
    .van-cell__value {
      font-size: 12px;
    }
  }
}
</style>
