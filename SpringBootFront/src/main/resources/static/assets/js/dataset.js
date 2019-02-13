$(document).ready(function(){
	var baseUrl="http://202.120.40.28:4460/data/query";

	getCMD=function (){
		var cmd=document.getElementById("myTextbox");
		
		getASC(cmd.value);
	}
	
	function getASC(cmd){
		$.ajax({
			type:"POST",
			contentType : 'application/x-www-form-urlencoded',
			url:baseUrl,
			data:	{"query":cmd},
			success:function(result){
				console.log(result)
			},
			error:function(err){
				console.log(err);
			}
		});
	}
	
	$("#queryresultTable").bootstrapTable({
		method: 'get',
		url:"../a.json",
		pageNumber: 1, //初始化加载第一页，默认第一页
		pagination:true,//是否分页
		sidePagination:'server',//指定服务器端分页
		pageSize:5,//单页记录数
		pageList:[5,10],//分页步进值
		showRefresh:false,//刷新按钮
		clickToSelect: true,//是否启用点击选中行
		toolbarAlign:'right',//工具栏对齐方式
		queryParams : function(params) {
			return {
				offset: params.offset+1,
				pageSize: params.limit,
				fileName:$("#fileName").val(),
				severity:$("#severity").val(),
				type:$("#type").val()
			};
		},
		columns:[
			{
				title:'p',
				field:'p',
				sortable:true
			},
			{
				title:'o',
				field:'o',
				sortable:true
			}
			
			],
			locale:'zh-CN',//中文支持,
			responseHandler:function(res){
				//在ajax获取到数据，渲染表格之前，修改数据源
				return res;
			}
	})
	

	function tableHeight(){
		//可以根据自己页面情况进行调整
		return $(window).height() -280;
	}
	//根据窗口调整表格高度
	$(window).resize(function() {
		$('#mytab').bootstrapTable('resetView', {
			height: tableHeight()
		})
	})
});