// ============================================
// QuickServe - GSAP Animations
// ============================================

console.log("ANIMATIONS.JS LOADED");

// Make sure GSAP exists
if (typeof gsap === "undefined") {
  console.error("GSAP is NOT loaded.");
} else {
  console.log("GSAP loaded:", gsap.version);
}

// Make sure ScrollTrigger exists
if (typeof ScrollTrigger === "undefined") {
  console.error("ScrollTrigger is NOT loaded.");
} else {
  console.log("ScrollTrigger loaded.");
}

// ============================================
// WAIT FOR DOM
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM READY - Starting animations");

  // ==========================================
  // REGISTER SCROLLTRIGGER
  // ==========================================

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ==========================================
  // HERO
  // ==========================================

  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  // Hero badge
  if (document.querySelector(".hero-badge")) {
    heroTimeline.from(".hero-badge", {
      opacity: 0,
      y: 20,
      duration: 0.7,
    });
  }

  // Hero heading
  if (document.querySelector(".hero-title")) {
    heroTimeline.from(
      ".hero-title",
      {
        opacity: 0,
        y: 50,
        duration: 1,
      },
      "-=0.4",
    );
  }

  // Hero description
  if (document.querySelector(".hero-description")) {
    heroTimeline.from(
      ".hero-description",
      {
        opacity: 0,
        y: 30,
        duration: 0.7,
      },
      "-=0.6",
    );
  }

  // Hero buttons
  if (document.querySelector(".hero-actions")) {
    heroTimeline.from(
      ".hero-actions",
      {
        opacity: 0,
        y: 25,
        duration: 0.7,
      },
      "-=0.5",
    );
  }

  // Trust indicators
  if (document.querySelector(".hero-trust")) {
    heroTimeline.from(
      ".hero-trust",
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
      },
      "-=0.4",
    );
  }

  // ==========================================
  // HERO FLOATING CARDS
  // ==========================================

  if (document.querySelectorAll(".hero-floating-card").length) {
    gsap.from(".hero-floating-card", {
      opacity: 0,
      scale: 0.8,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.8,
      ease: "back.out(1.7)",
    });

    // Floating movement
    gsap.to(".hero-floating-card", {
      y: "-=8",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });
  }

  // ==========================================
  // LOGO
  // ==========================================

  const logo = document.querySelector(".logo");

  if (logo) {
    gsap.from(logo, {
      opacity: 0,
      x: -25,
      duration: 0.7,
      ease: "power3.out",
    });

    logo.addEventListener("mouseenter", () => {
      gsap.to(logo, {
        scale: 1.04,
        duration: 0.25,
        ease: "power2.out",
      });
    });

    logo.addEventListener("mouseleave", () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  }

  // ==========================================
  // SECTION TITLES
  // ==========================================

  if (typeof ScrollTrigger !== "undefined") {
    gsap.utils.toArray(".section-title").forEach((title) => {
      gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ========================================
    // SECTION SUBTITLES
    // ========================================

    gsap.utils.toArray(".section-subtitle").forEach((subtitle) => {
      gsap.from(subtitle, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: subtitle,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ========================================
    // SERVICE CARDS
    // ========================================

    gsap.utils.toArray(".service-card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 0.7,
        delay: index * 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ========================================
    // WHY QUICKSERVE CARDS
    // ========================================

    gsap.utils.toArray(".why-card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 45,
        duration: 0.7,
        delay: index * 0.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ========================================
    // GENERAL REVEAL
    // ========================================

    gsap.utils.toArray(".gsap-reveal").forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ========================================
    // REFRESH SCROLLTRIGGER
    // ========================================

    ScrollTrigger.refresh();
  }

  // ==========================================
  // MICROINTERACTIONS
  // ==========================================

  const interactiveElements = document.querySelectorAll(
    ".btn, .service-card, .why-card, .trust-item",
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      gsap.to(element, {
        y: -4,
        duration: 0.25,
        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    });

    element.addEventListener("mousedown", () => {
      gsap.to(element, {
        scale: 0.97,
        duration: 0.1,
      });
    });

    element.addEventListener("mouseup", () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.15,
      });
    });
  });

  // ==========================================
  // ICON MICROINTERACTION
  // ==========================================

  const icons = document.querySelectorAll(
    ".trust-icon, .service-icon, .why-icon",
  );

  icons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        scale: 1.12,
        rotate: 5,
        duration: 0.25,
        ease: "back.out(2)",
      });
    });

    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  });

  console.log("QUICKSERVE ANIMATIONS INITIALIZED");
});
