document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      const firstName = form.firstName?.value?.trim() || "";
      const lastName = form.lastName?.value?.trim() || "";
      const email = form.email?.value?.trim() || "";
      const phone = form.phone?.value?.trim() || "";
      const team = form.team?.value || "";
      const message = form.message?.value?.trim() || "";

      const fullName = [firstName, lastName].filter(Boolean).join(" ");

      const subject = "New enquiry from Servi Contact website";

      const lines = [
        `Name: ${fullName || "N/A"}`,
        `Email: ${email || "N/A"}`,
        `Phone: ${phone || "N/A"}`,
        `Team to contact: ${team || "N/A"}`,
        "",
        "Message:",
        message || "N/A",
      ];

      const body = lines.join("\n");
      const mailto = `mailto:info@servi-contact.co.za?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }
});

