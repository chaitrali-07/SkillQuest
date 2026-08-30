export default {
  name: "C++",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "What is C++?",
      aiText: "C++ takes everything C can do and adds \"objects\" — a way to bundle related data and behavior together into one reusable unit. It's used heavily in games, applications, and anywhere performance really matters.",
      code: "<span class='keyword'>#include</span> &lt;iostream&gt;\n<span class='keyword'>using namespace</span> std;\n\n<span class='keyword'>int</span> main() {\n    cout &lt;&lt; <span class='string'>\"Hello, World!\"</span> &lt;&lt; endl;\n    <span class='keyword'>return</span> 0;\n}"
    },
    {
      id: 1,
      type: "lesson",
      title: "Classes: Bundling Data and Behavior",
      aiText: "A class is a blueprint that bundles variables (data) and functions (behavior) together. Think of a Car class: it holds data like speed, and behavior like a function that increases that speed.",
      code: "<span class='keyword'>class</span> Car {\n  <span class='keyword'>public:</span>\n    <span class='keyword'>int</span> speed = 0;\n    <span class='keyword'>void</span> accelerate() {\n      speed = speed + 10;\n    }\n};"
    },
    {
      id: 2,
      type: "quiz",
      title: "Quick Check",
      prompt: "What does a class let you bundle together?",
      options: ["Only numbers", "Data and functions together", "Only text", "Nothing special — it's just a comment"],
      correctIndex: 1,
      explanation: "Correct — that bundling of data + behavior is the whole point of a class."
    },
    {
      id: 3,
      type: "lesson",
      title: "Objects: Using a Class",
      aiText: "A class is just the blueprint — an object is an actual, usable thing built from that blueprint. You can create as many objects from one class as you want, each with its own separate data.",
      code: "Car myCar;              <span class='comment'>// create an object from the Car class</span>\nmyCar.accelerate();\ncout &lt;&lt; myCar.speed;   <span class='comment'>// prints: 10</span>"
    },
    {
      id: 4,
      type: "lesson",
      title: "Constructors",
      aiText: "A constructor is a special function that runs automatically the moment an object is created — it's used to set up starting values so you don't forget to.",
      code: "<span class='keyword'>class</span> Car {\n  <span class='keyword'>public:</span>\n    <span class='keyword'>int</span> speed;\n    Car() {          <span class='comment'>// constructor</span>\n      speed = 0;\n    }\n};"
    },
    {
      id: 5,
      type: "quiz",
      title: "Quick Check",
      prompt: "When does a constructor run?",
      options: [
        "Only when you call it by name",
        "Automatically, the moment an object is created",
        "At the very end of the program",
        "It never runs on its own"
      ],
      correctIndex: 1,
      explanation: "Right — that's exactly what makes it a constructor rather than a regular function."
    },
    {
      id: 6,
      type: "project",
      title: "Mini Project: Build a Book Class",
      description: "Write a small C++ program that defines a Book class with:",
      checklist: [
        "Two variables: title and author",
        "A constructor that sets both when a Book is created",
        "A function that prints \"<title> by <author>\"",
        "At least one Book object created and its info printed"
      ],
      note: "Self-check for now — run it and confirm the output looks right."
    }
  ]
};