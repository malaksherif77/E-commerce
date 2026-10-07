const signupForm = document.getElementById("signup-form");


  const emailError = document.getElementById("signup-email-error");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordError = document.getElementById("signup-password-error");
  const confirmPassError = document.getElementById("signup-confirm-error");
  const formError = document.getElementById("signup");
  const emailInput=document.getElementById("signup-email");
  const passwordInput=document.getElementById("signup-password");
  const confirmPassInput=document.getElementById("signup-confirm");

function signup(){

  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm").value.trim();

  
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPassError.textContent = "";
  let isValid = true;


  if(email === ""){
    emailInput.classList.add('invalid');
    emailError.textContent = "!email is required"; 
   isValid = false;
  }else if (!emailPattern.test(email)){
    emailInput.classList.add('invalid');
    emailError.textContent = "!Invalid Email"; 
   isValid = false;
  }
  else{
    emailInput.classList.remove('invalid');
  }

  if (password.trim() === "") {
    passwordInput.value="";
    passwordInput.classList.add('invalid');
    passwordError.textContent = "!Password is required";
    isValid = false;
  } else if (password.length < 8) {
    passwordInput.classList.add('invalid');
    passwordError.textContent = "!Password must be at least 8 characters long";
    isValid = false;
  } else if(password.includes(" ")){
    passwordInput.classList.add('invalid');
    passwordError.textContent = "!Password cannot contain spaces";
    isValid = false;
  }
  else{
    passwordInput.classList.remove('invalid');
  }

  if(password !== confirmPassword && confirmPassword !== ""){
    confirmPassInput.classList.add('invalid');
    confirmPassError.textContent = "!Passwords dont match";
    isValid = false;
  }
  else if(confirmPassword==""){
    confirmPassInput.classList.add('invalid');
    confirmPassInput.value="";
    confirmPassError.textContent="!Confirm Password is required"
  }
  else{
    confirmPassInput.classList.remove('invalid');
  }

  
    return isValid;
  }



signupForm.addEventListener("input", () => {
  signup();
});


signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if(!signup()){
    return;
  }

  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userExist = users.some(
    user => user.email === email 
  );

  if(userExist){
    formError.textContent = "!User already exists, please login";
    return;
  }

  const newUser = {
    id: Date.now(),
    email: email,
    password: password,
    cart: []
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "login.html";

});
// localStorage.clear()
