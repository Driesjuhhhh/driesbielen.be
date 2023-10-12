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