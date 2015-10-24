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

function clearOptions(selectElement) {
	while (selectElement.length > 0) {
		selectElement.remove(0);
	}
}

function addOption(selectElement, new_option) {
	var option = document.createElement("option");
	option.text = new_option;
	option.value = new_option;
	selectElement.add(option);
}

function selectedLanguageChanged() {
	var selected_language = document.getElementById("language_select").value;
	var category_select = document.getElementById("category_select");
	clearOptions(category_select);

	var categories = OPTIONS.options.languages[selected_language].categories;
	for (var cat in categories) {
		addOption(category_select, cat);
	}
}

function optionsLoaded() {
	var langs = OPTIONS.options.languages;

	var language_select = document.getElementById("language_select");
	clearOptions(language_select);

	for (var language in langs) {
		addOption(language_select, language);
	}

	selectedLanguageChanged();
	showOnlyQuestion();
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