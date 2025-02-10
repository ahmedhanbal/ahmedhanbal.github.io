// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const rootElement = document.documentElement;

function setTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Enhanced Mobile Navigation
const navbarToggle = document.getElementById('navbarToggle');
const navbarLinks = document.querySelector('.navbar-links');

navbarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navbarLinks.classList.toggle('active');
    // Update toggle icon
    const icon = navbarToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbarLinks.contains(e.target) && !navbarToggle.contains(e.target)) {
        navbarLinks.classList.remove('active');
        // Reset toggle icon
        const icon = navbarToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link
navbarLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navbarLinks.classList.remove('active');
        // Reset toggle icon
        const icon = navbarToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Enhanced smooth scrolling with improved section transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Height of your fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking
            navbarLinks.classList.remove('active');
        }
    });
});

// Improved section scrolling with better transitions
const sections = document.querySelectorAll('.hero, #skills, #projects');
let currentSectionIndex = 0;
let isScrolling = false;
let lastScrollTime = Date.now();
const scrollCooldown = 100; // Increased cooldown for smoother transitions

// Track current section
function updateCurrentSection() {
    const scrollPosition = window.scrollY;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionIndex = index;
        }
    });
}

// Smooth scroll to section
function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        const headerOffset = 80;
        const targetPosition = sections[index].offsetTop - headerOffset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        currentSectionIndex = index;

        // Reset scroll flag after animation
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
}

// Handle scroll events with improved logic
window.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastScrollTime < scrollCooldown) return;
    lastScrollTime = now;

    const currentSection = sections[currentSectionIndex];
    const rect = currentSection.getBoundingClientRect();
    const isAtTop = rect.top >= -10;
    const isAtBottom = rect.bottom <= window.innerHeight + 10;

    // Allow normal scrolling within sections unless at boundaries
    if (!isScrolling) {
        if (e.deltaY > 0 && isAtBottom && currentSectionIndex < sections.length - 1) {
            // Scrolling down and at bottom of section
            isScrolling = true;
            scrollToSection(currentSectionIndex + 1);
        } else if (e.deltaY < 0 && isAtTop && currentSectionIndex > 0) {
            // Scrolling up and at top of section
            isScrolling = true;
            scrollToSection(currentSectionIndex - 1);
        }
    }
});

// Update current section on scroll
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        updateCurrentSection();
    }
});

// Initialize current section
updateCurrentSection();

// Scroll to Top Button with smooth animation
const scrollTopButton = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    scrollTopButton.classList.toggle('visible', window.scrollY > 300);
});

scrollTopButton.addEventListener('click', () => {
    isScrolling = true;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
});

// Email Copy Functionality
const emailCopy = document.getElementById('emailCopy');
emailCopy.addEventListener('click', () => {
    const email = 'ahmed.alizahid14@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copied!';
        tooltip.style.cssText = `
            position: fixed;
            background: var(--accent);
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
        `;
        document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    });
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category').forEach(element => {
    observer.observe(element);
});