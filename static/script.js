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

function determineOrdering() {
	var textVal = document.getElementById("ordering_select").value;
	if (textVal == "aBit") return 1;
	if (textVal == "something") return 2;
	if (textVal == "aLot") return 3;
	return -1;
}

function getNames() {
	// show loading-screen again
	show("loading_screen");

	// create a seed and construct the url
	var seed = Math.floor(Math.random() * Math.pow(2,31));
	// generate-name.groovy?language=norwegian&category=female&ordering=3&count=50&seed=4
	var url = "generate-name.groovy?language="
	 + document.getElementById("language_select").value
	 + "&category="
	 + document.getElementById("category_select").value
	 + "&ordering="
	 + determineOrdering()
	 + "&seed="
	 + seed
	 + "&count="
	 + document.getElementById("number_input").value;

	// fetch names
	var request = new XMLHttpRequest();
	request.addEventListener("load", function () {

		var original = document.getElementById("resultList");
		if (original) document.getElementById("the_answer").removeChild(original);

		var resultList = document.createElement("ul");
		resultList.id = "resultList"; 
		var results = this.responseText.split("\n");
		for (var r in results) {
			if (results[r] && results[r].length > 0) {
				var nameElement = document.createElement("li");
				nameElement.innerHTML = results[r];
				resultList.appendChild(nameElement);				
			}
		}
		var urlElement = document.createElement("li");
		urlElement.innerHTML = "<a class='just_the_names' href='" + url + "'>Just the names</a>";
		resultList.appendChild(urlElement);
		document.getElementById("the_answer").appendChild(resultList);

		show("the_answer");
		hide("loading_screen"); 
	} );
	request.open("GET", url);
	request.send();

	// remove loading-screen and show names + generation-url
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