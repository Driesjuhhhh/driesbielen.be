document.addEventListener("DOMContentLoaded", async () => {
    const age = document.getElementById("ageSpan");
    age.textContent = `${calculateAge()} years old.`;
    console.log("Welcome in console land");
    console.log("This is a custom made website based on code of ASMR Prog");
    console.log("I added some stuff and removed some stuff");
    console.log("Have fun in inspector land");
})

function calculateAge(){
    const birthDate = new Date("September 1, 2004");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate)){
        age--;
    }

    var dd = today.getDate();
    var mm = today.getMonth() + 1;
  
    // Yes this is code that only is needed one day of the year
    if(dd === 1 && mm === 9) {
        document.getElementById("birthdayText").innerText = "It is my birthday today";
    }
    return age;
}