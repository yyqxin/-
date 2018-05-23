<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <!-- <span class="demonstration">起始日期</span> -->
                            <label class='label'>起始日期</label>
                            <el-date-picker v-model="value1" type="date" placeholder="选择起始日期" style='width:100%'></el-date-picker>
                            <!-- <el-date-picker v-model="value1" type="date" placeholder="选择起始日期" style='max-width:193px;width:100%'></el-date-picker> -->
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <!-- <span class="demonstration">终止日期</span> -->
                            <label class='label'>终止日期</label>
                            <el-date-picker v-model="value2" type="date" placeholder="选择终止日期" style='width:100%'></el-date-picker>
                            <!-- <el-date-picker v-model="value2" type="date" placeholder="选择终止日期" style='max-width:193px;width:100%'></el-date-picker> -->
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">需求人</label>
                            <el-input v-model="filters.name" placeholder="输入需求人" style='width:100%'></el-input>
                            <!-- <el-input v-model="filters.name" placeholder="输入需求人" style='max-width:193px;width:100%'></el-input> -->
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <!-- <span class="demonstration">部门</span> -->
                            <label for="" class="label">部门</label>
                            <el-select v-model="value" placeholder="请选择" style='width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <el-select v-model="value" placeholder="请选择" style='max-width:193px;width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select> -->
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <!-- <span class="demonstration">季节</span> -->
                            <label for="" class="label">季节</label>
                            <el-select v-model="value" placeholder="请选择" style='width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <el-select v-model="value" placeholder="请选择" style='max-width:193px;width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select> -->
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <!-- <span class="demonstration">调样人</span> -->
                            <label for="" class="label">调样人</label>
                            <el-input v-model="filters.name" placeholder="输入调样人" style='width:100%'></el-input>
                            <!-- <el-input v-model="filters.name" placeholder="输入调样人" style='max-width:193px;width:100%'></el-input> -->
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <!-- <span class="demonstration">供应商</span> -->
                            <label for="" class="label">供应商</label>
                            <el-input v-model="filters.name" placeholder="输入供应商" style='width:100%'></el-input>
                            <!-- <el-input v-model="filters.name" placeholder="输入供应商" style='max-width:193px;width:100%'></el-input> -->
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <!-- <span class="demonstration">调样状态</span> -->
                            <label for="" class="label">调样状态</label>
                            <el-select v-model="value" placeholder="请选择" style='width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <el-select v-model="value" placeholder="请选择" style='max-width:193px;width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select> -->
                        </div>
                    </el-col>
                </el-row>
                <!-- <div style='margin-left:95px '> -->

                <!-- 按钮不见了，为什么 -->
                <div>
                    <el-form-item>
                        <el-button type="primary" v-on:click="getUsers">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="demandCheckIn">需求登记</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="demandEdit">需求编辑</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="infoComplete">完善信息</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="printForm">打印调样签收表</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="">调用截屏</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="">导出登记表</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="tableData" border style="width: 100%" height='300' >
            <el-table-column fixed type="selection" prop='id' width="40" v-if=''></el-table-column>

