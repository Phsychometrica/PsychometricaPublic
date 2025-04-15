// questions.js
const questions5to8 = {
    english: [
        { text: "1. What is 15 + 27?", options: ["40", "42", "45", "47"], correct: "42" },
        { text: "2. If you have 10 apples and give away 3, how many will you have left?", options: ["6", "7", "8", "9"], correct: "7" },
        { text: "3. What is the next number in this sequence: 2, 4, 6, 8, ___?", options: ["9", "10", "12", "14"], correct: "10" },
        { text: "4. If 5 mangoes cost Rs. 20, what is the cost of 10 mangoes?", options: ["Rs. 30", "Rs. 40", "Rs. 50", "Rs. 60"], correct: "Rs. 40" },
        { text: "5. What is 12 divided by 3?", options: ["3", "4", "5", "6"], correct: "4" },
        { text: "6. If you buy a pen for Rs. 8 and a notebook for Rs. 12, how much do you spend?", options: ["Rs. 18", "Rs. 20", "Rs. 22", "Rs. 24"], correct: "Rs. 20" },
        { text: "7. What is the missing number: 3, 6, 9, ___, 15?", options: ["10", "11", "12", "13"], correct: "12" },
        { text: "8. If 4 friends each bring 2 chocolates, how many chocolates are there?", options: ["6", "8", "10", "12"], correct: "8" },
        { text: "9. What is 7 multiplied by 8?", options: ["54", "56", "58", "60"], correct: "56" },
        { text: "10. If a train departs at 9:00 AM and takes 2 hours, when does it arrive?", options: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"], correct: "11:00 AM" },
        { text: "11. How are a cat and a dog similar?", options: ["Both are birds", "Both are animals", "Both can fly", "Both live in water"], correct: "Both are animals" },
        { text: "12. What is the opposite of 'happy'?", options: ["Sad", "Angry", "Excited", "Tired"], correct: "Sad" },
        { text: "13. Which word doesn’t belong: Apple, Banana, Carrot, Mango?", options: ["Apple", "Banana", "Carrot", "Mango"], correct: "Carrot" },
        { text: "14. If 'big' is the opposite of 'small,' what’s the opposite of 'hot'?", options: ["Cold", "Warm", "Cool", "Freezing"], correct: "Cold" },
        { text: "15. What comes next: A, B, C, D, ___?", options: ["E", "F", "G", "H"], correct: "E" },
        { text: "16. What is half of 20?", options: ["5", "10", "15", "20"], correct: "10" },
        { text: "17. If a rectangle has length 5 cm and width 3 cm, what’s its area?", options: ["8 cm²", "10 cm²", "15 cm²", "20 cm²"], correct: "15 cm²" },
        { text: "18. What is 25% of 100?", options: ["20", "25", "30", "35"], correct: "25" },
        { text: "19. If you have 12 candies and divide them among 4 friends, how many each?", options: ["2", "3", "4", "5"], correct: "3" },
        { text: "20. What’s the next number: 5, 10, 15, 20, ___?", options: ["25", "30", "35", "40"], correct: "25" },
        { text: "21. What comes next: Circle, Square, Circle, Square, ___?", options: ["Triangle", "Circle", "Square", "Rectangle"], correct: "Circle" },
        { text: "22. If you fold a paper in half twice, how many sections?", options: ["2", "3", "4", "5"], correct: "4" },
        { text: "23. Which shape doesn’t belong: Circle, Square, Triangle, Rectangle?", options: ["Circle", "Square", "Triangle", "Rectangle"], correct: "Circle" },
        { text: "24. How many sides does a hexagon have?", options: ["4", "5", "6", "7"], correct: "6" },
        { text: "25. What’s the perimeter of a square with a 4 cm side?", options: ["12 cm", "16 cm", "20 cm", "24 cm"], correct: "16 cm" },
        { text: "26. Do you like working with others on a project?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "27. Do you feel excited to finish a tough task?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "28. Do you enjoy reading books in your free time?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "29. Are you comfortable speaking in front of your class?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "30. Do you prefer being alone over group time?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "31. Do you like helping others when they need it?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "32. Do you enjoy solving puzzles or brain teasers?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "33. Are you good at remembering names and faces?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "34. Do you like trying new foods or activities?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "35. Do you feel nervous before a test?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "36. Do you like drawing or coloring?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "37. Are you interested in space and stars?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "38. Do you like playing games like cricket?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "39. Do you enjoy coding or using computers?", options: ["Yes", "No", "Maybe"], type: "personality" },
        { text: "40. Are you curious about how gadgets work?", options: ["Yes", "No", "Maybe"], type: "personality" }
    ],
    marathi: [
        { text: "१. १५ + २७ किती होतात?", options: ["४०", "४२", "४५", "४७"], correct: "४२" },
        { text: "२. जर तुमच्याकडे १० सफरचंद असतील आणि ३ देऊन टाकले, तर किती राहतील?", options: ["६", "७", "८", "९"], correct: "७" },
        { text: "३. या क्रमात पुढील संख्या: २, ४, ६, ८, ___?", options: ["९", "१०", "१२", "१४"], correct: "१०" },
        { text: "४. जर ५ आंबे रु. २० चे असतील, तर १० आंब्यांची किंमत?", options: ["रु. ३०", "रु. ४०", "रु. ५०", "रु. ६०"], correct: "रु. ४०" },
        { text: "५. १२ ला ३ ने भागले किती?", options: ["३", "४", "५", "६"], correct: "४" },
        { text: "६. रु. ८ मध्ये पेन आणि रु. १२ मध्ये वही, एकूण खर्च?", options: ["रु. १८", "रु. २०", "रु. २२", "रु. २४"], correct: "रु. २०" },
        { text: "७. हरवलेली संख्या: ३, ६, ९, ___, १५?", options: ["१०", "११", "१२", "१३"], correct: "१२" },
        { text: "८. ४ मित्र प्रत्येकी २ चॉकलेट आणले, तर एकूण किती?", options: ["६", "८", "१०", "१२"], correct: "८" },
        { text: "९. ७ गुणिले ८ किती?", options: ["५४", "५६", "५८", "६०"], correct: "५६" },
        { text: "१०. रेल्वे सकाळी ९:०० वाजता निघते आणि २ तास घेते, तर कधी पोहचेल?", options: ["१०:००", "११:००", "१२:००", "१:००"], correct: "११:००" },
        { text: "११. मांजर आणि कुत्रा यांच्यात कशी समानता?", options: ["दोन्ही पक्षी", "दोन्ही प्राणी", "दोन्ही उडतात", "दोन्ही पाण्यात राहतात"], correct: "दोन्ही प्राणी" },
        { text: "१२. 'आनंदी' चा विरुद्ध शब्द?", options: ["दुःखी", "रागीट", "उत्साहित", "थकलेला"], correct: "दुःखी" },
        { text: "१३. कोणता शब्द बसत नाही: सफरचंद, केळे, गाजर, आंबा?", options: ["सफरचंद", "केळे", "गाजर", "आंबा"], correct: "गाजर" },
        { text: "१४. 'मोठा' चा विरुद्ध 'लहान,' तर 'गरम' चा विरुद्ध?", options: ["थंड", "कोमट", "गार", "हिमशीत"], correct: "थंड" },
        { text: "१५. पुढे काय: A, B, C, D, ___?", options: ["E", "F", "G", "H"], correct: "E" },
        { text: "१६. २० चा अर्धा किती?", options: ["५", "१०", "१५", "२०"], correct: "१०" },
        { text: "१७. आयताची लांबी ५ सेमी, रुंदी ३ सेमी, क्षेत्रफळ?", options: ["८ सेमी²", "१० सेमी²", "१५ सेमी²", "२० सेमी²"], correct: "१५ सेमी²" },
        { text: "१८. १०० चे २५% किती?", options: ["२०", "२५", "३०", "३५"], correct: "२५" },
        { text: "१९. १२ कॅन्डी ४ मित्रांत वाटल्या, प्रत्येकाला किती?", options: ["२", "३", "४", "५"], correct: "३" },
        { text: "२०. पुढील संख्या: ५, १०, १५, २०, ___?", options: ["२५", "३०", "३५", "४०"], correct: "२५" },
        { text: "२१. पुढे काय: वर्तुळ, चौरस, वर्तुळ, चौरस, ___?", options: ["त्रिकोण", "वर्तुळ", "चौरस", "आयत"], correct: "वर्तुळ" },
        { text: "२२. कागद दोनदा अर्धा घडी केला, तर किती विभाग?", options: ["२", "३", "४", "५"], correct: "४" },
        { text: "२३. कोणती आकृती बसत नाही: वर्तुळ, चौरस, त्रिकोण, आयत?", options: ["वर्तुळ", "चौरस", "त्रिकोण", "आयत"], correct: "वर्तुळ" },
        { text: "२४. षटकोनाला किती बाजू?", options: ["४", "५", "६", "७"], correct: "६" },
        { text: "२५. ४ सेमी बाजूच्या चौरसाची परिमिती?", options: ["१२ सेमी", "१६ सेमी", "२० सेमी", "२४ सेमी"], correct: "१६ सेमी" },
        { text: "२६. तुम्हाला इतरांसोबत काम करायला आवडते का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "२७. अवघड काम पूर्ण करण्याची उत्सुकता वाटते का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "२८. मोकळ्या वेळेत पुस्तके वाचायला आवडतात का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "२९. वर्गासमोर बोलताना आरामदायक वाटते का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३०. गटात वेळ घालवण्यापेक्षा एकटे राहणे आवडते का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३१. इतरांना मदत करायला आवडते का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३२. कोडी सोडवायला आवडतात का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३३. नावे आणि चेहरे लक्षात ठेवण्यात चांगले आहात का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३४. नवीन पदार्थ किंवा क्रियाकलाप करायला आवडतात का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३५. चाचणीपूर्वी घाबरल्यासारखे वाटते का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३६. चित्र काढणे किंवा रंगवणे आवडते का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३७. अवकाश आणि तारे शिकण्यात रस आहे का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३८. क्रिकेटसारखे खेळ खेळायला आवडतात का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "३९. कोडिंग किंवा संगणक वापरायला आवडते का?", options: ["होय", "नाही", "कदाचित"], type: "personality" },
        { text: "४०. गॅजेट्स कसे काम करतात हे जाणून घ्यायची उत्सुकता आहे का?", options: ["होय", "नाही", "कदाचित"], type: "personality" }
    ]
};

const questions9to10 = {
    english: [
        { text: "1. I like working outdoors, like helping on a farm or garden.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "2. I enjoy fixing things, like a bicycle or a toy.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "3. I don’t mind getting dirty while doing fun projects.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "4. I like making small things, like models of houses or cars.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "5. I enjoy outdoor games more than sitting inside.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "6. I like helping with building or repair work at home.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "7. I enjoy learning how machines, like tractors, work.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "8. I enjoy learning about computers or technology.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "9. I like solving math problems or riddles.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "10. I’m curious about how solar energy works.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "11. I enjoy finding out how cars or phones work.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "12. I like doing science experiments in school.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "13. I enjoy reading about space or new inventions.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "14. I like tasks that make me think hard and solve problems.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "15. I enjoy acting in school plays or skits.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "16. I like drawing or painting pictures.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "17. I feel happy writing stories or poems.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "18. I enjoy making decorations for festivals like Diwali.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "19. I like doing things where I can show my own ideas.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "20. I enjoy playing music, like a guitar or tabla.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "21. I feel excited to create art, like rangoli or crafts.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "22. I enjoy teaching my friends or younger kids.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "23. I like helping others with their homework or problems.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "24. I feel good helping at school or community events.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "25. I enjoy talking to people and listening to them.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "26. I like guiding or helping younger students.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "27. I enjoy planning fun activities for my friends.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "28. I feel happy working with others to fix problems.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "29. I like being the leader in school games or projects.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "30. I feel okay speaking in front of my class or friends.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "31. I enjoy telling my friends about new ideas.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "32. I like selling food or crafts to my friends.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "33. I enjoy starting a small club or project in school.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "34. I enjoy planning how to spend money for fun events.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "35. I like learning how people buy and sell things.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "36. I like keeping my things organized.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "37. I enjoy planning things for school or home.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "38. I like arranging books or papers neatly.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "39. I enjoy deciding how to spend money for a trip or gift.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "40. I feel good following rules to finish my work.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "41. I enjoy learning how money works.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" },
        { text: "42. I like keeping track of money or lists.", options: ["Like", "Neutral", "Dislike"], type: "like-neutral-dislike" }
    ],
    marathi: [
        { text: "१. मला शेतात किंवा बागेत काम करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२. मला सायकल किंवा खेळणी दुरुस्त करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३. मला काम करताना हात घाण झाले तरी चालते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "४. मला छोटी मॉडेल्स बनवायला आवडतात, जसे घर किंवा गाडी.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "५. मला घरात बसण्यापेक्षा बाहेर खेळायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "६. मला घरात बांधकामात मदत करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "७. मला ट्रॅक्टरसारखी यंत्रे कशी चालतात हे शिकायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "८. मला कॉम्प्युटर किंवा तंत्रज्ञान शिकायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "९. मला गणिताचे प्रश्न किंवा कोडी सोडवायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "१०. मला सूर्याची ऊर्जा कशी चालते हे जाणून घ्यायला उत्सुकता आहे.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "११. मला गाड्या किंवा फोन कसे चालतात हे शोधायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "१२. मला शाळेत विज्ञानाचे प्रयोग करायला आवडतात.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "१३. मला अंतराळ किंवा नवीन शोधांबद्दल वाचायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "१४. मला कठीण विचार करायला लावणारी कामे आवडतात.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "१५. मला शाळेच्या नाटकात अभिनय करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "१६. मला चित्र काढायला किंवा रंगवायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "१७. मला गोष्टी किंवा कविता लिहायला मजा येते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "१८. मला दिवाळीसाठी सजावट करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "१९. मला माझ्या कल्पना दाखवणारी कामे आवडतात.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२०. मला गिटार किंवा तबला वाजवायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२१. मला रांगोळी किंवा हस्तकला बनवायला मजा येते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२२. मला मित्रांना किंवा लहान मुलांना शिकवायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२३. मला इतरांना अभ्यासात मदत करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२४. मला शाळेत कार्यक्रमात मदत करताना छान वाटते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२५. मला लोकांशी बोलून त्यांचे विचार समजायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२६. मला लहान मुलांना मार्गदर्शन करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२७. मला मित्रांसाठी मजेदार गोष्टी आयोजित करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२८. मला इतरांसोबत अडचणी सोडवताना आनंद होतो.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "२९. मला शाळेच्या खेळात पुढाकार घ्यायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३०. मला वर्गासमोर बोलायला बरे वाटते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३१. मला मित्रांना नवीन कल्पना सांगायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३२. मला खाद्यपदार्थ किंवा हस्तकला विकायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३३. मला शाळेत छोटा गट सुरू करायला मजा येते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३४. मला मजेदार कार्यक्रमांसाठी पैसे खर्चाची योजना करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३५. मला लोक कसे खरेदी-विक्री करतात हे समजायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३६. मला माझ्या गोष्टी नीट ठेवायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३७. मला शाळेच्या कामांसाठी योजना करायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३८. मला पुस्तके किंवा कागद नीट लावायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "३९. मला सहलीसाठी पैसे कसे खर्च करायचे हे ठरवायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "४०. मला नियम पाळून काम पूर्ण करताना छान वाटते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "४१. मला पैशाचा व्यवहार कसे चालतात हे शिकायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" },
        { text: "४२. मला पैसे किंवा यादी ठेवायला आवडते.", options: ["आवडते", "ठीक आहे", "आवडत नाही"], type: "like-neutral-dislike" }
    ]
};

function validateQuestions(questions, language, expectedAptitudeCount, totalCount) {
    questions[language].forEach((q, index) => {
        if (index < expectedAptitudeCount) {
            if (!q.correct) {
                console.error(`Question ${index + 1} in ${language} (aptitude) is missing 'correct' property:`, q);
            }
        } else {
            if (!q.type) {
                console.error(`Question ${index + 1} in ${language} (personality/interest) is missing 'type' property:`, q);
            }
        }
    });
    if (questions[language].length !== totalCount) {
        console.error(`Expected ${totalCount} questions in ${language}, but found ${questions[language].length}`);
    }
}

validateQuestions(questions5to8, 'english', 25, 40);
validateQuestions(questions5to8, 'marathi', 25, 40);
validateQuestions(questions9to10, 'english', 0, 42);
validateQuestions(questions9to10, 'marathi', 0, 42);

window.questions5to8 = questions5to8;
window.questions9to10 = questions9to10;