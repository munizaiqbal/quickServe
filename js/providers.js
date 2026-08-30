import { getProvidersByCategory } from "./firestore.js";

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const title = document.getElementById("category-title");
const description = document.getElementById("category-description");

const loading = document.getElementById("providers-loading");
const grid = document.getElementById("providers-grid");
const empty = document.getElementById("providers-empty");
const error = document.getElementById("providers-error");
const errorMessage = document.getElementById("providers-error-message");

console.log("Provider page category:", category);

async function loadProviders() {
  if (!category) {
    showError("No service category was selected.");
    return;
  }

  try {
    const providers = await getProvidersByCategory(category);

    console.log("Providers returned:", providers);

    loading.classList.add("hidden");

    if (providers.length === 0) {
      empty.classList.remove("hidden");
      return;
    }

    grid.innerHTML = providers
      .map(
        (provider) => `
          <a
            href="./provider-details.html?id=${provider.id}"
            class="group overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
          >

            <div
              class="flex h-48 items-center justify-center rounded-2xl bg-accent-soft"
            >
              ${
                provider.image
                  ? `<img
                      src="${provider.image}"
                      alt="${provider.name}"
                      class="h-full w-full rounded-2xl object-cover"
                    />`
                  : `<span class="text-4xl">👤</span>`
              }
            </div>

            <div class="mt-5">

              <div class="flex items-start justify-between gap-3">

                <h2 class="text-lg font-bold text-primary">
                  ${provider.name}
                </h2>

                ${
                  provider.verified
                    ? `
                      <span
                        class="shrink-0 rounded-full bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-success"
                      >
                        ✓ Verified
                      </span>
                    `
                    : ""
                }

              </div>

              <p class="mt-2 text-sm leading-6 text-muted">
                ${provider.description}
              </p>

              <div class="mt-4 flex items-center gap-4 text-xs text-muted">

                <span>
                  ⭐ ${provider.rating}
                </span>

                <span>
                  ${provider.reviewCount} reviews
                </span>

                <span>
                  ${provider.location}
                </span>

              </div>

              ${
                provider.available
                  ? `
                    <div class="mt-4 text-xs font-semibold text-success">
                      ● Available now
                    </div>
                  `
                  : `
                    <div class="mt-4 text-xs font-semibold text-muted">
                      ● Currently unavailable
                    </div>
                  `
              }

            </div>

          </a>
        `,
      )
      .join("");

    grid.classList.remove("hidden");
  } catch (err) {
    console.error("PROVIDERS LOAD ERROR:", err);

    loading.classList.add("hidden");

    showError(err.message || "Unable to load providers from Firebase.");
  }
}

function showError(message) {
  errorMessage.textContent = message;

  loading.classList.add("hidden");
  grid.classList.add("hidden");
  empty.classList.add("hidden");
  error.classList.remove("hidden");
}

if (title && category) {
  title.textContent = `${formatCategory(category)} Providers`;
}

if (description && category) {
  description.textContent = `Find trusted ${formatCategory(category).toLowerCase()} professionals in your area.`;
}

function formatCategory(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

loadProviders();
