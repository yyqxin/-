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
				<template slot-scope="scope">
					<i class="el-icon-edit"  @click="handleEdit(scope.$index, scope.row)"></i>
					<i class="el-icon-delete"  size="small" @click="handleDel(scope.$index, scope.row)"></i>
				</template>
			</el-table-column>
        </el-table>

		<!--新增界面-->
		<el-dialog :title="text" v-model="addFormVisible" :close-on-click-modal="false" style="padding-bottom:0;">
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
	</section>
</template>
<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
    import messageBox from '../../components/messageBox.vue'
	export default {
		data() {
			return { 
				filters: {
					name: ''
				},
				text:'编辑',
				_index:0,
				users: [],
				total: 0,
				page: 1,
				isEditShow:false,
				listLoading: false,
				sels: [],//列表选中列
				addFormVisible:false,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				//编辑界面数据
				editForm: {
					number: '',
					name: '',
					directions: '',
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
			  
				},
				//表格数据
				tableData: [{
			       number: '00000001',
					name: '2018冬',
					directions: '12221',
		        }, {
		            number: '00000002',
					name: '2018夏',
					directions: '111去111',
		        },{
			       number: '00000003',
					name: '2018春',
					directions: '1顺德区1111',
		        }, {
		            number: '00000004',
					name: '2018秋',
					directions: '1111颠三倒四11',
		        }],
				addLoading: false,
				//新增界面数据
				addForm: {
					number: '',
					name: '',
					directions: '',
				},
			}
		},
		components: {
            messageBox
        },
		methods: {
			//删除
			handleDel(index, row) {
				this.$confirm('您确定删除该数据吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.tableData.splice(index,1)
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
			//显示编辑界面
			handleEdit(index, row) {
				console.log(JSON.stringify(row))
				this.addFormVisible = true;
				this.text = '编辑';
				this.addForm = row;
				this._index = index;
				this.isEditShow = true;

			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.text = '新增';
				this.isEditShow = false;
				this.addForm = {
					number: '',
					name: '',
					directions: '',
				};
			},
			//新增
			addSubmit () {
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
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped lang="scss">
	.el-col-24{
		background:none;
	}
	.el-form-item{
	    display: block;
	    clear:both;
	    width:100%;
	    margin-left:0;
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