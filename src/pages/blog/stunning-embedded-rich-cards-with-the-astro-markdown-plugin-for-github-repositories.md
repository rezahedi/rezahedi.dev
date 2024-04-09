---
layout: "../../layouts/BlogPost.astro"
title: "Stunning Embedded Rich Cards with the Astro Markdown Plugin for GitHub Repositories"
description: "Learn how to create rich embedded cards for GitHub repositories and npm packages in your Astro website using a custom rehype plugin by finding URLs and fetching data from third-party APIs."
pubDate: "April 8, 2024"
category: "Blog"
---

I was following dub.co development and specially the dub’s creator, Steven on social media, One day he shared a link to a page that the embedded cards in the content catches my eye. As you can see on the following screenshot the cards for npm package and Github repository shows beautifully more data about them. It was cool and I was like I should impalement that on my website too. It’s more useful show a rich card instead of just give links to repositories or npm packages in my content.

## The rich and informative embedded Cards

As an avid follower of [open source dub.co’s development](https://dub.co/customers/raycast), I was checking a page then instantly something captured my attention. The page featured embedded cards within its content, showcasing a information about npm packages and GitHub repositories like the downloads, stars or forks count and etc. as you can see in the below screenshot.

<figure class="image">
  <img src="/blog/dub_blog_cards_screenshot.png" alt="Screenshot from Dub.co/customers">
  <figcaption>Screenshot from Dub.co/customers</figcaption>
</figure>

I was impressed by how elegantly these cards presented additional data about that repository or the npm package. It dawned on me that integrating such rich cards into my own website would enhance its aesthetics and provide more utility to my audience. After all, presenting rich cards offers a far more informative and engaging experience compared to simply providing links to another page within my content.

After searching a lot for a suitable plugin or existing codebase to avoid reinventing the wheel, I came up to do it by myself.

## Astro and rehype

FYI, I used Astro to build my website and fortunately Astro uses rehype as part of its markdown stack, which makes it easy to add plugins to the content processing to restructure or transform the page’s content.

> Rehype combines the unified content processor and hast html AST to represent an html document as a tree structure. This tree structure can be walked and transformed by a series of plugins.

So I need to build a rehype plugin to look through the markdown and find the Github repositories URLs, make a asynchronous API call to Github for repository’s data and finally create the card’s HTML structure and insert within the page’s content.

I did some research about rehype’s plugins and found [Larry Myers article](https://www.larrymyers.com/posts/how-to-create-an-astro-markdown-plugin/), He described the process of building a plugin for Astro really clear and straight forward. I literally just followed his instruction.

> A rehype plugin is a function that receives configuration and returns a function that may transform the tree representing the html output of the markdown document.

## How to add a new plugin to Astro

Here’s the base structure of a rehype plugin in Astro:

```js
import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

export const myPlugin: RehypePlugin = () => {
  return (tree) => visit(tree, (node) => {
    // TODO: Find the node and Transfom it.
  });
};
```

Now add the `myPlugin` to `astro.config.ts`

```js
export default defineConfig({
  site: "https://www.mysite.com/",
  markdown: {
    rehypePlugins: [myPlugin],
  },
});
```

## Logic of our plugin

Now I just need to create the logic of my transformer plugin as listed below:

- Determine if a tree node is an element.
- Check if the element is an anchor tag.
- Check if the anchor tag has an href attribute.
- Check if the href url is the same as the anchor’s child. (I will describe why)
- Do the API call using the founded url.
- Create the card’s HTML tree or DOM using the fetched data.
- Replace the anchor node with the created card.

We don’t want to replace/transform any anchor or `<a href="https://github.com/...">` that we have in our markdown. We just want to transform those Github URLs that simple added as a new line into our markdown, Please check the following example:

_my-astro-page.md_

```md
---
title="Title of the Page"
description="..."
publishDate="Sep, 18 2024"
---

This is a markdown format page.
Have you ever heard of [dub](https://github.com/dubco/dub)?
It's a realy cool open source project.

https://github.com/dubinc/dub

Our plugin should only change the abow URL with the rich card!
```

## First step: Find Github URLs

With the help of Larry’s article I created the base and first step of our function which is finding the right element:

```ts
import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import { h } from "hastscript";

export const myPlugin: RehypePlugin = () => {
  
  return async (tree) => {
    const repos = [] as any;

    // Find all anchor elements that are link to a GitHub repo
    visit(tree, "element", (node) => {
      if (node.type != "element") return;

      const anchorElement = node as Element;
      if ( isAnchor(anchorElement) && isGithubRepoURL(getURL(anchorElement)) ) {
        repos.push(node)
      }
    });
    if (repos.length == 0) return;

    // TODO: Fetch data for each repo and create the GitHub card

  }
}


// Check if the element is an anchor
// And the only text child is the same as the href
// ex: <a href="http://example.com">http://example.com</a>
const isAnchor = (element: Element) => {
  return
    element.tagName == "a"
    && element.properties
    && "href" in element.properties
    && element.children.length == 1
    && element.children[0].type == 'text'
    && element.children[0].value == element.properties["href"];
}

const getURL = (element: Element) => {
  if ( !element.properties || !element.properties["href"] ) return "";

  return element.properties["href"].toString();
};

const isGithubRepoURL = (url: string) => {
  return /^https:\/\/(www\.)?github.com\/[a-zA-Z0-9-_\.]+\/[a-zA-Z0-9-_\.]+$/.test( url );
};
```

## Next step: Call Github API asynchronously

Next step is to call the Github API and fetch data and it should be async.

At first I thought whenever link element matched in content, then asynchronously call the API and replace the link node with the card tags and data. but it didn’t work because `visit(tree, “element”, (node)=>{})` from `unist-util-visit` doesn’t return promise.

Again I got stuck and after discussing it with ChatGPT! and searching on Google, finally find a helpful [comment of Titus](https://github.com/syntax-tree/unist-util-visit-parents/issues/8#issuecomment-1413405543) that described how to do async, by split the work up in two stages: first find things then transform things! 🎉

Here is my final version and it work perfectly:

```ts
import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import { h } from "hastscript";

export const myPlugin: RehypePlugin = () => {
  
  return async (tree) => {
    const repos = [] as any;

    // Find all anchor elements that are link to a GitHub repo
    visit(tree, "element", (node) => {
      if (node.type != "element") return;

      const anchorElement = node as Element;
      if ( isAnchor(anchorElement) && isGithubRepoURL(getURL(anchorElement)) ) {
        repos.push(node)
      }
    });
    if (repos.length == 0) return;

    // Fetch data for each repo and create a GitHub card
    const promises = []
    for (const repo of repos) {
      const url = getURL(repo);
      const repoPathname = url.split("github.com/")[1];
      promises.push(fetch(`https://api.github.com/repos/${repoPathname}`).then(async (res) => {
        if(res.status !== 200) return;

        const data = await res.json()

        const [ownerSlug, repoSlug] = repoPathname.split("/");
        const repoCard = h("a.github-card", { href: url, target: "_blank" }, [
          h("img", { src: data.owner.avatar_url, alt: data.owner.login }),
          h("h3", [
            h("text", ownerSlug+"/"),
            h("b", repoSlug)
          ]),
          h("p", data.description),
          h("div", [
            h("div", [
              h("b", data.stargazers_count),
              h("span", "Stars"),
            ]),
            h("div", [
              h("b", data.forks_count),
              h("span", "Forks"),
            ]),
          ])
        ]);
        repo.tagName = "div";
        repo.children = [repoCard];
      }))
    }
    await Promise.all(promises)
  }
}
```

## The final result

The result for each Github’s cards will be like this:

```html
<div>
  <a href="{repository-url}" class="github-card" target="_blank">
    <img src="{repository-owner-avatar-image-url}" alt="{repository-name}" />
    <h3>{repository-owner-slug}/<b>{repository-slug}</b></h3>
    <p>{description}</p>
    <div>
      <div>
        <b>{stars-count}</b>
        <span>Stars</span>
      </div>
      <div>
        <b>{forks-count}</b>
        <span>Forks</span>
      </div>
    </div>
  </a>
</div>
```

And here is an example of the rich card we have been building:

https://github.com/rezahedi/HighPaws-Buddies

_Don't worry about all the zeros, my repository is not that popular!_ 😁

In this approach, there’s a caveat to consider: rehype plugins and markdown processing occur solely during build time in Astro. So, the resulting output is static, meaning that repository data — such as stars, forks, and other metrics — remains unchanged over time. To ensure data accuracy and freshness, one must rebuild the Astro project periodically! 😒

Alternatively, another method to create these embedded cards is developing a React component to do the API call in client-side. This component can be imported and utilized within your page’s content as an Astro Island, by adding the `client:load` directive. However, to import components it’s important to note that requires your page’s content files to be in either `.astro` or `.mdx` format, excluding the use of `.md` files.

Please let me know what you think or if you have any question in the comments.
