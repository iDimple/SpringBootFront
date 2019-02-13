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
});