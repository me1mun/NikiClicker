function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";

    setTimeout(function() {
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
        modal.getElementsByClassName('modal-container')[0].style.bottom = "0";
    }, 50);
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    var modalContent = modal.getElementsByClassName('modal-container')[0];

    modalContent.style.bottom = "-100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0)";

    modalContent.addEventListener("transitionend", function() {
        modalContent.removeEventListener("transitionend", arguments.callee);
        
        modal.style.display = "none";
    });
}