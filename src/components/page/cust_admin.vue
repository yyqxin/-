<template>
	<div>
		<el-row>

			<el-col :span="5">
				<el-input placeholder="请输入用友客户名称" v-model="p_u8_custName">
					<template slot="prepend">用友客户名称:</template>
				</el-input>

			</el-col>
			<el-col :span="5">
				<el-input placeholder="请输入富友客户名称" v-model="p_ff_custName">
					<template slot="prepend">富友客户名称:</template>
				</el-input>

			</el-col>
			<el-col :span="6">
				<el-button type="primary" @click="showData">查询</el-button>
				<el-button type="primary" @click="show_add_cust_admin">增加客户</el-button>
				<el-button type="primary" @click="sync_cust" v-if="false">同步客户</el-button>
			</el-col>
		</el-row>
		<el-table :data="data.slice((currentPage-1)*pagesize,currentPage*pagesize)" showOverflowTooltip style="width: 100%" stripe border tooltip-effect="dark">
			<!--<el-table-column type="selection" width="55" :selectable="checkboxInit"> </el-table-column>-->
			<el-table-column prop="u8_cust_id" label="用友ID" fixed  width="70" ></el-table-column>
			<el-table-column prop="u8_cust_name" label="用友名称" fixed  width="200" > </el-table-column>
			<el-table-column prop="ff_cust_id" label="富友ID" fixed  width="70"  ></el-table-column>
			<el-table-column prop="ff_cust_name" label="富友名称" fixed width="130"sortable></el-table-column>
			<el-table-column prop="no_close_amt" label="上期未结金额"width="110"></el-table-column>
			<el-table-column prop="open_date" label="开店日期"></el-table-column>
			<el-table-column prop="dividend_amt" label="累计分红"></el-table-column>
			<el-table-column prop="invest_ratio" label="投资比例"></el-table-column>
			<el-table-column prop="front_ratio" label="保底前比例"></el-table-column>
			<el-table-column prop="after_ratio" label="保底后比例"></el-table-column>
			<!--<el-table-column prop="begin_date" label="开始日期"></el-table-column>
			<el-table-column prop="end_date" label="结束日期"></el-table-column>-->
			<!--<el-table-column prop="cycle_total" label="周期累计分红"width="110"></el-table-column>-->
			<el-table-column label="操作" width="80">
				<template slot-scope="scope">
					<el-button size="small" type="primary" @click="show_edit_cust_admin(scope.$index,scope.row)">编辑</el-button>

				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.currentPage" :page-sizes="[15, 20, 50, 100]" :page-size="this.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="data.length">
		</el-pagination>
		<el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				
				<el-row>
					<el-col :span="10">
						<el-form-item label="用友客户ID：" :label-width="formLabelWidth">
							<el-input v-model="form.u8_cust_id" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="用友客户名称：" :label-width="formLabelWidth">
							<el-input v-model="form.u8_cust_name" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="富友客户ID：" :label-width="formLabelWidth">
							<el-input v-model="form.ff_cust_id" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="富友客户名称：" :label-width="formLabelWidth">
							<el-input v-model="form.ff_cust_name" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="上期未结金额：" :label-width="formLabelWidth">
							<el-input v-model="form.no_close_amt" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="开店日期：" :label-width="formLabelWidth">
							<el-date-picker v-model="form.open_date" type="date" placeholder="开店日期" value-format="yyyy-MM-dd"> </el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>

					<el-col :span="10">
						<el-form-item label="投资比例：" :label-width="formLabelWidth">
							<el-input v-model="form.invest_ratio" auto-complete="off"></el-input>
						</el-form-item>

					</el-col>
					<el-col :span="10">
						<el-form-item label="保底金额：" :label-width="formLabelWidth">
							<el-input v-model="form.guaranteed_amt" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="保底前比例：" :label-width="formLabelWidth">
							<el-input v-model="form.front_ratio" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="保底后比例：" :label-width="formLabelWidth">
							<el-input v-model="form.after_ratio" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!--<el-row>
					<el-col :span="10">
						<el-form-item label="开始日期：" :label-width="formLabelWidth">
							<el-date-picker v-model="form.begin_date" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"> </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="结束日期：" :label-width="formLabelWidth">
							<el-date-picker v-model="form.end_date" type="date" placeholder="结束日期" value-format="yyyy-MM-dd"> </el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="save_cust_admin">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { getreport, query, apiparas, entity_update, entity_add } from '../../api/api';
	import { Cookie } from '../../js/common';
	export default {
		data() {
			return {
				currentPage: 1,
				pagesize: 20,
				p_ff_custName: '',
				p_u8_custName: '',
				cust_key: '',
				data: [],
				form: {
					u8_cust_id: '',
					u8_cust_name: '',
					ff_cust_id: '',
					ff_cust_name: '',
					no_close_amt: '',
					open_date: '',
					dividend_amt: '',
					front_ratio: '',
					after_ratio: '',
					guaranteed_amt: '',
					begin_date: '',
					end_date: ''
				},
				formLabelWidth: '120px',
				//multipleTable:[],
				multipleSelection: [],
				dialogFormVisible: false,
				dialogFormTitle: '',
				isAdd: true
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
			showData: function() {
				//显示数据
				var jsonparas = [];
				//增加查询条件
				apiparas.pushPara(jsonparas, 'u8_cust_name', this.p_u8_custName);
				apiparas.pushPara(jsonparas, 'ff_cust_name', this.p_ff_custName);
this.$notify({title: '信息提示',message: '正在加载数据，请稍后！',type: 'info'});
				//查询汇总
				let bill_paras = apiparas.getParas('cust|get_cust', jsonparas);
				query(bill_paras).then(response => {
					var json_data = response.result;
					this.data = json_data;
					this.$notify({title: '成功信息',message: '数据加载完毕！',type: 'success'});
				});
			},
			refreshPage: function() {
				//刷新页面
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
			show_edit_cust_admin: function(index, row) {
				this.isAdd = false;
				this.dialogFormVisible = true;
				this.dialogFormTitle = '编辑客户信息';
				this.cust_key = row.cust_key;
				this.form.u8_cust_id = row.u8_cust_id;
				this.form.ff_cust_id = row.ff_cust_id;
				this.form.u8_cust_name = row.u8_cust_name;
				this.form.ff_cust_name = row.ff_cust_name;
				this.form.no_close_amt = row.no_close_amt;
				this.form.open_date = row.open_date;
				this.form.dividend_amt = row.dividend_amt;
				this.form.front_ratio = row.front_ratio;
				this.form.after_ratio = row.after_ratio;
				this.form.begin_date = row.begin_date;
				this.form.end_date = row.end_date;
				this.form.invest_ratio = row.invest_ratio;
				this.form.guaranteed_amt = row.guaranteed_amt;
			},
			show_add_cust_admin: function() {
				this.isAdd = true;
				this.dialogFormVisible = true;
				this.dialogFormTitle = '新增加客户信息';
				this.clear_cust_admin();

			},
			clear_cust_admin: function() {
				this.form.u8_cust_id = '';
				this.form.ff_cust_id = '';
				this.form.u8_cust_name = '';
				this.form.ff_cust_name = '';
				this.form.no_close_amt = '';
				this.form.open_date = '';
				this.form.dividend_amt = '';
				this.form.front_ratio = '';
				this.form.after_ratio = '';
				this.form.begin_date = '';
				this.form.end_date = '';
				this.form.guaranteed_amt = '';
				this.form.invest_ratio = '';
			},
			save_cust_admin: function() {

				var _begin_date = this.form.begin_date;
				var _open_date = this.form.open_date;
				var _end_date = this.form.end_date;
				if(_begin_date == '') {
					_begin_date = _open_date;
				}
				if(_end_date == '') {
					_end_date = _open_date;
				}

				var obj = {
					TypeName: "ms_cust",
					JsonObj: {
						cust_key: this.cust_key,
						u8_cust_id: this.form.u8_cust_id,
						ff_cust_id: this.form.ff_cust_id,
						u8_cust_name: this.form.u8_cust_name,
						ff_cust_name: this.form.ff_cust_name,
						no_close_amt: this.form.no_close_amt,
						open_date: _open_date,
						dividend_amt: this.isAdd ? 0 : this.form.dividend,
						details: [{
							invest_ratio: this.form.invest_ratio,
							front_ratio: this.form.front_ratio,
							after_ratio: this.form.after_ratio,
							begin_date: _begin_date,
							end_date: _end_date,
							guaranteed_amt: this.form.guaranteed_amt,
							cycle_total: 0
						}]
					}
				};
				if(this.isAdd) {
					entity_add(obj).then(response => {
						if(response.errid == 0) {
						 
						 this.$notify({title: '成功信息',message: '增加客户信息成功！',type: 'success'});
							this.clear_cust_admin();
							this.dialogFormVisible = false;
							this.showData();
						} else {
							this.$notify.error({title: '错误',message: '增加客户信息失败！'});
						}
					});
				} else {

					entity_update(obj).then(response => {
						if(response.errid == 0) {
							 this.$notify({title: '成功信息',message: '修改客户信息成功！',type: 'success'});
							this.clear_cust_admin();
							this.dialogFormVisible = false;
							this.showData();
						} else {
							
							this.$notify.error({title: '错误',message: '修改客户信息失败！'});
						}
					});
				}
			},
			//同步客户
			sync_cust: function() {

			}
		},
		created: function() {
			this.showData();
		}
	}
</script>

<style>

</style>