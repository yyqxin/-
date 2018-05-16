<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img src="/static/img/a1.jpg" /> <strong style="position:absolute;top:20px;left:20px;">{{sysUserName}}</strong></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
			<!-- <el-col :span="10" style="float:right" class="el-tabs__header">
				<el-tabs v-model="activeName" @tab-click="handleClick" style="height: 80px; color:#fff;float:right; boder:0;">
				    <el-tab-pane label="业务管理" name="0" class="el-tabs__item.is-active"><span><i class="el-icon-view"></i>业务管理</span></el-tab-pane>
				    <el-tab-pane label="报表管理" name="1" class="el-tabs__item" >报表管理</el-tab-pane>
				    <el-tab-pane label="资料管理" name="2" class="el-tabs__item">资料管理</el-tab-pane>
			  </el-tabs>
			</el-col> -->

		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
			<el-menu active-text-color="#20a0ff" :default-active="default_index"  :default-openeds="defaultIndex" :unique-opened="true" :router="true">  
                <template v-for="item in items" v-model="activeName" @tab-click="handleClick">
	                <template v-if="item.subs">
	                    <el-submenu :index="item.index">
	                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
	                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
	                        </el-menu-item>
	                    </el-submenu>
	                </template>
	                <template v-else>
	                    <el-menu-item :index="item.index">
	                        <i :class="item.icon"></i>{{ item.title }}
	                    </el-menu-item>
	                </template>
            	</template>
            </el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'EI综合平台',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
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
				activeName:'0',
				default_index:'',
				defaultIndex:[],
				items: [
                   {
                        icon: 'el-icon-message',
                        index: '1',
                        title: '业务管理',
                        subs: [
                            {
                                index: 'adjustManage',
                                title: '调样管理'
                            },
                            {
                                index: 'draft',
                                title: '调样草稿'
                            }
                        ]
                    },
                     {
                        icon: 'el-icon-message',
                        index: '2',
                        title: '报表管理',
                        subs: [
                            {
                                index: 'statistics',
                                title: '调样数据统计表'
                            },
                            {
                                index: 'summary',
                                title: '调样数据汇总表'
                            },
                             {
                                index: 'dayPlan',
                                title: '面料调样日计划'
                            }
                        ]
                    },
                     {
                        icon: 'el-icon-message',
                        index: '3',
                        title: '资料管理',
                        subs: [
                             {
                                index: 'season',
                                title: "季节管理"
                            },
                            {
                                index: 'supplier',
                                title: '供应商管理'
                            }
                        ]
                    }
                ],
                // ywItem:[
                // 	{
                //         icon: 'el-icon-message',
                //         index: '2',
                //         title: '业务管理',
                //         subs: [
                //             {
                //                 index: 'adjustManage',
                //                 title: '调样管理'
                //             },
                //             {
                //                 index: 'draft',
                //                 title: '调样草稿'
                //             }
                //         ]
                //     }
                // ],
                // bbItem:[
                // 	{
                //     	icon: 'fa fa-id-card-o',
                //         index: 'statistics',
                //         title: '报表统计',
                //         subs: [
                //             {
                //                 index: 'statistics',
                //                 title: '调样数据统计表'
                //             },
                //             {
                //                 index: 'summary',
                //                 title: '调样数据汇总表'
                //             }
                //             ,
                //             {
                //                 index: 'dayPlan',
                //                 title: '面料调样日计划'
                //             }
                //         ]
                //     }
                // ],
                // zlItem:[
                // 	{
                // 		icon: 'el-icon-message',
                //         index: '3',
                //         title: '资料管理',
                //         subs: [
                           
                //         ]

                // 	}
                // ]
                // // items:[]
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			handleClick(){
				console.log("activeName:"+this.activeName)
				if (this.activeName == '0') {
					this.items = this.ywItem;
					this.defaultIndex = ['adjustManage'];
					this.$router.push('/adjustManage')
				}else if(this.activeName == '1'){
					this.items = this.bbItem;
					this.defaultIndex = ['statistics'];
					this.$router.push('/statistics')
				}else{
					this.items = this.zlItem;
					this.defaultIndex = ['season'];
					this.$router.push('/season')
				}
				
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = localStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.account || '';
				//this.sysUserAvatar = user.avatar || '';
			}
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height:80px;
			line-height:80px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				width:60px;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					width:60px;
					img {
						width:30px;
						height:30px;
						border-radius: 20px;
						margin: 25px 20px 25px 10px;
						float: right;
					}
				}
			}
			.el-tabs__item{
				color:#fff!important;
			}
			.logo {
				//width:230px;
				height:80px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.el-tabs__header{
				padding: 0;
                position: relative;
                margin: 0 0 15px;
                border:none;
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top:80px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				min-width:1200px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}

</style>