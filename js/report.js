
var REPORT = {
	init:function(){
		if(!USER.hasLogin()){
			window.location.href=window.ITM.jumpDomain+"login.html";
			return;
		}
		template.helper("percent",function(a,b){
			return Math.round(parseFloat(a)/b*100);
		})
		this.loadChart();
		this.loadNumber();
		return this;
	},
	loadChart:function(){
		var _this = this;
		$.ajax({
			url:window.ITM.restDomain + "/report/groupByStatus",
			type:"post",
			dataType:"json",
			data : {},
			success:function(e){
               _this.chart(e);
               _this.list(e);
			},error:function(){
				layer.msg("网络异常！", {
					time: 2000
				});
				_this.chart();
				_this.list();
			}
		});
	},
	loadNumber:function(){
		$.ajax({
			url:window.ITM.restDomain+"/pandian/queryPandianInfo",
			type:"post",
			dataType:"json",
			data:{},
			success:function(e){
				if(e && Object.keys(e).length){
				}else{
					e= {"dpdRwCount":0,"dpdZyCount":0};
				}
				$("#dpd").html(template("dpd_tpl",e));
			},error:function(){
				var e= {"dpdRwCount":0,"dpdZyCount":0};
      			$("#dpd").html(template("dpd_tpl",e));
				layer.msg("网络异常",{time:2000});
			}
		})
	},
	list:function(data){
		if(!data){data={'在用':18, '闲置':20, '占用':33, '维修': 16, '处置': 10 }}
		var sum = 0;
		for(var i in data){
			sum += data[i];
		}
		$("#reportList").html(template("reportList_tpl",{data:data,sum:sum}));
	},
	chart:function(data){

		if(!data){data={'在用':18, '闲置':20, '占用':33, '维修': 16, '处置': 10 }}

		var chart = Highcharts.chart('report-chart', {
		chart: {
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 45
			}
		},
		colors: ['#575af3', '#B37AFC', '#FF8738', '#FF6678', '#666'],
		credits: {
			enabled:false
		},
		title: {
			text: ''
		},
			subtitle: {
				text: ''
			},
			tooltip: {
				style: {
					fontSize: 14
				}
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
			}
		},
		series: [{
			name: '',
			data: [
				['在用', data["在用"]],
				['闲置', data["闲置"]],
				['占用', data["占用"]],
				['维修中', data["维修"]],
				['清理报废', data["处置"]]
			]
		}]
	});
	}
}.init();