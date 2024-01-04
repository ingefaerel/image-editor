function handleUpload() {
    const fileInput = document.getElementById('file-input');
    const imageContainer = document.getElementById('image-container');
    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');

    const file = fileInput.files[0];

    if (file) {
        const imageUrl = URL.createObjectURL(file);

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(imageElement);

        interact(imageElement)
            .draggable({
                onmove: function (event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                onmove: function (event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0);
                    var y = (parseFloat(target.getAttribute('data-y')) || 0);

                    // Calculate the aspect ratio
                    var aspectRatio = target.offsetWidth / target.offsetHeight;

                    // Update the element's width and height based on the aspect ratio
                    target.style.width = event.rect.width + 'px';
                    target.style.height = (event.rect.width / aspectRatio) + 'px';


                    // Translate the element based on the change in width and height
                    x += event.deltaRect.left;
                    y += event.deltaRect.top;

                    target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            });
        widthInput.addEventListener('input', function () {
            const newWidth = parseFloat(widthInput.value);
            const aspectRatio = imageElement.width / imageElement.height;
            imageElement.style.width = newWidth + 'px';
            imageElement.style.height = (newWidth / aspectRatio) + 'px';
        });

        heightInput.addEventListener('input', function () {
            const newHeight = parseFloat(heightInput.value);
            const aspectRatio = imageElement.width / imageElement.height;
            imageElement.style.height = newHeight + 'px';
            imageElement.style.width = (newHeight * aspectRatio) + 'px';
        });
    } else {
        alert('Please select a valid image file.');
    }
}

function handleClear() {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Clear the image container

    const fileInput = document.getElementById('file-input');
    const newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    newFileInput.id = 'file-input';

    // Replace the existing file input with the new one
    fileInput.parentNode.replaceChild(newFileInput, fileInput);

    // Add event listener to the new file input
    newFileInput.addEventListener('change', handleUpload);
}

document.getElementById('file-input').addEventListener('change', handleUpload);
document.getElementById('clear-button').addEventListener('click', handleClear);