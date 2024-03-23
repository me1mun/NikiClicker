disableContextMenu();
disableDraggable();

function disableContextMenu() {
    var images = document.querySelectorAll('img');

    images.forEach(function(image) {
        image.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
    });
}

function disableDraggable() {
    var images = document.getElementsByTagName('img');

    for(var i = 0; i < images.length; i++) {
        images[i].setAttribute('draggable', 'false');
    }
}