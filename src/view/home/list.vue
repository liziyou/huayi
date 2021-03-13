<template>
  <div class="shop-list-components">
    <div v-for="item in list" :key="item.goodsId" class="item" @click="$router.push({path:'/goods/info',query:{id:item.goodsId}})">
      <div class="imgs">
        <img :src="item.goodsImage">
      </div>
      <div class="goods-detail">
        <div class="goods-name font-limit">{{ item.goodsName }}</div>
        <div class="cell">
          <!-- <div class="text" v-if="userInfo.userType > 1">会员价</div> -->
          <div class="price">￥{{ item.shopPrice }}</div>
          <del>{{ item.marketPrice }}</del>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          goodsId: 1,
          goodsImage: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          goodsName: '商品1'
        },
        {
          goodsId: 2,
          goodsImage: 'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg',
          goodsName: '商品2'
        }
      ]
    }
  }
}
</script>
