# generation name
creating names using markov-chains.

two scripts: build-lang takes a list of words and an ordinal and generates some sort of markov-chain-like thing. generate-name takes a file containing the results from build-lang and generates a new word. I can generate many words.

todo: fix stupid naming.

todo: some sort of web gui

web should have two modes: generate and create. Create lets you upload a source-file, name it, give it an ordinal, and generate a new language-file. The source will be consumed. The source cannot be larger than some relatively small size. The create-page should be secured. The generate-page lets you pick a language and optional ordinal and generates a number of names. The generate-page is publicly available.
