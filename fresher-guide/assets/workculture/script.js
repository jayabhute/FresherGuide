// Page navigation configuration
const pages = {
    worklife: document.getElementById('page-worklife'),
    learning: document.getElementById('page-learning'),
    diversity: document.getElementById('page-diversity'),
    wellbeing: document.getElementById('page-wellbeing')
};

const navItems = document.querySelectorAll('.nav-item');
const dashboardBtn = document.getElementById('dashboardBtn');

// Function to activate a specific page
function activatePage(pageId) {
    // Hide all pages with smooth transition
    Object.values(pages).forEach(page => {
        if (page) {
            page.style.opacity = '0';
            setTimeout(() => {
                page.classList.remove('active-section');
                page.style.opacity = '';
            }, 150);
        }
    });
    
    // Show selected page with animation
    setTimeout(() => {
        if (pages[pageId]) {
            pages[pageId].classList.add('active-section');
            pages[pageId].style.animation = 'fadeIn 0.4s ease';
        }
    }, 150);

    // Update navigation active state
    navItems.forEach(item => {
        const page = item.getAttribute('data-page');
        if (page === pageId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Save current page to localStorage
    localStorage.setItem('currentWorkCulturePage', pageId);
}

// Add click event listeners to navigation items
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = item.getAttribute('data-page');
        if (pageId && pages[pageId]) {
            activatePage(pageId);
        }
    });
});

// DASHBOARD BUTTON - Connect your dashboard here
if (dashboardBtn) {
    dashboardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 🔴 IMPORTANT: REPLACE THIS URL WITH YOUR ACTUAL DASHBOARD LINK 🔴
        
        // Option 1: If dashboard is in the same folder
        window.open('../Dashboard/index.html', '_blank');
        
        // Option 2: If dashboard is in assets/Dashboard folder (common structure)
        // window.open('assets/Dashboard/index.html', '_blank');
        
        // Option 3: Full absolute path for your specific dashboard
        // window.open('C:/Users/ASUS/Desktop/fresher-guide/assets/Dashboard/index.html', '_blank');
        
        // Option 4: Relative path from current location (one level up)
        // window.open('../assets/Dashboard/index.html', '_blank');
        
        // Log for debugging
        console.log('Dashboard button clicked - opening dashboard in new tab');
    });
}

// Keyboard Shortcuts for better navigation
document.addEventListener('keydown', (e) => {
    // Number keys for navigation (1-4)
    if (e.key === '1') {
        e.preventDefault();
        activatePage('worklife');
    } else if (e.key === '2') {
        e.preventDefault();
        activatePage('learning');
    } else if (e.key === '3') {
        e.preventDefault();
        activatePage('diversity');
    } else if (e.key === '4') {
        e.preventDefault();
        activatePage('wellbeing');
    }
    
    // Ctrl + D for Dashboard
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        if (dashboardBtn) dashboardBtn.click();
    }
    
    // Arrow keys for navigation between sections
    if (e.key === 'ArrowRight') {
        const currentPage = getCurrentActivePage();
        const pageOrder = ['worklife', 'learning', 'diversity', 'wellbeing'];
        const currentIndex = pageOrder.indexOf(currentPage);
        if (currentIndex < pageOrder.length - 1) {
            activatePage(pageOrder[currentIndex + 1]);
        }
    } else if (e.key === 'ArrowLeft') {
        const currentPage = getCurrentActivePage();
        const pageOrder = ['worklife', 'learning', 'diversity', 'wellbeing'];
        const currentIndex = pageOrder.indexOf(currentPage);
        if (currentIndex > 0) {
            activatePage(pageOrder[currentIndex - 1]);
        }
    }
});

// Helper function to get currently active page
function getCurrentActivePage() {
    for (const [key, element] of Object.entries(pages)) {
        if (element && element.classList.contains('active-section')) {
            return key;
        }
    }
    return 'worklife';
}

// Restore last visited page from localStorage
function restoreLastPage() {
    const lastPage = localStorage.getItem('currentWorkCulturePage');
    if (lastPage && pages[lastPage]) {
        activatePage(lastPage);
    }
}

// Add hover effect for table rows
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to table rows
    const tableRows = document.querySelectorAll('.info-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#f8fafc';
            row.style.transition = 'background-color 0.2s ease';
        });
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
    
    // Restore last visited page
    restoreLastPage();
    
    // Console welcome message
    console.log('=' .repeat(50));
    console.log('🎯 Work Culture Hub Loaded Successfully!');
    console.log('📌 Features:');
    console.log('   • 4 Comprehensive sections about work culture');
    console.log('   • Keyboard shortcuts: 1,2,3,4 for navigation');
    console.log('   • Arrow keys (← →) to switch between sections');
    console.log('   • Ctrl+D to open dashboard');
    console.log('=' .repeat(50));
});

// Export functions for debugging (optional)
window.workCulture = {
    activatePage,
    getCurrentActivePage,
    pages
};