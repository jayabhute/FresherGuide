// Data arrays for dynamic sections
let internships = [{ title: "Software Developer Intern", org: "Tech Solutions", duration: "Summer 2024", desc: "Built REST APIs using Python, improved response time by 20%" }];
let projects = [{ name: "E-Learning Platform", tech: "React, Node.js", desc: "Built interactive dashboard with 500+ daily users" }];

function renderInternships() {
    const container = document.getElementById('internsContainer');
    if (!container) return;
    container.innerHTML = '';
    internships.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'internship-item';
        div.style.background = '#f8fafc';
        div.style.padding = '12px';
        div.style.borderRadius = '16px';
        div.style.marginBottom = '12px';
        div.innerHTML = `
            <div class="grid-2" style="margin-bottom:6px;">
                <input placeholder="Title" value="${item.title}" onchange="updateInternship(${idx}, 'title', this.value)">
                <input placeholder="Organization" value="${item.org}" onchange="updateInternship(${idx}, 'org', this.value)">
            </div>
            <input placeholder="Duration" value="${item.duration}" style="width:100%; margin-bottom:6px;" onchange="updateInternship(${idx}, 'duration', this.value)">
            <textarea placeholder="Description" rows="2" style="width:100%;" onchange="updateInternship(${idx}, 'desc', this.value)">${item.desc}</textarea>
            <button class="btn-add" style="margin-top:6px; background:#fee2e2;" onclick="removeInternship(${idx})">Remove</button>
        `;
        container.appendChild(div);
    });
    updatePreview();
}

function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    container.innerHTML = '';
    projects.forEach((item, idx) => {
        const div = document.createElement('div');
        div.style.background = '#f8fafc';
        div.style.padding = '12px';
        div.style.borderRadius = '16px';
        div.style.marginBottom = '12px';
        div.innerHTML = `
            <div class="grid-2" style="margin-bottom:6px;">
                <input placeholder="Project name" value="${item.name}" onchange="updateProject(${idx}, 'name', this.value)">
                <input placeholder="Tech stack" value="${item.tech}" onchange="updateProject(${idx}, 'tech', this.value)">
            </div>
            <textarea placeholder="Description" rows="2" style="width:100%;" onchange="updateProject(${idx}, 'desc', this.value)">${item.desc}</textarea>
            <button class="btn-add" style="margin-top:6px; background:#fee2e2;" onclick="removeProject(${idx})">Remove</button>
        `;
        container.appendChild(div);
    });
    updatePreview();
}

window.updateInternship = (idx, field, val) => { internships[idx][field] = val; updatePreview(); };
window.updateProject = (idx, field, val) => { projects[idx][field] = val; updatePreview(); };
window.removeInternship = (idx) => { internships.splice(idx,1); renderInternships(); };
window.removeProject = (idx) => { projects.splice(idx,1); renderProjects(); };

document.getElementById('addInternBtn')?.addEventListener('click', () => { internships.push({ title:"", org:"", duration:"", desc:"" }); renderInternships(); });
document.getElementById('addProjectBtn')?.addEventListener('click', () => { projects.push({ name:"", tech:"", desc:"" }); renderProjects(); });

