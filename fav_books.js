(function () {
    const FAV_KEY = "favBooks";

    function getFavorites() {
        return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    }

    function saveFavorites(favs) {
        localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    }

    function removeFavorite(bookLink) {
        let favs = getFavorites();
        favs = favs.filter(f => f.bookLink !== bookLink);
        saveFavorites(favs);
        return favs;
    }

    function renderFavorites() {
        let favBox = document.getElementById("favBox");
        if (!favBox) return;

        let favs = getFavorites();

        if (favs.length === 0) {
            favBox.innerHTML = `<h1 class="text-secondary-emphasis p-4">No Favorite Books Yet</h1>`;
            return;
        }

        let x = "";
        for (let i = 0; i < favs.length; i++) {
            x += `
                <div class="item col-xl-3 col-md-4 col-sm-6">
                    <div class="item p-2 border border-1 rounded-2 bg-light-subtle position-relative">
                        <a href="bookinfo.html" class="favbook-open" data-index="${i}">
                            <img src="${favs[i].url}" alt="${favs[i].Name}" class="w-100 bookimg">
                        </a>
                        <i class="fa-solid fa-heart favbook-remove"
                           title="Remove from favorites"
                           data-bookLink="${favs[i].bookLink}"
                           style="position:absolute; top:14px; right:14px; font-size:1.3rem; color:#dc3545; cursor:pointer; text-shadow:0 0 3px rgba(0,0,0,0.5);"></i>
                    </div>
                </div>`;
        }

        favBox.innerHTML = x;
    }

    document.addEventListener("DOMContentLoaded", function () {
        let favBox = document.getElementById("favBox");
        if (!favBox) return;

        renderFavorites();

        favBox.addEventListener("click", function (e) {
            let removeIcon = e.target.closest(".favbook-remove");
            if (removeIcon) {
                let bookLink = removeIcon.getAttribute("data-bookLink");
                removeFavorite(bookLink);
                renderFavorites();
                return;
            }

            let openLink = e.target.closest(".favbook-open");
            if (openLink) {
                e.preventDefault();
                let index = openLink.getAttribute("data-index");
                let favs = getFavorites();
                let thebook = favs[index];
                localStorage.setItem("thebook", JSON.stringify(thebook));
                window.location.href = "bookinfo.html";
            }
        });
    });
})();
