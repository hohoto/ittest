approval();

function approval(){
	var approvalList;
	var strhtml = '';
	var showStatus;
	var showColor;
	$.ajax({//jQuery方法，此处可以换成其它请求方式
	    url: "http://47.103.65.135:8982/search/getApprovalList",
	    type: "get", 
	    processData: false,//不去处理发送的数据
		contentType: false,//不去设置Content-Type请求头
		success: function(date){
			approvalList = date.approval;
			if(approvalList.length != 0){
				for(var i = 0;i<approvalList.length;i++){
					var SPU_NAME = approvalList[i].SPU_NAME;
					var resourceId = approvalList[i].resourceId;
					var approvalName = approvalList[i].approvalName;
					var approvalType = approvalList[i].approvalType;
					var spec = approvalList[i].spec;
					var location = approvalList[i].location;
					var department = approvalList[i].department;
					if(approvalType == "31"){
						showStatus = "借用";
						showColor = '<div class="tag" style="background-color: #FD482C;">借用</div>';
					}else if(approvalType == "32"){
						showStatus = "申领";
						showColor = '<div class="tag" style="background-color: #00FF00;">申领</div>';
					}else if(approvalType=="61"){
						showStatus = "归还";
						showColor = '<div class="tag">申领</div>'
					}else if(approvalType=="41"){
						showStatus = "转移";
						showColor = '<div class="tag" style="background-color: #00FF00;">转移</div>';
					}else if(approvalType=="51"){
						showStatus = "投资";
						showColor = '<div class="tag" style="background-color: #60656E;">投资</div>';
					}else if(approvalType=="52"){
						showStatus = "出售";
						showColor = '<div class="tag" style="background-color: #60656E;">出售</div>';
					}else if(approvalType=="53"){
						showStatus = "抵债";
						showColor = '<div class="tag" style="background-color: #60656E;">抵债</div>';
					}else if(approvalType=="54"){
						showStatus = "丢弃";
						showColor = '<div class="tag" style="background-color: #60656E;">丢弃</div>';
					}else if(approvalType=="55"){
						showStatus = "报废";
						showColor = '<div class="tag" style="background-color: #60656E;">报废</div>';
					}
					strhtml += '<div class="mt15 assets-list">';
					strhtml += '<div class="assets-img">';
					strhtml += '<img src="./images/computer.jpg" alt="" />';
					strhtml += showColor;
					strhtml += '</div>';
					strhtml += '<div class="info">';
					strhtml += '<div class="title">'+SPU_NAME+'</div>';
					strhtml += '<div class="mt5 font13">' + resourceId + '</div>';
					strhtml += '<div class="mt5 font13 gray">' + approvalName + ' | ' + department + '</div>';
					strhtml += '</div>'
					strhtml += '<div class="mt15">'
					strhtml += '<span class="gray">规格型号</span>'
					strhtml += '<span class="ml15 black">' + spec + '</span>'
					strhtml += '</div>'
					strhtml += '<div class="mt10">'
					strhtml += '<span class="gray">存放地点</span>'
					strhtml += '<span class="ml15 black place">' + location +'</span>'
					strhtml += '</div>'
					strhtml += '<div class="mt10 bor-t">'
					strhtml += '<div class="mt10 fr">'
					strhtml += '<a class="it-btn" id="agree" style="text-align: center;" value='+resourceId+'>同意</a>'
					strhtml += '<a class="it-btn ml10" id="disagree" style="text-align: center;"value='+resourceId+'>不同意</a>'
					strhtml += '</div>'
					strhtml += '</div>'
					strhtml += '</div>'
				}
			}
			$("#approval").html(strhtml);
			$("#agree").click(function(){
				var resourceId = $("#agree").attr("value");
				$.ajax({
					url: "http://47.103.65.135:8982/DoApproval/approvalController",
					type: "post",
					data: {
						resourceId:resourceId,
						agreeStatus:2,
					},
					success: function(date){
						if(date.status == 1){
							alert("审批成功");
						}
						approval();
					},
					error: function (date) {
						alert("网络连接失败");
						approval();
					}
				});
			});
				
			$("#disagree").click(function(){
				var resourceId = $("#disagree").attr("value");
				$.ajax({
					url: "http://47.103.65.135:8982/DoApproval/approvalController",
					type: "post",
					data: {
						resourceId:resourceId,
						agreeStatus:3,
					},
					success: function(date){
						if(date.status == 2){
							alert("审批成功");
						}
						approval();
					},
					error: function (date) {
						alert("网络连接失败");
						approval();
					}
				});
				
			});
		},
	    error: function (date) {
			strhtml = '审批单加载失败';
	    }
	});
	
}
