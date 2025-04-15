function getRecommendations5to8(percentage) {
    if (percentage > 80) {
        return [
            "Your exceptional aptitude shows a strong foundation in core subjects like math, language, and reasoning.",
            "Participate in national-level competitions like the Math Olympiad or Science Olympiad to challenge yourself.",
            "Join advanced classes or workshops in subjects you excel in, such as coding or creative writing.",
            "Engage in group projects like building a science model or organizing a school play to enhance teamwork.",
            "Explore online platforms like Khan Academy for advanced lessons in math and science.",
            "Develop leadership skills by taking up roles like class monitor or team captain in school activities.",
            "Read books on problem-solving, such as 'The Art of Problem Solving' series, to sharpen your skills.",
            "Join a robotics club to combine creativity and logical thinking in a practical way.",
            "Practice public speaking by participating in debates or elocution competitions.",
            "Set a goal to learn a new skill, such as playing a musical instrument or a new sport.",
            "Work on time management by creating a daily schedule for studies, hobbies, and rest.",
            "Explore STEM kits to conduct experiments at home, like building a simple circuit or a solar model.",
            "Volunteer to mentor younger students in your school to reinforce your knowledge.",
            "Take up creative hobbies like painting, pottery, or writing short stories to balance academics.",
            "Join a library and read books on diverse topics, such as history, space, or technology.",
            "Participate in quizzes or trivia contests to improve your general knowledge.",
            "Learn basic coding through platforms like Code.org to prepare for future tech skills.",
            "Discuss your interests with teachers to explore advanced topics in your favorite subjects.",
            "Stay curious—ask questions about the world around you, from nature to gadgets.",
            "Keep up your excellent work and aim for consistent growth in all areas!"
        ];
    } else if (percentage > 60) {
        return [
            "You have a good aptitude in core subjects, with potential to become an excellent performer.",
            "Practice daily with math problems, such as solving 10 addition or subtraction questions.",
            "Join a study group to collaborate with peers and learn from each other’s strengths.",
            "Engage in creative activities like drawing, storytelling, or making crafts to boost imagination.",
            "Read short storybooks or science magazines like 'Tell Me Why' to make learning fun.",
            "Spend 15-20 minutes daily on brain teasers or puzzles to improve focus and problem-solving.",
            "Ask your teacher for extra worksheets in subjects you find challenging, like math or grammar.",
            "Participate in school events like sports day or annual day to build confidence.",
            "Try simple DIY projects at home, such as making a paper airplane or a birdhouse.",
            "Discuss your school day with your parents to identify areas where you need support.",
            "Create a study timetable to balance schoolwork, playtime, and rest effectively.",
            "Watch educational videos on platforms like YouTube to understand tough concepts visually.",
            "Set small, achievable goals, like improving your math score by 5% in the next test.",
            "Join a local library to access books on topics you’re curious about, like animals or space.",
            "Practice writing short essays or stories to improve your language skills.",
            "Explore apps like Duolingo to learn a new language in a fun way.",
            "Participate in group activities like a school play or science fair to improve teamwork.",
            "Celebrate your progress, no matter how small, to stay motivated.",
            "Stay positive—consistent effort will lead to steady improvement over time.",
            "Keep exploring new activities to discover what excites you the most!"
        ];
    } else {
        return [
            "You’re building a basic aptitude—great job starting your learning journey!",
            "Focus on practicing simple math, like counting or basic addition, for 10 minutes daily.",
            "Ask a friend, teacher, or parent to explain difficult topics in a simple, fun way.",
            "Try relaxing activities like coloring or drawing to spark your creativity.",
            "Read easy storybooks or comics, such as Amar Chitra Katha, to enjoy learning.",
            "Spend a few minutes each day solving simple puzzles, like matching shapes or numbers.",
            "Join group activities at school, like a drawing club, to feel more comfortable with peers.",
            "Watch fun learning videos, such as animated math lessons or science cartoons.",
            "Start with small projects, like planting a seed in a pot or making a paper craft.",
            "Share what you learned in school with your family to build confidence in speaking.",
            "Practice writing numbers or short sentences daily to improve slowly and steadily.",
            "Celebrate small achievements, like solving one more math problem correctly.",
            "Don’t hesitate to ask questions in class—every question helps you learn more!",
            "Find a topic you like, such as cars or animals, and read simple books about it.",
            "Play educational games like counting games or word puzzles to make learning fun.",
            "Join a buddy system at school to learn alongside a friend who can help you.",
            "Take your time to understand concepts—slow and steady progress is the best way.",
            "Explore nature by observing plants or insects in your garden to spark curiosity.",
            "Keep a small notebook to draw or write about things you enjoy learning.",
            "Keep trying—you’re on the right path to getting better every day!"
        ];
    }
}

