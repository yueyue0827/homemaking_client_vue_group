<template>
  <div class='details'>
    <el-button type='text' @click='backHandler'><i class='el-icon-arrow-left'></i>&nbsp;返回</el-button>
      <el-tabs v-model='activeName'>
        <!-- 顾客详情 -->
        <el-tab-pane label='顾客详情' name='info'>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-tab-pane>
        <!-- 订单信息 -->
        <el-tab-pane label='订单信息' name='order'>
          <el-table :data="orders">
            <el-table-column label="订单编号" prop="orderId"></el-table-column>
            <el-table-column label="顾客姓名" prop="customerName"></el-table-column>
            <el-table-column label="服务员工姓名" prop="waiterName"></el-table-column>
            <el-table-column label="服务地址" prop="address"></el-table-column>
            <el-table-column label="总金额" prop="total"></el-table-column>
            <el-table-column label="订单时间" :formatter="dateFormat" prop="orderTime"></el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 服务地址 -->
        <el-tab-pane label='服务地址' name='address'>
          <el-table :data="addresses">
            <el-table-column label="省" prop="province"></el-table-column>
            <el-table-column label="市" prop="city"></el-table-column>
            <el-table-column label="区" prop="area"></el-table-column>
            <el-table-column label="街道" prop="address"></el-table-column>
            <el-table-column label="手机号" prop="telephone"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script> 
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
//默认暴露当前组件的配置
  export default {
    data() {
      return {
        activeName:'info'
      }
    },
    created(){
      let id = this.$route.query.id
      // 通过id，查询顾客，订单，地址
      this.findAddressByCustomerId(id)
      this.findOrderByCustomerId(id)
    },
    computed:{
      ...mapState('customer/Address',['addresses']),
      ...mapState('customer/Customer_order',['orders']),
    },
    methods:{
      // ...mapMutations('customer/Address',['']),
      ...mapActions('customer/Address',['findAddressByCustomerId']),
      ...mapActions('customer/Customer_order',['findOrderByCustomerId']),

      //返回上一步
      backHandler(){
         this.$router.go(-1)
      },
      // 转换时间戳
      dateFormat(row, column){
        var moment = require('moment');
        var date = row[column.property];
        return moment(date).format("YYYY-MM-DD")
      },
    }
  }
</script>
<style scoped>
  .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      width: 480px;
    }
    .box-card[data-v-c5177e16]{
      width: 50%;
    }
</style>
