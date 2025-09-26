/**
 * Romantic Birthday Website Script
 * Handles all interactive features including animations, navigation, and media controls
 */

// Global variables
let currentSection = 'landing';
let musicPlaying = false;
let petalsInterval;
let confettiInterval;

// DOM elements
const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('.nav-btn');
const navigation = document.getElementById('navigation');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const beginBtn = document.getElementById('beginBtn');
const birthdayAnimation = document.getElementById('birthdayAnimation');
const typewriterMessage = document.getElementById('typewriterMessage');
const petalsContainer = document.getElementById('petalsContainer');
const confettiContainer = document.getElementById('confettiContainer');
const restartBtn = document.getElementById('restartBtn');
const replayBtn = document.getElementById('replayBtn');

// Birthday message for typewriter effect
const birthdayMessages = [
    "Wishing you the most wonderful birthday...",
    "May your special day be filled with joy...",
    "Another year of amazing memories begins...",
    "Celebrating the incredible person you are!"
];

/**
 * Initialize the website
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setupIntersectionObserver();
    preloadAssets();
});

/**
 * Set up all event listeners
 */
function initializeEventListeners() {
    // Begin button click
    beginBtn.addEventListener('click', handleBeginClick);
    
    // Navigation buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.getAttribute('data-section');
            navigateToSection(section);
        });
    });
    
    // Music toggle
    musicToggle.addEventListener('click', toggleMusic);
    
    // Action buttons
    restartBtn.addEventListener('click', restartExperience);
    replayBtn.addEventListener('click', replayAnimations);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyNavigation);
    
    // Smooth scroll for better UX
    document.addEventListener('wheel', handleSmoothScroll, { passive: false });
}

/**
 * Handle the begin button click - start the birthday experience
 */
function handleBeginClick() {
    // Hide the landing content
    document.querySelector('.landing-content').style.opacity = '0';
    document.querySelector('.landing-content').style.transform = 'translateY(-50px)';
    
    // Start background music
    setTimeout(() => {
        startBackgroundMusic();
    }, 500);
    
    // Start falling petals
    setTimeout(() => {
        startFallingPetals();
    }, 1000);
    
    // Show birthday animation
    setTimeout(() => {
        showBirthdayAnimation();
    }, 1500);
    
    // Show navigation after animation
    setTimeout(() => {
        navigation.classList.add('visible');
    }, 4000);
}

/**
 * Start background music
 */
function startBackgroundMusic() {
    // Since we can't include actual audio file, we'll simulate it
    // In real implementation, uncomment the following:
    /*
    backgroundMusic.play().then(() => {
        musicPlaying = true;
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }).catch(err => {
        console.log('Audio autoplay prevented:', err);
    });
    */
    
    // Simulate music playing
    musicPlaying = true;
    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
}

/**
 * Toggle background music
 */
function toggleMusic() {
    if (musicPlaying) {
        // backgroundMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicToggle.classList.add('muted');
        musicPlaying = false;
    } else {
        // backgroundMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        musicToggle.classList.remove('muted');
        musicPlaying = true;
    }
}

/**
 * Start falling petals animation
 */
function startFallingPetals() {
    const petalImages = [
        'https://pixabay.com/get/g831308660c26da20c12c856efe91140d14f66ad777574f13f68bbc40bcbd3c5eab96ebc4ccbc8c5e557456f34e6b92473db75d8035270eb6b76afacbe4818c70_1280.jpg',
        'https://pixabay.com/get/g1c351e1a9ed3ba701152ca2ab0a5ce8ed76bf5b03c2d61cd04a7144e64067d92437d204c993a4f1c1437033fcc066a01225a336b6da9b7281c66d43092ef9ebb_1280.jpg',
        'https://pixabay.com/get/gec1c074d7bd05efb0f9f24736765bf876a8afcfe8c1abbe61baa67af90989dc284c80e1fc90a6c8efac232fb3ef8da6f7ccde424711091ac1c33c8b521122844_1280.jpg'
    ];
    
    petalsInterval = setInterval(() => {
        createPetal(petalImages);
    }, 300);
    
    // Stop petals after 10 seconds
    setTimeout(() => {
        clearInterval(petalsInterval);
    }, 10000);
}

/**
 * Create a single falling petal
 */
function createPetal(images) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    
    // Use different petal styles
    const colors = ['#f8b5c3', '#e91e63', '#d1c4e9', '#ffd700'];
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    petal.style.borderRadius = '50%';
    petal.style.width = (Math.random() * 15 + 10) + 'px';
    petal.style.height = petal.style.width;
    
    petalsContainer.appendChild(petal);
    
    // Remove petal after animation
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 7000);
}

/**
 * Show birthday animation with cake and typewriter text
 */
function showBirthdayAnimation() {
    birthdayAnimation.classList.remove('hidden');
    birthdayAnimation.classList.add('visible');
    
    // Start typewriter effect
    setTimeout(() => {
        startTypewriter();
    }, 1000);
}

/**
 * Typewriter effect for birthday message
 */
function startTypewriter() {
    const message = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];
    let index = 0;
    
    typewriterMessage.innerHTML = '';
    
    const typeInterval = setInterval(() => {
        if (index < message.length) {
            typewriterMessage.innerHTML += message.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
            // Add blinking cursor effect
            typewriterMessage.innerHTML += '<span class="cursor">|</span>';
        }
    }, 100);
}

/**
 * Navigate to specific section
 */
function navigateToSection(sectionId) {
    // Update current section
    currentSection = sectionId;
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionId) {
            btn.classList.add('active');
        }
    });
    
    // Special effects for certain sections
    handleSectionSpecialEffects(sectionId);
}

