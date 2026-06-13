document.addEventListener('DOMContentLoaded', () => {
  const resumeLink = document.querySelector('a[href="#resume"]');
  const modal = document.getElementById('resumeModal');
  const closeBtn = document.getElementById('closeResumeModal');
  const iframe = document.getElementById('resumeIframe');
  
  // Path to your PDF – adjust if needed
  const pdfPath = 'files/DavyMercado.pdf'; 

  // Open modal and load PDF
  function openModal(e) {
    e.preventDefault();
    modal.classList.add('active');
    iframe.src = pdfPath;
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    iframe.src = ''; // unload PDF
    document.body.style.overflow = '';
  }

  // Event listeners
  resumeLink.addEventListener('click', openModal);

  closeBtn.addEventListener('click', closeModal);

  // Close when clicking overlay (outside modal content)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});