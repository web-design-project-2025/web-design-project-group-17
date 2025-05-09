// https://chatgpt.com/c/681a0797-0bd8-8005-bef2-bac7fa8cc2e1

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('createAccountBtn');

  button.addEventListener('click', function () {
    const nameInput = document.getElementById('name');
    const username = nameInput.value.trim();

    if (username) {
        const newUser = {
            "username": username,
            "user_id": 999999999999999999,
            "profile_image": "https://cdn.builder.io/api/v1/image/assets/TEMP/e928721a5e5e26117780b1b50957820d5e0c4e35?placeholderIfAbsent=true&apiKey=cef4ce64bbb94ea5bb23dd516ff3ed8a",
        }
        localStorage.setItem("user", JSON.stringify(newUser))

        window.location.href = 'profile.html'; // Go to profile
    } else {
      alert('Please enter your name.');
    }
  });
});