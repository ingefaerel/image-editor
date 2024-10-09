const slider = document.getElementById("white-count");
const valueDisplay = document.getElementById("value");

const stopValues = [50, 75, 100, 125, 150];
let closestValue = stopValues[0];

// Set the slider to the closest stop value
slider.addEventListener("input", function () {
  const value = Number(slider.value);
  closestValue = stopValues.reduce((prev, curr) => {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });
  slider.value = closestValue; // Set the slider to the closest value
  valueDisplay.textContent = `Value: ${closestValue}`; // Display the value
});

// Initialize display with the first stop value
valueDisplay.textContent = `Value: ${stopValues[0]}`;

export { closestValue };
