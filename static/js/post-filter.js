(() => {
  const filters = document.querySelector("[data-post-filters]");
  if (!filters) return;

  const links = [...filters.querySelectorAll("[data-post-filter]")];
  const posts = [...document.querySelectorAll("[data-post-tags]")];
  const emptyState = document.querySelector("[data-post-filter-status]");
  const applyFilter = (tag, updateUrl = false) => {
    let visiblePosts = 0;

    posts.forEach((post) => {
      const tags = post.dataset.postTags.split(" ");
      const visible = !tag || tags.includes(tag);
      post.hidden = !visible;
      if (visible) visiblePosts += 1;
    });

    links.forEach((link) => {
      if (link.dataset.postFilter === tag) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (emptyState) emptyState.hidden = visiblePosts !== 0;

    if (updateUrl) {
      const url = new URL(window.location.href);
      tag ? url.searchParams.set("tag", tag) : url.searchParams.delete("tag");
      window.history.pushState({}, "", url);
    }
  };

  filters.addEventListener("click", (event) => {
    const link = event.target.closest("[data-post-filter]");
    if (!link) return;
    event.preventDefault();
    applyFilter(link.dataset.postFilter, true);
  });

  window.addEventListener("popstate", () => {
    applyFilter(new URLSearchParams(window.location.search).get("tag") || "");
  });

  applyFilter(new URLSearchParams(window.location.search).get("tag") || "");
})();