function getRecommendations9to10(scores, suggestedStream) {
    const maxScore = Math.max(...Object.values(scores));
    return [
        `Based on your interests, ${suggestedStream} could be a great stream for your future studies.`,
        scores.realistic > 30 ? "Join practical workshops like robotics, carpentry, or electronics to explore hands-on skills." : "Start with basic hands-on projects like building a model car or a simple circuit.",
        scores.investigative > 30 ? "Participate in math or science clubs to deepen your analytical skills and prepare for competitive exams." : "Practice problem-solving with puzzles, science kits, or online math challenges.",
        scores.artistic > 30 ? "Engage in creative arts like painting, music, or drama to nurture your talents and express yourself." : "Try creative hobbies like sketching, writing short stories, or making rangoli designs.",
        scores.social > 30 ? "Volunteer in community events or school programs to enhance your interpersonal skills." : "Help classmates with their studies or join a peer support group to build social confidence.",
        scores.enterprising > 30 ? "Start a small project like organizing a school event or a charity drive to develop leadership skills." : "Practice leadership by taking initiative in group activities or class projects.",
        scores.conventional > 30 ? "Work on organizing tasks, such as managing a study schedule or a small budget, to improve planning skills." : "Practice keeping your study materials, books, and notes organized for better efficiency.",
        "Explore career options by attending career fairs or talking to professionals in your suggested stream.",
        "Join online forums or groups related to your stream to connect with like-minded peers.",
        "Read books or watch documentaries related to your stream, such as biographies of scientists for Science stream.",
        "Participate in school competitions like debates, quizzes, or art exhibitions to build confidence.",
        "Take up a hobby that aligns with your stream, like photography for Arts or coding for Science.",
        "Discuss your results with your parents and teachers to plan your next steps effectively.",
        "Set short-term goals, like improving your scores in specific subjects by the next exam.",
        "Explore online courses on platforms like Coursera or Udemy to gain a head start in your stream.",
        "Join a study group to prepare for board exams and share knowledge with peers.",
        "Practice time management by balancing studies, hobbies, and relaxation effectively.",
        "Attend workshops or seminars on career guidance to understand your stream’s future prospects.",
        "Keep a journal to track your progress and reflect on your strengths and areas to improve.",
        "Stay motivated by celebrating small achievements as you prepare for your academic journey."
    ];
}

