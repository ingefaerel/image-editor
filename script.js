import { handleUpload, handleClear } from "./imageHandler.js";

document.getElementById("file-input").addEventListener("change", handleUpload);
document.getElementById("clear-button").addEventListener("click", handleClear);
