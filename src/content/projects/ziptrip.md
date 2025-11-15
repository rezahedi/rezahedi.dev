---
layout: "../../layouts/projectsPost.astro"
title: "Developing a Map-Driven and Geospatial Data App"
description: "ZipTrip is a web application that lets users create travel itineraries by picking places from an interactive map and connecting points to build a tour, a day trip, or a simple city sightseeing plan."
pubDate: "Nov 14, 2025"
image: "/projects/ziptrip/explore-page-screenshot.png"
link: "https://ziptrip.rezahedi.dev"
github: "https://github.com/rezahedi/ziptrip-app"
category: "Projects"
author:
  {
    name: "Reza Zahedi",
    handler: "rezahedi",
    avatar: "../assets/social-avatar.jpg",
    link: "https://github.com/rezahedi",
  }
tags:
  [
    "React",
    "TypeScript",
    "Express.js",
    "Mongodb",
    "Cloudinary",
    "Tailwind CSS",
    "Google Map API",
    "JWT Auth",
    "Google Places API",
  ]
---

ZipTrip is a web application that lets users create travel itineraries by picking places right from an interactive map and connecting points to build a tour, a day trip, or a simple city sightseeing plan.

<iframe width="100%" height="400" src="https://www.youtube-nocookie.com/embed/KDpUT4lMnCU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The idea came to me after watching an Instagram story about how to spend a perfect weekend in San Francisco. The creator showed which train to take, which streets to walk, which cafés and restaurants to visit, what to order, how much everything costs, and which parks or viewpoints to see. It was such a clear, detailed guide that I tried following it myself too. As a developer, I immediately thought: _I wish there was an app that I could list all those notes, places' details, plus the walking direction routes, all in one place._

That was the moment the idea for [**ZipTrip**](https://ziptrip.rezahedi.dev) began to form in my mind.

## Team Project & First Version

Later, when I joined Code the Dream's Practicum program, I sketched a prototype and presented it to my team along with other ideas. Everyone agreed to build ZipTrip, so we planned it together and started development.

<figure class="image">
  <img src="/projects/ziptrip/idea-draft.png" alt="My first draft sketch">
  <figcaption>My first draft sketch</figcaption>
</figure>

For our backend stack, we chose `Node.js`, `Express.js`, `MongoDB` and `Mongoose`, `JWT Auth` and `Swagger/OpenAPI` for API documentation. For the frontend, we used `Vite.js`, `React`, `React Router` and `Material UI`.

We finished the MVP in two months and presented it. It was a great experience and also very educational, the program was designed to be more team work and leadership. But personally I wasn't satisfied enough with the created app result to put it in my portfolio. So after the program, I forked the project and started refactoring the codebase, improving the architecture, replacing parts of the tech stack, and building more features.

<figure class="image">
  <img src="/projects/ziptrip/explore-page-screenshot.png" alt="Screenshot of Explore page">
  <figcaption>Screenshot of [Explore page](https://ziptrip.rezahedi.dev/explore)</figcaption>
</figure>

## Refactoring & Improvements

Some of the major improvements I made include refactoring the original "categories" feature into a proper city-based model and creating a dedicated Start Plan page with city autocompletion. I also enhanced the data quality by extracting rich place details directly from the `Google Places API` and integrated `Cloudinary's Image API` to handle uploading and storing images on cloud for my project.

I managed to add dark/light theme support using Tailwind CSS and built a new Explore page powered by a custom state-management hook that keeps multiple components in sync. This design was inspired by [AllTrails](https://www.alltrails.com/explore), when a user selects a plan in the sidebar, its related marker automatically highlights on the map. I also redesigned the plan-creation flow by replacing long, traditional forms with an interactive itinerary-building experience which make it super easy for users to build their own plans.

<figure class="image">
  <img src="/projects/ziptrip/plan-detail-screenshot.png" alt="Screenshot of a Plan Detail Page">
  <figcaption>Screenshot of a Plan Detail Page</figcaption>
</figure>

Another major feature was adding walking directions by fetching [`encoded Polyline`](https://developers.google.com/maps/documentation/utilities/polylinealgorithm) data, storing it in the database, and rendering the route on the map. Then to smooth away the sign in/up process, implemented Google OAuth using [`@react-oauth/google`](https://www.npmjs.com/package/@react-oauth/google) that make it one tap away being logged into the app. Eventually migrated the whole backend from Render.com to Vercel to eliminate cold-start delays that made the app feel slow on the free tier.

It was a significant amount of work, but managed to wrap up my project and applied many design patterns that learned from Frontend Masters courses in one month.

This project helped me improve my full-stack skills, work with geospatial data (my second favorite subject after EdTech), and build something that interacts with real-world mapping APIs. I also wanted to challenge myself technically and create a product I would actually use.

## What's Next

I still have a long list of improvements I want to make to ZipTrip. Some are technical enhancements, like adopting TanStack Query, implementing server or client-side markers clustering, adding place filtering on the map, and autocomplete for more intuitive search. Others focus on enriching the user experience, such as calculating distances between itinerary stops, adding flexible content blocks like notes or images, and refining the UI and mobile experience. I also plan to revisit the API design to strengthen its structure and error handling. These updates will not only make the app more robust but also bring it closer to the full vision I have for the project.

But for now I'm gonna pass to my next app and I'm super exited for it as I like to use AI inside a edtech focused idea.

<figure class="image">
  <img src="/projects/ziptrip/mobile-screenshots.png" alt="Different part of the app in mobile size screen">
  <figcaption>Different part of the app in mobile size screen</figcaption>
</figure>

## Challenges

The biggest challenge was refactoring my old codebase to make it more DRY, reusable, and scalable. At the same time, I had to cleanly manage and type data flowing through every layer of the application , from MongoDB documents to API requests and responses body json. Ensuring consistent, well-defined types across both the frontend and backend required reorganizing my models, rewriting parts of the API, and standardizing how data moved through the system.

It took a lot of work, but the process taught me more than any anything else, and rebuilding ZipTrip from the ground up became one of the most valuable experiences I've had.

https://github.com/rezahedi/ziptrip-app

The [source code](https://github.com/rezahedi/ziptrip-app) is available on my GitHub account, and [the app](https://ziptrip.rezahedi.dev) is live, and feel free to try it out and share your thoughts!
