window.addEventListener("pageshow", () => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        window.location.replace("login.html");
    }
});