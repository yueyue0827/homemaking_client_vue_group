import request from '@/utils/request'
import { post, post_array } from '@/utils/request'
export default {
  //  命名空间
  namespaced: true,
  //  状态
  state: {
    orders: []
  },
  //  突变
  mutations: {
    refreshOrder(state, orders) {
      state.orders = orders
    }
  },
  //  动作
  actions: {
    async findOrderByCustomerId(context, id) {
      let response = await request.get('/order/queryBasic?customerId=' + id)
      context.commit('refreshOrder', response.data)
    }
  }
}