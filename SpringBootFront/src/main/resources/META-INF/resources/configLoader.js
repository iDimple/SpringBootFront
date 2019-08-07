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
			console.log(result);
			address=result.baseURL;
			baseUrl=result.SQARQLURL;
			console.log(address);
			console.log(baseUrl);
		},
		error: function (result) {
			console.log("config load error")
		}
	});
});
