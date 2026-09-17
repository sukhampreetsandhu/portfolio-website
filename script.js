document.addEventListener('DOMContentLoaded', () => {
    // =====================
    // MOBILE NAVIGATION
    // =====================
    const menuToggle = document.getElementById('menuToggle');
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    function setMenuState(isOpen) {
        if (!menuToggle || !menuIcon || !navbar) return;
        navbar.classList.toggle('active', isOpen);
        menuIcon.classList.toggle('bx-x', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    }

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            setMenuState(!navbar.classList.contains('active'));
        });

        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenuState(false));
        });
    }

    // =====================
    // DARK MODE
    // =====================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);

    function updateThemeButton(theme) {
        if (!themeToggle || !themeIcon) return;
        const isDark = theme === 'dark';
        themeIcon.classList.toggle('bx-moon', !isDark);
        themeIcon.classList.toggle('bx-sun', isDark);
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    updateThemeButton(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme =
                document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            updateThemeButton(nextTheme);
        });
    }

    // =====================
    // TECH STACK MODAL
    // =====================
    const viewFullStackBtn = document.getElementById('viewFullStackBtn');
    const techStackModal = document.getElementById('techStackModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = techStackModal?.querySelector('.modal-content');
    let lastFocusedElement = null;

    function getFocusableElements() {
        if (!modalContent) return [];
        return [...modalContent.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )];
    }

    function handleModalKeydown(event) {
        if (event.key === 'Escape') {
            closeModal();
            return;
        }

        if (event.key !== 'Tab') return;
        const focusable = getFocusableElements();
        if (!focusable.length) {
            event.preventDefault();
            modalContent?.focus();
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function openModal() {
        if (!techStackModal) return;
        lastFocusedElement = document.activeElement;
        techStackModal.style.display = 'flex';
        techStackModal.setAttribute('aria-hidden', 'false');
        techStackModal.classList.remove('closing');
        requestAnimationFrame(() => techStackModal.classList.add('show'));
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', handleModalKeydown);
        modalClose?.focus();
    }

    function closeModal() {
        if (!techStackModal || techStackModal.getAttribute('aria-hidden') === 'true') return;
        techStackModal.classList.add('closing');
        techStackModal.classList.remove('show');
        document.removeEventListener('keydown', handleModalKeydown);

        window.setTimeout(() => {
            techStackModal.style.display = 'none';
            techStackModal.setAttribute('aria-hidden', 'true');
            techStackModal.classList.remove('closing');
            document.body.classList.remove('modal-open');
            if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
        }, 300);
    }

    viewFullStackBtn?.addEventListener('click', openModal);
    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);
    modalContent?.addEventListener('click', event => event.stopPropagation());

    // =====================
    // EMAIL FORM
    // =====================
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submitButton');

    if (window.emailjs) {
        emailjs.init('ZuvrCPIwsufChqZWG');
    }

    contactForm?.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (!window.emailjs) {
            alert('The contact form is temporarily unavailable. Please email me directly.');
            return;
        }

        if (submitButton) submitButton.disabled = true;

        try {
            await emailjs.sendForm('service_h3vfbym', 'template_6og8v1d', this);
            alert('Message sent successfully!');
            this.reset();
        } catch (error) {
            alert('Failed to send message. Please try again.');
            console.error('EmailJS error:', error);
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
});
