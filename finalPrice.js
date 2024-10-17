import { coveragePercentage } from "./count-pixels.js";
import { closestValue } from "./count-white.js";

const finalPriceDisplay = document.getElementById("final-price");
const countPriceBtn = document.getElementById("count-price");
const quantity = document.getElementById("quantity");

const discountThresholds = [
  { min: 0, max: 5, discount: 0 },
  { min: 5, max: 10, discount: 0.05 },
  { min: 10, max: 20, discount: 0.1 },
  { min: 20, max: 50, discount: 0.15 },
  { min: 50, max: 100, discount: 0.2 },
  { min: 100, max: Infinity, discount: 0.3 },
];

const highCoverageDiscounts = [
  { min: 0, max: 20, discount: 0 },
  { min: 20, max: 30, discount: 0.05 },
  { min: 30, max: 50, discount: 0.1 },
  { min: 50, max: 100, discount: 0.25 },
];

// Function to calculate discount based on quantity and coverage percentage
function getDiscount() {
  const quantityValue = parseInt(quantity.value, 10);
  const discounts =
    coveragePercentage < 50 ? discountThresholds : highCoverageDiscounts;

  const discountObj = discounts.find(
    (d) => quantityValue >= d.min && quantityValue < d.max
  );
  return discountObj ? discountObj.discount : 0;
}

// Function to calculate coverage value based on percentage
function calculateValue(percentage) {
  if (percentage >= 50 && percentage <= 100) {
    return 150 + ((percentage - 50) / 50) * (180 - 150);
  } else if (percentage > 0 && percentage < 50) {
    return 100 + (percentage / 50) * 50;
  } else if (percentage === 50) {
    return 150;
  } else if (percentage === 100) {
    return 180;
  } else {
    throw new Error("Percentage must be between 1 and 100");
  }
}

// Function to calculate the final price
function countPrice() {
  const imageElement = document.querySelector("#image-container img");

  // Return early if no image is selected
  if (!imageElement) {
    finalPriceDisplay.innerText = "Please select an image";
    return;
  }

  const coveragePrice = calculateValue(coveragePercentage);
  const whiteCoeff = coveragePercentage > 10 ? 1.5 : 1.9;
  const discount = getDiscount();

  let finalPrice;

  if (closestValue === 0) {
    finalPrice = Math.round(coveragePrice);
  } else {
    const whitePrice = coveragePrice * (closestValue / whiteCoeff / 100);
    finalPrice = Math.round(coveragePrice + whitePrice);
  }

  // Apply discount
  finalPrice = finalPrice * (1 - discount);

  finalPriceDisplay.innerText = Math.round(finalPrice); // Display price with 2 decimals
}

// Event listener to trigger price calculation
countPriceBtn.addEventListener("click", countPrice);
