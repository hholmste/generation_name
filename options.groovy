// retrieves available languages and ordinals
import groovy.io.FileType

contentType = "application/json"

def result = [:]
result["languages"] = [:]
def chainLoc = new File("chains")
chainLoc.eachFile(FileType.FILES) { file ->
	def matches = file.name =~ /([a-zA-Z\-]*)_([a-zA-Z\-]*)_([1-9]*)\.markov/

	/*
		build something like:
		{
			"languages": [
				{
					"name": "anglo-saxon",
					"categories": [
						{
							"name": "male",
							"ordinals" : [1, 2, 3]
						},
						{
							"name": "female",
							"ordinals": [1, 3]
						}
					]
				}
			]
		}
	*/

	language = matches[0][1]
	category = matches[0][2]
	ordinal = matches[0][3]

	if (result["languages"][language] == null) {
		result["languages"][language] = [:]
		result["languages"][language]["categories"] = [:]
	}
	def lang = result["languages"][language]
	if (lang["categories"][category] == null) {
		lang["categories"][category] = [:]
	}
	def cat = lang["categories"][category]
	if (cat["ordinals"] == null) {
		cat["ordinals"] = []
	}
	cat["ordinals"] << ordinal
}

json(result)