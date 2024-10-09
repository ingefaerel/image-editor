const workArea = document.getElementById("work-area");
const widthInput = document.getElementById("width-input");
const heightInput = document.getElementById("height-input");

function setupInteract(imageElement) {
  if (imageElement.complete) {
    initializeInteraction();
  } else {
    imageElement.onload = function () {
      initializeInteraction();
    };
  }

  function initializeInteraction() {
    const originalWidth = imageElement.naturalWidth;
    const originalHeight = imageElement.naturalHeight;
    const aspectRatio = originalWidth / originalHeight;

    function updateDimensions(originalWidth, originalHeight) {
      let width = originalWidth;
      let height = originalHeight;

      if (width > 594 || height > 840) {
        if (width / 594 > height / 840) {
          width = 594;
          height = width / aspectRatio;
        } else {
          height = 840;
          width = height * aspectRatio;
        }
      }

      widthInput.value = Math.round(width / 2);
      heightInput.value = Math.round(height / 2);
    }

    updateDimensions(originalWidth, originalHeight);

    interact(imageElement)
      .draggable({
        modifiers: [
          interact.modifiers.restrict({
            restriction: workArea,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
            endOnly: true,
          }),
        ],

        onmove: function (event) {
          const target = event.target;
          let x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          let y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          target.style.transform = "translate(" + x + "px, " + y + "px)";
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        },
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
          const target = event.target;
          let x = parseFloat(target.getAttribute("data-x")) || 0;
          let y = parseFloat(target.getAttribute("data-y")) || 0;

          // Maintain aspect ratio
          const newWidth = event.rect.width;
          const newHeight = newWidth / aspectRatio;

          target.style.width = newWidth + "px";
          target.style.height = newHeight + "px";

          // Translate the element based on the change in width and height
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.transform = "translate(" + x + "px," + y + "px)";
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);

          if (!isNaN(newWidth) && newWidth > 0) {
            widthInput.value = Math.round(newWidth / 2);
          }
          if (!isNaN(newHeight) && newHeight > 0) {
            heightInput.value = Math.round(newHeight / 2);
          }
        },
      });

    widthInput.addEventListener("input", function () {
      const newWidth = parseFloat(widthInput.value * 2);

      if (!isNaN(newWidth) && newWidth > 0) {
        const newHeight = newWidth / aspectRatio;

        imageElement.style.width = newWidth + "px";
        imageElement.style.height = newHeight + "px";

        heightInput.value = Math.round(newHeight / 2);
      } else {
        heightInput.value = "";
      }
    });

    heightInput.addEventListener("input", function () {
      const newHeight = parseFloat(heightInput.value * 2);

      if (!isNaN(newHeight) && newHeight > 0) {
        const newWidth = newHeight / aspectRatio;

        imageElement.style.height = newHeight + "px";
        imageElement.style.width = newWidth + "px";

        widthInput.value = Math.round(newWidth / 2);
      } else {
        widthInput.value = "";
      }
    });
  }
}

export { setupInteract };
