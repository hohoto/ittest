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
			['在用', 18],
			['闲置', 20],
			['占用', 33],
			['维修中', 16],
			['清理报废', 10]
		]
	}]
});