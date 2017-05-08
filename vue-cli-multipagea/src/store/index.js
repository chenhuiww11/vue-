import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
/* eslint-disable no-new */
Vue.use(Vuex);
//vuex全局调用公用的状态
// 创建一个对象来保存应用启动时的初始状态
const state ={
	rule: false,
	laye: false,//是否是第一次点亮
	
}
// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const store =new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
export default({
	store,
})
