document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CAROUSEL LOGIC (Remains for infinite loop) ---
    const carouselTrack = document.querySelector('.carousel-track');
    const projectCards = document.querySelectorAll('.project-card');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');

    let currentIndex = 0;
    const totalCards = projectCards.length;
    
    // When showing only 1 card, the display count for limits is always 1.
    const itemsPerDisplay = 1; 

    const updateCarousel = () => {
        
        // 1. Calculate Offset (Always shift by the full width of one card)
        const cardWidth = projectCards[0].offsetWidth; 
        let offset = currentIndex * cardWidth; 

        carouselTrack.style.transform = `translateX(-${offset}px)`;

        // 2. Update active class (Focus is always on the card at currentIndex)
        projectCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentIndex) {
                card.classList.add('active');
            }
        });
    };

    // Initial load/resize logic
    window.addEventListener('resize', () => {
        currentIndex = 0; 
        updateCarousel();
    });

    // Initial setup
    updateCarousel();

    // --- Manual Navigation (Infinite Loop Implemented) ---
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });

    // --- 2. GIF ON HOVER LOGIC (NEW IMPLEMENTATION) ---
    document.querySelectorAll('.card-media-wrapper').forEach(wrapper => {
        const gifElement = wrapper.querySelector('.project-media-gif');
        const overlay = wrapper.querySelector('.video-overlay');

        if (!gifElement) return; // Skip if element not found

        // Store the static poster source for reset
        const posterSrc = gifElement.src; 
        // Get the high-resolution GIF source from the data attribute
        const gifSrc = gifElement.getAttribute('data-gif-src'); 

        // Load GIF on hover
        wrapper.addEventListener('mouseenter', () => {
            // Swap the static poster source for the animated GIF source
            gifElement.src = gifSrc;
            // Hide the overlay
            if (overlay) overlay.style.opacity = '0';
        });

        // Reset to poster on mouse leave
        wrapper.addEventListener('mouseleave', () => {
            // Swap the GIF source back to the static poster source
            gifElement.src = posterSrc;
            // Show the overlay again
            if (overlay) overlay.style.opacity = '1';
        });
    });
});