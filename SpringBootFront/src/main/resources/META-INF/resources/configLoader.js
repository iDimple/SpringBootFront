var address="";
var baseUrl="";
$(document).ready(function () {
	$.ajax({
		type: 'GET',
		url:  "config.json",
		async:false,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (result) {
			
			address=result.baseURL;
			baseUrl=result.SQARQLURL;
		},
		error: function (result) {
			console.log("config load error")
		}
	});
});
