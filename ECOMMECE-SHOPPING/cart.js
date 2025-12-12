const button = document.getElementById("roll");

button.addEventListener("click", function() {
  if (button.textContent === "Total bill: $2500" ) {
    button.textContent = "Accepted";
    button.style.backgroundColor = "#1435";
    button.style.color = "white";
  } else {
    button.textContent = "Total bill: $2500";
    button.style.backgroundColor = "black";
    button.style.color = "white";
  }
});



