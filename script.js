// ===================== DOM Elements =====================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const seeMoreBtn = document.getElementById('seeMoreBtn');
const sideProjects = document.getElementById('sideProjects');
const skillHighlights = document.querySelectorAll('.skill-highlight');
const techItems = document.querySelectorAll('.tech-item');
const rgbOverlay = document.getElementById('rgbOverlay');
const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// ===================== Data and Maps =====================
const certificateImages = {
    'accenture': 'certificates/digital.png',
    'topcit': 'certificates/Topcit.png',
    'tesda': 'certificates/nc2.jpg',
    'learnify': 'certificates/Learnify.png',
    'byol': 'certificates/bring.png',
    'ajsmart': 'certificates/ajsmart.png',
    'cisco-itcs': 'certificates/cyber.png',
    'cisco-itn': 'certificates/itn.png',
    'cisco-srwe': 'certificates/srwe.png'
};

const skillTechMap = {
    'figma': 'figma',
    'html': 'html',
    'css': 'css',
    'javascript': 'javascript',
    'git': 'git',
    'github': 'github',
    'php': 'php',
    'mysql': 'mysql',
    'laravel': 'laravel',
    'react': 'react',
    'expo': 'expo',
    'android': 'android'
};

// ===================== Utility Functions =====================
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function smoothScrollTo(targetId, duration = 1500, offset = 100) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function scrollAnimation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    requestAnimationFrame(scrollAnimation);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
        rect.bottom >= 0
    );
}

function closeModalFunc() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===================== Mobile Menu =====================
function initMobileMenu() {
    if (!mobileMenuToggle || !navLinks) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// ===================== Smooth Scrolling =====================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
}

// ===================== See More Projects =====================
function initSeeMoreProjects() {
    if (!seeMoreBtn || !sideProjects) return;
    
    seeMoreBtn.addEventListener('click', () => {
        const isShown = sideProjects.classList.contains('show');
        
        if (!isShown) {
            sideProjects.classList.remove('hidden');
            sideProjects.classList.add('show');
            seeMoreBtn.textContent = 'Show Less';
            seeMoreBtn.classList.add('active');
        } else {
            sideProjects.classList.remove('show');
            sideProjects.classList.add('hidden');
            seeMoreBtn.textContent = 'See More Projects';
            seeMoreBtn.classList.remove('active');
            
            setTimeout(() => {
                smoothScrollTo('#projects', 1200);
            }, 100);
        }
    });
}

// ===================== Skills Highlight =====================
function initSkillsHighlight() {
    skillHighlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', () => {
            const skillName = highlight.getAttribute('data-skill');
            const techName = skillTechMap[skillName];
            
            if (techName) {
                techItems.forEach(item => {
                    if (item.getAttribute('data-tech') === techName) {
                        item.classList.add('highlight');
                    }
                });
            }
        });
        
        highlight.addEventListener('mouseleave', () => {
            techItems.forEach(item => {
                item.classList.remove('highlight');
            });
        });
    });
}

// ===================== RGB Overlay Effect =====================
function initRGBOverlay() {
    if (!rgbOverlay) return;
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        rgbOverlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(24,201,217,0.2), transparent 20%)`;
    });
}

// ===================== Certificate Modal =====================
function initCertificateModal() {
    if (!modal || !modalImage || !closeModal) return;
    
    document.querySelectorAll('.certificate-item').forEach(item => {
        item.addEventListener('click', function() {
            const certId = this.getAttribute('data-certificate');
            if (certId && certificateImages[certId]) {
                modalImage.src = certificateImages[certId];
                modalImage.alt = this.textContent.trim() + ' Certificate';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModal.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
}

// ===================== Scroll Reveal Animations =====================
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    revealElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('revealed');
        }
    });
}

function staggerReveal() {
    const staggeredElements = document.querySelectorAll('.stagger-reveal');
    
    staggeredElements.forEach((element, index) => {
        if (isElementInViewport(element)) {
            setTimeout(() => {
                element.classList.add('revealed');
            }, index * 100);
        }
    });
}

function initScrollReveal() {
    // Add reveal classes to elements
    const elementsToReveal = document.querySelectorAll(
        '.skill-card, .tech-item, .project-card, .certificate-item, .about-content, .contact-form, .hero-text, .hero-image'
    );
    
    elementsToReveal.forEach(element => {
        element.classList.add('reveal-on-scroll');
    });
    
    // Add directional classes for specific animations
    const leftElements = document.querySelectorAll('.hero-text, .about-content');
    leftElements.forEach(element => {
        element.classList.add('fade-in-left', 'reveal-on-scroll');
    });
    
    const rightElements = document.querySelectorAll('.hero-image, .contact-form');
    rightElements.forEach(element => {
        element.classList.add('fade-in-right', 'reveal-on-scroll');
    });
    
    // Setup staggered animations for skills
    const skillCards = document.querySelectorAll('.skill-card');
    const techItems = document.querySelectorAll('.tech-item');
    
    skillCards.forEach((card, index) => {
        card.classList.add('stagger-reveal');
        card.style.setProperty('--stagger-index', index);
    });
    
    techItems.forEach((item, index) => {
        item.classList.add('stagger-reveal');
        item.style.setProperty('--stagger-index', index);
    });
    
    // Initial check
    revealOnScroll();
    staggerReveal();
    
    // Event listeners for scroll and resize
    window.addEventListener('scroll', () => {
        revealOnScroll();
        staggerReveal();
    });
    
    window.addEventListener('resize', () => {
        revealOnScroll();
        staggerReveal();
    });
}

// ===================== Initialize Everything =====================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScrolling();
    initSeeMoreProjects();
    initSkillsHighlight();
    initRGBOverlay();
    initCertificateModal();
    initScrollReveal();
});
// ===================== PDF Modal =====================
function initPdfModal() {
    const pdfModal = document.getElementById('pdfModal');
    const pdfCloseBtn = document.querySelector('.pdf-close-btn');
    const pdfViewer = document.getElementById('pdfViewer');
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    
    // PDF file path
    const pdfUrl = 'files/ResumeM.pdf'; // Your PDF file path
    
    // Open PDF modal
    viewResumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openPdfModal();
    });
    
    function openPdfModal() {
        // Set the PDF as the iframe source
        pdfViewer.src = pdfUrl;
        pdfModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closePdfModal() {
        pdfModal.classList.remove('active');
        pdfViewer.src = ''; // Clear the iframe source
        document.body.style.overflow = 'auto';
    }
    
    // Close button
    pdfCloseBtn.addEventListener('click', closePdfModal);
    
    // Close when clicking outside
    pdfModal.addEventListener('click', function(e) {
        if (e.target === pdfModal) {
            closePdfModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
            closePdfModal();
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPdfModal);