# generation name
creating names using markov-chains.

two scripts: build-lang takes a list of words and an ordinal and generates some sort of markov-chain-like thing. generate-name takes a file containing the results from build-lang and generates a new word. I can generate many words.

todo: fix stupid naming.

todo: some sort of web gui

web should have two modes: generate and create. Create lets you upload a source-file, name it, give it an ordinal, and generate a new language-file. The source will be consumed. The source cannot be larger than some relatively small size. The create-page should be secured. The generate-page lets you pick a language and optional ordinal and generates a number of names. The generate-page is publicly available.

## Plan for gui

Since the scripts are groovy, it seems reasonable to use groovlets.

Since it was all the rage yesteryear, I might gain something from putting the groovlet in a docker-container and have my nginx proxy there.

Version 1.0 will _not_ allow web-based language generation; i.e. no writing to disk.

I will need a groovlet that recounts the available flavours.

