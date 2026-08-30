import { auth } from "./firebase.config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  linkWithCredential,
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

//////////////////// SweetAlert Toast ////////////////////
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});


/////////////////google provider instance

const googleProvider = new GoogleAuthProvider();

////////////////////error handle function ///////////


function showAuthError(error) {
  let message = "Something went wrong. Please try again.";

  switch (error.code) {
    case "auth/invalid-credential":
      message = "The email or password is incorrect.";
      break;

    case "auth/email-already-in-use":
      message = "An account with this email already exists.";
      break;

    case "auth/weak-password":
      message = "Password should be at least 6 characters.";
      break;

    case "auth/invalid-email":
      message = "Please enter a valid email address.";
      break;

    case "auth/user-not-found":
      message = "No account was found with this email.";
      break;

    case "auth/wrong-password":
      message = "The password you entered is incorrect.";
      break;

    case "auth/too-many-requests":
      message = "Too many attempts. Please try again later.";
      break;
    
      case "auth/network-request-failed":
        message = "Network error. Please check your internet connection.";
        break;

    default:
      console.error(error);
  }

  Swal.fire({
    icon: "error",
    title: "Authentication Failed",
    text: message,
    confirmButtonText: "Try Again",
  });
}

//////////////////////////////////

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("AUTH STATE: LOGGED IN");
    console.log("USER:", user.email);
  } else {
    console.log("AUTH STATE: LOGGED OUT");
  }
});


//////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const formContainer = document.getElementById("form-container");
  const btnLoginTab = document.getElementById("btn-login-tab");
  const btnSignupTab = document.getElementById("btn-signup-tab");
  const toggleBg = document.getElementById("toggle-bg");
  const formTitle = document.getElementById("form-title");
  const formSubtitle = document.getElementById("form-subtitle");
  const googleBtnText = document.getElementById("google-btn-text");
  const footerText = document.getElementById("footer-text");
  const footerToggleBtn = document.getElementById("footer-toggle-btn");
  const forgotPasswordLink = document.getElementById("forgot-password-link");
  const resendVerificationBtn = document.getElementById(
    "resend-verification-btn",
  );
  const googleAuthBtn = document.getElementById("google-auth-btn");

  let currentMode = "login";

  // Initial setup: Lock container height to the current login form height
  if (formContainer && loginForm) {
    gsap.set(formContainer, { height: loginForm.offsetHeight });
  }

  function switchMode(targetMode) {
    if (targetMode === currentMode) return;
    currentMode = targetMode;

    const isLogin = currentMode === "login";
    const outgoingForm = isLogin ? signupForm : loginForm;
    const incomingForm = isLogin ? loginForm : signupForm;

    // Master GSAP Timeline for seamless sequencing
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    // 1. Move sliding tab background highlight
    tl.to(
      toggleBg,
      {
        xPercent: isLogin ? 0 : 100,
        duration: 0.35,
      },
      0,
    );

    // 2. Animate and switch headers, button labels, and tab text contrast
    tl.to(
      [formTitle, formSubtitle],
      {
        opacity: 0,
        y: -4,
        duration: 0.15,
        onComplete: () => {
          formTitle.textContent = isLogin ? "Welcome Back" : "Create Account";
          formSubtitle.textContent = isLogin
            ? "Please enter your details to sign in."
            : "Join us today by filling out the details below.";
          googleBtnText.textContent = isLogin
            ? "Continue with Google"
            : "Sign up with Google";
          footerText.textContent = isLogin
            ? "Don't have an account?"
            : "Already have an account?";
          footerToggleBtn.textContent = isLogin ? "Sign up" : "Sign in";

          // Tab contrast toggle for soft-white background
          btnLoginTab.classList.toggle("text-white", isLogin);
          btnLoginTab.classList.toggle("text-slate-600", !isLogin);
          btnSignupTab.classList.toggle("text-white", !isLogin);
          btnSignupTab.classList.toggle("text-slate-600", isLogin);
        },
      },
      0,
    ).to([formTitle, formSubtitle], {
      opacity: 1,
      y: 0,
      duration: 0.2,
    });

    // 3. Fade out the active form
    tl.to(
      outgoingForm,
      {
        opacity: 0,
        x: isLogin ? 20 : -20,
        duration: 0.2,
        onComplete: () => {
          outgoingForm.classList.add("pointer-events-none", "absolute");
        },
      },
      0,
    );

    // 4. Smoothly collapse/expand container height to match incoming form content
    tl.to(
      formContainer,
      {
        height: incomingForm.offsetHeight,
        duration: 0.35,
      },
      0.1,
    );

    // 5. Fade in incoming form view
    tl.fromTo(
      incomingForm,
      { opacity: 0, x: isLogin ? -20 : 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.25,
        onStart: () => {
          incomingForm.classList.remove("pointer-events-none", "absolute");
        },
      },
      0.2,
    );
  }

  // Event Listeners for form toggles
  btnLoginTab.addEventListener("click", () => switchMode("login"));
  btnSignupTab.addEventListener("click", () => switchMode("signup"));
  footerToggleBtn.addEventListener("click", () => {
    switchMode(currentMode === "login" ? "signup" : "login");
  });

  /////////////////////////////////////////// Signup /////////////////

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
      "signup-confirm-password",
    ).value;

    if (password !== confirmPassword) {
      await Swal.fire({
        icon: "warning",
        title: "Passwords Don't Match",
        text: "Please make sure both password fields are identical.",
        confirmButtonText: "Try Again",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      console.log("USER CREATED:", user);

      // Send verification email
      await sendEmailVerification(user);

      ///////sweet alert
      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "We've sent a verification email to your inbox.",
        confirmButtonText: "Continue",
      });

      // Sign-up form reset
      signupForm.reset();

      // Switch back to login
      switchMode("login");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      showAuthError(error);
    }
  });


  //////////////////////////////////////////
  

