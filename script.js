let clientID = "S4UW6AnEi5A8nXSs_ab3qNE3FzPNfM8CzA0J2CSV5uQ";
let endpoint = `https://api.unsplash.com/photos/random/?client_id=${clientID}&orientation=landscape&w=3000&fit=max`;

let imageElement = document.querySelector("#unsplashImage");
let imageLink = document.querySelector("#imageLink");
let creator = document.querySelector("#creator");

// declare
const quoteText = document.querySelector("#text"),
authorName = document.querySelector("#author"),
quoteBtn = document.querySelector("#new-quote"),
soundBtn = document.querySelector("#sound"),
copyBtn = document.querySelector("#copy"),
twitterBtn = document.querySelector("#tweet-quote");

fetch(endpoint)
.then((response) => response.json())
.then((jsonData) => {
    imageElement.src = jsonData.urls.regular;
    imageLink.setAttribute("href", jsonData.links.html);

    creator.innerText = jsonData.user.name;
    creator.setAttribute("href", jsonData.user.portfolio_url);
})
.catch((error) => {
    console.log("Error: " + error);
});

function randomImage() {
    fetch(endpoint)
    .then((response) => response.json())
    .then((jsonData) => {
        imageElement.src = jsonData.urls.regular;
        imageLink.setAttribute("href", jsonData.links.html);

        creator.innerText = jsonData.user.name;
        creator.setAttribute("href", jsonData.user.portfolio_url);
    })
    .catch((error) => {
        console.log("Error: " + error);
    });
}

// random quote function
function randomQuote() {
    // make loading btn
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    // fetching random quotes data api 
    fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(result => {
        console.log(result);
        // content from console output then display
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");

    // change bg color
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    // console.log({r, g, b});
    document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("new-quote").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("sound").style.borderColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("sound").style.color = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("copy").style.borderColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("copy").style.color = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("tweet-quote").style.borderColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("tweet-quote").style.color = "rgb(" + r + "," + g + "," + b + ")";
    })
}

soundBtn.addEventListener("click", () => {
    // SpeechSynthesisUtterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    // speak method of speechSynthesis speaks the utterance
    speechSynthesis.speak(utterance);
})

copyBtn.addEventListener("click", () => {
    // copying the quote text
    // writeText() property writes the specified text string to the system clipboard
    navigator.clipboard.writeText(quoteText.innerText);
})

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    // opening twitter tab w/ passing quote in the url
    window.open(tweetUrl, "_blank");
})

quoteBtn.addEventListener("click", randomQuote);
quoteBtn.addEventListener("click", randomImage);