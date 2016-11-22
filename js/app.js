window.onload = function() {

    var image = new Image();

    init();

    function init() {
        getFileInput().addEventListener('keyup', loadFile);

        image.onload = onImageLoad;
    }

    function loadFile() {
        image.src = 'img/' + getFileInput().value;
    }

    function onImageLoad() {
        getCanvasContext().drawImage(image, 0, 0);
    }

    function getFileInput() {
        return document.getElementById('file');
    }

    function getCanvasContext() {
        return document.getElementById('canvas').getContext('2d');
    }
};