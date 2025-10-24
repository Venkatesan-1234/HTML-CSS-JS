var input=document.getElementById("input-name");
var result=document.getElementById("result");
var randomnumber=Math.floor(Math.random()*10);
var noattempts=document.getElementById("try");
var design=document.getElementById("color");
var output=0;
function change() {
    design.style.backgroundColor="pink";
    var finalinput=input.value;
    if (finalinput==randomnumber) {
        result.textContent="Right";
        alert("You won");
        output+=1;
        noattempts.textContent="Attempts"+output
    }
    else {
        result.textContent="Wrong";
        output+=1;
        noattempts.textContent="Attempts:"+output
    }
}