/**
 * Handle special effects for specific sections
 */
function handleSectionSpecialEffects(sectionId) {
    switch (sectionId) {
        case 'final':
            setTimeout(() => {
                startConfetti();
            }, 1000);
            break;
        case 'poem':
            animatePoem();
            break;
        case 'about':
            animateAchievements();
            break;
        case 'gallery':
            animateGallery();
            break;
        case 'testimonials':
            animateTestimonials();
            break;
    }
}

/**
 * Start confetti animation
 */
function startConfetti() {
    confettiInterval = setInterval(() => {
        createConfetti();
    }, 100);
    
    // Stop confetti after 5 seconds
    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 5000);
}

/**
 * Create confetti pieces
 */
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 1 + 's';
    
    const colors = ['#ffd700', '#e91e63', '#f8b5c3', '#d1c4e9'];
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    confettiContainer.appendChild(confetti);
    
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 5000);
}

/**
 * Animate poem stanzas
 */
function animatePoem() {
    const stanzas = document.querySelectorAll('.poem-stanza');
    stanzas.forEach((stanza, index) => {
        setTimeout(() => {
            stanza.style.animation = 'stanzaFadeIn 1s ease forwards';
        }, index * 500);
    });
}

/**
 * Animate achievement cards
 */
function animateAchievements() {
    const cards = document.querySelectorAll('.achievement-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'cardSlideIn 0.8s ease forwards';
        }, index * 200);
    });
}

/**
 * Animate gallery items
 */
function animateGallery() {
    const polaroids = document.querySelectorAll('.polaroid-card');
    polaroids.forEach((polaroid, index) => {
        setTimeout(() => {
            polaroid.style.animation = 'polaroidFadeIn 0.8s ease forwards';
        }, index * 200);
    });
}

/**
 * Animate testimonials
 */
function animateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((testimonial, index) => {
        setTimeout(() => {
            testimonial.style.animation = 'testimonialSlideIn 0.8s ease forwards';
        }, index * 300);
    });
}

/**
 * Restart the entire experience
 */
function restartExperience() {
    // Reset to landing page
    navigateToSection('landing');
    
    // Hide navigation
    navigation.classList.remove('visible');
    
    // Reset landing content
    document.querySelector('.landing-content').style.opacity = '1';
    document.querySelector('.landing-content').style.transform = 'translateY(0)';
    
    // Hide birthday animation
    birthdayAnimation.classList.add('hidden');
    birthdayAnimation.classList.remove('visible');
    
    // Clear animations
    clearAllIntervals();
    
    // Clear petals and confetti
    petalsContainer.innerHTML = '';
    confettiContainer.innerHTML = '';
    
    // Reset typewriter
    typewriterMessage.innerHTML = '';
}

/**
 * Replay animations for current section
 */
function replayAnimations() {
    handleSectionSpecialEffects(currentSection);
    
    if (currentSection === 'landing') {
        startFallingPetals();
        showBirthdayAnimation();
    }
}

/**
 * Handle keyboard navigation
 */
function handleKeyNavigation(e) {
    const sectionOrder = ['landing', 'poem', 'about', 'gallery', 'testimonials', 'video', 'final'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    
    switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            if (currentIndex < sectionOrder.length - 1) {
                navigateToSection(sectionOrder[currentIndex + 1]);
            }
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            if (currentIndex > 0) {
                navigateToSection(sectionOrder[currentIndex - 1]);
            }
            break;
        case 'Home':
            navigateToSection('landing');
            break;
        case 'End':
            navigateToSection('final');
            break;
    }
}

/**
 * Handle smooth scroll navigation
 */
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const sectionOrder = ['landing', 'poem', 'about', 'gallery', 'testimonials', 'video', 'final'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    
    if (e.deltaY > 0 && currentIndex < sectionOrder.length - 1) {
        // Scroll down
        navigateToSection(sectionOrder[currentIndex + 1]);
    } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up
        navigateToSection(sectionOrder[currentIndex - 1]);
    }
}

/**
 * Set up intersection observer for animations
 */
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.achievement-card, .polaroid-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Preload assets for better performance
 */
function preloadAssets() {
    const images = [
        'https://pixabay.com/get/ga8b81baab4d7d60dfbe280c9195f314d349879c66f678bfdf5695ad5477f6d1006ec38c4810047d89675b1eb1fcb74b474111882b817e1a73bc5e92556e96c72_1280.jpg',
        'https://pixabay.com/get/g8e7dd7d26ee0ec3798d3dccd5a1439a4f87c786b8009dc55c920851a6f6c789cdce537edb72de9d037335f6895d6da18c1c8744bcc8b8fc3b8c5769916d28c01_1280.jpg',
        'https://pixabay.com/get/ge7e3b88d07f81826a7980f9f783b957cca5aceea12df72cfa55f9c1e7461a8e53b3205ed7a960cd407a310df03fa73fd903ad3237fd7d115a127c49cf9f470ee_1280.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

/**
 * Clear all intervals
 */
function clearAllIntervals() {
    if (petalsInterval) clearInterval(petalsInterval);
    if (confettiInterval) clearInterval(confettiInterval);
}

/**
 * Add CSS for cursor blinking
 */
const style = document.createElement('style');
style.textContent = `
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .in-view {
        animation-play-state: running !important;
    }
`;
document.head.appendChild(style);

// Ensure proper cleanup on page unload
window.addEventListener('beforeunload', () => {
    clearAllIntervals();
});
