// --- MALHAR MOBILE SHOP CORE LOGIC ---

// 1. SPLASH SCREEN TO AUTH SCREEN TRANSITION
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const auth = document.getElementById('auth-screen');
        
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.classList.add('hidden');
            auth.classList.remove('hidden');
        }, 800); // fade transition time
    }, 3500); // 3.5 Sec Animation Duration
});

// 2. TOGGLE BETWEEN LOGIN & SIGNUP FORMS
function switchAuthMode(mode) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const authTitle = document.getElementById('auth-title');
    const btnLogin = document.getElementById('btn-login-active');
    const btnSignup = document.getElementById('btn-signup');

    if (mode === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        authTitle.innerText = "CREATE ACCOUNT";
        btnSignup.classList.add('active');
        btnLogin.classList.remove('active');
    } else {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        authTitle.innerText = "WELCOME BACK";
        btnLogin.classList.add('active');
        btnSignup.classList.remove('active');
    }
}

// 3. FAKE OTP SYSTEM LOGIC
function sendOTP() {
    const contact = document.getElementById('reg-contact').value;
    if (!contact) {
        alert("⚠️ Please enter your Mobile or Email first!");
        return;
    }
    alert(`📥 OTP Sent Successfully to ${contact}!\n🔑 Verification Code is: 1234`);
    document.getElementById('otp-input-field').classList.remove('hidden');
    document.getElementById('send-otp-btn').innerText = "RESEND OTP";
}

// 4. REGISTRATION (LOCALSTORAGE STORAGE)
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const contact = document.getElementById('reg-contact').value;
    const otp = document.getElementById('reg-otp').value;
    const password = document.getElementById('reg-password').value;

    if (otp !== "1234") {
        alert("❌ Invalid OTP! Please check and type '1234'.");
        return;
    }

    // Save Data Locally
    localStorage.setItem('malhar_user', contact);
    localStorage.setItem('malhar_pass', password);
    localStorage.setItem('malhar_name', name);

    alert("🎉 Account Registered Successfully! Switching to Login.");
    switchAuthMode('login');
});

// 5. LOGIN AUTHENTICATION
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;

    const savedUser = localStorage.getItem('malhar_user');
    const savedPass = localStorage.getItem('malhar_pass');

    if (user === savedUser && pass === savedPass) {
        alert(`👋 Access Granted! Welcome to Malhar Dashboard.`);
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('dashboard-screen').classList.remove('hidden');
        loadSection('home'); // Load default homepage layout
    } else {
        alert("❌ Invalid Username or Password! Please try again.");
    }
});

// 6. DYNAMIC DASHBOARD CONTENT SYSTEM (Single Page App Logic)
const sections = {
    home: `
        <h2>🚀 Our Premium Services</h2>
        <p style="color: var(--text-gray); margin-bottom: 20px;">Quality You Trust, Service You Deserve</p>
        <div class="grid-container">
            <div class="neon-card"><h3>🔧 Mobile Repairing</h3><p>All types of smart phone hardware solutions. Display Replacement, Charging ports, and complete Water Damage recoveries.</p></div>
            <div class="neon-card"><h3>💻 Software Solutions</h3><p>Fast software flashing, official OS updates, security patching, and boot loops resolutions.</p></div>
            <div class="neon-card"><h3>⚡ Electronic Items</h3><p>High-end premium audio systems, LED TVs, wireless Neckbands, Earphones, and Smart Watches.</p></div>
            <div class="neon-card"><h3>🏠 Home Appliances</h3><p>AC, Coolers, Smart Fridges, and fully-automatic Washing Machines available at the best price.</p></div>
        </div>
    `,
    mobiles: `
        <h2>📱 Stock & Online Bookings</h2>
        <p style="color: var(--text-gray); margin-bottom: 20px;">All major brands available: Apple, Samsung, Vivo, Oppo, Realme, Mi, OnePlus</p>
        <div class="grid-container">
            <div class="neon-card">
                <h3>iPhone 15 Pro Max</h3>
                <p>Natural Titanium | 256GB Storage</p>
                <span class="badge">Bajaj Finserv EMI</span>
                <button class="btn-neon" style="margin-top:15px; padding:8px;" onclick="bookItem('iPhone 15 Pro Max')">Book Order</button>
            </div>
            <div class="neon-card">
                <h3>Samsung S24 Ultra</h3>
                <p>Titanium Gray | 12GB RAM | AI Enabled</p>
                <span class="badge">TVS Credit Available</span>
                <button class="btn-neon" style="margin-top:15px; padding:8px;" onclick="bookItem('Samsung S24 Ultra')">Book Order</button>
            </div>
            <div class="neon-card">
                <h3>OnePlus 12R</h3>
                <p>Iron Gray | 16GB RAM + 256GB</p>
                <span class="badge">Low Down Payment</span>
                <button class="btn-neon" style="margin-top:15px; padding:8px;" onclick="bookItem('OnePlus 12R')">Book Order</button>
            </div>
        </div>
    `,
    profile: `
        <h2>👤 Active Session Details</h2>
        <div class="neon-card" style="margin-top: 20px; max-width: 500px;">
            <p style="margin-bottom: 10px;"><strong>Customer Name:</strong> <span id="dash-cust-name" style="color: var(--gold);"></span></p>
            <p style="margin-bottom: 10px;"><strong>Registered ID:</strong> <span id="dash-cust-user" style="color: var(--neon-blue);"></span></p>
            <p><strong>Verification Rank:</strong> Premium Buyer Tier-1 ✔️</p>
        </div>
    `,
    about: `
        <h2>ℹ️ Store Directory & Contact Information</h2>
        <div class="neon-card" style="margin-top: 20px;">
            <h3>👑 Managed By: Aditya Madavi</h3>
            <p style="margin-top: 10px;"><i class="fas fa-phone-alt" style="color: var(--neon-blue);"></i> Call: 8788461756</p>
            <p><i class="fab fa-whatsapp" style="color: #25d366;"></i> WhatsApp Business: 9112390404</p>
        </div>
        <div class="neon-card" style="margin-top: 20px;">
            <h3>⭐ Shop Benefits</h3>
            <p>✔ 100% Customer Satisfaction Guaranteed</p>
            <p>✔ Quick Document Approval with instant EMI choices</p>
            <p>✔ Best Quality Repairs with original components</p>
        </div>
    `
};

function loadSection(sectionName) {
    const mainArea = document.getElementById('main-content');
    mainArea.innerHTML = sections[sectionName];

    // UI Link Active Effect Toggle
    const links = document.querySelectorAll('.nav-links li');
    links.forEach(link => link.classList.remove('active-nav'));

    // Inject active user credentials on profile section load
    if (sectionName === 'profile') {
        document.getElementById('dash-cust-name').innerText = localStorage.getItem('malhar_name') || "Guest";
        document.getElementById('dash-cust-user').innerText = localStorage.getItem('malhar_user') || "Unknown";
    }

    // Handle Responsive Menu Auto Close on Click
    document.getElementById('sidebar').classList.remove('active');
}

// 7. ORDER BOOKING INTERACTION
function bookItem(name) {
    alert(`🎉 Booking Request Logged for ${name}!\nOur support executive (Aditya Madavi) will process your EMI/Finance profile under 2 hours.`);
}

// 8. SIDEBAR RESPONSIVE TOGGLE
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// 9. LOGOUT SESSION KILLER
function logout() {
    if (confirm("Are you sure you want to log out from Malhar Mobile Panel?")) {
        document.getElementById('dashboard-screen').classList.add('hidden');
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('login-form').reset();
    }
}
