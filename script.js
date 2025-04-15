// Wait for the page to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // State Variables to track the app's progress
    let selectedStandard = ''; // Stores chosen grade (5-10)
    let selectedLanguage = ''; // Stores chosen language (english/marathi)
    let studentData = {}; // Stores student info (name, parent, etc.)
    let allResults = []; // Stores all test results
    let currentUser = null; // Stores logged-in user info
    let currentQuestionIndex = 0; // Tracks current question in test
    let userAnswers = {}; // Stores user's answers to questions
    let currentInfoStep = 0; // Tracks current step in info collection

    // Key to store results in browser storage
    const RESULTS_STORAGE_KEY = 'psychometric_results';

    // Fields for collecting student info during the test
    const infoFields = [
        { id: 'student-name', labelEn: "Student's Name", labelMr: 'विद्यार्थ्याचे नाव', type: 'text' },
        { id: 'parent-name', labelEn: "Parent's Name", labelMr: 'पालकांचे नाव', type: 'text' },
        { id: 'mobile', labelEn: 'Mobile', labelMr: 'मोबाइल', type: 'text' },
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

    // Make functions available globally for HTML to call
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

    // Utility: Show a temporary alert message (success or error)
    function showAlert(type, message) {
        console.log(`Alert: ${type} - ${message}`);
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }

    // Utility: Load previous test results from browser storage
    function loadResults() {
        try {
            const storedResults = localStorage.getItem(RESULTS_STORAGE_KEY);
            if (storedResults) allResults = JSON.parse(storedResults);
            console.log('Loaded results:', allResults);
        } catch (error) {
            console.error('Error loading results:', error);
            showAlert('error', 'Failed to load previous results.');
        }
    }

    // Utility: Reset the UI to the login screen
    function resetUI() {
        console.log('Resetting UI');
        const sections = [
            'login-section', 'standard-selection', 'language-selection',
            'info-section', 'instructions-section', 'test-section',
            'results-section', 'admin-section'
        ];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.classList.add('hidden');
        });
        const loginSection = document.getElementById('login-section');
        if (loginSection) loginSection.classList.remove('hidden');

        // Clear input fields
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const secretKeyInput = document.getElementById('secret-key');
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';
        if (secretKeyInput) secretKeyInput.value = '';

        // Reset state
        currentInfoStep = 0;
        currentQuestionIndex = 0;
        userAnswers = {};
        studentData = {};
        selectedStandard = '';
        selectedLanguage = '';
    }

    // Show a welcome screen with branding before moving to next step
    function showWelcomeScreen() {
        console.log('Showing welcome screen');
        const branding = window.getClientBranding();
        if (!branding) {
            console.error('Branding not found');
            showAlert('error', 'Client branding not found.');
            return;
        }

        const container = document.querySelector('.container');
        if (!container) {
            console.error('Container not found');
            showAlert('error', 'Page structure error.');
            return;
        }

        // Create welcome section with branding details
        const welcomeSection = document.createElement('section');
        welcomeSection.id = 'welcome-section';
        welcomeSection.innerHTML = `
            <h2>Welcome to ${branding.name || 'Psychometrica Pro Plus'}</h2>
            <p>${branding.address || 'Address not available'}</p>
            <p><i class="fas fa-phone"></i> ${branding.phone || 'Contact not available'}</p>
        `;
        container.appendChild(welcomeSection);

        // Show welcome screen for 3 seconds before navigating
        setTimeout(() => {
            console.log('Preparing to remove welcome screen');
            welcomeSection.classList.add('exiting');
            // Wait for exit animation to complete before removing
            setTimeout(() => {
                console.log('Removing welcome screen');
                welcomeSection.remove();
                if (currentUser && currentUser.role === 'admin') {
                    console.log('Navigating to admin dashboard');
                    showAdminDashboard();
                } else {
                    console.log('Navigating to standard selection');
                    const standardSection = document.getElementById('standard-selection');
                    if (standardSection) {
                        standardSection.classList.remove('hidden');
                        updateBrandingThroughout();
                    } else {
                        console.error('Standard selection section not found');
                        showAlert('error', 'Standard selection section not found.');
                    }
                }
            }, 400); // Matches fadeOut animation duration (0.4s)
        }, 3000); // Display for 3 seconds
    }

    // Update branding (institute name, address, phone) across visible sections
    function updateBrandingThroughout() {
        console.log('Updating branding');
        const branding = window.getClientBranding();
        if (!branding) return;

        const sections = [
            'standard-selection', 'language-selection', 'info-section',
            'instructions-section', 'test-section', 'results-section', 'admin-section'
        ];

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section && !section.classList.contains('hidden')) {
                let existingBranding = section.querySelector('.branding');
                if (existingBranding) existingBranding.remove();
                const brandingDiv = document.createElement('div');
                brandingDiv.className = 'branding';
                brandingDiv.innerHTML = `
                    <p class="institute">${branding.name}</p>
                    <p class="location">${branding.address}</p>
                    <p class="contact"><i class="fas fa-phone"></i> ${branding.phone}</p>
                `;
                section.appendChild(brandingDiv);
            }
        });

        const resultsSection = document.getElementById('results-section');
        if (resultsSection && !resultsSection.classList.contains('hidden')) {
            const contactMessage = document.querySelector('.contact-message p');
            if (contactMessage) {
                contactMessage.innerHTML = `For detailed discussion and counseling regarding your child's progress plan, please contact ${branding.name} at <i class="fas fa-phone"></i> <strong>${branding.phone}</strong>. Share your result with admin now for further processing.`;
            }

            const brandingFooter = document.querySelector('.branding-footer p');
            if (brandingFooter) {
                brandingFooter.innerHTML = `${branding.name}, ${branding.address} | <i class="fas fa-phone"></i> ${branding.phone}`;
            }
        }
    }

    // Handle login button click
    async function login() {
        console.log('Login button clicked - starting login process');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const secretKeyInput = document.getElementById('secret-key');
    
        if (!usernameInput || !passwordInput || !secretKeyInput) {
            console.error('Username, password, or secret key input not found');
            showAlert('error', 'Login form is incomplete.');
            return;
        }
    
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        let secretKey = secretKeyInput.value.trim();
    
        // Use stored secret key from sessionStorage if input is empty
        if (!secretKey && sessionStorage.getItem('secretKey')) {
            secretKey = sessionStorage.getItem('secretKey');
            console.log('Using stored secret key from sessionStorage');
        }
    
        if (!username || !password || !secretKey) {
            console.log('Empty credentials entered');
            showAlert('error', 'Please enter username, password, and secret key.');
            return;
        }
    
        try {
            console.log('Calling authenticate with:', { username, password, secretKey });
            const authResult = await window.authenticate(username, password, secretKey);
            console.log('Authentication result:', authResult);
    
            if (authResult) {
                currentUser = authResult;
                sessionStorage.setItem('secretKey', secretKey);
                console.log('Current user set:', currentUser);
                const loginSection = document.getElementById('login-section');
                if (loginSection) {
                    console.log('Hiding login section');
                    loginSection.classList.add('hidden');
                    showWelcomeScreen();
                } else {
                    console.error('Login section not found');
                    showAlert('error', 'Login section not found.');
                }
            } else {
                console.log('Authentication failed: No matching credentials');
                showAlert('error', 'Invalid username, password, or secret key.');
            }
        } catch (error) {
            console.error('Login error:', error.message);
            showAlert('error', `Login failed: ${error.message}`);
        }
    }
    // Handle logout
    function confirmLogout() {
        if (confirm('Are you sure you want to logout?')) {
            console.log('Logging out');
            currentUser = null;
            sessionStorage.removeItem('currentClient');
            sessionStorage.removeItem('secretKey'); // Clear stored secret key
            resetUI();
        }
    }

    // Go back to previous section
    function goBack(currentSection) {
        console.log(`Going back from ${currentSection}`);
        const sections = {
            'language-selection': 'standard-selection',
            'info-section': 'language-selection',
            'instructions-section': 'info-section',
            'test-section': 'instructions-section'
        };
        const current = document.getElementById(currentSection);
        const target = document.getElementById(sections[currentSection]);
        if (current && target) {
            current.classList.add('hidden');
            target.classList.remove('hidden');
            updateBrandingThroughout();
        } else {
            console.error('Navigation error: Sections not found');
            showAlert('error', 'Navigation error occurred.');
        }
        if (currentSection === 'test-section') currentQuestionIndex = 0;
    }

    // Show grade selection screen
    function showLanguageSelection() {
        console.log('Showing language selection');
        const standardSelect = document.getElementById('standard');
        selectedStandard = standardSelect?.value;
        if (!selectedStandard) {
            showAlert('error', 'Please select a grade.');
            return;
        }

        const standardSection = document.getElementById('standard-selection');
        const languageSection = document.getElementById('language-selection');
        if (standardSection && languageSection) {
            standardSection.classList.add('hidden');
            languageSection.classList.remove('hidden');
            updateBrandingThroughout();
        } else {
            console.error('Navigation error: Sections not found');
            showAlert('error', 'Navigation error: Sections not found.');
        }
    }

    // Start test with chosen language
    function startTest(language) {
        console.log(`Starting test in ${language}`);
        selectedLanguage = language;
        const languageSection = document.getElementById('language-selection');
        const infoSection = document.getElementById('info-section');
        if (languageSection && infoSection) {
            languageSection.classList.add('hidden');
            infoSection.classList.remove('hidden');
            updateBrandingThroughout();
        } else {
            console.error('Navigation error: Sections not found');
            showAlert('error', 'Navigation error: Sections not found.');
        }
        const infoTitle = document.getElementById('info-title');
        if (infoTitle) {
            infoTitle.textContent = language === 'english' ? 'Student Information' : 'विद्यार्थ्याची माहिती';
        }
        loadInfoStep(currentInfoStep);
    }

    // Load a step in the student info form
    function loadInfoStep(step) {
        console.log(`Loading info step ${step}`);
        const field = infoFields[step];
        const stepDiv = document.getElementById('info-step');
        if (!stepDiv) {
            console.error('Info step div not found');
            return;
        }

        stepDiv.innerHTML = `
            <div class="form-group">
                <label for="${field.id}">${selectedLanguage === 'english' ? field.labelEn : field.labelMr}</label>
                ${field.type === 'select' ?
                `<select id="${field.id}" aria-label="${selectedLanguage === 'english' ? field.labelEn : field.labelMr}" required>
                        ${field.options.map(opt => `<option value="${opt.value}">${selectedLanguage === 'english' ? opt.textEn : opt.textMr}</option>`).join('')}
                    </select>` :
                `<input type="${field.type}" id="${field.id}" ${field.readonly ? 'readonly' : ''} aria-label="${selectedLanguage === 'english' ? field.labelEn : field.labelMr}" ${field.readonly ? '' : 'required'}>`
            }
            </div>
        `;

        if (field.id === 'grade') {
            const gradeInput = document.getElementById('grade');
            if (gradeInput) {
                gradeInput.value = selectedStandard + (selectedLanguage === 'english' ? 'th' : 'वी');
            }
        }

        const backBtn = document.getElementById('info-back-btn');
        const nextBtn = document.getElementById('info-next-btn');
        if (backBtn) backBtn.style.display = step > 0 ? 'inline-block' : 'none';
        if (nextBtn) {
            nextBtn.textContent = step === infoFields.length - 1 ?
                (selectedLanguage === 'english' ? 'Finish' : 'संपवा') :
                (selectedLanguage === 'english' ? 'Next' : 'पुढे');
        }
    }

    // Move to next info step
    function nextInfoStep() {
        console.log('Moving to next info step');
        const field = infoFields[currentInfoStep];
        const inputElement = document.getElementById(field.id);
        const input = field.type === 'select' ? inputElement.value : inputElement.value.trim();

        if (!input && !field.readonly) {
            showAlert('error', selectedLanguage === 'english' ? 'Please fill in this field.' : 'कृपया हा रकाना भरा.');
            return;
        }

        if (field.id === 'grade') {
            const gradeValue = selectedStandard + (selectedLanguage === 'english' ? 'th' : 'वी');
            studentData[field.id] = gradeValue;
        } else {
            studentData[field.id] = input;
        }

        currentInfoStep++;
        if (currentInfoStep < infoFields.length) {
            loadInfoStep(currentInfoStep);
        } else {
            const infoSection = document.getElementById('info-section');
            const instructionsSection = document.getElementById('instructions-section');
            if (infoSection && instructionsSection) {
                infoSection.classList.add('hidden');
                instructionsSection.classList.remove('hidden');
                const title = document.getElementById('instructions-title');
                const content = document.getElementById('instructions-content');
                if (title) title.textContent = selectedLanguage === 'english' ? 'Instructions' : 'सूचना';
                if (content) {
                    content.innerHTML = selectedLanguage === 'english' ? `
                        <p>No time limit.</p>
                        <p>All questions are compulsory.</p>
                        <p>All the best!</p>
                    ` : `
                        <p>वेळेची मर्यादा नाही.</p>
                        <p>सर्व प्रश्न अनिवार्य आहेत.</p>
                        <p>सर्वांना शुभेच्छा!</p>
                    `;
                }
                updateBrandingThroughout();
            } else {
                console.error('Navigation error: Sections not found');
                showAlert('error', 'Navigation error: Sections not found.');
            }
        }
    }

    // Move to previous info step
    function previousInfoStep() {
        console.log('Moving to previous info step');
        if (currentInfoStep > 0) {
            const field = infoFields[currentInfoStep];
            const inputElement = document.getElementById(field.id);
            const input = field.type === 'select' ? inputElement.value : inputElement.value.trim();
            if (input) studentData[field.id] = input;
            currentInfoStep--;
            loadInfoStep(currentInfoStep);
            updateBrandingThroughout();
        }
    }

    // Show the test screen
    function showTest() {
        console.log('Showing test screen');
        const instructionsSection = document.getElementById('instructions-section');
        const testSection = document.getElementById('test-section');
        if (instructionsSection && testSection) {
            instructionsSection.classList.add('hidden');
            testSection.classList.remove('hidden');
            updateBrandingThroughout();
        } else {
            console.error('Navigation error: Sections not found');
            showAlert('error', 'Navigation error: Sections not found.');
        }
        const testTitle = document.getElementById('test-title');
        if (testTitle) {
            testTitle.textContent = selectedLanguage === 'english' ?
                `Psychological Test for Grade ${selectedStandard}` :
                `इयत्ता ${selectedStandard} साठी मनोवैज्ञानिक चाचणी`;
        }
        loadQuestion(currentQuestionIndex);
    }

    // Load a test question
    function loadQuestion(index) {
        console.log(`Loading question ${index + 1}`);
        const qDiv = document.getElementById('questions');
        if (!qDiv) {
            console.error('Questions div not found');
            return;
        }

        qDiv.innerHTML = '';
        const questions = selectedStandard <= 8 ? window.questions5to8?.[selectedLanguage] : window.questions9to10?.[selectedLanguage];
        if (!questions) {
            console.error('Questions not found');
            showAlert('error', 'Questions not found.');
            return;
        }

        if (index < questions.length) {
            const q = questions[index];
            const div = document.createElement('div');
            div.className = 'question';
            div.innerHTML = `<p>${q.text}</p><div class="options"></div>`;
            const optionsDiv = div.querySelector('.options');
            q.options.forEach(option => {
                const checked = userAnswers[index] === option ? 'checked' : '';
                optionsDiv.innerHTML += `
                    <label>
                        <input type="radio" name="q${index}" value="${option}" ${checked}>
                        <span>${option}</span>
                    </label>
                `;
            });
            qDiv.appendChild(div);

            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            const backBtn = document.getElementById('back-btn');
            const nextBtn = document.getElementById('next-btn');
            const submitBtn = document.getElementById('submit-btn');
            if (progressFill) progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;
            if (progressText) progressText.textContent = `Question ${index + 1} of ${questions.length}`;
            if (backBtn) backBtn.style.display = index > 0 ? 'inline-block' : 'none';
            if (nextBtn) nextBtn.style.display = index < questions.length - 1 ? 'inline-block' : 'none';
            if (submitBtn) submitBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
        }
    }

    // Move to next question
    function nextQuestion() {
        console.log('Moving to next question');
        const questions = selectedStandard <= 8 ? window.questions5to8?.[selectedLanguage] : window.questions9to10?.[selectedLanguage];
        if (!questions) {
            console.error('Questions not found');
            showAlert('error', 'Questions not found.');
            return;
        }

        const selected = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
        if (!selected) {
            showAlert('error', selectedLanguage === 'english' ? 'Please select an option.' : 'कृपया एक पर्याय निवडा.');
            return;
        }

        const validOptions = selectedStandard <= 8 ?
            questions[currentQuestionIndex].options :
            ["Like", "Neutral", "Dislike", "आवडते", "ठीक आहे", "आवडत नाही"];
        if (!validOptions.includes(selected.value)) {
            console.error('Invalid option selected:', selected.value);
            showAlert('error', 'Invalid option selected.');
            return;
        }

        userAnswers[currentQuestionIndex] = selected.value;

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) loadQuestion(currentQuestionIndex);
    }

    // Move to previous question
    function previousQuestion() {
        console.log('Moving to previous question');
        const selected = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
        if (selected) userAnswers[currentQuestionIndex] = selected.value;
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    }

    // Submit the test and show results
    function submitTest() {
        console.log('Submitting test');
        const questions = selectedStandard <= 8 ? window.questions5to8?.[selectedLanguage] : window.questions9to10?.[selectedLanguage];
        if (!questions) {
            console.error('Questions not found');
            showAlert('error', 'Questions not found.');
            return;
        }

        const selected = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
        if (!selected) {
            showAlert('error', selectedLanguage === 'english' ? 'Please select an option.' : 'कृपया एक पर्याय निवडा.');
            return;
        }

        userAnswers[currentQuestionIndex] = selected.value;

        let allAnswered = true;
        let unansweredQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            if (!userAnswers.hasOwnProperty(i) || !userAnswers[i]) {
                allAnswered = false;
                unansweredQuestions.push(i + 1);
            }
        }

        if (!allAnswered) {
            const errorMessage = selectedLanguage === 'english' ?
                `Please answer all questions. Unanswered: ${unansweredQuestions.join(', ')}` :
                `कृपया सर्व प्रश्नांची उत्तरे द्या. अनुत्तरित: ${unansweredQuestions.join(', ')}`;
            showAlert('error', errorMessage);
            return;
        }

        try {
            const result = window.calculateResults?.(Number(selectedStandard), selectedLanguage, userAnswers);
            if (!result || !result.detailedResult) {
                throw new Error('Result calculation failed.');
            }

            const fullResult = { ...studentData, ...result };
            allResults.push(fullResult);
            localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(allResults));

            const testSection = document.getElementById('test-section');
            if (testSection) testSection.classList.add('hidden');
            showAlert('success', selectedLanguage === 'english' ?
                `Test completed, ${studentData['student-name']}!` :
                `चाचणी पूर्ण झाली, ${studentData['student-name']}!`);

            setTimeout(() => {
                const resultsSection = document.getElementById('results-section');
                if (!resultsSection) {
                    console.error('Results section not found');
                    throw new Error('Results section not found.');
                }
                resultsSection.classList.remove('hidden');
                const title = document.getElementById('results-title');
                const trophy = document.getElementById('trophy-sign');
                const content = document.getElementById('result-content');
                if (title) title.textContent = selectedLanguage === 'english' ? 'Your Results' : 'तुमचे निकाल';
                if (trophy) trophy.classList.remove('hidden');

                const scores = fullResult.detailedResult?.scores || {};
                const scoresDisplay = selectedStandard <= 8 ?
                    `<p><strong>Score:</strong> ${scores.score ?? 'N/A'}/${scores.totalQuestions ?? 'N/A'} (${scores.percentage ?? 'N/A'}%)</p>` :
                    `
                        <p><strong>Realistic:</strong> ${scores.realistic ?? 'N/A'}</p>
                        <p><strong>Investigative:</strong> ${scores.investigative ?? 'N/A'}</p>
                        <p><strong>Artistic:</strong> ${scores.artistic ?? 'N/A'}</p>
                        <p><strong>Social:</strong> ${scores.social ?? 'N/A'}</p>
                        <p><strong>Enterprising:</strong> ${scores.enterprising ?? 'N/A'}</p>
                        <p><strong>Conventional:</strong> ${scores.conventional ?? 'N/A'}</p>
                    `;

                if (content) {
                    content.innerHTML = `
                        <div class="result-details">
                            <p><strong>Date:</strong> ${fullResult.date}</p>
                            <p><strong>Student:</strong> ${fullResult['student-name']}</p>
                            <p><strong>Parent:</strong> ${fullResult['parent-name']}</p>
                            <p><strong>Mobile:</strong> ${fullResult.mobile}</p>
                            <p><strong>Email:</strong> ${fullResult.email}</p>
                            <p><strong>Grade:</strong> ${fullResult.grade}</p>
                            <p><strong>Board:</strong> ${fullResult.board}</p>
                            ${scoresDisplay}
                            <p><strong>Summary:</strong> ${fullResult.summary}</p>
                            <p><strong>Analysis:</strong> ${fullResult.detailedResult.analysis}</p>
                            <h4>Recommendations</h4>
                            <div class="recommendations-toggle" onclick="toggleRecommendations()">Click to Expand</div>
                            <ol class="recommendations-list" id="recommendations-list">
                                ${fullResult.detailedResult.recommendations.map(r => `<li>${r}</li>`).join('')}
                            </ol>
                        </div>
                    `;
                }
                updateBrandingThroughout();
            }, 2000);
        } catch (error) {
            console.error('Error submitting test:', error);
            showAlert('error', `Failed to submit test: ${error.message}`);
        }
    }

    // Toggle recommendations visibility
    function toggleRecommendations() {
        console.log('Toggling recommendations');
        const list = document.getElementById('recommendations-list');
        if (list) list.classList.toggle('active');
    }

    // Share results via WhatsApp
    function shareOnWhatsApp() {
        console.log('Sharing on WhatsApp');
        const resultContent = document.getElementById('result-content');
        if (resultContent?.textContent) {
            const branding = window.getClientBranding();
            const whatsappUrl = `https://wa.me/${branding.phone}?text=${encodeURIComponent(resultContent.textContent)}`;
            window.open(whatsappUrl, '_blank');
        } else {
            console.error('No results to share');
            showAlert('error', 'No results to share.');
        }
    }

    // Copy results to clipboard
    function copyResultCode() {
        console.log('Copying results');
        const resultContent = document.getElementById('result-content');
        if (resultContent?.textContent) {
            navigator.clipboard.writeText(resultContent.textContent).then(() => {
                showAlert('success', 'Result copied to clipboard.');
            }).catch(() => {
                console.error('Failed to copy result');
                showAlert('error', 'Failed to copy result.');
            });
        } else {
            console.error('No results to copy');
            showAlert('error', 'No results to copy.');
        }
    }

    // Download certificate as PDF
    function downloadCertificate() {
        console.log('Downloading certificate');
        const branding = window.getClientBranding();
        if (!window.jspdf || !window.jspdf.jsPDF) {
            console.error('jsPDF library not loaded');
            showAlert('error', 'Certificate generation library not loaded.');
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            doc.setLineWidth(2);
            doc.setDrawColor(218, 165, 32);
            doc.rect(8, 8, 281, 194, 'S');
            doc.setLineWidth(1);
            doc.setDrawColor(0, 86, 112);
            doc.rect(11, 11, 275, 188, 'S');

            doc.setFillColor(255, 111, 97);
            doc.triangle(100, 30, 197, 30, 148.5, 50, 'F');
            doc.setFontSize(12);
            doc.setTextColor(255, 255, 255);
            doc.text('Certified', 148.5, 40, { align: 'center' });

            doc.setFillColor(0, 86, 112);
            doc.rect(30, 15, 237, 25, 'F');
            doc.setFontSize(28);
            doc.setFont('times', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text('Psychometrica Pro Plus', 148.5, 25, { align: 'center' });
            doc.setFontSize(14);
            doc.text(`${branding.name}, ${branding.address}`, 148.5, 35, { align: 'center' });

            doc.setFontSize(20);
            doc.setTextColor(0, 0, 0);
            doc.text('Certificate of Completion', 148.5, 70, { align: 'center' });
            doc.setFontSize(14);
            doc.text('Awarded to', 148.5, 85, { align: 'center' });
            doc.setFontSize(30);
            doc.setFont('times', 'bolditalic');
            doc.setTextColor(0, 86, 112);
            doc.text(studentData['student-name'] || 'Student', 148.5, 100, { align: 'center' });
            doc.setFontSize(14);
            doc.setFont('times', 'normal');
            doc.setTextColor(0, 0, 0);

            const formattedGrade = selectedStandard ?
                (selectedStandard + (selectedLanguage === 'english' ? 'th' : 'वी')) :
                (studentData.grade?.replace(/[^0-9thवी]/g, '') || 'N/A');
            doc.text(`Standard: ${formattedGrade}`, 148.5, 115, { align: 'center' });
            doc.text(`Board: ${studentData.board || 'N/A'}`, 148.5, 125, { align: 'center' });
            doc.text('for completing the Psychometric Assessment', 148.5, 140, { align: 'center' });
            doc.text(`on ${allResults[allResults.length - 1]?.date || 'N/A'}`, 148.5, 150, { align: 'center' });

            doc.setLineWidth(0.5);
            doc.line(120, 175, 180, 175);
            doc.setFontSize(14);
            doc.setFont('times', 'italic');
            doc.setTextColor(0, 86, 112);
            doc.text(branding.name, 148.5, 165, { align: 'center' });
            doc.setFontSize(12);
            doc.text('Authorized Sign', 148.5, 180, { align: 'center' });

            doc.save(`Psychometrica_Certificate_${studentData['student-name'] || 'Student'}.pdf`);
        } catch (error) {
            console.error('Error generating certificate:', error);
            showAlert('error', 'Failed to generate certificate.');
        }
    }

    // Show admin dashboard with test results
    function showAdminDashboard() {
        console.log('Showing admin dashboard');
        const sections = [
            'login-section', 'standard-selection', 'language-selection',
            'info-section', 'instructions-section', 'test-section', 'results-section'
        ];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.classList.add('hidden');
        });

        const adminSection = document.getElementById('admin-section');
        if (adminSection) adminSection.classList.remove('hidden');
        const adminContent = document.getElementById('admin-content');
        if (adminContent) {
            adminContent.innerHTML = `
                <table id="results-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Student</th>
                            <th>Parent</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Grade</th>
                            <th>Board</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allResults.map(r => `
                            <tr>
                                <td>${r.date || 'N/A'}</td>
                                <td>${r['student-name'] || 'N/A'}</td>
                                <td>${r['parent-name'] || 'N/A'}</td>
                                <td>${r.mobile || 'N/A'}</td>
                                <td>${r.email || 'N/A'}</td>
                                <td>${r.grade || 'N/A'}</td>
                                <td>${r.board || 'N/A'}</td>
                                <td>${r.summary || 'N/A'}</td>
                            </tr>
                        `).join('') || '<tr><td colspan="8">No reports available</td></tr>'}
                    </tbody>
                </table>
            `;
        }
        updateBrandingThroughout();
    }

    // Clear all test results
    function clearReports() {
        console.log('Clearing reports');
        if (confirm('Are you sure you want to clear all reports? This action cannot be undone.')) {
            try {
                allResults = [];
                localStorage.removeItem(RESULTS_STORAGE_KEY);

                const adminContent = document.getElementById('admin-content');
                if (adminContent) {
                    adminContent.innerHTML = `
                        <table id="results-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Student</th>
                                    <th>Parent</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Grade</th>
                                    <th>Board</th>
                                    <th>Summary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="8">No reports available</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                }

                showAlert('success', 'All reports have been cleared successfully.');
            } catch (error) {
                console.error('Error clearing reports:', error);
                showAlert('error', 'Failed to clear reports. Please try again.');
            }
        }
    }

    // Export test results to CSV
    function exportAllToExcel() {
        console.log('Exporting to CSV');
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Date,Student,Parent,Mobile,Email,Age,Grade,Board,Summary\n';
        allResults.forEach(result => {
            const row = [
                result.date,
                result['student-name'],
                result['parent-name'],
                result.mobile,
                result.email,
                result.age,
                result.grade,
                result.board,
                result.summary
            ].map(field => `"${field ?? 'N/A'}"`).join(',');
            csvContent += row + '\n';
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Psychometrica_Results_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Initialize the app
    console.log('Initializing Psychometrica Pro Plus');
    loadResults();
});