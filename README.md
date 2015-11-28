# Semantic HTML Resume

A simple HTML resume with semantic markups.

## Get Started

After downloading/cloning the repository, open the index.html in your browser. Modify the file to get your resume.

To export to PDF, try to Print using Google Chrome and then choose "Save as PDF" as the Destination.

## Developing

Related sources:

```
- index.html
- styles/main.scss
- scripts/script.js
```

Use `npm install` to install related node modules, use `gulp` to start developing with a live reload server.

After compilation, the resulted files are put in the `dist` folder.

### DOM Structure

We try to use several HTML5 semantic tags to hold content.

- the resume is wrapped in the `<main>` element, thus only one resume is allowed in a single html file.
- use `<section>` tag to hold a section, like Education or Projects.
- inside a `<section>` element, use `<details>` and `<summary>` to divide multiple subsections.
- use `<time>` tag to hold datetimes or time spans.

### Semantic markup

See http://schema.org/Person for detailed documentations.

- the `<main>` element is marked as the `http://schema.org/Person`
  - the `h1` element is marked as the `name` property
  - the `sameAs` property can be specified for social profile links like GitHub account

## Credits

- [normalize.css](https://github.com/necolas/normalize.css)
- Page style from [Sheets-of-Paper](https://github.com/delight-im/HTML-Sheets-of-Paper).

## License

MIT License
