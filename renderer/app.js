const sidebarElm = document.getElementById("sidebar");
const containerElm = document.getElementById("container");

document.addEventListener("DOMContentLoaded", () => {
    const checkedSidebarItem = sidebarElm.querySelector("input[name='sidebar']:checked");
    window.electronAPIs.send("request-page", checkedSidebarItem.value);

    const sidebarItemElms = sidebarElm.querySelectorAll("input[name='sidebar']");
    Array.from(sidebarItemElms).forEach(elm => {
        elm.addEventListener("change", () => window.electronAPIs.send("request-page", elm.value));
    });
});

window.electronAPIs.receive("response-page", (event, { html, js, css }) => {
    containerElm.innerHTML = html;
    const styleElm = document.createElement("style");
    styleElm.textContent = css;
    document.head.appendChild(styleElm);
    const script = document.createElement("script");
    script.textContent = js;
    document.body.appendChild(script);
});