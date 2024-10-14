import { coveragePercentage } from "./count-pixels.js";
import { closestValue } from "./count-white.js";

const finalPriceDisplay = document.getElementById("final-price");
const countPriceBtn = document.getElementById("count-price");
const quantity = document.getElementById("quantity");

// const fullCoveragePrice = 180; // No white mask eg. black
// const minimumPrice = 50;
let discount = 0;
function countDiscount() {
  if (coveragePercentage < 50) {
    switch (true) {
      case quantity.value < 5:
        discount = 0;
        break;
      case quantity.value >= 5 && quantity.value < 10:
        discount = 0.05; // 5%
        break;
      case quantity.value >= 10 && quantity.value < 20:
        discount = 0.1; // 10%
        break;
      case quantity.value >= 20 && quantity.value < 50:
        discount = 0.15; // 15%
        break;
      case quantity.value >= 50 && quantity.value < 100:
        discount = 0.2; // 20%
        break;
      case quantity.value >= 100:
        discount = 0.3; // 25%
        break;
      default:
        discount = 0;
    }
  } else {
    switch (true) {
      case quantity.value < 20:
        discount = 0;
        break;
      case quantity.value >= 20 && quantity.value < 30:
        discount = 0.05; // 5%
        break;
      case quantity.value >= 30 && quantity.value < 50:
        discount = 0.1; // 10%
        break;
      case quantity.value >= 100:
        discount = 0.25; // 25%
        break;
      default:
        discount = 0;
    }
  }
}

function calculateValue(percentage) {
  let value;

  if (percentage >= 50 && percentage <= 100) {
    value = 150 + ((percentage - 50) / 50) * (180 - 150);
  } else if (percentage > 0 && percentage < 50) {
    value = 100 + (percentage / 50) * 50;
  } else if (percentage === 50) {
    value = 150;
  } else if (percentage === 100) {
    value = 180;
  } else {
    throw new Error("Percentage must be between 1 and 100");
  }

  return value;
}

function countPrice() {
  const imageElement = document.querySelector("#image-container img");
  let finalPrice;
  let whiteCoeff = coveragePercentage > 10 ? 1.5 : 1.9;

  if (imageElement) {
    const coveragePrice = calculateValue(coveragePercentage);
    console.log(coveragePercentage);
    console.log(whiteCoeff);
    countDiscount();

    if (closestValue == 0) {
      finalPrice = Math.round(coveragePrice);
    } else {
      const whitePrice = coveragePrice * (closestValue / whiteCoeff / 100);
      finalPrice = Math.round(coveragePrice + whitePrice);
    }

    finalPriceDisplay.innerText = finalPrice;
  } else {
    finalPriceDisplay.innerText = "Please select an image";
  }
}

countPriceBtn.addEventListener("click", countPrice);
