<template>
  <div class="confirm">
    <van-nav-bar
      title="确认订单"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="confirm-goods">
      <van-cell class="confirm-goods-contact">
        <div class="icon">
          <van-icon name="location-o" />
        </div>
        <div>
          <div class="address">
            <div>收货人：{{ contartInfo.name }}</div>
            <div>{{ contartInfo.tel }}</div>
          </div>
          <div class="address">
            <div />
            <div>收货地址：{{ contartInfo.address }}</div>
          </div>
        </div>
      </van-cell>
      <van-cell
        v-for="item in goods"
        :key="item.id"
        class="confirm-goods-item"
      >
        <van-card
          :price="item.price.toFixed(2) + ''"
          :desc="item.desc"
          :title="item.title"
          :num="item.num"
          :thumb="item.thumb"
        />
      </van-cell>
      <van-cell
        v-if="goods.length < 1"
        class="confirm-goods-item-empty"
      >
        <div class="img-box">
          <img :src="goodEmpty">
        </div>
        <div class="txt">
          <p>购物车空空如也，去选购一些商品吧～～</p>
          <van-button round url="/" color="linear-gradient(to right, #ff6034, #ee0a24)">去首页</van-button>
        </div>
      </van-cell>
      <van-cell class="good-same-pad" title="优惠券减免" />
      <van-cell>
        <!-- 优惠券单元格 -->
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
          @change="changeChosenCoupon"
        />
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
      </van-cell>
      <van-cell class="good-same-pad" title="配送方式" :value="'快递费：'+addressPrice+'元'" />
      <van-cell>
        <van-field v-model="inputValue" label="备注：" placeholder="请输入备注" />
      </van-cell>
      <van-cell class="good-same-pad" title="订单总价" :value="'¥'+totalPrice" />
    </div>
    <van-submit-bar
      v-if="isEmpty"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    >
      <div class="confirm-price">
        <span class="txt">实付款：</span>
        <span class="price">¥ {{ totalPriceCoupon }}</span>
      </div>
    </van-submit-bar>
  </div>
</template>

<script>
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1615646359,
  endAt: 1617115159,
  valueDesc: '1.5',
  unitDesc: '元'
}
import { Checkbox, Field, CheckboxGroup, Card, SubmitBar, Toast, Tag, Button, NavBar, Icon, Stepper, Cell, Coupon, CouponCell, CouponList, Popup } from 'vant'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [CouponList.name]: CouponList,
    [Coupon.name]: Coupon,
    [CouponCell.name]: CouponCell,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Tag.name]: Tag
  },

  data() {
    return {
      inputValue: '',
      addressPrice: 8,
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      couponPrice: 0,
      disabledCoupons: [coupon],
      contartInfo: {
        id: '3',
        name: '王五',
        tel: '1320000000',
        address: '浙江省杭州市滨江区江南大道 15 号'
      },
      goodEmpty: require('/static/images/cartEmpty.png'),
      checkedGoods: [],
      allChecked: false,
      showType: true,
      goods: []
    }
  },
  computed: {
    ...mapGetters(['getCartGoods']),
    submitBarText() {
      return '提交订单'
    },

    totalPrice() {
      console.log('chosenCoupon')
      console.log(this.chosenCoupon)

      let total = 0
      this.goods.map(item => {
        total += item.price * 100 * item.num
        console.log(total)
      })
      console.log('total')
      console.log(total)
      return total / 100
    },
    totalPriceCoupon() {
      console.log('chosenCoupon')
      console.log(this.chosenCoupon)

      let total = 0
      this.goods.map(item => {
        total += item.price * 100 * item.num
        console.log(total)
      })
      console.log('total')
      console.log(total)
      console.log(this.couponPrice)
      total = total - this.couponPrice
      return total / 100
    },
    isEmpty() {
      return this.goods.length > 0
    }
  },
  created() {
    this.allChecked = this.checkedGoods.length === this.goods.length && this.checkedGoods.length > 0
    this.goods = this.getCartGoods
  },
  methods: {
    ...mapMutations({ addGoods: 'setCartGoods' }),
    formatPrice(price) {
      return (price / 100).toFixed(2)
    },
    onClickLeft() {
      this.$router.back(-1)
    },
    onChange(index) {
      this.showList = false
      this.chosenCoupon = index
      this.couponPrice = this.coupons[index].value
      console.log(this.chosenCoupon)
    },
    onExchange(code) {
      this.coupons.push(coupon)
    },
    changeChosenCoupon(e) {
      console.log(';;')
      console.log(e)
    },
    onSubmit() {}

  }
}
</script>

<style lang="less">
.confirm {
  margin-bottom: 42px;
  .confirm-goods {
    padding: 10px 0;
    background-color: #fafafa;
    margin-top: 36px;
    .good-same-pad {
      padding: 10px 32px;
    }
    &-item {
      background: #fafafa;
      .van-cell__value--alone {
        display: flex;
      }
      .van-card {
        flex: 1;
      }
      &-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fafafa;
        margin-top: 60px;
        .img-box,.txt {
          justify-content: center;
          align-items: center;
          display: flex;
        }
        .txt {
          flex-direction: column;
          button {
            width: 40%;
            margin-top: 30px;
          }
        }
      }

    }
    &__item {
      position: relative;
      background-color: #fafafa;
      .van-checkbox__label {
        width: 100%;
        height: auto; // temp
        padding: 0 10px 0 15px;
        box-sizing: border-box;
      }
      .van-card__price {
        color: #f44;
      }
    }
    &-contact {
      .van-cell__value {
        display: flex;
        align-content: center;
      }
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .address {
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
      }
    }
  }
  .van-nav-bar .van-icon {
    color: #323233;
  }
  .van-submit-bar__bar {
    justify-content: space-between;
  }
  &-price {
    .price {
      color: #f44;
    }
  }
  .cart{
    .van-submit-bar {
      bottom: 50px;
      border-bottom: #eaeaea 1px solid;
    }
  }
}

</style>
