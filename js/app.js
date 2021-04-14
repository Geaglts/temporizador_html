const STUDY_KEY = "STUDY_KEY";
const RELAX_KEY = "RELAX_KEY";

//Form inputs
const form_setHours = document.querySelector("#setHours");
const form_setMinutes = document.querySelector("#setMinutes");
const form_setSeconds = document.querySelector("#setSeconds");

// Texts
const text_study_hours = document.querySelector("#study_hours");
const text_study_minutes = document.querySelector("#study_minutes");
const text_study_seconds = document.querySelector("#study_seconds");

const text_relax_hours = document.querySelector("#relax_hours");
const text_relax_minutes = document.querySelector("#relax_minutes");
const text_relax_seconds = document.querySelector("#relax_seconds");

// Form Buttons
const button_study = document.querySelector("#study");
const button_relax = document.querySelector("#relax");

// Buttons
const button_study_pause = document.querySelector("#study_pause");
const button_study_play = document.querySelector("#study_play");
const button_study_reset = document.querySelector("#study_reset");

const button_relax_pause = document.querySelector("#relax_pause");
const button_relax_play = document.querySelector("#relax_play");
const button_relax_reset = document.querySelector("#relax_reset");

// Format numbers
function validTime(entrada) {
    if (entrada.value.length > 0) {
        return entrada.value;
    }
    return "0";
}

function formatTime(numero, hour = false) {
    const numeroEntero = parseInt(numero);
    if (hour && numeroEntero > 24) {
        return "24";
    }
    if (numeroEntero > 60) {
        return "60";
    }
    if (numeroEntero < "10") {
        return "0" + numeroEntero;
    }
    return String(numeroEntero);
}

function parseStringToNumber(input) {
    return parseInt(input.textContent);
}

// Edit inputs and count texts

function resetForm() {
    form_setHours.value = "";
    form_setMinutes.value = "";
    form_setSeconds.value = "";
}

function setStudyText(hours, minutes, seconds) {
    text_study_hours.textContent = formatTime(hours, true);
    text_study_minutes.textContent = formatTime(minutes);
    text_study_seconds.textContent = formatTime(seconds);
}

function setRelaxText(hours, minutes, seconds) {
    text_relax_hours.textContent = formatTime(hours, true);
    text_relax_minutes.textContent = formatTime(minutes);
    text_relax_seconds.textContent = formatTime(seconds);
}

let intervalIds = {};

// Timer
function startTimer(hours, minutes, seconds, key) {
    let numberHours = parseStringToNumber(hours);
    let numberMinutes = parseStringToNumber(minutes);
    let numberSeconds = parseStringToNumber(seconds);

    intervalIds[key] = setInterval(() => {
        if (numberSeconds === 0) {
            if (numberMinutes > 0) {
                numberSeconds = 60;
                numberMinutes -= 1;
                minutes.textContent = formatTime(numberMinutes);
                seconds.textContent = formatTime(numberSeconds);
            } else {
                if (numberHours > 0) {
                    numberMinutes = 60;
                    numberHours -= 1;
                    hours.textContent = formatTime(numberHours);
                    minutes.textContent = formatTime(numberMinutes);
                    seconds.textContent = formatTime(numberSeconds);
                } else {
                    hours.textContent = formatTime(numberHours);
                    minutes.textContent = formatTime(numberMinutes);
                    seconds.textContent = formatTime(numberSeconds);
                    stopTimer(key);
                    alert("Termino un cronometro :D!!");
                }
            }
        } else {
            numberSeconds -= 1;
            hours.textContent = formatTime(numberHours);
            minutes.textContent = formatTime(numberMinutes);
            seconds.textContent = formatTime(numberSeconds);
        }
    }, 1000);
}

// Timer
function stopTimer(key) {
    clearInterval(intervalIds[key]);
}

// events

button_study.addEventListener("click", () => {
    const hours = validTime(form_setHours);
    const minutes = validTime(form_setMinutes);
    const seconds = validTime(form_setSeconds);
    setStudyText(hours, minutes, seconds);
    resetForm();
});

button_relax.addEventListener("click", () => {
    const hours = validTime(form_setHours);
    const minutes = validTime(form_setMinutes);
    const seconds = validTime(form_setSeconds);
    setRelaxText(hours, minutes, seconds);
    resetForm();
});

button_study_reset.addEventListener("click", () => {
    stopTimer(STUDY_KEY);
    text_study_hours.textContent = "00";
    text_study_minutes.textContent = "00";
    text_study_seconds.textContent = "00";
});

button_relax_reset.addEventListener("click", () => {
    stopTimer(RELAX_KEY);
    text_relax_hours.textContent = "00";
    text_relax_minutes.textContent = "00";
    text_relax_seconds.textContent = "00";
});

// Study timer
button_study_play.addEventListener("click", () => {
    const hours = text_study_hours;
    const minutes = text_study_minutes;
    const seconds = text_study_seconds;
    startTimer(hours, minutes, seconds, STUDY_KEY);
});

button_study_pause.addEventListener("click", () => {
    stopTimer(STUDY_KEY);
});

// Relax timer
button_relax_play.addEventListener("click", () => {
    const hours = text_relax_hours;
    const minutes = text_relax_minutes;
    const seconds = text_relax_seconds;
    startTimer(hours, minutes, seconds, RELAX_KEY);
});

button_relax_pause.addEventListener("click", () => {
    stopTimer(RELAX_KEY);
});
