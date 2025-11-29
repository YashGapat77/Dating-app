// API Service Layer

const API = {
    baseURL: 'http://localhost:5000/api',

    // Helper function for requests
    async request(endpoint, option = {}) {
        try {
            const response = await fetch(this.baseURL + endpoint, {
                headers: {
                    'Content-Type': 'application/json'
                },
                ...option
            });
            if (!response.ok) {
                throw new Error(`http error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth Endpoints
    async signup(userData) {
        return this.request('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    async login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },

    // Matches endpoints
    async getDailyMatches() {
        return this.request('/matches/daily');
    },

    async likeMatch(userId) {
        return this.request(`/matches/like/${userId}`, {
            method: 'POST'
        });
    },

    async passMatch(userId) {
        return this.request(`/matches/pass/${userId}`, {
            method: 'POST'
        });
    },

    // Messages endpoints
    async getConversations() {
        return this.request('/chat/conversations');
    },

    async sendMessage(matchId, message) {
        return this.request(`/chat/send/${matchId}`, {
            method: 'POST',
            body: JSON.stringify({ message })
        });
    }
};
