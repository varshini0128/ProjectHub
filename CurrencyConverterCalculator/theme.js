// theme.js
function applyTheme() {
    const theme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-mode", theme === "dark");
}

applyTheme();

window.addEventListener("storage", function (event) {
    if (event.key === "theme") {
        applyTheme();
    }
});
