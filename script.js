const filterButtons = document.querySelectorAll(".filter-button");
const carCards = document.querySelectorAll(".car-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    carCards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

document.querySelectorAll(".favorite-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isSaved = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isSaved));
    button.textContent = isSaved ? "♡" : "♥";
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navigation.classList.toggle("open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
  });
});

const bookingForm = document.querySelector("#booking-form");
if (bookingForm) {
  const pickupDate = bookingForm.elements.pickup;
  const returnDate = bookingForm.elements.return;
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  pickupDate.min = localToday;
  returnDate.min = localToday;

  pickupDate.addEventListener("change", () => {
    returnDate.min = pickupDate.value || localToday;
    if (returnDate.value && returnDate.value < returnDate.min) {
      returnDate.value = "";
    }
  });

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = document.querySelector("#booking-message");
    if (returnDate.value < pickupDate.value) {
      returnDate.setCustomValidity("Choose a return date on or after your pick-up date.");
      returnDate.reportValidity();
      returnDate.setCustomValidity("");
      return;
    }

    const location = bookingForm.elements.location.value;
    message.textContent = `Great choice. Cars in ${location} are ready to explore below.`;
    document.querySelector("#cars").scrollIntoView({ behavior: "smooth" });
  });
}
