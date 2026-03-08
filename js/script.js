// Shared JavaScript

document.addEventListener("DOMContentLoaded", () => {
  setupYear();
  setupHomeTestimonials();
  setupContactForm();
  setupBookingForm();
});

/* Year in footer */

function setupYear() {
  const yearEls = document.querySelectorAll("#year");
  const year = new Date().getFullYear();
  yearEls.forEach((el) => (el.textContent = year));
}

/* Testimonials slider (home) */
function setupHomeTestimonials() {
  const slider = document.querySelector("[data-slider]");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".testimonial-slide"));
  const prevBtn = slider.querySelector(".slider-prev");
  const nextBtn = slider.querySelector(".slider-next");
  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = slides.findIndex((slide) =>
    slide.classList.contains("active")
  );
  if (index === -1) index = 0;

  function showSlide(newIndex) {
    slides[index].classList.remove("active");
    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add("active");
  }

  prevBtn.addEventListener("click", () => showSlide(index - 1));
  nextBtn.addEventListener("click", () => showSlide(index + 1));

  setInterval(() => {
    showSlide(index + 1);
  }, 7000);
}

/* Contact form (simple feedback only) */
function setupContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const messageEl = form.querySelector(".form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!(messageEl instanceof HTMLElement)) return;

    const name = form.querySelector("#contact-name");
    const email = form.querySelector("#contact-email");
    const message = form.querySelector("#contact-message");

    if (!name || !email || !message) return;

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    if (!nameValue || !emailValue || !messageValue) {
      messageEl.textContent = "Please fill in all required fields.";
      messageEl.classList.remove("success");
      messageEl.classList.add("error");
      return;
    }

    if (!isValidEmail(emailValue)) {
      messageEl.textContent = "Please enter a valid email address.";
      messageEl.classList.remove("success");
      messageEl.classList.add("error");
      return;
    }

    messageEl.textContent =
      "Thank you for your message. We will get back to you soon.";
    messageEl.classList.remove("error");
    messageEl.classList.add("success");
    form.reset();
  });
}

/* Booking form validation */
function setupBookingForm() {
  const form = document.querySelector(".booking-form");
  if (!form) return;

  const messageEl = form.querySelector(".form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!(messageEl instanceof HTMLElement)) return;

    const name = form.querySelector("#booking-name");
    const phone = form.querySelector("#booking-phone");
    const email = form.querySelector("#booking-email");
    const service = form.querySelector("#booking-service");
    const date = form.querySelector("#booking-date");
    const time = form.querySelector("#booking-time");

    if (!name || !phone || !email || !service || !date || !time) return;

    const nameVal = name.value.trim();
    const phoneVal = phone.value.trim();
    const emailVal = email.value.trim();
    const serviceVal = service.value;
    const dateVal = date.value;
    const timeVal = time.value;

    if (!nameVal || !phoneVal || !emailVal || !serviceVal || !dateVal || !timeVal) {
      showFormError(messageEl, "Please complete all required fields.");
      return;
    }

    if (!isValidEmail(emailVal)) {
      showFormError(messageEl, "Please enter a valid email address.");
      return;
    }

    if (!isFutureDate(dateVal)) {
      showFormError(messageEl, "Please select a date in the future.");
      return;
    }

    messageEl.textContent =
      "Thank you! Your booking request has been submitted. We will confirm by email.";
    messageEl.classList.remove("error");
    messageEl.classList.add("success");
    form.reset();
  });
}

/* Helpers */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isFutureDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(dateStr + "T00:00:00");
  return selected.getTime() >= today.getTime();
}

function showFormError(messageEl, text) {
  messageEl.textContent = text;
  messageEl.classList.remove("success");
  messageEl.classList.add("error");
}