import request from '@/utils/request'
import { post, post_array } from '@/utils/request'
export default {
  //  命名空间
  namespaced: true,
  //  状态
  state: {
    customers: [],
    dialogFormVisible: false,
    title: '添加顾客信息'
  },
  //  获取器
  getters: {
  },
  //  突变
  mutations: {
    //  打开模态框
    showModal(state) {
      state.dialogFormVisible = true
    },
    // 关闭模态框
    closeModal(state) {
      state.dialogFormVisible = false
    },
    refreshCustomers(state, customers) {
      state.customers = customers
    },
    setTitle(state, title) {
      state.title = title
    }

  },
  // 动作
  actions: {
    // 查找所有顾客信息
    async findAllCustomers(context) {
      // 查询
      let response = await request.get('/customer/findAll')
      // 将查询结果更新到state中
      context.commit('refreshCustomers', response.data)
    },
    // 保存或修改顾客信息
    async saveOrUpdateCustomer({ commit, dispatch }, payload)
    {
      let response = await post('/customer/saveOrUpdate', payload)
      // 将查询结果更新到state中
      dispatch('findAllCustomers')
      // 关闭模态框
      commit('closeModal')
      // 提示 -> 返回结果
      return response
    },
    // 通过id删除顾客信息
    async deleteCustomerById({ dispatch }, id) {
      let response = await request.get('/customer/deleteById?id=' + id)
      // 将查询结果更新到state中
      dispatch('findAllCustomers')
      // 提示 -> 返回结果
      return response
    },
    // 批量删除顾客信息
    async batchDeleteCustomer({ dispatch }, ids) {
      // 批量删除
      let response = await post_array('/customer/batchDelete', { ids })
      // 将查询结果更新到state中
      dispatch('findAllCustomers')
      // 提示 -> 返回结果
      return response
    }
  }
}