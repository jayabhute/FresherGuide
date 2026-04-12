// Question Data
const questionsData = {
    common: [
        "Tell me about yourself.",
        "Why do you want to work here?",
        "What are your strengths?",
        "What are your weaknesses?",
        "Where do you see yourself in 5 years?",
        "Why should we hire you?",
        "Tell me about a challenge you faced.",
        "How do you handle pressure?",
        "What is your greatest achievement?",
        "Why did you choose this career?"
    ],
    hr: [
        "What is your expected salary?",
        "How do you handle feedback?",
        "Describe a conflict at work.",
        "Why are you leaving your current job?",
        "How do you work in a team?",
        "What motivates you?",
        "How do you handle failure?",
        "Tell me about a time you led a team.",
        "How do you prioritize tasks?",
        "What does success mean to you?"
    ],
    technical: [
        "What is the difference between let, const, and var?",
        "Explain the event loop in JavaScript.",
        "What is REST API?",
        "Difference between SQL and NoSQL?",
        "What is OOP? Explain pillars.",
        "What is Hoisting in JavaScript?",
        "Explain closures with example.",
        "What is the virtual DOM?",
        "How does garbage collection work?",
        "What is CI/CD pipeline?",
        "Explain promises vs callbacks.",
        "What is responsive design?",
        "Difference between GET and POST?",
        "What is a closure?",
        "Explain React lifecycle methods.",
        "What is middleware in Node.js?",
        "What is the difference between == and ===?",
        "Explain the concept of debouncing.",
        "What is JWT authentication?",
        "How does a HashMap work?"
    ]
};

const answersData = {
    common: {
        "Tell me about yourself.": "I'm a recent Computer Science graduate from XYZ University with a passion for building user-friendly applications. During my internship at ABC Tech, I developed a dashboard that reduced reporting time by 30%. I'm excited to bring my problem-solving skills and eagerness to learn to this role.",
        "Why do you want to work here?": "I admire your company's innovative approach to [product/service]. Your recent launch of [feature] aligns with my passion for creating impactful solutions. I want to contribute to a team that values creativity and growth.",
        "What are your strengths?": "My key strengths are adaptability and analytical thinking. In my last project, I quickly learned a new framework and delivered the module 2 days early. I also thrive in collaborative environments.",
        "What are your weaknesses?": "I sometimes take on too many tasks because I'm eager to help. However, I've started using prioritization frameworks like Eisenhower Matrix to manage my workload effectively.",
        "Where do you see yourself in 5 years?": "I see myself as a subject matter expert in this domain, leading projects and mentoring juniors. I want to grow with this company and contribute to long-term success.",
        "Why should we hire you?": "You should hire me because I combine technical skills with a growth mindset. I've consistently gone beyond expectations, like automating a manual process that saved 20+ hours monthly.",
        "Tell me about a challenge you faced.": "During a group project, we had conflicting opinions on the tech stack. I facilitated a discussion, we prototyped both, and chose the one that improved performance by 40%.",
        "How do you handle pressure?": "I break down problems into smaller tasks and communicate early. During a tight deadline, I re-prioritized deliverables and delivered 95% on time.",
        "What is your greatest achievement?": "Building a chatbot that handled 500+ queries daily with 85% accuracy. It reduced response time from 5 minutes to instant.",
        "Why did you choose this career?": "I love solving real-world problems with code. The thrill of seeing my work impact users directly drives my passion for this field."
    },
    hr: {
        "What is your expected salary?": "As a fresher, my priority is to learn and gain experience. I am open to a salary as per company standards and industry norms. I believe if I perform well, growth will follow.",
        "How do you handle feedback?": "I take feedback positively because it helps me improve. I listen carefully, understand the suggestion, and work on it sincerely to enhance my performance",
        "Describe a conflict at work.": "A teammate missed a deadline affecting our launch. I calmly discussed the blocker, we reallocated tasks, and delivered on time. I learned to check in earlier.",
        "Why are you leaving your current job?": "I'm seeking more challenging projects and growth opportunities. I've learned a lot, but now I'm ready to contribute at a larger scale.",
        "How do you work in a team?": "I believe in clear communication and shared ownership. In my last team, I set up weekly syncs and we improved delivery speed by 25%.",
        "What motivates you?": "Solving complex problems and seeing tangible results. I'm also motivated by continuous learning and helping teammates succeed.",
        "How do you handle failure?": "I treat failure as data. After a failed experiment, I documented lessons, shared with team, and we avoided similar mistakes. It built resilience.",
        "Tell me about a time you led a team.": "Led a 4-person capstone project, assigned roles, tracked milestones, and delivered ahead of schedule. We received the 'Best Project' award.",
        "How do you prioritize tasks?": "I use the urgent-important matrix. I also communicate with stakeholders to align on top priorities weekly.",
        "What does success mean to you?": "Success means achieving goals while growing skills and helping the team. When my work positively impacts users, that's true success."
    },
    technical: {
        "What is the difference between let, const, and var?": "var is function-scoped and can be redeclared. let is block-scoped and cannot be redeclared in same scope. const is block-scoped and cannot be reassigned. Use const by default, let when reassignment needed.",
        "Explain the event loop in JavaScript.": "Event loop allows async operations. Call stack executes functions, Web APIs handle async tasks, callback queue holds ready callbacks. Event loop moves callbacks to stack when empty.",
        "What is REST API?": "REST is an architectural style using HTTP methods (GET, POST, PUT, DELETE). It's stateless and uses JSON/XML. Resources are identified by URLs.",
        "Difference between SQL and NoSQL?": "SQL is relational with fixed schema, uses tables. NoSQL is non-relational, flexible schema, handles unstructured data. SQL for complex queries, NoSQL for scalability.",
        "What is OOP? Explain pillars.": "OOP uses objects. Pillars: Encapsulation (data hiding), Inheritance (reuse), Polymorphism (many forms), Abstraction (hide complexity).",
        "What is Hoisting in JavaScript?": "Hoisting moves declarations to top of scope. var variables are hoisted with undefined, let/const are hoisted but not initialized. Function declarations are fully hoisted."
    }
};

