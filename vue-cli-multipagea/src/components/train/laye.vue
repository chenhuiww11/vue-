<template>
	 <div class="layer" v-if="this.$store.store.state.laye">
    	<div class="inlayer">
    		<img src="../../module/train/images/close.png" class="close" v-on:click="close()"/>
    		<div class="layerpic">
    			<img src="../../module/train/images/top_popup.png"/>
    			<p class="light">{{state.tranintext}}</p>
    			<p class="layerTitle">
    				{{state.train}}
    			</p>
    		</div>
    		<p class="layerdec">成功获得接送站专车红包等福利</p>
    	    <p class="layerdec1">快去使用吧</p>
    	    <p class="look" v-on:click="close()">查看福利</p>
    	</div>
    </div>
</template>

<script>
	export default {
		name: 'laye',
		props : ['state'],
		data() {
			return {
				message: '',
			}
		},
		methods: {
			close() {
				this.$store.store.state.laye=false;
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>