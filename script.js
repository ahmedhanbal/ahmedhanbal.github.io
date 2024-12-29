const sections = document.querySelectorAll('.hidden-section');

// Observer for hidden sections
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

const rotatingLines = document.querySelectorAll('.animated-text h2:nth-child(n+1)'); 
let currentIndex = 0;

function displayLineWordByWord(line, callback) {
    const words = line.dataset.text.split(' ');
    line.textContent = ''; 
    let wordIndex = 0;

    function showNextWord() {
        if (wordIndex < words.length) {
            line.textContent += words[wordIndex] + ' ';
            wordIndex++;
            setTimeout(showNextWord, 200); 
        } else if (callback) {
            callback();
        }
    }

    showNextWord();
}

function rotateLines() {
    rotatingLines.forEach((line) => {
        line.style.opacity = '0';
    });

    // Get the current line
    const currentLine = rotatingLines[currentIndex];
    currentLine.style.opacity = '1'; // Make it visible

    displayLineWordByWord(currentLine, () => {
        currentIndex = (currentIndex + 1) % rotatingLines.length;
        setTimeout(rotateLines, 3000); 
    });
}

rotateLines();

