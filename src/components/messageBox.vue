<template>
    <div id="message-box">
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="form" style="height:240px">
            <el-form-item label="活动名称" >
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" >
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'message-box',
        props: {
            // 显示模式
            // one:只有一个时间
            // two:两个时间节点
            // merge:两个时间节点的合并
            displayMode: {
                type: String,
                default: 'one'
            },
            dialogFormVisible:{
                type: Boolean,
                default: false
            },
            // 时间配置
            timeSet: {
                start: {
                    type: String,
                    default: '08:30', // 开始时间
                },
                step: {
                    type: String,
                    default: '00:15', // 时间间隔(步长)
                },
                end: {
                    type: String,
                    default: '18:30'  // 结束时间
                },
                minTime: {
                    type: String,     // 最小值in
                    default: ''  
                },
                maxTime: {
                    type: String,     // 最大值
                    default: ''  
                }
            },
            format: {
                type: String,
                default: 'HH:mm'      // 显示格式
            }
        },
        data () {
            return {

                // dialogFormVisible:true,
                form:{
                    name:'',
                    region:'',
                }
            }
        },
        methods: {

        }
    }
</script>