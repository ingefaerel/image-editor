

const countButton = document.getElementById('count-button');
const workAreaPixels = 594 * 840;
const coverage = document.getElementById('coverage');


function countColoredPixels(imageElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    context.drawImage(imageElement, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Iterate through the pixels and count the colored ones
    let coloredPixels = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
        // Check if the pixel is colored (not fully transparent)
        if (imageData.data[i + 3] > 0) {
            coloredPixels++;
        }
    }

    let coveragePercantage = Math.round(coloredPixels / workAreaPixels * 100);

    coverage.innerText = `The coverage is ${coveragePercantage}%`


}

countButton.addEventListener('click', function () {
    const imageElement = document.querySelector('#image-container img');
    if (imageElement) {
        countColoredPixels(imageElement);
    } else {
        alert('Please upload an image first.');
    }

});


