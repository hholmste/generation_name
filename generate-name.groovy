// parse the given .markov file
// each symbol is paired with a list of possible next letter and an occurance 0 to 1. Occurance 0 means it should never appear, and 1 means it will always appear.
def dictionaryFile = "none"
def number_of_names = 1
if (this.hasProperty("args")) {
	dictionaryFile = args[0]
	if (args.length > 1) {
		number_of_names = args[1] as Integer
	}
} else {
	System.err.println("params: $params")
	dictionaryFile = "chains/${params["language"]}_${params["category"]}_${params["ordering"]}.markov"
	if (params["count"] != null) {
		number_of_names = params["count"] as Integer
	}
}

def rand = new Random()

def parseFile(file) {
	def syms = [:]
	new File(file).eachLine { line ->
		// pattern: symbol ::: [letter:chance,*]
		//def matcher = line =~ /(.*) ::: \[(.*)\]/
		
		def matcher = line =~ /(.*) ::: \[(.*)\]/
		def symbol = matcher[0][1]
		def next_letters = matcher[0][2]
		def next_letter_matches = next_letters =~ /(.):(([0-9]\.\d[E\-0-9]*+)*)/
		syms[symbol] = [:]

		Double next_threshold = 0.0
		next_letter_matches.each { letter_match -> 
			syms[symbol][letter_match[1]] = next_threshold
			next_threshold += (letter_match[2] as Double)
		}
	}
	return syms
}

def pick_letter(rand, map) {
	def threshold = rand.nextDouble()
	// ordered map, whith lowest values first. pick the first with threshold lower than rolled value
	def sub = map.findAll { k, v -> v < threshold}
	def selected = sub.max { it.value }
	return selected.key
}

// generate the new name using an optional seed
// start with the symbol for start_of_name
// while we haven't generated an end_of_name (or reached some idiotic max length)
// pick a letter from the symbol's list of possible next letters
// current symbol is becomes the tail of current_symbol plus the next letter (or end of name) 
def generate_name(dictionary, ordering, rand) {
	def current_symbol = '<' * ordering
	def last_letter = '>'
	def name = ""
	def next_letter = ""
	def iterations = 0
	while (next_letter != last_letter && iterations < 30) {
		iterations++
		def next_letter_options = dictionary[current_symbol]
		next_letter = pick_letter(rand, next_letter_options)
		if (next_letter != last_letter) {
			name += next_letter		
		}
		current_symbol = current_symbol.substring(1, ordering) + next_letter
	}
	return name
}

def dictionary = parseFile(dictionaryFile)
def ordering = dictionary.keySet()[0].size()
def names = []
while (names.size() < number_of_names) {
	def attempts = 1
	def name = generate_name(dictionary, ordering, rand);
	while ((name.size() > 18 || name.size() < 4) && attempts < 30) {
		name = generate_name(dictionary, ordering, rand);
		attempts++
	}
	names << name
}


names.each { println it}