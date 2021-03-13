<template>
  <div class="cart">
    <van-nav-bar title="购物车" :fixed="true">
      <!-- <van-icon slot="left" name="gift-o" /> -->
      <van-icon v-if="checkedGoods.length > 0" slot="right" @click="delCart">删除</van-icon>
    </van-nav-bar>
    <van-checkbox-group v-if="showType" ref="checkboxGroup" v-model="checkedGoods" class="card-goods" @change="changeGoods">
      <van-cell
        v-for="item in goods"
        :key="item.id"
        class="card-goods-item"
      >
        <van-checkbox
          class="card-goods__item"
          :name="item.id"
        />
        <van-card
          :price="item.price.toFixed(2) + ''"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.thumb"
        >
          <template #footer>
            <van-stepper v-model="item.num" integer min="1" input-width="40px" />
          </template>
        </van-card>
      </van-cell>
      <van-cell
        v-if="goods.length < 1"
        class="card-goods-item-empty"
      >
        <div class="img-box">
          <img :src="goodEmpty">
        </div>
        <div class="txt">
          <p>购物车空空如也，去选购一些商品吧～～</p>
          <van-button round url="/" color="linear-gradient(to right, #ff6034, #ee0a24)">去首页</van-button>
        </div>
      </van-cell>
    </van-checkbox-group>
    <van-submit-bar
      v-if="isEmpty"
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    >
      <van-checkbox v-model="allChecked" @click="handelToggleAll">全选</van-checkbox></van-submit-bar>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast, Tag, Button, NavBar, Icon, Stepper, Cell } from 'vant'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Cell.name]: Cell,
    [Tag.name]: Tag
  },

  data() {
    return {
      goodEmpty: require('/static/images/cartEmpty.png'),
      checkedGoods: ['1', '2', '3'],
      allChecked: false,
      showType: true,
      goods: [{
        id: '1',
        title: '进口香蕉',
        desc: '约250g，2根',
        price: 200.00,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
      }, {
        id: '2',
        title: '陕西蜜梨',
        desc: '约600g',
        price: 690.00,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
      }, {
        id: '3',
        title: '美国伽力果',
        desc: '约680g/3个',
        price: 2680.00,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
      }]
    }
  },
  computed: {
    ...mapGetters(['getCartGoods']),
    submitBarText() {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },

    totalPrice() {
      let total = 0
      this.goods.map(item => {
        if (this.checkedGoods.includes(item.id)) {
          console.log('total')
          total += item.price * 100 * item.num
          console.log(total)
        }
      })
      console.log('total')
      console.log(total)

      return total
    },
    isEmpty() {
      return this.goods.length > 0
    }
  },
  created() {
    this.allChecked = this.checkedGoods.length === this.goods.length && this.checkedGoods.length > 0
  },
  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2)
    },

    onSubmit() {
      Toast('点击结算')
    },
    delCart() {
      console.log('his.checkedGoods')
      console.log(this.checkedGoods)
      console.log(this.goods)
      const arr = [...this.goods].filter(x => [...this.checkedGoods].every(y => y !== x.id))
      const check = [...this.checkedGoods].filter(x => [...arr].some(y => y.id === x))
      console.log('arr', arr)

      console.log('arr', arr)
      this.showType = false
      this.$nextTick(() => {
        this.showType = true
        this.goods = arr
        this.checkedGoods = check
        this.allChecked = this.checkedGoods.length === this.goods.length && this.checkedGoods.length > 0
      })
    },
    handelToggleAll() {
      this.$refs.checkboxGroup.toggleAll(this.allChecked)
    },
    changeGoods() {
      console.log('this.checkedGoods')
      console.log(this.checkedGoods)
      console.log(this.goods)

      this.allChecked = this.checkedGoods.length === this.goods.length && this.checkedGoods.length > 0
    }
  }
}
</script>

<style lang="less">
.card-goods {
  padding: 10px 0;
  background-color: #fafafa;
  margin-top: 36px;
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

    .van-checkbox__icon {
    }

    .van-card__price {
      color: #f44;
    }
  }
}
.cart{
  .van-submit-bar {
    bottom: 50px;
    border-bottom: #eaeaea 1px solid;
  }
}
</style>
