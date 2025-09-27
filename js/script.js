//get current year
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

//Navigation toggle
const navOpen = document.getElementById("show");
const navClose = document.getElementById("close");
const navBar = document.getElementById("nav");

//button states
navClose.style.display = "none";
navOpen.style.display = "block";

//Toggle nav-bar
function toggleNav(){
    navClose.style.display = "block";
    navOpen.style.display = "none";
    navBar.style.display = "grid";
}

//close nav-bar
function closeNav(){
    navClose.style.display = "none";
    navOpen.style.display = "block";
    navBar.style.display = "none";
}