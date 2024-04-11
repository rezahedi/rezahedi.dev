---
layout: "../../layouts/projectsPost.astro"
title: "StreakUp - A Habit Tracking App"
description: "StreakUp is a habit tracker app built with Next.js, Prisma ORM, and Radix UI. It offers customizable repeat patterns, goal tracking, an inline edit feature, and gives users control over their data."
pubDate: "Jan 31, 2024"
image: "/projects/quick-guide-next-auth-email-login-setup-use-resend-to-send-verification-email-03_thumb.png"
link: "https://streakup.vercel.app"
github: "https://github.com/rezahedi/streakup"
category: "Projects"
author: { name: "Reza Zahedi", handler: "rezahedi", avatar: "/src/assets/social-avatar.jpg", link: "https://github.com/rezahedi" }
tags: ["Next.js", "TypeScript", "Next-Auth", "Postgres", "Prisma", "Tailwind CSS", "Radix UI"]
---

![StreakUp homepage screenshot](/projects/quick-guide-next-auth-email-login-setup-use-resend-to-send-verification-email-04.png)

## Introducing StreakUp

Hey, fellow developer, let me walk you through this small project of mine – meet [StreakUp](https://streakup.vercel.app), the habit tracker I've been cooking up. As a web developer, I know the importance of efficiency and user experience, and I've tried to pour that knowledge into every line of code.

I know it's not bug-free, but I'm working on it. I'm also working on adding more features, so stay tuned for more updates. I'm also open to any suggestions or feedback you may have, so feel free to reach out to me.

The StreakUp app is built on a stack of Next.js, Prisma ORM, Postgres, NextAuth, Resend email API, and Radix UI.

The next step is to implement push notifications to keep the user in the loop with habits and make more engagement; push notifications can help alert users when it's time to hit that deadline or whenever a habit is open to be checked in.

<video width="100%" height="auto" controls title="StreakUp app walkthrough video">
  <source src="https://github.com/rezahedi/streakup/assets/1499349/0bcad31b-fbdc-4cdf-9b81-5c8551c25674" type="video/mp4">
  Your browser does not support the video tag.
</video>

And about performance, I've employed React Lazy and Suspense to load dropdown menus lazily and the inline edit feature that doesn't affect the user interface when the page loads. No unnecessary loading – just components popping up exactly when needed, ensuring a smooth ride for the users.

## Repeat Pattern Format

Crafting habits is fun with StreakUp, I think so. Add titles, pick emojis, customize repeat patterns – daily, weekly, you name it. StreakUp adapts to whatever rhythm you're dancing to.

![Custom repeat pattern](/projects/quick-guide-next-auth-email-login-setup-use-resend-to-send-verification-email-02.png)

To give you more details about the repeat patterns, I've created a string pattern for that; take a look at the following examples:

```
1d         = Daily
2d         = Every other day
3d 8am     = Every 3 days at morning
2d 8am 8pm = Every other day at morning and night
1w sat     = Weekly on Saturday
2w         = Every other week
3w mon     = Every 3 weeks on Monday
1w mon fri = Weekly on Monday, and Friday
```

For every habit, the associated repeat pattern string is stored along with habit details in the database. To handle the repeat pattern, I've written the following function to convert the string pattern into an object, allowing seamless utilization within the app:

```ts
// github.com/rezahedi/StreakUp/blob/main/src/utils/dates.tsx

export const getRepeatPatternObject = (
  patternString: string
): patternObject => {

  let [repeat, ...repeatOn] = patternString.split(' ')
  let interval = parseInt( repeat[0] )
  let type = repeat[1]
  let readablePattern = ''

  // Create the readable title string
  readablePattern =
    ( interval === 1 )
      ? `${getSingular(type)}`
      : `Every ${interval} ${getPlural(type)}`

  if ( repeatOn.length > 0 ) {
    readablePattern += ' on ' + repeatOn.map(
      num => getCompleteWord(num)
    ).join(', ')
  }

  return {
    interval,
    type,
    repeatOn,
    levels: repeatOn.length || 1,
    readablePattern
  }	
}
```

Each habit has a goal; for example, a goal of 30 days means the user should do 30 check-ins daily without breaking the streak, and whenever a habit reaches the goal value, it will be marked as done and moved to the finished category as an achievements. If users miss checking in, the streak will break, and the habit will transferred to the broken category, but they can reactivate it again, and the streak count will be from the start.

![Dashboard screenshot](/projects/quick-guide-next-auth-email-login-setup-use-resend-to-send-verification-email-03.png)

Does the app have the ability to edit inline features? It's fun to make it happen for me. Click on the title, edit, and save. The habits will be updated in-demand with a new title without opening a specific edit form.

As a developer, control over your data is critical. Delete individual habits, wipe your account – your data, your call. StreakUp empowers users to make choices that resonate with their journey.

Are you curious to try the StreakUp by yourself? Check out the [live demo](https://streakup.vercel.app) hosted on Vercel.

## Future Steps

The app has a lot of room to perform better and grow several features; here are some future steps in the pipeline:

- __Web Push Notifications__
- __Refactor and Unify pages and states in dashboard__
- __Implement TinyBird for realtime analytic data__
- __Add Toast using sonner package__
- __Use react-email component for email template__
- __Build CRUD admin panel using shadcn/ui__

Contributions to the project are more than welcome! Feel free to submit issues, feature requests, or pull requests.

https://github.com/rezahedi/streakup

Finally, thank you for considering my portfolio project. I invite you to explore the live demo, provide feedback, and contribute to the project's so we can learn together.

## License
This project is licensed under the MIT License.
