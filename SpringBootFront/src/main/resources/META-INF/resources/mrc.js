$(document).ready(function () {


	var entity_url="";
	var jsonShow=[];
	indexOfClick=1;
	clickAnswer=function(i){
		console.log(i);
		console.log(entity_url);
		console.log(jsonShow);
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
//		$("#answer").empty();
		//首先加上问题
		$("#answer").append('<div class="st-message-wrap ask"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
				+query+'</div></div></div>');


		var question = {"question": query};
		console.log(query);
		$.ajax({
//			type: 'POST',
//			url: address + "/template",
			type: 'GET',
			url:  "document.json",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify(question),
			success: function (result) {
				console.log(result);
				result=result[query];
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
						var context=dataJson.context;
						var showContext='<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message">'
							+"<div class='st-outline' style='font-size:16px'>";
						entity_url=jsonShow.Id;
						for(var i=0;i<context.length;i++){
							if(i==(dataJson.answer_start)){

								showContext+='<a onclick=clickAnswer('+indexOfClick+') style="color:red;cursor:pointer">';
								console.log(showContext)

							}
							showContext+=context[i];
							if(i==(dataJson.answer_end)){
								showContext+="<img src='assets/img/unfold.png' alt='more details' title='more details' id='entitydetail"+indexOfClick+"'></img>";
								showContext+='</a>';
								console.log(i)

							}
						
						}
						showContext+="</div>";

						$("#answer").append('<div>'+showContext+'</div></div></div>');
						$("#answer").append("<div style='clear:both;margin-bottom:20px;'></div>");
						//entity

						for (var i = 0; i < jsonShow.length; ++i) {
							console.log(i);
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
					$("#answer").append("<p>" + result.error_msg + "</p>");
				}

			},
			error: function (result) {
				$("#answer").append("connection failed");

			}
		});
	});
});