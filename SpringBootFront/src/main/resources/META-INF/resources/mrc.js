$(document).ready(function () {
//	转义
	function 	htmlEncodeByRegExp (str){  
		str=str.toString();
		var temp = "";
		if(str.length == 0) return "";
		temp = str.replace(/&/g,"&amp;");
		temp = temp.replace(/</g,"&lt;");
		temp = temp.replace(/>/g,"&gt;");
//		temp = temp.replace(/\s/g,"&nbsp;");
		temp = temp.replace(/\'/g,"&#39;");
		temp = temp.replace(/\"/g,"&quot;");
		console.log(temp);
		return temp;
	}
	//反转义
	function htmlDecodeByRegExp(str){  
		str=str.toString();
		var temp = "";
		if(str.length == 0) return "";
		temp = str.replace(/&amp;/g,"&");
		temp = temp.replace(/&lt;/g,"<");
		temp = temp.replace(/&gt;/g,">");
//		temp = temp.replace(/&nbsp;/g," ");
		temp = temp.replace(/&#39;/g,"\'");
		temp = temp.replace(/&quot;/g,"\"");
		return temp;  
	}
	var entity_url="";
	var jsonShow=[];
	indexOfClick=1;
	clickAnswer=function(i){

		$("#entity"+i).toggle();
		if($("#entitydetail"+i).attr("src")=="assets/img/fold.png"){
			$("#entitydetail"+i).attr("src","assets/img/unfold.png");
			$("#entitydetail"+i).attr("title","more details");
		}else{
			$("#entitydetail"+i).attr("src","assets/img/fold.png");
			$("#entitydetail"+i).attr("title","fold the details");
		}
	}


	$("#st-input-btn").click(function(){


		var he=$("#st-message-box")[0].scrollHeight;


		var query = $('#chat_input').val();
		$('#chat_input').val('');
//		$("#answer").empty();
		//首先加上问题，转义
		decodequery=htmlEncodeByRegExp(query);
		$("#answer").append('<div class="st-message-wrap ask"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
				+decodequery+'</div></div></div>');


		var question = {"question": query};
		console.log(query);
		$.ajax({
			type: 'POST',
			url: address + "/template",
//			type: 'GET',
//			url:  "document.json",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify(question),
			success: function (result) {
				console.log(result);
//				result=result[query];
				if (result.status === "success") {
					var json = result.data;
					if ($.isEmptyObject(json) || json === []) {
						$("#answer").append('<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
								+"Sorry, I don't know~");
						$("#answer").append('</div></div></div><div style="height:150px"></div>');	
					} else {
						jsonShow=json[0].entity;
//						$("#answer").append('<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
//						+"To best of my knowledge, below is the answer~");
//						$("#answer").append('</div></div></div><div style="height:150px"></div>');	
						var dataJson=json[0];
						var context=htmlEncodeByRegExp(dataJson.context);
						var showContext='<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message">'
							+"<div class='st-outline' style='font-size:16px'>";
						entity_url=jsonShow.Id;
						for(var i=0;i<context.length;i++){
							if(i==(dataJson.answer_start)){

								showContext+='<a onclick=clickAnswer('+indexOfClick+') style="color:red;cursor:pointer">';


							}
							showContext+=context[i];
							if(i==(dataJson.answer_end-1)){
								showContext+="<img src='assets/img/unfold.png' alt='more details' title='more details' id='entitydetail"+indexOfClick+"'></img>";
								showContext+='</a>';


							}

						}
						showContext+="</div>";

						$("#answer").append('<div>'+showContext+'</div></div></div>');
						$("#answer").append("<div style='clear:both;margin-bottom:20px;'></div>");
						//entity

						for (var i = 0; i < jsonShow.length; ++i) {

							displayEntity(jsonShow[i]);

//							$("#answer").append("<hr style='border: 1px solid lightgray;'>");
							$("#entity"+indexOfClick).css("padding-left","60px");
							$("#entity"+indexOfClick).hide();
							indexOfClick++;
						}

						Prism.highlightAll();


					}
//					if(he>499){
//					$("#st-message-box").scrollTop(he);
//					}
				} else {
//					$("#answer").append("<p>" + result.error_msg + "</p>");
					$("#answer").append('<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
							+"Sorry, I don't know~");
					$("#answer").append('</div></div></div><div style="height:150px"></div>');	
				}

			},
			error: function (result) {
				$("#answer").append("connection failed");

			}
		});
	});
});