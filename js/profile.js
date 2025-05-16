// https://chatgpt.com/c/681a0797-0bd8-8005-bef2-bac7fa8cc2e1

document.addEventListener('DOMContentLoaded', function () {
  const userData = localStorage.getItem('user');
  if (userData)
  {
    const user = JSON.parse(userData);

    if (user.username) {
        document.querySelector('.user-name').textContent = user.username;
        document.querySelectorAll('.author-name').forEach(el => el.textContent = user.username);
        document.querySelector('.user-handle').textContent = '@' + user.username.toLowerCase().replace(/\s+/g, '');
    }
  }
  else{
        const message = 'I poop on your bed'
        document.querySelector('.user-name').textContent = message;
        document.querySelectorAll('.author-name').forEach(el => el.textContent = message);
        document.querySelector('.user-handle').textContent = '@' + message.toLowerCase().replace(/\s+/g, '');
  }
});

/*pop-up functionality*/

function openModal() {
  document.getElementById("imageModal").style.display = "block";
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("imageModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

/* session storage and local storage inspired by https://youtu.be/MOd5cTJ6kaA */

/* Storage e-mail */

  const savedEmail = localStorage.getItem("userEmail");
  if (savedEmail) {
    document.getElementById("emailDisplayText").textContent = savedEmail;
  }

function enableEmailEdit() {
  const savedEmail = localStorage.getItem("userEmail") || "";
  document.getElementById("emailEditInput").value = savedEmail;
  document.getElementById("emailEditSection").style.display = "block";
}

function saveEmail() {
  const newEmail = document.getElementById("emailEditInput").value;
  if (newEmail) {
    localStorage.setItem("userEmail", newEmail);
    document.getElementById("emailDisplayText").textContent = newEmail;
    document.getElementById("emailEditSection").style.display = "none";
    alert("Email updated!");
  } else {
    alert("Please enter a valid email.");
  }
}