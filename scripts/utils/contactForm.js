function displayModal() {
    const modalForm = document.getElementById("contact_modal");
	modalForm.style.display = "block";
}

function closeModal() {
    const modalForm = document.getElementById("contact_modal");
    modalForm.style.display = "none";
}

document.addEventListener("keydown", myFunction);

function myFunction(e) {
    switch (e.keyCode) {
        case 27:
            closeModal();
        break;
    }
}