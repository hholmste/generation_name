function ensurePlurality() {
  var inputVal = document.getElementById("number_input").value;
  var result = ""
  if (inputVal > 1) {
  	result = "s"
  }
  document.getElementById("plural_name").innerHTML = result;
}

var OPTIONS = (function () {
	var mod = {};

	mod.loadOptions = function (callback) {
		console.log("this is where I should have loaded the options");

		if(callback) callback();	
	}

	return mod;
})();