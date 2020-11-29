var REPORT = {
  init: function () {
    template.helper('percent', function (a, b) {
      return Math.round((parseFloat(a) / b) * 100)
    })
    this.load()
    return this
  },
  load: function () {
    var _this = this
    $.ajax({
      url: window.ITM.restDomain + '/report/groupByStatus',
      type: 'post',
      dataType: 'json',
      data: {},
      success: function (e) {
        _this.chart(e)
        _this.list(e)
      },
      error: function () {
        _this.chart()
        _this.list()
      },
    })
  },
  list: function (data) {
    if (!data) {
      data = { 在用: 18, 闲置: 20, 占用: 33, 维修: 16, 处置: 10 }
    }
    var sum = 0
    for (var i in data) {
      sum += data[i]
    }
    $('#reportList').html(template('reportList_tpl', { data: data, sum: sum }))
    var texts = $('.perent-text')
    console.log(texts)
    texts.each(function () {
      $(this).siblings('.percent').animate({
        width: $(this).text(),
      },1600)
    })
  },
  chart: function (data) {
    if (!data) {
      data = { 在用: 18, 闲置: 20, 占用: 33, 维修: 16, 处置: 10 }
    }

    var chart = Highcharts.chart('report-chart', {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
        },
      },
      colors: ['#575af3', '#B37AFC', '#FF8738', '#FF6678', '#666'],
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      tooltip: {
        style: {
          fontSize: 14,
        },
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45,
        },
      },
      series: [
        {
          name: '',
          data: [
            ['在用', data['在用']],
            ['闲置', data['闲置']],
            ['占用', data['占用']],
            ['维修中', data['维修']],
            ['清理报废', data['处置']],
          ],
        },
      ],
    })
  },
}.init()
