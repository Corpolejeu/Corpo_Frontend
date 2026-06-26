// ─────────────────────────────
// CORPO! — MUSIQUE GLOBALE STABLE
// ─────────────────────────────

const CORPO_MUSIC_SRC = "../assets/audio/happy-game.mp3";
const MUSIC_TIME_KEY = "corpo_music_time";
const MUSIC_ON_KEY = "corpo_music_on";
const MUSIC_VOLUME_KEY = "corpo_music_volume";

let corpoMusic = null;
let saveInterval = null;

function createMusicButton() {
    if (document.getElementById("musicToggle")) return;

    const btn = document.createElement("button");
    btn.id = "musicToggle";
    btn.type = "button";
    btn.textContent = "🔊 Musique";

    btn.style.cssText = `
        position: fixed;
        bottom: 78px;
        right: 20px;
        z-index: 99999;
        border: none;
        border-radius: 18px;
        padding: 12px 16px;
        background: white;
        color: #ff3131;
        font-family: Poppins, sans-serif;
        font-weight: 800;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(0,0,0,.18);
    `;

    btn.addEventListener("click", toggleMusic);
    document.body.appendChild(btn);
}

function updateMusicButton() {
    const btn = document.getElementById("musicToggle");
    if (!btn || !corpoMusic) return;

    btn.textContent = corpoMusic.paused ? "🔇 Musique" : "🔊 Musique";
}

function initMusic() {
    if (corpoMusic) return;

    corpoMusic = new Audio(CORPO_MUSIC_SRC);
    corpoMusic.loop = true;
    corpoMusic.preload = "auto";
    corpoMusic.volume = parseFloat(localStorage.getItem(MUSIC_VOLUME_KEY) || "0.45");

    const savedTime = parseFloat(localStorage.getItem(MUSIC_TIME_KEY) || "0");
    if (!isNaN(savedTime) && savedTime > 0) {
        corpoMusic.currentTime = savedTime;
    }

    corpoMusic.addEventListener("timeupdate", () => {
        if (!corpoMusic.paused) {
            localStorage.setItem(MUSIC_TIME_KEY, String(corpoMusic.currentTime));
        }
    });

    corpoMusic.addEventListener("play", () => {
        localStorage.setItem(MUSIC_ON_KEY, "true");
        updateMusicButton();
    });

    corpoMusic.addEventListener("pause", () => {
        updateMusicButton();
    });

    corpoMusic.addEventListener("ended", () => {
        corpoMusic.currentTime = 0;
        corpoMusic.play().catch(() => {});
    });

    createMusicButton();

    if (localStorage.getItem(MUSIC_ON_KEY) === "true") {
        playMusic();
    }

    document.addEventListener("click", firstUserInteraction, { once: true });
    document.addEventListener("touchstart", firstUserInteraction, { once: true });
}

function firstUserInteraction() {
    if (localStorage.getItem(MUSIC_ON_KEY) !== "false") {
        playMusic();
    }
}

function playMusic() {
    if (!corpoMusic) return;

    corpoMusic.volume = parseFloat(localStorage.getItem(MUSIC_VOLUME_KEY) || "0.28");

    corpoMusic.play()
        .then(() => {
            localStorage.setItem(MUSIC_ON_KEY, "true");
            updateMusicButton();
        })
        .catch(() => {
            createMusicButton();
            updateMusicButton();
        });
}

function pauseMusic() {
    if (!corpoMusic) return;

    localStorage.setItem(MUSIC_TIME_KEY, String(corpoMusic.currentTime));
    localStorage.setItem(MUSIC_ON_KEY, "false");
    corpoMusic.pause();
    updateMusicButton();
}

function toggleMusic() {
    if (!corpoMusic) initMusic();

    if (corpoMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

window.addEventListener("beforeunload", () => {
    if (corpoMusic) {
        localStorage.setItem(MUSIC_TIME_KEY, String(corpoMusic.currentTime));
    }
});

document.addEventListener("visibilitychange", () => {
    if (!corpoMusic) return;

    if (document.hidden) {
        localStorage.setItem(MUSIC_TIME_KEY, String(corpoMusic.currentTime));
    } else if (localStorage.getItem(MUSIC_ON_KEY) === "true") {
        playMusic();
    }
});

initMusic();