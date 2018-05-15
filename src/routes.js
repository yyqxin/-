import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import statistics from './views/report/statistics.vue'
import summary from './views/report/summary.vue'
import dayPlan from './views/report/dayPlan.vue'
import adjustManage from './views/busManage/adjustManage.vue'
import draft from './views/busManage/draft.vue'
import season from './views/dataManage/season.vue'
import supplier from './views/dataManage/supplier.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '泽远智能综合平台-登录页',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
     {
        path: '/',
        component: Home,
        name: '泽远智能综合平台-主页',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '泽远智能综合平台-报表管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/statistics', component: statistics, name: '泽远智能综合平台-调样数据统计表' },
            { path: '/summary', component: summary, name: '泽远智能综合平台-调样数据汇总表' },
            { path: '/dayPlan', component: dayPlan, name: '泽远智能综合平台-面料调样日计划' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '泽远智能综合平台-业务管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/adjustManage', component: adjustManage, name: '泽远智能综合平台-调样管理' },
            { path: '/draft', component: draft, name: '泽远智能综合平台-调样草稿' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '泽远智能综合平台-资料管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/season', component: season, name: '泽远智能综合平台-季节管理' },
            { path: '/supplier', component: supplier, name: '泽远智能综合平台-供应商管理' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;