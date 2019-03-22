$(document).ready(function () {
	
	$("#st-input-btn").click(function(){
        var query = $('#chat_input').val();
//$("#answer").empty();
    //首先加上问题
$("#answer").append('<div class="st-message-wrap ask"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
		+query+'</div></div></div>');

		
        var question = {"question": query};
        $.ajax({
            type: 'POST',
            url: address + "/ordinarySearch",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(question),
            success: function (result) {
                if (result.status === "success") {
                    var json = result.data;
                    if ($.isEmptyObject(json) || json === []) {
                    	$("#answer").append('<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
                    			+"Sorry, I don't know~");
                    	$("#answer").append('</div></div></div>');	
                    } else {
                    	$("#answer").append('<div class="st-message-wrap answer"><div class="st-message-icon"></div><div class="st-message-r"></div><div class="st-message"><div class="st-outline">'
                    			+"To best of my knowledge, below is the answer~");
                    	$("#answer").append('</div></div></div><div style="height:150px"></div>');	
                        for (var i = 0; i < json.length; ++i) {
                            displayEntity(json[i]);
                            $("#answer").append("<hr style='border: 1px solid lightgray;'>");
                        }
                      
                        Prism.highlightAll();
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