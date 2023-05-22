document.addEventListener("DOMContentLoaded", () => {
    showGroupPicture();
});

function showGroupPicture() {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
    const normalGroupPicture = document.getElementById('group-picture-normal');
    const newKidsGroupPicture = document.getElementById('group-picture-new-kids')

    if (randomNumber === 69) {
        newKidsGroupPicture.classList.remove('d-none'); // Remove the 'd-none' class to show the class group picture for new kids

    } else {
        normalGroupPicture.classList.remove('d-none'); // Remove the 'd-none' class to show the class group picture for normal group
    }
}