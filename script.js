// Wait for the page to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {

// =====================
// MENU TOGGLE (Mobile Navigation)
// =====================
let menuToggle = document.querySelector('#menuToggle');
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuToggle.onclick = () => {
    const isOpen = navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
};

// =====================
// DARK MODE TOGGLE
// =====================
let themeToggle = document.getElementById('themeToggle');
let themeIcon = document.getElementById('themeIcon');

// Check for saved theme preference or default to light mode
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Set initial icon
if (currentTheme === 'dark') {
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
}

// Toggle theme
themeToggle.onclick = () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    }
}

// =====================
// TECH STACK MODAL (Improved with smooth animations)
// =====================
let viewFullStackBtn = document.getElementById('viewFullStackBtn');
let techStackModal = document.getElementById('techStackModal');
let modalClose = document.getElementById('modalClose');
let modalOverlay = document.getElementById('modalOverlay');
let lastFocusedElement = null;

// Function to open modal with smooth animation
function openModal() {
    lastFocusedElement = document.activeElement;
    techStackModal.style.display = 'flex';
    techStackModal.setAttribute('aria-hidden', 'false');
    // Trigger reflow to ensure animation plays
    techStackModal.offsetHeight;
    techStackModal.classList.add('show');
    document.body.classList.add('modal-open');
    modalClose.focus();
    
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
}

// Function to close modal with smooth animation
function closeModal() {
    techStackModal.classList.add('closing');
    techStackModal.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        techStackModal.style.display = 'none';
        techStackModal.setAttribute('aria-hidden', 'true');
        techStackModal.classList.remove('closing');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement) lastFocusedElement.focus();
    }, 300);
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
}

// Handle escape key press
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Event listeners
viewFullStackBtn.onclick = openModal;
modalClose.onclick = closeModal;
modalOverlay.onclick = closeModal;

// Prevent closing when clicking inside modal content
document.querySelector('.modal-content').onclick = (e) => {
    e.stopPropagation();
};

// =====================
// EMAIL FORM (EmailJS Integration)
// =====================
(function () {
    emailjs.init("ZuvrCPIwsufChqZWG");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    emailjs.sendForm(
        "service_h3vfbym",
        "template_6og8v1d",
        this
    ).then(
        function () {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset();
        },
        function (error) {
            alert("Failed to send message. Please try again.");
            console.log(error);
        }
    );
});

});