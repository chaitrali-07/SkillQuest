export default {
  name: "Advanced Java",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "Inheritance: Reusing a Class",
      aiText: "Inheritance lets one class reuse the fields and methods of another, using the keyword extends. This avoids rewriting the same code twice — Dog automatically gets everything Animal already has, plus its own extra behavior.",
      code: "<span class='keyword'>class</span> Animal {\n    <span class='keyword'>void</span> eat() {\n        System.out.println(<span class='string'>\"This animal eats food.\"</span>);\n    }\n}\n\n<span class='keyword'>class</span> Dog <span class='keyword'>extends</span> Animal {\n    <span class='keyword'>void</span> bark() {\n        System.out.println(<span class='string'>\"Woof!\"</span>);\n    }\n}"
    },
    {
      id: 1,
      type: "lesson",
      title: "Interfaces: A Contract for Classes",
      aiText: "An interface lists method names a class MUST implement, without saying how. It's like a contract: any class that \"implements\" Shape promises to provide a working area() method, even though every shape calculates it differently.",
      code: "<span class='keyword'>interface</span> Shape {\n    <span class='keyword'>double</span> area();\n}\n\n<span class='keyword'>class</span> Circle <span class='keyword'>implements</span> Shape {\n    <span class='keyword'>double</span> radius = 5;\n    <span class='keyword'>public double</span> area() {\n        <span class='keyword'>return</span> 3.14 * radius * radius;\n    }\n}"
    },
    {
      id: 2,
      type: "quiz",
      title: "Quick Check",
      prompt: "What does extends let a class do?",
      options: [
        "Delete another class",
        "Reuse the fields and methods of another class",
        "Run faster than normal",
        "Automatically connect to the internet"
      ],
      correctIndex: 1,
      explanation: "Correct — extends is how one class inherits from another instead of duplicating code."
    },
    {
      id: 3,
      type: "lesson",
      title: "Collections: ArrayList",
      aiText: "A regular array in Java has a fixed size decided up front. An ArrayList is a resizable list — you can keep adding items to it without knowing how many you'll need in advance.",
      code: "<span class='keyword'>import</span> java.util.ArrayList;\n\nArrayList&lt;String&gt; names = <span class='keyword'>new</span> ArrayList&lt;&gt;();\nnames.add(<span class='string'>\"Alex\"</span>);\nnames.add(<span class='string'>\"Sam\"</span>);\nSystem.out.println(names);   <span class='comment'>// [Alex, Sam]</span>"
    },
    {
      id: 4,
      type: "lesson",
      title: "Streams & Lambda",
      aiText: "A stream lets you process a whole list in a readable, step-by-step pipeline instead of writing a manual loop. A lambda (the t -> ... part) is a short, unnamed function you write inline, right where it's needed.",
      code: "List&lt;String&gt; targets = Arrays.asList(<span class='string'>\"Alpha\"</span>, <span class='string'>\"Beta\"</span>);\n\ntargets.stream()\n  .filter(t -&gt; t.startsWith(<span class='string'>\"A\"</span>))\n  .forEach(System.out::println);\n<span class='comment'>// prints: Alpha</span>"
    },
    {
      id: 5,
      type: "quiz",
      title: "Quick Check",
      prompt: "What does a lambda expression let you write?",
      options: ["A full class definition", "A short, inline function", "A new data type", "A code comment"],
      correctIndex: 1,
      explanation: "Right — lambdas are compact, unnamed functions written exactly where you need them."
    },
    {
      id: 6,
      type: "project",
      title: "Mini Project: Pet Shelter",
      description: "Write a Java program that:",
      checklist: [
        "Has an Animal class with an eat() method",
        "Has a Dog class that extends Animal and adds a bark() method",
        "Stores a few Dog objects in an ArrayList",
        "Loops through the ArrayList and prints each dog's info"
      ],
      note: "Self-check for now — run it and confirm all your dogs print correctly."
    }
  ]
};