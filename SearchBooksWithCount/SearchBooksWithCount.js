let search_inp = document.getElementById('searchInput');
let count_El = document.getElementById('selectDisplayCount');
let result_El = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function addbooksTtl(object) {
    result_El.textContent = '';
    if (object.length <= 1) {
        let h1El = document.createElement('h1');
        h1El.textContent = 'No results Found';
        h1El.classList.add('result-hd', 'p-3');
        result_El.appendChild(h1El);
    } else {
        let h1El = document.createElement('h1');
        h1El.textContent = 'Popular Books';
        h1El.classList.add('result-hd', 'p-3');
        result_El.appendChild(h1El);
    }
}

function add_books(obj) {
    let div_container = document.createElement('div');
    div_container.classList.add('col-6', 'text-center');
    result_El.appendChild(div_container);

    let img = document.createElement('img');
    img.classList.add('book-img', 'm-2');
    img.src = obj.imageLink;
    div_container.appendChild(img);

    let pEl = document.createElement('p');
    pEl.classList.add('ttl');
    pEl.textContent = obj.author;
    div_container.appendChild(pEl);
}

function fetch_and_add_books(url, count) {
    spinnerEl.classList.toggle('d-none');
    result_El.textContent = '';
    fetch(url)
        .then(function(argument) {
            return argument.json();
        })
        .then(function(Data) {

            let list = Data.search_results;
            console.log(list);

            addbooksTtl(list);
            spinnerEl.classList.toggle('d-none');
            for (let obj of list) {
                add_books(obj);
            }
        });
}

count_El.addEventListener('change', function() {
    if (search_inp.value === '') {
        addbooksTtl(Array());
    } else {
        let count = count_El.value;
        let url = 'https://apis.ccbp.in/book-store?title=' + search_inp.value + '&maxResults=' + count;
        fetch_and_add_books(url, count);
    }
});


search_inp.addEventListener('keydown', function(a) {
    if (a.key === "Enter") {
        let count = count_El.value;
        let url = 'https://apis.ccbp.in/book-store?title=' + search_inp.value + '&maxResults=' + count;
        fetch_and_add_books(url, count);
    }
});