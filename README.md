# hugo-teletext

A Hugo theme with a retro teletext look for a personal homepage and simple blog.

## Install

```bash
git submodule add https://github.com/Mrchazaaa/hugo-teletext themes/hugo-teletext
```

Then set the theme in your Hugo config:

```toml
theme = "hugo-teletext"
```

## Site Params

```toml
[params]
pageNumber = "P100"
enableScanlines = true
```

## Homepage Content

Use `content/_index.md` for the homepage title and body content. The theme renders the page content directly, so you can use standard Markdown such as tables, paragraphs, headings, and lists.

```markdown
---
title: "Your Name"
---

| Role | Designer / Developer |
| --- | --- |
| Location | London, UK |
| Status | Available for freelance |
| Links | [GitHub](https://github.com/yourname) [Posts](/posts/) |
```

## Optional Head Partial

If a site needs to add extra assets to `<head>` without overriding the full base template, it can define `layouts/partials/head-extra.html`.

Example:

```html
<link rel="stylesheet" href="{{ `css/custom.css` | relURL }}">
```

The theme will render this partial after its main stylesheet link.

## Post Filters

The posts list displays post `tags` as links to Hugo taxonomy term pages. Post and term listings use Hugo's built-in pagination.

## Post Pagination

The posts list uses Hugo's built-in pagination. Set the number of posts per page in the site config:

```toml
paginate = 10
```

## License

MIT. See [LICENSE](LICENSE).
