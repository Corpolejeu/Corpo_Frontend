const MUSIC_KEY = "corpo_music_time";
const MUSIC_ENABLED = "corpo_music_enabled";

const music = new Audio("../assets/audio/happy-game.mp3");
music.loop = true;
music.volume = 0.12;

const savedTime = parseFloat(localStorage.getItem(MUSIC_KEY) || "0");
if (!isNaN(savedTime)) {
    music.currentTime = savedTime;
}

function startMusic() {
    localStorage.setItem(MUSIC_ENABLED, "true");
    music.play().catch(() => { });
}

document.addEventListener("click", startMusic, { once: true });

setInterval(() => {
    if (!music.paused) {
        localStorage.setItem(MUSIC_KEY, music.currentTime);
    }
}, 1000);

window.addEventListener("beforeunload", () => {
    localStorage.setItem(MUSIC_KEY, music.currentTime);
});