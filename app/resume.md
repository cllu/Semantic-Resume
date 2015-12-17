---
# START HERE
#
# You can check the source code at https://github.com/cllu/Semantic-Resume
#
# Note: all your edit will be automatically saved to your browser.
#       try edit and reload the browser.
#
# The right-upper corner has three buttons, from left to right:
# - toggle the editor here
# - toggle the preview HTML source code
# - download the generated HTML file (with CSS/JS inlined)
#
# To export to PDF file, try print and then choose Save as PDF.
#
# Cannot live without VIM? Me too, Try Alt+X to enable VIM keybindings.
#
name: Chunliang Lyu
website: https://chunlianglyu.com
email: hi@chunlianglyu.com
github: cllu
# There is a basic theme support, try change `default` to `modern`
theme: default
# You can also define custom CSS style here, it would be injected to the HTML
style: >
  header h1 {}
---

# Chunliang Lyu

## Education

### [The Chinese University of Hong Kong], Ph.D. {2011 - 2016}
- Research Area: Entity Retrieval, Natural Language Processing, Knowledge Graph.

### National Taiwan University of Science and Technology, Visiting Student {2011 - 2011}

### [Beijing Institute of Technology], B.S. in Information Engineering, GPA 3.9 {2007 - 2011}

## Projects [more](https://chunlianlgyu.com/projects/)

### [Hyperlink] (https://hyperlinkapp.com), Co-founder {2014 - 2015}
Hyperlink is a unified platform for searching and managing personal information streams across 13 online
services, such as social updates from Twitter and cloud files from Dropbox.

- Developed the backend in Python 3, with Flask/PostgreSQL/ElasticSearch/Celery as main stack.
- Designed the frontend usingAngularJS, including extensive unit and end-to-end testing.
- Deployed and optimized the system onAmazon Web Services to support up to 10K concurrent users.

### SwitchPal, Project Leader {2014 - 2015}
SwitchPal is a device that snaps over an existing switch and turn it into a smart one. Equipped with multiple
sensors, it can automate household appliances according to personal preferences.

- Designed the hardware based on the TI CC2540 MCU, controllable via a custom Bluetooth 4.0 profile.
- Implemented and released the iOS andAndroid companion apps.
- Saved more than 2/3 electricity by deploying to student hostels to automatically control the air conditioners.

### Entity Modeling and Retrieval System, Principle Researcher {2012 - 2015}
Proposed a novel entity retrieval system based on entity factoid hierarchy, together with a new entity model
considering the HTML structure in webpages. Significantly improved the state-of-the-art performance.

- Consolidated information about millions of entities from ClueWeb09 (25TB), Freebase (380GB) and DBpedia.
- Designed an entity processing pipeline based on Spark, decreasing the processing time from days to hours.
- Implemented multiple retrieval models in Lucene, with customized query analyzer to handle entity queries.

### Twitter Recommendation System, Principle Researcher {2011 - 2012}
Built a personalized tweets recommendation system based on user profiles, achieved superior performance.

- Constructed user profiles by aggregating keywords in tweets and propagating interests among friends.
- Crawled millions of tweets from hundreds of thousands of Twitter users to test the system.

## Technical Skills

- Language: Scala, Python, Java, JavaScript, PHP, C++
- Database: PostgreSQL, MongoDB, MySQL
- Framework: ElasticSearch, Lucene, Hadoop, Spark, ReactJS, AngularJS
- Tool: Git, Gulp, Linux, Docker, Amazon Web Services

## Experiences

- Semifinalist in the 2015 Global Venture Labs Investment Competition, 2015
- TeachingAssistant for four undergraduate engineering courses at CUHK, 2012-2015
- Volunteer for the Charles K Kao Foundation for Alzheimer's Disease, 2011
- Organizer of the 6th Information Security and Countermeasures Contest, 2010
- Meritorious Winner in Mathematical Contest In Modeling, 2009

## Selected Publications [more](https://scholar.google.com.hk/citations?user=c5GAV_MAAAAJ)

- C. Lu, W. Lam, Y. Liao. Entity Retrieval via Entity Factoid Hierarchy. In: Proceedings of the 53rd Annual
  Meeting of the Association for Computational Linguistics (ACL). 2015.
- C. Lu, L. Bing, W. Lam. Structured Positional Entity Language Model for Enterprise Entity Retrieval. In:
  Proceedings of the 22nd ACM Conference on Information and Knowledge Management (CIKM). 2013.

## Selected Articles [more](https://chunlianglyu.com/articles/)

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
[Beijing Institute of Technology]: http://bit.edu.cn/ (alumniOf)
[Hyperlink]: https://hyperlinkapp.com/ (worksFor)
