const workArea = document.getElementById("work-area");
const widthInput = document.getElementById("width-input");
const heightInput = document.getElementById("height-input");
const rotateButton = document.getElementById("rotate-button");

function setupInteract(imageElement) {
  if (imageElement.complete) {
    initializeInteraction();
  } else {
    imageElement.onload = function () {
      initializeInteraction();
    };
  }

  let coorW = 594;
  let coorH = 841;
  let rotation = 0;

  function initializeInteraction() {
    const originalWidth = imageElement.naturalWidth;
    const originalHeight = imageElement.naturalHeight;
    const aspectRatio = originalWidth / originalHeight;

    function updateDimensions(originalWidth, originalHeight) {
      let width = originalWidth;
      let height = originalHeight;

      if (width > 594 || height > 841) {
        if (width / 594 > height / 841) {
          width = 594;
          height = width / aspectRatio;
        } else {
          height = 841;
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

          if (rotation === 90 || rotation === 270) {
            target.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
          } else {
            target.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
          }

          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        },
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
          interact.modifiers.restrictSize({
            max: { width: coorW, height: coorH },
          }),
          interact.modifiers.restrictEdges({
            outer: workArea,
          }),
        ],
        onmove: function (event) {
          const target = event.target;
          let x = parseFloat(target.getAttribute("data-x")) || 0;
          let y = parseFloat(target.getAttribute("data-y")) || 0;

          // console.log(coorW, coorH);
          // console.log(rotation);
          let newWidth, newHeight;

          if (rotation === 90 || rotation === 270) {
            newHeight = event.rect.width;
            newWidth = newHeight * aspectRatio;
          } else {
            newWidth = event.rect.width;
            newHeight = newWidth / aspectRatio;
          }

          target.style.width = `${newWidth}px`;
          target.style.height = `${newHeight}px`;

          target.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
          x += event.deltaRect.left;
          y += event.deltaRect.top;
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
        const newWidth = newHeight * aspectRatio;

        imageElement.style.height = newHeight + "px";
        imageElement.style.width = newWidth + "px";

        widthInput.value = Math.round(newWidth / 2);
      } else {
        widthInput.value = "";
      }
    });

    rotateButton.addEventListener("click", function () {
      let x = parseFloat(imageElement.getAttribute("data-x"));
      let y = parseFloat(imageElement.getAttribute("data-y"));
      rotation = (rotation + 90) % 360;

      if (rotation === 90 || rotation === 270) {
        coorW = 841;
        coorH = 594;
        imageElement.style.maxWidth = "841px";
        imageElement.style.maxHeight = "594px";
      } else {
        coorW = 594;
        coorH = 841;
        imageElement.style.maxWidth = "594px";
        imageElement.style.maxHeight = "841px";
      }

      imageElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    });
  }
}

export { setupInteract };
