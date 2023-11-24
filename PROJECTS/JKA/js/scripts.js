document.addEventListener("DOMContentLoaded", () => {
  console.log("This site is programmed by Dries Bielen");
  console.log("https://driesbielen.be");
  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();

 setCurrentYear();
});

function setCurrentYear() {
  var currentYear = new Date().getFullYear();
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = "© " + currentYear + " JKA Events";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var header = document.getElementById("main-header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      header.classList.add("nav-scroll");
    } else {
      header.classList.remove("nav-scroll");
    }
  });
});
