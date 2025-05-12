/*dark and light mode functionality*/

/* document.addEventListener("DOMContentLoaded", () => {
  const darkButton = document.getElementById("dark-button");
  const lightButton = document.getElementById("light-button");

  const applyMode = (mode) => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(mode);
    localStorage.setItem("theme", mode);
  };

  darkButton.addEventListener("click", () => applyMode("dark"));
  lightButton.addEventListener("click", () => applyMode("light"));

  // Load the dark or light mode
  const savedTheme = localStorage.getItem("theme") || "light";
  applyMode(savedTheme);
}); */

document.addEventListener("DOMContentLoaded", () => {
  const darkButton = document.getElementById("dark-button");
  const lightButton = document.getElementById("light-button");

  const applyMode = (mode) => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(mode);
    localStorage.setItem("theme", mode);
  };

  if (darkButton && lightButton) {
    darkButton.addEventListener("click", () => applyMode("dark"));
    lightButton.addEventListener("click", () => applyMode("light"));
  } else {
    console.warn("Dark or Light button not found in the DOM.");
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyMode(savedTheme);
});
