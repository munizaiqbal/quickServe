import { auth } from "./firebase.config.js";

import {
  signOut,
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const logoutBtn = document.getElementById("logout-btn");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

logoutBtn.addEventListener("click", async () => {
  const result = await Swal.fire({
    title: "Log out?",
    text: "You'll need to sign in again to access your account.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, log out",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    await signOut(auth);

    Toast.fire({
      icon: "success",
      title: "Logged out successfully",
    });
    window.location.href = "./login.html";
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    Swal.fire({
      icon: "error",
      title: "Logout Failed",
      text: "Something went wrong. Please try again.",
      confirmButtonText: "Okay",
    });
  }
});