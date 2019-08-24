
$(document).ready(function () {
	getAdvanceCookie();
	$("#advancesearch").click(function () {

		setAdcanceCookie();
		window.location.href = "ordinary.html";

	});


});

function getAdvanceCookie() {
	if (getCookie("name") !== "") {
		$("#name").val(getCookie("name"));
	}
	if (getCookie("rule") !== "") {
		$("#rule").val(getCookie("rule"));
	}
	if (getCookie("benefit") !== "") {
		$("#benefit").val(getCookie("benefit"));
	}
	if (getCookie("weakness") !== "") {
		$("#weakness").val(getCookie("weakness"));
	}
	if (getCookie("exception") !== "") {
		$("#exception").val(getCookie("exception"));
	}
}


function setAdcanceCookie() {
	var nameValue = $('#name').val();
	nameValue = $.trim(nameValue);
	setCookie("name", nameValue);
	var ruleValue = $('#rule').val();
	ruleValue = $.trim(ruleValue);
	setCookie("rule", ruleValue);
	var benefitValue = $('#benefit').val();
	benefitValue = $.trim(benefitValue);
	setCookie("benefit", benefitValue);
	var weaknessValue = $('#weakness').val();
	weaknessValue = $.trim(weaknessValue);
	setCookie("weakness", weaknessValue);
	var exceptionValue = $('#exception').val();
	exceptionValue = $.trim(exceptionValue);
	setCookie("exception", exceptionValue);

	var ordinarySearch = "";
	if (nameValue !== "") {
		ordinarySearch += "-n " + "'" + nameValue + "'";
	}
	if (ruleValue !== "") {
		ordinarySearch += " -r " + "'" + ruleValue + "'";
	}
	if (benefitValue !== "") {
		ordinarySearch += " -b " + "'" + benefitValue + "'";
	}
	if (weaknessValue !== "") {
		ordinarySearch += " -w " + "'" + weaknessValue + "'";
	}
	if (exceptionValue !== "") {
		ordinarySearch += " -e " + "'" + exceptionValue + "'";
	}
	setCookie("ordianrySearch", ordinarySearch);
	setCookie("notSendQuery", "yes");
}