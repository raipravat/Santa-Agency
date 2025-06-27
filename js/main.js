 document.addEventListener("DOMContentLoaded", function () {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector(".mobile-menu-toggle");
        const navMenu = document.querySelector(".nav-menu");

        if (mobileMenuBtn && navMenu) {
          mobileMenuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");
            const icon = this.querySelector("i");
            icon.classList.toggle("fa-times");
            icon.classList.toggle("fa-bars");
          });
        }

        // Theme Toggle
        const themeToggle = document.getElementById("themeToggle");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

        // Check for saved preference or use system preference
        const currentTheme =
          localStorage.getItem("theme") ||
          (prefersDark.matches ? "dark" : "light");

        if (currentTheme === "dark") {
          document.body.classList.add("dark-mode");
        }

        if (themeToggle) {
          themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const theme = document.body.classList.contains("dark-mode")
              ? "dark"
              : "light";
            localStorage.setItem("theme", theme);
          });
        }

        // Close mobile menu when clicking a link
        document.querySelectorAll(".nav-menu a").forEach((link) => {
          link.addEventListener("click", () => {
            if (navMenu) {
              navMenu.classList.remove("show");
              document
                .querySelector(".mobile-menu-toggle i")
                .classList.remove("fa-times");
              document
                .querySelector(".mobile-menu-toggle i")
                .classList.add("fa-bars");
            }
          });
        });

        // Active section indicator
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-menu a");

        function updateActiveNav() {
          let current = "";

          sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 150) {
              current = section.getAttribute("id");
            }
          });

          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
              link.classList.add("active");
            }
          });
        }

        window.addEventListener("scroll", updateActiveNav);
        updateActiveNav(); // Initialize on load

        // Smooth scrolling for navigation links
        document.querySelectorAll(".nav-menu a").forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
              e.preventDefault();

              const targetId = this.getAttribute("href");
              const targetElement = document.querySelector(targetId);

              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop - 100,
                  behavior: "smooth",
                });
              }
            }

            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains("show")) {
              navMenu.classList.remove("show");
              document
                .querySelector(".mobile-menu-toggle i")
                .classList.remove("fa-times");
              document
                .querySelector(".mobile-menu-toggle i")
                .classList.add("fa-bars");
            }
          });
        });

        // Testimonial slider
        const testimonials = document.querySelectorAll(".testimonial");
        const dots = document.querySelectorAll(".dot");
        let currentTestimonial = 0;
        let testimonialInterval;

        function showTestimonial(index) {
          testimonials.forEach((testimonial) =>
            testimonial.classList.remove("active")
          );
          dots.forEach((dot) => dot.classList.remove("active"));

          testimonials[index].classList.add("active");
          dots[index].classList.add("active");
          currentTestimonial = index;
        }

        function startTestimonialSlider() {
          testimonialInterval = setInterval(() => {
            let nextTestimonial =
              (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextTestimonial);
          }, 7000);
        }

        if (testimonials.length > 0) {
          dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
              clearInterval(testimonialInterval);
              showTestimonial(index);
              startTestimonialSlider();
            });
          });

          startTestimonialSlider();
        }

        // Form submission
        const contactForm = document.getElementById("contactForm");

        if (contactForm) {
          contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const message = document.getElementById("message").value;

            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log("Form submitted:", { name, email, phone, message });

            // Show success message
            const successMessage = document.createElement("div");
            successMessage.innerHTML = `
                        <div style="background: #4CAF50; color: white; padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                            <i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you within 24 hours.
                        </div>
                    `;
            contactForm.appendChild(successMessage);

            // Reset form
            contactForm.reset();

            // Scroll to show message
            successMessage.scrollIntoView({ behavior: "smooth" });

            // Remove message after 5 seconds
            setTimeout(() => {
              successMessage.remove();
            }, 5000);
          });
        }

        // Set current year in footer
        const yearElem = document.getElementById("year");
        if (yearElem) {
          yearElem.textContent = new Date().getFullYear();
        }
      });