const modalSelect = document.querySelector(".menucache")
const triage1 = document.querySelector(".test1")
const triage2 = document.querySelector(".test2")
const triage3 = document.querySelector(".test3")

function closed() {
    modalSelect.style.display = "none";
}


function displayUnroll() {
    if (modalSelect.style.display == "flex") {
        modalSelect.style.animationName = "closeModale";
        triage1.style.animationName = "closeModale2";
        triage2.style.animationName = "closeModale2";
        triage3.style.animationName = "closeModale2";
        setTimeout(closed, 500)                
    } else {
        modalSelect.style.display = "flex";
        console.log("ouverture")
        modalSelect.style.animationName = "modale";
        triage1.style.animationName = "modaleX";
        triage2.style.animationName = "modaleX";
        triage3.style.animationName = "modaleX";
        
    }
}



    