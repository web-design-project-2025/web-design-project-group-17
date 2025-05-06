// https://chatgpt.com/c/681a0797-0bd8-8005-bef2-bac7fa8cc2e1

document.addEventListener('DOMContentLoaded', function () {
  const username = localStorage.getItem('username');
  if (username) {
    document.querySelector('.user-name').textContent = username;
    document.querySelectorAll('.author-name').forEach(el => el.textContent = username);
    document.querySelector('.user-handle').textContent = '@' + username.toLowerCase().replace(/\s+/g, '');
  }
});