window.onload = function() {

    var image = new Image();

    init();

    function init() {
        getLoadButton().addEventListener('click', loadFile);
        getExportButton().addEventListener('click', exportImage);
        getImportButton().addEventListener('click', importJSON);

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

    function getExportButton() {
        return document.getElementById('export');
    }

    function getLoadButton() {
        return document.getElementById('load');
    }

    function getImageDataLink() {
        return document.getElementById('imageData');
    }

    function getImportButton() {
        return document.getElementById('import');
    }

    function getPixel(x, y) {
        var pixelData = getCanvasContext().getImageData(x, y, 1, 1).data;
        var red = pixelData[0];
        var green = pixelData[1];
        var blue = pixelData[2];
        return [red, green, blue];
    }

    function getRow(y) {
        var row = [];
        for (var x = 0; x < image.width; x++) {
            row.push(getPixel(x, y));
        }
        return row;
    }

    function getImageData() {
        var data = [];
        for (var y = 0; y < image.height; y++) {
            data.push(getRow(y));
        }
        return data;
    }

    function exportImage() {
        var imageData = JSON.stringify(getImageData());

        var link = getImageDataLink();
        link.setAttribute('href', 'data:application/octet-stream;charset=utf-8;base64,' + btoa(imageData));
        link.click();
    }

    function importJSON() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', getFileInput().value, false);
        xhr.send();

        if (xhr.status === 200) {
            loadFromJSON(xhr.responseText);
        }
    }

    function loadFromJSON(imageJSON) {
        var imageData = JSON.parse(imageJSON);
        for (var rowIndex = 0; rowIndex< imageData.length; rowIndex++) {
            var row = imageData[rowIndex];

            for (var colIndex = 0; colIndex < row.length; colIndex++) {
                var pixel = row[colIndex];

                var red = adjustColor(pixel[0].toString(16));
                var green = adjustColor(pixel[1].toString(16));
                var blue = adjustColor(pixel[2].toString(16));

                getCanvasContext().fillStyle = '#' + red + green + blue;
                getCanvasContext().fillRect(colIndex, rowIndex, 1, 1);
            }
        }
    }

    function adjustColor(color) {
        return color.length === 1 ? '0' + color : color;
    }
};