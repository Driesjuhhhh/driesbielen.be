const priveBtn = document.getElementById("priveBtn");
const schoolBtn = document.getElementById("schoolBtn");
const calendarDiv = document.getElementById("calendarDiv");

schoolBtn.addEventListener("click", function () {
    calendarDiv.innerHTML = "";
    calendarDiv.innerHTML =
        '<article class="card"><iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FBrussels&src=ZGU0NDcyMGQ3ZTMzMTgwMTI1YTEyNDQ1ZmVjMjI2MjIyOTcyNzk2OTIyYTBhMmRkNDg4ZjBhNGYyMzJmZDBmM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dTVlcTFqODkzcHNhbDJ1YWIzbGs1dHM0Yjh1YWRuMXJAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23E4C441&color=%23616161" style="border:solid 1px #777" frameborder="0" scrolling="no"></iframe></article>';
});

priveBtn.addEventListener("click", function () {
    calendarDiv.innerHTML = "";
    calendarDiv.innerHTML =
        '<article class="card"><iframe src="https://calendar.google.com/calendar/embed?src=dries.bielen10%40gmail.com&ctz=Europe%2FBrussels" style="border: 0" frameborder="0" scrolling="no"></iframe></article>';
});
