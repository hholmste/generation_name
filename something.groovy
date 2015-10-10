def count = args[0]

def male_first = "groovy generate_name.groovy norwegian_male_2.markov 50".execute().text.split('\n')
def female_first = "groovy generate_name.groovy norwegian_female_2.markov 50".execute().text.split('\n')
def surname = "groovy generate_name.groovy norwegian_surnames_2.markov 50".execute().text.split('\n')
def hometown = "groovy generate_name.groovy norwegian_places_2.markov 50".execute().text.split('\n')

def rand = new Random()
for (int i = 0; i < 50; i++){
	println "${male_first[i]} og ${female_first[i]} ${surname[i]}, bosatt i ${hometown[i]}siden ${1900 + rand.nextInt(110)}"
}
