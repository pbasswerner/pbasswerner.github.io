// Mobile Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Toggle Burger Animation
        burger.classList.toggle('toggle');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');

                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
};

// Navbar scroll effect
const navScroll = () => {
    const nav = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = window.scrollY;

        // Add background when scrolled
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
};

// Form Submission
const contactForm = () => {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // You would normally send this data to a server
            console.log('Form submitted:', { name, email, message });

            // Clear form and show success message
            form.reset();
            alert('Thank you for your message! I will get back to you soon.');

            // In production, you would use a service like Formspree, Netlify Forms, or a custom backend
            // Example for Formspree:
            // const formData = new FormData(form);
            // fetch('https://formspree.io/your-formspree-endpoint', {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // })
            // .then(response => {
            //     form.reset();
            //     alert('Thank you for your message! I will get back to you soon.');
            // })
            // .catch(error => {
            //     alert('Oops! There was a problem submitting your form. Please try again.');
            // });
        });
    }
};

// Project Filter (if you want to add filtering functionality)
const projectFilter = () => {
    // This is a placeholder for potential project filtering functionality
    // You can implement this if you want to allow visitors to filter projects by category
};

// Scroll Animations (using Intersection Observer API)
const scrollAnimation = () => {
    const elements = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .education-item, .contact-item');

    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    navScroll();
    contactForm();

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .project-card, .timeline-item, .skill-category, .education-item, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    scrollAnimation();
});