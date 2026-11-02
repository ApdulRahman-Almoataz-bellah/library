/* =========================================================
   حماية الصفحات + تسجيل الخروج
   ========================================================= */
(function () {
  const LOGIN_PAGE = "login.html";
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const loggedIn = localStorage.getItem("isLoggedIn") === "true";

  // لا يمكن فتح أي صفحة قبل تسجيل الدخول
  if (currentPage !== LOGIN_PAGE && !loggedIn) {
    window.location.replace(LOGIN_PAGE);
    return;
  }

  // منع الرجوع بالزر Back بعد تسجيل الخروج
  window.addEventListener("pageshow", function (event) {
    if (event.persisted && currentPage !== LOGIN_PAGE && localStorage.getItem("isLoggedIn") !== "true") {
      window.location.replace(LOGIN_PAGE);
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    if (currentPage === LOGIN_PAGE) return;

    const loginLink = document.querySelector('a[href="login.html"]');
    if (!loginLink) return;

    // عرض بريد المستخدم المسجل
    const email = localStorage.getItem("useremail");
    if (email) {
      const item = document.createElement("li");
      item.className = "nav-item my-1";

      const span = document.createElement("span");
      span.className = "nav-link text-white px-3 d-inline-block";
      span.style.opacity = "0.8";
      span.style.fontSize = "0.85rem";
      span.textContent = email;

      item.appendChild(span);
      loginLink.closest("li")?.before(item);
    }

    // تحويل رابط الدخول إلى خروج
    loginLink.textContent = "Logout";
    loginLink.href = "#";
    loginLink.title = "Logout";
    loginLink.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("isLoggedIn");
      window.location.href = LOGIN_PAGE;
    });
  });
})();
