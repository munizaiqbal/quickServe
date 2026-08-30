
import { getProvider, createBooking } from "./firestore.js";

const params = new URLSearchParams(window.location.search);
const providerId = params.get("provider");

const form = document.getElementById("booking-form");
const submitButton = document.getElementById("booking-submit");

const providerBox = document.getElementById("booking-provider");
const providerName = document.getElementById("booking-provider-name");
const providerCategory = document.getElementById("booking-provider-category");

const errorBox = document.getElementById("booking-error");
const successBox = document.getElementById("booking-success");
const successProviderLink = document.getElementById("success-provider-link");

let provider = null;

async function loadProvider() {
  if (!providerId) {
    showError("No provider was selected.");
    submitButton.disabled = true;
    return;
  }

  try {
    provider = await getProvider(providerId);

    console.log("Booking provider:", provider);

    if (!provider) {
      showError("Provider not found.");
      submitButton.disabled = true;
      return;
    }

    providerName.textContent = provider.name || "Provider";
    providerCategory.textContent = formatCategory(provider.category || "");

    providerBox.classList.remove("hidden");

    successProviderLink.href =
      `./provider-details.html?id=${provider.id}`;

    if (!provider.available) {
      showError("This provider is currently unavailable.");
      submitButton.disabled = true;
    }
  } catch (error) {
    console.error("PROVIDER LOAD ERROR:", error);

    showError(error.message || "Unable to load provider.");

    submitButton.disabled = true;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!provider) {
    showError("Provider information is unavailable.");
    return;
  }

  if (!provider.available) {
    showError("This provider is currently unavailable.");
    return;
  }

  hideError();

  const formData = new FormData(form);

  const customerName = formData.get("customerName")?.trim();
  const customerPhone = formData.get("customerPhone")?.trim();
  const serviceAddress = formData.get("serviceAddress")?.trim();
  const date = formData.get("date");
  const time = formData.get("time");
  const notes = formData.get("notes")?.trim() || "";

  if (
    !customerName ||
    !customerPhone ||
    !serviceAddress ||
    !date ||
    !time
  ) {
    showError("Please complete all required fields.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Saving Booking...";

  const bookingData = {
    providerId: provider.id,
    providerName: provider.name,
    category: provider.category || "",
    subcategory: provider.subcategory || "",
    customerName,
    customerPhone,
    serviceAddress,
    date,
    time,
    notes,
    status: "pending",
  };

  try {
    const bookingId = await createBooking(bookingData);

    console.log("Booking saved:", bookingId);

    form.classList.add("hidden");
    successBox.classList.remove("hidden");
  } catch (error) {
    console.error("BOOKING SAVE ERROR:", error);

    showError(
      error.message || "Unable to save booking."
    );

    submitButton.disabled = false;
    submitButton.textContent = "Confirm Booking";
  }
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

function formatCategory(value) {
  if (!value) return "";

  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

loadProvider();

