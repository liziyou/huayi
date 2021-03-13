<template>
  <div class="user-info">
    <van-nav-bar
      :title="goodsDetailTitle"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <van-cell-group class="user-info-content">
      <van-cell>
        <div class="user-info-item">
          <div class="user-info-title">店铺图标</div>
          <div class="user-info-detail">
            <img :src="userInfo.ShopLogo">
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div class="user-info-item">
          <div class="user-info-title">店铺名称</div>
          <div class="user-info-detail">
            {{ userInfo.ShopName }}
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div class="user-info-item">
          <div class="user-info-title">联系人</div>
          <div class="user-info-detail">
            {{ userInfo.Contacts }}
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div class="user-info-item">
          <div class="user-info-title">联系电话</div>
          <div class="user-info-detail">
            {{ userInfo.ContactsPhone }}
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div class="user-info-item">
          <div class="user-info-title">店铺简介</div>
          <div class="user-info-detail">
            {{ userInfo.ShopDesc }}
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div class="user-info-item">
          <div class="user-info-title">店铺地址</div>
          <div class="user-info-detail">
            {{ userInfo.AddressDetails }}
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <div class="user-info-img">
      <div class="title">
        店铺照片
      </div>
      <van-cell-group class="imgs-group">
        <van-cell>
          <van-col v-for="(img,index) in phones" :key="index" :span="7" :offset="1">
            <img :src="img">
          </van-col>
        </van-cell>
      </van-cell-group>
    </div>
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
import userImportJson from './user.json'
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
      userInfo: userImportJson.Data,
      phones: userImportJson.Data.ShopInsideImage.split(','),
      numberValue: 1,
      detail: '',
      goodsDetailTitle: '商铺信息',
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

    }
  }
}
</script>

<style lang="less" scope>
.user-info {
  &-img {
   .title {
      padding-top: 10px;
      padding-left: 10px;
      overflow: hidden;
      color: #353535;
   }
   .imgs-group {
     img {
      max-width: 100%;
      width: auto;
     }
   }
  }
  padding-bottom: 50px;
  &-content {
    margin-top: 40px;
  }
  &-item {
    display: flex;
    align-items: center;
  }
  &-detail {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    width: 80%;
  }

  &-title {
    width: 30%;
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
