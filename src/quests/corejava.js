export default {
  name: "Core Java",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "What is Java?",
      aiText: "Java is object-oriented like C++, but with one big difference: Java code runs on something called the JVM (Java Virtual Machine), which means the exact same Java program runs unchanged on Windows, Mac, or Linux. That's Java's famous motto: \"write once, run anywhere.\"",
      code: "<span class='keyword'>public class</span> Main {\n    <span class='keyword'>public static void</span> main(String[] args) {\n        System.out.println(<span class='string'>\"Hello, World!\"</span>);\n    }\n}"
    },
    {
      id: 1,
      type: "lesson",
      title: "Classes & the main Method",
      aiText: "Every Java program lives inside a class. Execution always starts from a special method called main — think of it as the front door of the program; Java walks in through main and starts running from there.",
      code: "<span class='comment'>// \"Main\" here is just a name — it could be called anything.</span>\n<span class='comment'>// But there must always be exactly one \"main\" method to start from.</span>\n<span class='keyword'>public static void</span> main(String[] args) {\n    <span class='comment'>// program starts here</span>\n}"
    },
    {
      id: 2,
      type: "lesson",
      title: "Variables & Data Types in Java",
      aiText: "Java variables also need a declared type, similar to C. String (capital S) is Java's built-in type for text, and boolean holds only true or false.",
      code: "<span class='keyword'>int</span> age = 20;\n<span class='keyword'>double</span> price = 9.99;\nString name = <span class='string'>\"Alex\"</span>;\n<span class='keyword'>boolean</span> isStudent = <span class='keyword'>true</span>;"
    },
    {
      id: 3,
      type: "quiz",
      title: "Quick Check",
      prompt: "Which Java type would you use to store text like a person's name?",
      options: ["int", "boolean", "String", "double"],
      correctIndex: 2,
      explanation: "Correct — String is Java's built-in type for text."
    },
    {
      id: 4,
      type: "lesson",
      title: "If/Else and Loops in Java",
      aiText: "You already know this logic from earlier languages — Java's if/else and for loop syntax will look very familiar.",
      code: "<span class='keyword'>int</span> age = 20;\n<span class='keyword'>if</span> (age &gt;= 18) {\n    System.out.println(<span class='string'>\"Adult\"</span>);\n} <span class='keyword'>else</span> {\n    System.out.println(<span class='string'>\"Minor\"</span>);\n}\n\n<span class='keyword'>for</span> (<span class='keyword'>int</span> i = 1; i &lt;= 5; i++) {\n    System.out.println(i);\n}"
    },
    {
      id: 5,
      type: "quiz",
      title: "Quick Check",
      prompt: "What is the entry point of every Java program?",
      options: ["The class name", "The main method", "The first variable declared", "The println statement"],
      correctIndex: 1,
      explanation: "Right — Java always starts running from main, no matter how the rest of the code is organized."
    },
    {
      id: 6,
      type: "project",
      title: "Mini Project: Multiplication Table",
      description: "Write a Java program that:",
      checklist: [
        "Has a Main class with a main method",
        "Uses a for loop to print the multiplication table (1 through 10) of any number you choose",
        "Uses an if statement somewhere in the program"
      ],
      note: "Self-check for now — run it and confirm the table is correct."
    }
  ]
};