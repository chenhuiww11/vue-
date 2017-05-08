<template>
	<div id="app">
		<!--头部info-->
		<div class="locationinfo" style="position: relative;" v-if='state.loc||state.notrain&&!loading'>
			<p class="noinfo">{{state.topinfo}}</p>
			<p class="setting" v-on:click="getadressinfo(1)" v-show="state.adressbtn">{{state.info}}</p>
		</div>
		<top :state='state' :list='list'></top>
		<div class="titleLp">
			<p class="title">
				<span v-show="state.tranintext!='你无法点亮'">{{state.train}}福利</span>
				<span v-show="state.tranintext=='你无法点亮'">火车站福利</span>
				<span class="lightnote" @click="jump('https://appnew.t.ly.com/md/dists/module/lightnote.html')">点亮记录 
					<i><img src="../../module/train/images/arrow.png"/></i>
					
				</span>
			</p>
			<!--<p class="indec borderbottom">{{state.hbway}}</p>-->
			<list v-for='item in list' :train-list='item' :state='state'></list>
		</div>

		<rule></rule>
		<laye :state='state'></laye>
		<!--loading组件-->
		<loading v-show="loading"></loading>
		<!--错误组件-->
		<errors :errors='errors'></errors>
	</div>
</template>

<script>
	import list from 'components/train/list'
	import rule from 'components/train/rule'
	import top from 'components/train/top'
	import laye from 'components/train/laye'
	import loading from 'components/train/loading'
	import errors from 'components/train/errors'
	export default {
		name: 'app',
		components: {
			list,
			top,
			rule,
			laye,
			loading,
			errors,
		},
		data: function() {
			return {
				mobile: '1', //电话号码
				memberId: '',
				loading:true,
//				错误状态
				errors: {
                        text: '网络未开启<br>检查网络设置',
                        state: '', // 0接口错误  ，1 网络问题 ，2 正常
                        serverText: '加载失败<br>再试一下'
                   },
				state: {
					show: false, //领取成功显示状态
					notrain: false, //附近没有火车站
					light: true,//弹框是否显示
					adressbtn:true,//定位按钮是否显示
					isTC: window._tc_bridge_public.isTc, //判断是否是同程
					train: '', //弹框火车站
					linghttime:"",//点亮时间
					loc: false, //定位状态
					info: '前往设置', //文案
					topinfo: '尚未开启定位，前往手机系统设置', //头部未开启文案
					tranintext:"你已成功点亮",
				},
				list: [],
				adressinfo: {
					lon: '', //精度
					lat: '', //维度
					cityId: '', //城市ID
				},
			}
		},
		created: function() {
			window._tc_bridge_public.ajaxUrl = '//appnew.ly.com/md/RainbowHandler.ashx';
			var self = this;
			setTimeout(() => {
//							禁止滚动
								window._tc_bridge_util.set_webview_info({
									"param": {
										"tagname": "webview",
										"webview": {
											"dragAble": "false"
										}
									}
								}); 
				//				头部分享
				window._tc_bridge_bar.set_navbar({
					param: {
						left: [{
							tagname: "tag_click_back"
						}],
						center: [{
							tagname: "title",
							value: '点亮火车站'
						}],
//						right: [{ tagname: "tag_click_rule", value: "点亮记录" }]
					},
					callback: function(data) {
						if(data.tagname == "tag_click_back") {
							window.location.href = "http://shouji.17u.cn/internal/common/close";
						} else if(data.tagname == "tag_click_rule") {
//							jump('http://10.101.56.1:8091/module/lightnote.html')
							//							location.href="http://10.101.56.1:8091/module/lightnote.html"
						}

					}
				});

			}, 0);
			self.login();
		},
		methods: {
			//		    登陆判断
			login: function(callback) {
				var self = this;
				if(self.state.isTC) {
					_tc_bridge_user.user_login({
						param: {},
						callback: function(data) {
							if(data.CBData != undefined) {
								data = JSON.parse(data.CBData);
								if(data.status == 0) {
									self.memberId = data.memberInfo.memberId;
									self.mobile = data.memberInfo.mobile;
									self.type = self.getQueryString(window.location.search, "type");
									self.getadressinfo();
									self.train();
								} else {
									location.href = 'tctclient://homepage/homePage';
									//																location.reload();
								}
							}
						}
					})
				}
				//不是同城客户端
				else {
				}
//				self.train();
			},
			getQueryString: function(url, key) {
				var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
				url = decodeURIComponent(url);
				var r = url.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			},
			//								获取定位
			getadressinfo: function(num) {
				var self = this;
				_tc_bridge_map.app_location({
					param: {
						showType: "1",
						cacheType: "2",
						changeCallBack: 'true'
					},
					callback: function(data) {
						data = JSON.parse(data.CBData);
						//alert(JSON.stringify(data.locationInfo.lon));
						if(data.locationInfo.lon == undefined) {
							self.state.loc = true;
						} else {
							self.state.loc = false;
						}
						//					    	alert(JSON.stringify(data.locationInfo));
						self.adressinfo.lon = data.locationInfo
							.lon || '0';
						self.adressinfo.lat = data.locationInfo
							.lat || '0';
						self.adressinfo.cityId = data.locationInfo.cityId || '0'
						if(num == 1) {
							self.state.info = "立即刷新";
						}
						self.train();
						//					        alert(JSON.stringify(self.adressinfo));
					}
				})
			},
//			跳转
			jump() {
				location.href="http://10.101.56.1:8021/module/lightnote.html"+'?tcwvcnew'
			},
			//调取数据接口
			train: function() {
				var self = this;
				//						alert(self.state.loc);
				var jsonObj = {
					"param": {
						"servicename": 'lts_light_station', // 获取产品信息
						"interfaceid": "marketingactivityapi.lts_light_station", //For H5 服务容器客户端使用
//						"requrl": 'https://tcmobileapitest1.17usoft.com/marketingactivityaccess/api',
						"requrl": 'http://tcmobileapi.qa.17usoft.com/marketingactivityaccess/api',
						"reqbody": {
							param: {
								"memberId": 'b7187b0cf182bbaac7fbfbc14b763e22',
//								"memberId": '225342483',
//								"clearTxt": '1',
//								"memberId":self.memberId,
//								"mobile": "13812787413",
																	       "mobile":self.mobile,
																	        "cityId":self.adressinfo.cityId,
//								"cityId": "226",
//								"lon": "120.61727",
//								"lon": "120.649769",//苏州北
																	    "lon":self.adressinfo.lon,
//								"lat": "31.335954",
//								"lat": "33.427437",
																	       "lat":self.adressinfo.lat,
								"type": self.type || '0'

							},
						},
						"iscache": "0" //接口是否缓存 0：不缓存 1：缓存
					},
					"callback": function(data) {

						data = ({}).toString.call(data.CBData) == "[object Object]" ? data.CBData : JSON.parse(data.CBData);
//						alert(JSON.stringify(data));
						var dataHeader = data.response.header || {},
							dataBody = data.response.body || {};
							setTimeout(() => {
							   	 self.loading=false;
							   },1100)
						
							
						if(dataHeader.rspCode == '0000') {
							self.$store.store.state.laye = true;
							self.state.adressbtn=false;
							self.state.topinfo = "稍后点亮到达站，领取今日全部福利";
							self.list = dataBody.prizeList;
							self.state.train = dataBody.stationInfo.station + '火车站';
							self.state.linghttime=dataBody.stationInfo.lightTime;
							//							未点亮
							if(dataBody.stationInfo.lightType == '1') {
								self.state.adressbtn=false;
								self.state.notrain = true;
								self.state.topinfo = "稍后点亮到达站，领取今日全部福利";
								self.state.tranintext="你已成功点亮";
							}
							if(dataBody.stationInfo.lightType == '2') {
								self.state.adressbtn=false;
								self.state.notrain = false;
//								self.state.topinfo = "您今日已点亮2次，改天再来吧";
								self.state.tranintext="你已成功点亮"
							}
							
						} else if(dataBody.resCode == "311") {
							//									附近没有火车站

							self.state.notrain = true;
							self.state.train = '火车站';
							//									开启定位
							if(self.state.loc != true) {
								self.state.topinfo = "3km范围暂无可点亮火车站，刷新定位再试试吧";
								self.state.info = "立即刷新"

							}
//							未点亮
							if(dataBody.data.stationInfo.lightType == '-1') {
								self.list = dataBody.data.prizeList;
								self.state.light=false;
								self.state.show = true; //有领取
							} else {
								self.state.show = false; //否领取
								self.list = dataBody.data.allPrizeList;
							}

						} else if(dataBody.resCode == "300") {
                            setTimeout(() => {
							   	 self.loading=true;
							   },1100)
						}else if(dataBody.resCode == "401") {
                            setTimeout(() => {
							   	 self.loading=true;
							   },1100)
						}
						else if(dataBody.resCode == "502") {
							//一天一个车站只能领一次
							self.state.light = true;
							self.state.adressbtn=false;
							self.state.notrain = true;
							self.state.topinfo = "稍后点亮到达站，领取今日全部福利";
							self.state.tranintext="你已成功点亮过";
							self.list = dataBody.data.prizeList;
							self.state.train = dataBody.data.stationInfo.station + '火车站';
							self.state.linghttime= '';

						} else if(dataBody.resCode == "501") {
							//点亮过2次火车站
							self.state.light = true;
							self.state.adressbtn=false;
							self.state.notrain = true;
							self.state.topinfo = "您今日已点亮2次，改天再来吧";
							self.state.tranintext="你已成功点亮过"
							self.list = dataBody.data.prizeList;
							self.state.train = dataBody.data.stationInfo.station + '火车站';
							self.state.linghttime= '';
							if(dataBody.data.stationInfo.lightType == '-1') {
								self.state.tranintext="你无法点亮"
								
							}

						} else {
							self.errorJudge(dataHeader.rspCode, self);
						}
					}
				}
				window._tc_bridge_util.get_data(jsonObj);
			},
			errorJudge: function(msg, self) {
				switch(msg) {
					case "55":
						self.errors.state = 1;
						return;
						break;
					case "77":
						self.errors.state = 1;
						return;
						break;
					case "88":
						self.errors.state = 0;
						return;
						break;
					default:
						self.errors.state = 0;
						break;
				}
			},

		}
	}
