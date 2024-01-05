

const countButton = document.getElementById('count-button');
const workAreaPixels = 594 * 840;



function countColoredPixels(imageElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let coloredPixels = 0;
    // Set canvas dimensions to match the image
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    // Draw the image onto the canvas
    context.drawImage(imageElement, 0, 0);

    // Get the image data
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Iterate through the pixels and count the colored ones

    for (let i = 0; i < imageData.data.length; i += 4) {
        // Check if the pixel is colored (not fully transparent)
        if (imageData.data[i + 3] > 0) {
            coloredPixels++;
        }
    }

    // Log or use the coloredPixels count as needed
    console.log('Number of colored pixels:', coloredPixels);



}

countButton.addEventListener('click', function () {
    const imageElement = document.querySelector('#image-container img');
    if (imageElement) {
        countColoredPixels(imageElement);
    } else {
        alert('Please upload an image first.');
    }

});


