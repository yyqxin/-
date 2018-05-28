import Vue from 'vue';
import App from './App';
import router from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import "babel-polyfill";

import Vuex from 'vuex'
Vue.use(Vuex)
import store from './vuex/store'
Vue.prototype.$store = store 
 

Vue.use(ElementUI);

import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/'

Vue.component('icon', Icon)
 
import { Cookie } from './js/common';
	
router.beforeEach((to, from, next) => {

var user = Cookie.Get('token');
 if (to.meta.title)
 {
 	document.title =to.meta.title;
 }
 
if(process.env.NODE_ENV =='development'){
	Cookie.Set('token', '8ba5cba4db64d4b17cd7bca3dcb74027');
	Cookie.Set('uname', '谌舜谋');
	user = '056632360935522171'; 
}

  if (!user && to.path.substr(0,6) != '/auth/' && to.path != '/login') {
  	//console.log(to.path)
    next({ path: '/login' })
  } else {
  	//console.log(user);
    next()
  }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');