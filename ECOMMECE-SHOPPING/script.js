var sidenav=document.querySelector(".side-navbar")

function shownavbar() {
    sidenav.style.left="0";
}

function closenavbar() {
    sidenav.style.left="-60%";
}


const button = document.getElementById("subscribebtn");

button.addEventListener("click", function() {
  if (button.textContent === "Subscribe") {
    button.textContent = "Subscribed";
    button.style.backgroundColor = "#4CAF50"; // Green color
    button.style.color = "white";
  } else {
    button.textContent = "Subscribe";
    button.style.backgroundColor = "black";
    button.style.color = "white";
  }
});

const result = document.getElementById("one");

button.addEventListener("click", function() {
    if (result.textContent==="Shop") {
        result.textContent = "Subscribed";
        result.style.backgroundColor = "#4CAF50"; // Green color
        result.style.color = "white";
    }
});