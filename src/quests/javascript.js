export default {
  name: "JavaScript",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "What is JavaScript?",
      aiText: "HTML builds the page, CSS makes it look nice, and JavaScript makes it actually DO things — respond to clicks, update text on screen, check if a form was filled in correctly, and so on. It's the only one of the three that can make decisions and repeat actions.",
      code: "<span class='comment'>// A tiny taste of what JS can do:</span>\n\n<span class='keyword'>alert</span>(<span class='string'>'Hello, world!'</span>);"
    },
    {
      id: 1,
      type: "lesson",
      title: "Variables: let and const",
      aiText: "A variable is just a labeled box that holds a value. Use let when the value might change later — like a score that goes up. Use const when the value should never change after you set it — like someone's name. If you try to change a const later, JavaScript will stop you with an error, which is actually a helpful safety net.",
      code: "<span class='keyword'>let</span> score = 0;        <span class='comment'>// can change later</span>\n<span class='keyword'>const</span> playerName = <span class='string'>'Alex'</span>;  <span class='comment'>// should not change</span>\n\nscore = score + 10;  <span class='comment'>// this is fine</span>"
    },
    {
      id: 2,
      type: "quiz",
      title: "Quick Check",
      prompt: "You're storing a user's age, which will update every birthday. Which keyword should you use?",
      options: ["const", "let", "var", "final"],
      correctIndex: 1,
      explanation: "Correct — let is for values that are expected to change over time."
    },
    {
      id: 3,
      type: "lesson",
      title: "Making Decisions: if / else",
      aiText: "Real programs need to react differently depending on the situation. An if statement checks something, and only runs its code if that check is true. else gives it a backup plan for when the check is false — like deciding whether to bring an umbrella based on whether it's raining.",
      code: "<span class='keyword'>const</span> isRaining = <span class='keyword'>true</span>;\n\n<span class='keyword'>if</span> (isRaining) {\n  console.log(<span class='string'>'Bring an umbrella!'</span>);\n} <span class='keyword'>else</span> {\n  console.log(<span class='string'>'Enjoy the sun.'</span>);\n}"
    },
    {
      id: 4,
      type: "lesson",
      title: "Comparing Values",
      aiText: "To check something inside an if, you need comparison symbols: < (less than), > (greater than), and === (equal to — three equals signs, not one). A single = means something different in JavaScript (it assigns a value), so mixing them up is one of the most common beginner mistakes.",
      code: "<span class='keyword'>let</span> age = 20;\n\n<span class='keyword'>if</span> (age <span class='keyword'>&gt;</span>= 18) {\n  console.log(<span class='string'>'You can vote.'</span>);\n}\n\n<span class='comment'>// age === 20  → checking (true or false)</span>\n<span class='comment'>// age = 20    → assigning (sets the value)</span>"
    },
    {
      id: 5,
      type: "quiz",
      title: "Quick Check",
      prompt: "Which symbol checks if two values are equal, without accidentally changing either one?",
      options: ["=", "==", "===", "=>"],
      correctIndex: 2,
      explanation: "Right — === compares two values safely. A single = would overwrite the variable instead of checking it."
    },
    {
      id: 6,
      type: "lesson",
      title: "Functions: Reusable Instructions",
      aiText: "A function is a named block of instructions you can reuse as many times as you want, instead of retyping the same code over and over. You define it once with the function keyword, then call it by name whenever you need it to run.",
      code: "<span class='keyword'>function</span> greet(name) {\n  console.log(<span class='string'>'Hello, '</span> + name + <span class='string'>'!'</span>);\n}\n\ngreet(<span class='string'>'Alex'</span>);  <span class='comment'>// logs: Hello, Alex!</span>\ngreet(<span class='string'>'Sam'</span>);   <span class='comment'>// logs: Hello, Sam!</span>"
    },
    {
      id: 7,
      type: "project",
      title: "Mini Project: A Tiny Script",
      description: "Open your browser's console (right-click a page → Inspect → Console tab) and write a small script that uses everything from this lesson together:",
      checklist: [
        "A let variable holding a number (like a score or age)",
        "An if/else that checks that variable and logs a different message for each case",
        "A function that takes a name and logs a greeting, called at least twice with different names"
      ],
      note: "Self-check for now — paste your code into the console and confirm it runs without errors. Live grading is planned for later."
    }
  ]
};