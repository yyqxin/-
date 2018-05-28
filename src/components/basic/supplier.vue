<template>
    <!-- 工具条 -->
	<section>
		<el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			<el-form-item label="供应商名称" prop="name">
			    <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="供应商名称"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="telephone">
			    <el-input type="text" v-model="ruleForm2.telephone" auto-complete="off" placeholder="电话"></el-input>
			</el-form-item>
			<el-form-item label="供应商编码" prop="number">
			    <el-input v-model.number="ruleForm2.number" placeholder="供应商编码"></el-input>
			</el-form-item>
			<el-form-item style="margin-top:0;">
			    <el-button type="primary" @click="getUsers()">查询</el-button>
			    <el-button type="primary" @click="submitForm('ruleForm2')">新增</el-button>
			</el-form-item>
	    </el-form>


		<!-- 列表 -->
		<el-table :data="tableList" border style="width: 100%">
		    <el-table-column prop="number" label="供应商编号"></el-table-column>
		    <el-table-column prop="name" label="供应商名称"  width="260px"></el-table-column>
		    <el-table-column prop="phone" label="电话"></el-table-column>
		    <el-table-column prop="Contacter" label="联系人"></el-table-column>
		    <el-table-column prop="adress" label="供应商地址"></el-table-column>
		    <el-table-column prop="landline" label="座机"></el-table-column>
		    <el-table-column label="操作" >
				<template slot-scope="scope">
					<i class="el-icon-edit"  @click="handleEdit(scope.$index, scope.row)"></i>
					<i class="el-icon-delete"  size="small" @click="handleDel(scope.$index, scope.row)"></i>
				</template>
			</el-table-column>
        </el-table>

        <!--新增界面-->
		<el-dialog :title="text" :visible.sync="addFormVisible" :close-on-click-modal="false" style="padding-bottom:0;">
			<el-form :model="addForm" label-width="82px" ref="addForm" style="height:240px;">
				<el-form-item label="供应商编号" prop="number" style="width:100%;margin:0 0 15px 0;">
					<el-input v-model="addForm.number" auto-complete="off" placeholder="请输入供应商编号"></el-input>
				</el-form-item>
				<el-form-item label="供应商名称" prop="name" style="width:100%;margin:0 0 15px 0;">
					<el-input v-model="addForm.name" auto-complete="off" placeholder="请输入供应商名称"></el-input>
				</el-form-item>
				<el-form-item label="供应商电话" prop="telephone" style="width:100%;margin:0 0 15px 0;"> 
					<el-input v-model="addForm.telephone" auto-complete="off" placeholder="请输入供应商电话"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="Contacter" style="width:100%;margin:0 0 15px 0;">
					<el-input v-model="addForm.Contacter" auto-complete="off" placeholder="请输入联系人"></el-input>
				</el-form-item>
				<el-form-item label="供应商地址" prop="address" style="width:100%;margin:0 0 15px 0;">
					<el-input v-model="addForm.address" auto-complete="off" placeholder="请输入供应商地址"></el-input>
				</el-form-item>
				<el-form-item label="座机" prop="landline" style="width:100%;margin:0 0 15px 0;">
					<el-input v-model="addForm.landline" auto-complete="off" placeholder="请输入供应商地址"></el-input>
				</el-form-item>			
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: left; margin-left:30px;margin-left:80px;">
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				<el-button @click="resetForm('addForm')">重置</el-button>
			</div>
		</el-dialog>

        <!-- 分页 -->
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	     
	      :page-sizes="[5, 10, 20, 30]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
		</el-pagination>
	</section>
