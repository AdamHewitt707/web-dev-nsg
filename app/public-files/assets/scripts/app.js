/* Navbar Dropdown function */

function showGoalsMenu() {
    document.getElementById('myDropdown').classList.toggle('show');
}

window.onclick = function(e){
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById('myDropdown');
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

/* Navbar Dropdown function */

/* Loading content with json */

let headerElement = document.querySelector("#header");
let localJsonFile = "content.json";

document.addEventListener("DOMContentLoaded", () => {
    fetch(localJsonFile)
    .then (response => response.json())
    .then (responseData => {
        for (item of responseData){

            //stuff here
            
        }
    })
    .catch(error => console.error("Error fetching JSON data:", error));
})

/* Loading content with json */