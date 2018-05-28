<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple" style='display: flex'>
                                <label class='label'>起始日期</label>
                                <el-date-picker v-model="filters.startDate" type="date" placeholder="选择起始日期" style='width:100%'></el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple" style='display: flex'>
                                <label class='label'>终止日期</label>
                                <el-date-picker v-model="filters.endDate" type="date" placeholder="选择终止日期" style='width:100%'></el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple" style='display: flex'>
                                <label for="" class="label">需求人</label>
                                <el-input v-model="filters.demandPerson" placeholder="输入需求人" style='width:100%'></el-input>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple" style='display: flex'>
                                <label for="" class="label">部门</label>
                                <el-select v-model="filters.depart" placeholder="请选择" style='width:100%'>
                                    <el-option v-for="item in departments" :key="item.value" :label='item.label' :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple" style='display: flex'>
                                <label for="" class="label">季节</label>
                                <el-select v-model="filters.season" placeholder="请选择" style='width:100%'>
                                    <el-option v-for="item in seasons" :key="item.value" :label='item.label' :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple" style='display: flex'>
                                <label for="" class="label">调样人</label>
                                <el-input v-model="filters.surveyPerson" placeholder="输入调样人" style='width:100%'></el-input>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple" style='display: flex'>
                                <label for="" class="label">供应商</label>
                                <el-input v-model="filters.supplier" placeholder="输入供应商" style='width:100%'></el-input>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple" style='display: flex'>
                                <label for="" class="label">调样状态</label>
                                <el-select v-model="filters.status" placeholder="请选择" style='width:100%'>
                                    <el-option v-for="item in surveyStatus" :key="item.value" :label='item.label' :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-form-item>

                    <!-- 
                    需求登记、需求编辑：是由需求人提出的一个信息较为基础的需求，以及编辑修改这个需求，
                    完善信息：是由调样人员处理的，用于对需求进行调样、并详细完善需求信息，
                    操作人不一样！！！
                    "需求人"用户权限只有需求登记（位于表格上方工具栏）、编辑功能（位于表格里每条数据的最后操作里），
                    “调样人”用户权限只有完善信息（调样需求）、删除、打印小样、调样完成、驳回调样、办理完毕，
                    各需求状态下允许的操作：
                        待处理：删除、打印小样、调样完成、驳回调样，
                        已处理：删除、打印小样、办理完毕，
                        已结束：删除、打印小样，
                     -->
                     <!-- 用户信息里添加一个身份信息：需求人、调样人，根据身份分配不同权限， -->

                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button type="primary" @click="demandCheckIn">需求登记</el-button>
                        <!-- 如何通过单选框获取当前行的 row 数据并传入demandEdit() 方法？？？？ -->

                        <el-button type="primary" @click="demandEdit">需求编辑</el-button>
                        <el-button type="primary" @click="infoComplete">完善信息</el-button>

                        <el-button type="primary" @click="">打印调样签收表</el-button>
                        <el-button type="primary" @click="">调用截屏</el-button>
                        <el-button type="primary" @click="">导出登记表</el-button>
                    </el-form-item>
            </el-form>
        </el-col>

        <!-- 调样需求列表，
        用户权限不同，需求登记编辑、完善信息分属不同的权限，
        某种权限下拥有需求登记、编辑功能，此时父页面数据列表里没有操作功能（隐藏），
        某种权限下拥有完善信息功能，此时父页面数据列表里有操作功能：删除、打印小样、调样完成、驳回调样、办理完毕，某个操作流程结束，该操作按钮将隐藏，
        -->
        <!-- @select="checkbox_select(scope.section, scope.row)" -->
        <el-table :data="surveyList" :span-method='objectSpanMethod' border style="width: 100%" >
            <!-- <el-table-column prop='id' v-model='surveyList.id' width="40"></el-table-column> -->
            <!-- <el-table-column fixed type="selection" prop='id' v-model='surveyList.id' width="40"></el-table-column> -->
            <el-table-column prop="person" label="需求人" width=""> </el-table-column>
            <el-table-column prop="depart" label="部门" width=""> </el-table-column>
            <el-table-column prop="season" label="季节"> </el-table-column>
            <el-table-column prop="date" label="填写日期"> </el-table-column>
            <!-- <el-table-column prop="demands" label="子表单"> -->
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
                <!-- 不显示图片内容，但登记、编辑、完善对话框里有该表单 -->
                <!-- <el-table-column prop="fabricCode" label="面料简码" width=""></el-table-column> -->
            <!-- </el-table-column> -->
            <el-table-column fixed="right" prop="" label="操作" width="100">
                <template scope="scope">
                    <!-- 调样人权限 -->
                    <i class="el-icon-edit" title='编辑' @click="demandEdit(scope.$index, scope.row)"></i>
                    <!-- 调样人权限 -->
                    <i class="el-icon-delete" title='删除' @click="handleDel(scope.$index, scope.row)"></i>
                    <i class="el-icon-document" title='打印小样' @click=""></i>
                    <i class="el-icon-check" title='调样完成' @click=""></i>
                    <i class="el-icon-caret-left" title='驳回小样' @click=""></i>
                    <i class="el-icon-circle-check" title='办理完毕' @click=""></i>
                </template>
            </el-table-column>
        </el-table> 

        <!-- 调样需求登记，直接登记新的需求，不需要勾选表格里某个数据 -->
        <!-- 需求人、部门、填写日期自动获取数据，且需求人数据只读，季节手动选择 -->
        <!-- 关闭对话框应该清除数据 -->
        <el-dialog title="调样需求登记" v-model="demandCheckInDialogVisible" :close-on-click-modal="false" custom-class='el-dialog--large'>
            <el-form :inline="true" :model="demandCheckInForm" ref='demandCheckInForm'>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">需求人</label>
                            <el-input v-model="demandCheckInForm.person" ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">部门</label>
                            <el-select v-model="demandCheckInForm.depart" placeholder="请选择" style='width:100%'>
                                <el-option v-for="item in departments" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">季节</label>
                            <el-select v-model="demandCheckInForm.season" placeholder="请选择" style='width:100%'>
                                <el-option v-for="item in seasons" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">填写日期</label>
                            <el-date-picker v-model="demandCheckInForm.date" type="date" placeholder="选择终止日期" style='width:100%'></el-date-picker>
                        </div>
                    </el-col>
                </el-row>
                <div class='right'>
                    <el-form-item>
                        <el-button type="primary" @click="addNewTr">增加项目</el-button>
                    </el-form-item>
                </div>
                <el-table :data="demandCheckInTable" border class='marginBottom' v-loading="listLoading" >
                    <el-table-column label="用于款号" width="">
                        <template slot-scope='scope'>
                            <el-input size="small" v-model="scope.row.styleNum"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="供应商名称" width="">
                        <template slot-scope='scope'>
                            <el-input v-model="scope.row.supplier"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="供应商联系方式" width="">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.supplierTel"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="供应商货号" width="">
                        <template slot-scope='scope'>
                            <el-input v-model="scope.row.supplierArticleNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="色号" width="">
                        <template slot-scope='scope'>
                            <el-input v-model="scope.row.colorNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="所需米数">
                        <template slot-scope='scope'>
                            <el-input v-model="scope.row.meterNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="设计师备注">
                        <template slot-scope='scope'>
                            <el-input v-model="scope.row.stylistRemark"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="picture" label="图片" width=""></el-table-column>
                    <el-table-column label="操作" width="">
                        <template scope="scope">
                            <!-- 上传图片 -->
                            <i class="el-icon-upload2" title='上传图片' @click="uploadVisible=true"></i>
                            <!-- 添加一行 -->
                            <!-- 克隆当前行（附带数据）并添加到当前行下面 -->
                            <i class="el-icon-plus" title='添加一行' @click="cloneAddThisTr(scope.$index, scope.row)"></i>
                            <!-- 删除 -->
                            <i class="el-icon-delete" title='删除' @click="currentTrDel(scope.$index, scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>

                <div class='center'>
                    <el-form-item>
                        <el-button type="primary" @click="save_CheckIn">保存</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="reset_CheckIn">重置</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveDraft_CheckIn">保存为草稿</el-button>
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
        <!-- 需求人只读，其他三个默认填充数据，可以修改 -->
        <el-dialog title="调样需求编辑" v-model="demandEditDialogVisible" :close-on-click-modal="false" custom-class='el-dialog--large'>
            <el-form :inline="true" :model="demandEditForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">需求人</label>
                            <el-input v-model="demandEditForm.person" :readonly='readonly' ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">部门</label>
                            <el-select v-model="demandEditForm.depart" style='width:100%'>
                                <el-option v-for="item in departments" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">季节</label>
                            <el-select v-model="demandEditForm.season" style='width:100%'>
                                <el-option v-for="item in seasons" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display:flex'>
                            <label for="" class="label">填写日期</label>
                            <el-date-picker v-model="demandEditForm.date" type="date" style='width:100%'></el-date-picker>
                        </div>
                    </el-col>
                </el-row>
                <div class='right'>
                    <el-form-item>
                        <el-button type="primary" @click="addNewTr_Edit">增加项目</el-button>
                    </el-form-item>
                </div>
                <!-- 
                父页面勾选数据填充到编辑页面，
                待处理状态的数据可以编辑，行尾有操作按钮，
                已处理、已结束状态的数据不可编辑，行尾没有操作按钮，
                增加项目生成的空白tr里，可以写入数据，有操作按钮
                 -->
                <!-- <el-table  border class='marginBottom'> -->
                <el-table :data="demandEditTable" border class='marginBottom'>
                    <!-- 只读、可编辑状态切换通过 v-bind:readonly 实现 -->
                        <el-table-column label="用于款号" width="">
                            <template slot-scope='scope'>
                                <!-- <el-input size="small" v-model="demandEditForm.styleNum" :readonly='true'></el-input> -->
                                <el-input size="small" v-model="scope.row.styleNum" :readonly='true'></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="供应商名称" width="">
                            <template slot-scope='scope'>
                                <!-- <el-input v-model="demandEditForm.supplier" :readonly='false'></el-input> -->
                                <el-input v-model="scope.row.supplier" :readonly='false'></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="供应商联系方式" width="">
                            <template slot-scope="scope">
                                <!-- <el-input v-model="scope.row.supplierTel" ></el-input> -->
                                <el-input v-model="scope.row.supplierTel" ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="供应商货号" width="">
                            <template slot-scope='scope'>
                                <!-- <el-input v-model="scope.row.supplierArticleNum"></el-input> -->
                                <el-input v-model="scope.row.supplierArticleNum"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="色号" width="">
                            <template slot-scope='scope'>
                                <!-- <el-input v-model="scope.row.colorNum"></el-input> -->
                                <el-input v-model="scope.row.colorNum"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="所需米数">
                            <template slot-scope='scope'>
                                <!-- <el-input v-model="scope.row.meterNum"></el-input> -->
                                <el-input v-model="scope.row.meterNum"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="设计师备注">
                            <template slot-scope='scope'>
                                <!-- <el-input v-model="scope.row.stylistRemark"></el-input> -->
                                <el-input v-model="scope.row.stylistRemark"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="图片" width="">
                        <!-- 如何处理图片编辑？？ -->
                            <!-- <span v-model="scope.row.picture"></span> -->
                                <!-- <el-input v-model="scope.row.picture"></el-input> -->
                        </el-table-column>

                        <el-table-column prop="operate" label="操作" width="">
                            <template scope="scope">
                                <i class="el-icon-upload2" title='上传图片' @click=""></i>
                                <i class="el-icon-plus" title='添加一行' @click=""></i>
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
        <el-dialog title="完善信息" v-model="demandCompleteDialogVisible" :close-on-click-modal="false" custom-class='el-dialog--large'>
            <el-form :inline="true" :model="demandCompleteForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">需求人</label>
                            <el-input v-model="demandCompleteForm.person" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">部门</label>
                            <el-input v-model="demandCompleteForm.depart" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">季节</label>
                            <el-input v-model="demandCompleteForm.season" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">填写日期</label>
                            <el-input v-model="demandCompleteForm.date" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" style='display: flex'>
                            <label for="" class="label">调样人员</label>
                            <el-input v-model="demandCompleteForm.surveyPerson" :readonly='readonly'></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-table :data="surveyList" border class='marginBottom'>
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
   
    </section>
