document.body.insertAdjacentHTML("beforeend", `
    <div id="google_translate_element" style="position:fixed;bottom:15px;right:15px;z-index:9999;"></div>
`);

window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
        pageLanguage: "fr",
        includedLanguages: "en,fr",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, "google_translate_element");
};

const script = document.createElement("script");
script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(script);