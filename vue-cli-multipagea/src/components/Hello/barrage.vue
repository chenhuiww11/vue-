<template>
	<div class="barrage">
		<button @click="xianshi()">按钮</button>
		<div class="tel" v-show="type">
			<div class="intel">
			<input type="text" placeholder="请输入弹幕" v-model="message" />
			<button @click="danmu(message)">确认</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'barrage',
		data() {
			return {
				message: '',
				type: false,
			}
		},
		methods: {
			xianshi() {
				this.type = !this.type;
			},
			//      随机数
			rand(min, max) {　　
				return parseInt(Math.random() * (max - min) + 1) + min;
			},
			//		随机颜色	
			getReandomColor() {　　　　 return '#' + (function(h) {　　　　 return new Array(7 - h.length).join("0") + h　　　　 })((Math.random() * 0x1000000 << 0).toString(16))　　 },
			//		弹幕	
			danmu(str) {
				var self = this;
				self.type = !self.type;
				self.message='';
				var _top = self.rand(0, 18);　　
				var danmuobj = $('<div style="position: absolute;height:1.2rem; font-size: 1.1rem;z-index: 999;overflow: hidden;">' + str + '</div>')　　
				danmuobj.css({ "left": $(window).width() + "5rem" })　　
				danmuobj.css({ color: self.getReandomColor() })　　
				$("body").append(danmuobj);　　
				var num = $(window).width();　　
				setInterval(function() {　　　　 num--;　　　　 if(num < 0) {　　　　 num = $(window).width();　　　　 }　　　　 danmuobj.css({ left: num, top: _top + "rem" });　　 }, 20)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tel {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 99;
		background: #000;
		top: 0;
		left: 0;
	}
	.tel .intel{
		width: 100%;
		position:absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		overflow: hidden;
		height: 200px;
	}
	.tel>button{
		
		
	}
</style>