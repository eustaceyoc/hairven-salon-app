// Shared JavaScript

document.addEventListener("DOMContentLoaded", () => {
  setupHomeTestimonials();
  setupContactForm();
});

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
