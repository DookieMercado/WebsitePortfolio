// Loop version - types, pauses, deletes, repeats
document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.getElementById('typed-text');
    const fullText = "I Design Mobile and Web Interface.";
    
    if (!typedTextElement) return;
    
    let currentIndex = 0;
    let isDeleting = false;
    let speed = 100;
    
    function animateText() {
        // Show current portion of text
        typedTextElement.textContent = fullText.substring(0, currentIndex);
        
        if (!isDeleting && currentIndex < fullText.length) {
            // Typing forward
            currentIndex++;
            speed = 80 + Math.random() * 40; // 80-120ms
        } else if (isDeleting && currentIndex > 0) {
            // Deleting backward
            currentIndex--;
            speed = 50; // Faster when deleting
        }
        
        // Change direction when reaching boundaries
        if (!isDeleting && currentIndex === fullText.length) {
            // Pause at the end for 1.5 seconds
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && currentIndex === 0) {
            // Pause at the beginning for 0.5 seconds
            speed = 500;
            isDeleting = false;
        }
        
        setTimeout(animateText, speed);
    }
    
    setTimeout(animateText, 1000);
});