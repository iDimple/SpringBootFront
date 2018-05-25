$(document).ready(function () {
	var baseUrl="http://139.219.66.203:8088";
	//var baseUrl="http://localhost:8088";
	/**

	 *paramStr:name=name&type=type...

	 *keyList;[name,key,...]

	 */

	function getValue(paramStr,keyList){

		var valueList=[];

		paramStr=paramStr.split("&");

		for(var i=0;i<paramStr.length;i++){

			var value=paramStr[i];//name=name

			value=unescape(value.split("=")[1]);//name

			valueList.push(value);

		}

		return valueList;

	}
	//var paramStr=window.location.href.split("?")[1];
	//var params=getValue(paramStr,["groupId","groupName","projectId","projectName"]);
	//$("#projectName").html(params[3]);
	var projectKey="testormytestproject";
	
	deleteRule=function (obj){
		//js转换成jquery
		var thisObj=$(obj);
		thisObj.parent().html("");
		$.ajax({
			type:"DELETE",
			url:baseUrl+"/staticCheck/customRule/"+projectKey,
			async:true,
			success:function(result){
				
				
				},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		});
	}
	$("#uploadfile").fileinput({
		language: 'zh', //设置语言
		uploadUrl: baseUrl+"/staticCheck/customRule/"+projectKey, //上传的地址
		allowedFileExtensions: ['jar'],//接收的文件后缀
		uploadAsync: true, //默认异步上传
		showUpload: true, //是否显示上传按钮   
		showRemove : true, //显示移除按钮
		showPreview : true, //是否显示预览
		showCaption: false,//是否显示标题
		browseClass: "btn btn-primary", //按钮样式     
		dropZoneEnabled: false,//是否显示拖拽区域
		maxFileCount: 1, //表示允许同时上传的最大文件个数
		enctype: 'multipart/form-data',
		validateInitialCount:true
	});
	//异步上传返回结果处理
	$("#uploadfile").on("fileuploaded", function (event, data, previewId, index) {
		var response = data.response;
		console.log(response.filePath); 
		//显示在已有自定义规则
		$("#customRuleSelected").append("<div>"+response.filePath+'<img src="assets/img/delete.png" alt="删除" style="cursor:pointer;"  onclick="deleteRule(this)"></div>');
	});
	//上传前
	$('#uploadfile').on('filepreupload', function(event, data, previewId, index) {
		var form = data.form, files = data.files, extra = data.extra,
		response = data.response, reader = data.reader;
	});

	function toaster(message, type) {
		var toaster = $("#toaster");
		toaster.append('<div class="toast-item"><div class="message">' + message + '</div>' +
		'<i class="close fa fa-close"></i></div>');
		var thisItem = toaster.children().last();
		$(thisItem.children(".close").eq(0)).bind("click", function () {
			thisItem.slideUp(function() {
				//thisItem.remove();
			});
		});
		if (type == "success") thisItem.addClass("success");
		else if (type == "error") thisItem.addClass("error");
		thisItem.fadeIn();
		setTimeout(function() {
			thisItem.slideUp(function() {
				//	thisItem.remove();
			});
		}, 3000);
	}

	function fillIndex(){
		$.ajax({
			type:"GET",
			url:baseUrl+"/staticCheck/statistic/"+projectKey,
			async:true,
			success:function(result){
				$("#lastTime").html(result.lastAnalyse);
				$("#health").html(result.healthDegree);
				$("#risk").html(result.riskIndex);
				$("#problemNo").html(result.unresolvedProblems);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		});
	}
	function fillData(){
		//填充参数
		$.ajax({
			type:"GET",
			url:baseUrl+"/staticCheck/config/"+projectKey,
			async:true,
			success:function(result){
				//$("#projectName").val(result.projectName);
				$("#branchSelec").selectpicker('val',result.projectName);
				$('#langSelec').selectpicker('val',result.language);
				$('#encodeSelec').selectpicker('val',result.sourceEncoding);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		});
	}
	function fillCustomRule(){
		$.ajax({
			type:"GET",
			url:baseUrl+"/staticCheck/customRule/"+projectKey,
			async:true,
			success:function(result){
				console.log("result");
				console.log(result);
				if(result==""||result==null){
					$("#customRuleSelected").html("");
				}
				else{
				$("#customRuleSelected").append("<div>"+result+'<img src="assets/img/delete.png" alt="删除" style="cursor:pointer;"  onclick="deleteRule(this)"></div>');
				}
					
				
				},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		});
	}
	fillIndex();
	fillData();
	fillCustomRule();
	getDetail=function (){
		$('#loading').show();
		$.ajax({
			type:"POST",
			url:baseUrl+"/staticCheck/statistic/"+projectKey,
			async:true,
			success:function(result){
				//请求完成，隐藏模态框
				$('#loading').hide();
				toaster("检查成功！","success");
				//在本窗口打开
				//window.location.href="detail.html?projectKey="+escape(projectKey);
				//在新窗口打开
				window.open("detail.html?projectKey="+escape(projectKey));
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				toaster("请先配置参数！","error");
				//请求完成，隐藏模态框
				$('#loading').hide();
			}
		});

	}

	$("#submitConfig").click(function(){
		//像后台传参
		$.ajax({
			type:"POST",
			contentType: "application/json",
			data:	JSON.stringify({
				"projectKey":projectKey,
				"projectName":$("#branchSelec").val(),
				"language":$("#langSelec").val(),
				"sourceEncoding":$("#encodeSelec").val()
			}),
			url:baseUrl+"/staticCheck/config",
			async:true,
			success:function(result){
				$("#paramConfig").modal('hide');  //手动关闭

			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
				$("#paramConfig").modal('hide');  //手动关闭

			}
		});
	});



});







