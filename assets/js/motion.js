// ─────────────────────────────
// CORPO! — MOTION JS GLOBAL
// Animations modernes continues
// ─────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("corpo-motion-ready");

    // CSS injecté automatiquement
    const style = document.createElement("style");
    style.innerHTML = `
        html, body {
            overflow-x: hidden;
        }

        body.corpo-motion-ready {
            animation: corpoPageReveal .7s ease both;
        }

        @keyframes corpoPageReveal {
            from {
                opacity: 0;
                transform: translateY(18px);
                filter: blur(8px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
                filter: blur(0);
            }
        }

        /* Fond vivant : zoom / dézoom lent */
        .corpo-bg-motion {
            position: fixed;
            inset: -4%;
            z-index: -10;
            pointer-events: none;

            background:
                linear-gradient(
                    rgba(255, 255, 255, 0.21),
                    rgba(255, 255, 255, 0.19)
                ),
                url("../assets/images/background.png");

            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            animation: corpoBackgroundZoom 24s ease-in-out infinite alternate;
            transform-origin: center;
        }

        @keyframes corpoBackgroundZoom {
            0% {
                transform: scale(1) translate3d(0,0,0);
            }

            50% {
                transform: scale(1.08) translate3d(-10px,-8px,0);
            }

            100% {
                transform: scale(1.14) translate3d(12px,10px,0);
            }
        }

        /* Lumières rouges qui bougent doucement */
        .corpo-light-motion {
            position: fixed;
            inset: 0;
            z-index: -9;
            pointer-events: none;

            background:
                radial-gradient(circle at 20% 20%, rgba(255,49,49,.22), transparent 28%),
                radial-gradient(circle at 85% 70%, rgba(255,120,120,.18), transparent 32%),
                radial-gradient(circle at 50% 100%, rgba(255,49,49,.12), transparent 35%);

            animation: corpoLightMove 12s ease-in-out infinite alternate;
            mix-blend-mode: soft-light;
        }

        @keyframes corpoLightMove {
            from {
                transform: translate3d(-20px,-12px,0) scale(1);
                opacity: .75;
            }

            to {
                transform: translate3d(20px,18px,0) scale(1.08);
                opacity: 1;
            }
        }

        /* Entrée des cartes */
        .motion-in {
            opacity: 0;
            transform: translateY(35px) scale(.96);
            filter: blur(7px);
            transition:
                opacity .75s ease,
                transform .75s cubic-bezier(.2,.9,.2,1),
                filter .75s ease;
        }

        .motion-in.show {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
        }

        /* Flottement continu des cartes principales */
        .motion-card-float {
            animation: corpoCardFloat 5.5s ease-in-out infinite;
            will-change: transform;
        }

        @keyframes corpoCardFloat {
            0%, 100% {
                transform: translateY(0) scale(1);
            }

            50% {
                transform: translateY(-10px) scale(1.01);
            }
        }

        /* Boutons qui respirent */
        .motion-button-breathe {
            animation: corpoButtonBreathe 3.2s ease-in-out infinite;
            will-change: transform;
        }

        @keyframes corpoButtonBreathe {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 10px 30px rgba(255,49,49,.28);
            }

            50% {
                transform: scale(1.025);
                box-shadow: 0 18px 42px rgba(255,49,49,.38);
            }
        }

        /* Shine automatique sur les boutons */
        .motion-shine {
            position: relative;
            overflow: hidden;
        }

        .motion-shine::after {
            content: "";
            position: absolute;
            top: 0;
            left: -140%;
            width: 70%;
            height: 100%;
            pointer-events: none;

            background: linear-gradient(
                120deg,
                transparent,
                rgba(255, 255, 255, 0),
                transparent
            );

            animation: corpoShine 3.8s ease-in-out infinite;
        }

        @keyframes corpoShine {
            0%, 55% {
                left: -140%;
            }

            100% {
                left: 150%;
            }
        }

        /* Table de meeting qui respire */
        .oval-surface.motion-table-breathe {
            animation: corpoTableBreathe 4s ease-in-out infinite;
        }

        @keyframes corpoTableBreathe {
            0%, 100% {
                transform: scale(1);
                box-shadow:
                    0 0 0 8px rgba(255,49,49,.08),
                    0 15px 35px rgba(255,49,49,.18);
            }

            50% {
                transform: scale(1.025);
                box-shadow:
                    0 0 0 15px rgba(255,49,49,.13),
                    0 22px 50px rgba(255,49,49,.26);
            }
        }

        /* Avatars / images légères */
        .motion-soft-float {
            animation: corpoSoftFloat 3.8s ease-in-out infinite;
        }

        @keyframes corpoSoftFloat {
            0%, 100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-7px);
            }
        }

        /* Timer / badges plus vivants */
        .motion-pulse {
            animation: corpoPulse 2.4s ease-in-out infinite;
        }

        @keyframes corpoPulse {
            0%, 100% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.035);
            }
        }

        /* Petites particules blanches */
        .corpo-particle {
            position: fixed;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: rgba(255,255,255,.7);
            pointer-events: none;
            z-index: -8;

            animation: corpoParticleFloat linear infinite;
        }

        @keyframes corpoParticleFloat {
            from {
                transform: translateY(110vh) scale(.6);
                opacity: 0;
            }

            15% {
                opacity: .8;
            }

            85% {
                opacity: .8;
            }

            to {
                transform: translateY(-10vh) scale(1.2);
                opacity: 0;
            }
        }

        /* Accessibilité */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: .001ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: .001ms !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Fond animé
    if (!document.querySelector(".corpo-bg-motion")) {
        document.body.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="corpo-bg-motion"></div>
            <div class="corpo-light-motion"></div>
            `
        );
    }

    // Particules légères
    const particleCount = window.innerWidth < 768 ? 12 : 24;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("span");
        p.className = "corpo-particle";

        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = 8 + Math.random() * 12 + "s";
        p.style.animationDelay = Math.random() * 8 + "s";
        p.style.opacity = 0.25 + Math.random() * 0.45;

        document.body.appendChild(p);
    }

    // Apparition progressive des blocs
    const cards = document.querySelectorAll(`
        .box,
        .login-box,
        .feedback-box,
        .defi-box,
        .vote-box,
        .victoire-box,
        .defaite-box,
        .resultat-box,
        .waiting-box,
        .box-table,
        .action-col,
        .chat-box,
        .player-list
    `);

    cards.forEach((el, index) => {
        el.classList.add("motion-in");

        setTimeout(() => {
            el.classList.add("show");
            el.classList.add("motion-card-float");
        }, 120 + index * 90);
    });

    // Boutons vivants
    document.querySelectorAll(`
        .btn,
        .chat-send-btn,
        .btn-reste,
        .btn-elimine,
        .social-link,
        #logoutBtn,
        #actionButtons .btn
    `).forEach((btn, index) => {
        btn.classList.add("motion-button-breathe");
        btn.classList.add("motion-shine");
        btn.style.animationDelay = `${index * 0.15}s`;
    });

    // Table meeting
    document.querySelectorAll(".oval-surface").forEach(el => {
        el.classList.add("motion-table-breathe");
    });

    // Images / spinner
    document.querySelectorAll(`
        .defi-img,
        .victoire-img,
        .defaite-img,
        .resultat-img,
        .spinner,
        .seat-avatar
    `).forEach((el, index) => {
        el.classList.add("motion-soft-float");
        el.style.animationDelay = `${index * 0.12}s`;
    });

    // Badges / timers
    document.querySelectorAll(`
        #myRoleBadge,
        #contextBadge,
        .badge,
        .corpo-badge,
        .defi-type-badge,
        .feedback-timer,
        .timer-defi,
        #timerCenter
    `).forEach(el => {
        el.classList.add("motion-pulse");
    });
});