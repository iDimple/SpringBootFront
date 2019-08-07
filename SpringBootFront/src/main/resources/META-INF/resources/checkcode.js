


$(document).ready(function () {

    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        mode:"text/x-java",
        lineNumbers: true
    });
    $("#check").click(function () {
        if($("#result").is(":hidden")){
            $("#result").show();
        }
        $("#result").empty();
        var query = editor.getValue();
        setCookie("code", encodeURIComponent(query));
        var question = {"code": query};
        console.log(question)
        $.ajax({
            type: 'POST',
            url: address + "/checkCode",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(question),
            success: function (result) {
                console.log(result);
                if (result.status==="success"){
                    var json = result.data;
                    if (json.length===0){
                        $("#result").append("<div>Sorry,we can only analyze a complete Java class without syntax errors." 
                        		+"</div>>");
                    }else{
                        for (var i=0;i<json.length;i++){
                            $("#result").append("<p>"+json[i]+"</p>");
                        }
                    }
                }else{
                    $("#result").append("<p>"+result.error_msg+"</p>>");
                }
               
            },
            error: function (result) {
                console.log(result);
                $("#result").append(result);
            }
        });
    });

});