export default {
  name: "HTML",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "What is HTML?",
      aiText: "HTML stands for HyperText Markup Language. Don't let the name scare you — it just means \"a way to label content so a browser knows what it's looking at.\" HTML is the skeleton of every webpage you've ever visited. It doesn't make things colorful or pretty — that's a different tool's job. HTML's only job is to say \"this is a heading\", \"this is a paragraph\", \"this is a picture.\"",
      code: "<span class='comment'>&lt;!-- Every HTML page starts like this --&gt;</span>\n\n<span class='keyword'>&lt;!DOCTYPE html&gt;</span>\n<span class='keyword'>&lt;</span><span class='string'>html</span><span class='keyword'>&gt;</span>\n  <span class='comment'>&lt;!-- your page goes here --&gt;</span>\n<span class='keyword'>&lt;/</span><span class='string'>html</span><span class='keyword'>&gt;</span>"
    },
    {
      id: 1,
      type: "lesson",
      title: "What is a Tag?",
      aiText: "A \"tag\" is just a word wrapped in angle brackets, like <p>. It labels the content that comes after it. Most tags come in pairs: an opening tag like <p> and a matching closing tag like </p>, with your actual content sandwiched in between — like bread, filling, bread.",
      code: "<span class='comment'>// An opening tag, some content, and a closing tag</span>\n\n<span class='keyword'>&lt;</span><span class='string'>p</span><span class='keyword'>&gt;</span>This is the filling.<span class='keyword'>&lt;/</span><span class='string'>p</span><span class='keyword'>&gt;</span>"
    },
    {
      id: 2,
      type: "lesson",
      title: "The <h1> Tag",
      aiText: "h1 stands for \"Heading 1\" — it's the biggest, most important heading on a page, like a newspaper's main headline. There's also h2, h3, all the way down to h6, each one a little smaller and less important than the last.",
      code: "<span class='keyword'>&lt;</span><span class='string'>h1</span><span class='keyword'>&gt;</span>Welcome to My Website<span class='keyword'>&lt;/</span><span class='string'>h1</span><span class='keyword'>&gt;</span>"
    },
    {
      id: 3,
      type: "quiz",
      title: "Quick Check",
      prompt: "Which tag would you use for the SINGLE most important heading on a page?",
      options: ["<h6>", "<p>", "<h1>", "<div>"],
      correctIndex: 2,
      explanation: "Correct! <h1> is reserved for the one main heading — usually there's only one per page."
    },
    {
      id: 4,
      type: "lesson",
      title: "The <p> Tag",
      aiText: "p stands for \"paragraph.\" Use it for regular blocks of text — like the sentence you're reading right now, if this were on a real webpage instead of inside this lesson.",
      code: "<span class='keyword'>&lt;</span><span class='string'>p</span><span class='keyword'>&gt;</span>HTML is a lot easier once you know the basics.<span class='keyword'>&lt;/</span><span class='string'>p</span><span class='keyword'>&gt;</span>"
    },
    {
      id: 5,
      type: "lesson",
      title: "The <a> Tag (Links)",
      aiText: "a stands for \"anchor\" — it creates a clickable link. It needs an extra piece of information called an \"attribute\": href, short for \"hypertext reference,\" which tells the browser where the link should go.",
      code: "<span class='keyword'>&lt;</span><span class='string'>a</span> href=<span class='string'>\"https://example.com\"</span><span class='keyword'>&gt;</span>Click here<span class='keyword'>&lt;/</span><span class='string'>a</span><span class='keyword'>&gt;</span>"
    },
    {
      id: 6,
      type: "quiz",
      title: "Quick Check",
      prompt: "What does the href part of a link tag control?",
      options: ["The color of the text", "Where the link takes you", "How big the text is", "The font of the text"],
      correctIndex: 1,
      explanation: "Right — href tells the browser which page or address to open when the link is clicked."
    },
    {
      id: 7,
      type: "project",
      title: "Mini Project: Your First Page",
      description: "Time to put it all together. Open any text editor (even Notepad works) and write a tiny HTML page with:",
      checklist: [
        "One <h1> tag with your name in it",
        "One <p> tag with one sentence about yourself",
        "One <a> tag that links to any website you like"
      ],
      note: "This step isn't auto-graded yet — just build it, and check it off once you're happy with it. Live code checking is planned for a future update."
    }
  ]
};