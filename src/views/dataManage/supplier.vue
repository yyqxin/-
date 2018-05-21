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
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
     
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
		</el-pagination>
	</section>
</template>
<script>
     import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	export default {
		data() {
			return {
				ruleForm2: {
					name: '',
					telephone:'',
					number:'',
				},
				total:0,
				pageSize:5,
				pageNo:1,
				tableList:[],
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
			this.getUsers(1,5);
		},
		methods: {
			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		        this.pageSize = val;
		        this.getUsers(this.pageNo,this.pageSize)
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页=每页 ${val} 条`);
		        this.pageNo = val;
		        this.getUsers(this.pageNo,this.pageSize)
		      },
			getUsers(pageNo,pageSize) {
				this.tableList = this.tableData;
				this.total = this.tableData.length;
				let num = (pageNo-1)*pageSize;
				let page = pageNo*pageSize;
				console.log('num:'+num)
				this.tableList = this.tableData.slice(num,page)

			},

			//数据导出
			exportData(){
				//调用导出数据接口
			}
		}

	}

</script>
<style scoped lang="scss">
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