let books = [];
let categories = [];
let authors = [];
async function getbooks() {
    let response = await fetch("https://openlibrary.org/search.json?q=bestseller&limit=200");
    let data = await response.json();

    let docs = data.docs;

     books = [];
    for (let i = 0; i < docs.length; i++) {
        let book = docs[i];

        let coverUrl = "images/default.jpg";
        if (book.cover_i) {
            coverUrl = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
        }

        let author = "Unknown ";
        if (book.author_name) {
            author = book.author_name[0];
        }

        let description = "No description available.";
        if (book.first_sentence) {
            description = book.first_sentence[0];
        }

        let publicationYear = "N/A";
        if (book.first_publish_year) {
            publicationYear = book.first_publish_year;
        }

        let pages = "N/A";
        if (book.number_of_pages_median) {
            pages = book.number_of_pages_median;
        }

        let category = "General";
        if (book.subject) {
            category = book.subject[0];
        }

        let publisher = "Unknown";
        if (book.publisher) {
            publisher = book.publisher[0];
        }

        let editionCount = 0;
        if (book.edition_count) {
            editionCount = book.edition_count;
        }

        let language = "Unknown";
        if (book.language) {
            language = book.language[0];
        }

        let alreadyReadCount = 0;
        if (book.already_read_count) {
            alreadyReadCount = book.already_read_count;
        }

        let bookLink = "#";
        if (book.key) {
            bookLink = "https://openlibrary.org" + book.key;
        }

        books.push({
            id: i + 1,
            Name: book.title || "Unknown Title",
            author: author,
            description: description,
            publicationYear: publicationYear,
            pages: pages,
            category: category,
            publisher: publisher,
            language: language,
            alreadyReadCount: alreadyReadCount,
            bookLink: bookLink,
            url: coverUrl
        });
    }

    return books;
}

async function displaybooks() {
    await getbooks();

    for (let i = 0; i < books.length; i++){
        if (!categories.includes(books[i].category))
            categories.push(books[i].category);
        if (!authors.includes(books[i].author))
            authors.push(books[i].author);
    }
    categories.sort();
    authors.sort();
    // filter buttons
    selectors(categories, 'categorySelect', 'Categories');
    selectors(authors, 'authorSelect', 'Authors');

    document.getElementById("categorySelect").addEventListener("change", filterBooks);
    document.getElementById("authorSelect").addEventListener("change", filterBooks);
    document.getElementById("search").addEventListener("input", filterBooks);
    document.getElementById("box").addEventListener("click", function (e) {
        let img = e.target.closest(".bookimg");
        if (img) {
            let index = img.getAttribute("data-index");
            let thebook = books[index];
            localStorage.setItem("thebook",JSON.stringify(thebook));
        }

        });
        filterBooks();

}

function selectors(data,id,name) {
    let x = `<option value='all' selected> All ${name}</option>`;
    for (let i = 0; i < data.length; i++){
        x += `
        <option value="${data[i]}">${data[i]}</option>
        `
    }
    document.getElementById(id).innerHTML = x;
}


function filterBooks() {
    let selectedCategory = document.getElementById('categorySelect').value;
    let selectedAuthor = document.getElementById('authorSelect').value;
    let searchValue = document.getElementById("search").value.toLowerCase();

    let x = "";
    for (let i = 0; i < books.length; i++) {
        let matchCategory = (selectedCategory === 'all' || books[i].category === selectedCategory);
        let matchAuthor = (selectedAuthor === 'all' || books[i].author === selectedAuthor);
        let matchSearch = (books[i].Name.toLowerCase().includes(searchValue) || books[i].author.toLowerCase().includes(searchValue));

        if (matchCategory && matchAuthor && matchSearch) {
            x += `
                <div class="item col-xl-3 col-md-4 col-sm-6 ">
                    <div class="item p-2 border border-1 rounded-2 bg-light-subtle">
               <a href="bookinfo.html"><img src="${books[i].url}" alt="${books[i].Name}" class="w-100 bookimg" data-index="${i}"></a>
               
             </div>
           </div> `
        }
    }

    if (x === '') {
        document.getElementById("box").innerHTML = `<h1 class=" text-secondary-emphasis p-4">No Books Matched</h1>`;
    }
    else {
        document.getElementById("box").innerHTML = x;
    }

}

displaybooks();