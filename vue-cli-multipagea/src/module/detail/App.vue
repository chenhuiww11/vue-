<template>
	<div id="app">
		<img src="./images/logo.png">
		<!--<div>详情内容</div>
         <h1 v-if="result == 'No'">申请参与</h1>
         <h1 v-else-if="result == 'Yes'">取消参与</h1>-->
		<hello v-for='item in artList' :art-list='item'></hello>
		<barrage></barrage>
		<!--<button @click='push'>添加文章</button>
    <button @click='pop'>尾部去除一篇文章</button>
    <button @click='unshift'>在头部加入一条数据</button>
    <button @click='shift'>在头部去除一条数据</button>
    <button @click='reverse'>把所有数据进行反转</button>
    <button @click='clear'>清除所有数据</button>-->
	</div>
</template>

<script>
	import 'common/css/reset.css';
	import Hello from 'components/Hello/Hello'
	import barrage from 'components/Hello/barrage'

	export default {
		name: 'app',
		components: {
			Hello,
			barrage
		},
		data: function() {
			return {
				mobile: '', //电话号码
				memberId: '',
				isTC: window._tc_bridge_public.isTc,
				artList: [],
				result: '',
			}
		},
		created: function() {
			setTimeout(() => {
				this.result = 'No'
			}, 1000);
			//比方说我们是从后台拿到的文章集合
			this.artList = [
				{ name: '弹幕开始', startTime: 'gogogo', content: '', good: '' },
			];
		},
		methods: {
			push() {
				this.artList.push({
					name: 'ziksang5',
					startTime: '5小时前',
					content: 'eeeeeeeeee',
					good: 5
				})
			},
			pop() {
				this.artList.pop()
			},
			shift() {
				this.artList.shift()
			},
			unshift() {
				this.artList.unshift({
					name: 'ziksang3',
					age: 40
				})
			},
			reverse() {
				this.artList.reverse()
			},
			clear() {
				this.artList = []
			},
			buttonClick() {
				alert("原生点击")
			},

		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>