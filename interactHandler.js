

const workArea = document.getElementById('work-area');
const widthInput = document.getElementById('width-input');
const heightInput = document.getElementById('height-input');

function setupInteract(imageElement) {
    interact(imageElement)
        .draggable({

            modifiers: [
                interact.modifiers.restrict({
                    restriction: workArea,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                    endOnly: true
                })
            ],

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
            modifiers: [
                interact.modifiers.restrictSize({
                    max: { width: 594, height: 840 },
                }),
                interact.modifiers.restrictEdges({
                    outer: workArea,
                }),
            ],
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

                widthInput.value = Math.round(event.rect.width);
                heightInput.value = Math.round(event.rect.height);



            }
        });
    widthInput.addEventListener('input', function () {
        const newWidth = parseFloat(widthInput.value);
        const aspectRatio = imageElement.width / imageElement.height;

        imageElement.style.width = newWidth + 'px';
        imageElement.style.height = (newWidth / aspectRatio) + 'px';

        heightInput.value = (newWidth / aspectRatio);

    });

    heightInput.addEventListener('input', function () {
        const newHeight = parseFloat(heightInput.value);
        const aspectRatio = imageElement.width / imageElement.height;

        imageElement.style.height = newHeight + 'px';
        imageElement.style.width = (newHeight * aspectRatio) + 'px';

        widthInput.value = (newHeight / aspectRatio);

    });
}

export { setupInteract };