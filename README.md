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
description = "A concise description of your site."
# Optional fallback image for social previews.
socialImage = "/images/social-preview.png"
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

## Metadata and Social Sharing

The theme automatically adds canonical URLs, meta descriptions, Open Graph and
Twitter Card metadata, JSON-LD structured data, and RSS feed discovery links.

Set `params.description` to provide the fallback description for the homepage,
list pages, and any page without its own `description`. For a social-preview
image, set `params.socialImage` to an absolute or site-relative URL.

Posts can override either value in their front matter:

```yaml
---
description: "A concise summary of this post."
socialImage: "preview.png"
---
```

When no `socialImage` is set, the theme uses the first image in a post's page
bundle, if one is available. Otherwise it emits text-only social metadata.


## Optional Head Partial

If a site needs to add extra assets to `<head>` without overriding the full base template, it can define `layouts/partials/head-extra.html`.

Example:

```html
<link rel="stylesheet" href="{{ `css/custom.css` | relURL }}">
```

The theme will render this partial after its main stylesheet link.

## Post Filters

The posts list displays post `tags` as links to Hugo taxonomy term pages. Post and term listings use Hugo's built-in pagination.

### Draft posts

Build local previews with `hugo server --buildDrafts`, then visit `/drafts/`
directly to list posts whose Hugo `draft` front matter flag is `true`. The
route is added as the first post filter when draft posts exist, and it is
excluded from normal production builds.

## Post Pagination

The posts list uses Hugo's built-in pagination. Set the number of posts per page in the site config:

```toml
[pagination]
pagerSize = 10
```

## License

MIT. See [LICENSE](LICENSE).
