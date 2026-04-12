// User Database (persistent in localStorage)
let users = JSON.parse(localStorage.getItem('fresherguide_users')) || [];

function saveUsers() { 
    localStorage.setItem('fresherguide_users', JSON.stringify(users)); 
}

// Background slideshow
const slides = document.querySelectorAll('.bg-slide');
let currentSlide = 0;
if(slides.length > 0) {
    slides[0].classList.add('active');
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// Create floating particles
function createParticles() {
    const container = document.getElementById('particles');
    if(!container) return;
    for(let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.width = Math.random() * 6 + 2 + 'px';
        p.style.height = p.style.width;
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = Math.random() * 15 + 8 + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(p);
    }
}
createParticles();

// Toast Notification
function showToast(msg, isError = false) {
    const t = document.createElement('div');
    t.className = 'toast-message';
    if(isError) t.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    t.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i> ${msg}`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// Navigation Functions
function toggleMenu() { 
    document.getElementById('navLinks').classList.toggle('active'); 
}

function closeMenu() { 
    document.getElementById('navLinks').classList.remove('active'); 
}

function scrollToSection(id) { 
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); 
    closeMenu(); 
}

function copyToClipboard(text) { 
    navigator.clipboard.writeText(text); 
    showToast('Copied!'); 
}

// ========== SERVICE MODAL WITH DETAILED OVERVIEW ==========
const serviceDetails = {
    'Resume Building': {
        icon: '📄',
        title: 'Resume Building Service',
        subtitle: 'Create a professional, ATS-friendly resume that stands out to recruiters',
        whatWeProvide: [
            '✨ ATS-compatible formatting that passes automated screening systems',
            '✨ Professional summary highlighting your unique strengths and career goals',
            '✨ Action verbs and quantifiable achievements to showcase your impact',
            '✨ Proper section structure (Experience, Education, Skills, Projects)',
            '✨ Keyword optimization for specific job roles and industries',
            '✨ Personalized feedback and multiple revision rounds',
            '✨ One-on-one consultation with resume expert',
            '✨ Cover letter and LinkedIn profile optimization'
        ],
        whyChoose: 'Our resume experts have helped over 10,000 freshers land their dream jobs. We understand what recruiters look for and how to highlight your strengths effectively.',
        process: '1️⃣ Share your current resume or details → 2️⃣ Expert analysis → 3️⃣ First draft within 48 hours → 4️⃣ Feedback & revisions → 5️⃣ Final polished resume'
    },
    'Interview Preparation': {
        icon: '🎯',
        title: 'Interview Preparation Program',
        subtitle: 'Master the art of interviews with comprehensive preparation',
        whatWeProvide: [
            '🎯 Mock interviews with industry experts',
            '🎯 Common HR questions and STAR method training',
            '🎯 Technical interview practice for various domains',
            '🎯 Communication skills and body language coaching',
            '🎯 Real-time feedback and improvement areas',
            '🎯 Company-specific interview preparation',
            '🎯 Group discussion practice sessions',
            '🎯 Confidence building and stress management techniques'
        ],
        whyChoose: 'Our mock interviewers are industry professionals who have conducted hundreds of real interviews. You get authentic experience and actionable feedback.',
        process: '1️⃣ Initial assessment → 2️⃣ Skill gap analysis → 3️⃣ Practice sessions → 4️⃣ Mock interviews → 5️⃣ Feedback & improvement plan'
    },
    'Office Etiquette': {
        icon: '💼',
        title: 'Office Etiquette & Corporate Culture',
        subtitle: 'Learn professional workplace behavior for a smooth transition',
        whatWeProvide: [
            '💼 Professional communication (email, chat, in-person)',
            '💼 Meeting etiquette and participation techniques',
            '💼 Dress code and professional appearance guidance',
            '💼 Time management and punctuality tips',
            '💼 Building relationships with colleagues',
            '💼 Handling feedback and criticism professionally',
            '💼 Corporate hierarchy and reporting structure',
            '💼 Remote work and hybrid work best practices'
        ],
        whyChoose: 'Learn from experienced corporate professionals who share real-world insights and practical tips that you won\'t find in textbooks.',
        process: '1️⃣ Self-assessment → 2️⃣ Interactive workshops → 3️⃣ Real-life scenarios → 4️⃣ Role-play exercises → 5️⃣ Continuous support'
    },
    'Salary Negotiation': {
        icon: '💰',
        title: 'Salary Negotiation Masterclass',
        subtitle: 'Know your worth and negotiate the best compensation package',
        whatWeProvide: [
            '💰 Understanding CTC components (Basic, HRA, PF, Gratuity, etc.)',
            '💰 Market research and salary benchmarks for your role',
            '💰 Negotiation scripts and exact phrases to use',
            '💰 Evaluating total compensation (bonus, stocks, benefits)',
            '💰 Handling multiple offers effectively',
            '💰 Timing and approach strategies',
            '💰 Counter-offer techniques',
            '💰 Long-term career earnings planning'
        ],
        whyChoose: 'Our salary negotiation experts have helped freshers increase their starting salaries by an average of 18%. Learn the exact phrases and strategies that work.',
        process: '1️⃣ Market research → 2️⃣ Value assessment → 3️⃣ Strategy development → 4️⃣ Practice negotiation → 5️⃣ Real offer negotiation support'
    },
    'Work Culture': {
        icon: '🏢',
        title: 'Understanding Work Culture',
        subtitle: 'Navigate corporate environment with confidence and success',
        whatWeProvide: [
            '🏢 Types of workplace cultures (startup vs corporate vs MNC)',
            '🏢 Navigating office politics positively',
            '🏢 Building professional relationships and networking',
            '🏢 Work-life balance strategies',
            '🏢 Handling remote and hybrid work environments',
            '🏢 Diversity and inclusion awareness',
            '🏢 Professional boundaries and ethics',
            '🏢 Career growth and advancement strategies'
        ],
        whyChoose: 'Learn from case studies and real experiences of professionals who have successfully navigated various work cultures.',
        process: '1️⃣ Culture assessment → 2️⃣ Interactive sessions → 3️⃣ Case studies → 4️⃣ Practical tips → 5️⃣ Ongoing mentorship'
    },
    'Communication Skills': {
        icon: '💬',
        title: 'Professional Communication Skills',
        subtitle: 'Master verbal and written communication for career success',
        whatWeProvide: [
            '💬 Professional email writing and business correspondence',
            '💬 Presentation and public speaking skills',
            '💬 Active listening techniques',
            '💬 Business vocabulary and terminology',
            '💬 Cross-cultural communication',
            '💬 Conflict resolution and difficult conversations',
            '💬 Phone and video call etiquette',
            '💬 Personal branding and professional presence'
        ],
        whyChoose: 'Our communication coaches have trained thousands of professionals. Learn practical techniques that you can apply immediately.',
        process: '1️⃣ Skill assessment → 2️⃣ Personalized training → 3️⃣ Practice sessions → 4️⃣ Feedback loops → 5️⃣ Real-world application'
    }
};

function openServiceModal(serviceName) {
    const service = serviceDetails[serviceName];
    if (!service) return;
    
    // Update modal header
    document.getElementById('modalIcon').innerHTML = service.icon;
    document.getElementById('modalTitle').innerHTML = service.title;
    document.getElementById('modalSubtitle').innerHTML = service.subtitle;
    
    // Build modal body content
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3><i class="fas fa-gift"></i> What We Provide</h3>
        <div class="provide-list">
            ${service.whatWeProvide.map(item => `<div class="provide-item"><i class="fas fa-check-circle"></i><span>${item}</span></div>`).join('')}
        </div>
        
        <div class="why-box">
            <h4><i class="fas fa-star"></i> Why Choose Us?</h4>
            <p>${service.whyChoose}</p>
        </div>
        
        <div class="process-box">
            <h4><i class="fas fa-chart-line"></i> Our Process</h4>
            <p>${service.process}</p>
        </div>
    `;
    
    // Show modal
    document.getElementById('serviceModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    document.getElementById('serviceModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function enquireAboutService() {
    closeServiceModal();
    scrollToSection('contact');
    showToast('📧 Please fill the contact form to enquire about this service!');
}

// ========== CONTACT FORM - REAL EMAIL DELIVERY ==========
const contactForm = document.getElementById('directContactForm');
if(contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        
        if(!name || !email || !message) { 
            showToast('Please fill all fields', true); 
            return; 
        }
        if(!/^\S+@\S+\.\S+$/.test(email)) { 
            showToast('Enter a valid email address', true); 
            return; 
        }
        
        const formData = new FormData(contactForm);
        try {
            const response = await fetch('https://formsubmit.co/ajax/juvibhute0805@gmail.com', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                showToast('✅ Message sent successfully! We will reply soon.', false);
                contactForm.reset();
            } else {
                showToast('⚠️ Server error. Please try again later.', true);
            }
        } catch(err) {
            showToast('Network error. Check your connection.', true);
        }
    });
}

// Auth Modal Functions
function openRegisterModal() { 
    document.getElementById('authModal').classList.add('active'); 
    switchAuthTab('register');
    closeMenu();
}

function openLoginModal() { 
    document.getElementById('authModal').classList.add('active'); 
    switchAuthTab('login');
    closeMenu();
}

function closeAuthModal() { 
    document.getElementById('authModal').classList.remove('active'); 
    clearAuthErrors(); 
}

function switchAuthTab(tab) {
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const tabs = document.querySelectorAll('.auth-tab');
    if(tab === 'login') {
        loginPanel.classList.add('active');
        registerPanel.classList.remove('active');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    } else {
        loginPanel.classList.remove('active');
        registerPanel.classList.add('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    }
    clearAuthErrors();
}

function clearAuthErrors() {
    document.querySelectorAll('.error-text').forEach(el => el.classList.remove('show'));
    document.querySelectorAll('.input-group-modern input').forEach(el => el.classList.remove('error'));
}

function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId);
    const input = errorEl?.previousElementSibling?.previousElementSibling || errorEl?.previousElementSibling;
    if(errorEl) { 
        errorEl.textContent = message; 
        errorEl.classList.add('show'); 
    }
    if(input && input.tagName === 'INPUT') input.classList.add('error');
}

function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    const icon = element.querySelector('i');
    if(input.type === 'password') { 
        input.type = 'text'; 
        icon.classList.remove('fa-eye-slash'); 
        icon.classList.add('fa-eye'); 
    } else { 
        input.type = 'password'; 
        icon.classList.remove('fa-eye'); 
        icon.classList.add('fa-eye-slash'); 
    }
}

