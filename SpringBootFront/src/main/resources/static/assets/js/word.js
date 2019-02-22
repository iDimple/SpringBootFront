$(document).ready(function(){

	var afterUrl =  window.location.href;
	console.log(afterUrl);
	var afterEqual = afterUrl.split("?id=");;
	console.log(afterEqual[1]);



	$("#answer").empty();


	$.ajax({
		type: 'GET',
		url:  "b.json",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (result) {

			var json = result;
			if ($.isEmptyObject(json) || json === []) {
				$("#answer").append("<p>don't know</p>");
			} else {
				displayEntity(json);
				Prism.highlightAll();
			}          
		},
		error: function (result) {
			$("#answer").append("<p>" + result + "</p>");
		}
	});

});