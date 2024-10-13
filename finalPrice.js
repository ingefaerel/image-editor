import { coveragePercentage } from "./count-pixels.js";
import { closestValue } from "./count-white.js";

const finalPriceDisplay = document.getElementById("final-price");
const countPriceBtn = document.getElementById("count-price");
const quantity = document.getElementById("quantity");

const fullCoveragePrice = 200; // No white mask eg. black
const minimumPrice = 100;
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

function countPrice() {
  const imageElement = document.querySelector("#image-container img");
  if (imageElement) {
    countDiscount();
    const coveragePrice = Math.round(
      fullCoveragePrice * (coveragePercentage / 100)
    );
    // console.log(coveragePrice);
    const whitePrice = Math.round(coveragePrice * (closestValue / 100));

    const totalPrice = coveragePrice + whitePrice;
    const finalPrice = totalPrice - Math.round(totalPrice * discount);

    console.log(finalPrice);
    finalPriceDisplay.innerText =
      finalPrice > minimumPrice ? finalPrice : finalPrice + minimumPrice;
  } else {
    finalPriceDisplay.innerText = "Please select an image";
  }
}

countPriceBtn.addEventListener("click", countPrice);
