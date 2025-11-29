// interactive.js - All Advanced Interactive Features
document.addEventListener('DOMContentLoaded', function () {
    console.log('DailyMatch Interactive Features Loaded');

    // Initialize all features
    initTypewriter();
    initNumberCounters();
    initParallax();
    init3DPhoneTilt();
    initSwipeDemo();
    initScrollReveal();
    initWaitlistGame();
    initExitIntentPopup();
    initSocialProofTicker();
    initVideoTestimonials();
    initFloatingNotifications();
    initDownloadButtonEffects();
    initMobileMenu();
});

// 1. Typewriter Effect
function initTypewriter() {
    const phrases = [
        "5 quality matches daily.",
        "No endless swiping.",
        "Real connections only.",
        "AI-powered compatibility.",
        "Find your perfect match."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedElement = document.getElementById('typedText');
    const cursor = document.querySelector('.cursor');

    if (!typedElement) return;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// 2. Animated Number Counters
function initNumberCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const increment = target / 100;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current).toLocaleString();
                }, 20);

                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// 3. Parallax Scrolling
function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        layers.forEach(layer => {
            const speed = layer.dataset.speed || 0.5;
            const yPos = scrolled * speed;
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 4. 3D Phone Tilt Effect
function init3DPhoneTilt() {
    const phone = document.getElementById('phoneMockup');
    if (!phone) return;

    phone.addEventListener('mousemove', (e) => {
        const rect = phone.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 20;
        const rotateX = ((centerY - y) / centerY) * 20;

        phone.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
    });

    phone.addEventListener('mouseleave', () => {
        phone.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    });
}

// 5. Interactive Swipe Demo
let currentDemoCard = 0;
const demoCards = [];

function initSwipeDemo() {
    const cards = document.querySelectorAll('.swipe-card');
    cards.forEach((card, index) => {
        demoCards.push(card);

        // Touch events for mobile
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        card.addEventListener('touchstart', (e) => {
            if (index !== currentDemoCard) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        card.addEventListener('touchmove', (e) => {
            if (index !== currentDemoCard) return;
            e.preventDefault();

            currentX = e.touches[0].clientX - startX;
            currentY = e.touches[0].clientY - startY;

            const rotation = currentX / 10;
            card.style.transform = `translateX(${currentX}px) translateY(${currentY}px) rotate(${rotation}deg)`;
        });

        card.addEventListener('touchend', () => {
            if (index !== currentDemoCard) return;

            if (Math.abs(currentX) > 100) {
                if (currentX > 0) {
                    swipeRightDemo();
                } else {
                    swipeLeftDemo();
                }
            } else if (currentY < -50) {
                swipeUpDemo();
            } else {
                card.style.transform = '';
            }

            currentX = 0;
            currentY = 0;
        });
    });
}

function swipeLeftDemo() {
    const card = demoCards[currentDemoCard];
    card.classList.add('swiped-left');
    setTimeout(nextDemoCard, 500);
    showSwipeFeedback('PASS', '#EF4444');
}

function swipeRightDemo() {
    const card = demoCards[currentDemoCard];
    card.classList.add('swiped-right');
    setTimeout(nextDemoCard, 500);
    showSwipeFeedback('LIKE', '#10B981');
    showMatchCelebration();
}

function swipeUpDemo() {
    const card = demoCards[currentDemoCard];
    card.classList.add('swiped-up');
    setTimeout(nextDemoCard, 500);
    showSwipeFeedback('SUPER LIKE', '#F59E0B');
}

function nextDemoCard() {
    currentDemoCard++;
    if (currentDemoCard >= demoCards.length) {
        setTimeout(resetDemoCards, 1000);
    }
}

function resetDemoCards() {
    currentDemoCard = 0;
    demoCards.forEach((card, index) => {
        card.classList.remove('swiped-left', 'swiped-right', 'swiped-up');
        card.style.transform = '';
        setTimeout(() => {
            if (index === 0) card.classList.add('active');
        }, index * 200);
    });
}

function showSwipeFeedback(text, color) {
    const feedback = document.createElement('div');
    feedback.className = 'swipe-feedback';
    feedback.textContent = text;
    feedback.style.color = color;
    document.querySelector('.swipe-demo-container').appendChild(feedback);

    setTimeout(() => feedback.remove(), 1000);
}

function showMatchCelebration() {
    // Confetti effect
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = ['#FF4458', '#FF6B7D', '#FFB6C1'][Math.floor(Math.random() * 3)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// 6. Scroll Reveal Animations
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// 7. Gamified Waitlist
let waitlistPosition = 10234;
let referrals = 0;

function initWaitlistGame() {
    updateWaitlistPosition();

    // Check URL for referral
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('ref')) {
        referrals++;
        moveUpInLine(100);
        showNotification('Referral bonus! You moved up 100 spots!');
    }
}

function shareTwitter() {
    const text = "I just joined @DailyMatch - the dating app that prioritizes quality over quantity! Join me and skip the waitlist:";
    const url = window.location.href.split('?')[0] + '?ref=' + getReferralCode();
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);

    moveUpInLine(50);
    showNotification('Shared on Twitter! +50 spots');
}

function shareFacebook() {
    const url = window.location.href.split('?')[0] + '?ref=' + getReferralCode();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);

    moveUpInLine(50);
    showNotification('Shared on Facebook! +50 spots');
}

function copyReferralLink() {
    const url = window.location.href.split('?')[0] + '?ref=' + getReferralCode();
    navigator.clipboard.writeText(url);

    const btn = event.target;
    const original = btn.innerHTML;
    btn.innerHTML = 'Copied!';
    btn.style.backgroundColor = '#10B981';

    setTimeout(() => {
        btn.innerHTML = original;
        btn.style.backgroundColor = '';
    }, 2000);
}

function getReferralCode() {
    return 'LOVE2024' + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function moveUpInLine(spots) {
    waitlistPosition = Math.max(1, waitlistPosition - spots);
    referrals++;
    updateWaitlistPosition();

    // Update progress bar
    const progress = Math.min(100, (referrals * 20));
    document.querySelector('.progress-fill').style.width = progress + '%';

    // Check milestones
    if (referrals >= 5) {
        showNotification('VIP Access Unlocked! You\'re in the top 100!');
        waitlistPosition = 50;
        updateWaitlistPosition();
    }
}

function updateWaitlistPosition() {
    const el = document.getElementById('waitlistPosition');
    if (el) {
        el.textContent = waitlistPosition.toLocaleString();
    }
}

// 8. Exit Intent Popup
let exitIntentShown = false;

function initExitIntentPopup() {
    document.addEventListener('mouseleave', function (e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            showExitIntentPopup();
        }
    });
}

function showExitIntentPopup() {
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Wait! Don't Miss Out!</h3>
            <p>Join 50,000+ singles finding real love on DailyMatch</p>
            <div class="special-offer">
                <strong>Limited Time Offer:</strong> Get Priority Access + 1 Month Free Premium
            </div>
            <div class="popup-buttons">
                <button class="btn btn-primary" onclick="window.location.href='signup.html'">
                    Yes, I Want In!
                </button>
                <button class="btn btn-outline" onclick="this.parentElement.parentElement.parentElement.remove()">
                    No thanks
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}

// 9. Social Proof Ticker
function initSocialProofTicker() {
    const messages = [
        "Sarah just joined from New York",
        "Mike and Emma just matched!",
        "Jessica found her perfect match",
        "David got 3 new matches today",
        "Someone in your area just joined",
        "Alex and Jordan are now dating!",
        "New couple alert in Los Angeles",
        "98% of users find better matches"
    ];

    let index = 0;
    setInterval(() => {
        showSocialProof(messages[index]);
        index = (index + 1) % messages.length;
    }, 4000);
}

function showSocialProof(message) {
    const ticker = document.createElement('div');
    ticker.className = 'social-proof-ticker';
    ticker.innerHTML = `
        <span class="ticker-icon">New</span>
        <span>${message}</span>
    `;
    document.body.appendChild(ticker);

    setTimeout(() => ticker.classList.add('show'), 100);
    setTimeout(() => {
        ticker.classList.remove('show');
        setTimeout(() => ticker.remove(), 500);
    }, 3500);
}

// 10. Video Testimonials
function initVideoTestimonials() {
    const thumbnails = document.querySelectorAll('.video-thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            const videoId = this.dataset.video || 'dQw4w9WgXcQ'; // Rickroll fallback
            showVideoModal(videoId);
        });
    });
}

