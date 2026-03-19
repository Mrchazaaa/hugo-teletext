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

## License

MIT. See [LICENSE](LICENSE).
