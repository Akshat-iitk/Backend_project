function showPassword() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}
function checkShowPassword() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = "password";
      const showPasswordCheckbox = document.getElementById('show_Password');
      if (showPasswordCheckbox.checked) {
        showPasswordCheckbox.checked = false;
      }
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