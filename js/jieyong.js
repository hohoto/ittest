approval();

function approval() {
	var AllList;
	var strhtml;
	$.ajax({ //jQuery方法，此处可以换成其它请求方式
		url: "http://localhost:8982/search/getAllList",
		type: "get",
		processData: false, //不去处理发送的数据
		contentType: false, //不去设置Content-Type请求头
		success: function(date) {
			AllList = date.tCenterResourceList;
			if (AllList.length != 0) {
				for (var i = 0; i < AllList.length; i++) {
					var resourceId = AllList[i].resourceId;
					var resourceName = AllList[i].resourceName;
					var resourceCode = AllList[i].resourceCode;
					var spec = AllList[i].spec;
					var liocation = AllList[i].liocation;
					var keeperName = AllList[i].keeperName;
					var responsibilityCenter = AllList[i].responsibilityCenter;

					strhtml += '<div class="mt15 assets-list">';
					strhtml += '<div class="assets-img">';
					strhtml += '<img src="./images/1.png+" alt="" />';
					strhtml += '<div class="tag">闲置</div>';
					strhtml += '</div>';
					strhtml += '<div class="info">';
					strhtml += '<div class="mt5 font13">' + resourceId + '</div>';
					strhtml += '<div class="mt5 font13 gray">' + resourceName + ' | ' + resourceCode + '</div>';
					strhtml += '</div>'
					strhtml += '<div class="mt15">'
					strhtml += '<span class="gray">规格型号</span>'
					strhtml += '<span class="ml15 black">' + spec + '</span>'
					strhtml += '</div>'
					strhtml += '<div class="mt10">'
					strhtml += '<span class="gray">存放地点</span>'
					strhtml += '<span class="ml15 black place">' + liocation + '</span>'
					strhtml += '</div>'
					strhtml += '<div class="mt10">'
					strhtml += '<span class="gray">负责人</span>'
					strhtml += '<span class="ml15 black place">' + responsibilityCenter + '| ' + keeperName + '</span>'
					strhtml += '</div>'
					strhtml += '<div class="mt10 bor-t">'
					strhtml += '<div class="mt10 fr">'
					strhtml += '</div>'
					strhtml += '</div>'
					strhtml += '</div>'
				}
			}
			$("#jie").html(strhtml);
			$("#add").click(function() {
				var ser = $("form").serialize();
				alert(ser);
				$.get("http://47.103.65.135:8982/itmatch/jieyong/apply", ser, function(rel) {
					if (rel > 0) {
						alert("新增成功");
					} else {
						alert("新增失败");
					}
				}, "json")
			});
		}
	});
}
