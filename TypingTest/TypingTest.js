let inpEl = document.getElementById('quoteInput');
let timerEl = document.getElementById('timer');
let quoteEl = document.getElementById('quoteDisplay');
let submitEl = document.getElementById('submitBtn');
let resetEl = document.getElementById('resetBtn');
let testEl = document.getElementById('speedTypingTest');
let resultEl = document.getElementById('result');
let spinnerEl = document.getElementById('spinner');


let quote = [];
let inetervalId;

function clearIntr() {
    clearInterval(inetervalId);
}

function getQuote() {

    inpEl.value = '';
    resultEl.textContent = '';
    timerEl.textContent = 0;
    clearIntr();
    let counter = 1;
    let counterTimer = function() {
        timerEl.textContent = counter;
        counter = counter + 1;
    };

    testEl.classList.add('d-none');
    spinnerEl.classList.toggle('d-none');
    fetch('https://apis.ccbp.in/random-quote').then(function(response) {
            return response.json();
        })
        .then((json) => {
            testEl.classList.remove('d-none', 'spinner');
            spinnerEl.classList.toggle('d-none');
            quote.pop();
            quote[0] = json.content;
            console.log(quote);
            inetervalId = setInterval(counterTimer, 1000);
            quoteEl.textContent = json.content;
        });
}

submitBtn.addEventListener('click', function(a) {

    if (inpEl.value === quote[0]) {
        clearIntr();
        let a = timerEl.textContent;
        resultEl.textContent = 'You typed in ' + a + ' Seconds';
    } else {
        resultEl.textContent = ' You typed incorrect sentance';
    }
});
resetBtn.addEventListener('click', getQuote);

getQuote();
console.log(quote);
