$(document).ready(function () {
	function initProblemCons(){
		var myChart = echarts.init(document
				.getElementById('chart-area'));
		option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					x: 'right',
					data:['Bugs','Code Smells','Vulnerabilites']
				},
				series: [
					{
						name:'问题构成',
						type:'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {

							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						data:[
							{value:335, name:'Bugs'},
							{value:310, name:'Code Smells'},
							{value:234, name:'Vulnerabilites'}
							]
					}
					]
		};
		myChart.setOption(option);
		var bugChart = echarts.init(document
				.getElementById('chart-bug'));
		bugoption = {
				title: {
					text: '近期检查Bugs趋势图'
				},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'line'
				}]
		};
		bugChart.setOption(bugoption);
	}
	initProblemCons();
	function fillData(){
		//填充参数
		$.ajax({
			type:"GET",
			url:"http://localhost:8088/staticCheck/config/"+"Student",
			async:true,
			success:function(result){
				$("#projectName").val(result.projectName);
				$('#langSelec').selectpicker('val',result.language);
				$('#encodeSelec').selectpicker('val',result.sourceEncoding);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
			}
		});
	}
	fillData();
	//根据窗口调整表格高度
	$(window).resize(function() {
		$('#mytab').bootstrapTable('resetView', {
			height: tableHeight()
		})
	})

	function transfer(str){
		str=str.replace(/\//g, "%2F");
		str=str.replace(/\:/g, "%3A");
		return str;
	}

	function transferBlank(str){
		str=str.replace("/\ /g","%nbsp;");
		return str;
	}

	function showRule(row,result){
		//清空
		$("#codeArea").empty();
		console.log(result);
		//哪一行有问题
		var lineNo=row.lineNo;
		var code=result.code;
		//得到说明
		$.ajax({
			type:"GET",
			//contentType : 'application/json',
			url:"http://localhost:8088/staticCheck/rule/"+row.rule,
			//data:	{"key":row.filePath},
			success:function(result){
				console.log(result);
				for(var i=0;i<code.length-1;i++){
					if(lineNo==(i+1)){//背景是红色,
						$("#codeArea").append("<div class='problem-line'><span class='source-meta w-source-line-number'> "+(i+1)+"</span>"+code[i]+"</div><br />");
						//且在该行下面加上一些说明
						$("#codeArea").append("<div class='rule-area'>"+result.describ+"</div>");
						continue;
					}
					$("#codeArea").append("<span class='source-meta source-line-number'> "+(i+1)+"</span>"+code[i]+"<br />");
				}
			},
			error:function(err){}
		});	
	}

	window.getEvents={

			"click #checkButton":function(e,value,row,index){
				console.log(row);
				//获得代码显示
				$.ajax({
					type:"POST",
					//contentType : 'application/json',
					url:"http://localhost:8088/staticCheck/code",
					data:	{"key":row.filePath},
					success:function(result){
						showRule(row,result);
					},
					error:function(err){}
				});
			}
	};
	$("#codeCheckTable").bootstrapTable({
		method: 'get',
		url:"http://localhost:8088/staticCheck/problem/Student/VULNERABILITY",//要请求数据的文件路径
		//url:"http://localhost:8088/staticCheck/problem/Student/CODE_SMELL",
		//url:"http://localhost:8088/staticCheck/problem/Student/BUG",
		pageNumber: 1, //初始化加载第一页，默认第一页
		pagination:true,//是否分页
		sidePagination:'server',//指定服务器端分页
		pageSize:5,//单页记录数
		pageList:[5,10],//分页步进值
		showRefresh:true,//刷新按钮
		clickToSelect: true,//是否启用点击选中行
		toolbarAlign:'right',//工具栏对齐方式
		queryParams : function(params) {
			return {
				offset: params.offset+1,
				pageSize: params.limit,
			};
		},
		columns:[
			{
				title:'严重性',
				field:'severity',
				sortable:true
			},
			{
				title:'所在文件',
				field:'filePath',
				sortable:true
			},
			{
				title:'问题描述',
				field:'message'
			},
			{
				title:'问题类型',
				field:'type',
				sortable:true,
				cellStyle:{  
					css:{"background-color":"pink"}  
				}  ,
				visible:false
			},
			{
				title:'所在行数',
				field:'lineNo'
			},
			{
				title:'操作',
				field:'Button',
				formatter:function(value,row,index){
					return '<button id="checkButton" type="button" class="btn btn-info" data-toggle="modal" data-target="#detailProblem">点击查看</button> ';
				},
				events:getEvents
			}
			],
			locale:'zh-CN',//中文支持,
			responseHandler:function(res){
				//在ajax获取到数据，渲染表格之前，修改数据源
				return res;
			}
	})

	getDetail=function (){
		window.location.href="detail.html";
	}

	$("#submitConfig").click(function(){
		//像后台传参
		$.ajax({
			type:"POST",
			contentType: "application/json",
			data:	JSON.stringify({
				"projectKey":"Student",
				"projectName":$("#projectName").val(),
				"language":$("#langSelec").val(),
				"sourceEncoding":$("#encodeSelec").val()
			}),
			url:"http://localhost:8088/staticCheck/config",
			async:true,
			success:function(result){
				console.log(result);
				$("#paramConfig").modal('hide');  //手动关闭

			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(textStatus);
				$("#paramConfig").modal('hide');  //手动关闭

			}
		});
	});
	//$('#loading').show();
//	$.ajax({
//	type:"GET",
//	url:"http://localhost:8088/staticCheck/config/1",
//	async:true,
//	success:function(result){
//	console.log(result);
//	//请求完成，隐藏模态框
//	$('#loading').hide();
//	},
//	error:function(XMLHttpRequest, textStatus, errorThrown){
//	console.log(textStatus);
//	//请求完成，隐藏模态框
//	$('#loading').hide();
//	}
//	});
	//tableHeight函数
	function tableHeight(){
		//可以根据自己页面情况进行调整
		return $(window).height() -280;
	}

});


