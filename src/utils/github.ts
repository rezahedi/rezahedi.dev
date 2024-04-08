// How to create Astro Markdown plugin:
// https://www.larrymyers.com/posts/how-to-create-an-astro-markdown-plugin/

import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import {h} from "hastscript";

interface Options {
  domain: string;
}

export const githubCard: RehypePlugin = (options?: Options) => {
  const siteDomain = options?.domain ?? "";

  // How to async fetch:
  // https://github.com/syntax-tree/unist-util-visit-parents/issues/8#issuecomment-1413405543
  return async (tree) => {
    const repos = [] as any;

    visit(tree, "element", (node) => {
      if (node.type != "element") return;

      let element = node as Element;
      if ( isAnchor(element) && isGithubRepo(getUrl(element)) ) {
        repos.push(node)
      }
    });
    if (repos.length == 0) return;

    const promises = []
    for (const repo of repos) {
      const url = getUrl(repo);
      const repoData = url.split("github.com/")[1];
      promises.push(fetch(`https://api.github.com/repos/${repoData}`).then(async (res) => {
        if(res.status !== 200) return;

        const data = await res.json()

        if(!data.owner) return;

        const [owner, repoName] = repoData.split("/");
        const repoCard = h("a.github-card", { href: url, target: "_blank" }, [
          h("img", { src: data.owner.avatar_url, alt: data.owner.login }),
          h("p.title", [
            h("text", owner+"/"),
            h("b", repoName)
          ]),
          h("p.desc", data.description),
          h("div.github-card__footer", [
            h("div.github-card__footer__item", [
              h("b", data.stargazers_count),
              h("span", "Stars"),
            ]),
            h("div.github-card__footer__item", [
              h("b", data.forks_count),
              h("span", "Forks"),
            ]),
            h("div.github-card__footer__item", [
              h("b", data.open_issues_count),
              h("span", "Issues"),
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

const isAnchor = (element: Element) => element.tagName == "a" && element.properties && "href" in element.properties &&
  element.children.length==1 && element.children[0].type=='text' && element.children[0].value == element.properties["href"];

const getUrl = (element: Element) => {
  if (!element.properties) {
    return "";
  }

  const url = element.properties["href"];

  if (!url) {
    return "";
  }

  return url.toString();
};

const isGithubRepo = (url: string) => {
  // TODO: Check url for github repo pattern by regex (pattern: https://github.com/[username]/[repo])
  return url.startsWith("https") && url.includes("github.com")
};