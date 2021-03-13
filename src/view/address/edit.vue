<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :address-info="addressInfo"
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast, NavBar, Icon } from 'vant'
import AreaList from '../../../static/js/area'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    Icon
  },
  data() {
    return {
      areaList: AreaList,
      searchResult: [],
      addressInfo: {}
    }
  },
  computed: {
    ...mapGetters(['getCurrentAddressInfo'])
  },
  created() {
    console.log('getAddress')
    console.log(this.getCurrentAddressInfo)
    this.addressInfo = this.getCurrentAddressInfo
  },
  methods: {
    onSave() {
      Toast('save')
    },
    onDelete() {
      Toast('delete')
    },
    onChangeDetail(val) {
      console.log('val')
      console.log(val)
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style lang="less" scope>

.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    top:40px;
    background-color:#fff;
    height: 300px;
    img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 240px;
      padding: 30px 60px;
      background-color: #fff;
      pointer-events: none;
    }
  }
  .van-swipe__indicator {
    background: gray;
  }
}
</style>
