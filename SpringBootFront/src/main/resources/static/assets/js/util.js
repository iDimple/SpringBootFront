//dictionary




function displayEntity(entity) {
    var entityId = getEntityId();
    $("#answer").append("<div id='" + entityId + "'></div>");
    var html = "";

    if ("Rule" in entity) {
    	html += "<I style='color: #000000'> " + "Rule" + "</I>";
        html += "<div style='margin-bottom:10px;background-color:#EEDFCC'>" + entity.Rule + "</div>";
    }

    if ("RuleExplanation" in entity) {
        html += "<I style='color: #000000'> " + "RuleExplanation" + "</I>";
        html += "<P style='background-color:#EEDFCC'>" + entity.RuleExplanation + "</P>";
    }

    if ("Decision" in entity) {
        html += "<I style='color: #000000'> " + "Decision" + "</I>";
        html += "<P style='background-color:#EEDFCC'>" + entity.Decision + "</P>";
    }

    if ("Rationale" in entity) {
        html += "<I style='color: #000000'> " + "Rationale" + "</I>";
        html += "<P style='background-color:#EEDFCC'>" + entity.Rationale + "</P>";
    }

    if ("Exception" in entity) {
        html += "<I style='color: #000000'> " + "Exception" + "</I>";
        html += "<P style='background-color:#EEDFCC'>" + entity.Exception + "</P>";
    }

    if ("Pros" in entity) {
        html += "<I style='color: #669900'> " + "Pros" + "</I>";
        html += "<P style='background-color:#EEDFCC'>" + entity.Pros + "</P>";
    }

    if ("ProsExplanation" in entity) {
        html += "<I style='color: #669900'> " + "ProsExplanation" + "</I>";
        html += "<P style='background-color:#EEDFCC'>" + entity.ProsExplanation + "</P>";
    }

    if ("ProsExample" in entity) {
        html += "<I style='color: #669900'> " + "ProsExample" + "</I>";
        html += "<pre><code class='language-java line-numbers'>" + entity.ProsExample + "</code></pre>";
    }

    if ("Cons" in entity) {
        html += "<I style='color: #FF7F24'> " + "Cons" + "</I>";
        html += "<P style='background-color:#EEDFCC'>" + entity.Cons + "</P>";
    }

    if ("ConsExplanation" in entity) {
        html += "<I style='color: #FF7F24'> " + "ConsExplanation" + "</I>";
        html += "<P style='background-color:#EEDFCC'>" + entity.ConsExplanation + "</P>";
    }

    if ("ConsExample" in entity) {
        html += "<I style='color: #FF7F24'> " + "ConsExample" + "</I>";
        html += "<pre><code class='language-java line-numbers'>" + entity.ConsExample + "</code></pre>";
    }

    if ("BadExample" in entity) {
        html += "<I style='color: #FF0000'> " + "BadExample" + "</I>";
        html += "<pre><code class='language-java line-numbers'>" + entity.BadExample + "</code></pre>";
    }

    $("#" + entityId).append(html);
    buildD3(entity.Id, entityId);
    console.log(entity);
}

function buildD3(id, entityId) {
    var question = {"url": id};
    $.ajax({
        type: 'POST',
        url: address + "/similar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(question),
        success: function (result) {
            if (!$.isEmptyObject(result.data)) {
                var d3id = getD3Id();
                $("#" + entityId).append("<div style='position:relative' id='" + d3id + "'></div>");
                new KB(result.data, d3id);
            }
        },
        failure: function (result) {
            alert(result);
        },
        error: function (result) {
            alert(result);
        }
    });
}

function nextEntityId() {
    var current_id = 0;
    return function () {
        current_id++;
        return "entity" + current_id;
    }
}

function nextD3Id() {
    var currentD3_id = 0;
    return function () {
        currentD3_id++;
        return "d3" + currentD3_id;
    }
}

var getEntityId = nextEntityId();
var getD3Id = nextD3Id();
