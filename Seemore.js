// ======================================
// SEE MORE / SEE LESS FUNCTIONALITY
// ======================================

const seeMoreBtns = document.querySelectorAll('.see-more-btn');

function updateButtonState(btn) {
    const section = btn.closest('section');
    const items = section.querySelectorAll('.experience-item, .project-item, .certificate-card');
    const totalItems = items.length;

    // CHANGED: threshold from 2 → 3
    if (totalItems > 3) {
        // Hide items beyond the first 3
        items.forEach((item, index) => {
            if (index >= 3) {               // was 2
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
        btn.textContent = 'See More';
        btn.setAttribute('data-expanded', 'false');
    } else {
        // 3 or fewer items – show all, button says "See Less"
        items.forEach(item => item.style.display = 'block');
        btn.textContent = 'See Less';
        btn.setAttribute('data-expanded', 'true');
    }
}

// Initialize all see‑more sections
seeMoreBtns.forEach(btn => updateButtonState(btn));

// Click handler
seeMoreBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.closest('section');
        const items = section.querySelectorAll('.experience-item, .project-item, .certificate-card');
        const totalItems = items.length;
        const isExpanded = this.getAttribute('data-expanded') === 'true';

        // CHANGED: threshold from 2 → 3
        if (totalItems > 3) {
            if (!isExpanded) {
                // Show all items
                items.forEach(item => item.style.display = 'block');
                this.textContent = 'See Less';
                this.setAttribute('data-expanded', 'true');
            } else {
                // Hide items beyond the third
                items.forEach((item, index) => {
                    item.style.display = index < 3 ? 'block' : 'none';   // was 2
                });
                this.textContent = 'See More';
                this.setAttribute('data-expanded', 'false');
            }
        } else {
            // 3 or fewer: toggle all items
            if (isExpanded) {
                items.forEach(item => item.style.display = 'none');
                this.textContent = 'See More';
                this.setAttribute('data-expanded', 'false');
            } else {
                items.forEach(item => item.style.display = 'block');
                this.textContent = 'See Less';
                this.setAttribute('data-expanded', 'true');
            }
        }
    });
});

// ======================================
// REVEAL ANIMATION STYLING
// ======================================

const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal {
        animation: slideInUp 0.6s ease-out;
    }
    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(revealStyle);