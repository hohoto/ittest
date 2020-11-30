approval();

function approval() {
	var AllList;
	var strhtml ='';
	$.ajax({ //jQuery方法，此处可以换成其它请求方式
		url: "http://47.103.65.135:8982/search/getAllList",
		type: "get",
		processData: false, //不去处理发送的数据
		contentType: false, //不去设置Content-Type请求头
		success: function(date) {
			AllList = date.tCenterResourceList;
			if (AllList.length != 0) {
				for (var i = 0; i < AllList.length; i++) {
					var status = '闲置'
					var resourceId = AllList[i].resourceId;
					var resourceName = AllList[i].resourceName;
					var resourceCode = AllList[i].resourceCode;
					var resourceType = AllList[i].status;
					var spec = AllList[i].spec;
					var liocation = AllList[i].liocation;
					var keeperName = AllList[i].keeperName;
					var responsibilityCenter = AllList[i].responsibilityCenter;
					if(resourceType == 10){
						status = '闲置';
					}else if(resourceType == 20){
						status = '占用';
					}else if(resourceType == 30){
						status = '在用';
					}else if(resourceType == 40){
						status = '维修';
					}else if(resourceType == 50){
						status = '处置';
					}
					strhtml += '<div class="mt15 assets-list" style="height: 6.333333rem;width: auto;">';
					strhtml += '<div class="assets-img">';
					strhtml += '<img src="./images/computer.jpg" alt="" />';
					strhtml += '<div class="tag" id="status">'+status+'</div>';
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
					strhtml += '<div class="mt20 mr10 fr">'
					strhtml += '<a href="" class="it-btn">复制资产</a>'
					strhtml += '<a href="" class="it-btn ml10">处理记录</a>'
					strhtml += '<a href="" class="it-btn blue ml10">资产管理</a>'
					strhtml += '</div>'
					strhtml += '</div>'
					strhtml += '</div>'
				}
			}
			$("#all").html(strhtml);
			$("#add").click(function() {
				var data = $("form").serialize();
				
				alert(data);
				$.ajax({
					url:"http://47.103.65.135:8982/user/apply",
					type:"get",
					data:JSON.stringify(data),
					dataType:"json",
					contentType: "application/json; charset=utf-8",
					sucess:function(data){
					  alert(data);
					  alert("添加成功!");
					},
					error:function(){
					  alert("请求出错！");
					}
				})
			});
		}
	});
}
