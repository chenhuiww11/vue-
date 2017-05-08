<template>
	<div class="lq">
		<li class="borderbottom">
			<div class="price">
				<img v-bind:src="trainList.prizeIcon" style="width: 60px;height: 60px;margin-top: 10px; "/>
				<!--<img src="http://img1.40017.cn/touch/pushcode/zidonghua/lvyoujijin.png" style="width: 60px;height: 60px;margin-top: 10px;"/>-->
			</div>
			<div class="pricedec">
				<span class="fu" v-if="trainList.ParValue">￥</span><span class="num" v-if="trainList.ParValue">{{trainList.ParValue}}</span>
				<span class="num" v-if="trainList.amount">{{trainList.amount}}</span>
				<span class="name">{{ trainList.prizeName}}</span>
				<p class="dec">{{ trainList.prizeDesc}}</p>
				<p class="datatime" v-if=" trainList.endTime">领取后<span class="tiema">{{ trainList.validDays}}</span>天内有效</p>
			</div>
			<!--判断是否去使用-->
			<div class="user" v-on:click="jump(trainList.prizeRedirectUrl, trainList.prizeName)" v-show="trainList.received=='true'">
				去使用
			</div>
			<div class="user" v-show="trainList.received!='true'">
				未领取
			</div>
		</li>
	</div>

</template>

<script>
	export default {
		name: 'list',
		props: ['trainList', 'state'],
		data() {
			return {}
		},
		methods: {
			jump(url, name) {
				if(url == 2) {
					if(window._tc_bridge_public.isAppVersionGreatThan(824)) {
						location.href = 'https://app.ly.com/deal/membersign.html'
						return false;
					} else {
						location.href = 'http://shouji.17u.cn/internal/h5/file/67/view/main.html?#/index'
						return false;
					}
				}
				if(this.state.isTC) {
					if(url.indexOf('shouji') != -1 || url.indexOf('tctclient') != -1) {
						window.location.href = url;
						return false;
					}
					setTimeout(function() {
						window._tc_bridge_web.open_newurl({
							"param": {
								"tagname": "tagback",
								"openParams": "newWindow,hideBottom",
								"jumpUrl": url
							},
							"CBPluginName": "_tc_web_util",
							"CBTagName": "open_newurl"
						});
					}, 0)
				} else {

				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.lq li {
		width: 100%;
		border-radius: 4px;
		background: #FFFFFF;
		position: relative;
		box-sizing: border-box;
		padding: 8px 0px 0px 10px;
		overflow: hidden;
		list-style-type: none;
	}
	
	.lq .noborder {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	
	.lq li .price {
		width: 80px;
		height: 80px;
		float: left;
		text-align: left;
		color: #FF4614;
		font-size: 30px;
		font-family: arial;
		border-radius: 2px;
		text-align: center;
	}
	
	.lq li .price>p {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 20px 0;
		font-size: 24px;
		font-family: arial;
		text-align: center;
	}
	
	.lq li .price .fu {
		font-size: 16px;
		font-family: arial;
	}
	
	.lq li .price .gift {
		width: 100%;
		height: 100%;
		border-radius: 2px;
	}
	
	.lq li .pricedec {
		box-sizing: border-box;
		text-indent: 10px;
		padding-top: 4px;
	}
	
	.lq li .pricedec .fu {
		color: #FF5346;
		font-weight: 600;
		font-family: "微软雅黑";
	}
	
	.lq li .pricedec .num {
		color: #FF5346;
		font-size: 20px;
		font-family: arial;
	}
	
	.lq li .pricedec .name {
		font-size: 16px;
		color: #333;
	}
	
	.lq li .dec {
		color: #999;
		font-size: 12px;
		padding: 4px 0 4px 0;
		font-family:arial;
	}
	
	.lq li .datatime {
		color: #999;
		font-size: 12px;
	}
	
	.lq li .tiema {
		font-family: arial;
	}
	
	.lq li .datatime>span {
		margin-left: 2px;
	}
	
	.lq .user {
		position: absolute;
		right: 15px;
		top: 34px;
		padding: 0 19px;
		height: 30px;
		line-height: 32px;
		border-radius: 4px;
		background: #ff5346;
		color: #FFF;
		text-align: center;
		font-size: 14px;
	}
</style>