import request from '@/utils/request'
export default {
  //  命名空间
  namespaced: true,
  //  状态
  state: {
    addresses: []
  },
  //  突变
  mutations: {
    refreshAddress(state, addresses) {
      state.addresses = addresses
    }
  },
  //  动作
  actions: {
    async findAddressByCustomerId(context, id) {
      let response = await request.get('/address/findByCustomerId?id=' + id)
      context.commit('refreshAddress', response.data)
    }
  }
}