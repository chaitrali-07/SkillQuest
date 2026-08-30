export default {
  name: "Cloud Computing",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "What is Cloud Computing?",
      aiText: "Instead of buying and maintaining your own physical servers, cloud computing lets you rent computing power, storage, and other services from a company like AWS, Google Cloud, or Microsoft Azure over the internet — and you only pay for what you actually use.",
      code: "<span class='comment'>// Old way:</span>\n<span class='comment'>// Buy a physical server, install it, maintain it yourself</span>\n\n<span class='comment'>// Cloud way:</span>\n<span class='comment'>// Rent exactly the computing power you need, from anywhere</span>"
    },
    {
      id: 1,
      type: "lesson",
      title: "Servers vs \"The Cloud\"",
      aiText: "A server is really just a computer that stays turned on and responds to requests. \"The cloud\" isn't some special separate internet — it's just someone else's servers, professionally managed, that can automatically grow or shrink as your app needs more or less power.",
      code: "<span class='comment'>// \"The cloud\" =</span>\n<span class='comment'>// servers you don't own,</span>\n<span class='comment'>// running in someone else's data center,</span>\n<span class='comment'>// that you rent by the hour or by usage</span>"
    },
    {
      id: 2,
      type: "quiz",
      title: "Quick Check",
      prompt: "What does \"the cloud\" actually refer to?",
      options: [
        "A special, separate kind of internet",
        "Someone else's servers, that you rent",
        "A type of programming language",
        "A local hard drive on your own computer"
      ],
      correctIndex: 1,
      explanation: "Correct — cloud computing is just renting other people's well-managed servers."
    },
    {
      id: 3,
      type: "lesson",
      title: "Key Cloud Services",
      aiText: "Three basics you'll see everywhere: Compute — rented processing power to actually run your app. Storage — a place to keep files, like a giant rented hard drive. Database — a managed place to store and search through structured data.",
      code: "<span class='comment'>// Compute  -&gt; runs your code</span>\n<span class='comment'>// Storage  -&gt; holds your files</span>\n<span class='comment'>// Database -&gt; holds your structured data</span>"
    },
    {
      id: 4,
      type: "lesson",
      title: "What is a Container?",
      aiText: "A container packages your app together with everything it needs to run — code, libraries, settings — so it behaves exactly the same no matter which computer it runs on. Think of a shipping container: the same box fits on a ship, a truck, or a train without anyone repacking it.",
      code: "<span class='comment'>// A container bundles:</span>\n<span class='comment'>//  - your app's code</span>\n<span class='comment'>//  - everything it depends on</span>\n<span class='comment'>// into one portable package</span>"
    },
    {
      id: 5,
      type: "quiz",
      title: "Quick Check",
      prompt: "What problem do containers mainly solve?",
      options: [
        "Making your code run faster",
        "Making an app behave the same everywhere it runs",
        "Replacing the need for the internet",
        "Automatically deleting old files"
      ],
      correctIndex: 1,
      explanation: "Right — consistency across different machines is the core benefit of containers."
    },
    {
      id: 6,
      type: "lesson",
      title: "Deploying an App",
      aiText: "This kind of file is a small \"recipe\" that tells a cloud system how to run your app. This one says: run 3 identical copies (replicas) of the app at once, so if one crashes or gets overloaded, the others keep everything running smoothly.",
      code: "<span class='comment'># CLOUD DEPLOYMENT RECIPE</span>\n\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: skillquest-app\nspec:\n  replicas: 3"
    },
    {
      id: 7,
      type: "project",
      title: "Mini Project: Explore a Free Cloud Tier",
      description: "This one is exploratory — getting familiar with a real cloud dashboard before writing any deployment configs of your own:",
      checklist: [
        "Sign up for a free tier account on AWS, Google Cloud, or Azure (all offer one)",
        "Find where you'd create a storage bucket or a virtual machine in the dashboard (you don't have to actually create one)",
        "In your own words, write down what compute vs storage means, based on what you saw"
      ],
      note: "No code required for this one — just exploration and understanding the dashboard."
    }
  ]
};