# Semantic Resume

A simple HTML resume with semantic markups.

[![Build Status](https://travis-ci.org/cllu/Semantic-Resume.svg?branch=master)](https://travis-ci.org/cllu/Semantic-Resume)

Features:

- Single self-contained HTML file with HTML5 semantic tags;
- Semantic markup using the vocabulary from [semantic.org](https://semantic.org);
- Generate from GitHub-flavored Markdown text with YAML header;
- Exportable to PDF;
- Responsive layout.

## Shameless Plug
I am looking for a fulltime developer job.
I have spent four years on entity search and natural language processing,
  and have much experience in ElasticSearch, Lucene and Spark.
I speak pretty well in Python, Scala, Javascript and Java,
  and ok in Go, PHP and C++.
I love building stuff and believe in the power of technology,
  that is why I have spend the last year doing my startup [Hyperlink](https://hyperlinkapp.com).
You can check [my resume](https://chunlianglyu.com/resume/)
  and [my other projects](https://chunlianglyu.com/projects/).
<a href="mailto:hi@chunlianglyu.com">Talk to me</a> if you are interested.

## Get started

Open https://semantic-resume.chunlianglyu.com/ and type in the editor.
After you are done, click the Download button to download a self-contained single HTML file.

To export to PDF, use print and then choose "Save as PDF" as the Destination.
Only tested in Google Chrome.

## How it works

### Markdown

A basic resume can be defined as in the following Markdown format:

```markdown
---
website: https://chunlianglyu.com
github: cllu
---

# Chunliang Lyu

## Education

### [The Chinese University of Hong Kong] {2011 - 2016}

Research Area: Entity Retrieval, Natural Language Processing, Knowledge Graph.

[The Chinese University of Hong Kong]: https://www.cuhk.edu.hk/ (alumniOf)
```

If you have used Jekyll before, you would feel at home.
It is just a standard Markdown text, with YAML header wrapped between two `---` lines.
Only the format of `{2011 - 2016}` may seems strange, which we will explain later.

### HTML structure

For the above Markdown input,
  the generated HTML structure is like:

```html
<main>
  <section class="basic">
    <h1>Chunliang Lyu</h1>
    <a href="https://chunlianglyu.com/">chunlianglyu.com</a>
    <a href="https://github.com/cllu">github.com/cllu</a>
  </section>
  <section class="education">
    <h2>Education</h2>
    <details>
      <summary>The Chinese University of Hong Kong, <time>2011 - 2016</time></summary>
      Research Area: Entity Retrieval, Natural Language Processing, Knowledge Graph.
    </details>
  </section>
</main>
```

As you see,
  we try to use several HTML5 semantic tags to hold content:

- `<main>` to hold the whole resume;
- `<section>` to hold a section with proper CSS class, like Education or Projects;
- `<h1>` to hold the name, only in the first section; and `<h2>` to hold the title for other sections;
- `<details>` and `<summary>` to hold an item in a section;
- `<time>` to hold datetimes or time spans.

### Semantic markup

Machines are still dumb
  and probably cannot understand the meaning of a piece of text.
It may guess that the text inside `h1` is probably a title,
  but is does not know the exact meaning of the text.
Let't teach them, using the vocabulary from http://schema.org/Person.
The marked-up version would look like:

```html
<main itemscope itemtype="http://schema.org/Person">
  <section>
    <h1 itemprop="name">Chunliang Lyu</h1>
    <a href="https://chunlianglyu.com/" itemprop="url">chunlianglyu.com</a>
    <a href="https://github.com/cllu" itemprop="sameAs">github.com/cllu</a>
  </section>
  <section>
    <h2>Education</h2>
    <details>
      <summary>
        <span itemprop="alumniOf" itemscope itemtype="http://schema.org/EducationalOrganization">
          <link href="https://www.cuhk.edu.hk/" itemprop="url">
          <span itemprop="name">The Chinese University of Hong Kong</span>, 
        <time>2011 - 2016</time>
      </summary>
      Research Area: Entity Retrieval, Natural Language Processing, Knowledge Graph.
    </details>
  </section>
</main>
```

- we mark the `<main>` element as `http://schema.org/Person` type, so a machine knows we are describing a person here;
- we add `itemprop="name"` to the `h1` element, so a machine knows this is the name for the person;
- we add `itemprop="url"` to the website link, so a machine knows that url is our website;
- we add `itemprop="sameAs"` to the GitHub link, so a machine knows the GitHub account there is the same person here;
- the markup for the university is a bit of complicated, however it is not hard to understand.
  we tell a machine that we are an alumni of the defined EducationalOrganization,
  which has the given name and url link.

Why the bother marking up the HTML?
And what the hell is schema.org?
Well, believe or not, this kind of markup is already everywhere.
Go to a YouTube page and check its source code.
Search engines need to understand the Web better so they can improve the search result quality,
  that's why they join together to promote the semantic markup.
From my point of view,
  after four years of digging information from text during my PhD study,
  I believe that [Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web) is a better solution.
As you can see, currently schema.org has limited support for describing a person,
  however, that is already a good start.
  
### Develop

Use `npm install` to install dependent node modules.
Run `gulp` to start developing with a live reload server.
After compilation, the resulted files are put in the `dist` folder.

Main stack:

- scss for CSS preprocessor; [normalize.css](https://github.com/necolas/normalize.css); [Sheets-of-Paper](https://github.com/delight-im/HTML-Sheets-of-Paper) for the page style.
- codemirror for the editor; marked for the Markdown parser;
- gulp for building tool;
- webpack with babel so we can enjoy the awesome stuff from ES6;
- BrowserSync for live reloading and multiple device testing;
- mocha/chai for testing, and Travis CI so I can sleep tight in night;
- GitHub Pages for hosting, and CloudFlare for free SSL.

## Related

There are plenty of resume generation projects over the Internet, free or commercial.
These are some of them that I have surveyed.
If you are not comfortable with hosting your resume,
  or dealing stuff like HTML and CSS, you would be better choose alternatives.

- [represent.io](https://represent.io), paid service, nice interface, provides hosting and analytics
- [creddle](http://creddle.io/)
- [JobCV](http://www.jobcv.me/)
- [ResumeRuby](https://resumeruby.com)

Resume tips:

- [A pretty old discussion on Hacker News](https://news.ycombinator.com/item?id=903280)
- [How to write a Developer CV/Résumé that will get you hired](http://www.slideshare.net/perlcareers/how-to-write-a-developer-cvrsum-that-will-get-you-hired) 
  and the [discussion on Hacker News](https://news.ycombinator.com/item?id=8582793)

## License

Beside the content of my resume, everything else is released under the MIT License.
