---
layout: "../../layouts/projectsPost.astro"
title: "NutriScan - Nutrition Facts Scanner"
description: "A web app using the Barcode Detection API for seamless barcode scanning, achieving 75% mobile support. Built with Next.js, Prisma ORM, and MongoDB, it fetches nutrition facts from third-party APIs and save data on database to reduce external API calls."
pubDate: "Jan 4, 2024"
image: "/projects/nutriscan-nutrition-facts-scanner-01_thumb.png"
link: "https://nutrition-facts-scanner.vercel.app"
github: "https://github.com/rezahedi/nutrition-facts-scanner"
category: "Projects"
author: { name: "Reza Zahedi", handler: "rezahedi", avatar: "../assets/social-avatar.jpg", link: "https://github.com/rezahedi" }
tags: ["Next.js", "TypeScript", "MongoDB", "Prisma", "Barcode Detection API", "Tailwind CSS", "Vercel"]
---

## Unveiling the Power of browser APIs

Hello, fellow developers! I'm thrilled to share the journey of building my latest project, the Nutrition Facts Scanner, a web application designed to empower users to make informed nutrition decisions by scanning UAN or UPC barcode formats on food products without third-party packages or libraries. How? By utilizing the Barcode Detection API with [caniuse.com score of around 75% on mobile](https://caniuse.com/mdn-api_barcodedetector).

![App Screenshots](/projects/nutriscan-nutrition-facts-scanner-01.png)

## Barcode Detection API

The Barcode Detection API is a browser API that allows developers to access the device's camera and scan barcodes. The API is currently supported by Chrome, Edge, and Samsung Internet. The API is part of the [Shape Detection API](https://developer.mozilla.org/en-US/docs/Web/API/Shape_Detection_API), which also includes the Face Detection API and the Text Detection API.

```ts
// check compatibility
if (!("BarcodeDetector" in window)) {
  console.log("Barcode Detector is not supported by this browser.");
} else {
  console.log("Barcode Detector supported!");

  // create new detector and specify the formats you want to scan
  const barcodeDetector = new (window as any).BarcodeDetector({
    formats: ['upc_a', 'ean_8', 'ean_13'],
  });

  if (barcodeDetector) {
    // detect barcodes
    const barcodes = await barcodeDetector.detect(image);
    console.log(barcodes);
  }
}
```

The `detect()` will return an array of objects that each object represents a barcode that detected, each object has the following properties that I used `cornerPoints` to draw the red bounding box around the barcode over my camera stream using `canvas` element.

```json
[{
    // The bounding box of the detected barcode
    "boundingBox": {
        "x": 142,
        "y": 392,
        "width": 97,
        "height": 103,
        "top": 392,
        "right": 239,
        "bottom": 495,
        "left": 142
    },
    // The four corner points of the detected barcode
    "cornerPoints": [
        {"x": 142, "y": 396},
        {"x": 237, "y": 392},
        {"x": 239, "y": 491},
        {"x": 144, "y": 495}
    ],
    // The detected barcode format
    "format": "ean_8",
    // The barcode value
    "rawValue": "00649094"
}]
```

## Tech Stack Overview

This project is a mix of [Next.js](https://nextjs.org) App Router version for the frontend and API routes, [Prisma ORM](https://www.prisma.io) as type-safe data interactions and [MongoDB](https://mongodb.com) as the backend database.

The application fetches his detailed nutrition facts data from either [Open Food Facts](https://world.openfoodfacts.org/data) or [USDA](https://fdc.nal.usda.gov/api-guide.html) APIs based on the scanned barcode.

Leveraging the [Browser Barcode Detection API](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API), NutriScan allows users to effortlessly scan UAN or UPC barcodes on food products.

Building NutriScan was not only a technical challenge but also a tremendous learning experience. The incorporation of Next.js and TypeScript allowed me to deepen my understanding of modern web development practices. From the initial idea inspired by the [Yuka App](https://yuka.io) to the current state, the project evolved with each coding session.

Please be aware that NutriScan app uses rating numbers that may not be so accurate, because I got them from ChatGPT! so don't take them seriously. I'm working on a better solution to calculate the rating numbers in the future.

## Clone, Install, and Run

Getting hands-on with NutriScan is straightforward. Clone the project, install packages, set your envirunmental variables in `.env` file from `.env.example` included in the project and run it locally.

Curious to see NutriScan in action? Check out the [live demo](https://nutrition-facts-scanner.vercel.app) hosted on Vercel.

## Future Steps
NutriScan is not just another simple project to me; it's a canvas for continuous improvement. Here are some future steps in the pipeline:

- __User Profiles and Authentication:__ Personalize the user experience with profiles and implement authentication.
- __Product History Display:__ Allow users to view a list of scanned products in their profiles.
- __PWA Implementation:__ Transform the application into a Progressive Web App for offline use and a native app-like experience.
- __User reviews and ratings:__ Allow users to rate and review products.

Contributions to the project are more than welcome! Feel free to submit issues, feature requests, or pull requests.

https://github.com/rezahedi/nutrition-facts-scanner

Thank you for joining me on this journey, and I invite you to explore the live demo, or dig into the source code of the project.

## License
This project is licensed under the MIT License.
