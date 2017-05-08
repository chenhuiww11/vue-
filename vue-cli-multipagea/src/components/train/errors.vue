<template>
	<!--无网络、网络错误、服务器崩溃提示-->
    <div class="hybrid-tips-wrap" ontouchmove="return false;"  v-show="errors.state=='1'">
        <div class="hybrid-tips">
            <i v-bind:class="{'tips-img melt': errors.state == '0', 'tips-img nonetwork': errors.state == '1'}"></i>
            <p v-show="errors.state=='1'" class="tips-text" v-html="errors.text"></p>
            <p v-show="errors.state=='0'" class="tips-text" v-html="errors.serverText"></p>
            <a class="tips-btn" @click="reload">重新加载</a>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'errors',
		props:['errors'],
		data() {
			return {
			}
		},
		methods: {
			reload(){
				window.loading.reload();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>