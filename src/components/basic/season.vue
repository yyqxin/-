<template>
	<div>
		<el-row>
			<el-col :span="5">
				<el-input placeholder="请输入季节名称" v-model="p_season_name">
					<template slot="prepend">季节名称:</template>
				</el-input>
			</el-col>
			<el-col :span="6">
				<el-button type="primary" @click="showdata">查询</el-button>
				<el-button type="primary" @click="showAdd">增加</el-button>
				<el-button type="primary" @click="showDel" >删除</el-button>
				<el-button type="primary" @click="showExport" >导出</el-button>
			</el-col>
		</el-row>
			<el-table :data="data.slice((currentPage-1)*pagesize,currentPage*pagesize)" showOverflowTooltip style="width: 100%" stripe border tooltip-effect="dark" ref="multipleTable" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" > </el-table-column>
			<el-table-column prop="season_id" label="季节ID" fixed  width="70" ></el-table-column>
			<el-table-column prop="season_code" label="季节编码" fixed  sortable  > </el-table-column>
			<el-table-column prop="season_name" label="季节名称" fixed   ></el-table-column>
			<el-table-column prop="remarks" label="说明" fixed ></el-table-column>
			<el-table-column prop="create_time" label="创建时间" ></el-table-column>
			<el-table-column prop="update_time" label="修改时间"></el-table-column>
			<el-table-column label="操作" width="80">
				<template slot-scope="scope">
					<el-button size="small" type="primary" @click="showEdit(scope.$index,scope.row)">编辑</el-button>				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[15, 20, 50, 100]" :page-size="this.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="data.length">
		</el-pagination>
	</div>
</template>

<script>
	import { query, apiparas, execute } from '../../api/api';
	import { Cookie } from '../../js/common';
	export default {
		data() {
			return {
				currentPage: 1,
				pagesize: 15,
				data: [],
				p_season_name:'',
			}
		},
		components: {
			//注册组件
		},
		mounted: function() {
			//生命周期
		},
		computed: {
			//计算属性
		},
		methods: { //函数
			showdata: function() { //查询数据
				//显示数据
				var jsonparas = [];
				//增加查询条件
				apiparas.pushPara(jsonparas, 'season_name', this.p_season_name);
				this.$notify({title: '信息提示',message: '正在加载数据，请稍后！',type: 'info'});
				//查询汇总
				let _paras = apiparas.getParas('default','basic|get_season', jsonparas);
				query(_paras).then(response => {
					var json_data = response.result;
					this.data = json_data;
					this.$notify({title: '成功信息',message: '数据加载完毕！',type: 'success'});
				});
			},
			showAdd: function() {  //显示新增对话框

			},
			handleSelectionChange(val){
				this.multipleTable = val;
			},
			showEdit:function(index,row){
				
			},
			showDel:function(){
				var keys = '';
				for(var i = 0; i < this.multipleTable.length; i++) {
					keys += this.multipleTable[i]['season_id'] + ",";
				}
				if (keys =='')
				{
					this.$notify({title: '信息提示',message: '请选择要删除的明细！',type: 'info'});
					return;
				}
				keys = keys.substring(0,keys.length-1);
				
				var jsonparas=[];
				apiparas.pushPara(jsonparas,'keys',keys);
				let _paras = apiparas.getParas('default','basic|del_season',jsonparas);
				execute(_paras).then(response=>{
					var json_data = response.result;
					if(response.errid == 0){
						this.$notify({title:'删除',message:'成功删除ID为'+keys+'的数据',type:'success'});
						this.showdata();
					}
					else
					{
						this.$notify.error({title: '错误',message: '删除失败'});
					}
					
				});
				
				
			},
			save:function() //保存
			{
				
			},
			showExport:function() //导出
			{
				this.downloadLoading = true
				require.ensure([], () => {

					const {
						export_json_to_excel
					} = require('@../../vendor/Export2Excel')
					const tHeader = ['季节ID','季节编码','季节名称','说明','创建时间','修改时间'];
					const filterVal = ['season_id','season_code','season_name','remarks','create_time','update_time'];
					const list = this.data;
					const _data = this.formatJson(filterVal, list);
					export_json_to_excel(tHeader, _data, '季节管理');
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},
			tableRowClassName(row, rowIndex) {
				return '';
			},
			handleSizeChange: function(size) {
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
			},

		},
		created: function() {
			this.showdata();
		}
	}
</script>

<style>

</style>