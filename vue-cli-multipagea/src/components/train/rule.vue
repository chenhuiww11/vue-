<template>
	<div class="layer" v-if="this.$store.store.state.rule">
    	<div class="inlayer rules">
    		  <img src="../../module/train/images/close.png" class="close"  @click="close()"/>
    	      <h2 class="ruletitle">
    	      	活动规则介绍
    	      </h2>
    	      <p class="rule">1、每位用户每天可点亮两次火车站，每个火车站仅可点亮一次，每次点亮火车站需在火车站3km范围内，货运火车站不可点亮；</p>
 			  <p class="rule">
 			  	2、点亮火车站需打开手机GPS定位，如提示无法点亮，请注意检查手机GPS定位是否已打开；
 			  </p>
 			  <p class="rule">
 			  	3、每天成功点亮火车站的用户，可以获得对应的点亮福利，具体福利使用规则详见福利本身规则说明；
 			  </p> 
 			   <p class="rule">
 			  	 4、每个火车站福利会有所不同，具体福利内容详见每个火车站点亮详情。
 			  </p> 
 		</div>	  
    </div>
</template>
<!--v-if="this.$store.store.state.rule"-->
<script>
	import {mapGetters,mapActions,mapMutations } from 'vuex'
	export default {
		name: 'app',
		 computed:{
		 	count(){
		 		return this.$store.store.state.rule
		 	}
		 }, 
		data() {
			return {
				message: '',
			}
		},
		methods: {
			 ...mapMutations([
		      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
		    ]),
			 ...mapActions(['increment']),
//			increment(){
//				console.log(!this.$store.store);
//			},
//			关闭规则按钮
			close() {
				this.$store.store.state.rule=false;
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>