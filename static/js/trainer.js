document.getElementById("trainerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  // Placeholder for real form submission logic
  const messageBox = document.getElementById("formMessage");
  messageBox.textContent = "Your application has been submitted!";
  form.reset();
});
