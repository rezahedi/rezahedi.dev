---
layout: "../../layouts/BlogPost.astro"
title: "How to build a contact form in Astro, Vercel and SendGrid"
description: "Learn how to build a contact form in Astrojs with Vercel, and SendGrid. We'll create the form with Astrojs, configure Vercel to handle form submissions and SSR, and integrate SendGrid for email delivery."
pubDate: "Apr 21 2023"
category: "Blog"
---

Having contact form in your website make it easier for users to interact with you and also look more professional, but have downsides, It opens a door for spammer/hackers to give you headache too.

## Create Astro Project

To start building our contact form first we should have our Astro project to be ready:

```bash
npm create astro@latest
npm run dev
```

Now that your Astro project is ready and running locally, create your first page and add the form with necessary input fields. as Astro is a [file-based routing](https://docs.astro.build/en/core-concepts/routing/), by creating new file in src/pages/ you will have new endpoint in your site.

New file: _src/pages/contact.astro_

```astro
---
// Frontmatter section
// Component scripts goes here.
---
<html lang="en">
  <head>
    <title>Contact Me</title>
  </head>
  <body>
    <h1>Say Hi to me!</h1>
    <form method="POST">
      <div>
        <input type="text" name="name" placeholder="Name" />
      </div>
      <div>
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div>
        <textarea name="message" placeholder="Message"></textarea>
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  </body>
</html>
```

Astro uses a code fence (`---`) to identify the [component script](https://docs.astro.build/en/core-concepts/astro-components/) in your Astro component. If you’ve ever written Markdown before, you may already be familiar with a similar concept called frontmatter. Astro’s idea of a component script was directly inspired by this concept.

Although there are [security aspects to consider when creating forms](https://austingil.com/how-to-build-html-forms-right-security/) that I’m not covering here but it’s an important topic to keep in mind.

## Setup SendGrid

SendGrid is a popular email delivery platform that provides a wide range of email marketing and transactional email services. SendGrid is a reliable and flexible email delivery platform that we are going to use it to send emails.

First, create new [SendGrid account](https://signup.sendgrid.com/) or use an existing one, then create your API key [here](https://app.sendgrid.com/guide/integrate/langs/nodejs). The SendGrid’s API keys always start with “SG.”!

Sendgrid requires you to create a Sender Identity to protect against spam and malicious mails. To do so, go to the [Sendgrid Identity page](https://app.sendgrid.com/settings/sender_auth) and click on `Create New Sender` to create a sender identity.

You’ll be rqeuired to fill out a detailed form. Just complete the form and hit submit. Finally, just verify your email address and you’re done.

Once you’ve retrieved the `API keys`, add it to your `.env` file in your local environment:

```js
SENDGRID_API_KEY = "SendGrid API key goes here"
```

_Note: If you setup `.gitignore` in your project to ignore `.env` files, so do not forget to add your env variable `SENDGRID_API_KEY` under your project in Vercel, Settings > Environment Variables._

Then we need to install SendGrid’s package:

```bash
npm i --save @sendgrid/mail
```

## Create the Vercel serverless function

The SendGrid does not allow browser-based API calls, because of security reasons, also if you do, you will reveal your API key to the public. I did and received a CORS error from SendGrid API, So we should have a server-side function and do our SendGrid API call on server, We need to create a Nodejs function.

```bash
npx astro add vercel
```

This command will install `@astrojs/vercel astro@latest` and change your project’s configuration in `/astro.config.mjs` file by importing vercel serverless, adding `output: ‘server’` amd `vercel()` as adapter.

```js
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
   output: 'server',
   adapter: vercel()
});
```

Now we can receive data from our contact form on server-side, validate, handling errors and do the SendGrid API call on server. You can read more about [Server-Side Rendering (SSR) on Vercel documentation](https://vercel.com/docs/frameworks/astro).

```astro
---
import sendGrid from '@sendgrid/mail';
sendGrid.setApiKey( import.meta.env.SENDGRID_API_KEY );

if (Astro.request.method === 'POST') {
  try{
    // Getting posted data from our contact form
    const data = await Astro.request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    // TODO: Do not forget to do validation and
    // error handling over received data from your contact form.

    // Sending email
    const msg = {
      to: 'test@example.com', // Change to your recipient
      from: 'text@example.com', // Change to your verified sender
      replyTo: {email:email, name:name},
      subject: `Contact form submission from ${name}`,
      text: message,
    }
    await sendGrid.send(msg).then(() => {
      console.log('Email sent')
    }).catch((error) => {
      console.error(error)
    });

  } catch (error) {
    console.error(error);
  }
}
---
<html lang="en">
  <head>
    <title>Contact Me</title>
  </head>
  <body>
    <h1>Say Hi to me!</h1>
    <form method="POST">
      <div>
        <input type="text" name="name" placeholder="Name" />
      </div>
      <div>
        <input type="email" name="email" placeholder="Email" />
      </div>
      <div>
        <textarea name="message" placeholder="Message"></textarea>
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  </body>
</html>
```

It’s an old-fashion to handle the forms like this by reloading entire page for posting data to servers, but it’s just the base codes, So next step is to make http request (send and receive form’s data) by browser’s fetch API.
