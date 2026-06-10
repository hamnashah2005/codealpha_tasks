document.addEventListener('DOMContentLoaded', () => {
    
    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-links li');
    const slides = document.querySelectorAll('.slide');
    const nextBtns = document.querySelectorAll('.next-btn');

    function goToSlide(targetId) {
        // Update nav active state
        navItems.forEach(item => {
            if(item.dataset.target === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update slide active state
        slides.forEach(slide => {
            if(slide.id === targetId) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    // Nav click handlers
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            goToSlide(item.dataset.target);
        });
    });

    // Next button handlers
    nextBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const nextSlideId = slides[index + 1].id;
            goToSlide(nextSlideId);
        });
    });

    // Quiz Logic
    const questions = [
        {
            question: "You receive an email from 'security@paypa1.com' asking you to reset your password. What should you do?",
            options: [
                "Click the link and reset immediately.",
                "Reply to the email asking if it's real.",
                "Ignore it and manually go to paypal.com to check your account.",
                "Forward it to all your friends to warn them."
            ],
            answer: 2,
            explanation: "Always go to the official website manually. The sender domain 'paypa1.com' uses a number '1' instead of an 'l', which is a common trick."
        },
        {
            question: "Which of the following is a common sign of a phishing email?",
            options: [
                "A personalized greeting with your full name.",
                "A sense of urgency threatening account suspension.",
                "An email from a known colleague during work hours.",
                "A digital signature attached to the email."
            ],
            answer: 1,
            explanation: "Phishers often create a false sense of urgency to panic you into acting quickly without thinking."
        },
        {
            question: "What is the best way to inspect a link in an email without clicking it?",
            options: [
                "Copy and paste it into a Word document.",
                "Hover your mouse cursor over the link to preview the URL.",
                "Click it but close the tab quickly.",
                "It's impossible to inspect it without clicking."
            ],
            answer: 1,
            explanation: "Hovering over a hyperlink will usually display the actual destination URL in the bottom corner of your browser or email client."
        }
    ];

    let currentQuestionIndex = 0;

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackMsg = document.getElementById('feedback');
    const nextQBtn = document.getElementById('next-question-btn');

    function loadQuestion() {
        const q = questions[currentQuestionIndex];
        questionText.textContent = q.question;
        optionsContainer.innerHTML = '';
        feedbackMsg.className = 'feedback-msg hidden';
        nextQBtn.classList.add('hidden');

        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => selectAnswer(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function selectAnswer(selectedIndex, btnElement) {
        // Disable all buttons
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(btn => btn.style.pointerEvents = 'none');

        const q = questions[currentQuestionIndex];
        
        feedbackMsg.classList.remove('hidden');

        if (selectedIndex === q.answer) {
            btnElement.classList.add('correct');
            feedbackMsg.classList.add('success');
            feedbackMsg.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
        } else {
            btnElement.classList.add('wrong');
            allBtns[q.answer].classList.add('correct'); // Highlight correct answer
            feedbackMsg.classList.add('error');
            feedbackMsg.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
        }

        // Show next button or finish
        if (currentQuestionIndex < questions.length - 1) {
            nextQBtn.textContent = 'Next Question';
            nextQBtn.classList.remove('hidden');
        } else {
            nextQBtn.textContent = 'Restart Course';
            nextQBtn.classList.remove('hidden');
        }
    }

    nextQBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            // Restart
            currentQuestionIndex = 0;
            goToSlide('intro');
            loadQuestion();
        }
    });

    // Initialize first question
    loadQuestion();
});
