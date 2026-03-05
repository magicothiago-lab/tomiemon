/* ============================
   NAVBAR SCROLL BEHAVIOR
============================ */

let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar?.offsetHeight || 0;

window.addEventListener('scroll', function () {
    const currentScrollPosition = window.pageYOffset;

    if (!navbar) return;

    // Hide navbar on scroll down
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > navbarHeight) {
        navbar.style.transform = 'translateY(-100%)';
    }
    // Show navbar on scroll up
    else if (currentScrollPosition < lastScrollPosition) {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollPosition = currentScrollPosition;
});

// Show navbar when mouse enters top of page
document.addEventListener('mousemove', function (e) {
    if (!navbar) return;
    if (e.clientY < 100) {
        navbar.style.transform = 'translateY(0)';
    }
});

/* ============================
   DARK MODE TOGGLE
============================ */

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const icon = document.querySelector('.theme-toggle i');

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (icon) {
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Load saved theme on page load
window.addEventListener('load', function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const icon = document.querySelector('.theme-toggle i');

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (icon) {
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
});

/* ============================
   FADE IN ON SCROLL ANIMATION
============================ */

const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = function () {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

// Initialize elements with opacity 0
fadeElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
});

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

/* ============================
   NAVBAR SCROLL CLASS
============================ */

window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    }
});

/* ============================
   FAQ ACCORDION (if exists)
============================ */

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const faqItem = this.parentElement;
        faqItem.classList.toggle('active');
    });
});

/* ============================
   ADSENSE INITIALIZATION
============================ */

window.addEventListener('load', function () {
    try {
        if (window.adsbygoogle) {
            (adsbygoogle = window.adsbygoogle || []).push({});
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    } catch (e) {
        console.error('AdSense error:', e);
    }
});