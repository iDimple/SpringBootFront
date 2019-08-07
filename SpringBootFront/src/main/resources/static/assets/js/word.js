$(document).ready(function(){

	var afterUrl =  window.location.href;
	var afterEqual = afterUrl.split("?id=")[1];
	afterEqual="<"+afterEqual+">";



	$("#answer").empty();


	$.ajax({
		type:"POST",
		contentType : 'application/x-www-form-urlencoded',
		url:baseUrl,
		data:	{"query":
		"PREFIX rdf: <http://www.w3.org/2018/mycard-rdf/1.0#> SELECT distinct ?p  ?o WHERE {"+afterEqual+" ?p ?o.}"	
		},
		success: function (result) {

			var json = result["results"];
			var jsonFormat={};
			if ($.isEmptyObject(json) || json === []) {
				$("#answer").append("<p>don't know</p>");
			} else {
				
				for(var i=0;i<json["bindings"].length;i++){
					var item=json["bindings"][i];
					var predicate=item["p"]["value"].split("#")[1];
					console.log(predicate);
					if("Name"==predicate){
						$("#entityName").text(item["o"]["value"]);
					}
					
					jsonFormat[predicate]=item["o"]["value"];
				}
				jsonFormat["Id"]=afterEqual;
				console.log(jsonFormat);
				displayEntity(jsonFormat);
				Prism.highlightAll();
			}          
		},
		error: function (result) {
			$("#answer").append("<p>" + result + "</p>");
		}
	});

});