// Shared JavaScript

document.addEventListener("DOMContentLoaded", () => {
  setupHomeTestimonials();
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
