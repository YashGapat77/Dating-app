// Main App JavaScript


document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in

    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize app


    initApp();
});

function initApp() {
    // Load user data

    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Welcome back,', user.firstName);

    // Set up navigation


    setupNavigation();

    // Load matches

    loadDailyMatches();

    // Set up match actions

    setupMatchActions();

    // Start countdown timer

    startCountdown();
}

function setupNavigation() {
    // Handle nav clicks

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all


            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            // Add active to clicked


            this.classList.add('active');

            // Show corresponding section


            const page = this.dataset.page;
            showPage(page);
        });
    });

    // User menu


    const userMenuBtn = document.getElementById('userMenuBtn');
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', function () {
            alert('User menu - Coming soon!');
        });
    }
}

function showPage(pageName) {
    // Hide all sections


    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show requested section


    const section = document.getElementById(pageName + 'Section');
    if (section) {
        section.classList.add('active');
    }
}

function loadDailyMatches() {
    // Sample match data (in real app, would fetch from API)


    const matches = [
        {
            name: 'Shila',
            age: 28,
            photo: 'https://randomuser.me/api/portraits/women/1.jpg',
            distance: 3,
            compatibility: 85,
            bio: 'Love hiking, cooking, and deep conversations. Looking for someone genuine who values growth and adventure.',
            interests: ['Hiking', 'Cooking', 'Reading', 'Travel'],
            reasons: [
                'Both love outdoor activities',
                'Similar communication style',
                'Shared values on relationships'
            ]
        },
        {
            name: 'Rutuja',
            age: 26,
            photo: 'https://randomuser.me/api/portraits/women/2.jpg',
            distance: 5,
            compatibility: 78,
            bio: 'Artist and coffee enthusiast. Seeking someone who appreciates creativity and quiet mornings.',
            interests: ['Art', 'Coffee', 'Music', 'Photography'],
            reasons: [
                'Creative personalities',
                'Similar lifestyle preferences',
                'Both value authenticity'
            ]
        }
    ];

    // Store matches


    window.currentMatches = matches;
    window.currentMatchIndex = 0;

    // Display first match


    displayMatch(matches[0]);
}

function displayMatch(match) {
    if (!match) {
        // No more matches


        showNoMoreMatches();
        return;
    }

    document.getElementById('matchPhoto').src = match.photo;
    document.getElementById('matchName').textContent = `${match.name}, ${match.age}`;
    document.getElementById('matchBio').textContent = match.bio;

    // Update compatibility badge


    document.querySelector('.compatibility').textContent = match.compatibility + '%';

    // Update interests


    const interestsContainer = document.querySelector('.interests');
    interestsContainer.innerHTML = '';
    match.interests.forEach(interest => {
        const tag = document.createElement('span');
        tag.className = 'interest-tag';
        tag.textContent = interest;
        interestsContainer.appendChild(tag);
    });

    // Update match reasons


    const reasonsList = document.querySelector('.match-reasons ul');
    reasonsList.innerHTML = '';
    match.reasons.forEach(reason => {
        const li = document.createElement('li');
        li.textContent = reason;
        reasonsList.appendChild(li);
    });
}

function setupMatchActions() {
    // Pass button


    document.getElementById('passBtn').addEventListener('click', function () {
        console.log('Pass');
        nextMatch();
    });

    // Like button


    document.getElementById('likeBtn').addEventListener('click', function () {
        console.log('Like');
        // Check if mutual match (random for demo)
        if (Math.random() > 0.5) {
            showMatchSuccess();
        } else {
            nextMatch();
        }
    });

    // Super like button


    document.getElementById('superBtn').addEventListener('click', function () {
        console.log('Super Like');
        showMatchSuccess();
    });

    // Icebreaker button


    document.getElementById('icebreaker').addEventListener('click', function () {
        const icebreakers = [
            "What's the most spontaneous thing you've ever done?",
            "If you could have dinner with anyone, who would it be?",
            "What's your idea of a perfect weekend?",
            "What's the best trip you've ever taken?"
        ];
        const random = icebreakers[Math.floor(Math.random() * icebreakers.length)];
        alert('Suggested icebreaker:\n\n' + random);
    });
}

function nextMatch() {
    window.currentMatchIndex++;
    if (window.currentMatchIndex < window.currentMatches.length) {
        displayMatch(window.currentMatches[window.currentMatchIndex]);
    } else {
        showNoMoreMatches();
    }

    // Update remaining count


    const remaining = window.currentMatches.length - window.currentMatchIndex;
    document.getElementById('remainingMatches').textContent = Math.max(0, remaining);
}

function showMatchSuccess() {
    const modal = document.getElementById('matchModal');
    modal.style.display = 'flex';

    // Close modal


    document.querySelector('.close-modal').addEventListener('click', function () {
        modal.style.display = 'none';
        nextMatch();
    });

    // Keep browsing button


    document.querySelector('.match-success button.btn-outline').addEventListener('click', function () {
        modal.style.display = 'none';
        nextMatch();
    });
}

function showNoMoreMatches() {
    document.getElementById('currentMatch').style.display = 'none';
    const noMatches = document.createElement('div');
    noMatches.className = 'no-matches-message';
    noMatches.innerHTML = `
        <h2>That's all for today!</h2>
        <p>Come back tomorrow for 5 new quality matches.</p>
    `;
    document.getElementById('matchesSection').appendChild(noMatches);
}

function startCountdown() {
    // Calculate time until midnight


    function updateCountdown() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const diff = tomorrow - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('resetTime').textContent =
            `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}