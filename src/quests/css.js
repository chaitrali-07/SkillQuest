export default {
  name: "CSS",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "What is CSS?",
      aiText: "CSS stands for Cascading Style Sheets. If HTML is the skeleton of a webpage, CSS is the skin, the clothes, and the hairstyle — it doesn't add new content, it decides how the existing content looks: colors, spacing, fonts, layout.",
      code: "<span class='comment'>/* CSS rules follow this pattern: */</span>\n\n<span class='keyword'>selector</span> {\n  <span class='string'>property</span>: value;\n}"
    },
    {
      id: 1,
      type: "lesson",
      title: "What is a Selector?",
      aiText: "A selector tells CSS which HTML element(s) to style. The simplest kind is a tag selector — just the tag name, no brackets. This rule below finds every <p> tag on the page and makes its text blue.",
      code: "<span class='keyword'>p</span> {\n  color: <span class='string'>blue</span>;\n}"
    },
    {
      id: 2,
      type: "lesson",
      title: "Colors & Text",
      aiText: "Two properties you'll use constantly: color changes the text color, and font-size changes how big the text is. Sizes are usually written in pixels (px) or a unit called rem — for now, px is easier to reason about.",
      code: "<span class='keyword'>h1</span> {\n  color: <span class='string'>darkslateblue</span>;\n  font-size: <span class='string'>32px</span>;\n}"
    },
    {
      id: 3,
      type: "quiz",
      title: "Quick Check",
      prompt: "Which CSS property changes the color of text?",
      options: ["font-size", "background", "color", "margin"],
      correctIndex: 2,
      explanation: "Correct — color controls text color. background controls the color behind it, which is a different thing."
    },
    {
      id: 4,
      type: "lesson",
      title: "The Box Model",
      aiText: "Every single HTML element is secretly a rectangular box, even if it doesn't look like one. Think of a framed photo: the picture itself is the content, the empty space between the picture and the frame is padding, the frame itself is the border, and the gap between this frame and the next one on the wall is the margin.",
      code: "<span class='keyword'>.box</span> {\n  padding: <span class='string'>16px</span>;   <span class='comment'>/* space inside, before the border */</span>\n  border: <span class='string'>2px solid black</span>;\n  margin: <span class='string'>20px</span>;    <span class='comment'>/* space outside the border */</span>\n}"
    },
    {
      id: 5,
      type: "lesson",
      title: "Centering with Flexbox",
      aiText: "This is the trick almost every beginner searches for eventually: how do I center something? Flexbox makes it two lines. display: flex turns an element into a flexible container, and justify-content plus align-items center anything inside it, both horizontally and vertically.",
      code: "<span class='keyword'>.container</span> {\n  display: <span class='string'>flex</span>;\n  justify-content: <span class='string'>center</span>;\n  align-items: <span class='string'>center</span>;\n}"
    },
    {
      id: 6,
      type: "quiz",
      title: "Quick Check",
      prompt: "Which property turns a regular element into a flex container?",
      options: ["float", "position", "display", "align"],
      correctIndex: 2,
      explanation: "Right — display: flex is what switches an element into flex mode in the first place."
    },
    {
      id: 7,
      type: "project",
      title: "Mini Project: Style Your Page",
      description: "Go back to the HTML page you built in the last quest and add a <style> section (or a separate CSS file, if you want to try linking one). Give it:",
      checklist: [
        "A background color for the whole page",
        "A different color for your <h1>",
        "Your <h1> centered using text-align: center",
        "A border around your <p> tag, with some padding inside it"
      ],
      note: "Same as before — this isn't auto-graded yet, just a self-check. Live code validation is planned for later."
    }
  ]
};