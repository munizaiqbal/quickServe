import { getProviders, getProvidersByCategory } from "./firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  console.log("Service cards found:", serviceCards.length);

  serviceCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();

      const category = card.dataset.category;

      if (!category) {
        console.error("Service card is missing data-category:", card);
        return;
      }

      console.log("Selected category:", category);

      window.location.href = `./pages/providers.html?category=${encodeURIComponent(category)}`;
    });
  });
});