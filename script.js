document.addEventListener('DOMContentLoaded', function() {

    // =====================
    // MENU TOGGLE (Mobile Navigation)
    // =====================
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
    }

    // =====================
    // DARK MODE TOGGLE
    // =====================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    if (themeToggle && themeIcon) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            themeIcon.classList.remove('bx-moon');
            themeIcon.classList.add('bx-sun');
        }

        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');

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
        });
    }

    // =====================
    // TECH STACK MODAL
    // =====================
    const viewFullStackBtn = document.getElementById('viewFullStackBtn');
    const techStackModal = document.getElementById('techStackModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.querySelector('.modal-content');

    function openModal() {
        if (!techStackModal) return;
        techStackModal.style.display = 'flex';
        techStackModal.offsetHeight;
        techStackModal.classList.add('show');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', handleEscapeKey);
    }

    function closeModal() {
        if (!techStackModal) return;
        techStackModal.classList.add('closing');
        techStackModal.classList.remove('show');

        setTimeout(() => {
            techStackModal.style.display = 'none';
            techStackModal.classList.remove('closing');
            document.body.classList.remove('modal-open');
        }, 300);

        document.removeEventListener('keydown', handleEscapeKey);
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    if (viewFullStackBtn) {
        viewFullStackBtn.addEventListener('click', openModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // =====================
    // EMAIL FORM (EmailJS Integration)
    // =====================
    const contactForm = document.getElementById('contact-form');

    if (window.emailjs) {
        emailjs.init('ZuvrCPIwsufChqZWG');
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!window.emailjs) {
                alert('Email service is not available right now. Please try again later.');
                return;
            }

            emailjs.sendForm(
                'service_h3vfbym',
                'template_6og8v1d',
                this
            ).then(
                function () {
                    alert('Message sent successfully!');
                    contactForm.reset();
                },
                function (error) {
                    alert('Failed to send message. Please try again.');
                    console.log(error);
                }
            );
        });
    }

});