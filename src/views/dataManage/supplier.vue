<template>
    <!-- 工具条 -->
	<section>
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
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
		<el-table :data="tableData" border style="width: 100%">
		    <el-table-column prop="number" label="供应商编号" width="180"></el-table-column>
		    <el-table-column prop="name" label="供应商名称" width="360"></el-table-column>
		    <el-table-column prop="phone" label="电话" width="260"></el-table-column>
		    <el-table-column prop="Contacter" label="联系人" width="180"></el-table-column>
		    <el-table-column prop="adress" label="供应商地址" width="360"></el-table-column>
		    <el-table-column prop="landline" label="座机" width="260"></el-table-column>
		    <el-table-column label="操作" >
				<template slot-scope="scope">
					<i class="el-icon-edit"  @click="handleEdit(scope.$index, scope.row)"></i>
					<i class="el-icon-delete"  size="small" @click="handleDel(scope.$index, scope.row)"></i>
				</template>
			</el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
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
		        }]
			}
		},
		mounted(){
			let date = new Date();
			let y = date.getFullYear();
			let m = date.getMonth()+1 > 9 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
			let d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
			this.form.date1 = y +'-'+m+'-'+d;
			this.form.date1 = y +'-'+m+'-'+d;

			this.getUsers();
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
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