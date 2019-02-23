$(document).ready(function(){
	var baseUrl="http://202.120.40.28:4460/data/query";
	var afterUrl =  window.location.href;
	console.log(afterUrl);
	var afterEqual = afterUrl.split("?id=")[1];
	afterEqual="<"+afterEqual+">";
	console.log(afterEqual);



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
					jsonFormat[predicate]=item["o"]["value"];
					if("Name"==predicate){
						console.log(jsonFormat[predicate]);
						$("#entityName").text(jsonFormat[predicate]);
					}
				}
				displayEntity(jsonFormat);
				Prism.highlightAll();
			}          
		},
		error: function (result) {
			$("#answer").append("<p>" + result + "</p>");
		}
	});

});