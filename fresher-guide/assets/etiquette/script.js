// Tab navigation
const sections = {
    proSocialBlock: document.getElementById('proSocialBlock'),
    digitalHierBlock: document.getElementById('digitalHierBlock'),
    mistakeBlock: document.getElementById('mistakeBlock')
};

const navItems = document.querySelectorAll('.nav-item');
const dashboardBtn = document.getElementById('dashboardBtn');

function activateSection(sectionId) {
    // hide all sections
    Object.values(sections).forEach(section => {
        if(section) section.classList.remove('active-block');
    });
    if(sections[sectionId]) sections[sectionId].classList.add('active-block');
    
    // update nav active style
    navItems.forEach(item => {
        const block = item.getAttribute('data-block');
        if(block === sectionId) item.classList.add('active');
        else item.classList.remove('active');
    });
    
    // scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Normal nav clicks
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const block = item.getAttribute('data-block');
        if(block && sections[block]) {
            activateSection(block);
        }
    });
});

// DASHBOARD BUTTON - Opens your dashboard
if(dashboardBtn) {
    dashboardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 🔴 UPDATE THIS PATH WITH YOUR ACTUAL DASHBOARD LOCATION 🔴
        
        // Option 1: If dashboard is in same folder
        window.open('../Dashboard/index.html', '_blank');
        
        // Option 2: If dashboard is in assets/Dashboard folder
        // window.open('assets/Dashboard/index.html', '_blank');
        
        // Option 3: Full path for your specific dashboard
        // window.open('C:/Users/ASUS/Desktop/fresher-guide/assets/Dashboard/index.html', '_blank');
        
        // Option 4: Relative path from current location
        // window.open('../assets/Dashboard/index.html', '_blank');
        
        console.log('Dashboard button clicked - opening dashboard in new tab');
    });
}

// scroll to top button
const scrollBtnElem = document.getElementById('scrollBtn');
if(scrollBtnElem) {
    scrollBtnElem.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Optional: Add keyboard shortcut (Ctrl+D) to open dashboard
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        if(dashboardBtn) dashboardBtn.click();
    }
});

console.log('Office Etiquette Guide loaded with Dashboard button!');
console.log('To connect your dashboard, update the path in script.js');