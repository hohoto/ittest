approval();

function approval() {
	var SPUList;
	var AllList;
	var showAllList = new Array();
	var strhtml ='';
	$.ajax({
		url: "http://47.103.65.135:8982/search/getAllList",
		type: "get",
		processData: false, //不去处理发送的数据
		contentType: false, //不去设置Content-Type请求头
		success: function(date) {
			AllList = date.tCenterResourceList;
			for(var j=0;j<AllList.length;j++){
				if(AllList[j].status == 10){
					showAllList.push(AllList[j]);
				}
			}
			if (showAllList.length != 0) {
				for (var i = 0; i < showAllList.length; i++) {
					var resourceId = showAllList[i].resourceId;
					var resourceName = showAllList[i].resourceName;
					var resourceCode = showAllList[i].resourceCode;
					var spec = showAllList[i].spec;
					var liocation = showAllList[i].liocation;
					var keeperName = showAllList[i].keeperName;
					var responsibilityCenter = showAllList[i].responsibilityCenter;

					strhtml += '<div class="mt15 assets-list" style="height: 6.333333rem;width: auto;">';
					strhtml += '<div class="assets-img">';
					strhtml += '<img src="./images/computer.jpg" alt="" />';
					strhtml += '<div class="tag">闲置</div>';
					strhtml += '</div>';
					strhtml += '<div class="info">';
					strhtml += '<div class="title">电脑</div>';
					strhtml += '<div class="mt5 font13" >' + resourceId + '</div>';
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
					strhtml += '<span class="ml15 black place">' + responsibilityCenter + ' | ' + keeperName + '</span>'
					strhtml += '</div>'
					strhtml += '<div class="mt10 bor-t">'
					strhtml += '<div class="mt10 fr">'
					strhtml += '<a class="it-btn" id="insert" onclick="linyong()" style="text-align: center;" resourceId="'+resourceId+'" resourceCode="'+resourceCode+'">确认选择</a>'
					strhtml += '</div>'
					strhtml += '</div>'
					strhtml += '</div>'
				}
			}
			$("#ling").html(strhtml);
		}
	});
}
function linyong(){
	var resourceIds = $("#insert").attr("resourceId");
	var resourcecCodes = $("#insert").attr("resourceCode");
	var ser = $("form").serialize();
	ser += "&resourceid=" + resourceIds;
	
	var nowDate = new Date();
					var day = nowDate.getDate();
	                var month = nowDate.getMonth() + 1;//注意月份需要+1
	                var year = nowDate.getFullYear()
	                var date1 = year + '-' + month + '-' + day;
	
	ser += "&datenow1=" + date1;
	ser += "&ApplyType=" + "32";
	$.get("http://47.103.65.135:8982/user/apply", ser, function(rel) {
		if (rel.result > 0) {
			alert("新增成功");
		} else {
			alert("新增失败");
		}
	}, "json")
	approval();
}