function calculateResults(selectedStandard, selectedLanguage, userAnswers) {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const dateStr = `${day}-${month}-${year}`;

    let score, summary, detailedResult;

    if (selectedStandard <= 8) {
        const totalAptitude = window.questions5to8?.[selectedLanguage]?.filter(q => !q.type).length || 0;
        if (!window.questions5to8 || !window.questions5to8[selectedLanguage]) {
            throw new Error('Questions for Grades 5-8 not found.');
        }
        score = 0;
        window.questions5to8[selectedLanguage].forEach((q, i) => {
            if (q.correct && userAnswers[i] === q.correct) score++;
        });
        const percentage = totalAptitude > 0 ? (score / totalAptitude) * 100 : 0;
        summary = `${score}/${totalAptitude}`;
        if (selectedLanguage === 'english') {
            detailedResult = {
                scores: { score, totalQuestions: totalAptitude, percentage: percentage.toFixed(2) },
                analysis: `Performance indicates ${percentage > 80 ? "exceptional" : percentage > 60 ? "good" : "basic"} aptitude.`,
                recommendations: getRecommendations5to8(percentage)
            };
        } else {
            detailedResult = {
                scores: { score, totalQuestions: totalAptitude, percentage: percentage.toFixed(2) },
                analysis: `तुमची कामगिरी ${percentage > 80 ? "असाधारण" : percentage > 60 ? "चांगली" : "मूलभूत"} क्षमता दर्शवते.`,
                recommendations: percentage > 80 ? [
                    "तुमची असाधारण क्षमता गणित, भाषा आणि तर्क यासारख्या मुख्य विषयांमध्ये मजबूत पाया दर्शवते.",
                    "राष्ट्रीय स्तरावरील स्पर्धांमध्ये भाग घ्या, जसे की मॅथ्स ओलंपियाड किंवा सायन्स ओलंपियाड.",
                    "तुम्हाला आवडणाऱ्या विषयांमध्ये प्रगत वर्ग किंवा कार्यशाळांना सामील व्हा, जसे की कोडिंग किंवा सर्जनशील लेखन.",
                    "विज्ञान मॉडेल बनवणे किंवा शाळेचे नाटक आयोजित करणे यासारख्या गट प्रकल्पांमध्ये सहभागी व्हा.",
                    "खान अकादमीसारख्या ऑनलाइन प्लॅटफॉर्मवर गणित आणि विज्ञानाच्या प्रगत धड्यांचा अभ्यास करा.",
                    "वर्गप्रमुख किंवा संघाचा कर्णधार यासारख्या भूमिका घेऊन नेतृत्व कौशल्य विकसित करा.",
                    "समस्या सोडवण्यावरील पुस्तके वाचा, जसे की 'द आर्ट ऑफ प्रॉब्लेम सॉल्व्हिंग' मालिका.",
                    "रोबोटिक्स क्लबमध्ये सामील व्हा आणि सर्जनशीलता आणि तार्किक विचार एकत्र करा。",
                    "वादविवाद किंवा वक्तृत्व स्पर्धांमध्ये भाग घेऊन सार्वजनिक बोलण्याचा सराव करा。",
                    "नवीन कौशल्य शिकण्याचे ध्येय ठेवा, जसे की संगीत वाद्य वाजवणे किंवा नवीन खेळ。",
                    "अभ्यास, छंद आणि विश्रांतीसाठी दैनंदिन वेळापत्रक तयार करून वेळेचे व्यवस्थापन करा。",
                    "घरी STEM किट्स वापरून प्रयोग करा, जसे की साधे सर्किट बनवणे किंवा सौर मॉडेल तयार करणे。",
                    "शाळेत लहान मुलांना मार्गदर्शन करून तुमचे ज्ञान मजबूत करा。",
                    "चित्रकला, मातीची भांडी किंवा लघुकथा लेखन यासारखे सर्जनशील छंद जोपासा。",
                    "ग्रंथालयात सामील व्हा आणि इतिहास, अंतराळ किंवा तंत्रज्ञान यासारख्या विविध विषयांवर पुस्तके वाचा。",
                    "सामान्य ज्ञान सुधारण्यासाठी क्विझ किंवा ट्रिव्हिया स्पर्धांमध्ये भाग घ्या。",
                    "Code.org सारख्या प्लॅटफॉर्मवर मूलभूत कोडिंग शिका आणि भविष्यातील तंत्रज्ञान कौशल्ये तयार करा。",
                    "आवडत्या विषयांमध्ये प्रगत विषयांचा शोध घेण्यासाठी शिक्षकांशी चर्चा करा。",
                    "जिज्ञासू राहा—निसर्गापासून गॅजेट्सपर्यंत सर्व गोष्टींबद्दल प्रश्न विचारा。",
                    "तुमचे उत्कृष्ट कार्य सुरू ठेवा आणि सर्व क्षेत्रांमध्ये सातत्यपूर्ण वाढीचे ध्येय ठेवा!"
                ] : percentage > 60 ? [
                    "तुमच्याकडे मुख्य विषयांमध्ये चांगली क्षमता आहे, उत्कृष्ट कामगिरी करण्याची संभावना आहे。",
                    "दररोज गणिताचे प्रश्न सराव करा, जसे की १० बेरीज किंवा वजाबाकी प्रश्न सोडवणे。",
                    "अभ्यास गटात सामील व्हा आणि एकमेकांच्या सामर्थ्यांमधून शिका。",
                    "चित्रकला, कथाकथन किंवा हस्तकला यासारख्या सर्जनशील क्रियाकलापांमध्ये सहभागी व्हा。",
                    "‘टेल मी व्हाय’ सारखी लघुकथा किंवा विज्ञान मासिके वाचा आणि शिकणे मजेदार बनवा。",
                    "दररोज १५-२० मिनिटे बुद्धीला चालना देणारी कोडी किंवा पझल्स सोडवा。",
                    "गणित किंवा व्याकरणासारख्या कठीण विषयांमध्ये अतिरिक्त वर्कशीट्ससाठी शिक्षकांना विचारा।",
                    "क्रीडा दिन किंवा वार्षिक दिन यासारख्या शालेय कार्यक्रमांमध्ये भाग घ्या आणि आत्मविश्वास वाढवा।",
                    "घरी साधे DIY प्रकल्प करा, जसे की कागदी विमान किंवा पक्षीघर बनवणे।",
                    "शाळेतील तुमच्या दिवसाबद्दल पालकांशी चर्चा करा आणि जिथे मदतीची गरज आहे तिथे ओळखा।",
                    "अभ्यास, खेळ आणि विश्रांती यांचा समतोल राखण्यासाठी अभ्यास वेळापत्रक तयार करा।",
                    "YouTube सारख्या प्लॅटफॉर्मवर शैक्षणिक व्हिडिओ पाहून कठीण संकल्पना समजून घ्या。",
                    "पुढील चाचणीत गणिताचा स्कोअर ५% ने सुधारणे यासारखी छोटी, साध्य करण्यायोग्य ध्येये ठेवा।",
                    "स्थानिक ग्रंथालयात सामील व्हा आणि प्राणी किंवा अंतराळ यासारख्या विषयांवर पुस्तके वाचा।",
                    "भाषा कौशल्ये सुधारण्यासाठी लहान निबंध किंवा कथा लिहिण्याचा सराव करा।",
                    "Duolingo सारख्या अॅप्सवर नवीन भाषा मजेदार पद्धतीने शिका।",
                    "शालेय नाटक किंवा विज्ञान मेळाव्यासारख्या गट क्रियाकलापांमध्ये भाग घ्या।",
                    "प्रगती कितीही लहान असली तरी साजरी करा आणि प्रेरित राहा।",
                    "सातत्यपूर्ण प्रयत्नांमुळे हळूहळू सुधारणा होईल, सकारात्मक राहा।",
                    "तुम्हाला सर्वात जास्त काय आवडते हे शोधण्यासाठी नवीन क्रियाकलापांचा शोध घेत राहा!"
                ] : [
                    "तुम्ही मूलभूत क्षमता विकसित करत आहात—शिकण्याचा प्रवास सुरू केल्याबद्दल अभिनंदन!",
                    "दररोज १० मिनिटे साधे गणित सराव करा, जसे की मोजणी किंवा मूलभूत बेरीज。",
                    "मित्र, शिक्षक किंवा पालकांना कठीण विषय साध्या, मजेदार पद्धतीने समजावून सांगायला सांगा।",
                    "रंग भरणे किंवा चित्रकला यासारख्या आरामदायक क्रियाकलाप करून सर्जनशीलता वाढवा।",
                    "अमर चित्र कथा यासारखी साधी कथापुस्तके किंवा कॉमिक्स वाचा आणि शिकणे आनंददायक बनवा।",
                    "दररोज काही मिनिटे साधी कोडी सोडवा, जसे की आकार जुळवणे किंवा संख्या जुळवणे।",
                    "शाळेत चित्रकला क्लबसारख्या गट क्रियाकलापांमध्ये सामील व्हा आणि मित्रांसोबत आरामदायक व्हा।",
                    "अॅनिमेटेड गणित धडे किंवा विज्ञान कार्टूनसारखे मजेदार शैक्षणिक व्हिडिओ पाहा।",
                    "कुंडीत बी पेरणे किंवा कागदी हस्तकला बनवणे यासारखे छोटे प्रकल्प सुरू करा।",
                    "शाळेत काय शिकलात ते कुटुंबासोबत शेअर करा आणि बोलण्याचा आत्मविश्वास वाढवा।",
                    "दररोज संख्या किंवा लहान वाक्ये लिहिण्याचा सराव करा आणि हळूहळू सुधारणा करा।",
                    "एक गणिताचा प्रश्न बरोबर सोडवणे यासारखे छोटे यश साजरे करा।",
                    "वर्गात प्रश्न विचारण्यास संकोच करू नका—प्रत्येक प्रश्न तुम्हाला अधिक शिकण्यास मदत करतो!",
                    "गाड्या किंवा प्राणी यासारखा तुम्हाला आवडणारा विषय शोधा आणि त्याबद्दल साधी पुस्तके वाचा।",
                    "मोजणी खेळ किंवा शब्द कोडी यासारखे शैक्षणिक खेळ खेळा आणि शिकणे मजेदार बनवा।",
                    "शाळेत बडी सिस्टममध्ये सामील व्हा आणि तुम्हाला मदत करू शकेल अशा मित्रासोबत शिका।",
                    "संकल्पना समजून घेण्यासाठी वेळ घ्या—हळू आणि स्थिर प्रगती ही सर्वोत्तम आहे।",
                    "बागेत झाडे किंवा कीटकांचे निरीक्षण करून निसर्गाचा शोध घ्या आणि जिज्ञासा वाढवा।",
                    "तुम्हाला शिकायला आवडणाऱ्या गोष्टींबद्दल चित्र काढण्यासाठी किंवा लिहिण्यासाठी एक छोटी नोटबुक ठेवा।",
                    "प्रयत्न करत राहा—तुम्ही दररोज चांगले होण्याच्या योग्य मार्गावर आहात!"
                ]
            };
        }
    } else {
        let realistic = 0, investigative = 0, artistic = 0, social = 0, enterprising = 0, conventional = 0;
        if (!window.questions9to10 || !window.questions9to10[selectedLanguage]) {
            throw new Error('Questions for Grades 9-10 not found.');
        }
        window.questions9to10[selectedLanguage].forEach((q, i) => {
            const answer = userAnswers[i];
            if (!answer) return; // Skip if answer is undefined
            const points = answer === "Like" || answer === "आवडते" ? 5 : answer === "Neutral" || answer === "ठीक आहे" ? 3 : 1;
            if (i < 7) realistic += points;
            else if (i < 14) investigative += points;
            else if (i < 21) artistic += points;
            else if (i < 28) social += points;
            else if (i < 35) enterprising += points;
            else conventional += points;
        });
        score = Math.max(realistic, investigative, artistic, social, enterprising, conventional);
        summary = `Top Score: ${score}`;
        const suggestedStream = realistic > investigative && realistic > artistic ? (selectedLanguage === 'english' ? 'Science' : 'विज्ञान') : 
                              investigative > artistic ? (selectedLanguage === 'english' ? 'Commerce' : 'वाणिज्य') : (selectedLanguage === 'english' ? 'Arts' : 'कला');
        const scores = { realistic, investigative, artistic, social, enterprising, conventional };
        if (selectedLanguage === 'english') {
            detailedResult = {
                scores,
                analysis: `Suggested Stream: ${suggestedStream}`,
                recommendations: getRecommendations9to10(scores, suggestedStream)
            };
        } else {
            detailedResult = {
                scores,
                analysis: `सुचवलेली शाखा: ${suggestedStream}`,
                recommendations: [
                    `तुमच्या आवडींनुसार, ${suggestedStream} ही तुमच्या भविष्यातील अभ्यासासाठी उत्तम शाखा असू शकते.`,
                    scores.realistic > 30 ? "रोबोटिक्स, सुतारकाम किंवा इलेक्ट्रॉनिक्ससारख्या प्रायोगिक कार्यशाळांमध्ये सामील व्हा." : "मॉडेल कार किंवा साधे सर्किट बनवणे यासारखे मूलभूत हाताने बनवलेले प्रकल्प सुरू करा.",
                    scores.investigative > 30 ? "गणित किंवा विज्ञान क्लबमध्ये सामील व्हा आणि स्पर्धात्मक परीक्षांसाठी तयारी करा." : "पझल्स, विज्ञान किट्स किंवा ऑनलाइन गणित आव्हानांसह समस्या सोडवण्याचा सराव करा.",
                    scores.artistic > 30 ? "चित्रकला, संगीत किंवा नाटक यासारख्या सर्जनशील कलांमध्ये सहभागी व्हा आणि स्वतःला व्यक्त करा." : "रेखाटन, लघुकथा लेखन किंवा रांगोळी डिझाइन्स बनवणे यासारखे सर्जनशील छंद वापरून पहा.",
                    scores.social > 30 ? "समुदाय कार्यक्रम किंवा शालेय कार्यक्रमांमध्ये स्वयंसेवक म्हणून सहभागी व्हा आणि परस्परसंवाद कौशल्ये वाढवा." : "वर्गमित्रांना अभ्यासात मदत करा किंवा सहकारी समर्थन गटात सामील व्हा.",
                    scores.enterprising > 30 ? "शालेय कार्यक्रम किंवा चॅरिटी ड्राइव्ह आयोजित करणे यासारखे छोटे प्रकल्प सुरू करा आणि नेतृत्व कौशल्ये विकसित करा." : "गट क्रियाकलाप किंवा वर्ग प्रकल्पांमध्ये पुढाकार घेऊन नेतृत्वाचा सराव करा.",
                    scores.conventional > 30 ? "अभ्यास वेळापत्रक किंवा छोटे बजेट व्यवस्थापित करणे यासारख्या आयोजन कार्यांवर काम करा." : "अभ्यास साहित्य, पुस्तके आणि नोट्स व्यवस्थित ठेवण्याचा सराव करा.",
                    "करिअर मेळाव्यांना भेट देऊन किंवा तुमच्या सुचवलेल्या शाखेतील व्यावसायिकांशी बोलून करिअर पर्यायांचा शोध घ्या.",
                    "तुमच्या शाखेशी संबंधित ऑनलाइन मंच किंवा गटांमध्ये सामील व्हा आणि समविचारी मित्रांशी संपर्क साधा.",
                    "तुमच्या शाखेशी संबंधित पुस्तके वाचा किंवा माहितीपट पाहा, जसे की विज्ञान शाखेसाठी शास्त्रज्ञांच्या चरित्र.",
                    "आत्मविश्वास वाढवण्यासाठी वादविवाद, क्विझ किंवा कला प्रदर्शन यासारख्या शालेय स्पर्धांमध्ये भाग घ्या.",
                    "तुमच्या शाखेशी संरेखित असलेला छंद घ्या, जसे की कलेसाठी छायाचित्रण किंवा विज्ञानासाठी कोडिंग.",
                    "पुढील पायऱ्या प्रभावीपणे नियोजित करण्यासाठी तुमचे निकाल पालक आणि शिक्षकांशी चर्चा करा.",
                    "पुढील परीक्षेपर्यंत विशिष्ट विषयांमध्ये तुमचे गुण सुधारणे यासारखी अल्पकालीन ध्येये ठेवा।",
                    "Coursera किंवा Udemy सारख्या प्लॅटफॉर्मवर ऑनलाइन कोर्सेस करून तुमच्या शाखेत आघाडी घ्या.",
                    "बोर्ड परीक्षांसाठी तयारी करण्यासाठी आणि मित्रांसह ज्ञान सामायिक करण्यासाठी अभ्यास गटात सामील व्हा.",
                    "अभ्यास, छंद आणि विश्रांती यांचा समतोल राखून वेळेचे व्यवस्थापन सराव करा।",
                    "तुमच्या शाखेच्या भविष्यातील संभावनांबद्दल समजून घेण्यासाठी करिअर मार्गदर्शन कार्यशाळा किंवा सेमिनारांना उपस्थित राहा।",
                    "तुमची प्रगती ट्रॅक करण्यासाठी आणि तुमच्या सामर्थ्यांचा आणि सुधारणेच्या क्षेत्रांचा विचार करण्यासाठी जर्नल ठेवा।",
                    "तुमच्या शैक्षणिक प्रवासाची तयारी करताना छोटे यश साजरे करून प्रेरित राहा।"
                ]
            };
        }
    }

    return { date: dateStr, summary, detailedResult };
}

window.calculateResults = calculateResults;