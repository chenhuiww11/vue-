<template>
	<div id="barrage">
		<barrage v-show='type' :type="type"></barrage>
	</div>
</template>

<script>
	import barrage from 'components/Hello/barrage'
	export default {
		name: 'app',
		components: {
			barrage
		},
		data() {
			return {
				type:false,
				msg: 'Welcome to Your Vue.js App',
				
			}
		},
		methods: {
			xianshi(){
				this.type=!this.type;
//				alert(this.show);
			},
		}
		}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>