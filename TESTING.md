# Testing Documentation for DTF Printing Price Preview Tool

## Overview

This document outlines the testing approach, test cases, and results for the DTF Printing Price Preview Tool. The tool allows users to upload an image, resize it interactively or manually, and calculates the price based on A3 format coverage, excluding transparent pixels.

---

## Types of Testing

1. **Functional Testing**

   - Image upload and display functionality.
   - Interactive and manual resizing.
   - Cost and A3 coverage calculations.
   - Transparent pixel detection.

2. **UI/UX Testing**

   - Responsiveness across devices and screen sizes.
   - Usability of interactive features (e.g., resizing handles).

3. **Compatibility Testing**

   - Browser compatibility testing (Chrome, Firefox, Safari, Edge).
   - Cross-device testing (desktop, tablet, mobile).

4. **Performance Testing**

   - Loading time for large images.
   - Responsiveness of calculations during resizing.

---

## Test Cases

### Functional Test Cases

| **Test Case ID** | **Description**                       | **Steps**                                       | **Expected Result**                                                  |
| ---------------- | ------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------- |
| TC-001           | Verify supported file upload          | Upload a PNG image.                             | The image appears on the canvas without error.                       |
| TC-002           | Verify unsupported file upload        | Upload a `.docx` file.                          | Error message: "Unsupported file format" is displayed.               |
| TC-003           | Verify image resizing functionality   | Drag a corner of the image to resize.           | The image resizes proportionally and updates dimensions dynamically. |
| TC-004           | Verify transparent pixel detection    | Upload an image with 50% transparency.          | Transparent pixels are excluded from coverage calculation.           |
| TC-005           | Verify price calculation after resize | Resize the image and observe the updated price. | Price updates correctly based on new coverage area.                  |

### Compatibility Test Cases

| **Test Case ID** | **Description**              | **Steps**                                           | **Expected Result**                                        |
| ---------------- | ---------------------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| CT-001           | Verify browser compatibility | Open the tool on Chrome, Firefox, Safari, and Edge. | The app behaves consistently across all browsers.          |
| CT-002           | Verify mobile responsiveness | Open the tool on a mobile device.                   | The app adjusts and functions properly on smaller screens. |

---

## Test Results

| **Test Case ID** | **Status** | **Notes**                                                  |
| ---------------- | ---------- | ---------------------------------------------------------- |
| TC-001           | Passed     | Image upload works as expected for supported formats.      |
| TC-002           | Passed     | Proper error message is displayed for unsupported formats. |
| TC-003           | Passed     | Resizing functionality works intuitively.                  |
| TC-004           | Passed     | Transparent pixel detection is accurate.                   |
| TC-005           | Passed     | Price calculation updates correctly during resizing.       |
| CT-001           | Passed     | App behaves consistently on major browsers.                |
| CT-002           | Passed     | App is fully responsive on mobile devices.                 |

---

## Known Issues

1. Performance lags slightly for images larger than 10MB.
2. Minor alignment issues on certain tablet screen resolutions.

---
