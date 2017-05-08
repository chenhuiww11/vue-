<template>
	<div id="app">
		<loading v-show="loading"></loading>
		<!--记录列表-->
		<div class="listnote" v-show="list.length!=''&&!loading">
			<ul class="list">
				<li v-for="(item,index) in list">
					<div class="raduis" :class="{raduis1:index=='0'}">
					</div>
					<div class="line" :class="{line1:index=='0'}">
					</div>
					<div class="trainname " :class="{trainname1:index=='0'}">
						{{item.station}}火车站
					</div>
					<div class="traintime">
						{{item.lightTime}}
					</div>
				</li>
			</ul>
		</div>
		<!--头部info-->
		<kongtai v-show="list.length=''&&!loading"></kongtai>
	</div>
</template>

<script>
	import kongtai from 'components/public/kongtai'
	import loading from 'components/train/loading'
	export default {
		name: 'app',
		components: {
			kongtai,
			loading,
		},
		data: function() {
			return {
				memberId: '',
				isTC: window._tc_bridge_public.isTc,
				list: [],
				loading:true,
			}
		},
		created: function() {
			var self = this;
			setTimeout(() => {
				//			禁止滚动
				//				window._tc_bridge_util.set_webview_info({
				//					"param": {
				//						"tagname": "webview",
				//						"webview": {
				//							"dragAble": "false"
				//						}
				//					}
				//				}); 
				//				头部分享
				window._tc_bridge_bar.set_navbar({
					param: {
						left: [{
							tagname: "tag_click_back"
						}],
						center: [{
							tagname: "title",
							value: '我的点亮记录'
						}],
					},
					callback: function(data) {
						if(data.tagname == "tag_click_back") {
							window.location.href = "http://shouji.17u.cn/internal/common/close";
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
				if(self.isTC) {
					_tc_bridge_user.user_login({
						param: {},
						callback: function(data) {
							if(data.CBData != undefined) {
								data = JSON.parse(data.CBData);
								if(data.status == 0) {
									self.memberId = data.memberInfo.memberId;
//									获取memberId后操作
									self.note();
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
			},
			getQueryString: function(url, key) {
				var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
				url = decodeURIComponent(url);
				var r = url.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			},
			//调取数据接口
			note: function() {
				var self = this;
				//						alert(self.state.loc);
				var jsonObj = {
					"param": {
						"servicename": 'lts_light_list', // 获取产品信息
						"interfaceid": "marketingactivityapi.lts_light_list", //For H5 服务容器客户端使用
						"requrl": 'https://tcmobileapitest1.17usoft.com/marketingactivityaccess/api',
						"reqbody": {
							param: {
								"memberId":self.memberId,
								
//								"memberId":"0f15fecb9a133b2c0dc28bf11cb18c06",

							},
						},
						"iscache": "0" //接口是否缓存 0：不缓存 1：缓存
					},
					"callback": function(data) {

						data = ({}).toString.call(data.CBData) == "[object Object]" ? data.CBData : JSON.parse(data.CBData);
						var dataHeader = data.response.header || {},
							dataBody = data.response.body || {};
						if(dataHeader.rspCode == '0000') {
							   self.list=dataBody.lightList;
							   setTimeout(() => {
							   	 self.loading=false;
							   },1000)
							}
					}
				}
				window._tc_bridge_util.get_data(jsonObj);
			},
			errorJudge: function(msg, self) {
				switch(msg) {
					case "55":
						self.error.state = 1;
						return;
						break;
					case "77":
						self.error.state = 1;
						return;
						break;
					case "88":
						self.error.state = 0;
						return;
						break;
					default:
						self.error.state = 0;
						break;
				}
			},

		}
	}
</script>

<style>
  .listnote{
  	width: 100%;
  	box-sizing: border-box;
  	padding: 12px 16px 0px 16px;
  	background: #FFF;
  }
  .listnote .list{
  	 overflow: hidden;
  }
  .listnote .list li{
  	position: relative;
  	height: 48px;
  	
  }
  .listnote .raduis{
  	width: 8px;
  	height: 8px;
  	border-radius:50%;
  	border: 2px solid #b3d2f8;
  	position: absolute;
  	top: 8px;
  	left: 2px;
  }
  .listnote .line{
  	width: 2px;
  	height:38px;
  	background:#b3d2f8;
  	position: absolute;
  	top: 20px;
  	left: 7px;
  }
  .listnote .raduis1{
  	width: 12px;
  	height: 12px;
  	left: 0px;
  }
  .listnote .line1{
  	height:36px;
  	top: 22px;
  }
   .listnote .trainname{
  	font-size: 16px;
  	color: #666;
  	margin-left: 26px;
  	padding-top: 2px;
  	
  }
  .listnote .trainname1{
  	font-size: 20px;
  	color: #333;
  	margin-left: 26px;
  	padding-top: 0px;
  }
   .listnote .traintime{
  	font-size: 12px;
  	color: #999;
  	position: absolute;
  	right: 0;
  	top: 8px;
  	font-family:arial;
  }
  .listnote .list li:last-child>.line{
  	display: none;
  	
  }
</style>