//////////////////////////////////////////// login /////////////////////

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    console.log("LOGIN SUCCESS:", user);

    // Check email verification
    if (!user.emailVerified) {
      document.getElementById("unverified-banner").classList.remove("hidden");

      return;
    }

    // Email is verified
    document.getElementById("unverified-banner").classList.add("hidden");

    loginForm.reset();
    Toast.fire({
      icon: "success",
      title: "Welcome back!",
    });
    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 1000);
  } catch (error) {
    console.error("LOGIN ERROR CODE:", error.code);
    showAuthError(error);
  }
});
  

  /////////////////////////////////////////////////////////

  /////////////////////////////////google provider
  if (googleAuthBtn) {
    googleAuthBtn.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);

        const user = result.user;

        console.log("GOOGLE LOGIN SUCCESS:", user);
        console.log(user.providerData);

        Toast.fire({
          icon: "success",
          title: `Welcome, ${user.displayName || "User"}!`,
        });
        setTimeout(() => {
          window.location.href = "./dashboard.html";
        }, 1000);
      } catch (error) {
        console.error("GOOGLE AUTH ERROR:", error);

        // Existing email/password account
        if (error.code === "auth/account-exists-with-different-credential") {
          await Swal.fire({
            icon: "info",
            title: "Account Already Exists",
            text: "An account with this email already exists using email and password. Sign in with your password first, then we can connect Google to this account.",
            confirmButtonText: "Okay",
          });

          return;
        }

        showAuthError(error);
      }
    });
  }
  /////////////////////////////////////




  // Action listeners

  ////////////////////////////////////forgot password//////////
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", async (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();

      if (!email) {
        await Swal.fire({
          icon: "warning",
          title: "Email Required",
          text: "Please enter your email address first.",
          confirmButtonText: "Okay",
        });

        return;
      }

      try {
        await sendPasswordResetEmail(auth, email);

        Toast.fire({
          icon: "success",
          title: "Password reset email sent",
        });
      } catch (error) {
        console.error("PASSWORD RESET ERROR:", error);

        showAuthError(error);
      }
    });
  }


  /////////////////////////////////resend email verification//////////////////

  if (resendVerificationBtn) {
    resendVerificationBtn.addEventListener("click", async () => {
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      if (!email || !password) {
        await Swal.fire({
          icon: "warning",
          title: "Missing Information",
          text: "Please enter your email and password first.",
          confirmButtonText: "Okay",
        });
        return;
      }

      try {
        // Sign in so Firebase gives us the current user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const user = userCredential.user;

        // Refresh user information
        await user.reload();

        if (user.emailVerified) {
          Toast.fire({
            icon: "info",
            title: "Email is already verified",
          });
          return;
        }

        // Send verification email
        await sendEmailVerification(user);

        Toast.fire({
          icon: "success",
          title: "Verification email sent",
        });
      } catch (error) {
        console.error("RESEND VERIFICATION ERROR:", error);

        showAuthError(error);
      }
    });
  }
});
