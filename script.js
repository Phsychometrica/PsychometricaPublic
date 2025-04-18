// script.js - Frontend for Psychometrica Pro Plus (v4 - Complete Structure)
// Handles UI interactions, test flow, and communication with Apps Script backend via fetch.
// Spinner removed to streamline user experience.

document.addEventListener('DOMContentLoaded', () => {
    console.log("SCRIPT START: DOMContentLoaded event fired.");

    // --- Configuration ---
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZSyyAhlRdpg2LGsLU1Qqg-k7iONNVDA1dGQ_72KM4tYZVsoa-2nrgCdKXJofSrv2H/exec';
    const RESULTS_STORAGE_KEY = 'psychometric_results';
    const STUDENT_INFO_STORAGE_KEY = 'student_info';

    // --- State Variables ---
    let selectedStandard = '';
    let selectedLanguage = '';
    let studentData = {};
    let allResults = [];
    let allStudentInfo = [];
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let currentInfoStep = 0;

    // --- Info Fields Configuration ---
    const infoFields = [
        { id: 'student-name', labelEn: "Student's Name", labelMr: 'विद्यार्थ्याचे नाव', type: 'text' },
        { id: 'parent-name', labelEn: "Parent's Name", labelMr: 'पालकांचे नाव', type: 'text' },
        { id: 'mobile', labelEn: 'Mobile', labelMr: 'मोबाइल', type: 'tel' },
        { id: 'email', labelEn: 'Email', labelMr: 'ईमेल', type: 'email' },
        { id: 'age', labelEn: 'Age', labelMr: 'वय', type: 'number' },
        { id: 'grade', labelEn: 'Grade', labelMr: 'इयत्ता', type: 'text', readonly: true },
        {
            id: 'board', labelEn: 'Board', labelMr: 'बोर्ड', type: 'select', options: [
                { value: '', textEn: 'Select Board', textMr: 'बोर्ड निवडा' },
                { value: 'SSC', textEn: 'SSC (Maharashtra State Board)', textMr: 'एसएससी (महाराष्ट्र राज्य मंडळ)' },
                { value: 'CBSE', textEn: 'CBSE', textMr: 'सीबीएसई' },
                { value: 'ICSE', textEn: 'ICSE', textMr: 'आयसीएसई' },
                { value: 'IB', textEn: 'IB', textMr: 'आयबी' },
                { value: 'IGCSE', textEn: 'IGCSE', textMr: 'आयजीसीएसई' }
            ]
        }
    ];

    // ========================================================================
    // Utility Functions
    // ========================================================================

    function showAlert(type, message) {
        console.log(`ALERT (${type}): ${message}`);
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) existingAlert.remove();
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        document.body.insertBefore(alertDiv, document.body.firstChild);
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 500);
        }, 4000);
    }

    function loadResults() {
        try {
            const storedResults = localStorage.getItem(RESULTS_STORAGE_KEY);
            allResults = storedResults ? JSON.parse(storedResults) : [];
            console.log('Loaded results count:', allResults.length);
        } catch (error) {
            console.error('Error loading results from localStorage:', error);
            allResults = [];
            showAlert('error', 'Failed to load previous results.');
        }
    }

    function saveResults() {
        try {
            localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(allResults));
            console.log('Results saved to localStorage:', allResults.length);
        } catch (error) {
            console.error('Error saving results to localStorage:', error);
            showAlert('error', 'Failed to save results.');
        }
    }

    function loadStudentInfo() {
        try {
            const storedInfo = localStorage.getItem(STUDENT_INFO_STORAGE_KEY);
            allStudentInfo = storedInfo ? JSON.parse(storedInfo) : [];
            console.log('Loaded student info count:', allStudentInfo.length);
        } catch (error) {
            console.error('Error loading student info from localStorage:', error);
            allStudentInfo = [];
            showAlert('error', 'Failed to load student information.');
        }
    }

    function saveStudentInfo() {
        try {
            localStorage.setItem(STUDENT_INFO_STORAGE_KEY, JSON.stringify(allStudentInfo));
            console.log('Student info saved to localStorage:', allStudentInfo.length);
        } catch (error) {
            console.error('Error saving student info to localStorage:', error);
            showAlert('error', 'Failed to save student information.');
        }
    }

    function resetUI() {
        console.log('Resetting UI to login screen.');
        const sections = [
            'login-section', 'standard-selection', 'language-selection',
            'info-section', 'instructions-section', 'test-section',
            'results-section', 'admin-section', 'welcome-section'
        ];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.classList.add('hidden');
        });
        const loginSection = document.getElementById('login-section');
        if (loginSection) loginSection.classList.remove('hidden');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';
        currentInfoStep = 0;
        currentQuestionIndex = 0;
        userAnswers = {};
        studentData = {};
        selectedStandard = '';
        selectedLanguage = '';
    }

    function getClientBranding() {
        const brandingString = sessionStorage.getItem('clientBranding');
        try {
            return brandingString ? JSON.parse(brandingString) : null;
        } catch (e) {
            console.error("Error parsing branding info from sessionStorage:", e);
            sessionStorage.removeItem('clientBranding');
            return null;
        }
    }

    function updateBrandingThroughout() {
        console.log('Attempting to update branding on visible sections...');
        const branding = getClientBranding();
        if (!branding || !branding.name) {
            console.warn("No valid branding info found in sessionStorage to update UI.");
            return;
        }
        console.log("Using branding:", branding);
        const sections = [
            'standard-selection', 'language-selection', 'info-section',
            'instructions-section', 'test-section', 'results-section', 'admin-section'
        ];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section && !section.classList.contains('hidden')) {
                console.log("Updating branding for section:", sectionId);
                let existingBrandingFooter = section.querySelector('.branding-footer');
                if (existingBrandingFooter) existingBrandingFooter.remove();
                const brandingDiv = document.createElement('div');
                brandingDiv.className = 'branding-footer';
                brandingDiv.innerHTML = `
                    <p>${branding.name}, ${branding.address || 'Address N/A'} | <i class="fas fa-phone"></i> ${branding.phone || 'Phone N/A'}</p>
                `;
                section.appendChild(brandingDiv);
            }
        });
        const resultsSection = document.getElementById('results-section');
        if (resultsSection && !resultsSection.classList.contains('hidden')) {
            const contactMessageP = resultsSection.querySelector('.contact-message p');
            if (contactMessageP) {
                contactMessageP.innerHTML = `For detailed discussion and counseling regarding your child's progress plan, please contact ${branding.name} at <i class="fas fa-phone"></i> <strong>${branding.phone || 'N/A'}</strong>. Share your result with admin now for further processing.`;
            }
        }
    }

    function showWelcomeScreen() {
        console.log('showWelcomeScreen: Function called.');
        const branding = getClientBranding();
        const userRole = sessionStorage.getItem('userRole');
        if (!branding || !branding.name) {
            console.warn('showWelcomeScreen: Skipping welcome screen display: No branding info.');
            console.log(`showWelcomeScreen: Calling handlePostLoginNavigation directly with role: ${userRole}`);
            handlePostLoginNavigation(userRole);
            return;
        }
        const container = document.querySelector('.container');
        if (!container) {
            console.error("showWelcomeScreen: Container not found.");
            console.log(`showWelcomeScreen: Calling handlePostLoginNavigation directly due to container error. Role: ${userRole}`);
            handlePostLoginNavigation(userRole);
            return;
        }
        const existingWelcome = document.getElementById('welcome-section');
        if (existingWelcome) existingWelcome.remove();
        const welcomeSection = document.createElement('section');
        welcomeSection.id = 'welcome-section';
        welcomeSection.innerHTML = `
            <h2>Welcome to ${branding.name}</h2>
            <p>${branding.address || 'Address not available'}</p>
            <p><i class="fas fa-phone"></i> ${branding.phone || 'Contact not available'}</p>
        `;
        const header = container.querySelector('header');
        if (header) header.insertAdjacentElement('afterend', welcomeSection);
        else container.insertBefore(welcomeSection, container.firstChild);
        welcomeSection.classList.remove('hidden');
        console.log('showWelcomeScreen: Welcome section displayed.');
        console.log('showWelcomeScreen: Setting 3s timeout for navigation...');
        setTimeout(() => {
            console.log('showWelcomeScreen: 3s timeout finished. Adding exiting class.');
            welcomeSection.classList.add('exiting');
            setTimeout(() => {
                console.log('showWelcomeScreen: 400ms animation timeout finished. Removing welcome section.');
                welcomeSection.remove();
                const roleForNav = sessionStorage.getItem('userRole');
                console.log(`showWelcomeScreen: Calling handlePostLoginNavigation with role: ${roleForNav}`);
                handlePostLoginNavigation(roleForNav);
            }, 400);
        }, 3000);
    }

    function handlePostLoginNavigation(role) {
        console.log(`handlePostLoginNavigation: Function called with role: "${role}"`);
        if (role === 'admin') {
            console.log("handlePostLoginNavigation: Role is admin, calling showAdminDashboard()...");
            showAdminDashboard();
        } else if (role === 'user') {
            console.log("handlePostLoginNavigation: Role is user, attempting to show standard selection...");
            const standardSection = document.getElementById('standard-selection');
            console.log("handlePostLoginNavigation: Found standard section element:", standardSection);
            if (standardSection) {
                standardSection.classList.remove('hidden');
                console.log("handlePostLoginNavigation: 'hidden' class removed from standard section. Calling updateBrandingThroughout()...");
                updateBrandingThroughout();
                console.log("handlePostLoginNavigation: updateBrandingThroughout() finished.");
            } else {
                console.error('handlePostLoginNavigation: Standard selection section (#standard-selection) not found in HTML!');
                showAlert('error', 'Error navigating to the next step (UI element missing).');
                resetUI();
            }
        } else {
            console.warn(`handlePostLoginNavigation: Role is unknown or null ("${role}"), navigating back to login.`);
            resetUI();
        }
    }

    // ========================================================================
    // Authentication & Session Management
    // ========================================================================

    async function login() {
        console.log("login() function started...");
        console.log('Login attempt initiated...');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        if (!usernameInput || !passwordInput) {
            showAlert('error', 'Login form elements not found.');
            return;
        }
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        console.log(`DEBUG: Username from input: "${username}", Password length: ${password.length}`);

        if (!username || !password) {
            showAlert('error', 'Please enter both username and password.');
            return;
        }

        const payload = {
            action: 'login',
            username: username,
            password: password
        };

        console.log('DEBUG: Payload being sent:', JSON.stringify(payload));

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            console.log("Fetch timeout triggered after 20 seconds.");
            controller.abort();
        }, 20000);

        try {
            console.log('Sending login request to:', APPS_SCRIPT_URL);
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log('Login response status:', response.status);

            if (!response.ok) {
                let errorText = `Network response was not ok. Status: ${response.status}`;
                try { errorText = await response.text(); } catch (textError) { /* Ignore */ }
                console.error("Login fetch error response text:", errorText);
                throw new Error(errorText);
            }

            const result = await response.json();
            console.log('Login API response parsed:', result);

            if (result && result.success === true && result.token) {
                console.log("Login successful path executing...");
                sessionStorage.setItem('sessionToken', result.token);
                sessionStorage.setItem('userRole', result.role);
                if (result.branding) { sessionStorage.setItem('clientBranding', JSON.stringify(result.branding)); }
                else { sessionStorage.removeItem('clientBranding'); }
                showAlert('success', 'Login Successful!');
                const loginSection = document.getElementById('login-section');
                if (loginSection) loginSection.classList.add('hidden');
                console.log("Calling showWelcomeScreen from login success...");
                showWelcomeScreen();
            } else {
                console.warn('Login failed path executing:', result?.error || 'Unknown server validation error.');
                showAlert('error', result?.error || 'Invalid username or password.');
                sessionStorage.removeItem('sessionToken');
                sessionStorage.removeItem('userRole');
                sessionStorage.removeItem('clientBranding');
            }

        } catch (error) {
            clearTimeout(timeoutId);
            console.error('Login fetch/processing error path executing:', error);
            if (error.name === 'AbortError') {
                showAlert('error', 'Login request timed out. Please check connection or try again later.');
            } else {
                showAlert('error', 'Login failed. Could not connect or server error occurred. Check console for details.');
            }
            sessionStorage.removeItem('sessionToken');
            sessionStorage.removeItem('userRole');
            sessionStorage.removeItem('clientBranding');
        }
    }

    async function checkUserSession() {
        const token = sessionStorage.getItem('sessionToken');
        if (!token) {
            console.log("No session token found. User needs to log in.");
            resetUI();
            return;
        }

        console.log("Found session token. Verifying with backend...");
        const payload = {
            action: 'checkSession',
            token: token
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            console.log("Session Check Fetch timeout triggered after 15 seconds.");
            controller.abort();
        }, 15000);

        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log('Session check response status:', response.status);

            if (!response.ok) {
                let errorText = `Network response was not ok. Status: ${response.status}`;
                try { errorText = await response.text(); } catch (e) {}
                console.error("Session check fetch error response text:", errorText);
                throw new Error(errorText);
            }

            const sessionData = await response.json();
            console.log('Session check API response parsed:', sessionData);

            if (sessionData && sessionData.role) {
                console.log("Session is valid for role:", sessionData.role);
                sessionStorage.setItem('userRole', sessionData.role);
                if (sessionData.branding) { sessionStorage.setItem('clientBranding', JSON.stringify(sessionData.branding)); }
                else { sessionStorage.removeItem('clientBranding'); }
                const loginSection = document.getElementById('login-section');
                if (loginSection) loginSection.classList.add('hidden');
                showWelcomeScreen();
            } else {
                console.log("Session invalid or expired as per server.");
                sessionStorage.removeItem('sessionToken');
                sessionStorage.removeItem('userRole');
                sessionStorage.removeItem('clientBranding');
                resetUI();
            }

        } catch (error) {
            clearTimeout(timeoutId);
            console.error("Session check fetch/processing error:", error);
            if (error.name === 'AbortError') {
                console.warn("Session check timed out.");
            }
            sessionStorage.removeItem('sessionToken');
            sessionStorage.removeItem('userRole');
            sessionStorage.removeItem('clientBranding');
            resetUI();
        }
    }

    function confirmLogout() {
        if (confirm('Are you sure you want to logout? All unsaved data may be lost.')) {
            console.log('Logging out user.');
            sessionStorage.removeItem('sessionToken');
            sessionStorage.removeItem('userRole');
            sessionStorage.removeItem('clientBranding');
            resetUI();
            showAlert('success', 'You have been logged out.');
        }
    }

    // ========================================================================
    // Test Flow Logic
    // ========================================================================

    function showLanguageSelection() {
        const standardSelect = document.getElementById('standard');
        selectedStandard = standardSelect?.value;
        if (!selectedStandard) {
            showAlert('error', 'Please select a grade.');
            return;
        }
        console.log('Selected standard:', selectedStandard);
        const standardSection = document.getElementById('standard-selection');
        const languageSection = document.getElementById('language-selection');
        if (standardSection && languageSection) {
            standardSection.classList.add('hidden');
            languageSection.classList.remove('hidden');
            updateBrandingThroughout();
        } else {
            showAlert('error', 'Error navigating to language selection.');
        }
    }

    function startTest(language) {
        selectedLanguage = language;
        console.log('Selected language:', selectedLanguage);
        studentData.grade = selectedStandard;
        const languageSection = document.getElementById('language-selection');
        const infoSection = document.getElementById('info-section');
        if (languageSection && infoSection) {
            languageSection.classList.add('hidden');
            infoSection.classList.remove('hidden');
            currentInfoStep = 0;
            loadInfoStep(currentInfoStep);
            updateBrandingThroughout();
        } else {
            showAlert('error', 'Error navigating to student information.');
        }
    }

    function loadInfoStep(stepIndex) {
        const infoStepDiv = document.getElementById('info-step');
        const backBtn = document.getElementById('info-back-btn');
        const nextBtn = document.getElementById('info-next-btn');
        if (!infoStepDiv || !backBtn || !nextBtn) {
            showAlert('error', 'Info section elements not found.');
            return;
        }
        const field = infoFields[stepIndex];
        const isMarathi = selectedLanguage === 'marathi';
        infoStepDiv.innerHTML = `
            <div class="form-group">
                <label for="${field.id}">${isMarathi ? field.labelMr : field.labelEn}:</label>
                ${field.type === 'select' ? `
                    <select id="${field.id}" aria-label="${isMarathi ? field.labelMr : field.labelEn}" ${field.id === 'grade' ? 'readonly' : ''}>
                        ${field.options.map(opt => `
                            <option value="${opt.value}" ${opt.value === (field.id === 'grade' ? selectedStandard : '') ? 'selected' : ''}>
                                ${isMarathi ? opt.textMr : opt.textEn}
                            </option>
                        `).join('')}
                    </select>
                ` : `
                    <input type="${field.type}" id="${field.id}" placeholder="${isMarathi ? field.labelMr : field.labelEn}"
                        aria-label="${isMarathi ? field.labelMr : field.labelEn}" ${field.id === 'grade' ? 'value="' + selectedStandard + '" readonly' : ''}
                        ${field.type === 'number' ? 'min="' + (field.id === 'age' ? '10' : '0') + '" max="' + (field.id === 'age' ? '18' : '100') + '"' : ''}>
                `}
            </div>
        `;
        backBtn.style.display = stepIndex === 0 ? 'none' : 'inline-block';
        nextBtn.textContent = stepIndex === infoFields.length - 1 ? 'Submit' : 'Next';
    }

    function nextInfoStep() {
        const field = infoFields[currentInfoStep];
        const input = document.getElementById(field.id);
        let value = input?.value.trim();
        if (field.id === 'grade') value = selectedStandard;
        if (!value && field.id !== 'grade') {
            showAlert('error', `Please enter ${selectedLanguage === 'marathi' ? field.labelMr : field.labelEn}.`);
            return;
        }
        if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showAlert('error', 'Please enter a valid email.');
            return;
        }
        if (field.id === 'mobile' && !/^\d{10}$/.test(value)) {
            showAlert('error', 'Please enter a valid 10-digit mobile number.');
            return;
        }
        if (field.id === 'age' && (parseInt(value) < 10 || parseInt(value) > 18)) {
            showAlert('error', 'Age must be between 10 and 18.');
            return;
        }
        studentData[field.id] = value;
        currentInfoStep++;
        if (currentInfoStep < infoFields.length) {
            loadInfoStep(currentInfoStep);
        } else {
            const infoSection = document.getElementById('info-section');
            const instructionsSection = document.getElementById('instructions-section');
            if (infoSection && instructionsSection) {
                infoSection.classList.add('hidden');
                instructionsSection.classList.remove('hidden');
                const instructionsContent = document.getElementById('instructions-content');
                if (instructionsContent) {
                    instructionsContent.innerHTML = selectedLanguage === 'marathi' ? `
                        <p>प्रिय विद्यार्थी,</p>
                        <p>या मानसिक चाचणीमध्ये तुमच्या निवडलेल्या इयत्तेनुसार प्रश्न असतील. खालील सूचना काळजीपूर्वक वाचा:</p>
                        <ul>
                            <li>सर्व प्रश्नांना प्रामाणिकपणे उत्तरे द्या.</li>
                            <li>प्रत्येक प्रश्नासाठी योग्य पर्याय निवडा.</li>
                            <li>वेळेची मर्यादा नाही, घाई न करता उत्तरे द्या.</li>
                            <li>चाचणी पूर्ण झाल्यावर तुम्हाला निकाल आणि शिफारसी मिळतील.</li>
                        </ul>
                        <p>सर्वोत्तम शुभेच्छा!</p>
                    ` : `
                        <p>Dear Student,</p>
                        <p>This psychological test contains questions based on your selected grade. Please read the instructions carefully:</p>
                        <ul>
                            <li>Answer all questions honestly.</li>
                            <li>Select the appropriate option for each question.</li>
                            <li>There is no time limit, so take your time to answer.</li>
                            <li>Upon completion, you will receive your results and recommendations.</li>
                        </ul>
                        <p>Best of luck!</p>
                    `;
                }
                updateBrandingThroughout();
            } else {
                showAlert('error', 'Error navigating to instructions.');
            }
        }
    }

    function previousInfoStep() {
        if (currentInfoStep > 0) {
            currentInfoStep--;
            loadInfoStep(currentInfoStep);
        }
    }

    function goBack(currentSectionId) {
        const currentSection = document.getElementById(currentSectionId);
        let prevSectionId;
        switch (currentSectionId) {
            case 'language-selection':
                prevSectionId = 'standard-selection';
                break;
            case 'info-section':
                prevSectionId = 'language-selection';
                break;
            case 'instructions-section':
                prevSectionId = 'info-section';
                currentInfoStep = infoFields.length - 1;
                loadInfoStep(currentInfoStep);
                break;
            default:
                return;
        }
        const prevSection = document.getElementById(prevSectionId);
        if (currentSection && prevSection) {
            currentSection.classList.add('hidden');
            prevSection.classList.remove('hidden');
            updateBrandingThroughout();
        } else {
            showAlert('error', 'Error navigating back.');
        }
    }

    function showTest() {
        const instructionsSection = document.getElementById('instructions-section');
        const testSection = document.getElementById('test-section');
        if (instructionsSection && testSection) {
            instructionsSection.classList.add('hidden');
            testSection.classList.remove('hidden');
            currentQuestionIndex = 0;
            loadQuestion(currentQuestionIndex);
            updateBrandingThroughout();
        } else {
            showAlert('error', 'Error navigating to test.');
        }
    }

    function loadQuestion(index) {
        const questions = selectedStandard <= 8 ? window.questions5to8?.[selectedLanguage] : window.questions9to10?.[selectedLanguage];
        if (!questions) {
            showAlert('error', 'Questions not found for the selected grade and language.');
            return;
        }
        const question = questions[index];
        const questionsDiv = document.getElementById('questions');
        if (!question || !questionsDiv) {
            showAlert('error', 'Error loading question.');
            return;
        }
        questionsDiv.innerHTML = `
            <div class="question">
                <p>${question.text}</p>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <label>
                            <input type="radio" name="q${index}" value="${option}" 
                                ${userAnswers[index] === option ? 'checked' : ''}>
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        updateProgressAndButtons(index, questions.length);
    }

    function updateProgressAndButtons(currentIndex, totalQuestions) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        const backBtn = document.getElementById('back-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        if (progressFill && progressText && backBtn && nextBtn && submitBtn) {
            const progress = ((currentIndex + 1) / totalQuestions) * 100;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `Question ${currentIndex + 1} of ${totalQuestions}`;
            backBtn.style.display = currentIndex === 0 ? 'none' : 'inline-block';
            nextBtn.style.display = currentIndex === totalQuestions - 1 ? 'none' : 'inline-block';
            submitBtn.style.display = currentIndex === totalQuestions - 1 ? 'inline-block' : 'none';
        }
    }

    function nextQuestion() {
        const questions = selectedStandard <= 8 ? window.questions5to8?.[selectedLanguage] : window.questions9to10?.[selectedLanguage];
        if (!questions) return;
        const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
        if (!selectedOption) {
            showAlert('error', 'Please select an option.');
            return;
        }
        userAnswers[currentQuestionIndex] = selectedOption.value;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        }
    }

    function previousQuestion() {
        if (currentQuestionIndex > 0) {
            const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
            if (selectedOption) userAnswers[currentQuestionIndex] = selectedOption.value;
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    }

    async function submitTest() {
        const questions = selectedStandard <= 8 ? window.questions5to8?.[selectedLanguage] : window.questions9to10?.[selectedLanguage];
        if (!questions) {
            showAlert('error', 'Questions not found.');
            return;
        }
        const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
        if (selectedOption) userAnswers[currentQuestionIndex] = selectedOption.value;
        try {
            const result = window.calculateResults(parseInt(selectedStandard), selectedLanguage, userAnswers);
            console.log('Calculated result:', result);
            const resultData = {
                studentData,
                result: result.detailedResult,
                date: result.date,
                summary: result.summary
            };
            allResults.push(resultData);
            saveResults();

            const payload = {
                action: 'saveResult',
                token: sessionStorage.getItem('sessionToken'),
                result: resultData
            };
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                console.error('Failed to save result to backend:', await response.text());
            }

            const testSection = document.getElementById('test-section');
            const resultsSection = document.getElementById('results-section');
            const resultContent = document.getElementById('result-content');
            const trophySign = document.getElementById('trophy-sign');
            if (testSection && resultsSection && resultContent && trophySign) {
                testSection.classList.add('hidden');
                resultsSection.classList.remove('hidden');
                const isHighScore = selectedStandard <= 8 ? result.detailedResult.scores.percentage > 80 : result.detailedResult.scores.realistic > 30 || result.detailedResult.scores.investigative > 30 || result.detailedResult.scores.artistic > 30;
                trophySign.classList.toggle('hidden', !isHighScore);
                resultContent.innerHTML = `
                    <div class="result-details">
                        <p><strong>Student Name:</strong> ${studentData['student-name']}</p>
                        <p><strong>Grade:</strong> ${studentData.grade}</p>
                        <p><strong>Date:</strong> ${result.date}</p>
                        <p><strong>Summary:</strong> ${result.summary}</p>
                        <p><strong>Analysis:</strong> ${result.detailedResult.analysis}</p>
                    </div>
                    <div class="recommendations-toggle">Show Recommendations</div>
                    <ul class="recommendations-list">
                        ${result.detailedResult.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                `;
                const toggleButton = resultContent.querySelector('.recommendations-toggle');
                if (toggleButton) {
                    toggleButton.addEventListener('click', () => toggleRecommendations(toggleButton));
                }
                updateBrandingThroughout();
            } else {
                showAlert('error', 'Error displaying results.');
            }
        } catch (error) {
            console.error('Error submitting test:', error);
            showAlert('error', 'Error calculating results.');
        }
    }

    function toggleRecommendations(toggleButton) {
        const recommendationsList = toggleButton.nextElementSibling;
        if (recommendationsList) {
            recommendationsList.classList.toggle('active');
            toggleButton.textContent = recommendationsList.classList.contains('active') ? 'Hide Recommendations' : 'Show Recommendations';
        }
    }

    function shareOnWhatsApp() {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) {
            showAlert('error', 'No results to share.');
            return;
        }
        const lastResult = allResults[allResults.length - 1];
        const recommendations = lastResult.result.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n');
        const text = `
    Psychometrica Pro Plus Results
    Student: ${studentData['student-name']}
    Grade: ${studentData.grade}
    Summary: ${lastResult.summary}
    Analysis: ${lastResult.result.analysis}
    Recommendations:
    ${recommendations}
    Contact: ${getClientBranding()?.phone || 'N/A'}
        `.trim();
        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/?text=${encodedText}`;
        window.open(url, '_blank');
    }

    function copyResultCode() {
        const resultContent = document.getElementById('result-content');
        if (!resultContent) {
            showAlert('error', 'No results to copy.');
            return;
        }
        const lastResult = allResults[allResults.length - 1];
        const recommendations = lastResult.result.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n');
        const text = `
    Psychometrica Pro Plus Results
    Student: ${studentData['student-name']}
    Grade: ${studentData.grade}
    Summary: ${lastResult.summary}
    Analysis: ${lastResult.result.analysis}
    Recommendations:
    ${recommendations}
        `.trim();
        navigator.clipboard.writeText(text).then(() => {
            showAlert('success', 'Results copied to clipboard.');
        }).catch(() => {
            showAlert('error', 'Failed to copy results.');
        });
    }

    function downloadCertificate() {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            showAlert('error', 'Certificate generation library not loaded.');
            return;
        }
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
        const branding = getClientBranding() || {
            name: 'Psychometrica Pro Plus',
            address: 'N/A',
            phone: 'N/A'
        };
        const lastResult = allResults[allResults.length - 1];
        const studentName = studentData['student-name'] || 'Student';
        const grade = studentData.grade || 'N/A';
        const date = lastResult.date || 'N/A';
        const summary = lastResult.summary || 'N/A';
    
        // Set fonts and colors
        doc.setFont('Poppins', 'normal'); // Ensure Poppins is available or fallback to Helvetica
        doc.setFontSize(12);
        doc.setTextColor(31, 42, 68); // Dark text color (#1F2A44)
    
        // === Certificate Border ===
        // Outer border (gold accent)
        doc.setDrawColor(244, 162, 97); // Secondary color (#F4A261)
        doc.setLineWidth(2);
        doc.rect(10, 10, 277, 190);
    
        // Inner decorative border (primary color)
        doc.setDrawColor(27, 59, 111); // Primary color (#1B3B6F)
        doc.setLineWidth(1);
        doc.rect(15, 15, 267, 180);
    
        // === Header: Institute Branding ===
        doc.setFontSize(22);
        doc.setFont('Poppins', 'bold');
        doc.setTextColor(27, 59, 111); // Primary color
        doc.text(branding.name.toUpperCase(), 148.5, 30, { align: 'center' });
    
        doc.setFontSize(14);
        doc.setFont('Poppins', 'normal');
        doc.setTextColor(107, 114, 128); // Gray (#6B7280)
        doc.text('Certificate of Achievement', 148.5, 40, { align: 'center' });
    
        // === Address on Right Side ===
        doc.setFontSize(10);
        doc.setTextColor(31, 42, 68);
        const addressLines = doc.splitTextToSize(`Address: ${branding.address}`, 80);
        let addressY = 20;
        addressLines.forEach(line => {
            doc.text(line, 267, addressY, { align: 'right' });
            addressY += 5;
        });
        doc.text(`Contact: ${branding.phone}`, 267, addressY, { align: 'right' });
    
        // === Decorative Elements ===
        // Corner ornaments
        doc.setFillColor(42, 157, 143); // Accent color (#2A9D8F)
        doc.circle(20, 20, 3, 'F');
        doc.circle(277, 20, 3, 'F');
        doc.circle(20, 190, 3, 'F');
        doc.circle(277, 190, 3, 'F');
    
        // Horizontal lines for elegance
        doc.setDrawColor(244, 162, 97);
        doc.setLineWidth(0.5);
        doc.line(30, 50, 267, 50);
        doc.line(30, 180, 267, 180);
    
        // === Certificate Body ===
        // Title
        doc.setFontSize(18);
        doc.setFont('Poppins', 'bold');
        doc.setTextColor(27, 59, 111);
        doc.text('Awarded to', 148.5, 70, { align: 'center' });
    
        // Student Name
        doc.setFontSize(24);
        doc.setTextColor(31, 42, 68);
        doc.text(studentName.toUpperCase(), 148.5, 85, { align: 'center' });
    
        // Achievement Description
        doc.setFontSize(14);
        doc.setFont('Poppins', 'normal');
        const description = 'For successfully completing the Psychometric Assessment';
        const descLines = doc.splitTextToSize(description, 200);
        let descY = 100;
        descLines.forEach(line => {
            doc.text(line, 148.5, descY, { align: 'center' });
            descY += 7;
        });
    
        // Details
        doc.setFontSize(12);
        doc.text(`Grade: ${grade}`, 148.5, descY + 10, { align: 'center' });
        doc.text(`Date: ${date}`, 148.5, descY + 20, { align: 'center' });
        doc.text(`Summary: ${summary}`, 148.5, descY + 30, { align: 'center' });
    
        // === Footer: Issued By ===
        doc.setFontSize(12);
        doc.setFont('Poppins', 'bold');
        doc.setTextColor(27, 59, 111);
        doc.text(`Issued by: ${branding.name}`, 148.5, 165, { align: 'center' });
    
        // === Footer: Branding ===
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text(`Powered by Psychometrica Pro Plus`, 148.5, 175, { align: 'center' });
    
        // === Save the PDF ===
        doc.save(`Psychometrica_Certificate_${studentName}.pdf`);
        showAlert('success', 'Certificate downloaded successfully.');
    }
    // ========================================================================
    // Admin Section Logic
    // ========================================================================

    function showAdminDashboard() {
        console.log('Showing admin dashboard.');
        const adminSection = document.getElementById('admin-section');
        const adminContent = document.getElementById('admin-content');
        const studentInfoTable = document.getElementById('student-info-table');
        if (adminSection && adminContent && studentInfoTable) {
            adminSection.classList.remove('hidden');
            adminContent.innerHTML = `
                <h3>Student Results</h3>
                <table id="results-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Date</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allResults.map(result => `
                            <tr>
                                <td>${result.studentData['student-name']}</td>
                                <td>${result.studentData.grade}</td>
                                <td>${result.date}</td>
                                <td>${result.summary}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            // Populate student info table
            const tbody = studentInfoTable.querySelector('tbody');
            tbody.innerHTML = allStudentInfo.map(info => `
                <tr>
                    <td>${info.studentName}</td>
                    <td>${info.parentName}</td>
                    <td>${info.mobile}</td>
                    <td>${info.email}</td>
                    <td>${info.school}</td>
                    <td>${info.age}</td>
                    <td>${info.board}</td>
                    <td>${info.standard}</td>
                    <td>${info.medium}</td>
                </tr>
            `).join('');
            updateBrandingThroughout();
        } else {
            showAlert('error', 'Error loading admin dashboard.');
        }
    }

    function clearReports() {
        if (confirm('Are you sure you want to clear all reports? This cannot be undone.')) {
            allResults = [];
            saveResults();
            showAdminDashboard();
            showAlert('success', 'All reports cleared.');
        }
    }

    function exportAllToExcel() {
        if (!allResults.length) {
            showAlert('error', 'No results to export.');
            return;
        }
        let csv = 'Name,Grade,Date,Summary,Analysis\n';
        allResults.forEach(result => {
            const row = [
                result.studentData['student-name'],
                result.studentData.grade,
                result.date,
                result.summary,
                result.result.analysis.replace(/,/g, ';')
            ].map(field => `"${field}"`).join(',');
            csv += row + '\n';
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Psychometrica_Results.csv';
        link.click();
        showAlert('success', 'Results exported to CSV.');
    }

    function submitStudentInfo() {
        const studentName = document.getElementById('info-student-name')?.value.trim();
        const parentName = document.getElementById('info-parent-name')?.value.trim();
        const mobile = document.getElementById('info-mobile')?.value.trim();
        const email = document.getElementById('info-email')?.value.trim();
        const school = document.getElementById('info-school')?.value.trim();
        const age = parseInt(document.getElementById('info-age')?.value, 10);
        const board = document.getElementById('info-board')?.value;
        const standard = document.getElementById('info-standard')?.value;
        const medium = document.getElementById('info-medium')?.value;

        if (!studentName || !parentName || !mobile || !email || !school || isNaN(age) || !board || !standard || !medium) {
            showAlert('error', 'Please fill in all fields with valid values.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showAlert('error', 'Please enter a valid email.');
            return;
        }

        if (!/^\d{10}$/.test(mobile)) {
            showAlert('error', 'Please enter a valid 10-digit mobile number.');
            return;
        }

        if (age < 10 || age > 18) {
            showAlert('error', 'Age must be between 10 and 18.');
            return;
        }

        const studentInfo = {
            studentName,
            parentName,
            mobile,
            email,
            school,
            age,
            board,
            standard,
            medium
        };

        allStudentInfo.push(studentInfo);
        saveStudentInfo();
        showAdminDashboard();
        showAlert('success', 'Student information submitted successfully.');
    }

    function exportStudentInfoToCSV() {
        if (!allStudentInfo.length) {
            showAlert('error', 'No student information to export.');
            return;
        }
        let csv = 'Student Name,Parent Name,Mobile,Email,School,Age,Board,Standard,Medium\n';
        allStudentInfo.forEach(info => {
            const row = [
                info.studentName,
                info.parentName,
                info.mobile,
                info.email,
                info.school,
                info.age,
                info.board,
                info.standard,
                info.medium
            ].map(field => `"${field}"`).join(',');
            csv += row + '\n';
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Student_Information.csv';
        link.click();
        showAlert('success', 'Student information exported to CSV.');
    }

    function clearStudentInfo() {
        if (confirm('Are you sure you want to clear all student information? This cannot be undone.')) {
            allStudentInfo = [];
            saveStudentInfo();
            showAdminDashboard();
            showAlert('success', 'All student information cleared.');
        }
    }

    // ========================================================================
    // Initialization
    // ========================================================================

    console.log('SCRIPT INFO: Assigning functions to window object...');
    window.login = login;
    window.confirmLogout = confirmLogout;
    window.showLanguageSelection = showLanguageSelection;
    window.startTest = startTest;
    window.nextInfoStep = nextInfoStep;
    window.previousInfoStep = previousInfoStep;
    window.showTest = showTest;
    window.nextQuestion = nextQuestion;
    window.previousQuestion = previousQuestion;
    window.submitTest = submitTest;
    window.shareOnWhatsApp = shareOnWhatsApp;
    window.copyResultCode = copyResultCode;
    window.goBack = goBack;
    window.exportAllToExcel = exportAllToExcel;
    window.toggleRecommendations = toggleRecommendations;
    window.downloadCertificate = downloadCertificate;
    window.clearReports = clearReports;
    window.generateDevelopmentPlan = generateDevelopmentPlan;
    window.copyPlan = copyPlan;
    window.submitStudentInfo = submitStudentInfo;
    window.exportStudentInfoToCSV = exportStudentInfoToCSV;
    window.clearStudentInfo = clearStudentInfo;

    console.log('SCRIPT INFO: Initializing application state...');
    loadResults();
    loadStudentInfo();
    checkUserSession();

    console.log("SCRIPT END: Initialization complete.");
});
