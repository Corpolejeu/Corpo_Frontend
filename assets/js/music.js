// ────────────────────────────────────────────────
// CORPO! — GESTION DE LA MUSIQUE GLOBALE
// Ce fichier permet :
// • de jouer une musique sur toutes les pages
// • de conserver la position de lecture
// • de reprendre automatiquement la musique
// • d'avoir un bouton ON/OFF
// ────────────────────────────────────────────────


// Chemin vers la musique
const CORPO_MUSIC_SRC = "../assets/audio/happy-game.mp3";

// Clés utilisées dans le LocalStorage
const MUSIC_TIME_KEY = "corpo_music_time";      // Position actuelle dans la musique
const MUSIC_ON_KEY = "corpo_music_on";          // La musique est-elle activée ?
const MUSIC_VOLUME_KEY = "corpo_music_volume";  // Volume choisi


// Objet Audio
let corpoMusic = null;

// Intervalle de sauvegarde (non utilisé actuellement mais gardé si besoin)
let saveInterval = null;



// ────────────────────────────────────────────────
// Création du bouton Musique
// ────────────────────────────────────────────────
function createMusicButton() {

    // Si le bouton existe déjà, on ne le recrée pas
    if (document.getElementById("musicToggle")) return;

    // Création du bouton
    const btn = document.createElement("button");

    btn.id = "musicToggle";
    btn.type = "button";
    btn.textContent = "🔊 Musique";

    // Style directement en JavaScript
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

    // Lorsque l'on clique dessus
    btn.addEventListener("click", toggleMusic);

    // Ajout sur la page
    document.body.appendChild(btn);
}



// ────────────────────────────────────────────────
// Met à jour l'apparence du bouton
// ────────────────────────────────────────────────
function updateMusicButton() {

    const btn = document.getElementById("musicToggle");

    if (!btn || !corpoMusic) return;

    // Si la musique est arrêtée
    if (corpoMusic.paused) {

        btn.textContent = "🔇 Musique";

    }

    // Si elle joue
    else {

        btn.textContent = "🔊 Musique";

    }

}



// ────────────────────────────────────────────────
// Initialisation de la musique
// ────────────────────────────────────────────────
function initMusic() {

    // Empêche plusieurs créations
    if (corpoMusic) return;

    // Création de l'objet Audio
    corpoMusic = new Audio(CORPO_MUSIC_SRC);

    // Lecture infinie
    corpoMusic.loop = true;

    // Préchargement
    corpoMusic.preload = "auto";

    // Volume sauvegardé
    corpoMusic.volume = parseFloat(
        localStorage.getItem(MUSIC_VOLUME_KEY) || "0.45"
    );



    // ───────────────────────
    // Reprise au bon endroit
    // ───────────────────────
    const savedTime = parseFloat(
        localStorage.getItem(MUSIC_TIME_KEY) || "0"
    );

    if (!isNaN(savedTime) && savedTime > 0) {

        corpoMusic.currentTime = savedTime;

    }



    // ───────────────────────
    // Sauvegarde en permanence
    // ───────────────────────
    corpoMusic.addEventListener("timeupdate", () => {

        if (!corpoMusic.paused) {

            localStorage.setItem(
                MUSIC_TIME_KEY,
                String(corpoMusic.currentTime)
            );

        }

    });



    // Quand la musique démarre
    corpoMusic.addEventListener("play", () => {

        localStorage.setItem(MUSIC_ON_KEY, "true");

        updateMusicButton();

    });



    // Quand elle est mise en pause
    corpoMusic.addEventListener("pause", () => {

        updateMusicButton();

    });



    // Sécurité si jamais loop échoue
    corpoMusic.addEventListener("ended", () => {

        corpoMusic.currentTime = 0;

        corpoMusic.play().catch(() => { });

    });



    // Création du bouton
    createMusicButton();



    // Si la musique était déjà active
    if (localStorage.getItem(MUSIC_ON_KEY) === "true") {

        playMusic();

    }



    // Premier clic/touch obligatoire sur mobile
    document.addEventListener(
        "click",
        firstUserInteraction,
        { once: true }
    );

    document.addEventListener(
        "touchstart",
        firstUserInteraction,
        { once: true }
    );

}



// ────────────────────────────────────────────────
// Premier clic utilisateur
// Les navigateurs mobiles bloquent l'audio
// tant qu'il n'y a pas eu une interaction.
// ────────────────────────────────────────────────
function firstUserInteraction() {

    if (localStorage.getItem(MUSIC_ON_KEY) !== "false") {

        playMusic();

    }

}



// ────────────────────────────────────────────────
// Lecture de la musique
// ────────────────────────────────────────────────
function playMusic() {

    if (!corpoMusic) return;

    // Volume sauvegardé
    corpoMusic.volume = parseFloat(
        localStorage.getItem(MUSIC_VOLUME_KEY) || "0.28"
    );

    corpoMusic.play()

        .then(() => {

            localStorage.setItem(
                MUSIC_ON_KEY,
                "true"
            );

            updateMusicButton();

        })

        .catch(() => {

            // Si le navigateur bloque
            createMusicButton();

            updateMusicButton();

        });

}



// ────────────────────────────────────────────────
// Met la musique en pause
// ────────────────────────────────────────────────
function pauseMusic() {

    if (!corpoMusic) return;

    // Sauvegarde exacte de la position
    localStorage.setItem(
        MUSIC_TIME_KEY,
        String(corpoMusic.currentTime)
    );

    localStorage.setItem(
        MUSIC_ON_KEY,
        "false"
    );

    corpoMusic.pause();

    updateMusicButton();

}



// ────────────────────────────────────────────────
// Bouton ON / OFF
// ────────────────────────────────────────────────
function toggleMusic() {

    if (!corpoMusic) {

        initMusic();

    }

    if (corpoMusic.paused) {

        playMusic();

    }

    else {

        pauseMusic();

    }

}



// ────────────────────────────────────────────────
// Avant de quitter la page
// On sauvegarde la position
// ────────────────────────────────────────────────
window.addEventListener("beforeunload", () => {

    if (corpoMusic) {

        localStorage.setItem(
            MUSIC_TIME_KEY,
            String(corpoMusic.currentTime)
        );

    }

});



// ────────────────────────────────────────────────
// Quand l'utilisateur change d'onglet
// ou revient dessus
// ────────────────────────────────────────────────
document.addEventListener("visibilitychange", () => {

    if (!corpoMusic) return;

    // Si l'onglet est caché
    if (document.hidden) {

        localStorage.setItem(
            MUSIC_TIME_KEY,
            String(corpoMusic.currentTime)
        );

    }

    // Si on revient sur l'onglet
    else if (localStorage.getItem(MUSIC_ON_KEY) === "true") {

        playMusic();

    }

});



// ────────────────────────────────────────────────
// Démarrage du système musical
// ────────────────────────────────────────────────
initMusic();