---
# START HERE
#
# You can check the source code at https://github.com/cllu/Semantic-Resume
#
# Note: all your edit will be automatically saved to your browser.
#       try edit and reload the browser.
#
# The right-upper corner has three buttons, from left to right:
# - toggle the editor
# - toggle to show the HTML source code
# - download the generated HTML file (with CSS/JS inlined)
#
# Did I mention that you can resize the editor? Try drag the right border of the editor.
#
# To export to PDF file, try print and then choose Save as PDF.
#
# Cannot live without Vim? Me too, use Alt+X to toggle VIM key maps.
# (Why Alt+X? This is the last Emacs keybinding that I remember)
#
name: Chunliang Lyu
# there is a sad story about the spelling of my last name
alternateName: Chunliang Lu
website: https://chunlianglyu.com
email: hi@chunlianglyu.com
github: cllu
# other social profiles that are visible to machines only
sameAs:
  - https://twitter.com/chunlianglyu
  - https://linkedin.com/in/chunlianglyu
  - http://stackoverflow.com/users/693110/chunliang-lyu
# There is a basic theme support, try change `default` to `modern` (which is very early-stage)
theme: default
# You can also define custom CSS style here, it would be injected to the HTML
style: >
  /* hide sections on print*/
  @media print {
    section.summary, section.articles {
      display: none;
    }
  }
---

# Chunliang Lyu

## Summary
I am looking for a full-time developer job.
I have spent four years of PhD research on entity search and natural language processing,
  and have much experience in ElasticSearch, Lucene and Spark.
I speak proficiently in Python, Scala, Javascript and Java,
  and OK in Go, PHP and C++.
I love building stuff and believe in the power of technology,
  that is why I have spent the last year doing my startup [Hyperlink](https://hyperlinkapp.com).
You can check [my resume](https://chunlianglyu.com/resume/)
  and [my projects](https://chunlianglyu.com/projects/).
<a href="mailto:hi@chunlianglyu.com">Talk to me</a> if you are interested in working with me.

## Education

### [The Chinese University of Hong Kong], Ph.D. {2011 - 2016}
- Research Area: Entity Retrieval, Natural Language Processing, Knowledge Graph.

### National Taiwan University of Science and Technology, Visiting Student {2011 - 2011}

### [Beijing Institute of Technology], B.S. in Information Engineering, GPA 3.9 {2007 - 2011}

## Projects [[more]](https://chunlianglyu.com/projects/)

### [Hyperlink] (https://hyperlinkapp.com), Co-founder {2014 - 2015}
Hyperlink is a unified platform for searching and managing personal information streams across 13 online services, 
  such as social updates from Twitter and cloud files from Dropbox.

- Developed the backend in Python 3, with Flask/PostgreSQL/ElasticSearch/Celery as main stack.
- Designed the frontend using AngularJS, including extensive unit and end-to-end testing.
- Deployed the system on Amazon Web Services with Docker, designed and validated the scaling strategy.

### SwitchPal, Project Leader {2014 - 2015}
SwitchPal is a device that snaps over an existing switch and turn it into a smart one.
Equipped with multiple sensors,
  it can automate household appliances according to personal preferences.

- Designed the hardware based on the TI CC2540 MCU, controllable via a custom Bluetooth 4.0 profile.
- Implemented and released the iOS and Android apps, handling asynchronous Bluetooth operations.
- Saved more than 2/3 electricity by deploying to student hostels to automatically control the air conditioners.

### Entity Modeling and Retrieval System, Researcher {2012 - 2015}
Proposed a novel entity retrieval system based on entity factoid hierarchy,
  together with a new entity model considering the HTML structure in webpages.
Significantly improved the state-of-the-art performance.

- Consolidated information about millions of entities from ClueWeb09, Freebase and DBpedia.
- Designed an entity processing pipeline based on Spark, decreasing the processing time from days to hours.
- Implemented multiple retrieval models in Lucene, with customized query analyzer to handle entity queries.

### Twitter Recommendation System, Researcher {2011 - 2012}
Built a personalized tweets recommendation system based on user profiles,
  achieved superior performance.

- Constructed user profiles by aggregating keywords in tweets and propagating interests among friends.
- Crawled millions of tweets from hundreds of thousands of Twitter users to test the system.

## Technical Skills

- Language: Scala, Python, Java, JavaScript, PHP, C++
- Database: PostgreSQL, MongoDB, MySQL
- Framework: ElasticSearch, Lucene, Hadoop, Spark, ReactJS, AngularJS
- Tool: Git, Gulp, Linux, Docker, Amazon Web Services

## Experiences

- Semi-finalist in the 2015 Global Venture Labs Investment Competition, 2015
- Teaching Assistant for four undergraduate engineering courses at CUHK, 2012-2015
- Volunteer for the Charles K Kao Foundation for Alzheimer's Disease, 2011
- Organizer of the 6th Information Security and Countermeasures Contest, 2010
- Meritorious Winner in Mathematical Contest In Modeling, 2009

## Selected Publications [[more]](https://scholar.google.com.hk/citations?user=c5GAV_MAAAAJ)

- __C. Lu__, W. Lam, Y. Liao.
  Entity Retrieval via Entity Factoid Hierarchy.
  In: Proceedings of the 53rd Annual Meeting of the Association for Computational Linguistics (ACL). 2015.
- __C. Lu__, L. Bing, W. Lam.
  Structured Positional Entity Language Model for Enterprise Entity Retrieval.
  In: Proceedings of the 22nd ACM Conference on Information and Knowledge Management (CIKM). 2013.

## Selected Articles [[more]](https://chunlianglyu.com/articles/)

- [SORM2: Digging into Scala Internals](https://chunlianglyu.com/articles/sorm2/), Dec 2015
- [HTML Resume with Semantic Markup](https://chunlianglyu.com/articles/html-resume-with-semantic-markup/), Nov, 2015
- [Developing Chrome Extensions with AngularJS](https://chunlianglyu.com/articles/developing-chrome-extension-with-angularjs/), Nov, 2014
- [Control the Air Conditioner with Raspberry Pi](https://chunlianglyu.com/articles/control-air-conditioner-with-raspberry-pi/), Aug, 2013

<!--
  Markdown link definitions:
  By specify link titles as schema.org property names such as `alumniOf`,
  we mark the corresponding link text with semantic markup.
-->
[The Chinese University of Hong Kong]: https://www.cuhk.edu.hk/ (alumniOf)
[Beijing Institute of Technology]: http://www.bit.edu.cn/ (alumniOf)
[Hyperlink]: https://hyperlinkapp.com/ (worksFor)
