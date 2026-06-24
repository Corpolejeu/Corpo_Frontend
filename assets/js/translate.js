// ─────────────────────────────
// BOUTON TRADUCTION ANGLAIS
// ─────────────────────────────

document.body.insertAdjacentHTML("beforeend", `
    <div id="google_translate_element"></div>
`);

// ─────────────────────────────
// STYLE DU BOUTON
// ─────────────────────────────

const style = document.createElement("style");
style.innerHTML = `

#google_translate_element{
    position:fixed;
    bottom:20px;
    right:20px;
    z-index:99999;
}

/* Bouton principal */
.goog-te-gadget-simple{
    background:#ffffff !important;
    border:none !important;
    border-radius:18px !important;
    padding:12px 16px !important;
    box-shadow:0 8px 25px rgba(0,0,0,.15) !important;
    font-family:Poppins,sans-serif !important;
    font-size:15px !important;
    font-weight:700 !important;
}

/* Texte */
.goog-te-gadget-simple span{
    color:#ff3131 !important;
    border:none !important;
}

/* Cache l'icône Google */
.goog-te-gadget-icon{
    display:none !important;
}

/* Cache la barre Google en haut */
iframe.goog-te-banner-frame,
.goog-te-banner-frame,
.skiptranslate iframe{
    display:none !important;
    visibility:hidden !important;
    height:0 !important;
}

body{
    top:0 !important;
    position:static !important;
}

/* Mobile */
@media(max-width:768px){

    #google_translate_element{
        bottom:15px;
        right:15px;
    }

    .goog-te-gadget-simple{
        padding:10px 14px !important;
        font-size:14px !important;
        border-radius:16px !important;
    }
}

`;
document.head.appendChild(style);

// ─────────────────────────────
// GOOGLE TRANSLATE
// ─────────────────────────────

window.googleTranslateElementInit = function () {

    new google.translate.TranslateElement({
        pageLanguage: "fr",
        includedLanguages: "en",
        autoDisplay: false,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, "google_translate_element");

};

// ─────────────────────────────
// CHARGEMENT SCRIPT GOOGLE
// ─────────────────────────────

const script = document.createElement("script");
script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

document.body.appendChild(script);

// ─────────────────────────────
// SUPPRIMER LA BARRE MOCHE GOOGLE
// ─────────────────────────────

function cleanGoogleBar() {

    document.body.style.top = "0px";

    document
        .querySelectorAll("iframe")
        .forEach(frame => {

            const src = frame.src || "";

            if (
                frame.className.includes("goog-te-banner-frame") ||
                src.includes("translate.google")
            ) {
                frame.style.display = "none";
                frame.style.visibility = "hidden";
                frame.style.height = "0";
            }

        });

    const skip = document.querySelector(".skiptranslate");

    if (skip && skip.tagName !== "DIV") {
        skip.style.display = "none";
    }
}

// Vérifie régulièrement
setInterval(cleanGoogleBar, 500);