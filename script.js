class MathPracticeApp {
    constructor() {
        this.currentSection = '';
        this.currentSubsection = '';
        this.problems = [];
        this.currentProblemIndex = 0;
        this.totalProblems = 10;
        this.correctAnswers = 0;
        this.currentAnswer = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showMainMenu();
    }

    setupEventListeners() {
        // Main menu section cards
        document.querySelectorAll('.section-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSubsectionMenu(section);
            });
        });

        // Subsection cards
        document.querySelectorAll('.subsection-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.startPractice(type);
            });
        });

        // Enter key for answer input
        document.getElementById('answerInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });

        // Auto-focus on answer input when it becomes visible
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('problem-container') && 
                    !mutation.target.classList.contains('hidden')) {
                    setTimeout(() => {
                        document.getElementById('answerInput').focus();
                    }, 100);
                }
            });
        });
        observer.observe(document.getElementById('problemContainer'), {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    showMainMenu() {
        document.getElementById('mainMenu').classList.remove('hidden');
        document.getElementById('additionMenu').classList.add('hidden');
        document.getElementById('subtractionMenu').classList.add('hidden');
        document.getElementById('estimationMenu').classList.add('hidden');
        document.getElementById('problemContainer').classList.add('hidden');
    }

    showSubsectionMenu(section) {
        this.currentSection = section;
        document.getElementById('mainMenu').classList.add('hidden');
        
        // Hide all menus first
        document.getElementById('additionMenu').classList.add('hidden');
        document.getElementById('subtractionMenu').classList.add('hidden');
        document.getElementById('estimationMenu').classList.add('hidden');
        
        // Show the appropriate menu
        if (section === 'addition') {
            document.getElementById('additionMenu').classList.remove('hidden');
        } else if (section === 'subtraction') {
            document.getElementById('subtractionMenu').classList.remove('hidden');
        } else if (section === 'estimation') {
            document.getElementById('estimationMenu').classList.remove('hidden');
        }
        
        document.getElementById('problemContainer').classList.add('hidden');
    }

    startPractice(subsectionType) {
        this.currentSubsection = subsectionType;
        this.currentProblemIndex = 0;
        this.correctAnswers = 0;
        this.problems = this.generateProblems(subsectionType);
        
        // Hide menus and show problem container
        document.getElementById('additionMenu').classList.add('hidden');
        document.getElementById('subtractionMenu').classList.add('hidden');
        document.getElementById('estimationMenu').classList.add('hidden');
        document.getElementById('problemContainer').classList.remove('hidden');
        
        // Reset UI
        document.getElementById('currentProblem').textContent = '1';
        document.getElementById('totalProblems').textContent = this.totalProblems;
        document.getElementById('progressFill').style.width = '0%';
        
        this.displayCurrentProblem();
    }

    generateProblems(type) {
        const problems = [];
        
        for (let i = 0; i < this.totalProblems; i++) {
            switch (type) {
                case 'mental-addition':
                    problems.push(this.generateMentalAddition());
                    break;
                case '2-digit-addition':
                    problems.push(this.generate2DigitAddition());
                    break;
                case '3-digit-addition':
                    problems.push(this.generate3DigitAddition());
                    break;
                case '4-digit-addition':
                    problems.push(this.generate4DigitAddition());
                    break;
                case 'missing-addend':
                    problems.push(this.generateMissingAddend());
                    break;
                case 'word-problems-add':
                    problems.push(this.generateWordProblemAdd());
                    break;
                case 'mental-subtraction':
                    problems.push(this.generateMentalSubtraction());
                    break;
                case '2-digit-subtraction':
                    problems.push(this.generate2DigitSubtraction());
                    break;
                case '3-digit-subtraction':
                    problems.push(this.generate3DigitSubtraction());
                    break;
                case '4-digit-subtraction':
                    problems.push(this.generate4DigitSubtraction());
                    break;
                case 'missing-minuend':
                    problems.push(this.generateMissingMinuend());
                    break;
                case 'word-problems-sub':
                    problems.push(this.generateWordProblemSub());
                    break;
                case 'visual-estimation':
                    problems.push(this.generateVisualEstimation());
                    break;
                case 'rounding-addition':
                    problems.push(this.generateRoundingAddition());
                    break;
                case 'rounding-subtraction':
                    problems.push(this.generateRoundingSubtraction());
                    break;
            }
        }
        
        return problems;
    }

    generateMentalAddition() {
        const num1 = Math.floor(Math.random() * 20) + 1;  // 1-20
        const num2 = Math.floor(Math.random() * 20) + 1;  // 1-20
        return {
            problem: `${num1} + ${num2} = ?`,
            answer: num1 + num2
        };
    }

    generate2DigitAddition() {
        const num1 = Math.floor(Math.random() * 90) + 10;  // 10-99
        const num2 = Math.floor(Math.random() * 90) + 10;  // 10-99
        return {
            problem: `${num1} + ${num2} = ?`,
            answer: num1 + num2
        };
    }

    generate3DigitAddition() {
        const num1 = Math.floor(Math.random() * 900) + 100; // 100-999
        const num2 = Math.floor(Math.random() * 900) + 100; // 100-999
        return {
            problem: `${num1} + ${num2} = ?`,
            answer: num1 + num2
        };
    }

    generate4DigitAddition() {
        const num1 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
        const num2 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
        return {
            problem: `${num1} + ${num2} = ?`,
            answer: num1 + num2
        };
    }

    generateMissingAddend() {
        const total = Math.floor(Math.random() * 50) + 20;
        const addend = Math.floor(Math.random() * (total - 5)) + 5;
        const missing = total - addend;
        return {
            problem: `${addend} + ? = ${total}`,
            answer: missing
        };
    }

    generateWordProblemAdd() {
        const scenarios = [
            'Sarah has {num1} stickers. Her friend gives her {num2} more stickers. How many stickers does Sarah have now?',
            'There are {num1} birds in a tree. {num2} more birds fly to the tree. How many birds are in the tree now?',
            'Jake collected {num1} shells at the beach. Then he found {num2} more shells. How many shells does he have in total?'
        ];
        const num1 = Math.floor(Math.random() * 30) + 5;
        const num2 = Math.floor(Math.random() * 20) + 3;
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        return {
            problem: scenario.replace('{num1}', num1).replace('{num2}', num2),
            answer: num1 + num2,
            isWordProblem: true
        };
    }

    generateMentalSubtraction() {
        const num1 = Math.floor(Math.random() * 30) + 10;  // 10-39
        const num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // Ensure positive result
        return {
            problem: `${num1} - ${num2} = ?`,
            answer: num1 - num2
        };
    }

    generate2DigitSubtraction() {
        const num1 = Math.floor(Math.random() * 90) + 20;   // 20-109 (to ensure positive result)
        const num2 = Math.floor(Math.random() * (num1 - 10)) + 10; // 10 to num1-1
        return {
            problem: `${num1} - ${num2} = ?`,
            answer: num1 - num2
        };
    }

    generate3DigitSubtraction() {
        const num1 = Math.floor(Math.random() * 900) + 200; // 200-1099 (ensure positive result)
        const num2 = Math.floor(Math.random() * (num1 - 100)) + 100; // 100 to num1-1
        return {
            problem: `${num1} - ${num2} = ?`,
            answer: num1 - num2
        };
    }

    generate4DigitSubtraction() {
        const num1 = Math.floor(Math.random() * 9000) + 2000; // 2000-10999 (ensure positive result)
        const num2 = Math.floor(Math.random() * (num1 - 1000)) + 1000; // 1000 to num1-1
        return {
            problem: `${num1} - ${num2} = ?`,
            answer: num1 - num2
        };
    }

    generateMissingMinuend() {
        const result = Math.floor(Math.random() * 30) + 5;
        const subtracted = Math.floor(Math.random() * 20) + 5;
        const minuend = result + subtracted;
        return {
            problem: `? - ${subtracted} = ${result}`,
            answer: minuend
        };
    }

    generateWordProblemSub() {
        const scenarios = [
            'Tom has {num1} candies. He gives away {num2} candies to his friends. How many candies does Tom have left?',
            'There were {num1} cookies on the plate. The family ate {num2} cookies. How many cookies are left?',
            'Emma had {num1} crayons. She lost {num2} crayons. How many crayons does she have now?'
        ];
        const num1 = Math.floor(Math.random() * 50) + 20;
        const num2 = Math.floor(Math.random() * (num1 - 5)) + 5;
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        return {
            problem: scenario.replace('{num1}', num1).replace('{num2}', num2),
            answer: num1 - num2,
            isWordProblem: true
        };
    }

    generateVisualEstimation() {
        const actualCount = Math.floor(Math.random() * 30) + 15; // 15-44 items
        const items = ['🔴', '🟦', '⭐', '🍎', '🟢', '🔶', '🌟', '🎯'];
        const selectedItem = items[Math.floor(Math.random() * items.length)];
        
        return {
            problem: `How many items do you see?`,
            answer: actualCount,
            isVisualEstimation: true,
            visualData: {
                count: actualCount,
                item: selectedItem
            }
        };
    }

    generateRoundingAddition() {
        // Generate 3-digit numbers for rounding practice
        const num1 = Math.floor(Math.random() * 800) + 100; // 100-899
        const num2 = Math.floor(Math.random() * 800) + 100; // 100-899
        
        // Round to nearest 100
        const rounded1 = Math.round(num1 / 100) * 100;
        const rounded2 = Math.round(num2 / 100) * 100;
        const roundedAnswer = rounded1 + rounded2;
        
        return {
            problem: `Round and add: ${num1} + ${num2}`,
            answer: roundedAnswer,
            isRoundingProblem: true,
            roundingData: {
                original1: num1,
                original2: num2,
                rounded1: rounded1,
                rounded2: rounded2,
                operation: 'addition'
            }
        };
    }

    generateRoundingSubtraction() {
        // Generate 3-digit numbers for rounding practice
        const num1 = Math.floor(Math.random() * 800) + 300; // 300-1099 (ensure positive result)
        const num2 = Math.floor(Math.random() * (num1 - 100)) + 100; // 100 to num1-1
        
        // Round to nearest 100
        const rounded1 = Math.round(num1 / 100) * 100;
        const rounded2 = Math.round(num2 / 100) * 100;
        const roundedAnswer = rounded1 - rounded2;
        
        return {
            problem: `Round and subtract: ${num1} - ${num2}`,
            answer: roundedAnswer,
            isRoundingProblem: true,
            roundingData: {
                original1: num1,
                original2: num2,
                rounded1: rounded1,
                rounded2: rounded2,
                operation: 'subtraction'
            }
        };
    }

    displayCurrentProblem() {
        const problem = this.problems[this.currentProblemIndex];
        const problemText = document.getElementById('problemText');
        const visualEstimation = document.getElementById('visualEstimation');
        
        // Hide all special displays first
        visualEstimation.classList.add('hidden');
        
        if (problem.isVisualEstimation) {
            // Handle visual estimation problems
            problemText.style.fontSize = '2rem';
            problemText.style.textAlign = 'center';
            problemText.style.lineHeight = '1.2';
            problemText.textContent = problem.problem;
            
            // Show visual estimation display
            visualEstimation.classList.remove('hidden');
            this.displayVisualItems(problem.visualData);
            
        } else if (problem.isRoundingProblem) {
            // Handle rounding problems
            problemText.style.fontSize = '1.8rem';
            problemText.style.textAlign = 'center';
            problemText.style.lineHeight = '1.4';
            
            const { original1, original2, operation } = problem.roundingData;
            const operatorSymbol = operation === 'addition' ? '+' : '−';
            
            problemText.innerHTML = `
                <div style="margin-bottom: 15px; font-size: 2rem; color: #2d3748;">
                    ${original1} ${operatorSymbol} ${original2} = ?
                </div>
                <div style="font-size: 1.3rem; color: #666; line-height: 1.6;">
                    <strong>Step 1:</strong> Round each number to the nearest 100<br>
                    <strong>Step 2:</strong> Add/subtract the rounded numbers<br>
                    <em>What is your estimated answer?</em>
                </div>
            `;
            
        } else if (problem.isWordProblem) {
            problemText.style.fontSize = '1.5rem';
            problemText.style.textAlign = 'left';
            problemText.style.lineHeight = '1.6';
            problemText.textContent = problem.problem;
        } else {
            problemText.style.fontSize = '3rem';
            problemText.style.textAlign = 'center';
            problemText.style.lineHeight = '1';
            problemText.textContent = problem.problem;
        }
        
        this.currentAnswer = problem.answer;
        
        // Reset input and feedback
        document.getElementById('answerInput').value = '';
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('nextBtn').classList.add('hidden');
        document.getElementById('finishBtn').classList.add('hidden');
        
        // Update progress
        const progress = ((this.currentProblemIndex) / this.totalProblems) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('currentProblem').textContent = this.currentProblemIndex + 1;
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('answerInput').focus();
        }, 100);
    }

    displayVisualItems(visualData) {
        const dotsContainer = document.getElementById('dotsContainer');
        dotsContainer.innerHTML = '';
        
        const { count, item } = visualData;
        
        // Create a grid layout for the items
        dotsContainer.style.display = 'grid';
        dotsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(30px, 1fr))';
        dotsContainer.style.gap = '5px';
        dotsContainer.style.justifyItems = 'center';
        dotsContainer.style.padding = '20px';
        
        // Add items in a somewhat random pattern to make counting more challenging
        const positions = [];
        for (let i = 0; i < count; i++) {
            positions.push(i);
        }
        
        // Shuffle the positions slightly for more realistic groupings
        for (let i = positions.length - 1; i > 0; i--) {
            if (Math.random() < 0.3) { // 30% chance to shuffle
                const j = Math.floor(Math.random() * (i + 1));
                [positions[i], positions[j]] = [positions[j], positions[i]];
            }
        }
        
        positions.forEach(() => {
            const itemElement = document.createElement('span');
            itemElement.textContent = item;
            itemElement.style.fontSize = '24px';
            itemElement.style.display = 'inline-block';
            itemElement.style.margin = '2px';
            dotsContainer.appendChild(itemElement);
        });
    }

    checkAnswer() {
        const userAnswer = parseInt(document.getElementById('answerInput').value);
        const feedback = document.getElementById('feedback');
        const feedbackMessage = document.getElementById('feedbackMessage');
        
        if (isNaN(userAnswer)) {
            this.showIncorrectFeedback('Please enter a number!');
            return;
        }
        
        if (userAnswer === this.currentAnswer) {
            this.correctAnswers++;
            this.showCorrectFeedback();
        } else {
            this.showIncorrectFeedback(`Not quite! Try again. The answer is ${this.currentAnswer}.`);
        }
    }

    showCorrectFeedback() {
        const feedback = document.getElementById('feedback');
        const feedbackMessage = document.getElementById('feedbackMessage');
        
        feedback.classList.remove('hidden', 'incorrect');
        feedback.classList.add('correct');
        
        const encouragements = [
            '🎉 Excellent work!',
            '⭐ Amazing job!',
            '🌟 You\'re doing great!',
            '🎊 Perfect!',
            '👏 Outstanding!',
            '💫 Fantastic!'
        ];
        
        feedbackMessage.textContent = encouragements[Math.floor(Math.random() * encouragements.length)];
        
        // Show celebration overlay
        this.showCelebration();
        
        // Show next/finish button after celebration
        setTimeout(() => {
            if (this.currentProblemIndex < this.totalProblems - 1) {
                document.getElementById('nextBtn').classList.remove('hidden');
            } else {
                document.getElementById('finishBtn').classList.remove('hidden');
            }
        }, 1500);
    }

    showIncorrectFeedback(message) {
        const feedback = document.getElementById('feedback');
        const feedbackMessage = document.getElementById('feedbackMessage');
        const problemContainer = document.getElementById('problemContainer');
        
        feedback.classList.remove('hidden', 'correct');
        feedback.classList.add('incorrect');
        feedbackMessage.textContent = message;
        
        // Add shake animation
        problemContainer.classList.add('shake');
        setTimeout(() => {
            problemContainer.classList.remove('shake');
        }, 500);
        
        // Clear input and focus for retry
        setTimeout(() => {
            document.getElementById('answerInput').value = '';
            document.getElementById('answerInput').focus();
        }, 1000);
    }

    showCelebration() {
        const overlay = document.getElementById('celebrationOverlay');
        overlay.classList.remove('hidden');
        
        // Hide celebration after animation
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 1500);
    }

    nextProblem() {
        this.currentProblemIndex++;
        this.displayCurrentProblem();
    }

    finishSession() {
        const percentage = Math.round((this.correctAnswers / this.totalProblems) * 100);
        let message = '';
        
        if (percentage >= 90) {
            message = `🏆 Outstanding! You got ${this.correctAnswers} out of ${this.totalProblems} problems correct! You're a math superstar!`;
        } else if (percentage >= 70) {
            message = `🌟 Great job! You got ${this.correctAnswers} out of ${this.totalProblems} problems correct! Keep practicing!`;
        } else {
            message = `👍 Good effort! You got ${this.correctAnswers} out of ${this.totalProblems} problems correct! Practice makes perfect!`;
        }
        
        alert(message);
        this.showSubsectionMenu(this.currentSection);
    }
}

// Global functions for HTML onclick events
function showMainMenu() {
    app.showMainMenu();
}

function showSubsectionMenu() {
    app.showSubsectionMenu(app.currentSection);
}

function checkAnswer() {
    app.checkAnswer();
}

function nextProblem() {
    app.nextProblem();
}

function finishSession() {
    app.finishSession();
}

// Initialize the app when page loads
let app;
document.addEventListener('DOMContentLoaded', function() {
    app = new MathPracticeApp();
});