function validateEmail(email) { 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
}

// // Login Handler
// function handleLogin(event) {
//     e.preventDefault();
//     clearAuthErrors();
//     const email = document.getElementById('loginEmail').value.trim();
//     const password = document.getElementById('loginPassword').value;
//     let isValid = true;

//     if(!email) { 
//         showError('loginEmailError', 'Email is required'); 
//         isValid = false; 
//     } else if(!validateEmail(email)) { 
//         showError('loginEmailError', 'Enter a valid email'); 
//         isValid = false; 
//     }
//     if(!password) { 
//         showError('loginPasswordError', 'Password is required'); 
//         isValid = false; 
//     }

//     if(isValid) {
//         const user = users.find(u => u.email === email && u.password === password);
//         if(user) {
//             showToast(`Welcome back, ${user.name}! 🎉`);
//             closeAuthModal();
//             document.getElementById('loginEmail').value = '';
//             document.getElementById('loginPassword').value = '';
//             window.location.href = "assets/Dashboard/index.html";
//         } else {
//             showError('loginEmailError', 'Invalid email or password');
//             showToast('Invalid credentials', true);
//         }
//     }
//     return false;
// }

// // Register Handler
// // Replace your existing handleRegister function
// async function handleRegister(e) {
//     e.preventDefault();
//     clearAuthErrors();

