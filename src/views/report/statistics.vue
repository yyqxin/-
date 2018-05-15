<template>
    <!-- 工具条 -->
	<div>
		<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="min-width:600px;height:36px;">
			<!-- <el-form-item label="活动名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item> -->
			<el-form-item label="起始时间" class="">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="终止时间">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
			</el-form-item>

			<el-form-item label="部门组别">
				<el-select v-model="form.region" placeholder="请选择">
					<el-option label="设计部" value="shanghai"></el-option>
					<el-option label="采购部" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="季节">
				<el-select v-model="form.region" placeholder="请选择">
					<el-option label="2018冬" value="shanghai"></el-option>
					<el-option label="2018夏" value="beijing"></el-option>
					<el-option label="2018春" value="beijing"></el-option>
					<el-option label="2018秋" value="beijing"></el-option>
				</el-select>
			</el-form-item>			
		</el-form>
		<div style="width:100%;float:left;margin: 0px 78px 20px 0;
">
				<el-button type="primary" @click="searchEvent()">查询</el-button>
				<!-- 导出是直接调用后台接口的 -->
				<el-button type="primary" @click="exportData()">导出</el-button>
	    </div>
		<!-- 列表 -->
		<el-table
	    :data="tableData"
	    border
	    style="width: 100%">
		    <el-table-column
		      prop="department"
		      label="部门"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="reason"
		      label="季节"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="totalNum"
		      label="调样总数量"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="confirmNum"
		      label="已确认面料数量"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="unconfirmNum"
		      label="未确认面料数量">
		    </el-table-column>
		    
   		</el-table>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				tableData: [{
			        department: 'COBB女童组',
			        reason: '2018冬',
			        totalNum: '4',
			        confirmNum:'0',
			        unconfirmNum:'4'
		        }, {
		             department: 'COBB女童组',
			        reason: '2018冬',
			        totalNum: '4',
			        confirmNum:'0',
			        unconfirmNum:'4'
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
			//组件渲染后从后台请求列表数据
			this.getTableData();
		},
		methods: {
			getTableData(){
				//调用后台接口请求数据
			},
			//数据导出
			exportData(){
				//调用导出数据接口
			},
			//数据查询（根据选择的条件进行数据查询 --- 调接口）
			searchEvent(){

			}
		}
	}

</script>
<style scoped lang="scss">
	.el-form-item{
		display: inline-block;
		width: 440px;
		float: left;
		margin:20px 20px 20px 0;
    }
</style>