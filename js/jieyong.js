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

					
					strhtml += '<div class="mt15 assets-list" style="height: 6.333333rem;">';
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
					strhtml += '<a class="it-btn" id="add" style="text-align: center;">确认选择</a>'
					strhtml += '</div>'
					strhtml += '</div>'
					strhtml += '</div>'
				}
			}
			$("#jie").html(strhtml);
			$("#add").click(function() {
				var data = $("form").serialize();
				
				alert(data);
				$.ajax({
					url:"http://localhost:8982/user/apply",
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
