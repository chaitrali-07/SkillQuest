export default {
  name: "C",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "What is C?",
      aiText: "C is one of the oldest and most influential programming languages — many other languages (including C++ and Java) borrow ideas directly from it. C is fast and lets you work close to how the computer's memory actually works, which is why it's still used for operating systems and embedded devices today.",
      code: "<span class='comment'>// Every C program starts with this line,</span>\n<span class='comment'>// which gives you access to printf</span>\n<span class='keyword'>#include</span> &lt;stdio.h&gt;\n\n<span class='keyword'>int</span> main() {\n    printf(<span class='string'>\"Hello, World!\\n\"</span>);\n    <span class='keyword'>return</span> 0;\n}"
    },
    {
      id: 1,
      type: "lesson",
      title: "Variables & Data Types",
      aiText: "In C, every variable must say up front what TYPE of value it will hold. int holds whole numbers, float holds decimal numbers, and char holds a single character (in single quotes).",
      code: "<span class='keyword'>int</span> age = 20;        <span class='comment'>// whole numbers</span>\n<span class='keyword'>float</span> price = 9.99;   <span class='comment'>// decimal numbers</span>\n<span class='keyword'>char</span> grade = <span class='string'>'A'</span>;    <span class='comment'>// one character</span>"
    },
    {
      id: 2,
      type: "lesson",
      title: "Printing Output with printf",
      aiText: "printf is how C displays text on screen. To insert a variable's value into the text, you use a placeholder like %d (for whole numbers) or %f (for decimals), and list the variable afterward.",
      code: "<span class='keyword'>int</span> age = 20;\nprintf(<span class='string'>\"Age: %d\\n\"</span>, age);   <span class='comment'>// Age: 20</span>"
    },
    {
      id: 3,
      type: "quiz",
      title: "Quick Check",
      prompt: "Which placeholder prints a whole number (int) with printf?",
      options: ["%f", "%c", "%d", "%s"],
      correctIndex: 2,
      explanation: "Correct — %d is for whole numbers (integers). %f is for decimals, %c is for a single character."
    },
    {
      id: 4,
      type: "lesson",
      title: "If / Else Decisions",
      aiText: "Just like other languages, C uses if and else to run different code depending on a condition.",
      code: "<span class='keyword'>int</span> age = 20;\n\n<span class='keyword'>if</span> (age &gt;= 18) {\n    printf(<span class='string'>\"You can vote.\\n\"</span>);\n} <span class='keyword'>else</span> {\n    printf(<span class='string'>\"Too young to vote.\\n\"</span>);\n}"
    },
    {
      id: 5,
      type: "lesson",
      title: "Loops: for",
      aiText: "A for loop repeats a block of code a set number of times. This one starts i at 1, keeps going as long as i is 5 or less, and adds 1 to i after every round.",
      code: "<span class='keyword'>for</span> (<span class='keyword'>int</span> i = 1; i &lt;= 5; i++) {\n    printf(<span class='string'>\"%d\\n\"</span>, i);\n}\n<span class='comment'>// prints: 1 2 3 4 5</span>"
    },
    {
      id: 6,
      type: "quiz",
      title: "Quick Check",
      prompt: "What does a for loop let you do?",
      options: [
        "Repeat a block of code multiple times",
        "Store a value permanently",
        "Connect your program to the internet",
        "Delete a variable"
      ],
      correctIndex: 0,
      explanation: "Right — loops exist specifically to repeat code without retyping it."
    },
    {
      id: 7,
      type: "project",
      title: "Mini Project: Number Checker",
      description: "Write a small C program (using any online C compiler if you don't have one installed) that:",
      checklist: [
        "Declares an int variable holding any number",
        "Uses if/else to print whether that number is even or odd",
        "Uses a for loop to print the numbers 1 through 10"
      ],
      note: "Self-check for now — run it and confirm the output looks right. Live code grading is planned for later."
    }
  ]
};