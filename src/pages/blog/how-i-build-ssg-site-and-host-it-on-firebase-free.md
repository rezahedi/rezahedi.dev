---
layout: "../../layouts/BlogPost.astro"
title: "How I build SSG site and host it for free on Firebase"
description: "A blog post about how I build visit-bamyan.com website by Hexojs, a SSG blog framework and host it on Google FIrebase."
pubDate: "Mar 25 2023"
category: "Blog"
---

I'm always amazed by Bamyan, a city in the central highlands of Afghanistan. The people are kind and hardworking, the young generation is curious and energetic, and the city is full of life, color, and history. When my wife got a job in local government in Bamyan, I saw it as an opportunity to use my web development skills to promote this incredible place.

We decided to gather reliable content and information and create a website to introduce more people to the beauty of Bamyan. Through our website, we hope to showcase the city's rich culture, history, and people, and to make it more accessible to a wider audience. I was excited to use my skills to help promote Bamyan and share its wonders with the world.

<figure class="image">
  <img src="/public/blog/visit-bamyan.com.jpg" alt="Visit Bamyan website homepage screenshot">
  <figcaption><a href="https://visit-bamyan.com">https://visit-bamyan.com</a></figcaption>
</figure>

So I sketched the first-look pages in [InVision Freehand tool](https://www.invisionapp.com/inside-design/freehand-online-whiteboard-for-everyone/). Freehand is a great digital whiteboard for brainstorming with your team. Then designed the user interface and the prototype in Figma.

<figure class="image">
  <img src="/public/blog/invision-freehand.png" alt="InVision Freehand">
  <figcaption><a href="https://freehandapp.com">InVision Freehand</a></figcaption>
</figure>

Then I decided to go with SSG stacks (Static Site Generator) to learn more about SSGs.

A static site generator is a software application that creates HTML pages from templates or components and a given content source. Most static site generators, [including HexoJs](https://github.com/hexojs/hexo) that I used for my website, accept [Markdown-formatted](https://daringfireball.net/projects/markdown/) text files as a source, although SSGs is not limited to Markdown. You can find a [list of SSGs in JamStack website](https://jamstack.org/generators/).

As SSGs compiling files into static HTML, CSS, and JavaScript, This reduces the risk of security attacks and makes the website more scalable and cost-effective to host. Developers can also use version control systems to manage changes to the code and optimize the website for search engines. SSGs are a great option for websites that require speed, security, scalability, and cost-effectiveness.

<figure class="image">
  <img src="/public/blog/hexo-js.png" alt="Hexojs">
  <figcaption><a href="https://github.com/hexojs/hexo">Hexojs</a></figcaption>
</figure>

I choose [Hexo](https://hexo.io/) as it’s super fast and simple framework to build a blog platform that I need for my website.

```
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
$ hexo server
```

With above commands your website / blog are ready to open locally. To create a new page or blog post you just need run following command:

```
$ hexo new "Hello Hexo"
```

After customizing all your needs and template and creating your website’s pages, last step is to generate a production version and push it to your hosting server.

```
$ hexo generate
```

Now that you have all your statis site’s files generated, you need to host it somewhere on a server, There are free hostings like Github, Cloudflare, Netlify and Firebase.

I selected [Firebase](https://firebase.google.com/) as my free hosting, Firebase is a Backend-as-a-Service (BaaS) platform provided by Google that offers a variety of services, including cloud storage, authentication, real-time database, hosting, machine learning, analytics, NoSQL, and more. It enables developers to build mobile and web applications quickly without needing to set up and manage server infrastructure. Firebase is well-suited for mobile app development too, with features like real-time database and scalability. Firebase provides a reliable, secure, and scalable infrastructure for running applications, with automatic scaling and security features built in.

You need to have account in Firebase, I believe you might already have a Gmail account, which is enough, If not create one!

Login to Firebase and create your project, then install the Firebase CLI, login, and initialize and link your project:

```
> npm i -g firebase-tools
> firebase login
> firebase init hosting
> firebase deploy --only hosting
```

That’s all I did to create and host my website, [visit-bamyan.com](https://visit-bamyan.com/), and all the [visit-bamyan.com codes are available on my Github](https://github.com/rezawm/visit-bamyan.com) to review.
