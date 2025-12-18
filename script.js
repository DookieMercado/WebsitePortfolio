// ===================== Mobile menu toggle =====================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// ===================== Smooth scrolling =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1500;
            let startTime = null;

            function easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }

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
    });
});

// ===================== See More Projects =====================
const seeMoreBtn = document.getElementById('seeMoreBtn');
const sideProjects = document.getElementById('sideProjects');

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
            const target = document.getElementById('projects');
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1200;
            let startTime = null;

            function easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }

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
        }, 100);
    }
});

// ===================== Skills highlight =====================
const skillHighlights = document.querySelectorAll('.skill-highlight');
const techItems = document.querySelectorAll('.tech-item');

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

const rgbOverlay = document.getElementById('rgbOverlay');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    // Reduce the radius to make highlight smaller
    rgbOverlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(24,201,217,0.2), transparent 20%)`;
});
