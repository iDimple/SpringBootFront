$(document).ready(function(){
	var baseUrl="http://202.120.40.28:4460/data/query";

	var editor=CodeMirror.fromTextArea(document.getElementById("sparqlcode"),{
		mode:"application/sparql-query",   
		lineNumbers:true
	});










	$("#yunxing").click(function(){
	$("#imgYX").attr("src","assets/img/loading1.gif");
		getCMD();
	});
	getCMD=function (){
		var cmd=editor.getValue();;
		console.log(cmd);


		init(cmd);
	}




	
	

	var dataTable;

	function init(cmd){
		

		$.ajax({
			type:"POST",
			contentType : 'application/x-www-form-urlencoded',
			url:baseUrl,
			data:	{"query":cmd},
			success : function(resdata) {
				$("#imgYX").attr("src","assets/img/yunxing.png");
				//请求成功后 如果存在datatable结构销毁
				if(dataTable){
			
					dataTable.destroy(); 
					$("#dataTable").empty();
				}


				var colsDef = [];//定义表头列名

				var obj = resdata.head.vars;//获取表头列名List
			
				var tableData = resdata.results.bindings;//获取table数据
				var cols = obj.length;
				var colsDef=[];
				if(cols>0){
					for(var i=0;i<cols;i++){ //这里遍历后台返回的字段信息集合
						var item={title:obj[i]};
						colsDef.push(item);
					}
					console.log(colsDef);
				}

				var tableDataArray=[];
			
				if(tableData.length>0){
					for(var i=0;i<tableData.length;i++){
						var tableItem=tableData[i];
						var item=[];
						for(var j=0;j<cols;j++){
						
						
							item.push(tableItem[obj[j]]["value"]);
						}
						tableDataArray.push(item);
					}
				}
				
				//datatable初始化
				dataTable = $('#dataTable').DataTable({
					"ordering": false,
					"info": true,
					"bLengthChange": false,
					"iDisplayLength":10,
					"bFilter": true,
					"retrieve": true,
					"processing": true,
					"scrollX": true,
					"fixedColumns": true,
					"bScrollAutoCss": true,
					 "destroy": true,
					"language": {
						"search": "过滤：",
						"lengthMenu": "每页 _MENU_ 条记录",
						"loadingRecords": "请等待，数据正在加载中......",
						"zeroRecords": "没有找到记录",
						"info": "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条，第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
						"infoEmpty": "没有数据",
						"infoFiltered": "(从 _MAX_ 条数据中检索)",
						"oPaginate": {
							"processing": "正在查询中...",
							"sFirst": "首页",
							"sPrevious": "前一页",
							"sNext": "后一页",
							"sLast": "尾页"
						}
					},
					data:tableDataArray,
					columns: colsDef

				});

			},
			error: function () {
				$("#imgYX").attr("src","assets/img/yunxing.png");
				alert("请求失败");
			}
		});
	}
});