//     const name = document.getElementById('regName').value.trim();
//     const email = document.getElementById('regEmail').value.trim();
//     const password = document.getElementById('regPassword').value;

//     try {
//         const res = await fetch('http://localhost:8080/api/auth/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, email, password })
//         });

//         //const data = await res.json();
//         const text = await res.text();
//         const data = text ? JSON.parse(text) : {};

//         if (res.ok) {
//             showToast(`✅ Welcome ${name}! Registration successful`, 'success');
//             setTimeout(() => {
//                 window.location.href = "../assets/Dashboard/index.html";
//             }, 1200);
//         } else {
//             showToast(data.error || 'Registration failed', 'warning');
//         }
//     } catch (err) {
//         showToast('Cannot connect to server. Is backend running?', 'warning');
//     }
// }

// // Replace your existing handleLogin function
// async function handleLogin(e) {
//     e.preventDefault();
//     clearAuthErrors();

//     const email = document.getElementById('loginEmail').value.trim();
//     const password = document.getElementById('loginPassword').value;

//     try {
//         const res = await fetch('http://localhost:8080/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });

//         //const data = await res.json();
//         const text = await res.text();
//         const data = text ? JSON.parse(text) : {};

//         if (res.ok) {
//             showToast(`🎉 Welcome back, ${data.user.name}!`, 'success');
//             setTimeout(() => {
//                 window.location.href = "../assets/Dashboard/index.html";
//             }, 1000);
//         } else {
//             showToast(data.error || 'Invalid credentials', 'warning');
//         }
//     } catch (err) {
//         showToast('Cannot connect to server', 'warning');
//     }
// }



