function ensurePlurality() {
  var inputVal = document.getElementById("number_input").value;
  var result = ""
  if (inputVal > 1) {
  	result = "s"
  }
  document.getElementById("plural_name").innerHTML = result;
}

function hide(elementId) {
	var elem = document.getElementById(elementId);
	if (elem && !elem.classList.contains("hidden")) {
		elem.classList.add("hidden");
	}
}

function show(elementId) {
	var elem = document.getElementById(elementId);
	if (elem && elem.classList.contains("hidden")) {
		elem.classList.remove("hidden");
	}
}

function showOnlyQuestion() {
	hide("loading_screen");
	hide("the_answer");
	show("the_question");
}

var OPTIONS = (function () {
	var mod = {};

	function parseOptions(rawJson, optionalCallback) {
		mod.options = JSON.parse(rawJson);

		if (optionalCallback) optionalCallback();
	}

	mod.loadOptions = function (callback) {

		var request = new XMLHttpRequest();

		request.addEventListener("load", function () { parseOptions(this.responseText, callback); });

		request.open("GET", "options.groovy");
		request.send();
	}

	return mod;
})();