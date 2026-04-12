// Tab navigation
const sections = {
    verbal: document.getElementById('verbalSection'),
    listening: document.getElementById('listeningSection'),
    feedback: document.getElementById('feedbackSection'),
    conflict: document.getElementById('conflictSection')
};

const navOptions = document.querySelectorAll('.nav-option');
const dashboardBtn = document.getElementById('dashboardBtn');

function activateSection(sectionId) {
    // hide all sections
    Object.values(sections).forEach(section => {
        if(section) section.classList.remove('active');
    });
    if(sections[sectionId]) sections[sectionId].classList.add('active');
    
    // update nav active style
    navOptions.forEach(opt => {
        const mode = opt.getAttribute('data-mode');
        if(mode === sectionId) opt.classList.add('active');
        else opt.classList.remove('active');
    });
    
    // scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Normal nav clicks
navOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const mode = opt.getAttribute('data-mode');
        if(mode && sections[mode]) {
            activateSection(mode);
        }
    });
});

// DASHBOARD BUTTON - Opens your existing dashboard
if(dashboardBtn) {
    dashboardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // 🔴 REPLACE THIS URL WITH YOUR ACTUAL DASHBOARD LINK 🔴
        window.open('../Dashboard/index.html', '_blank');
    });
}

// scroll to top button
const scrollBtnElem = document.getElementById('scrollBtn');
if(scrollBtnElem) {
    scrollBtnElem.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// youtube links placeholder
const allYoutubeLinks = document.querySelectorAll('.youtube-link');
allYoutubeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = link.getAttribute('data-video') || 'demo';
        alert(`✨ Resource demo: "${videoId}" - This would open a helpful YouTube video.\n(You can integrate actual YouTube embeds here.)`);
    });
});