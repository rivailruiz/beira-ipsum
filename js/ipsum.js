var paragraph = document.getElementById("ipsum");
var lastTenWords = new Array ();

var words = ["pacific", "belcher's", "olrog's", "black-tailed", "heermann's", "common gull", "ring-billed", "california", "great black-backed", "kelp", "glaucous-winged", "western", "yellow-footed", "glacous", "iceland", "kumlien's", "thayer's", "european herring", "american herring", "caspian", "yellow-legged", "east siberian", "armenian", "slaty-backed", "lesser black-backed", "heuglin's", "white-eyed", "sooty", "great black-headed", "pallas's", "audouin's", "mediterranean", "relict", "dolphin", "laughing", "franklin's", "lava", "gray", "silver", "red-billed", "hartlaub's", "brown-hooded", "gray-headed", "andean", "black-billed", "brown-headed", "black-headed", "slender-billed", "bonaparte's", "saunder's", "little", "ross's", "black-legged kittiwake", "red-legged kittiwake", "ivory", "sabine's", "swallow-tailed", "dirty scavenger", "beady-eyed", "harsh wailing", "squawking call", "ground-nesting carnivore", "unhinging jaws", "proud of plumage", "colonization", "you're not going to finish those fries, are you", "kleptoparasitism", "enemy of whales", "ubiquitous", "migratory", "cunning", "give me that bread now", "aim ready poop", "king of the lamppost", "charadriiformes", "lari", "laridae", "gangsters of the air"]

function createSentence () {
	var randomWord; // random index for words array
	var sentence = new Array();
	var sentenceLength = Math.floor(Math.random() * 8 + 8); // 8 to 16 words in sentence
	var i = 0; // counter for sentence length
	
	
	// build the sentence
	while (i < sentenceLength) {
		randomWord = Math.floor(Math.random() * words.length);
		if (lastTenWords.indexOf(words[randomWord]) === -1) {
		sentence.push(words[randomWord]); // add word to sentence
		lastTenWords.unshift(words[randomWord]); // add word to tracker - prevents words from showing up next to each other
		if (lastTenWords.length >= 11) {
			lastTenWords.pop(); // remove 10th word in tracker list
			}
		i++; // add 1 to sentence count
		};
		};
	
	// make sentence look nice
	sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].substr(1); // capitalize first letter
	sentence = sentence.join(" "); // convert array to sentence
	sentence = sentence + ".";
	return sentence;
};

// build the paragraph
function createParagraph () {
	var paragraph = createSentence();
	var paragraphLength = Math.floor(Math.random() * 3 + 2); // 3 to 5 sentences in paragraph
	
	for (var i = 0; i < paragraphLength; i++) {
		paragraph = paragraph + " " + createSentence();
	};	
	return paragraph;
};

// create desired number of paragraphs
function createIpsum (numOfParagraphs) {
		var bodyOfText = createParagraph();
		var i = 1; // paragraph counter
		
		while (i < numOfParagraphs) {
			bodyOfText += "<br><br>" + createParagraph();
			i++; // add 1 to paragraph count
		};
		return bodyOfText;
};

// verify user input and display ipsum
function buttonClick () {
	numOfParagraphs = document.getElementById("paragraphs").value;
	var ipsumContainer = document.getElementById("ipsum_container");
	var ipsumHeading = document.getElementById("ipsum_heading");
	var randomWord = Math.floor(Math.random() * words.length);
	if (isNaN(numOfParagraphs) || numOfParagraphs == 0) {
		paragraph.innerHTML = "What are you? One of those non-mathematical creatures bound to land? Enter a valid number 1 through 99!";
	}
	else {
		paragraph.innerHTML = createIpsum(numOfParagraphs);
	};
	ipsumContainer.style.backgroundColor="white";
	ipsumHeading.innerHTML = words[randomWord];
	ipsumHeading.style.display="block";
}