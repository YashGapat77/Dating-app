// Main JavaScript for landing page

document.addEventListener('DOMContentLoaded', function () {

    // Mobile menu toggle

    const MobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('mobile-active');

        });
    }

    // Smooth scrolling for anchor links

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // Add animation on scroll

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

            }
        });

    }, observerOption);

    // Observe all feature cards

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });



});
