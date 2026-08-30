export default {
  name: "Python",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "What is Python?",
      aiText: "Python reads almost like plain English, which is why it's a favorite for automation, data analysis, and AI. One big difference from C, C++, and Java: Python doesn't use curly braces { } — it uses indentation (spacing) to show what code belongs inside what.",
      code: "print(<span class='string'>\"Hello, World!\"</span>)"
    },
    {
      id: 1,
      type: "lesson",
      title: "Variables & print()",
      aiText: "Python variables don't need a declared type up front — you just assign a value and Python figures out the rest. print() displays things on screen, and you can pass it several values separated by commas.",
      code: "age = 20\nname = <span class='string'>\"Alex\"</span>\nprint(name, <span class='string'>\"is\"</span>, age, <span class='string'>\"years old\"</span>)"
    },
    {
      id: 2,
      type: "lesson",
      title: "If / Else — Indentation Matters!",
      aiText: "Python uses a colon (:) followed by indented lines to mark what's \"inside\" an if block — no curly braces needed. Getting the indentation wrong is the single most common beginner mistake in Python, so pay close attention to spacing.",
      code: "age = 20\n<span class='keyword'>if</span> age &gt;= 18:\n    print(<span class='string'>\"Adult\"</span>)\n<span class='keyword'>else</span>:\n    print(<span class='string'>\"Minor\"</span>)"
    },
    {
      id: 3,
      type: "quiz",
      title: "Quick Check",
      prompt: "In Python, what replaces curly braces { } to show what's inside an if block?",
      options: ["Parentheses ()", "Indentation (spacing)", "Semicolons ;", "Square brackets []"],
      correctIndex: 1,
      explanation: "Correct — Python relies on consistent indentation instead of braces."
    },
    {
      id: 4,
      type: "lesson",
      title: "Loops: for and range()",
      aiText: "range(1, 6) generates the numbers 1 through 5 (it stops just before the second number). A for loop then runs once for each of those numbers.",
      code: "<span class='keyword'>for</span> i <span class='keyword'>in</span> range(1, 6):\n    print(i)\n<span class='comment'># prints: 1 2 3 4 5</span>"
    },
    {
      id: 5,
      type: "lesson",
      title: "Lists & Dictionaries",
      aiText: "A list holds an ordered collection of items, accessed by position (starting at 0). A dictionary holds key-value pairs, accessed by name instead of position — useful for labeled data like settings.",
      code: "fruits = [<span class='string'>\"apple\"</span>, <span class='string'>\"banana\"</span>, <span class='string'>\"cherry\"</span>]\nprint(fruits[0])   <span class='comment'># apple</span>\n\nconfig = {\n    <span class='string'>\"protocol\"</span>: <span class='string'>\"secure\"</span>,\n    <span class='string'>\"port\"</span>: 8080\n}\nprint(config[<span class='string'>\"protocol\"</span>])"
    },
    {
      id: 6,
      type: "quiz",
      title: "Quick Check",
      prompt: "How do you get the FIRST item out of a Python list called fruits?",
      options: ["fruits(0)", "fruits[0]", "fruits.first()", "fruits{0}"],
      correctIndex: 1,
      explanation: "Right — square brackets with the position number (starting at 0) access a list item."
    },
    {
      id: 7,
      type: "project",
      title: "Mini Project: Contact Card",
      description: "Write a small Python script that:",
      checklist: [
        "Stores a dictionary with name, age, and email keys",
        "Uses if/else to check whether the age is 18 or older",
        "Uses a for loop to print each key and value in the dictionary"
      ],
      note: "Self-check for now — run it and confirm the output looks right."
    }
  ]
};