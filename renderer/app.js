const sidebarElm = document.getElementById("sidebar");
const containerElm = document.getElementById("container");

window.electronAPIs.requestComponent("sidebar");
window.electronAPIs.receiveComponent((chanel, { html, js, css }) => {
    switch(chanel.toLowerCase()) {
        case "sidebar":
            console.log(html, js, css)
            break;
        default : throw new Error("Invalid component");
    };
});