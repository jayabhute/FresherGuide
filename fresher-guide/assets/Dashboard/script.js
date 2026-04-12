// ========== SHOW TOAST FUNCTION ==========
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    let className = 'toast-info';
    let icon = '<i class="fas fa-info-circle"></i>';
    
    if (type === 'success') {
        className = 'toast-success';
        icon = '<i class="fas fa-check-circle"></i>';
    } else if (type === 'warning') {
        className = 'toast-warning';
        icon = '<i class="fas fa-exclamation-triangle"></i>';
    }
    
    toast.className = 'toast-message ' + className;
    toast.innerHTML = icon + ' ' + message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ========== GO TO HOMEPAGE ==========
function goToHomepage() {
    window.location.href = '../Homepage/index.html';
}

// ========== GET OR CREATE GUEST USER ==========
let guestUser = JSON.parse(localStorage.getItem('fresherguide_guest'));
if (!guestUser) {
    guestUser = { name: 'Guest User', id: 'guest_' + Date.now() };
    localStorage.setItem('fresherguide_guest', JSON.stringify(guestUser));
}

// ========== DOM ELEMENTS ==========
const userDropdownBtn = document.getElementById('userDropdownBtn');
const displayNameSpan = document.getElementById('displayName');
const userAvatar = document.getElementById('userAvatar');
const dropdownMenu = document.getElementById('dropdownMenu');
const clearProgressBtn = document.getElementById('clearProgressBtn');

// ========== UPDATE USER UI ==========
function updateUserUI() {
    if (displayNameSpan) displayNameSpan.innerText = guestUser.name;
    if (userAvatar) userAvatar.innerText = guestUser.name.charAt(0).toUpperCase();
    showToast(`👋 Welcome, ${guestUser.name}!`, 'success');
}
updateUserUI();

// ========== USER DROPDOWN TOGGLE ==========
if (userDropdownBtn) {
    userDropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
}

// ========== CLEAR PROGRESS FUNCTION ==========
if (clearProgressBtn) {
    clearProgressBtn.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('completedModules');
        document.querySelectorAll('.module-card').forEach(card => {
            card.classList.remove('completed');
        });
        showToast('✅ All progress cleared successfully!', 'success');
        dropdownMenu.classList.remove('show');
    });
}

// ========== CLOSE DROPDOWN ON OUTSIDE CLICK ==========
document.addEventListener('click', function () {
    if (dropdownMenu) dropdownMenu.classList.remove('show');
});

if (dropdownMenu) {
    dropdownMenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

// ========== MODULE COMPLETION TRACKING ==========
function loadCompletedModules() {
    const completed = JSON.parse(localStorage.getItem('completedModules')) || [];
    const modules = document.querySelectorAll('.module-card');
    
    modules.forEach(module => {
        const moduleName = module.getAttribute('data-module');
        if (completed.includes(moduleName)) {
            module.classList.add('completed');
        }
    });
}

// ========== MODULE CLICK HANDLER ==========
const moduleCards = document.querySelectorAll('.module-card');

moduleCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const moduleName = this.getAttribute('data-module');
        const href = this.getAttribute('data-href');
        
        if (!href) {
            showToast(`⚠️ Module ${moduleName} is coming soon!`, 'warning');
            return;
        }
        
        showToast(`📚 Opening ${moduleName} module...`, 'success');
        
        // Track completed module
        let completed = JSON.parse(localStorage.getItem('completedModules')) || [];
        if (!completed.includes(moduleName)) {
            completed.push(moduleName);
            localStorage.setItem('completedModules', JSON.stringify(completed));
            this.classList.add('completed');
            showToast(`✅ Great! You've completed ${moduleName}`, 'success');
        }
        
        setTimeout(() => {
            window.location.href = href;
        }, 600);
    });
});

// Load completed modules on page load
loadCompletedModules();

// ========== ADD WELCOME MESSAGE ==========
setTimeout(() => {
    showToast('🎯 Click on any module to start learning!', 'info');
}, 1000);

// Expose functions globally
window.goToHomepage = goToHomepage;
window.showToast = showToast;