// // Close modal when clicking outside
// window.onclick = function(event) {
//     const modal = document.getElementById('serviceModal');
//     if (event.target === modal) {
//         closeServiceModal();
//     }
// }






// ================================
// HELPER FUNCTIONS
// ================================

// Email validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ================================
// REGISTER FUNCTION
// ================================
async function handleRegister(e) {
    e.preventDefault();
    clearAuthErrors();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    let isValid = true;

    if (!name) {
        showError('regNameError', 'Name is required');
        isValid = false;
    }

    if (!email) {
        showError('regEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('regEmailError', 'Enter a valid email');
        isValid = false;
    }

    if (!password) {
        showError('regPasswordError', 'Password is required');
        isValid = false;
    }

    if (!isValid) return;

    try {
        const res = await fetch('http://127.0.0.1:8080/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (res.ok) {
            showToast(`✅ Welcome ${name}! Registration successful`, 'success');

            // clear form
            document.getElementById('regName').value = '';
            document.getElementById('regEmail').value = '';
            document.getElementById('regPassword').value = '';

            // setTimeout(() => {
            //     window.location.href = "Dashboard/index.html"; 
            // }, 1200);

            setTimeout(() => {
                 window.location.href = "../Dashboard/index.html";
            }, 1000);

        } else {
            showToast(data.error || 'Registration failed', 'warning');
        }

    } catch (err) {
        console.error(err);
        showToast('Cannot connect to server. Is backend running?', 'warning');
    }
}


// ================================
// LOGIN FUNCTION
// ================================
async function handleLogin(e) {
    e.preventDefault();
    clearAuthErrors();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    let isValid = true;

    if (!email) {
        showError('loginEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('loginEmailError', 'Enter a valid email');
        isValid = false;
    }

    if (!password) {
        showError('loginPasswordError', 'Password is required');
        isValid = false;
    }

    if (!isValid) return;

    try {
        const res = await fetch('http://127.0.0.1:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (res.ok) {
            const userName = data?.user?.name || "User";

            showToast(`🎉 Welcome back, ${userName}!`, 'success');

            // clear form
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';

            // setTimeout(() => {
            //     window.location.href = "Dashboard/index.html";
            // }, 1000);

            setTimeout(() => {
                 window.location.href = "../Dashboard/index.html";
            }, 1000);

        } else {
            showToast(data.error || 'Invalid credentials', 'warning');
        }

    } catch (err) {
        console.error(err);
        showToast('Cannot connect to server', 'warning');
    }
}


// ================================
// CLOSE MODAL WHEN CLICK OUTSIDE
// ================================
window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        closeServiceModal();
    }
};







// Expose functions globally
window.toggleMenu = toggleMenu;
window.scrollToSection = scrollToSection;
window.copyToClipboard = copyToClipboard;
window.openRegisterModal = openRegisterModal;
window.openLoginModal = openLoginModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.togglePassword = togglePassword;
window.showToast = showToast;
window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;
window.enquireAboutService = enquireAboutService;