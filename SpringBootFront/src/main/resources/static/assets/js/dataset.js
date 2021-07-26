$(document).ready(function(){

  
	
	var editor=CodeMirror.fromTextArea(document.getElementById("sparqlcode"),{
		mode:"application/sparql-query",   
		lineNumbers:true
	});

$("#queryResult").hide();


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
			beforeSend: function(request) {
				request.setRequestHeader("Authorization", "Basic dXNlcjpBZG1pbkBzZTE0MDU=");
			},
			success : function(resdata) {
				$("#imgYX").attr("src","assets/img/yunxing.png");
				$("#queryResult").show();
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
						"search": "search:",
						"loadingRecords": "loading......",
						"zeroRecords": "No Records",
						"info": "Showing  _START_ to  _END_ of _TOTAL_ entries",
						"infoEmpty": "Find Nothing",
						"oPaginate": {
							"processing": "searching...",
							"sFirst": "First",
							"sPrevious": "Previous",
							"sNext": "Next",
							"sLast": "Last"
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