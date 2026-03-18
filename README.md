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
```

## Homepage Front Matter

```yaml
---
title: "Your Name"
rows:
  - label: "Role"
    value: "Designer / Developer"
  - label: "Location"
    value: "London, UK"
  - label: "Status"
    value: "Available for freelance"
links:
  - name: "GitHub"
    url: "https://github.com/yourname"
  - name: "Posts"
    url: "/posts/"
---
```

## License

MIT. See [LICENSE](LICENSE).
