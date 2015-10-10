// take a file, a language-name, and an ordering
def filename = args[0]
def ordering = args[1] as Integer

// assume each line is a name

// need symbols for start-of-name and end-of-name
def start_of_name = "<" * ordering
def end_of_name = ">" * ordering

// intermediary: a map of n-order symbols to (next-letter, occurances)
def pass_one = [:]
new File(filename).eachLine { rawline -> 
	def line = rawline.toLowerCase()
	def current_symbol = start_of_name
	def index = 0
	while (current_symbol != end_of_name) {
	 	def next_letter = line[index]	
		
		if (pass_one[current_symbol] == null) {
			pass_one[current_symbol] = [:]
		}
		if (pass_one[current_symbol][next_letter] == null) {
			pass_one[current_symbol][next_letter] = 0
		}
	 	pass_one[current_symbol][next_letter]++

		current_symbol = current_symbol.substring(1, ordering) + next_letter
		index++
		
		if (index >= line.length()) {
			if (pass_one[current_symbol] == null) {
				pass_one[current_symbol] = [:]
			}
			if (pass_one[current_symbol][end_of_name] == null) {
				pass_one[current_symbol][end_of_name] = 0
			}
		 	pass_one[current_symbol][end_of_name]++

			current_symbol = end_of_name
		}
	}
}

// result: build a list of n-order symbols that point to doublet (next-letter, chance)
def pass_two = [:]
pass_one.each { symbol, occurances -> 
	def total = 0 // how many times have the symbol appeared
	occurances.each { letter, value -> total += value }

	pass_two[symbol] = [:]
	occurances.each { letter, count ->
		pass_two[symbol][letter] = (count as Double) / (total as Double)
	}
}

pass_two.each {k, v -> println "$k ::: $v" }