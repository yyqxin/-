import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/login',
			component: resolve => require(['../components/common/login.vue'], resolve)
		},
		{
			path: '/welcome',
			component: resolve => require(['../components/page/Welcome.vue'], resolve)
		},
		
		{
			path: '/home',
			component: resolve => require(['../components/common/Home.vue'], resolve),
			children: [{
					path: '/',
					redirect: '/md/welcome'
					
				},
				{
					path: '/md/:filename',
					props: true,
					component: resolve => require(['../components/common/markdown.vue'], resolve)
				} 
				, {
					path: '/basic/season',
					component: resolve => require(['../components/basic/season.vue'], resolve)
					,meta:{title: '基础资料->季节管理'}
				}
				, {
					path: '/basic/supplier',
					component: resolve => require(['../components/basic/supplier.vue'], resolve)
					,meta:{title: '基础资料->供应商管理'}
				}
				, {
					path: '/report/dayPlan',
					component: resolve => require(['../components/report/dayPlan.vue'], resolve)
					,meta:{title: '报表管理->面料调样日计划'}
				}
				, {
					path: '/report/statistics',
					component: resolve => require(['../components/report/statistics.vue'], resolve)
					,meta:{title: '报表管理->调样数据统计表'}

				}
				, {
					path: '/report/summary',
					component: resolve => require(['../components/report/summary.vue'], resolve)
					,meta:{title: '报表管理->调样数据汇总表'}

				}
				, {
					path: '/business/adjustManage',
					component: resolve => require(['../components/business/surveyManage.vue'], resolve)
					,meta:{title: '业务管理->调样管理'}
				}
				, {
					path: '/business/draft',
					component: resolve => require(['../components/business/surveyDraft.vue'], resolve)
					,meta:{title: '业务管理->调样草稿'}
				}
				
				
			]
		},
	]
})