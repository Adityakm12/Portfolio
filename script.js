document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CAROUSEL LOGIC ---
    const carouselTrack = document.querySelector('.carousel-track');
    const projectCards = document.querySelectorAll('.project-card');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');

    let currentIndex = 0;
    const totalCards = projectCards.length;
    
    // When showing only 1 card, the display count for limits is always 1.
    const itemsPerDisplay = 1; 

    /**
     * Updates the carousel position and active card class.
     */
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
        
        // 3. Arrow disabling logic is REMOVED for infinite loop.
    };

    // Initial load/resize logic
    window.addEventListener('resize', () => {
        // Reset to first card on resize
        currentIndex = 0; 
        updateCarousel();
    });

    // Initial setup
    updateCarousel();

    // --- Manual Navigation (Infinite Loop Implemented) ---
    leftArrow.addEventListener('click', () => {
        // Decrement index. If it goes below 0 (before the first card), wrap to the last card.
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });

    rightArrow.addEventListener('click', () => {
        // Increment index. If it hits totalCards (after the last card), wrap to the first card (0).
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });

    // --- 2. VIDEO ON HOVER LOGIC (Stop and Reset) ---
    document.querySelectorAll('.card-media-wrapper').forEach(wrapper => {
        const video = wrapper.querySelector('.project-video');

        // Play video on hover
        wrapper.addEventListener('mouseenter', () => {
            if (video) {
                video.currentTime = 0; // Rewind to start
                video.play();
            }
        });

        // Stop video and reset to poster on mouse leave
        wrapper.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0; 
                // CRITICAL FIX: Forces the video element to display the 'poster' attribute again.
                video.load(); 
            }
        });
    });
});