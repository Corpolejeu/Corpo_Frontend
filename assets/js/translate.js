// ─────────────────────────────
// TRADUCTION MULTILINGUE - CORPO!
// ─────────────────────────────

document.body.insertAdjacentHTML("beforeend", `
    <div id="langSwitcher">
        <select id="langSelect" onchange="setLang(this.value)">
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇬🇧 English</option>
            <option value="es">🇪🇸 Español</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="it">🇮🇹 Italiano</option>
        </select>
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
}

#langSelect{
    border:none;
    outline:none;

    padding:12px 16px;

    border-radius:18px;

    background:white;
    color:#ff3131;

    font-family:Poppins,sans-serif;
    font-size:14px;
    font-weight:700;

    cursor:pointer;

    box-shadow:0 8px 25px rgba(0,0,0,.18);

    transition:.25s;
}

#langSelect:hover{
    transform:translateY(-2px);
}

#google_translate_element{
    position:absolute;
    left:-9999px;
    opacity:0;
    pointer-events:none;
}

/* Cache complètement Google */
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

.goog-logo-link,
.goog-te-gadget span,
.goog-te-gadget-icon{
    display:none!important;
}

.goog-te-gadget{
    font-size:0!important;
}

/* Mobile */
@media(max-width:768px){

    #langSwitcher{
        bottom:15px;
        right:15px;
    }

    #langSelect{
        font-size:13px;
        padding:10px 14px;
        border-radius:14px;
        max-width:170px;
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
        includedLanguages: "fr,en,es,de,it",
        autoDisplay: false
    }, "google_translate_element");

};

const script = document.createElement("script");

script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

document.body.appendChild(script);

// ─────────────────────────────
// CHANGER LANGUE
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
// SUPPRESSION BARRE GOOGLE
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