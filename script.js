/* =========================================
   SETTINGS
========================================= */

// Change this to whatever password you want Marina to use.
const PASSWORD = "marina";


/*
   IMPORTANT:

   April 28, 2026
   = the day you started talking

   June 13, 2026
   = the day you first met
*/

const TALKING_DATE = new Date("2026-04-28T00:00:00");
const MEETING_DATE = new Date("2026-06-13T00:00:00");


/* =========================================
   PASSWORD SYSTEM
========================================= */

const passwordScreen = document.getElementById("passwordScreen");
const mainContent = document.getElementById("mainContent");

const passwordInput = document.getElementById("passwordInput");
const unlockButton = document.getElementById("unlockButton");
const passwordError = document.getElementById("passwordError");


function unlockWebsite() {

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === PASSWORD) {

        passwordScreen.classList.add("hidden");

        mainContent.classList.remove("hidden");

        // Start the animations after unlocking
        startFloatingHearts();

        updateCounters();

        // Start updating the counter every second
        setInterval(updateCounters, 1000);

    } else {

        passwordError.textContent =
            "Hmm... that's not the secret password ❤️";

        passwordInput.value = "";

        passwordInput.focus();

        passwordInput.style.animation = "shake 0.4s";

        setTimeout(() => {
            passwordInput.style.animation = "";
        }, 400);
    }
}


unlockButton.addEventListener("click", unlockWebsite);


passwordInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        unlockWebsite();
    }

});


/* =========================================
   TIME CALCULATIONS
========================================= */

function calculateTime(startDate) {

    const now = new Date();

    let difference = now - startDate;

    // Prevent negative numbers
    if (difference < 0) {
        difference = 0;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor(
        (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    return {
        days,
        hours,
        minutes,
        seconds
    };
}


/* =========================================
   MAIN COUNTER
========================================= */

function updateCounters() {

    const time = calculateTime(TALKING_DATE);

    document.getElementById("days").textContent =
        time.days;

    document.getElementById("hours").textContent =
        time.hours;

    document.getElementById("minutes").textContent =
        time.minutes;

    document.getElementById("seconds").textContent =
        time.seconds;


    /* Talking counter */

    const talkingTime = calculateTime(TALKING_DATE);

    document.getElementById("talkingCounter").textContent =
        `${talkingTime.days} days, ${talkingTime.hours} hours together`;


    /* Meeting counter */

    const meetingTime = calculateTime(MEETING_DATE);

    document.getElementById("meetingCounter").textContent =
        `${meetingTime.days} days, ${meetingTime.hours} hours since we met`;
}


/* =========================================
   FLOATING HEARTS
========================================= */

const heartsContainer =
    document.getElementById("heartsContainer");


const heartTypes = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💘",
    "🌹",
    "♡"
];


function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add("floating-heart");

    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() * heartTypes.length
            )
        ];


    const size =
        Math.random() * 18 + 12;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 7 + 7;


    heart.style.left = `${left}%`;

    heart.style.fontSize = `${size}px`;

    heart.style.animationDuration =
        `${duration}s`;


    heartsContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}


function startFloatingHearts() {

    // Create one immediately
    createHeart();

    // Then continue creating them
    setInterval(() => {

        createHeart();

    }, 900);

}


/* =========================================
   MUSIC
========================================= */

const musicButton =
    document.getElementById("musicButton");

const loveSong =
    document.getElementById("loveSong");


let musicPlaying = false;


musicButton.addEventListener("click", function() {

    if (!musicPlaying) {

        loveSong.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent =
                    "⏸️ Pause our song";

            })
            .catch(() => {

                musicButton.textContent =
                    "🎵 Tap again to play";

            });

    } else {

        loveSong.pause();

        musicPlaying = false;

        musicButton.textContent =
            "🎵 Play our song";
    }

});


/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener("load", function() {

    passwordInput.focus();

});


/* =========================================
   EXTRA PASSWORD ANIMATION
========================================= */

const style =
    document.createElement("style");

style.textContent = `

@keyframes shake {

    0%, 100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-8px);
    }

    75% {
        transform: translateX(8px);
    }

}

`;

document.head.appendChild(style);