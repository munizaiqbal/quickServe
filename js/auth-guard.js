import { auth } from "./firebase.config.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("./login.html");
    return;
  }

  console.log("AUTH GUARD: Access granted");
  console.log("USER:", user.email);
  document.body.classList.remove("auth-loading");
  document.body.classList.add("auth-ready");

 
});
