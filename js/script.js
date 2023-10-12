document.addEventListener("DOMContentLoaded", async () => {
    const age = document.getElementById("ageSpan");
    age.textContent = `${calculateAge()} years old.`;
})

function calculateAge(){
    const birthDate = new Date("September 1, 2004");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate)){
        age--;
    }

    return age;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}

window.addEventListener('scroll', function () {
    var scrollTopButton = document.querySelector('.scroll-top');
    if (this.window.pageYOffset > 200) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});