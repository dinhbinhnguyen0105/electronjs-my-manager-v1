
document.addEventListener("DOMContentLoaded", () => {
    window.electronAPIs.send("request-data", { page: "robot-page", content: "main-content" });
    window.electronAPIs.receive("response-data", data => {
        const rootElm = document.getElementById("root");
        rootElm.innerHTML = `
            <h1>${data}</h1>
        `;
    });
});