function updatePreview() {
    document.getElementById('cleanName').innerText = document.getElementById('nameInput').value;
    document.getElementById('cleanTitle').innerText = document.getElementById('titleInput').value;
    document.getElementById('cleanEmail').innerHTML = `📧 ${document.getElementById('emailInput').value}`;
    document.getElementById('cleanPhone').innerHTML = `📱 ${document.getElementById('phoneInput').value}`;
    document.getElementById('cleanLocation').innerHTML = `📍 ${document.getElementById('locationInput').value}`;
    document.getElementById('cleanLinkedin').innerHTML = `🔗 ${document.getElementById('linkedinInput').value}`;
    document.getElementById('cleanObjective').innerText = document.getElementById('objectiveInput').value;
    
    const edu = `<strong>${document.getElementById('degreeInput').value}</strong> – ${document.getElementById('collegeInput').value}, ${document.getElementById('yearInput').value}<br>CGPA: ${document.getElementById('cgpaInput').value} | 12th: ${document.getElementById('twelfthInput').value}`;
    document.getElementById('cleanEducation').innerHTML = edu;
    
    const skills = document.getElementById('skillsInput').value.split(',').map(s=>s.trim());
    document.getElementById('cleanSkills').innerHTML = skills.map(s => `<span>${s}</span>`).join('');
    document.getElementById('cleanLanguages').innerHTML = document.getElementById('langInput').value;
    
    let certHtml = document.getElementById('certInput').value.replace(/\n/g,'<br>');
    document.getElementById('cleanCertifications').innerHTML = certHtml;
    document.getElementById('cleanAchievements').innerHTML = document.getElementById('achievementsInput').value.replace(/\n/g,'<br>');
    
    let internsHtml = internships.map(i => `<div style="margin-bottom:10px;"><strong>${i.title}</strong> @ ${i.org} (${i.duration})<br><span style="font-size:0.85rem;">${i.desc}</span></div>`).join('');
    document.getElementById('cleanInternships').innerHTML = internsHtml || '<p style="color:gray;">— Add internships —</p>';
    
    let projectsHtml = projects.map(p => `<div style="margin-bottom:10px;"><strong>${p.name}</strong> (${p.tech})<br><span style="font-size:0.85rem;">${p.desc}</span></div>`).join('');
    document.getElementById('cleanProjects').innerHTML = projectsHtml || '<p style="color:gray;">— Add projects —</p>';
    
    let score = 70;
    if (skills.length>3) score+=5;
    if (document.getElementById('objectiveInput').value.length>50) score+=5;
    if (internships.length>0) score+=4;
    if (projects.length>1) score+=4;
    score = Math.min(98,score);
    document.getElementById('scoreMeter').innerText = score;
}

function downloadResume() {
    const previewHtml = document.getElementById('resumePreview').cloneNode(true);
    const style = document.querySelector('style').innerHTML;
    const doc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>My_ATS_Resume</title><style>${style} body { padding:2rem; background:#eef2f5; } .preview-grid { max-width:1000px; margin:auto; } .download-btn, .download-section { display:none; } </style></head><body>${previewHtml.outerHTML}</body></html>`;
    const blob = new Blob([doc], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ATS_Resume.html';
    a.click();
    URL.revokeObjectURL(a.href);
}

// Attach input listeners
const inputs = ['nameInput','titleInput','emailInput','phoneInput','locationInput','linkedinInput','objectiveInput','degreeInput','collegeInput','yearInput','cgpaInput','twelfthInput','skillsInput','langInput','certInput','achievementsInput'];
inputs.forEach(id => { document.getElementById(id)?.addEventListener('input', updatePreview); });

// Navigation
const pages = { resume: 'page-resume', tips: 'page-tips', 'action-verbs': 'page-action-verbs', checklist: 'page-checklist' };
const navItems = document.querySelectorAll('.nav-item');
const dashboardBtn = document.getElementById('dashboardBtn');

function activatePage(pageId) {
    Object.values(pages).forEach(p => { document.getElementById(p)?.classList.remove('active'); });
    document.getElementById(pageId)?.classList.add('active');
    navItems.forEach(item => { 
        item.classList.remove('active'); 
        if(item.getAttribute('data-page') === pageId.replace('page-','')) item.classList.add('active'); 
    });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const pageName = item.getAttribute('data-page');
        if(pages[pageName]) activatePage(pages[pageName]);
    });
});

// DASHBOARD BUTTON - Connect your dashboard here
if(dashboardBtn) {
    dashboardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // 🔴 REPLACE THIS WITH YOUR ACTUAL DASHBOARD LINK 🔴
        window.open('../Dashboard/index.html', '_blank');
        // Example for your specific path:
        // window.open('C:/Users/ASUS/Desktop/fresher-guide/assets/Dashboard/index.html', '_blank');
        // OR using relative path:
        // window.open('../assets/Dashboard/index.html', '_blank');
    });
}

// Initialize
renderInternships();
renderProjects();
updatePreview();