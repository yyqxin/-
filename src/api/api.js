import axios from 'axios';
import { Cookie } from '../js/common' ;

export const getjson = params => {return axios.get('/static/json/' + params +'.json').then(res=>res.data) ; }
export const getmd = params => {return axios.get('/static/md/' + params +'.md').then(res=>res.data) ; }

export const query = params => { return axios.post('/api/cc/query', params).then(res => res.data).catch(res => res); };

export const execute = params => { return axios.post('/api/cc/execute', params).then(res => res.data).catch(res => res); };

export const login = params => { return axios.post('/api/auth/login',params).then(res => res.data).catch(res => res ); };


export const apiparas = {
	pushPara: function(paras, pname, pvalue) {
		let p = {
			'name': pname,
			'value': pvalue
		};
		paras.push(p);
	},
	
	getParas_rtype: function(db,rptname,resulttype, rptparas) {
		let token = Cookie.Get('token');
		let p = {
			ds:db,
			cmd: rptname,
			paras: rptparas,
			rtype: resulttype,
			token: 'test'
		};
		return p;
	},
	getParas: function(db,rptname, rptparas) {
		let token = Cookie.Get('token');
		let p = {
			ds:db,
			cmd: rptname,
			paras: rptparas,
			token: token
		};
		return p;
	}
};