function showVideoModal(videoId) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                        frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 11. Floating Notifications
function initFloatingNotifications() {
    const notifications = [
        { icon: 'New', text: 'Sarah liked you back!' },
        { icon: 'Message', text: 'You have 3 new messages' },
        { icon: 'Match', text: 'New match with Alex!' },
        { icon: 'Super Like', text: 'Someone super liked you!' }
    ];

    setInterval(() => {
        const notif = notifications[Math.floor(Math.random() * notifications.length)];
        showFloatingNotification(notif.icon, notif.text);
    }, 8000);
}

function showFloatingNotification(icon, text) {
    const notif = document.createElement('div');
    notif.className = 'floating-notification';
    notif.innerHTML = `
        <div class="notif-icon">${icon}</div>
        <div class="notif-text">${text}</div>
    `;

    document.body.appendChild(notif);

    setTimeout(() => notif.classList.add('show'), 100);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 500);
    }, 4000);
}

// 12. Download Button Effects
function initDownloadButtonEffects() {
    const downloadBtns = document.querySelectorAll('.app-store-btn, .google-play-btn');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 1000);

            // Count download click (you can send to analytics)
            console.log('Download button clicked:', this.querySelector('img').alt);
        });
    });
}

// 13. Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.querySelector('.nav-links');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            menu.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }
}

// Notification helper
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'toast-notification';
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => notif.classList.add('show'), 100);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}