$(document).ready(function () {


var entity_url="";
clickAnswer=function(){
	console.log(entity_url);
}


	$("#st-input-btn").click(function(){


		var he=$("#st-message-box")[0].scrollHeight;


		var query = $('#chat_input').val();
//		$("#answer").empty();
		//首先加上问题
		$("#answer").append('<div class="st-message-wrap ask"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
				+query+'</div></div></div>');


		var question = {"question": 'what are the effects of using "goto"?'};
		console.log(query);
		$.ajax({
			type: 'POST',
			url: address + "/template",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify(question),
			success: function (result) {
				
				if (result.status === "success") {
					var json = result.data;
					if ($.isEmptyObject(json) || json === []) {
						$("#answer").append('<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
								+"Sorry, I don't know~");
						$("#answer").append('</div></div></div><div style="height:150px"></div>');	
					} else {
						$("#answer").append('<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
								+"To best of my knowledge, below is the answer~");
						$("#answer").append('</div></div></div><div style="height:150px"></div>');	
						var dataJson=json[0];
						var context=dataJson.context;
						var showContext='<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message">'
							+"<div class='st-outline' style='font-size:16px'>";
						for(var i=0;i<context.length;i++){
							if(i==(dataJson.answer_start)){
								entity_url=dataJson.entity_url;
								showContext+='<a onclick=clickAnswer('+') style="color:red">';
								console.log(showContext)
							}
							if(i==(dataJson.answer_end)){
								showContext+='</a>';
								console.log(i)
							}
							showContext+=context[i];
						}
						showContext+="</div>";
						$("#answer").append('<div>'+showContext+'</div></div></div>');
					}
					if(he>499){
						$("#st-message-box").scrollTop(he);
					}
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