if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  var point_Width = 15
} else {
  var point_Width = 20
}

var INDEX = {
  load: function () {
    if (!USER.hasLogin()) {
      window.location.href = window.ITM.jumpDomain + 'login.html'
      return
    }
    var user = USER.getUser()
    user.rolename = user.rolename || '管理员'
    var tplData = {
      user: user,
    }
    $('#userInfo')[0].innerHTML = template('userInfo_tpl', tplData)
  },
  chart: function (data) {
    if (!data) {
      data = { 在用: 18, 闲置: 20, 占用: 33, 维修: 16, 处置: 10 }
    }
    //  Highcharts.chart('money-chart', {
    // 	chart: {
    // 		type: 'column'
    // 	},
    // 	credits: {
    // 		enabled:false
    // 	},
    // 	title: {
    // 		text: ''
    // 	},
    // 	subtitle: {
    // 		text: ''
    // 	},
    // 	xAxis: {
    // 		lineWidth :0,//去掉x轴线
    // 		tickWidth:0,//去掉刻度
    // 		categories: ['闲置', '在用', '借用', '维修', '处置']
    // 	},
    // 	legend: {
    // 		enabled: false
    // 	},
    // 	tooltip: {
    // 		headerFormat: '<span>{point.key}</span><table>',
    // 		pointFormat: '<tr><td>{point.y}</td></tr>',
    // 		footerFormat: '</table>',
    // 		shared: true,
    // 		shadow: false,
    // 		backgroundColor: 'rgba(0,0,0,0.6)',
    // 		borderRadius: 10,
    // 		padding: 10,
    // 		style: {
    // 			"color": "rgba(255,255,255,0.9)",
    // 			'font-family': 'PingFang-SC-Medium,PingFang-SC'
    // 		},
    // 		useHTML: true
    // 	},
    // 	yAxis: {
    // 		labels: {
    // 			enabled: false,
    // 		},
    // 		gridLineWidth: 0,
    // 		title: {
    // 			text: ''
    // 		}
    // 	},
    // 	plotOptions: {
    // 		series: {
    // 			borderRadius: 5
    // 		}
    // 	},
    // 	series: [{
    // 		data: [data["闲置"], data["在用"], data["占用"], data["维修"], data["处置"]],
    // 		color: {
    // 			linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    // 			stops: [
    // 				[0, '#E94E9A'],
    // 				[1, '#E84769']
    // 			]
    // 		},
    // 		pointWidth:point_Width
    // 	}],
    // 	responsive: {
    // 		rules: [{
    // 			condition: {
    // 				maxWidth: 500
    // 			},
    // 			// Make the labels less space demanding on mobile
    // 			chartOptions: {
    // 				yAxis: {
    // 					labels: {
    // 						align: 'left',
    // 						x: 0,
    // 						y: -2
    // 					},
    // 					title: {
    // 						text: ''
    // 					}
    // 				}
    // 			}
    // 		}]
    // 	}
    // });
    // { 在用: 18, 闲置: 20, 占用: 33, 维修: 16, 处置: 10 }
    var salvProName = ['处置', '维修', '占用', '闲置', '在用']
    var salvProValue = [30, 26, 33, 18, 20]
    var salvProMax = [100, 100, 100, 100, 100] //背景按最大值

    var myChart = echarts.init(document.getElementById('money-chart'))
    var options = {
      // backgroundColor: '#fff',
      grid: {
        left: '0%',
        right: '8%',
        bottom: '2%',
        top: '2%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
        backgroundColor: '#fff',
        borderColor: 'rgba(88, 85, 254, 1)',
        borderWidth: 1,
        padding: [10, 10],
        position: function (point, params, dom, rect, size) {
          // 固定在顶部
          return [point[0], '30%']
        },
        textStyle: {
          color: 'rgba(88, 85, 254, 1)',
        },
        formatter: function (params) {
          return params[0].name + ' : ' + params[0].value
        },
      },
      yAxis: {
        show: false,
        type: 'value',
      },
      xAxis: [
        {
          type: 'category',
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: salvProName,
        },
        {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '12',
            },
          },
          data: salvProValue,
        },
      ],
      series: [
        {
          name: '值',
          type: 'bar',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(232, 78 ,154,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(233, 78, 154, 1)',
                },
              ]),
            },
          },
          barWidth: point_Width,
          data: salvProValue,
        },
        {
          name: '背景',
          type: 'bar',
          barWidth: point_Width - 5,
          barGap: '-88%',
          data: salvProMax,
          itemStyle: {
            normal: {
              color: 'rgba(246, 223, 233, 1)',
              barBorderRadius: 30,
            },
          },
        },
      ],
    }
    myChart.setOption(options)
    // 页面改变，重新渲染
    window.onresize = function () {
      location.reload()
    }
  },
  createMainChart: function () {
    var _this = this
    $.ajax({
      url: window.ITM.restDomain + '/report/groupByStatus',
      type: 'post',
      dataType: 'json',
      data: {},
      success: function (e) {
        _this.chart(e)
      },
      error: function () {
        layer.msg('网络异常！', {
          time: 2000,
        })
        _this.chart()
      },
    })
  },
  init: function () {
    this.load()
    this.createMainChart()
    return this
  },
}.init()
