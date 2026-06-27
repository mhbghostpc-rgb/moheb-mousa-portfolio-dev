// ===== AOS (Animate On Scroll) Initialization =====
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

// ===== Mobile Hamburger Menu =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// ===== Navbar Shrink on Scroll =====
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        nav.style.padding = '0.5rem 0';
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
        nav.style.padding = '1rem 0';
        nav.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});

// ===== Typing Effect for Hero Subtitle (Optional) =====
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const originalText = subtitle.textContent;
    // You can add a typing effect here if desired
    // For now, it's static — but you can uncomment below for a simple typewriter
    /*
    subtitle.textContent = '';
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            subtitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
    */
}

console.log('🚀 Portfolio loaded successfully!');

// ===== Lightbox Logic =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        
        lightboxImg.src = img.src;
        lightboxCaption.textContent = title;
        
        lightbox.style.display = 'flex';
        // Small delay for the fade-in effect to work
        setTimeout(() => lightbox.classList.add('active'), 10);
    });
});

const closeLightbox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => lightbox.style.display = 'none', 300);
};

if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ===== Tabs Logic =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===== Background Music Logic =====
const bgMusic = document.getElementById('bg-music');
if (bgMusic) {
    bgMusic.volume = 0.5;
}

const musicToggle = document.getElementById('music-toggle');
const musicIcon = musicToggle ? musicToggle.querySelector('.music-icon') : null;
let hasInteracted = false;

// Function to play music
const playMusic = () => {
    if (!bgMusic || !musicToggle) return;
    
    bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        if (musicIcon) musicIcon.textContent = '🔊';
    }).catch(error => {
        console.error("Audio playback failed:", error);
        if (error.name === 'NotSupportedError' || error.name === 'NotAllowedError') {
            console.log("Browser blocked audio or file format is unsupported.");
        }
    });
};

// Function to toggle music
if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent document click from firing
        hasInteracted = true;
        if (bgMusic.paused) {
            playMusic();
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            if (musicIcon) musicIcon.textContent = '🔈';
        }
    });

    // Try to play on first interaction with the page
    const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown'];
    
    const tryPlayBackground = () => {
        if (!hasInteracted && bgMusic.paused) {
            bgMusic.play().then(() => {
                hasInteracted = true;
                musicToggle.classList.add('playing');
                if (musicIcon) musicIcon.textContent = '🔊';
                // Remove listeners once successfully started
                interactionEvents.forEach(evt => document.removeEventListener(evt, tryPlayBackground));
            }).catch(err => {
                // Autoplay blocked, wait for next interaction
            });
        } else if (hasInteracted) {
            // Already interacted, clean up listeners
            interactionEvents.forEach(evt => document.removeEventListener(evt, tryPlayBackground));
        }
    };

    interactionEvents.forEach(evt => {
        document.addEventListener(evt, tryPlayBackground, { passive: true });
    });
}
