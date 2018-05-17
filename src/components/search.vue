<template>
	<el-form ref="form" label-width="80px" @submit.prevent="onSubmit" >
			<el-form-item label="起始时间">
				<el-col :span="11">
					<el-date-picker format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.startDate"></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="终止时间">
				<el-col :span="11">
					<el-date-picker format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.endDate" ></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="部门组别">
				<el-select v-model="form.department" placeholder="请选择部门">
					<el-option v-for="(item,index) in departmentList" :key="index" :label="item.value" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="季节">
				<el-select v-model="form.region" placeholder="请选择">
					<el-option v-for="(item,index) in regionList" :key="index" :value="item.value"></el-option>
				</el-select>
			</el-form-item>			
		</el-form>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				form:{
					startDate:'',
					endDate:'',
					department:'',
					region:'',
				},
				departmentList:[
					{'value':'设计部'},{'value':'采购部'}
				],
				regionList:[
					{'value':'春季'},{'value':'秋季'},{'value':'夏季'},{'value':'冬季'
				}],
			}
		},
		mounted(){
			let date = new Date();
			let y = date.getFullYear();
			let m = date.getMonth()+1 > 9 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
			let d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
			this.form.startDate = y +'-'+m+'-'+d;
			this.form.endDate = y +'-'+m+'-'+d;
			//组件渲染后从后台请求列表数据
			// this.getTableData();
		},

	}
</script>
<style type="text/css">
	.el-form-item{
		display:inline-block;
		float: left;
		margin-left:10px;
	}
</style>
<style scoped lang="scss">
	.el-form-item{
	    display: inline-block;
	    float: left;
	    width: 23%;
	    margin-left: 10px;
	}
	.el-col-11{
		width:100%;
	}
	.el-input{
		width:100%;
	}
	.el-select{
		width:100%;
	}
</style>