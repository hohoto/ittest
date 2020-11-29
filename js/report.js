var chart = Highcharts.chart('report-chart', {
	chart: {
		type: 'pie',
		options3d: {
			enabled: true,
			alpha: 45
		}
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
	plotOptions: {
		pie: {
			innerSize: 100,
			depth: 45
		}
	},
	series: [{
		name: '货物金额',
		data: [
			['在用', 8],
			['闲置', 3],
			['占用', 1],
			['维修中', 6],
			['清理报废', 8]
		]
	}]
});