</template>
<script>
import { query, apiparas, execute } from '../../api/api';
	import { Cookie } from '../../js/common';
     // import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	export default {
		data() {
			return {
				//搜索条件
				ruleForm2: {
					name: '',
					telephone:'',
					number:'',
				},
				text:'新增供应商',
				addFormVisible:false,
				listLoading: false,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				isShow: true,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					number: '',
					name: '',
					telephone: '',
					Contacter: '',
					address: '',
					landline: ''
				},
				total:1000,
				pageSize:10,
				pageNo:1,
				//列表展示数据
				tableList:[],
			    //后台获取的数据 因为写的是静态页面 所以写死 后面需通过axios从后台获取
				tableData: [{
					number:'58',
			        name: '江阴市哈尼毛纺有限公司',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '哈尼毛纺',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '江阴市哈尼毛纺有限公司',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '江阴市哈尼毛纺有限公司',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '哈尼毛纺',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '江阴市哈尼毛纺有限公司',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '江阴市哈尼毛纺有限公司',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '哈尼毛纺',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '江阴市哈尼毛纺有限公司',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '江阴市哈尼毛纺有限公司',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '哈尼毛纺',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        },{
					number:'58',
			        name: '江阴市哈尼毛纺有限公司',
			        phone: '0510-86978677',
			        Contacter: '',
			        adress:'',
			        landline:''
		        }, {
		            number:'57',
			        name: '穗成行',
			        phone: '18933993989',
			        Contacter: '13',
			        adress:'广州国际轻纺城二楼F2113-2116号',
			        landline:'020-89264377',
		        }]
			}
		},
		mounted(){
			// let date = new Date();
			// let y = date.getFullYear();
			// let m = date.getMonth()+1 > 9 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
			// let d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
			// this.form.date1 = y +'-'+m+'-'+d;
			// this.form.date1 = y +'-'+m+'-'+d;
			//页面加载后调用 getuser函数
			this.getUsers(1,5);
		},
		methods: {
			//显示新增页面
			submitForm(){
				this.addFormVisible = true;
				this.text = '新增供应商';
				this.isEditShow = false;
				this.addForm = {
					number: '',
					name: '',
					telephone: '',
					Contacter: '',
					address: '',
					landline: ''
				};
			},
			//显示编辑页面
			handleEdit(index, row){
				console.log(JSON.stringify(row))
				this.addFormVisible = true;
				this.text = '编辑';
				this.addForm = row;
				this._index = index;
				this.isEditShow = true;
			},
			//删除
			handleDel(index, row) {
				this.$confirm('您确定删除该数据吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.tableList.splice(index,1)
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
					//this.tableData.splice(index,1)
			},
			//提交
			addSubmit() {
				//表单验证
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						// this.$confirm('确认提交吗？', '提示', {}).then(() => {
							//this.addLoading = true;
							if (this.isEditShow) {

				                this.tableData.splice(this._index,1,this.addForm)
							}else{
								this.tableData.push(this.addForm);
							    
							}
							this.addFormVisible = false
					}
				});
			},
			//重置
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
		    //改变页面展示多少条数据时调用的函数参数val 是你选择的数据 比如选5时  val就为5
			handleSizeChange(val) {
		        console.log(val);//打印选择的数据   
		        this.pageSize = val;
		        this.getUsers(this.pageNo,this.pageSize)
		      },
		      // //改变分页页码时调用的函数参数val 是你选择的数据 比如选2时  则为第二页 val 就是2
		      // 
		      // 
		      handleCurrentChange(val) {
		        this.pageNo = val;
		        this.getUsers(this.pageNo,this.pageSize)
		      },
		    //根据页码 每页展示条数 加载列表数据pageNo为当前第几页 pageSize为当前页展示多少条数据
			getUsers(pageNo,pageSize) {

				this.tableList = this.tableData;
				//数据总条数
				this.total = this.tableData.length;
				//定义num 为 列表开始展示第几条数据 比如pageNo为1 pageSize为5 则从（）
				let num = (pageNo-1)*pageSize;
				let page = pageNo*pageSize;1
				console.log('num:'+num)
				//根据页码刷选列表数据
				this.tableList = this.tableData.slice(num,page)

			},

			//数据导出
			exportData(){
				//调用导出数据接口
			}
		}

	}

</script>
<style scoped>
	.el-form-item{
		display: inline-block;
		width: 25%;
		float: left;
		margin:20px 20px 20px 0;
    }
    .el-icon-delete:before {
	    content: "\E612";
	    font-size: 22px;
	    line-height: 40px;
	    margin-left: 10px;
	}
	.el-icon-edit:before {
	    content: "\E614";
	    font-size: 22px;
	    line-height: 40px;
	}
</style>