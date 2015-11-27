# HTML Resume

forked from [JoyNeop/yart](https://github.com/JoyNeop/yart).

Page style from [Sheets-of-Paper](https://github.com/delight-im/HTML-Sheets-of-Paper).

## Structure

- everything is wrapped in the `<main>` element.
- we use `<section>` to hold a section, like Education or Projects.
- inside an `<section>` element, we use `<details>` and `<summary>` to divide multiple subsections.

## Semantic markup

- the `<main>` element is marked as the `http://schema.org/Person`
  - the `h1` element is marked as the `name` property
  - the `sameAs` property can be specified for social profile links like GitHub account

## Developing

Use `npm install` to install related node modules, use `gulp` to start developing with a live reload server.

## License

MIT License
