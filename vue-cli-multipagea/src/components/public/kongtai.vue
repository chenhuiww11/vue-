<template>
	<div class="kongtai">
		<img src="../../module/lightnote/images/train.png" class="kongtai"/>
		<p class="des">暂无点亮记录</p>
		<p class="des1">点亮火车站越多，福利越多哦</p>
		<p class="take" @click="jump()"> 参与活动</p>
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
			jump() {
				location.href="http://appnew.t.ly.com/md/dists/module/train.html"+'?tcwvcnew'
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.kongtai{
	width: 100%;
	text-align: center;
	}
	.kongtai img{
		width: 110px;
		margin-top: 100px;
		margin-bottom: 45px;
	}
	.kongtai .des{
		font-size: 16px;
		color: #666;
		margin-bottom: 8px;
	}
	.kongtai .des1{
		font-size: 12px;
		color: #999;
		
	}
	.kongtai .take{
		width: 125px;
		height: 36px;
		line-height: 36px;
		border-radius: 4px;
		text-align: center;
		color: #FFF;
		font-size:15px;
		background: #ff5346;
		margin: 26px auto;
	}
</style>