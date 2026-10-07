const loginForm = document.getElementById("login-form");

const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");

const emailError = document.getElementById("login-email-error");
const passwordError = document.getElementById("login-password-error");
const formError = document.getElementById("login-form-error");




function validateLogin() {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

  
    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;



    if (email === "") {
        emailInput.classList.add('invalid');
        emailError.textContent = "!Email is required";
        isValid = false;
    }
    else{
        emailInput.classList.remove('invalid');
    }


    if (password === "") {
        passwordInput.value="";
        
         passwordInput.classList.add('invalid');
        passwordError.textContent = "!Password is required";
        isValid = false;
    }
   else{
        passwordInput.classList.remove('invalid');
    }


    return isValid;
}


loginForm.addEventListener("input", () => {

    validateLogin();

});


loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const currentUser = localStorage.getItem("currentUser");

    if(currentUser){
        formError.textContent="You are already logged in!"
        //alert("You are already logged in");
        window.location.href = "home.html";
        return;
    }

   
    if (!validateLogin()) {
        return;
    }

    formError.textContent = "";


    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {

        formError.textContent =
            "!Invalid email or password";

        return;
    }


    localStorage.setItem(
        "currentUser",
        String(user.id)
    );


    alert("Login successful");


    window.location.href = "home.html";

});