<template>
	<div>
	<!-- 查询条件组件 -->
		<searchItem ref="searchDate" ></searchItem>
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
		      prop="reason"
		      label="季节"
		      width="">
		    </el-table-column>
		    <el-table-column
		      prop="department"
		      label="部门"
		      width="">
		    </el-table-column>
		    <el-table-column
		      prop="developNum"
		      label="实际开发量"
		      width="">
		    </el-table-column>
		    <el-table-column
		      prop="buySample"
		      label="采购回样"
		      width="">
		    </el-table-column>
		    <el-table-column
		      prop="buyPercentage"
		      label="采购完成比例"
		      width="">
		    </el-table-column>
		    <el-table-column
		      prop="designNum"
		      label="设计实际开发量"
		      width="">
		    </el-table-column>
		    <el-table-column
		      prop="buyActualSample"
		      label="采购实际回样"
		      width="">
		    </el-table-column>
		    <el-table-column
		      prop="buyPercentage"
		      label="采购完成比例">
		    </el-table-column>
   		</el-table>

	</div>
</template>
<script>
    import searchItem from '../common/search.vue'
	export default {
		data() {
			return {
				tableData: [{
			        reason: '2018冬',
			        department: 'COBB女童组',
			        developNum: '4',
			        buySample:'',
			        buyPercentage:'0.00%',
			        designNum:'490',
			        buyActualSample:'466',
			        buyPercentage:'94.72%'
		        }, {
		            reason: '2019春',
			        department: 'COBB女童组',
			        developNum: '13',
			        buySample:'',
			        buyPercentage:'0.00%',
			        designNum:'71',
			        buyActualSample:'33',
			        buyPercentage:'46.48%'
		        }]
			}
		},
		components:{
			searchItem
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
				console.log("this.start_date:"+JSON.stringify(this.$refs.searchDate.form))
			}
		}
	}

</script>
