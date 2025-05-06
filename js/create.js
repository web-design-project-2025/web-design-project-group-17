// https://chatgpt.com/c/681a0797-0bd8-8005-bef2-bac7fa8cc2e1

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('createAccountBtn');

  button.addEventListener('click', function () {
    const nameInput = document.getElementById('name');
    const username = nameInput.value.trim();

    if (username) {
      localStorage.setItem('username', username); // Save name
      window.location.href = 'profile.html'; // Go to profile
    } else {
      alert('Please enter your name.');
    }
  });
});