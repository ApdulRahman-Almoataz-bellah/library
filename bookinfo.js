
let book = JSON.parse(localStorage.getItem("thebook"));

// لو مفيش كتاب محدد، ارجع للكاتالوج
if (!book) {
  window.location.replace("catalog.html");
  throw new Error("No book selected");
}

const languageNames = {
    "eng": "English",
    "ara": "Arabic",
    "fre": "French",
    "fra": "French",
    "spa": "Spanish",
    "ger": "German",
    "deu": "German",
    "ita": "Italian",
    "por": "Portuguese",
    "rus": "Russian",
    "chi": "Chinese",
    "zho": "Chinese",
    "jpn": "Japanese",
    "kor": "Korean",
    "tur": "Turkish",
    "heb": "Hebrew",
    "dut": "Dutch",
    "nld": "Dutch"
};


document.getElementById('displayedbook').setAttribute("src", book.url);
document.getElementById('bookname').innerHTML=book.Name;
document.getElementById('bookauthor').innerHTML=book.author;
document.getElementById('categoryname').innerHTML=book.category;
document.getElementById('desription').innerHTML=book.description;
document.getElementById('year').innerHTML=`Year : ${book.publicationYear}`;
document.getElementById('language').innerHTML=`Language : ${languageNames[book.language]}`;


document.getElementById('openheart').addEventListener('click', function () {
    document.getElementById('openheart').classList.add('d-none')
    document.getElementById('closeheart').classList.remove('d-none')
})
document.getElementById('closeheart').addEventListener('click', function () {
    document.getElementById('openheart').classList.remove('d-none')
    document.getElementById('closeheart').classList.add('d-none')
})

let starReview = document.querySelectorAll('.starreview');
let ratingKey = 'bookRating_' + book.id;
let commentsKey = 'bookComments_' + book.id;
let savedRating = localStorage.getItem(ratingKey) || 0;
printStars(savedRating);

for (let i = 0; i < starReview.length; i++) {
  starReview[i].addEventListener("click", function (e) {
    let index = e.target.getAttribute("data-value");
    localStorage.setItem(ratingKey, index);
    printStars(index);
  });
}

function printStars(index) {
  for (let j = 0; j < starReview.length; j++) {
    if (j < index) {
      starReview[j].classList.remove('fa-regular');
      starReview[j].classList.add('fa-solid', 'filled');
    } else {
      starReview[j].classList.add('fa-regular');
      starReview[j].classList.remove('fa-solid', 'filled');
    }
  }
}


function buildReviewCard(text, rating, id) {
  const starsHtml = Array.from({ length: 5 }, function (_, i) {
    return `<i class="fa-${i < rating ? 'solid' : 'regular'} fa-star star"></i>`;
  }).join('');

  const reviewCard = document.createElement('div');
  reviewCard.className = 'rev1 border border-1 rounded-2 w-md-75 py-2 mt-3 px-3';
  reviewCard.innerHTML = 
    `<div class="d-flex justify-content-between align-items-start">
      <img src="images/person.jpg" width="80" height="80" class="rounded-circle mb-2 border border-1 border-secondary-subtle" alt="">
      <div>
        <i class="fa-solid fa-trash text-muted" style="cursor:pointer;" id="delete-btn"></i>
      </div>
    </div>
    <h6>You</h6>
    <p class="review-text">${text}</p>
    <div class="rewstar">${starsHtml}</div>`
  ;

  reviewCard.querySelector('#delete-btn').addEventListener('click', function () {
    savedComments = savedComments.filter(function (c) {
      return c.id !== id;
    });
    localStorage.setItem(commentsKey, JSON.stringify(savedComments));
    reviewCard.remove();
  });

  return reviewCard;
}





let savedComments = JSON.parse(localStorage.getItem(commentsKey)) || [];
savedComments.forEach(function (c) {
  document.getElementById('reviewsList').prepend(buildReviewCard(c.text, c.rating, c.id));
});





document.getElementById('sendBtn').addEventListener('click', function () {
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  let currentRating = localStorage.getItem(ratingKey) || 0;

  if (!text) return;

  const newComment = { id: Date.now(), text: text, rating: currentRating };

  document.getElementById('reviewsList').prepend(buildReviewCard(newComment.text, newComment.rating, newComment.id));

  savedComments.push(newComment);
  localStorage.setItem(commentsKey, JSON.stringify(savedComments));

  input.value = '';
});