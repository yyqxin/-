<template>
	<div>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

	</div>
</template>

<script>
	import { query, apiparas,execute } from '../../api/api';
	import { Cookie } from '../../js/common';
	export default{
		data(){
			return {
			}
		},
		components:{
			//注册组件
		},
		mounted:function(){
			//生命周期
		},
		computed:{
			//计算属性
		},
		methods:{ //函数
			showcharts:function(){
				//显示图表
			},
			refreshPage: function() {
				//刷新页面
			}
			
		},
		created:function(){
		}
	}

</script>

<style>

</style>