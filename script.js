const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
const newQuoteButton = document.getElementById('new-quote');

// Get quote from api
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://mighty-cliffs-11645.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // if author is blank add unknown
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknow';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    //Stop loader and show quote
    hideLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}
// Twitter share
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

//event listeners

newQuoteButton.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//Get quote
getQuote();
