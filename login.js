/* =========================================================
   تسجيل الدخول / إنشاء حساب
   ========================================================= */

const loginsection = document.getElementById("loginsection");
const registersection = document.getElementById("registersection");
const toregister = document.getElementById("toregister");
const tologin = document.getElementById("tologin");
const registerform = document.getElementById("registerform");
const loginform = document.getElementById("loginform");
const registerconfirm = document.getElementById("registerconfirm");

// لو المستخدم مسجل دخول بالفعل، ارجع للصفحة الرئيسية
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.replace("index.html");
}

// التبديل بين Login و Register
toregister.onclick = function (e) {
  e.preventDefault();
  loginsection.classList.add("hidden");
  registersection.classList.remove("hidden");
};

tologin.onclick = function (e) {
  e.preventDefault();
  registersection.classList.add("hidden");
  loginsection.classList.remove("hidden");
};

// إنشاء حساب جديد
registerform.onsubmit = function (e) {
  e.preventDefault();

  const email = document.getElementById("registeremail").value.trim().toLowerCase();
  const password = document.getElementById("registerpassword").value;
  const confirmPassword = registerconfirm.value;

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  localStorage.setItem("useremail", email);
  localStorage.setItem("userpassword", password);

  alert("Account registered successfully! Please log in.");

  registerform.reset();
  registersection.classList.add("hidden");
  loginsection.classList.remove("hidden");

  // تسهيل عملية الدخول بعد التسجيل
  document.getElementById("loginemail").value = email;
};

// تسجيل الدخول
loginform.onsubmit = function (e) {
  e.preventDefault();

  const email = document.getElementById("loginemail").value.trim().toLowerCase();
  const password = document.getElementById("loginpassword").value;

  const storedEmail = localStorage.getItem("useremail");
  const storedPassword = localStorage.getItem("userpassword");

  if (!storedEmail || !storedPassword) {
    alert("No account found. Please register first.");
    return;
  }

  if (email === storedEmail && password === storedPassword) {
    localStorage.setItem("isLoggedIn", "true");
    alert("Logged in successfully!");
    window.location.href = "index.html";
  } else {
    alert("Incorrect email or password.");
  }
};
