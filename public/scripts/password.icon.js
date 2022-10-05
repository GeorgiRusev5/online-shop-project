const showPasswordElement = document.querySelector("#show-password");
const PasswordFieldElement = document.querySelector("#password");
const showConfirmedPasswordElement = document.querySelector("#show-confirmed-password");
const confirmedPasswordFieldElement = document.querySelector("#confirmPassword");

showPasswordElement.addEventListener("mousedown", function () {
    showPasswordElement.classList.remove("fa-eye");
    showPasswordElement.classList.add("fa-eye-slash");
    PasswordFieldElement.setAttribute("type", "text");
  });
  
  showPasswordElement.addEventListener("mouseup", function () {
    showPasswordElement.classList.remove("fa-eye-slash");
    showPasswordElement.classList.add("fa-eye");
    PasswordFieldElement.setAttribute("type", "password");
  });

showConfirmedPasswordElement.addEventListener("mousedown", function ( ) {
  showConfirmedPasswordElement.classList.remove("fa-eye");
  showConfirmedPasswordElement.classList.add("fa-eye-slash");
  confirmedPasswordFieldElement.setAttribute("type", "text");
});

showConfirmedPasswordElement.addEventListener("mouseup", function () {
  showConfirmedPasswordElement.classList.remove("fa-eye-slash");
  showConfirmedPasswordElement.classList.add("fa-eye");
  confirmedPasswordFieldElement.setAttribute("type", "password");
});
