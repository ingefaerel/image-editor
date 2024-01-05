
import { setupInteract } from './interactHandler.js';

const fileInput = document.getElementById('file-input');
const imageContainer = document.getElementById('image-container');
const widthInput = document.getElementById('width-input');
const heightInput = document.getElementById('height-input');



function clearDimensionsInput() {
    widthInput.value = null;
    heightInput.value = null;
}

function createImageElement(imageUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imageElement);
    return imageElement;
}

function handleUpload() {
    const file = fileInput.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        const imageElement = createImageElement(imageUrl);
        setupInteract(imageElement);
    } else {
        alert('Please select a valid image file.');
    }
}

function handleClear() {
    imageContainer.innerHTML = ''; // Clear the image container

    fileInput.value = null;

    clearDimensionsInput();
}


export { handleUpload, handleClear };