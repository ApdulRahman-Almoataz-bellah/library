
let books = [];

const hoverStyles = document.createElement('style');
hoverStyles.innerHTML = `
  .book-card {
    transition: transform 0.2s ease-in-out;
  }
  .book-card:hover {
    transform: translateY(-4px);
  }
  .image-container {
    position: relative;
    overflow: hidden;
    height: 180px;
  }
  .book-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 11px;
    text-align: center;
    overflow: hidden;
  }
  .image-container:hover .book-overlay {
    opacity: 1;
  }
`;
document.head.appendChild(hoverStyles);


async function getbooks() {
  try {
    let response = await fetch("https://openlibrary.org/search.json?q=bestseller&limit=100");
    let data = await response.json();
    let docs = data.docs;

    books = [];
    for (let i = 0; i < docs.length; i++) {
      let book = docs[i];

      let coverUrl = "images/default.jpg";
      if (book.cover_i) {
        coverUrl = "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
      }

      let author = "Unknown";
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
  } catch (error) {
    console.error("Error fetching books from Open Library API:", error);
  }
}


function renderSection(containerId, booksList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ""; 

  booksList.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card text-center p-2 m-2 border rounded bg-white shadow-sm";
    card.style.cursor = "pointer";
    card.style.width = "160px";

    card.innerHTML = `
      <div class="image-container rounded mb-2">
        <img src="${book.url}" alt="${book.Name}" class="img-fluid rounded" style="height: 180px; width: 100%; object-fit: cover;">
        <div class="book-overlay">
          <span>${book.description}</span>
        </div>
      </div>
      <h6 class="fw-bold text-dark text-truncate mb-1">${book.Name}</h6>
      <p class="text-muted small mb-0 text-truncate">${book.author}</p>
    `;

    
    card.addEventListener("click", function () {
      localStorage.setItem("thebook", JSON.stringify(book));
      window.location.href = "bookinfo.html";
    });

    container.appendChild(card);
  });
}


async function displaybooks() {
  await getbooks();

  if (books.length === 0) return;


  const topBooksList = books.slice(0, 6);
  const newBooksList = books.slice(6, 12);
  const recommendedBooksList = books.slice(12, 18);

  renderSection("top-books", topBooksList);
  renderSection("new-books", newBooksList);
  renderSection("recommended-books", recommendedBooksList);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", displaybooks);
} else {
  displaybooks();
}