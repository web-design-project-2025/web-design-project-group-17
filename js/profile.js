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