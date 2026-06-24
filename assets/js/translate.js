// ─────────────────────────────
// TRADUCTION FR / EN - CORPO!
// ─────────────────────────────

document.body.insertAdjacentHTML("beforeend", `
    <div id="langSwitcher">
        <button type="button" onclick="setLang('fr')">🇫🇷 FR</button>
        <button type="button" onclick="setLang('en')">🇬🇧 EN</button>
    </div>

    <div id="google_translate_element"></div>
`);

const style = document.createElement("style");
style.innerHTML = `
#langSwitcher{
    position:fixed;
    bottom:20px;
    right:20px;
    z-index:99999;

    display:flex;
    gap:8px;
}

#langSwitcher button{
    border:none;
    border-radius:16px;

    padding:11px 15px;

    background:white;
    color:#ff3131;

    font-family:Poppins,sans-serif;
    font-size:15px;
    font-weight:800;

    cursor:pointer;

    box-shadow:0 8px 25px rgba(0,0,0,.18);

    transition:.25s;
}

#langSwitcher button:hover{
    transform:translateY(-2px);
}

#google_translate_element{
    position:absolute;
    left:-9999px;
    opacity:0;
    pointer-events:none;
}

/* Cache la barre Google en haut */
iframe.goog-te-banner-frame,
.goog-te-banner-frame,
.skiptranslate iframe{
    display:none!important;
    visibility:hidden!important;
    height:0!important;
}

body{
    top:0!important;
    position:static!important;
}

/* Cache éléments Google */
.goog-logo-link,
.goog-te-gadget span,
.goog-te-gadget-icon{
    display:none!important;
}

.goog-te-gadget{
    font-size:0!important;
}

@media(max-width:768px){
    #langSwitcher{
        bottom:15px;
        right:15px;
    }

    #langSwitcher button{
        padding:10px 13px;
        font-size:14px;
        border-radius:14px;
    }
}
`;
document.head.appendChild(style);

// ─────────────────────────────
// INITIALISATION GOOGLE TRANSLATE
// ─────────────────────────────

window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
        pageLanguage: "fr",
        includedLanguages: "fr,en",
        autoDisplay: false
    }, "google_translate_element");
};

const script = document.createElement("script");
script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(script);

// ─────────────────────────────
// CHANGER DE LANGUE
// ─────────────────────────────

function setLang(lang) {
    const select = document.querySelector(".goog-te-combo");

    if (!select) {
        setTimeout(() => setLang(lang), 500);
        return;
    }

    select.value = lang;
    select.dispatchEvent(new Event("change"));
}

// ─────────────────────────────
// NETTOYAGE BARRE GOOGLE
// ─────────────────────────────

function cleanGoogleBar() {
    document.body.style.top = "0px";

    document.querySelectorAll("iframe").forEach(frame => {
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
}

setInterval(cleanGoogleBar, 500);