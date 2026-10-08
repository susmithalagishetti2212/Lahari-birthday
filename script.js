/* =========================================
   ELEMENTS
========================================= */

const intro =
    document.getElementById("intro");

const messageSection =
    document.getElementById("messageSection");

const memories =
    document.getElementById("memories");

const videoSection =
    document.getElementById("videoSection");

const letterSection =
    document.getElementById("letterSection");

const finalSection =
    document.getElementById("finalSection");


const startBtn =
    document.getElementById("startBtn");

const memoryBtn =
    document.getElementById("memoryBtn");

const videoBtn =
    document.getElementById("videoBtn");

const afterVideoBtn =
    document.getElementById("afterVideoBtn");

const finalBtn =
    document.getElementById("finalBtn");


const video =
    document.getElementById("birthdayVideo");

const music =
    document.getElementById("birthdayMusic");


const videoOverlay =
    document.getElementById("videoOverlay");


const videoIntroAnimation =
    document.getElementById(
        "videoIntroAnimation"
    );


const videoEnding =
    document.getElementById(
        "videoEnding"
    );


const particlesContainer =
    document.getElementById(
        "particles"
    );


const confettiContainer =
    document.getElementById(
        "confetti"
    );


/* =========================================
   SECTION NAVIGATION
========================================= */

function showSection(
    currentSection,
    nextSection
) {

    currentSection.classList.remove(
        "active"
    );

    currentSection.classList.add(
        "fade-out"
    );


    setTimeout(() => {

        currentSection.classList.add(
            "hidden"
        );

        currentSection.classList.remove(
            "fade-out"
        );


        nextSection.classList.remove(
            "hidden"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        setTimeout(() => {

            nextSection.classList.add(
                "active"
            );

        }, 50);

    }, 500);
}


/* =========================================
   INTRO → MESSAGE
========================================= */

startBtn.addEventListener(
    "click",
    () => {

        showSection(
            intro,
            messageSection
        );

    }
);


/* =========================================
   MESSAGE → MEMORIES
========================================= */

memoryBtn.addEventListener(
    "click",
    () => {

        showSection(
            messageSection,
            memories
        );

    }
);


/* =========================================
   MEMORIES → VIDEO
========================================= */

videoBtn.addEventListener(
    "click",
    () => {

        showSection(
            memories,
            videoSection
        );

    }
);


/* =========================================
   PARTICLES
========================================= */

function createParticles() {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.classList.add(
            "particle"
        );


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.animationDuration =
            (
                Math.random() * 8 + 7
            ) + "s";


        particle.style.animationDelay =
            Math.random() * 8 + "s";


        const size =
            Math.random() * 3 + 2;


        particle.style.width =
            size + "px";


        particle.style.height =
            size + "px";


        particlesContainer.appendChild(
            particle
        );

    }

}

createParticles();


/* =========================================
   START VIDEO EXPERIENCE
========================================= */

function startVideoExperience() {

    /*
       Prevent multiple clicks.
    */

    videoOverlay.style.pointerEvents =
        "none";


    /*
       Hide play button.
    */

    videoOverlay.classList.add(
        "hidden"
    );


    /*
       Show cinematic animation.
    */

    videoIntroAnimation.classList.add(
        "show"
    );


    /*
       Wait 3.5 seconds before
       starting the actual video.
    */

    setTimeout(() => {

        playBirthdayVideo();

    }, 3500);

}


/* =========================================
   PLAY VIDEO + MUSIC
========================================= */

function playBirthdayVideo() {

    /*
       Use the separate MP3
       as the soundtrack.

       Therefore the video's
       own audio is muted.
    */

    video.muted = true;


    /*
       Start from beginning.
    */

    video.currentTime = 0;

    music.currentTime = 0;


    /*
       Hide cinematic intro.
    */

    videoIntroAnimation.classList.add(
        "hide"
    );


    /*
       Play video.
    */

    const videoPromise =
        video.play();


    /*
       Play music.
    */

    const musicPromise =
        music.play();


    if (
        videoPromise !== undefined
    ) {

        videoPromise.catch(
            error => {

                console.log(
                    "Video playback issue:",
                    error
                );

            }
        );

    }


    if (
        musicPromise !== undefined
    ) {

        musicPromise.catch(
            error => {

                console.log(
                    "Music playback issue:",
                    error
                );

            }
        );

    }


    /*
       Remove intro after fade.
    */

    setTimeout(() => {

        videoIntroAnimation.classList.remove(
            "show"
        );

    }, 700);

}


/* =========================================
   PLAY BUTTON
========================================= */

videoOverlay.addEventListener(
    "click",
    () => {

        startVideoExperience();

    }
);


/* =========================================
   VIDEO CLICK
========================================= */

video.addEventListener(
    "click",
    () => {

        /*
           If ending is visible,
           don't restart the video.
        */

        if (
            videoEnding.classList.contains(
                "show"
            )
        ) {

            return;

        }


        if (video.paused) {

            video.play();

            music.play().catch(
                () => {}
            );

        } else {

            video.pause();

            music.pause();

        }

    }
);


/* =========================================
   KEEP MUSIC SYNCHRONIZED
========================================= */

video.addEventListener(
    "play",
    () => {

        music.play().catch(
            () => {}
        );

    }
);


video.addEventListener(
    "pause",
    () => {

        music.pause();

    }
);


video.addEventListener(
    "seeking",
    () => {

        if (
            Math.abs(
                music.currentTime -
                video.currentTime
            ) > 0.3
        ) {

            music.currentTime =
                video.currentTime;

        }

    }
);


/* =========================================
   VIDEO ENDS
========================================= */

video.addEventListener(
    "ended",
    () => {

        /*
           Stop music.
        */

        music.pause();

        music.currentTime = 0;


        /*
           Show emotional ending.
        */

        videoEnding.classList.add(
            "show"
        );


        /*
           Wait 4 seconds.

           This allows the message:

           "Made with lotss of loveee 💖🫂"

           to remain visible before
           continuing.
        */

        setTimeout(() => {

            afterVideoBtn.classList.add(
                "visible"
            );

        }, 4000);

    }
);


/* =========================================
   VIDEO → LETTER
========================================= */

afterVideoBtn.addEventListener(
    "click",
    () => {

        /*
           Hide ending when leaving.
        */

        videoEnding.classList.remove(
            "show"
        );


        showSection(
            videoSection,
            letterSection
        );

    }
);


/* =========================================
   LETTER → FINAL
========================================= */

finalBtn.addEventListener(
    "click",
    () => {

        showSection(
            letterSection,
            finalSection
        );


        setTimeout(() => {

            createConfetti();

        }, 800);

    }
);


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const symbols = [
        "♥",
        "✦",
        "✧",
        "•",
        "◆"
    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.classList.add(
            "confetti"
        );


        piece.innerText =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.top =
            -Math.random() * 20 + "%";


        piece.style.fontSize =
            (
                Math.random() * 12 + 6
            ) + "px";


        piece.style.animationDuration =
            (
                Math.random() * 3 + 3
            ) + "s";


        piece.style.animationDelay =
            Math.random() * 2 + "s";


        piece.style.color =
            [
                "#e889ad",
                "#f5c2d5",
                "#ffffff",
                "#d78bb0",
                "#ffd6e5"
            ][
                Math.floor(
                    Math.random() * 5
                )
            ];


        confettiContainer.appendChild(
            piece
        );

    }

}


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            video.pause();

            music.pause();

        }

    }
);