function toaster(message, type) {
	var toaster = $("#toaster");
	toaster.append('<div class="toast-item"><div class="message">' + message + '</div>' +
	'<i class="close fa fa-close"></i></div>');
	var thisItem = toaster.children().last();
	$(thisItem.children(".close").eq(0)).bind("click", function () {
		thisItem.slideUp(function() {
			thisItem.remove();
		});
	});
	if (type == "success") thisItem.addClass("success");
	else if (type == "error") thisItem.addClass("error");
	thisItem.fadeIn();
	setTimeout(function() {
		thisItem.slideUp(function() {
			thisItem.remove();
		});
	}, 3000);
}

function adminLightItem() {
	if ($("#admin-nav-items")) {
		var items = $("#admin-nav-items").children();
		for(var i = 0; i < items.length; i++) {
			var item = $(items[i]);
			var url = window.location.href;
			console.log(item.attr("url"));
			if (url.indexOf(item.attr("url")) != -1) {
				item.addClass("active");
				break;
			}
		}

	}
}

function datePicker() {
	try {
		$('.date-picker').each(function () {
			$(this).datetimepicker({
				lang:'ch',
				timepicker:false,
				format:'Y-m-d',
				formatDate:'Y/m/d',
				minDate: '1916/01/01',
				maxDate:'+1970/03/01',
				yearStart: 1916,
				yearEnd: 2016,
				scrollInput: false
			})
		});
	} catch (e) {
		console.log(e);
	}
}

function getWeek(day) {
	switch (day) {
	case 0: return '日';
	case 1: return '一';
	case 2: return '二';
	case 3: return '三';
	case 4: return '四';
	case 5: return '五';
	case 6: return '六';
	}
}

//Date 格式化
Date.prototype.Format = function(fmt) {
	var o = {
			"M+" : this.getMonth()+1,                 //月份
			"d+" : this.getDate(),                    //日
			"h+" : this.getHours(),                   //小时
			"m+" : this.getMinutes(),                 //分
			"s+" : this.getSeconds(),                 //秒
			"q+" : Math.floor((this.getMonth()+3)/3), //季度
			"S"  : this.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	return fmt;
};

