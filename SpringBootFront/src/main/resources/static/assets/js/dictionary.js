$(document).ready(function(){
	var baseUrl="http://202.120.40.28:4460/data/query";


		
		getASC();
	
	 getDetail=function(id){
		
		window.open("word.html?id="+id);
	}
	 getCaptical=function(captical){
		 var cap="A";
		 switch (captical){
		 case 3:cap="A";
		 break;
		 case 13:cap="B";
		 break;
		 case 20:cap="C";
		 break;
		 case 53:cap="D";
		 break;
		 case 58:cap="E";
		 break;
		 case 67:cap="F";
		 break;
		 case 77:cap="G";
		 break;
		 case 92:cap="H";
		 break;
		 case 94:cap="I";
		 break;
		 case 104:cap="J";
		 break;
		 case 105:cap="L";
		 break;
		 case 130:cap="M";
		 break;
		 case 135:cap="N";
		 break;
		 case 150:cap="O";
		 break;
		 case 159:cap="P";
		 break;
		 case 171:cap="R";
		 break;
		 case 177:cap="S";
		 break;
		 case 214:cap="T";
		 break;
		 case 221:cap="U";
		 break;
		 case 228:cap="V";
		 break;
		 case 240:cap="W";
		 break;
		 }
		 var str="<div>"
			+"<span class='captial target' id='"+cap+"'>"+cap+"</span>"+
			"</div>";
		 return str;
	 }
	function getASC(){
		$.ajax({
			type:"POST",
			contentType : 'application/x-www-form-urlencoded',
			url:baseUrl,
			data:	{"query":
			"PREFIX rdf: <http://www.w3.org/2018/mycard-rdf/1.0#> SELECT distinct ?s  ?name ?rule WHERE { ?s rdf:Name ?name.?s rdf:Rule ?rule.}ORDER BY ASC(?name)"	
			},
			success:function(result){
		
				results=result["results"]["bindings"]
			
				
				for(var i=3;i<results.length;i++){
					
					if(i==3||i==13||i==20||i==53||i==58||i==67||i==77||i==92||i==94||i==104||i==105||i==130||i==135||i==150||i==159
							||i==171||i==177||i==214||i==221||i==228||i==240){
						$("#dictionaryArea").append(getCaptical(i));
					}
					if(i%2==0){
						$("#dictionaryArea").append(
								"<div class='box single'>"+
								"<a class='left' href='javascript:void(0)' onclick='getDetail("+"\"" + results[i]["s"]["value"]+ "\"" +")'>"+　
								results[i]["name"]["value"]
						+"</a>"
						+"<span class='right'>"+results[i]["rule"]["value"]+"</span>"
					
						+"</div>"
						);
					}else{
					$("#dictionaryArea").append(
							"<div class='box'>"+
							"<a class='left' href='javascript:void(0)' onclick='getDetail("+"\"" + results[i]["s"]["value"]+ "\"" +")'>"+　
							results[i]["name"]["value"]
					+"</a>"
					+"<span class='right'>"+results[i]["rule"]["value"]+"</span>"
				
					+"</div>"
					);
					}
				}
				
				
			},
			error:function(err){
				console.log(err);
			}
		});
	}
});