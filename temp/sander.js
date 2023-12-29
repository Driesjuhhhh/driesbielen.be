const input = document.querySelector("input");
const button = document.querySelector("button");
const loading = document.querySelector(".loading");
const getal = document.querySelector(".getal");

button.addEventListener("click", function() {
  loading.style.display = "block";

  // Simuleer het laden van de gedachten
  setTimeout(function() {
    getal.style.display = "block";
    getal.querySelector("span").textContent = input.value;

    // Verwijder de overige elementen
    loading.style.display = "none";
    input.style.display = "hidden";
    button.style.display = "hidden";
  }, 5000);
});