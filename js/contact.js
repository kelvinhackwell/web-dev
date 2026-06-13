function sendMessage() {
  const first = document.getElementById("c-first").value.trim();
  const last = document.getElementById("c-last").value.trim();
  const email = document.getElementById("c-email").value.trim();
  const subject = document.getElementById("c-subject").value;
  const message = document.getElementById("c-message").value.trim();

  if (!first || !last || !email || !subject || !message) {
    alert("Please fill in all fields before sending.");
    return;
  }

  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);

  document.getElementById("c-first").value = "";
  document.getElementById("c-last").value = "";
  document.getElementById("c-email").value = "";
  document.getElementById("c-subject").value = "";
  document.getElementById("c-message").value = "";
}
