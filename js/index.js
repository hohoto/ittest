if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	var point_Width = 10
} else {
	var point_Width = 30
}
// var domWidth = document.documentElement.clientWidth
// if (domWidth > 1000) {
// 	var point_Width = 30
// } else {
// 	var point_Width = 10
// }


var INDEX = {
	load:function(){
		if(!USER.hasLogin()){
			window.location.href=window.ITM.jumpDomain+"login.html";
			return;
		}
		var user = USER.getUser();
		user.rolename = user.rolename || "管理员";
		var tplData = {
			user:user
		}
		$("#userInfo")[0].innerHTML = template("userInfo_tpl",tplData);
	},
	chart:function(data){
		if(!data){data={'在用':18, '闲置':20, '占用':33, '维修': 16, '处置': 10 }}
		 Highcharts.chart('money-chart', {
			chart: {
				type: 'column'
			},
			credits: {
				enabled:false
			},
			title: {
				text: ''
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				lineWidth :0,//去掉x轴线
				tickWidth:0,//去掉刻度
				categories: ['闲置', '在用', '借用', '维修', '处置']
			},
			legend: {
				enabled: false
			},
			tooltip: {
				headerFormat: '<span>{point.key}</span><table>',
				pointFormat: '<tr><td>{point.y}</td></tr>',
				footerFormat: '</table>',
				shared: true,
				shadow: false,
				backgroundColor: 'rgba(0,0,0,0.6)',
				borderRadius: 10,
				padding: 10,
				style: {
					"color": "rgba(255,255,255,0.9)",
					'font-family': 'PingFang-SC-Medium,PingFang-SC'
				},
				useHTML: true
			},
			yAxis: {
				labels: {
					enabled: false,
				},
				gridLineWidth: 0,
				title: {
					text: ''
				}
			},
			plotOptions: {
				series: {
					borderRadius: 5
				}
			},
			series: [{
				data: [data["闲置"], data["在用"], data["占用"], data["维修"], data["处置"]],
				color: {
					linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
					stops: [
						[0, '#E94E9A'],
						[1, '#E84769']
					]
				},
				pointWidth:point_Width
			}],
			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					// Make the labels less space demanding on mobile
					chartOptions: {
						yAxis: {
							labels: {
								align: 'left',
								x: 0,
								y: -2
							},
							title: {
								text: ''
							}
						}
					}
				}]
			}
		});
	},
	createMainChart:function(){
		var _this = this;
		$.ajax({
			url:window.ITM.restDomain + "/report/groupByStatus",
			type:"post",
			dataType:"json",
			data : {},
			success:function(e){
				_this.chart(e);
			},error:function(){
				layer.msg("网络异常！", {
					time: 2000
				});
				_this.chart();
			}
		})
	},
	init:function(){
		this.load();
		this.createMainChart();
		return this;
	}
}.init();