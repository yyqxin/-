<template>
	<div>
		<!-- 查询条件组件 -->
		<searchItem ref="searchDate"></searchItem>
		<div style="width:100%;float:left;margin: 0px 78px 20px 0;">
				<el-button type="primary"  @click="searchEvent()">查询</el-button>
				<!-- 导出是直接调用后台接口的 -->
				<el-button type="primary" @click="exportData()">导出</el-button>
	    </div>
		<!-- 列表 -->
		<el-table
	    :data="tableData"
	    border
	    style="width: 100%">
	    	<el-table-column
		      prop="date"
		      label="日期"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="department"
		      label="部门"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="reason"
		      label="季节"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="todaySku"
		      label="今日设计提交SKU"
		      width="180"> </el-table-column>
		    <el-table-column
		      prop="todaySampleN"
		      label="今日回样数"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="todayComfirm"
		      label="今日已确认"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="weekSkuN"
		      label="周开发SKU数"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="remainNum"
		      label="剩余未回数"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="totalComfirmSkuN"
		      label="累计已确认SKU数量">
		    </el-table-column>
		    <el-table-column
		      prop="totalRemainNum"
		      label="累计剩余未回数">
		    </el-table-column>
		    <el-table-column
		      prop="totalSkuNum"
		      label="累计开发SKU数">
		    </el-table-column>
   		</el-table>
	</div>
</template>
<script>
	import searchItem from '../common/search.vue';
	export default {
		data() {
			return {
				tableData: [{
					date:'2018-05-15',
			        department: 'COBB女童组',
			        reason: '2018冬',
			        todaySku: '13',
			        todaySampleN:'1',
			        todayComfirm:'0',
			        weekSkuN:'13',
			        remainNum:'13',
			        totalComfirmSkuN:'33',
			        totalRemainNum:'38',
			        totalSkuNum:'71'
		        }, {
		            date:'2018-05-15',
			        department: 'COBB女童组',
			        reason: '2018冬',
			        todaySku: '13',
			        todaySampleN:'1',
			        todayComfirm:'0',
			        weekSkuN:'13',
			        remainNum:'13',
			        totalComfirmSkuN:'33',
			        totalRemainNum:'38',
			        totalSkuNum:'71'
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
