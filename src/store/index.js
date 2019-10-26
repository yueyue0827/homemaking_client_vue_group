import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import customer from './modules/customer/Customer'
import address from './modules/customer/Address'
import customer_order from './modules/customer/Customer_order'
import details from './modules/customer/Details'
import category from './modules/category/Category'
import category_order from './modules/category/Category_order'
import product from './modules/category/Product'
import order from './modules/order/Order'
import comment from './modules/order/Comment'
import waiter from './modules/waiter/Waiter'
import waiter_check from './modules/check/WaiterCheck'
import withdraw_check from './modules/check/WithdrawCheck'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  customer,
  address,
  customer_order,
  details,
  category,
  category_order,
  product,
  order,
  comment,
  waiter,
  waiter_check,
  withdraw_check
})

export default store