</script>

<style>
	.top .light {
		position: absolute;
		left: 23px;
		top: 33px;
		font-size: 18px;
		color: #FFF;
	}
	
	.top>img {
		width: 100%;
		height: 135px;
	}
	
	.top>h2 {
		position: absolute;
		left: 23px;
		top: 62px;
		font-size: 25px;
		font-weight: 600;
		color: #FFF;
		font-family: "微软雅黑";
	}
	
	.titleLp {
		width: 100%;
		min-height: 100px;
		margin-bottom: 20px;
	}
	
	.titleLp .title {
		width: 100%;
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		text-indent: 10px;
		background: #FFF;
		border-top-left-radius: 2px;
		border-top-right-radius: 2px;
		padding-top: 14px;
	}
	.titleLp .title .lightnote {
		font-size: 14px;
		color: #666;
		background: #FFF;
		float: right;
		padding-right: 15px;
	}
	.titleLp .title .lightnote>i{
		font-style: normal;
		font-family: "微软雅黑";
		color: #ccc;
	}
	.titleLp .title .lightnote i>img{
		width: 6px;
		height: 12px;
		position: relative;
		top: -1px;
	}
	.titleLp .indec {
		font-size: 12px;
		color: #999;
		background: #FFF;
		text-indent: 10px;
		padding: 4px 0 12px 0;
	}
	/*底部线*/
	
	.borderbottom {
		position: relative;
	}
	
	.borderbottom:after {
		content: '';
		position: absolute;
		left: 11px;
		bottom: 0;
		width: 94%;
		height: 1px;
		background-color: #e4e4e4;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5)
	}
	/*定位字段*/
	
	.locationinfo {
		width: 100%;
		height: 37px;
		background: #fff7dc;
		box-sizing: border-box;
		padding: 0 10px 0 16px;
	}
	
	.noinfo {
		color: #9a7126;
		font-size: 12px;
		width: 100%;
		height: 37px;
		line-height: 37px;
	}
	
	.setting {
		width: 70px;
		color: #666;
		font-size: 12px;
		height: 24px;
		text-align: center;
		line-height: 24px;
		float: right;
		margin-right: 10px;
		border: 1px solid #e4e4e4;
		border-radius: 2px;
		background: #FFF;
		position: absolute;
		right: 0px;
		top: 5px
	}
	/*蒙城弹框*/
	
	.layer {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.8);
	}
	
	.layer .inlayer {
		width: 320px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		background: #FFF;
		border-radius: 4px;
		padding-bottom: 20px;
	}
	
	.layer .rules {
		box-sizing: border-box;
		padding: 0 25px 30px 25px;
	}
	
	.layer .inlayer .light {
		position: absolute;
		top: 34px;
		left: 26px;
		font-size: 21px;
		color: #FFF;
	}
	
	.layer .inlayer .ruletitle {
		text-align: center;
		padding: 25px 0 20px 0;
		font-size: 18px;
		color: #333;
	}
	
	.layer .inlayer .rule {
		font-size: 14px;
		color: #333;
		margin-bottom: 16px;
	}
	
	.layer .layerpic {
		height: 200px;
		width: 100%;
		border-radius: 4px;
	}
	
	.layer .layerpic>img {
		height: 200px;
		width: 100%;
		border-radius: 4px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	
	.layer .layerTitle {
		position: absolute;
		top: 65px;
		left: 26px;
		font-size: 30px;
		color: #FFF;
		font-family: "微软雅黑";
		font-weight: bold;
	}
	
	.layer .layerdec {
		padding-top: 15px;
		text-align: center;
		font-size: 14px;
		color: #666;
	}
	
	.layer .layerdec1 {
		padding-top: 2px;
		text-align: center;
		font-size: 14px;
		color: #666;
	}
	
	.layer .look {
		width: 150px;
		height: 34px;
		border-radius: 99px;
		background: #FF5346;
		text-align: center;
		line-height: 33px;
		font-size: 18px;
		color: #FFF;
		margin: 10px auto 0;
	}
	
	.close {
		position: absolute;
		right: 0;
		top: -63px;
		width: 30px;
	}
	@media screen and (max-width: 359px) {
	 .noinfo{
		font-size: 10px;
	}
	 .layer .inlayer{
		width: 280px;
	}
	 .layer .rules{
		padding: 0 25px 6px 25px;
	}
	 .layer .layerTitle{
		font-size: 20px;
	}
	 .layer .inlayer .ruletitle{
		font-size: 14px;
	}
	 .close{
		top: -50px;
	}
}
</style>