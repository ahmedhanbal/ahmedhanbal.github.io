const sections = document.querySelectorAll('.hidden-section');
const intro = document.querySelector('.intro');

// Observer for hidden sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Reset animations when section comes into view
            if (entry.target === intro) {
                const lines = document.querySelectorAll('.animated-text h2');
                lines.forEach(line => line.classList.remove('animate'));
                setTimeout(animateAboutText, 100); // Slight delay to ensure reset takes effect
            }
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Observe the intro section as well
observer.observe(intro);

// Navbar dropdown toggle
const navbarToggle = document.getElementById('navbarToggle');
const navbarLinks = document.querySelector('.navbar-links');

navbarToggle.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (!navbarLinks.contains(event.target) && event.target !== navbarToggle) {
        navbarLinks.classList.remove('active');
    }
});

// Theme toggle
const themeStatus = document.getElementById('themeStatus');
const rootElement = document.documentElement;

function setInitialTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    rootElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    updateThemeStatus();
}

function updateThemeStatus() {
    const currentTheme = rootElement.getAttribute('data-theme');
    themeStatus.textContent = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
}

themeStatus.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    rootElement.setAttribute('data-theme', newTheme);
    updateThemeStatus();
});

setInitialTheme();

// Update the animation function
function animateAboutText() {
    const lines = document.querySelectorAll('.animated-text h2');
    let delay = 500; // Start after the section animation
    
    lines.forEach((line) => {
        setTimeout(() => {
            line.classList.add('animate');
        }, delay);
        delay += 500; // Each line appears 500ms after the previous one
    });
}

// Scroll to top functionality
const scrollToTop = document.querySelector('.scroll-to-top');

// Show button when page is scrolled up 100px
const toggleScrollButton = () => {
    if (window.scrollY > 100) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
};

// Smooth scroll to top when button is clicked
scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Listen for scroll events
window.addEventListener('scroll', toggleScrollButton);

