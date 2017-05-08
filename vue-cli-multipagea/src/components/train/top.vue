<template>
	<div class="top topa" style="position: relative;">
  		<img src="../../module/train/images/top_bannr.png">
  		<p class="light" v-if="state.light">{{state.tranintext}}</p>
  		<p class="light" v-if="!state.light">点亮火车站</p>
  		<h2 v-if="!state.light">领取专属福利</h2>
  		<h2 v-if="state.light" >{{state.train}}</h2>
  		<p class="lighttime" v-show="state.linghttime!=''">点亮时间：{{state.linghttime}}</p>
  		<p class="rule" @click="open">规则介绍</p>
	</div>
</template>

<script>
	export default {
		name: 'top',
		props : ['state'],
		data() {
			return {
				message: '',
			}
		},
		methods: {
			open() {
				var self=this;
				self.$store.store.state.rule=true;
				setEvent('rule');
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.rule{
		position: absolute;
		right: 0;
		top: 10px;
		width: 85px;
		height: 27px;
		background: rgba(0,0,0,0.4);
		color: white;
		border-radius:99px 0 0 99px ;
		text-align: center;
		line-height: 29px;
	}
	.lighttime{
		    position: absolute;
		    left: 23px;
		    top: 98px;
		    font-size: 12px;
		    color: #FFF;
	}
</style>