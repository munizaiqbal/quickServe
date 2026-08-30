
import { getProvider } from "./firestore.js";

const params = new URLSearchParams(window.location.search);
const providerId = params.get("id");

const loading = document.getElementById("provider-loading");
const error = document.getElementById("provider-error");
const details = document.getElementById("provider-details");

const name = document.getElementById("provider-name");
const description = document.getElementById("provider-description");
const location = document.getElementById("provider-location");
const rating = document.getElementById("provider-rating");
const reviews = document.getElementById("provider-reviews");
const category = document.getElementById("provider-category");
const subcategory = document.getElementById("provider-subcategory");
const verified = document.getElementById("provider-verified");
const available = document.getElementById("provider-available");
const image = document.getElementById("provider-image");

const bookButton = document.getElementById("book-provider");
const callButton = document.getElementById("call-provider");

async function loadProvider() {
  if (!providerId) {
    showError();
    return;
  }

  try {
    const provider = await getProvider(providerId);

    console.log("Provider loaded:", provider);

    if (!provider) {
      showError();
      return;
    }

    name.textContent = provider.name || "Provider";
    description.textContent = provider.description || "";
    location.textContent = provider.location || "";
    rating.textContent = provider.rating || "0";
    reviews.textContent = provider.reviewCount || "0";
    category.textContent = formatCategory(provider.category || "");
    subcategory.textContent = formatCategory(provider.subcategory || "");

    if (!provider.verified) {
      verified.classList.add("hidden");
    }

    if (!provider.available) {
      available.textContent = "Currently unavailable";
      available.classList.remove("bg-success-soft", "text-success");
      available.classList.add("bg-red-50", "text-red-600");
      bookButton.classList.add("pointer-events-none", "opacity-50");
    }

    if (provider.image) {
      image.innerHTML = `
        <img
          src="${provider.image}"
          alt="${provider.name}"
          class="h-full w-full object-cover"
        />
      `;
      image.classList.remove("bg-primary", "text-accent");
    }

    bookButton.href = `./booking.html?provider=${provider.id}`;

    if (provider.phone) {
      callButton.href = `tel:${provider.phone}`;
    } else {
      callButton.href = "#";
      callButton.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Phone number is not available for this provider.");
      });
    }

    loading.classList.add("hidden");
    details.classList.remove("hidden");
  } catch (error) {
    console.error("PROVIDER DETAILS ERROR:", error);
    showError();
  }
}

function showError() {
  loading.classList.add("hidden");
  details.classList.add("hidden");
  error.classList.remove("hidden");
}

function formatCategory(value) {
  if (!value) return "";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

loadProvider();

