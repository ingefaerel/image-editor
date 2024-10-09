import { coveragePercentage } from "./count-pixels.js";
import { closestValue } from "./count-white.js";

const finalPriceDisplay = document.getElementById("final-price");
const countPriceBtn = document.getElementById("count-price");

const fullCoveragePrice = 150; // No white mask eg. black
const minimumPrice = 100;

function countPrice() {
  const imageElement = document.querySelector("#image-container img");
  if (imageElement) {
    const coveragePrice = Math.round(
      fullCoveragePrice * (coveragePercentage / 100)
    );
    console.log(coveragePrice);
    const whitePrice = Math.round(coveragePrice * (closestValue / 100));

    const finalPrice = coveragePrice + whitePrice;
    console.log(finalPrice);
    finalPriceDisplay.innerText = finalPrice > 100 ? finalPrice : minimumPrice;
  } else {
    finalPriceDisplay.innerText = "Please select an image";
  }
}

countPriceBtn.addEventListener("click", countPrice);
