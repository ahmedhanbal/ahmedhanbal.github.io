const sections = document.querySelectorAll('.hidden-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

const animatedText = document.querySelector('.animated-text h2');
const text = animatedText.textContent;
animatedText.textContent = '';

let index = 0;
const words = text.split(' ');

function showWord() {
    if (index < words.length) {
        animatedText.textContent += words[index] + ' ';
        index++;
        setTimeout(showWord, 200);
    }
}

showWord();

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