<!-- 单选框无法选中？？？ -->
<!--             <el-table-column fixed  prop='id' width="40" label='单选'>
                <template scope="scope">
                    <el-radio class="radio" v-model="radio" label="scope.row.radio"></el-radio>
                </template>
            </el-table-column> -->

            <el-table-column prop="person" label="需求人" width=""> </el-table-column>
            <el-table-column prop="department" label="部门" width=""> </el-table-column>
            <el-table-column prop="season" label="季节"> </el-table-column>
            <el-table-column prop="date" label="填写日期"> </el-table-column>
            <el-table-column prop="" label="子表单">
                <el-table-column prop="styleNum" label="款号" width=""></el-table-column>
                <el-table-column prop="status" label="状态" width=""></el-table-column>
                <el-table-column prop="supplier" label="供应商" width=""></el-table-column>
                <el-table-column prop="supplierTel" label="供应商电话" width=""></el-table-column>
                <el-table-column prop="supplierArticleNum" label="供应商货号" width=""></el-table-column>
                <el-table-column prop="colorNum" label="色号" width=""></el-table-column>
                <el-table-column prop="meterNum" label="米数" width=""></el-table-column>
                <el-table-column prop="stylistRemark" label="设计师备注" width=""></el-table-column>
                <el-table-column prop="researchFabicDate" label="调样日期" width=""></el-table-column>
                <el-table-column prop="anticipatedArriveDate" label="预到日期" width=""></el-table-column>
                <el-table-column prop="actuallyArriveDate" label="实到日期" width=""></el-table-column>
                <el-table-column prop="price" label="价格" width=""></el-table-column>
                <el-table-column prop="productName" label="品名" width=""></el-table-column>
                <el-table-column prop="larghezza" label="门幅" width=""></el-table-column>
                <el-table-column prop="yarnCount" label="纱支" width=""></el-table-column>
                <el-table-column prop="density" label="密度" width=""></el-table-column>
                <el-table-column prop="gramWeight" label="克重" width=""></el-table-column>
                <el-table-column prop="ingredient" label="成分" width=""></el-table-column>
                <el-table-column prop="fabricRemark" label="面料备注" width=""></el-table-column>
                <el-table-column prop="fabricCode" label="面料简码" width=""></el-table-column>
            </el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="">
              <template scope="scope">
                  <!-- 删除 -->
                  <i class="el-icon-delete" title='删除' @click="handleDel(scope.$index, scope.row)"></i>
                  <!-- 打印小样 -->
                  <i class="el-icon-document" title='打印小样' @click=""></i>
                  <!-- 调样完成 -->
                  <i class="el-icon-check" title='调样完成' @click=""></i>
                  <!-- 驳回小样 -->
                  <i class="el-icon-caret-left" title='驳回小样' @click=""></i>
                  <!-- 办理完毕 -->
                  <i class="el-icon-circle-check" title='办理完毕' @click=""></i>
              </template>
            </el-table-column>
        </el-table>


         <el-table :data="tableData" border style="width: 100%" height='300' id="form1">
            <el-table-column prop="person" label="需求人" width=""> </el-table-column>
            <el-table-column prop="department" label="部门" width=""> </el-table-column>
            <el-table-column prop="season" label="季节"> </el-table-column>
            <el-table-column prop="date" label="填写日期"> </el-table-column>
            <el-table-column prop="styleNum" label="款号" width=""></el-table-column>
            <el-table-column prop="status" label="状态" width=""></el-table-column>
            <el-table-column prop="supplier" label="供应商" width=""></el-table-column>
            <el-table-column prop="supplierTel" label="供应商电话" width=""></el-table-column>
        </el-table>
        <!-- 调样需求登记，直接登记新的需求，不需要勾选表格里某个数据 -->
        <!-- 需求人、部门、填写日期自动获取数据，且需求人数据只读，季节手动选择 -->
        <el-dialog title="调样需求登记" v-model="formCheckIn" :close-on-click-modal="false" custom-class='el-dialog--large'>
            <el-form :inline="true" :model="filters">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">需求人</label>
                            <el-input v-model="filters.name" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">部门</label>
                            <el-select v-model="value" placeholder="请选择" style='width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">季节</label>
                            <el-select v-model="value" placeholder="请选择" style='width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">填写日期</label>
                            <el-date-picker v-model="value2" type="date" placeholder="选择终止日期" style='width:100%'></el-date-picker>
                        </div>
                    </el-col>
                </el-row>
                <div class='right'>
                    <el-form-item>
                    <!-- table底部添加一空白行 -->
                        <el-button type="primary" @click="addNewTr">增加项目</el-button>
                    </el-form-item>
                </div>
                <el-table :data="tableData_demandCheckIn" border class='marginBottom'>
                    <el-table-column prop="styleNum" label="用于款号" width=""></el-table-column>
                    <el-table-column prop="supplier" label="供应商名称" width=""></el-table-column>
                    <el-table-column prop="supplierTel" label="供应商联系方式" width=""></el-table-column>
                    <el-table-column prop="supplierArticleNum" label="供应商货号" width=""></el-table-column>
                    <el-table-column prop="colorNum" label="色号" width=""></el-table-column>
                    <el-table-column prop="meterNum" label="所需米数"></el-table-column>
                    <el-table-column prop="stylistRemark" label="设计师备注"></el-table-column>
                    <el-table-column prop="picture" label="图片" width=""></el-table-column>
                    <el-table-column prop="" label="操作" width="">
                        <template scope="scope">
                            <!-- 上传图片 -->
                            <i class="el-icon-upload2" title='上传图片' @click="uploadVisible=true"></i>
                            <!-- 添加一行 -->
                            <!-- 克隆当前行（附带数据）并添加到当前行下面 -->
                            <i class="el-icon-plus" title='添加一行' @click="cloneAddThisTr"></i>
                            <!-- 删除 -->
                            <i class="el-icon-delete" title='删除' @click="handleDel(scope.$index, scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
                <div class='center'>
                    <el-form-item>
                        <el-button type="primary" @click="">保存</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="">重置</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="">保存为草稿</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
        
        <!-- 图片上传对话框 -->
        <el-dialog title="图片上传" :visible.sync="uploadVisible" width="30%" :before-close="handleClose" class='el-dialog--upload'>
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip" >只能上传jpg/png文件，且不超过500kb</div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="uploadVisible = false">取 消</el-button>
                  <el-button type="primary" @click="uploadVisible = false">确 定</el-button>
              </span>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="uploadVisible = false">取 消</el-button>
              <el-button type="primary" @click="uploadVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 调样需求编辑，需要先勾选表格里某个数据  -->
        <el-dialog title="调样需求编辑" v-model="formEdit" :close-on-click-modal="false" custom-class='el-dialog--large'>
            <el-form :inline="true" :model="filters">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">需求人</label>
                            <el-input v-model="filters.name" :readonly='readonly' ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">部门</label>
                            <el-select v-model="value" placeholder="请选择" style='width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">季节</label>
                            <el-select v-model="value" placeholder="请选择" style='width:100%'>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">填写日期</label>
                            <el-date-picker v-model="value2" type="date" placeholder="选择终止日期" style='width:100%'></el-date-picker>
                        </div>
                    </el-col>
                </el-row>
                <div class='right'>
                    <el-form-item>
                        <el-button type="primary" @click="">增加项目</el-button>
                    </el-form-item>
                </div>
                  <el-table :data="tableData_demandEdit" border class='marginBottom'>
                    <el-table-column prop="styleNum" label="用于款号" width=""></el-table-column>
                    <el-table-column prop="supplier" label="供应商名称" width=""></el-table-column>
                    <el-table-column prop="supplierTel" label="供应商联系方式" width=""></el-table-column>
                    <el-table-column prop="supplierArticleNum" label="供应商货号" width=""></el-table-column>
                    <el-table-column prop="colorNum" label="色号" width=""></el-table-column>
                    <el-table-column prop="meterNum" label="所需米数"></el-table-column>
                    <el-table-column prop="stylistRemark" label="设计师备注"></el-table-column>
                    <el-table-column prop="picture" label="图片" width=""></el-table-column>
                    <el-table-column prop="" label="操作" width="">
                        <template slot-scope="scope">
                            <!-- 上传图片 -->
                            <i class="el-icon-upload2" title='上传图片' @click=""></i>
                            <!-- 添加一行 -->
                            <i class="el-icon-plus" title='添加一行' @click=""></i>
                            <!-- 删除 -->
                            <i class="el-icon-delete" title='删除' @click="handleDel(scope.$index, scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
                <div class='center'>
                    <el-form-item>
                        <el-button type="primary" v-on:click="">保存</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
        <!--完善信息-->
        <!-- 表单部分数据获取自父页面当前勾选项，数据只读，不可修改 -->
        <el-dialog title="完善信息" v-model="formComplete" :close-on-click-modal="false" custom-class='el-dialog--large'>
            <el-form :inline="true" :model="filters">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">需求人</label>
                            <el-input v-model="filters.name" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">部门</label>
                            <el-input v-model="filters.name" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">季节</label>
                            <el-input v-model="filters.name" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">填写日期</label>
                            <el-input v-model="filters.name" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">调样人员</label>
                            <el-input v-model="filters.name" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-table :data="tableData" border class='marginBottom' >
                    <el-table-column prop="styleNum" label="用于款号" width=""></el-table-column>
                    <el-table-column prop="supplier" label="供应商名称" width=""></el-table-column>
                    <el-table-column prop="supplierArticleNum" label="供应商货号" width=""></el-table-column>
                    <el-table-column prop="colorNum" label="色号" width=""></el-table-column>
                    <el-table-column prop="meterNum" label="所需米数"></el-table-column>
                    <el-table-column prop="stylistRemark" label="设计师备注"></el-table-column>
                    <el-table-column prop="picture" label="图片" width=""></el-table-column>
                    <el-table-column prop="researchFabicDate" label="调样时间" width=""></el-table-column>
                    <el-table-column prop="anticipatedArriveDate" label="预到日期" width=""></el-table-column>
                    <el-table-column prop="actuallyArriveDate" label="实到日期" width=""></el-table-column>
                    <el-table-column prop="price" label="大货价格" width=""></el-table-column>
                    <el-table-column prop="productName" label="品名" width=""></el-table-column>
                    <el-table-column prop="larghezza" label="门幅" width=""></el-table-column>
                    <el-table-column prop="yarnCount" label="纱支" width=""></el-table-column>
                    <el-table-column prop="density" label="密度" width=""></el-table-column>
                    <el-table-column prop="gramWeight" label="克重" width=""></el-table-column>
                    <el-table-column prop="ingredient" label="成分" width=""></el-table-column>
                    <el-table-column prop="fabricRemark" label="面料备注" width=""></el-table-column>
                    <el-table-column prop="fabricCode" label="面料简码" width=""></el-table-column>
                </el-table>
                <div class='center'>
                    <el-form-item>
                        <el-button type="primary" @click="">保存</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="">调用截屏</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
        <!-- <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="addForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div> -->
    </section>
