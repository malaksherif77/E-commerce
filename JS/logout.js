const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault(); 

    localStorage.removeItem("currentUser");
  
    window.location.href = "index.html";
});