let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const workModeButton = document.getElementById('work-mode');
const restModeButton = document.getElementById('rest-mode');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

const themeSwitch = document.getElementById('theme-switch');
const root = document.documentElement;

function toggleTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// Update the theme switch listener
themeSwitch.addEventListener('change', function() {
    toggleTheme(this.checked);
    localStorage.setItem('theme', this.checked ? 'light' : 'dark');
});

// Update the initial theme check
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    themeSwitch.checked = true;
    toggleTheme(true);
}

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function setWorkMode() {
    isWorkTime = true;
    timeLeft = WORK_TIME;
    statusText.textContent = 'Work Time';
    updateDisplay(timeLeft);
    workModeButton.classList.add('active');
    restModeButton.classList.remove('active');
}

function setRestMode() {
    isWorkTime = false;
    timeLeft = BREAK_TIME;
    statusText.textContent = 'Break Time';
    updateDisplay(timeLeft);
    restModeButton.classList.add('active');
    workModeButton.classList.remove('active');
}

function startTimer() {
    if (timerId !== null) return;

    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            alert(isWorkTime ? 'Work time is over! Take a break!' : 'Break is over! Back to work!');
            setWorkMode();
        }
    }, 1000);

    startButton.textContent = 'Pause';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    setWorkMode();
    startButton.textContent = 'Start';
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', resetTimer);

workModeButton.addEventListener('click', () => {
    if (timerId === null) {
        setWorkMode();
    }
});

restModeButton.addEventListener('click', () => {
    if (timerId === null) {
        setRestMode();
    }
});

// Initialize display
setWorkMode(); 