// Animate statistics numbers
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            element.textContent = end.toLocaleString();
        } else {
            element.textContent = Math.round(current).toLocaleString();
        }
    }, 16);
}

// Initialize animations when elements are in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsNumbers = entry.target.querySelectorAll('h2');
            statsNumbers.forEach(number => {
                const finalValue = parseInt(number.textContent.replace(/,/g, ''));
                animateValue(number, 0, finalValue, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
});

// Start observing the stats section
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Contact form handling - only if form exists
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm && typeof emailjs !== 'undefined') {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            emailjs.sendForm('service_95ienuk', 'template_n8e5lpk', this)
                .then(() => {
                    alert("Message sent successfully!");
                    this.reset();
                }, (error) => {
                    alert("Failed to send message. Try again.");
                    console.error(error);
                });
        });
    }
});

