// ======================================
// NAVBAR ACTIVE STATE ON SCROLL
// ======================================

const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ======================================
// SMOOTH SCROLL NAVIGATION (FIXED)
// ======================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip empty hash (e.g., href="#")
        if (href === '#') return;

        e.preventDefault();

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Get navbar height for offset
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ======================================
// BUTTON INTERACTIONS
// ======================================

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.opacity = '0.9';
    });

    button.addEventListener('mouseleave', () => {
        button.style.opacity = '1';
    });

    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// ======================================
// SCROLL REVEAL ANIMATIONS
// ======================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(
    '.service-card, .project-item, .certificate-card, .experience-item'
).forEach(element => {
    observer.observe(element);
});

// ======================================
// ADD ACTIVE STATE STYLING
// ======================================

const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        font-weight: 500;
    }

    .reveal {
        animation: slideInUp 0.6s ease-out;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ======================================
// CONTACT LINK HANDLERS
// ======================================

const contactEmail = document.querySelector('.contact-email');
const contactPhone = document.querySelector('.contact-phone');

if (contactEmail) {
    contactEmail.addEventListener('click', () => {
        window.location.href = 'mailto:hello@davymercado.com';
    });
}

if (contactPhone) {
    contactPhone.addEventListener('click', () => {
        window.location.href = 'tel:+63123456789';
    });
}

// ======================================
// SOCIAL LINKS HANDLER
// ======================================

const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const socialText = link.textContent;
        console.log(`Opening ${socialText}`);
    });
});

// ======================================
// RESUME BUTTON HANDLER
// ======================================

const resumeBtn = document.querySelector('.resume-btn');

if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
        console.log('Resume download initiated');
    });
}

// ======================================
// NAVBAR STICKY EFFECT
// ======================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ======================================
// PAGE LOAD ANIMATIONS
// ======================================

window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInDown 0.8s ease-out';
    }
});

const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(additionalStyle);

// ======================================
// FORM VALIDATION (if contact form added)
// ======================================

const contactForm = document.querySelector('form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        if (!data.name || !data.email || !data.message) {
            console.warn('Please fill out all fields');
            return;
        }

        console.log('Form submitted:', data);
        
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Message sent successfully!';
        successMsg.style.cssText = `
            background-color: var(--primary-green);
            color: var(--black);
            padding: 12px 16px;
            border-radius: 4px;
            margin-top: 12px;
            text-align: center;
        `;
        contactForm.appendChild(successMsg);

        setTimeout(() => {
            contactForm.reset();
            successMsg.remove();
        }, 2000);
    });
}

// ======================================
// MOBILE MENU (FIXED – NO DUPLICATES)
// ======================================

function initMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    if (!navContainer || !navLinks) return;

    // ✅ GUARD: If hamburger already exists, stop
    if (navContainer.querySelector('.hamburger')) return;

    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    navContainer.insertBefore(hamburger, navLinks);

    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Resize listener: reset menu if window becomes wider than 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// ✅ Call only ONCE (no resize binding)
initMobileMenu();

// ======================================
// UTILITY: LOG PAGE INTERACTIONS
// ======================================

console.log('Portfolio site loaded successfully!');
console.log('All interactive elements are ready.');

