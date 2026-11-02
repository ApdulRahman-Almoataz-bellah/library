# Library Management 📚

A simple front-end library website built with **HTML, CSS, JavaScript, and Bootstrap** — no backend required.

## Pages

| Page | File | Description |
|---|---|---|
| Login / Register | `login.html` | The entry point. You must log in before opening any other page |
| Home | `index.html` | Hero section + Top Books, New Releases, and Recommended books |
| Catalog | `catalog.html` | Search and filter books by category or author |
| Favorites | `favbook.html` | Books saved in the browser |
| Contact Us | `contactus.html` | Contact form + library information |
| Book Details | `bookinfo.html` | Book details, rating, and reviews |

## Login protection

- Every page checks `localStorage.isLoggedIn` before rendering.
- If you are not logged in, you are redirected to `login.html`.
- After a successful login you are taken to `index.html`.
- The navbar link turns into **Logout** after logging in.
- The back button cannot reopen protected pages after logging out.

> Accounts are stored locally in the browser (`localStorage`). This is a demo only — there is no server, database, or real authentication.

## Run locally

From this folder:

```bash
py -m http.server 5500
```

Then open: <http://localhost:5500/login.html>

Or on Windows, double-click `run.bat`.

**First time?** Open the login page, click **Sign Up**, create an account, then log in.

## Open in Visual Studio

**File → Open → Folder** and select this project folder.

## Project structure

```
Library_Managment/
├── css/
├── images/
├── js/
│   ├── auth.js        # Login protection + logout
│   ├── login.js       # Register / login logic
│   ├── home.js        # Home page books
│   ├── catalog.js     # Catalog filters
│   ├── favorites.js   # Favorite button on catalog + book details
│   ├── fav_books.js   # Favorites page
│   ├── bookinfo.js    # Book details, ratings, reviews
│   └── contactus.js   # Contact form
├── index.html
├── login.html
├── catalog.html
├── favbook.html
├── contactus.html
└── bookinfo.html
```

## Notes

- Book data and covers come from the public [Open Library](https://openlibrary.org/) API, so an internet connection is needed.
- This project is based on the original [Library_Managment](https://github.com/mariamabdel3al/Library_Managment) repository.
