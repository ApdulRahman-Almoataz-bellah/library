

(function () {
    const FAV_KEY = "favBooks";

    function getFavorites() {
        return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    }

    function saveFavorites(favs) {
        localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    }

    function isFavorite(book) {
        let favs = getFavorites();
        return favs.some(f => f.bookLink === book.bookLink);
    }

    function toggleFavorite(book) {
        let favs = getFavorites();
        let index = favs.findIndex(f => f.bookLink === book.bookLink);
        if (index === -1) {
            favs.push(book);
            saveFavorites(favs);
            return true;
        } else {
            favs.splice(index, 1);
            saveFavorites(favs);
            return false;
        }
    }

    function injectStyles() {
        if (document.getElementById("fav-heart-styles")) return;
        let style = document.createElement("style");
        style.id = "fav-heart-styles";
        style.textContent = `
            .fav-heart-injected{
                position: absolute;
                top: 14px;
                right: 14px;
                font-size: 1.3rem;
                color: #fff;
                text-shadow: 0 0 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6);
                cursor: pointer;
                opacity: 0;
                z-index: 2;
                transition: opacity 0.15s ease, transform 0.15s ease;
            }
            .item:hover .fav-heart-injected{ opacity: 1; }
            .fav-heart-injected:hover{ transform: scale(1.15); }
            .fav-heart-injected.active{ opacity: 1; color: #dc3545; text-shadow: none; }
        `;
        document.head.appendChild(style);
    }


    function setupCatalogHearts() {
        let box = document.getElementById("box");
        if (!box) return; // not the catalog page

        injectStyles();

        function decorateCards() {
            box.querySelectorAll(".bookimg").forEach(img => {
                let card = img.closest(".item");
                if (!card || card.querySelector(".fav-heart-injected")) return;
                let index = img.getAttribute("data-index");
                let book = (typeof books !== "undefined") ? books[index] : null;
                if (!book) return;

                card.style.position = "relative";

                let heart = document.createElement("i");
                heart.className = "fa-heart fav-heart-injected " + (isFavorite(book) ? "fa-solid active" : "fa-regular");
                heart.title = "Add to favorites";
                heart.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    let nowFav = toggleFavorite(book);
                    heart.classList.toggle("fa-solid", nowFav);
                    heart.classList.toggle("active", nowFav);
                    heart.classList.toggle("fa-regular", !nowFav);
                });
                card.appendChild(heart);
            });
        }

        
        new MutationObserver(decorateCards).observe(box, { childList: true });
        decorateCards();
    }

   
    function setupBookInfoHeart() {
        let openHeart = document.getElementById("openheart");
        let closeHeart = document.getElementById("closeheart");
        if (!openHeart || !closeHeart) return; 

        let book = JSON.parse(localStorage.getItem("thebook") || "null");
        if (!book) return;

        if (isFavorite(book)) {
            openHeart.classList.add("d-none");
            closeHeart.classList.remove("d-none");
        }

        openHeart.addEventListener("click", function () {
            toggleFavorite(book);
        });
        closeHeart.addEventListener("click", function () {
            toggleFavorite(book);
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        setupCatalogHearts();
        setupBookInfoHeart();
    });
})();