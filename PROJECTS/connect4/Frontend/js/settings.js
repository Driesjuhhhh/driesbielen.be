document.addEventListener("DOMContentLoaded", () => {
    //helpbutton maken
    const helpButton = document.getElementById("helpButton");
    helpButton.addEventListener("click", showHelp);
    //helpbutton end
    const colorButton = document.getElementById("setupColor");
    colorButton.addEventListener("click", setColor);
});


async function showHelp() {
    const help = document.getElementById("help");
    if (help.style.visibility === "hidden"){
        help.style.visibility = "visible";
    } else {
        help.style.visibility = "hidden";
    }
}

function setColor(){
    const color1  = document.getElementById("colorSelect").value;
    const color2 = document.getElementById("colorSelect2").value;
    const errormessagebox = document.getElementById("errorMessage");
    const succesmessagebox = document.getElementById("succesMessage");

    if (color1 == color2){
        succesmessagebox.classList.add("d-none");
        errormessagebox.classList.remove("d-none");
    }
    else{
        succesmessagebox.classList.remove("d-none");
        errormessagebox.classList.add("d-none");

        localStorage.setItem("player1-color", color1);
        localStorage.setItem("player2-color", color2);

    }
}