</template>
<script>
import util from '../../common/js/util'
import {needCLodop,getLodop} from '../../../static/lodop/lodopFuncs'
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
            sels: [], //列表选中列
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            },
            //编辑界面数据
            editForm: {
                id: 0,
                name: '',
                sex: -1,
                age: 0,
                birth: '',
                addr: ''
            },
            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            },
            //新增界面数据
            addForm: {
                name: '',
                sex: -1,
                age: 0,
                birth: '',
                addr: ''
            },


            // E.I系统代码
            // 日期控件，
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            // 日期表单初始为空
            value1: '',
            // 日期表单初始为空
            value2: '',
            // 需求登记、需求编辑、完善信息对话框，默认隐藏
            formCheckIn: false,
            formEdit: false,
            formComplete: false,
            // 设置表单只读
            readonly:true,
            // 图片上传对话框，默认隐藏
            uploadVisible:false,
            // 上传后图片信息添加到该列表？？？
            fileList2: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, ],

            // 调样列表-表格模拟数据
            tableData: [{
                'person':'路人甲',
                'department':'越也一组',
                'season':'2019春',
                'date':'2018-5-10',
                'styleNum':'28060',
                'status':'待处理',
                'supplier':'华棉',
                'supplierTel':'86-20-89233818',
                'supplierArticleNum':'HM-T0106CM',
                'colorNum':'6#白',
                'meterNum':'6',
                'stylistRemark':'',
                'researchFabicDate':'',
                'anticipatedArriveDate':'',
                'actuallyArriveDate':'',
                'price':'',
                'productName':'',
                'larghezza':'',
                'yarnCount':'',
                'density':'',
                'gramWeight':'',
                'ingredient':'',
                'fabricRemark':'',
                'fabricCode':'',
            }, {
                'person':'路人乙',
                'department':'越也二组',
                'season':'2019春',
                'date':'2018-5-11',
                'styleNum':'28060',
                'status':'待处理',
                'supplier':'华棉2',
                'supplierTel':'86-20-89233818',
                'supplierArticleNum':'HM-T0106CM',
                'colorNum':'6#白',
                'meterNum':'7',
                'stylistRemark':'',
                'researchFabicDate':'',
                'anticipatedArriveDate':'',
                'actuallyArriveDate':'',
                'price':'',
                'productName':'',
                'larghezza':'',
                'yarnCount':'',
                'density':'',
                'gramWeight':'',
                'ingredient':'',
                'fabricRemark':'',
                'fabricCode':'',
            }],
            // 调样需求登记-表格模拟数据
            tableData_demandCheckIn:[{
                'styleNum':'',
                'supplier':'',
                'supplierTel':'',
                'supplierArticleNum':'',
                'colorNum':'',
                'meterNum':'',
                'stylistRemark':'',
                'picture':'',
            }],
            // 调样需求编辑-表格模拟数据
            tableData_demandEdit:[{
                'styleNum':'28060',
                'supplier':'华棉2',
                'supplierTel':'86-20-89233818',
                'supplierArticleNum':'HM-T0106CM',
                'colorNum':'6#白',
                'meterNum':'7',
                'stylistRemark':'',
                'picture':'',
            }],
            // item:[{state:true}],
            // radio: '',
        }
    },
    methods: {
        printForm(){
            LODOP=getLodop();  
            var strBodyStyle="<style>table tr{width:80%;}table tr td { border: 1 solid red;border-collapse:collapse ;text-align:center}table tr th { border: 1 solid red;border-collapse:collapse ;text-align:center}</style>";
            var strFormHtml=strBodyStyle+"<body>"+document.getElementById("form1").innerHTML+"</body>";
            LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_样式风格");
            LODOP.ADD_PRINT_TEXT(50,0,100,100,"细线样式打印：");
            LODOP.ADD_PRINT_HTM(88,0,100,100,strFormHtml);
            LODOP.PREVIEW();  
        },
        // 需求登记
        demandCheckIn: function() {
            this.formCheckIn = true;
            // 对话框表格数据是由此处数据填充？还是data里的数据？？？
            // this.addForm = {
            //     name: '',
            //     sex: -1,
            //     age: 0,
            //     birth: '',
            //     addr: ''
            // };
        },
        // table底部添加一空白行
        addNewTr:function(){

        },

        // 克隆当前行（附带数据）并添加到当前行下面
        cloneAddThisTr:function(){

        },

        // 需求编辑
        demandEdit: function() {
            this.formEdit = true;
        },
        // 完善信息
        infoComplete: function() {
            this.formComplete = true;
        },
        // 上传图片
        uploadPic22:function(){
            this.uploadVisible = true;
        },



        // handleClose(done) {
        //        this.$confirm('确认关闭？')
        //          .then(_ => {
        //            done();
        //          })
        //          .catch(_ => {});
        //      },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },



        // 模板原有代码

        //性别显示转换
        formatSex: function(row, column) {
            return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
        },
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
        handleDel: function(index, row) {
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
        handleEdit: function(index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //显示新增界面
        handleAdd: function() {
            this.addFormVisible = true;
            this.addForm = {
                name: '',
                sex: -1,
                age: 0,
                birth: '',
                addr: ''
            };
        },
        //编辑
        editSubmit: function() {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.editForm);
                        para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
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
        //新增
        addSubmit: function() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.addForm);
                        para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
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
        selsChange: function(sels) {
            this.sels = sels;
        },
        //批量删除
        batchRemove: function() {
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
<style scoped>

/*覆盖样式*/
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-input,
.el-input__inner {
    /*width: 217px ! important;*/
}

.el-dialog--large {
    width: 100%;
    /*width: auto;*/
}

/*控制布局*/
.label {
    float: left;
    display: inline-block;
    /*display: block;*/
    padding: 9px 10px;
    width: 80px;
    font-weight: 400;
    text-align: right;
}

.center {
    text-align: center;
}

.right {
    float: right;
}

.marginBottom {
    margin-bottom: 20px;
}

/*图片上传对话框宽度*/
.el-dialog--upload {
    /*width: 30%;*/
}



</style>