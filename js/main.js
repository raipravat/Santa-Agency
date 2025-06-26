document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        }

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const isDark = document.body.getAttribute('data-theme') === 'dark';
                document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
                localStorage.setItem('theme', isDark ? 'light' : 'dark');
                themeToggle.focus();
            });
        }

        // Scroll to top
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) {
            window.addEventListener('scroll', debounce(() => {
                scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
                // Navbar scroll state
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    navbar.classList.toggle('scrolled', window.pageYOffset > 50);
                }
            }, 100));

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (!('scrollBehavior' in document.documentElement.style)) return;
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Highlight active nav link
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        function highlightNavLink() {
            let index = sections.length - 1;
            const scrollY = window.pageYOffset + 100;
            while (index >= 0 && scrollY < sections[index].offsetTop) {
                index--;
            }
            navLinks.forEach(link => link.classList.remove('active'));
            if (index >= 0 && navLinks[index]) {
                navLinks[index].classList.add('active');
            }
        }
        window.addEventListener('scroll', debounce(highlightNavLink, 100));
        highlightNavLink();

        // Scroll animations with IntersectionObserver
        const animateOnScroll = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.section-title, .about .content, .service-card, .policy-card, .testimonial-card, .accordion-item, .info, .php-email-form').forEach(element => {
                observer.observe(element);
            });
        };
        animateOnScroll();

        // Set footer year
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Form submission
        const contactForm = document.querySelector('.php-email-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitBtn = this.querySelector('.submit-btn');
                const loading = this.querySelector('.loading');
                const success = this.querySelector('.success');
                const error = this.querySelector('.error');
                const email = this.querySelector('#email').value;

                if (!email.includes('@')) {
                    error.style.display = 'block';
                    error.textContent = 'Please enter a valid email address.';
                    setTimeout(() => error.style.display = 'none', 3000);
                    return;
                }

                submitBtn.disabled = true;
                loading.style.display = 'block';
                // Simulate async submission
                setTimeout(() => {
                    loading.style.display = 'none';
                    success.style.display = 'block';
                    this.reset();
                    submitBtn.disabled = false;
                    setTimeout(() => success.style.display = 'none', 3000);
                }, 1000);
            });
        }

        // Lazy load images
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });

        // Debounce function
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    } catch (error) {
        console.error('Error in main.js:', error);
    }
});