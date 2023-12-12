document.querySelector("#uploadicon").addEventListener("click", function () {
  document.querySelector("#forminput").click();
});
document.querySelector("#forminput").addEventListener("change", function () {
  document.querySelector("#uploadform").submit();
});
