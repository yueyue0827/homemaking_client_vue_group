<template>
  <div id='customer'>
    <!-- 按钮组 -->
    <el-row>
      <!-- 查询搜索框 -->
      <el-col :span='18'>
        <!-- <el-form :inline='true'>
          <el-form-item>
            <el-input v-model='param.realname' placeholder='按姓名搜索查询' clearable></el-input>
          </el-form-item>
          <el-form-item >
            <div style='text-align:right'>
              <el-button type='primary' @click='searchHandler' plain>查询</el-button>
            </div>
          </el-form-item>
        </el-form> -->
      </el-col>
      <!-- 添加按钮组 -->
      <el-col :span='6'>
         <el-button type='primary' plain @click='toAddHandler' class='btn_add'>添加</el-button>
         <el-button type='danger' plain class='btn_delAll' @click='batchDeleteHandler(ids)' :disabled='this.ids.length === 0'>批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 按钮组结束 -->
    <!-- 表格 -->
    <el-table :data='customers' @selection-change='selsChange'>
      <!-- 编号 -->
      <el-table-column prop='id' type='selection' align='center'></el-table-column>
      <!-- 姓名 -->
      <el-table-column prop='realname' label='姓名' align='center'></el-table-column>
      <!-- 密码 -->
      <el-table-column prop='password' label='密码' align='center' v-if='false'></el-table-column>
      <!-- 手机号码 -->
      <el-table-column prop='telephone' label='手机号' align='center'></el-table-column>
      <!-- 状态 -->
      <el-table-column prop='status' label='状态' align='center'></el-table-column>
      <!-- 照片 -->
      <el-table-column prop='photo' label='照片'>
        <template #default='record'>
          <img :src='record.row.photo' alt='图片' style='height:80px; width:80px;'>
        </template>
      </el-table-column>
      <!-- 详情栏 -->
      <el-table-column label='详情' align='center'>
        <template #default='record'>
          <!-- 详情按钮 -->
          <el-button type='warning' icon='el-icon-star-off' circle  @click.prevent='toDetails(record.row)' size='small' plain></el-button>
        </template>
      </el-table-column>
      <!-- 操作栏 -->
      <el-table-column label='操作' align='center'>
        <template #default='record'>
          <!-- 删除按钮 -->
          <el-button @click.prevent='deleteHandler(record.row.id)' type='danger' icon='el-icon-delete' circle size='small' plain></el-button>
          <!-- 修改按钮 -->
          <el-button @click.prevent='editHandler(record.row)' type='primary' icon='el-icon-edit' circle size='small' plain ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
    <!-- 分页 -->
    <!-- <el-pagination background layout='prev, pager, next' :page-size='param.pageSize' :total='customers.total' :current-page='param.page+1' @current-change='pageChangeHandler'></el-pagination> -->
    <!-- 分页结束 -->
    <!-- 模态框 -->
    <el-dialog :title='title' :visible.sync='dialogFormVisible' :before-close='closeModal' @close='dialogCloseHandler'>
      <!-- 表单 -->
      <el-form :model='customer' :rules='rules' ref='customerForm'>
        <!-- 姓名输入框 -->
        <el-form-item label='姓名' :label-width='formLabelWidth' prop='realname'>
          <el-input v-model='customer.realname'></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label='密码' :label-width='formLabelWidth'>
          <el-input v-model='customer.password' type='password'></el-input>
        </el-form-item>
        <!-- 电话输入框 -->
        <el-form-item label='电话' :label-width='formLabelWidth' prop='telephone'>
          <el-input v-model='customer.telephone'></el-input>
        </el-form-item>
        <!-- 照片输入框 -->
        <el-form-item label='照片' :label-width='formLabelWidth'>
          
        </el-form-item>
        <!-- 状态选择框 -->
         <el-form-item label='状态' :label-width='formLabelWidth'>
          <el-select v-model='customer.status' placeholder='请选择默认状态'>
            <el-option value='正常'>正常</el-option>
            <el-option value='禁用'>禁用</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    <!-- 底部按钮 -->
      <div slot='footer' class='dialog-footer'>
        <!-- 取消按钮 -->
        <el-button @click='closeModal'>取 消</el-button>
        <!-- 确定按钮 -->
        <el-button type='primary' @click='submitHandler'>确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模态框结束 -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
//默认暴露当前组件的配置
export default {
  // 数据
  data(){
    return {
      customer:{},
      ids:[],
      formLabelWidth:'80px',
      rules: {
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
      }
    } 
  },
  //钩子
  created(){
    this.findAllCustomers()
  },
  computed: {
    //属性的映射
    ...mapState('customer/Customer',['customers','dialogFormVisible','title']),
    ...mapGetters('customer/Customer',['customerSize']),
  },
  // 方法
  methods:{
    //方法的映射
    ...mapMutations('customer/Customer',['showModal','closeModal','setTitle']),
    ...mapActions('customer/Customer',['findAllCustomers','deleteCustomerById','saveOrUpdateCustomer','batchDeleteCustomer']),
    //普通方法
    //添加信息
    toAddHandler(){
      //重置表单
      this.customer = {}
      this.setTitle('添加顾客信息')
      //显示模态框
      this.showModal() 
    },

    //提交信息
    submitHandler(){
      this.$refs.customerForm.validate((valid)=>{
        if(valid){
          this.saveOrUpdateCustomer(this.customer)
          .then((response)=>{
            this.$message({message:'提交成功', type:'success'})
          })
        }else{
          return false
        }
      })    
    },
    // 修改信息
    editHandler(customer){
      this.customer = customer
      this.setTitle('修改顾客信息')
      this.showModal()
    },
    // 删除信息
    deleteHandler(id){
      this.deleteCustomerById(id)
      .then((response)=>{
        this.$message({message:'删除成功', type:'success'})
      })
    },
    // 批量删除
    batchDeleteHandler(){
      this.batchDeleteCustomer(this.ids)
      .then((response)=>{
        this.$message({message:'批量删除成功', type:'success'})
      })
    },
    // 选中时触发，将选中的数组组成一个数组
    selsChange(ids) {
      this.ids = ids.map(item=>item.id)
    },
    //数据校对时第一次错误在关闭模态框后清空
    dialogCloseHandler(){
      this.$refs.customerForm.resetFields()
    },
    //点击查看详情
    toDetails(customer){
      this.$router.push({path:'/customer/details',query:{id:customer.id}})
    },
  },
}
</script>
<style scoped>

</style>