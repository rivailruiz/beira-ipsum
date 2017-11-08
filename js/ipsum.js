// Create new ipsum generator
var gullIpsum = new IpsumGenerator();

function IpsumGenerator() {
	this.words = [
	"eu chego ali, eu fico igual o bautiman de cabeça pra baixo", 
	"galinhas voces gostam de ser gastada hein", 
	"Romario de um porradao na cara dele e blaa e bluuum", 
	"vou beber uma drehinha aquela que esquenta ate dar aquela suada e depois a tremedeira hummm delicia", 
	"sai fora. beira nao se relaciona com veganos", 
	"puta que pariu mane para de imitar o meu blimblom porra", 
	"Blim Blooooommmmmm", 
	"Ribeirao oficiaaaaaaal", 
	"manda ele falarr", 
	"quem eh ele. ele eh caleo ele?", 
	"to chegando heinnnnn", 
	"peito amassado", 
	"vegano me fudeu com a cheirosa", 
	"julga naaaaaooo", 
	"me jogando de bola ja mane?", 
	"doutor caio espindola eh meu amigo desde criancinha", 
	"bandeirei na mancha", 
	"rsrsrs", 
	"bla bluhhhh blim blommmm", 
	"caleo caleo", 
	"ninof", 
	"dreher", 
	"garang", 
	"Tenho que acender com vela mane, minha mãe sumiu com os fósforo e isqueiro da casa", 
	"Falou que fui eu que sumi com os isqueiros manocu", 
	"Vou trabucar agr", 
	"voce eh meninada", 
	"expertinho Vegan", 
	"Uma coca combina bem com o garan que alias tem um ainda e vou trabucar agora", 
	"as franguinha tão soltola dms mane, 1 dia de Tinder ja manda fotoca, papo de putaria", 
	"e a tropa vai pra santos einnn", 
	"to pegando uma la do acre", 
	"vegano chegou na hungara querendo bacon", 
	"to com bonezao da hungara", 
	"sou vagabundo. so vou la receber", 
	"de meias pretas", 
	"ribeirao nao nega ", 
	"o ribeirao ta vivo", 
	"o bautiman chegou", 
	"voce e garotada", 
	"meninada", 
	"voce nao gela", 
	"beiraaaao"];
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