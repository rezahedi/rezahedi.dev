---
layout: "../../layouts/projectsPost.astro"
title: "HighPaws - A social app for dog lovers"
description: "With this project I learned about Firebase platform, how to use serverless functions, cloud storage, hosting, authentication, Firebase document oriented noSQL, realtime database, setup CI/CD workflow, data normalization and fan-out technique, notifications."
pubDate: "Apr 12, 2024"
image: "/projects/highpaws/screenshot-2024-04-06-182830.png"
link: "https://highpaws-buddies.web.app"
github: "https://github.com/rezahedi/highpaws-buddies"
category: "Projects"
author: { name: "Reza Zahedi", handler: "rezahedi", avatar: "../assets/social-avatar.jpg", link: "https://github.com/rezahedi" }
tags: ["React", "TypeScript", "Firebase", "Firestore NoSQL", "CDN Storage", "Tailwind CSS", "Serverless functions", "Authentication"]
---

I planned to build a social media app for our lovely buddies, our dogs🐕‍🦺. It comes to my mind when I was walking puppy Bjørn to the dog park for a playdate. I was wondering are there bigger dogs in the park, or is it allowed for off-leash play? I thought it would be cool to have an app where I can check the dog parks, see other dogs, and any useful information related to our friends. Then I thought it's a perfect project for my portfolio so I decided to develop it.

<figure class="image">
  <img src="/projects/highpaws/screenshot-2024-04-06-182830.png" alt="Homepage Screenshot">
  <figcaption>Homepage Screenshot</figcaption>
</figure>

I've used Vite, React, TypeScript, and Firebase tech stacks for Auth, database, CDN and hosting. It still needs a lot of work to be done, but I'm happy with the progress so far. I'm planning to add more geo-locations features like places, businesses, and posts location tagging. I'm also thinking about adding different post's types like events and polls, or maybe a marketplace for dog products and services. The possibilities are endless, and I'm excited to see where this project will go.

## Why Firebase?

HighPaws is an exciting project that I'm working because I wanted to learn more about [Google Firebase platform](https://firebase.com) especially Firestore NoSQL database and learn and adopt my mindset from relational database to noSQL document-oriented database. I think it's a big challenge for relational mindset developers to switch to noSQL.

Firebase also have bunch of other great features that I wanted to give it a shot, like serverless functions, cloud storage, hosting and authentication. Another interesting subject that I learned about was setup CI/CD workflow for this project, using Github Actions, YAML language, to automate the deployment and build process in production whenever I push my commits or merge to main branch.

```yaml
name: Deploy to Firebase Hosting on merge
'on':
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    environment: production
    concurrency: production
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_HIGHPAWS_BUDDIES }}'
          channelId: live
          projectId: highpaws-buddies
```


## About the app

HighPaws is a place where user can sign up, create a profile for their dogs and share their dog's photos, and stories with other dog lovers, they can also follow or un-follow others, check other's profile and posts, like or dislike posts and photos, and comment on them. Users can also send and receive messages to their friends, and receive notifications about their activities, for example who liked their posts, who followed them, or who commented on their posts.

Here is a video walkthrough of the app functionality:

<video width="100%" height="auto" controls title="HighPaws app walkthrough video">
  <source src="https://github.com/rezahedi/HighPaws-Buddies/assets/1499349/e9943574-7c30-41dc-88af-cd09342f74fe"  type="video/mp4">
  Your browser does not support the video tag.
</video>
<script>
document.getElementsByTagName("video")[0].playbackRate = 1.5;
</script>

## Firestore Fan-out and data normalization

The most fan part of this project was designing database schema based on Firebase noSQL database, and use data normalization and fan-out technique to store data in Firestore.

<figure class="image">
  <img src="/projects/highpaws/1_CRrXVkAUWO7v8kSsTuFIAA.webp" alt="Firebase fan-out structure">
  <figcaption>Image source: Abhishek Nandi's Medium article</figcaption>
</figure>

To accomplish this I had to write bunch of serverless functions to handle the data normalization and fan-out process. For example to create a feed for each user, I created a collection called `feeds` under each user document as a sub-collection, and whenever a user post a photo or a message, a document created in `posts` sub-collection of the user document, then my serverless function will trigger and grab the post data and create a copy of the original post in the `feeds` sub-collection of all followers of the user.

Here is an example of how I used Firebase serverless functions to handle the fan-out or data normalization in Firestore database:

```javascript
import {
  onDocumentCreated,
  onDocumentUpdated,
  onDocumentDeleted,
} from "firebase-functions/v2/firestore";
// See a full list of supported triggers at https://firebase.google.com/docs/functions

export const fanoutCreatedNewPost =
  onDocumentCreated("profiles/{profileId}/posts/{postId}", (event) => {
    const profileId = event.params.profileId;
    const postId = event.params.postId;

    // TODO: Fan-out logic of newly created post's document
  });

export const updateFanoutPost =
  onDocumentUpdated(`profiles/{profileId}/posts/{postId}`, (event) => {
    const docData = event.data;
    if (!docData) return

    const beforeData = docData.before.data();
    const afterData = docData.after.data();

    // TODO: logic related to post's update
  });
```

It was a great learning experience for me to work with noSQL database but still I have a lot of unanswered questions especially about the scalability, performance, database optimization to lower the cost, these are the things I you can only learn by working on a real project with growing data and users.

## Responsiveness

I've used Tailwind CSS for styling the app, and the app is fully responsive and works great on mobile devices, tablets and desktops.

![In mobile devices](/projects/highpaws/screenshot-2024-04-06-182831.png)

One thing I dislike about is how others handle navigation or sidebars in mobile devices, I saw many apps that use two versions of the navigation, one for desktop and one for mobile, but I think it's not a good practice, I'd rather use the same navigation for both desktop and mobile, and make it responsive as I did in this project.

The below video shows how the navigation sidebar works and transforms between desktop and mobile devices.

<video width="100%" height="auto" controls title="Responsive Navigation">
  <source src="/projects/highpaws/navbar.mp4"  type="video/mp4">
  Your browser does not support the video tag.
</video>
<script>
document.getElementsByTagName("video")[1].playbackRate = 1.5;
</script>

At the end, there are still other great features that I implemented in this project but didn't mention here, like the authentication, user profile, the private messaging system, and notifications, but I think it's enough for now.

https://github.com/rezahedi/highpaws-buddies

Please [checkout the app](https://highpaws-buddies.web.app) and let me know what you think about it, any feedback is appreciated. Also feel free to check the source code on Github.
