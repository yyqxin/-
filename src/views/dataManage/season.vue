<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="tableData" border style="width: 100%">
		    <el-table-column prop="number" label="季节编号" width="180"></el-table-column>
		    <el-table-column prop="name" label="季节名称" width="180"></el-table-column>
		    <el-table-column prop="directions" label="说明" width="180"></el-table-column>
		    <el-table-column label="操作">
				<template scope="scope">
					<i class="el-icon-edit"  @click="handleEdit(scope.$index, scope.row)"></i>
					<i class="el-icon-delete"  size="small" @click="handleDel(scope.$index, scope.row)"></i>
				</template>
			</el-table-column>
        </el-table>

		<!--新增界面-->
		<el-dialog title="新增季节" v-model="addFormVisible" :close-on-click-modal="false" style="padding-bottom:0;">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm"
			style="height:240px;">
				<el-form-item label="季节编号" prop="number">
					<el-input v-model="addForm.number" auto-complete="off" placeholder="请输入季节编号"></el-input>
				</el-form-item>
				<el-form-item label="季节名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off" placeholder="请输入季节名称"></el-input>
				</el-form-item>
				<el-form-item label="说明" prop="directions">
					<el-input type="textarea" placeholder="请输入说明"  auto-complete="off" :rows="4" v-model="addForm.directions"></el-input>
				</el-form-item>				
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: left; margin-left:30px;margin-left:80px;">
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				<el-button @click="resetForm('addForm')">重置</el-button>
			</div>
		</el-dialog>


		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" style="height:240px;">
				<el-form-item label="季节编号" prop="number">
					<el-input v-model="editForm.number" auto-complete="off" placeholder="请输入季节编号"></el-input>
				</el-form-item>
				<el-form-item label="季节名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" placeholder="请输入季节名称"></el-input>
				</el-form-item>
				<el-form-item label="说明" prop="directions">
					<el-input type="textarea" placeholder="请输入说明"  auto-complete="off" :rows="4" v-model="editForm.directions"></el-input>
				</el-form-item>		
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: left; margin-left:30px;margin-left:80px;">
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				<el-button @click="resetForm('editForm')">重置</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return { 
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
					number: '',
					name: '',
					directions: '',
				},

				editFormRules: {
					number: [
				        { required: true, message: '请输入季节编号', trigger: 'blur' },
				        //{ validator: validaePass }
			        ],
			        name: [
				        { required: true, message: '请输入季节名称', trigger: 'blur' },
				        //{ validator: validaePass }
			        ],
			        directions: [
				        { required: true, message: '请输入说明', trigger: 'blur' },
				        //{ validator: validaePass }
			        ]

				},
				addFormRules: {
					number: [
				        { required: true, message: '请输入季节编号', trigger: 'blur' },
				        //{ validator: validaePass }
			        ],
			        name: [
				        { required: true, message: '请输入季节名称', trigger: 'blur' },
				        //{ validator: validaePass }
			        ],
			        directions:[
				        { required: true, message: '请输入说明', trigger: 'blur' },
				        //{ validator: validaePass }
			        ]
				},
				//表格数据
				tableData: [{
			       number: '00000001',
					name: '2018冬',
					directions: '',
		        }, {
		            number: '00000001',
					name: '2018冬',
					directions: '',
		        }],
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					number: '',
					name: '',
					directions: '',
				},
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
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
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm =  {
					number: '',
					name: '',
					directions: '',
				};
			},
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					number: '',
					name: '',
					directions: '',
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//重置
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped lang="scss">
	.el-dialog__body{
		padding-bottom:0 !important;
	}
</style>