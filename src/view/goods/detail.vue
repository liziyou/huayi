<template>
  <div class="goods">
    <van-nav-bar
      :title="goodsDetailTitle"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumbs" :key="thumb">
        <img :src="thumb">
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.ProName }}</div>
        <div class="goods-price">{{ formatPrice(goods.ProPrice) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="24">规格：{{ goods.SpecStr }}</van-col>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="16">数量</van-col>
        <van-col span="8">
          <van-stepper v-model="numberValue" integer min="1" input-width="40px" @stepper-active-color="'red'" />
        </van-col>
      </van-cell>
    </van-cell-group>

    <!-- <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template #title>
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group> -->
    <div class="goods-detail-title">商品详情</div>
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <!-- <div id="img-detail" /> -->
      </van-cell>
    </van-cell-group>
    <div id="img-detail" />
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="goUserInfo">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  Stepper,
  NavBar,
  GoodsActionButton
} from 'vant'

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [Stepper.name]: Stepper,
    [NavBar.name]: NavBar,
    [GoodsActionButton.name]: GoodsActionButton
  },

  data() {
    return {
      numberValue: 1,
      detail: '',
      goodsDetailTitle: '标题',
      goods: {
      }
    }
  },
  created() {
    this.getDetail()
    console.log('ll')
    console.log(this.$route.query)
  },

  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    formatPrice(price = 0) {
      return '¥' + (price).toFixed(2)
    },
    onClickCart() {
      this.$router.push('cart')
    },

    sorry() {
      Toast('暂无后续逻辑~')
    },
    goUserInfo() {
      this.$router.push({ name: 'userInfo' })
    },
    getDetail() {
      console.log('this.$route')
      console.log(this.$route.query.ProId)
      let url = 'https://api.jdhui.com/api/JdhOrder/GoodsDetailsClubB2c'
      const ProId = this.$route.query.ProId
      const CategoryId = Number(this.$route.query.CategoryId)
      if (CategoryId === 55) {
        url = 'https://api.jdhui.com/api/JdhOrder/GoodsDetailsClubB2c'
      } else if (CategoryId === 0) {
        url = 'https://api.jdhui.com/api/JdhGoods/CustomerGetQwyxGoodsDetails'
      }
      console.log('CategoryId')
      console.log(CategoryId)

      this.$ajax.post(url, {
        clubSN: 'M4703407',
        ProId: ProId
      }).then((res) => {
        console.log('res')
        console.log(res)
        const thumbs = res.data.Data.Images.split(',')
        this.goods = res.data.Data
        this.goods.thumbs = thumbs
        this.goodsDetailTitle = this.goods.ProName
        const str = this.goods.DetailsImages || this.goods.Details
        const node = document.querySelector('#img-detail')
        node.insertAdjacentHTML('beforeEnd', str)
      }).catch((err) => {

      })
    }
  }
}
</script>

<style lang="less" scope>
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
  &-detail-title {
    display: block;
    position: relative;
    line-height: 24px;
    padding-top: 10px;
    padding-left: 10px;
    overflow: hidden;
    color: #353535;
  }
  .van-nav-bar .van-icon {
    color: #323233;
  }
}
#img-detail {
  img {
    max-width: 100%;
  }
}
</style>
