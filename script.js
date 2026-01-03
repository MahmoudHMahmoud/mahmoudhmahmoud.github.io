// DOM Elements
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const collapseBtn = document.getElementById('collapse-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav-link');

// --- Theme Toggling ---
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
} else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// --- Sidebar Logic ---

// Open Sidebar    // Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    mobileMenuBtn.classList.add('hidden'); // Hide button
});

// Close Sidebar Function
function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    mobileMenuBtn.classList.remove('hidden'); // Show button
}

// Close via Overlay
overlay.addEventListener('click', closeSidebar);

// Close via "Collapse" Button (now serves as Close button)
collapseBtn.addEventListener('click', closeSidebar);

// Close when a link is clicked (Always, since it's an overlay drawer now)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });

    // Active link highlighting
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// --- Scroll Animations ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});
