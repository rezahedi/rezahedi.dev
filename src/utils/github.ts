import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import { h } from "hastscript";

export const githubCard: RehypePlugin = () => {
  
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
          h("img.avatar", { src: data.owner.avatar_url, alt: data.owner.login }),
          h("p.title", [
            h("text", ownerSlug+"/"),
            h("b", repoSlug)
          ]),
          h("p.desc", data.description),
          h("div.github-card__footer", [
            h("div.github-card__footer__item", [
              h("svg", { viewBox: "0 0 16 16", fill: "currentColor" }, [
                h("path", {
                  d: "M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
                })
              ]),
              h("div", [
                h("b", data.stargazers_count),
                h("span", "Stars"),
              ]),
            ]),
            h("div.github-card__footer__item", [
              h("svg", { viewBox: "0 0 16 16", fill: "currentColor" }, [
                h("path", {
                  d: "M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
                }),
              ]),
              h("div", [
                h("b", data.forks_count),
                h("span", "Forks"),
              ]),
            ]),
            h("div.github-card__footer__item", [
              h("svg", { viewBox: "0 0 16 16", fill: "currentColor" }, [
                h("path", {
                  d: "M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                }),
                h("path", {
                  d: "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"
                }),
              ]),
              h("div", [
                h("b", data.open_issues_count),
                h("span", "Issues"),
              ]),
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

// Check if the element is an anchor
// And the only text child is the same as the href
// ex: <a href="http://example.com">http://example.com</a>
const isAnchor = (element: Element) => {
  return element.tagName == "a" && element.properties && "href" in element.properties &&
  element.children.length==1 && element.children[0].type=='text' && element.children[0].value == element.properties["href"];
}

const getURL = (element: Element) => {
  if ( !element.properties || !element.properties["href"] ) return "";

  return element.properties["href"].toString();
};

const isGithubRepoURL = (url: string) => {
  return /^https:\/\/(www\.)?github.com\/[a-zA-Z0-9-_\.]+\/[a-zA-Z0-9-_\.]+$/.test( url );
};