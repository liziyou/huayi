import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    currentBar: JSON.parse(localStorage.getItem('currentBar')) || {},
    cartGoods: JSON.parse(localStorage.getItem('cartGoods')) || [],
    currentAddressInfo: {}
  },
  getters: {
    doneTodos: (state, getters) => {
      return state.todos.filter(todo => todo.done)
    },
    getCurrentBar: (state) => {
      console.log(state)

      return state.currentBar
    },
    getCurrentAddressInfo: (state) => {
      // const newValue = JSON.parse(state.currentAddressInfo)
      return state.currentAddressInfo
    },
    getCartGoods: (state) => {
      // const newValue = JSON.parse(state.cartGoods)
      return state.cartGoods
    }
  },
  mutations: {
    increment(state, payload) {
      state.count++
    },
    setCurrentBar(state, value) {
      const newvalue = JSON.stringify(value)
      console.log('value')
      console.log(value)
      localStorage.setItem('currentBar', newvalue)
      state.currentBar = value
    },
    setCurrentAddressInfo(state, value) {
      state.currentAddressInfo = value
    },
    setCartGoods(state, value) {
      const newvalue = JSON.stringify(value)
      localStorage.setItem('cartGoods', newvalue)
      state.cartGoods = value
    }
  },
  actions: {
    addCount(context) {
    // 可以包含异步操作
    // context 是一个与 store 实例具有相同方法和属性的 context 对象
    }
  }
})
export default store
