document.addEventListener("DOMContentLoaded", () => {
    window.electronAPIs.send("navigate-to", { page: "robot-page" });
});