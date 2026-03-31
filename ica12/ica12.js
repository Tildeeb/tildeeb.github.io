/* let newBtn = document.querySelector('#js-new-quote'); */
/* newBtn.addEventListener('click', getQuote); 
*/

const newQuoteButton = document.querySelector('#js-new-quote');
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
const answerButton = document.querySelector('#js-tweet');

newQuoteButton.addEventListener('click', getQuote);
answerButton.addEventListener('click', showAnswer);
const answerText = document.querySelector('#js-answer-text');

let current = {
    question: "",
    answer: ""
}

async function getQuote() {
   /* alert("THIS WORKS!");*/

 try{
    const response = await fetch(endpoint);
    if (!response.ok) {throw Error(response.statusText);

    }
    const json = await response.json();
    console.log(json);
    displayQuote(json['question']); 
    current.question = json['question'];
current.answer = json['answer'];
console.log(current.answer);

 } catch (error) {
    console.log("Error:", error);
    alert("Failed to fetch trivia");
  
}
}

function displayQuote(quote) {
  const quoteText = document.querySelector('#js-quote-text');
  quoteText.textContent = quote;
  const answerText = document.querySelector('#js-answer-text');
  answerText.textContent = "Answer hidden. Click the button to reveal it!";
}

function showAnswer() {
  answerText.textContent = current.answer;
}
getQuote(); 