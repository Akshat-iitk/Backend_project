function showPassword() {
  const passwordInput = document.getElementById("password");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}
function checkShowPassword() {
  const passwordInput = document.getElementById("password");
  passwordInput.type = "password";
  const showPasswordCheckbox = document.getElementById("show_Password");
  if (showPasswordCheckbox.checked) {
    showPasswordCheckbox.checked = false;
  }
}
function removecheck() {
  const showPasswordCheckbox = document.getElementById("show_Password");
  if (showPasswordCheckbox.checked) {
    showPasswordCheckbox.checked = false;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".logo img").classList.add("show");
  }, 500); // Adjust the delay (in milliseconds) as needed
});
document.getElementById('password').addEventListener('input', function () {
    var password = document.getElementById('password').value;
    var strengthBar = document.getElementById('strength-bar');
    var strengthText = document.getElementById('strength-text');
    
    var strength = 0;
    
    if (password.match(/[a-zA-Z0-9]+/)) {
      strength += 1;
    }
    
    if (password.match(/[~!@#$%^&*()_+{}[\]:;<>,.?/\\-]+/)) {
      strength += 1;
    }
    
    if (password.length >= 8) {
      strength += 1;
    }
    
    // Update the strength bar and text based on strength
    if (strength == 1) {
      strengthBar.style.width = '33%';
      strengthBar.style.backgroundColor = 'red';
      strengthText.innerText = 'Weak';
    } else if (strength == 2) {
      strengthBar.style.width = '66%';
      strengthBar.style.backgroundColor = 'orange';
      strengthText.innerText = 'Moderate';
    } else if (strength == 3) {
      strengthBar.style.width = '100%';
      strengthBar.style.backgroundColor = 'green';
      strengthText.innerText = 'Strong';
    } else {
      strengthBar.style.width = '0%';
      strengthBar.style.backgroundColor = '';
      strengthText.innerText = '';
    }
  });
  document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById('typingText');
    const textContent = 'Craze';
    let index = 0;
    let direction = 1; // 1 for forward, -1 for backward

    function updateText() {
      textElement.textContent = textContent.slice(0, index);
    }

    function animateText() {
      index += direction;
      updateText();

      if (index === 0 || index === textContent.length) {
        setTimeout(() => {
          direction *= -1;
          animateText();
        }, 2000); // Add a 1-second pause between forward and backward transition
      } else {
        setTimeout(animateText, 150); // Adjust the typing speed (in milliseconds) as needed
      }
    }

    animateText();
  });
