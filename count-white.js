const slider = document.getElementById("white-count");
const valueDisplay = document.getElementById("value");

const stopValues = [0, 50, 75, 100, 125, 150];
let closestValue = stopValues[0];

slider.value = closestValue;
valueDisplay.textContent = `Value: ${closestValue}%`;

slider.addEventListener("input", function () {
  const value = Number(slider.value);
  closestValue = stopValues.reduce((prev, curr) => {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });
  slider.value = closestValue;
  valueDisplay.textContent = `Value: ${closestValue}%`;
});

valueDisplay.textContent = `Value: ${stopValues[0]}%`;

export { closestValue };
