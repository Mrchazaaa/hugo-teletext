(() => {
  const filters = document.querySelector("[data-post-filters]");
  if (!filters) return;

  const links = [...filters.querySelectorAll("[data-post-filter]")];
  const page = document.querySelector("[data-post-page]");
  const source = document.querySelector("[data-post-filter-source]");
  const results = document.querySelector("[data-post-filter-results]");
  const pagination = document.querySelector("[data-pagination]");
  const filterPagination = document.querySelector("[data-filter-pagination]");
  const emptyState = document.querySelector("[data-post-filter-status]");
  const pageSize = Number(results.dataset.pageSize);

  const createPagination = (currentPage, totalPages) => {
    if (totalPages <= 1) return null;

    const nav = document.createElement("nav");
    nav.className = "pagination";
    nav.setAttribute("aria-label", "Filtered post listing pages");

    const createDirection = (label, targetPage, enabled) => {
      const element = document.createElement(enabled ? "a" : "span");
      element.className = "pagination__direction";
      element.textContent = label;
      if (enabled) {
        element.classList.add("control");
        element.href = "#";
        element.dataset.filterPage = targetPage;
      } else {
        element.setAttribute("aria-hidden", "true");
      }
      return element;
    };

    nav.append(createDirection("PREV", currentPage - 1, currentPage > 1));

    const pages = document.createElement("div");
    pages.className = "pagination__pages";
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      const link = document.createElement("a");
      link.className = "control";
      link.href = "#";
      link.dataset.filterPage = pageNumber;
      link.textContent = pageNumber;
      link.setAttribute("aria-label", `Page ${pageNumber}`);
      if (pageNumber === currentPage) link.setAttribute("aria-current", "page");
      pages.append(link);
    }
    nav.append(pages);
    nav.append(createDirection("NEXT", currentPage + 1, currentPage < totalPages));

    return nav;
  };

  const applyFilter = (tag, requestedPage = 1, updateUrl = false) => {
    const matchingPosts = tag
      ? [...source.content.querySelectorAll("[data-post-tags]")].filter((post) =>
          post.dataset.postTags.split(" ").includes(tag),
        )
      : [];
    const totalPages = Math.ceil(matchingPosts.length / pageSize);
    const currentPage = Math.min(Math.max(requestedPage, 1), totalPages || 1);
    const visiblePosts = matchingPosts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );

    results.replaceChildren(...visiblePosts.map((post) => post.cloneNode(true)));
    const filteredPager = createPagination(currentPage, totalPages);
    filterPagination.replaceChildren(...(filteredPager ? [filteredPager] : []));
    page.hidden = Boolean(tag);
    results.hidden = !tag;
    pagination.hidden = Boolean(tag);
    filterPagination.hidden = !tag || totalPages <= 1;

    links.forEach((link) => {
      if (link.dataset.postFilter === tag) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (emptyState) emptyState.hidden = !tag || matchingPosts.length !== 0;

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (tag) {
        url.searchParams.set("tag", tag);
        currentPage > 1
          ? url.searchParams.set("tagPage", currentPage)
          : url.searchParams.delete("tagPage");
      } else {
        url.searchParams.delete("tag");
        url.searchParams.delete("tagPage");
      }
      window.history.pushState({}, "", url);
    }
  };

  filters.addEventListener("click", (event) => {
    const link = event.target.closest("[data-post-filter]");
    if (!link || new URL(link.href).pathname !== window.location.pathname) return;
    event.preventDefault();
    applyFilter(link.dataset.postFilter, 1, true);
  });

  filterPagination.addEventListener("click", (event) => {
    const link = event.target.closest("[data-filter-page]");
    if (!link) return;
    event.preventDefault();
    applyFilter(
      new URLSearchParams(window.location.search).get("tag") || "",
      Number(link.dataset.filterPage),
      true,
    );
  });

  const applyUrlFilter = () => {
    const params = new URLSearchParams(window.location.search);
    applyFilter(params.get("tag") || "", Number(params.get("tagPage")) || 1);
  };

  window.addEventListener("popstate", applyUrlFilter);
  applyUrlFilter();
})();
