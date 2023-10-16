document.addEventListener("DOMContentLoaded", async () => {
    console.log("Welcome in console land");
    console.log("This is a custom made website based on code of ASMR Prog");
    console.log("I added some stuff and removed some stuff");
    console.log("Have fun in inspector land");
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}

window.addEventListener("scroll", function () {
    var scrollTopButton = document.querySelector(".scroll-top");
    if (this.window.pageYOffset > 200) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
});

window.addEventListener("scroll", function () {
    var rightTopIcon = document.querySelector(".right-top-icon");
    if (this.window.pageYOffset > 700) {
        rightTopIcon.style.display = "none";
    } else {
        rightTopIcon.style.display = "block";
    }
});
