// Create new ipsum generator
var gullIpsum = new IpsumGenerator();

function IpsumGenerator() {
	this.words = ["blinblom", "eu chego ali, eu fico igual o bautiman de cabeça pra baixo", "galinhas voces gostam de ser gastada hein" , "Romario de um porradao na cara dele e blaa e bluuum", "vou beber uma drehinha aquela que esquenta ate dar aquela suada e depois a tremedeirahummm delicia", "sai fora. beira nao se relaciona com veganos", "puta que pariu mane para de imitar o meu blimblom porra"];
	this.lastTenWords = [];
}

// Get random word that hasn't been used in the previous ten words
IpsumGenerator.prototype.getRandomWord = function() {
	var randomWord = this.words[Math.floor(Math.random() * this.words.length)];
	while(this.lastTenWords.indexOf(randomWord) !== -1) {
		this.getRandomWord();	
	}
	this.updateLastTenWords(randomWord);
	return randomWord;
};

// Add most recent word to lastTenWords array and take oldest word off list
IpsumGenerator.prototype.updateLastTenWords = function(word) {
	this.lastTenWords.push(word);
	if (this.lastTenWords.length > 10) {
		this.lastTenWords.shift();
	}
};

// Create a formatted sentence between 8 and 15 words long
IpsumGenerator.prototype.createSentence = function() {
	var sentence = [];
	// set sentence to length between 8 and 15 words
	var sentenceLength = Math.floor(Math.random() * 8 + 8);
	for (var i = 0, x = sentenceLength; i < x; i++) {
		sentence.push(this.getRandomWord());
	}
	return this.formatSentence(sentence);
}

// Capitalize the first letter of a sentence's word and add a period to the end.
IpsumGenerator.prototype.formatSentence = function(sentence) {
	sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].substr(1); // capitalize first letter
	sentence = sentence.join(" "); // convert array to sentence
	sentence += ".";
	return sentence;	
}

// Create a paragraph between 3 and 5 sentences long
IpsumGenerator.prototype.createSingleParagraph = function() {
	var paragraph = [];
	var paragraphLength = Math.floor(Math.random() * 3 + 3); // 3 to 5 sentences in paragraph
	for (var i = 0, x = paragraphLength; i < x; i++) {
		paragraph.push(this.createSentence());
	}
	paragraph = paragraph.join(" ");
	return paragraph;
}

// Create the user-determined number of paragraph, add random word as header
IpsumGenerator.prototype.createAllParagraphs = function() {
	var output = "<h1>" + this.getRandomWord() + "</h1>";
	var numOfParagraphs = $("#paragraphs").val();
	if (isNaN(numOfParagraphs) || numOfParagraphs == 0) {
		output = "<p>What are you? One of those non-mathematical landlubbers? Enter a valid number 1 through 99!</p>";
	} else {
		for (var i = 0, x = numOfParagraphs; i < x; i++) {
			output += "<p>" + this.createSingleParagraph() + "</p>";
		}
	}
	return output;
}

// Replace HTML in #ipsum-container with the generated ipsum
IpsumGenerator.prototype.displayOutput = function() {
	$("#ipsum-container").html(this.createAllParagraphs());
}

// Bind output function to button click event
$("#ipsum-request [type='submit']").on("click", function() {
	gullIpsum.displayOutput();
})

// Bind 'Return key' keypress to output function
$("#ipsum-request input[type='text']").keypress(function(event) {
	if (event.which == 13) {	
		gullIpsum.displayOutput();
	}
});

// Display sample ipsum on home page load, prevents About page content
// from being overwritten
if ($("body").is("#home")) {
	gullIpsum.displayOutput();
}

// Set focus to number-of-paragraphs input form
$('input:first').focus();