import { coveragePercentage } from "./count-pixels.js";
import { closestValue } from "./count-white.js";

const finalPriceDisplay = document.getElementById("final-price");
const countPriceBtn = document.getElementById("count-price");

const fullCoveragePrice = 200;

function countPrice() {
  const coveragePrice = Math.round(
    (fullCoveragePrice * coveragePercentage) / 100
  );
  console.log(coveragePrice);
  const whitePrice = Math.round(coveragePrice * (closestValue / 100));
  console.log(whitePrice);
  finalPriceDisplay.innerText = fullCoveragePrice + whitePrice;
}

countPriceBtn.addEventListener("click", countPrice);
