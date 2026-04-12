(function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = {
        'company-section': document.getElementById('company-section'),
        'components-section': document.getElementById('components-section'),
        'slip-section': document.getElementById('slip-section'),
        'calculator-section': document.getElementById('calculator-section'),
        'negotiation-section': document.getElementById('negotiation-section')
    };
    
    function showSection(targetId) {
        // Handle dashboard button click - opens dashboard in new tab
        if (targetId === 'dashboard-placeholder') {
            // DASHBOARD BUTTON - Connect your dashboard here
            const dashboardBtn = document.querySelector('.nav-item[data-target="dashboard-placeholder"]');
            if(dashboardBtn) {
                // Open dashboard in new tab
                window.open('../Dashboard/index.html', '_blank');
                // Alternative paths (uncomment as needed):
                // window.open('C:/Users/ASUS/Desktop/fresher-guide/assets/Dashboard/index.html', '_blank');
                // window.open('../assets/Dashboard/index.html', '_blank');
                // window.open('dashboard.html', '_blank');
            }
            return;
        }
        
        // Hide all sections
        Object.values(sections).forEach(section => {
            if (section) section.classList.add('hidden');
        });
        
        // Show selected section
        if (sections[targetId]) sections[targetId].classList.remove('hidden');
        
        // Update active class on nav items
        navItems.forEach(item => item.classList.remove('active'));
        const activeItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        if (activeItem) activeItem.classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Add click event to all nav items
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            showSection(target);
        });
    });
    
    // DASHBOARD BUTTON - Separate event listener (alternative method)
    const dashboardBtn = document.querySelector('.nav-item[data-target="dashboard-placeholder"]');
    if(dashboardBtn) {
        dashboardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // 🔴 REPLACE THIS WITH YOUR ACTUAL DASHBOARD LINK 🔴
            window.open('../Dashboard/index.html', '_blank');
            // Example for your specific path:
            // window.open('C:/Users/ASUS/Desktop/fresher-guide/assets/Dashboard/index.html', '_blank');
            // OR using relative path:
            // window.open('../assets/Dashboard/index.html', '_blank');
        });
    }
    
    // Default show company section
    showSection('company-section');

    // Company data
    const companyBranches = {
        tcs: { name: 'Tata Consultancy Services (TCS)', branches: [
            { location: 'Mumbai (HQ)', fresherSalary: '3.5 - 4.5 LPA', openings: '120+', inhand: '₹34,000 - ₹35,500' },
            { location: 'Pune', fresherSalary: '3.5 - 4.3 LPA', openings: '80+', inhand: '₹33,500 - ₹35,000' },
            { location: 'Bangalore', fresherSalary: '3.6 - 4.5 LPA', openings: '150+', inhand: '₹34,500 - ₹36,000' }
        ]},
        infosys: { name: 'Infosys', branches: [
            { location: 'Bangalore (HQ)', fresherSalary: '3.5 - 4.2 LPA', openings: '200+', inhand: '₹33,000 - ₹34,500' },
            { location: 'Pune', fresherSalary: '3.4 - 4.0 LPA', openings: '100+', inhand: '₹32,500 - ₹33,500' },
            { location: 'Hyderabad', fresherSalary: '3.5 - 4.1 LPA', openings: '120+', inhand: '₹33,000 - ₹34,000' }
        ]},
        wipro: { name: 'Wipro', branches: [
            { location: 'Bangalore (HQ)', fresherSalary: '3.2 - 4.0 LPA', openings: '180+', inhand: '₹31,000 - ₹33,000' },
            { location: 'Chennai', fresherSalary: '3.2 - 3.9 LPA', openings: '90+', inhand: '₹31,000 - ₹32,500' }
        ]},
        hcl: { name: 'HCL Technologies', branches: [
            { location: 'Noida (HQ)', fresherSalary: '3.3 - 4.0 LPA', openings: '150+', inhand: '₹31,500 - ₹33,000' },
            { location: 'Chennai', fresherSalary: '3.3 - 4.0 LPA', openings: '80+', inhand: '₹31,500 - ₹33,000' }
        ]},
        accenture: { name: 'Accenture', branches: [
            { location: 'Bangalore (HQ)', fresherSalary: '4.0 - 5.0 LPA', openings: '250+', inhand: '₹35,000 - ₹38,000' },
            { location: 'Hyderabad', fresherSalary: '4.0 - 4.8 LPA', openings: '200+', inhand: '₹35,000 - ₹37,500' },
            { location: 'Pune', fresherSalary: '3.8 - 4.8 LPA', openings: '150+', inhand: '₹34,500 - ₹37,000' }
        ]},
        microsoft: { name: 'Microsoft', branches: [
            { location: 'Hyderabad (HQ)', fresherSalary: '18 - 25 LPA', openings: '50+', inhand: '₹1,15,000 - ₹1,45,000' },
            { location: 'Bangalore', fresherSalary: '18 - 25 LPA', openings: '40+', inhand: '₹1,15,000 - ₹1,45,000' }
        ]},
        google: { name: 'Google', branches: [
            { location: 'Bangalore (HQ)', fresherSalary: '20 - 28 LPA', openings: '30+', inhand: '₹1,20,000 - ₹1,55,000' },
            { location: 'Hyderabad', fresherSalary: '19 - 26 LPA', openings: '25+', inhand: '₹1,18,000 - ₹1,50,000' }
        ]},
        amazon: { name: 'Amazon', branches: [
            { location: 'Bangalore (HQ)', fresherSalary: '12 - 18 LPA', openings: '100+', inhand: '₹80,000 - ₹1,05,000' },
            { location: 'Hyderabad', fresherSalary: '12 - 17 LPA', openings: '80+', inhand: '₹80,000 - ₹1,00,000' },
            { location: 'Chennai', fresherSalary: '11 - 16 LPA', openings: '60+', inhand: '₹75,000 - ₹95,000' }
        ]},
        flipkart: { name: 'Flipkart', branches: [
            { location: 'Bangalore (HQ)', fresherSalary: '12 - 18 LPA', openings: '70+', inhand: '₹80,000 - ₹1,05,000' }
        ]},
        deloitte: { name: 'Deloitte', branches: [
            { location: 'Hyderabad (HQ)', fresherSalary: '6.5 - 8.5 LPA', openings: '150+', inhand: '₹48,000 - ₹58,000' },
            { location: 'Bangalore', fresherSalary: '6.5 - 8.5 LPA', openings: '120+', inhand: '₹48,000 - ₹58,000' },
            { location: 'Mumbai', fresherSalary: '6.5 - 8.5 LPA', openings: '100+', inhand: '₹48,000 - ₹58,000' }
        ]}
    };
    
    function updateCompanyBranches() {
        let val = document.getElementById('companySelect').value;
        let company = companyBranches[val] || companyBranches.tcs;
        document.getElementById('selectedCompanyBadge').innerHTML = `<i class="fas fa-check-circle"></i> ${company.name} Selected`;
        
        let tableHTML = `<table class="branches-table"><thead><tr><th>Branch Location</th><th>Fresher Salary</th><th>Openings</th><th>In-hand (approx)</th></tr></thead><tbody>`;
        company.branches.forEach(branch => {
            tableHTML += `<tr><td>${branch.location}</td><td><span class="fresher-salary">${branch.fresherSalary}</span></td><td>${branch.openings}</td><td>${branch.inhand}</td></tr>`;
        });
        tableHTML += `</tbody></table>`;
        document.getElementById('branchesTableContainer').innerHTML = tableHTML;
    }
    
    const companySelect = document.getElementById('companySelect');
    if (companySelect) {
        companySelect.addEventListener('change', updateCompanyBranches);
        updateCompanyBranches();
    }
    
    // Components table
    const componentsBody = document.getElementById('componentsBody');
    if (componentsBody) {
        componentsBody.innerHTML = `
            <tr class="category-header"><td colspan="4"><i class="fas fa-plus-circle"></i> EARNINGS</td></tr>
            <tr><td>Basic Salary</td><td>Core component, 40-50% of CTC</td><td>40-50% of CTC</td><td><span class="tax-badge tax-taxable">Taxable</span></td></tr>
            <tr><td>HRA</td><td>House Rent Allowance</td><td>40-50% of Basic</td><td><span class="tax-badge tax-exempt">Exempt*</span></td></tr>
            <tr><td>Conveyance</td><td>Travel allowance</td><td>₹1,600/month</td><td><span class="tax-badge tax-exempt">Exempt*</span></td></tr>
            <tr><td>Special Allowance</td><td>Remaining component</td><td>Variable</td><td><span class="tax-badge tax-taxable">Taxable</span></td></tr>
            <tr class="category-header"><td colspan="4"><i class="fas fa-minus-circle"></i> DEDUCTIONS</td></tr>
            <tr><td>Employee PF</td><td>Provident Fund</td><td>12% of Basic</td><td><span class="tax-badge tax-exempt">80C</span></td></tr>
            <tr><td>Professional Tax</td><td>State tax</td><td>₹200-250/month</td><td><span class="tax-badge tax-taxable">Deducted</span></td></tr>
            <tr><td>Income Tax (TDS)</td><td>Based on slab</td><td>Variable</td><td><span class="tax-badge tax-taxable">Taxable</span></td></tr>
        `;
    }
    
    // Calculator elements
    const ctcInput = document.getElementById('ctcInput');
    const profTax = document.getElementById('profTax');
    const employeePF = document.getElementById('employeePF');
    const additionalDed1 = document.getElementById('additionalDed1');
    const additionalDed2 = document.getElementById('additionalDed2');
    const resultGrid = document.getElementById('resultGrid');
    const breakupBody = document.getElementById('breakupBody');
    const deductionsBody = document.getElementById('deductionsBody');
    const inhandBreakup = document.getElementById('inhandBreakup');
    const salarySlip = document.getElementById('salarySlip');

    const formatMoney = (num) => '₹' + Math.round(num).toLocaleString('en-IN');
    
    function updateCalculator() {
        let ctc = parseFloat(ctcInput?.value) || 600000;
        let profTaxMonthly = parseFloat(profTax?.value) || 200;
        let employeePFMonthly = parseFloat(employeePF?.value) || 1800;
        let addDed1 = parseFloat(additionalDed1?.value) || 0;
        let addDed2 = parseFloat(additionalDed2?.value) || 0;
        let totalMonthlyDeductions = profTaxMonthly + employeePFMonthly + addDed1 + addDed2;
        let monthlyCTC = ctc / 12;
        let takeHomeMonthly = monthlyCTC - totalMonthlyDeductions;
        let estimatedTax = Math.max(0, monthlyCTC * 0.05);

        if (resultGrid) {
            resultGrid.innerHTML = `
                <div class="result-box"><div class="label">Monthly Deductions</div><div class="value">${formatMoney(totalMonthlyDeductions + estimatedTax)}</div></div>
                <div class="result-box highlight"><div class="label">Take Home Monthly</div><div class="value">${formatMoney(takeHomeMonthly - estimatedTax)}</div></div>
            `;
        }
        let grossMonthly = ctc / 12;
        let basic = Math.round(grossMonthly * 0.4);
        let hra = Math.round(basic * 0.4);
        let special = grossMonthly - basic - hra - 4000 - 1250;

        if (breakupBody) {
            breakupBody.innerHTML = `
                <tr><td>Basic</td><td>40% of CTC</td><td>${formatMoney(basic)}</td></tr>
                <tr><td>HRA</td><td>40% of Basic</td><td>${formatMoney(hra)}</td></tr>
                <tr><td>Conveyance</td><td>Fixed</td><td>₹4,000</td></tr>
                <tr><td>Special Allowance</td><td>Balancing</td><td>${formatMoney(Math.round(special))}</td></tr>
                <tr><td>Medical</td><td>Fixed</td><td>₹1,250</td></tr>
                <tr><td><strong>Gross</strong></td><td></td><td><strong>${formatMoney(grossMonthly)}</strong></td></tr>
            `;
        }
        if (deductionsBody) {
            deductionsBody.innerHTML = `
                <tr><td>PF</td><td>12% of Basic</td><td>${formatMoney(employeePFMonthly)}</td></tr>
                <tr><td>Professional Tax</td><td>Fixed</td><td>${formatMoney(profTaxMonthly)}</td></tr>
                <tr><td>Income Tax</td><td>Approx</td><td>${formatMoney(estimatedTax)}</td></tr>
                <tr><td><strong>Total</strong></td><td></td><td><strong>${formatMoney(employeePFMonthly + profTaxMonthly + estimatedTax)}</strong></td></tr>
            `;
        }
        if (inhandBreakup) {
            inhandBreakup.innerHTML = `💰 Final In-Hand = ${formatMoney(grossMonthly - (employeePFMonthly + profTaxMonthly + estimatedTax))}`;
        }
        // SALARY SLIP
        if (salarySlip) {
            salarySlip.innerHTML = `
                <div class="slip-header">
                    <h2>Salary Slip</h2>
                    <p>For the month of March 2025</p>
                </div>
                <div class="slip-company-details">
                    <div><strong>Company:</strong> ${companySelect?.options[companySelect.selectedIndex]?.text || 'Tata Consultancy Services (TCS)'}</div>
                    <div><strong>Month:</strong> March 2025</div>
                </div>
                <div class="slip-employee-details">
                    <div><strong>Employee Name:</strong> Rahul Sharma</div>
                    <div><strong>Employee ID:</strong> EMP12345</div>
                    <div><strong>Designation:</strong> Software Engineer</div>
                    <div><strong>Date of Joining:</strong> 01 Feb 2025</div>
                </div>
                <div class="slip-earnings-deductions">
                    <div class="slip-earnings">
                        <h3>Earnings</h3>
                        <div class="slip-row"><span>Basic Salary</span> <span>${formatMoney(basic)}</span></div>
                        <div class="slip-row"><span>House Rent Allowance (HRA)</span> <span>${formatMoney(hra)}</span></div>
                        <div class="slip-row"><span>Conveyance Allowance</span> <span>₹4,000</span></div>
                        <div class="slip-row"><span>Special Allowance</span> <span>${formatMoney(Math.round(special))}</span></div>
                        <div class="slip-row"><span>Medical Reimbursement</span> <span>₹1,250</span></div>
                        <div class="slip-row total"><span>Gross Earnings</span> <span>${formatMoney(grossMonthly)}</span></div>
                    </div>
                    <div class="slip-deductions">
                        <h3>Deductions</h3>
                        <div class="slip-row"><span>Provident Fund (EPF)</span> <span>${formatMoney(employeePFMonthly)}</span></div>
                        <div class="slip-row"><span>Professional Tax</span> <span>${formatMoney(profTaxMonthly)}</span></div>
                        <div class="slip-row"><span>Income Tax (TDS)</span> <span>${formatMoney(estimatedTax)}</span></div>
                        <div class="slip-row total"><span>Total Deductions</span> <span>${formatMoney(employeePFMonthly + profTaxMonthly + estimatedTax)}</span></div>
                    </div>
                </div>
                <div class="slip-net-pay">
                    Net Pay (In-Hand): ${formatMoney(grossMonthly - (employeePFMonthly + profTaxMonthly + estimatedTax))}
                </div>
                <div class="slip-footer">
                    This is a computer generated salary slip and does not require signature.
                </div>
                <div class="slip-note">
                    <i class="fas fa-info-circle"></i> Employer PF: ${formatMoney(employeePFMonthly)} | Gratuity: ${formatMoney(Math.round(basic * 0.0481))}
                </div>
            `;
        }
    }
    
    const calcInputs = [ctcInput, profTax, employeePF, additionalDed1, additionalDed2];
    calcInputs.forEach(input => {
        if (input) input.addEventListener('input', updateCalculator);
    });
    updateCalculator();
})();