</template>
<script>
import util from '../../js/util'
// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
export default {
    data() {
        return {
            // 查询表单，默认为空
            filters: {
                startDate:'',
                endDate:'',
                demandPerson:'',
                depart:'',
                season:'',
                surveyPerson:'',
                supplier:'',
                status:'',
            },
            // 调样列表默认为空，初始化页面时加载数据并填充
            // surveyList:[],
            surveyList: [{
                        id:1,
                        person:'路人甲',
                        depart:'越也一组',
                        season:'2019春',
                        date:'2018-5-10',
                        styleNum:'28060',
                        status:'待处理',
                        statusCode:'0',
                        supplier:'华棉',
                        supplierTel:'86-20-89233818',
                        supplierArticleNum:'HM-T0106CM',
                        colorNum:'6#白',
                        meterNum:'6',
                        stylistRemark:'',
                        researchFabicDate:'',
                        anticipatedArriveDate:'',
                        actuallyArriveDate:'',
                        price:'',
                        productName:'',
                        larghezza:'',
                        yarnCount:'',
                        density:'',
                        gramWeight:'',
                        ingredient:'',
                        fabricRemark:'',
                        fabricCode:'',
                        picture:''
            },{
                        id:1,
                        person:'路人甲',
                        depart:'越也一组',
                        season:'2019春',
                        date:'2018-5-10',
                        styleNum:'28060',
                        status:'待处理',
                        statusCode:'0',
                        supplier:'华棉',
                        supplierTel:'86-20-89233818',
                        supplierArticleNum:'HM-T0106CM',
                        colorNum:'6#黑',
                        meterNum:'77',
                        stylistRemark:'',
                        researchFabicDate:'',
                        anticipatedArriveDate:'',
                        actuallyArriveDate:'',
                        price:'',
                        productName:'',
                        larghezza:'',
                        yarnCount:'',
                        density:'',
                        gramWeight:'',
                        ingredient:'',
                        fabricRemark:'',
                        fabricCode:'',
                        picture:''
            },{
                id:2,
                person:'路人乙',
                depart:'越也二组',
                season:'2019夏',
                date:'2018-5-22',
                styleNum:'280601111',
                status:'已处理',
                statusCode:'1',
                supplier:'华棉222',
                supplierTel:'86-20-8923381822222',
                supplierArticleNum:'HM-T0106CM2222',
                colorNum:'6#白2222',
                meterNum:'62222',
                stylistRemark:'',
                researchFabicDate:'',
                anticipatedArriveDate:'',
                actuallyArriveDate:'',
                price:'',
                productName:'',
                larghezza:'',
                yarnCount:'',
                density:'',
                gramWeight:'',
                ingredient:'',
                fabricRemark:'',
                fabricCode:'',
                picture:''
            }],

            total: 0,
            // 第一页
            page: 1,
            // 列表处于未加载数据状态，
            listLoading: false,
            // 列表选中列
            sels: [],
            // 编辑界面是否显示
            editFormVisible: false, 
            // 编辑列表处于未加载数据状态，
            editLoading: false,
            // 编辑功能的验证规则
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
            // 新增界面是否显示
            addFormVisible: false, 
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

            // 日期控件，在使用的地方定义默认值为空，如 startDate:'',
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
           
            // 部门，
            departments:[{value:0,label:'越也'},{value:1,label:'素来'},{value:2,label:'EI'}],
            // 季节
            seasons:[{value:0,label:'2019春'},{value:1,label:'2019夏'},{value:2,label:'2019秋'},{value:3,label:'2019冬'}],
            // 调样状态
            surveyStatus:[{value:0,label:'待处理'},{value:1,label:'已处理'},{value:2,label:'已结束'}],

             // 设置表单只读
            readonly:true,
            // 图片上传对话框，默认隐藏
            uploadVisible:false,
            // 上传后图片信息添加到该列表？？？
            fileList2: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, ],

            // 需求登记、需求编辑、完善信息对话框，默认隐藏
            demandCheckInDialogVisible: false,
            demandEditDialogVisible: false,
            demandCompleteDialogVisible: false,
            // 调样需求登记-表单，默认为空
            demandCheckInForm: {},
            // 调样需求登记-表格，可以不定义key-value，
            // id只用于数据提交之前的删除操作，和提交到数据库后的id无关
            // 调样需求登记对话框初始化时无数据，生成tr时根据tr长度获取id，
            demandCheckInTable:[],
           
            // 调样需求编辑-表单，默认为空，格式应该为对象而不是数组？？！！！
            demandEditForm:[],
            // 调样需求编辑-表格，默认为空
            demandEditTable:[],

             // 调样需求完善-表单，默认为空
            demandCompleteForm:[],
            // 调样需求完善-表格，默认为空
            demandCompleteTable:[],
        }
    },
    methods: {

        // 过给table传入span-method方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象。
        objectSpanMethod({row,column,rowIndex,columnIndex}){
            if(columnIndex === 0){
                if(rowIndex % 2 === 0 ){
                    return {
                        rowspan:2,
                        colspan:1
                    };
                } else {
                    return {
                        rowspan:0,
                        colspan:0
                    };
                }
            }
        },

        // 查询
        search() {
            // 表单参数
            let para = {
                page: this.page,
                startDate: this.filters.startDate,
                endDate: this.filters.endDate,
                demandPerson: this.filters.demandPerson,
                depart: this.filters.depart,
                season: this.filters.season,
                surveyPerson: this.filters.surveyPerson,
                supplier: this.filters.supplier,
                status: this.filters.status,
            };
            this.listLoading = true;
            //NProgress.start();
            // getUserListPage()方法、res.data.users 参数来自 api 文件，需要修改！！！
            getUserListPage(para).then((res) => {
                this.total = res.data.total;
                this.surveyList = res.data.users;
                this.listLoading = false;
                //NProgress.done();
            });
        },

        checkbox_select:function(section,row){
            console.log('勾选');
            console.log(section);
            console.log(row);
        },

        // 打开需求登记对话框（不需要勾选某条数据），填充表单数据，
        demandCheckIn: function() {
            // 清空数组，初始化，实现清除上一次数据
            var l = this.demandCheckInTable.length;
            this.demandCheckInTable.splice(0,l);
            this.demandCheckInDialogVisible = true;
            this.demandCheckInForm = {
                // 自动获取用户名、部门信息，
                person:'',
                depart:'',
                // 手动选填
                season:'',
                // 自动获取当前时间
                date:new Date().toLocaleDateString(),
            };
            // 添加一条空白数据（设置id为1）即实现默认添加一行，
            this.demandCheckInTable.push({id:1});
        },
        // 表格底部添加空白的一行
        addNewTr:function(){
            // 数据长度即为行数，也等同于最后一行的id，加一即为新增行id，
            var l = this.demandCheckInTable.length;
            console.log(l+1);
            // 数组内push一个空对象
            this.demandCheckInTable.push({id:l+1});
            console.log(JSON.stringify(this.demandCheckInTable));
        },
        // 克隆当前行（附带数据）并添加到当前行下面
        // 复制当前行数据 push 到 json对象数组，
        // scope.$index、scope.row，
        cloneAddThisTr:function(index, row){
            console.log(index);
            console.log(row);
            var rowStr = JSON.stringify(row);
            var row = JSON.parse(rowStr);
            var l = this.demandCheckInTable.length;
            console.log(l);
            // 对复制的row的id加一，
            row.id = l+1;
            console.log(row);
            // var row = JSON.parse(JSON.stringify(row));
            // 复制上一行数据添加到新行，但导致两行数据双向绑定、同步被修改
            // 因为当前行的 row 数据并不是一个纯粹的JSON对象，经转换为JSON字符串再转换回JSON对象，成为纯粹的JSON对象，添加到数据数组对象里，则不会和当前 row 产生数据双向绑定，
            this.demandCheckInTable.push(row);
            console.log(JSON.stringify(this.demandCheckInTable));
        },

        // 删除当前行
        currentTrDel: function(index, row) {
            console.log('index：' + index);
            // console.log(row);
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                // id 为准备删除的数据的id，这些数据只存在于当前页面，所以只需要这些数据的id不重复即可，
                let para = { id: row.id };
                console.log('id:' + row.id);
                console.log(para);

                // removeUser() 方法需要修改！！！
                removeUser(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    // this.getUsers();
                });
            }).catch(() => {

            });
        },

        // 保存需求登记
        save_CheckIn:function(){ 
            // 如何处理图片保存？？？
        },
        // 重置需求登记，清除所有数据再添加一行
        reset_CheckIn:function(){ 
            var l = this.demandCheckInTable.length;
            this.demandCheckInTable.splice(0,l);
            this.demandCheckInTable.push({id:1});
        },
        // 保存需求登记草稿
        saveDraft_CheckIn:function(){ 

        },

        // 需求编辑
        demandEdit: function(index,row) {
            this.demandEditDialogVisible = true;

            
            console.log(JSON.stringify(row)); 
            // 深拷贝返回的是父页面当前数据的完整内容，在编辑对话框里分为表单、表格两部分，表单可以直接赋值，表格无法直接赋值，
            // 是否该先去除表单内容再赋值到表格？？？
            var a = Object.assign({},row);
            console.log(JSON.stringify(a));
            this.demandEditForm = Object.assign({},row);
            // 直接将 row 赋值给编辑表单也行
            // this.demandEditForm = row;


            // {"id":2,"person":"路人乙","depart":"越也二组","season":"2019夏","date":"2018-5-22","styleNum":"280601111","status":"已处理","statusCode":"1","supplier":"华棉222","supplierTel":"86-20-8923381822222","supplierArticleNum":"HM-T0106CM2222","colorNum":"6#白2222","meterNum":"62222","stylistRemark":"","researchFabicDate":"","anticipatedArriveDate":"","actuallyArriveDate":"","price":"","productName":"","larghezza":"","yarnCount":"","density":"","gramWeight":"","ingredient":"","fabricRemark":"","fabricCode":"","picture":""}

            // this.demandEditTable = [{"styleNum":"280601111","supplier":"华棉222","supplierTel":"86-20-8923381822222","supplierArticleNum":"HM-T0106CM2222","colorNum":"6#白2222","meterNum":"62222","stylistRemark":"","picture":""}];


// 数组内传入对象！！！
            // this.demandEditTable.push(Object.assign({},row),row);

            // this.demandEditTable = [{
            //     styleNum:'28060',
            //     supplier:'华棉2',
            //     supplierTel:'86-20-89233818',
            //     supplierArticleNum:'HM-T0106CM',
            //     colorNum:'6#白',
            //     meterNum:'7',
            //     stylistRemark:'qwrwer',
            //     picture:'',
            // }];


        },

        addNewTr_Edit:function(){
            var l = this.demandEditTable.length;
            console.log(l+1);
            // 数组内push一个空对象
            this.demandEditTable.push({id:l+1});
            console.log(JSON.stringify(this.demandEditTable));
        },


        // 完善信息
        infoComplete: function() {
            this.demandCompleteDialogVisible = true;
            // '需求人'获取自勾选数据，'调样人'数据来自哪里？？？父页面数据操作功能里的调样？？？
        },

        // 上传图片
        uploadPic22:function(){
            this.uploadVisible = true;
        },



        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },


        //性别显示转换
        formatSex: function(row, column) {
            return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getUsers();
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
        // 显示编辑界面
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

div.demandCheckIn_tableEdit table.el-table__body tbody tr td div.cell{
    background-color: red;
    padding-left:1px!important;
    padding-right: 1px!important;
}

.demandCheckIn_td{
    padding: 0px;
}

div.demandCheckIn_input input{
    border:none;
    border-radius: 0px;
}

.readonly{
/*readonly:true;*/
}


</style>