// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Get forms
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  // Handle signup form submission
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSignup();
    });

    // Username availability check with debounce
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
      let timeout;
      usernameInput.addEventListener('input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => checkUsername(this.value), 500);
      });
    }
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleLogin();
    });
  }
});

function handleSignup() {
  // Get form values
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;

  // Reset errors
  clearErrors();

  // Validate fields
  let hasError = false;
  if (!validateEmail(email)) {
    showError('emailError', 'Please enter a valid email');
    hasError = true;
  }
  if (username.length < 3) {
    showError('usernameError', 'Username must be at least 3 characters');
    hasError = true;
  }
  if (password.length < 8) {
    showError('passwordError', 'Password must be at least 8 characters');
    hasError = true;
  }
  if (password !== confirmPassword) {
    showError('confirmPasswordError', 'Passwords do not match');
    hasError = true;
  }
  if (!terms) {
    alert('Please accept the terms and conditions');
    hasError = true;
  }

  if (hasError) return;

  // Save user data (in real app, send to server)
  const userData = {
    email,
    username,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    joinDate: new Date().toISOString()
  };

  localStorage.setItem('user', JSON.stringify(userData));
  alert('Account created successfully!');
  window.location.href = 'app.html';
}

function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  clearErrors();

  if (!validateEmail(email)) {
    showError('emailError', 'Please enter a valid email');
    return;
  }
  if (!password) {
    showError('passwordError', 'Password is required');
    return;
  }

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    // In this mock, we only check email; password handling would be added in a real app
    if (user.email === email) {
      alert('Login successful!');
      window.location.href = 'app.html';
    } else {
      alert('Invalid email or password');
    }
  } else {
    alert('No account found. Please sign up first');
  }
}

function checkUsername(username) {
  const taken = ['admin', 'user', 'test', 'shanti', 'om'];
  const errorEl = document.getElementById('usernameError');

  if (username.length < 3) {
    showError('usernameError', 'Username must be at least 3 characters');
  } else if (taken.includes(username.toLowerCase())) {
    showError('usernameError', 'Username is already taken');
  } else {
    errorEl.textContent = '✓ Available';
    errorEl.style.color = 'green';
  }
}

function showError(elementID, message) {
  const element = document.getElementById(elementID);
  if (element) {
    element.textContent = message;
    element.style.color = 'red';
  }
}

function clearErrors() {
  document.querySelectorAll('.error-text').forEach(el => {
    el.textContent = '';
  });
}

function validateEmail(email) {
  // Simple email regex for demonstration purposes
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