// Populate grids
function populateGrid(section, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = '';
    questionsData[section].forEach(q => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.textContent = q;
        card.onclick = () => {
            document.querySelectorAll(`#${gridId} .question-card`).forEach(c => c.classList.remove('active-question'));
            card.classList.add('active-question');
            const answerDiv = document.getElementById(`${section}AnswerText`);
            if (answersData[section] && answersData[section][q]) {
                answerDiv.innerHTML = answersData[section][q];
            } else {
                answerDiv.innerHTML = "📝 Detailed answer preparation in progress. Use the structure to craft your unique response.";
            }
        };
        grid.appendChild(card);
    });
}

populateGrid('common', 'commonGrid');
populateGrid('hr', 'hrGrid');
populateGrid('technical', 'technicalGrid');

// Tab navigation
const sections = {
    common: document.getElementById('commonSection'),
    hr: document.getElementById('hrSection'),
    technical: document.getElementById('technicalSection'),
    tips: document.getElementById('tipsSection'),
    checklist: document.getElementById('checklistSection'),
    mistakes: document.getElementById('mistakesSection')
};

const navOptions = document.querySelectorAll('.nav-option');
const dashboardBtn = document.getElementById('dashboardBtn');

function activateSection(sectionId) {
    Object.values(sections).forEach(section => {
        if (section) section.classList.remove('active');
    });
    if (sections[sectionId]) sections[sectionId].classList.add('active');

    navOptions.forEach(opt => {
        const mode = opt.getAttribute('data-mode');
        if (mode === sectionId) opt.classList.add('active');
        else opt.classList.remove('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
        const mode = opt.getAttribute('data-mode');
        if (mode && sections[mode]) activateSection(mode);
    });
});

// DASHBOARD BUTTON - Connect your dashboard here
if (dashboardBtn) {
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

// Scroll to top
const scrollBtnElem = document.getElementById('scrollBtn');
if (scrollBtnElem) {
    scrollBtnElem.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// PDF download (simplified)
const pdfBtns = document.querySelectorAll('.download-pdf-btn');
pdfBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const section = btn.getAttribute('data-section');
        alert(`📄 PDF generation for ${section} questions would download here. (jsPDF integration ready)`);
    });
});

console.log('Interview Mastery loaded with Dashboard button!');