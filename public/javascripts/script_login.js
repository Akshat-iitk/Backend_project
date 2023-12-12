function showPassword() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    var eyes = document.querySelector("#eyespan") ;
    if(eyes.className==="ri-eye-line") eyes.className="ri-eye-off-line" 
    else eyes.className="ri-eye-line" 
}
function checkShowPassword() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = "password";
      const showPasswordCheckbox = document.getElementById('show_Password');
      if (showPasswordCheckbox.checked) {
        showPasswordCheckbox.checked = false;
      }
    var eyes = document.querySelector("#eyespan") ;
    if(eyes.className==="ri-eye-line") eyes.className="ri-eye-off-line"
  }
  function removecheck(){
    const showPasswordCheckbox = document.getElementById('show_Password');
      if (showPasswordCheckbox.checked) {
        showPasswordCheckbox.checked = false;
      }
  }
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      document.querySelector(".logo img").classList.add("show");
    }, 500); // Adjust the delay (in milliseconds) as needed
  });
