export default {
  name: "Fundamentals of AI & ML",
  nodes: [
    {
      id: 0,
      type: "lesson",
      title: "What is AI & ML?",
      aiText: "AI (Artificial Intelligence) means getting computers to do tasks that normally require human judgment. Machine Learning (ML) is one specific way to build AI: instead of writing exact step-by-step rules, you show the computer lots of examples and let it find the pattern itself.",
      code: "<span class='comment'># Traditional programming: you write the rule</span>\n<span class='keyword'>if</span> temperature &gt; 30:\n    print(<span class='string'>\"It's hot\"</span>)\n\n<span class='comment'># Machine learning: the computer LEARNS the rule</span>\n<span class='comment'># from thousands of past examples instead</span>"
    },
    {
      id: 1,
      type: "lesson",
      title: "Data: Features & Labels",
      aiText: "ML models learn from a dataset — rows of examples with columns called features (the input information) and one label (the answer you want the model to learn to predict). For example: features could be a house's size and location, and the label would be its price.",
      code: "<span class='comment'># feature 1   feature 2      label</span>\n<span class='comment'>#   size        location       price</span>\n<span class='comment'>#   1200 sqft   Downtown       250000</span>"
    },
    {
      id: 2,
      type: "quiz",
      title: "Quick Check",
      prompt: "In a dataset used to predict house prices, what would the PRICE itself be called?",
      options: ["A feature", "A label", "A model", "A loop"],
      correctIndex: 1,
      explanation: "Correct — the label is the answer you're trying to teach the model to predict."
    },
    {
      id: 3,
      type: "lesson",
      title: "Training vs Testing",
      aiText: "You never train and test a model on the exact same data. Instead, you split your dataset: one part trains the model (lets it learn patterns), and a separate part — which the model has never seen — tests whether it actually learned, rather than just memorizing the training examples.",
      code: "<span class='comment'># Roughly:</span>\n<span class='comment'># 80% of the data -&gt; used for training</span>\n<span class='comment'># 20% of the data -&gt; held back for testing</span>"
    },
    {
      id: 4,
      type: "lesson",
      title: "Model Weights & Predictions",
      aiText: "Under the hood, most ML models are really just numbers called weights, multiplied against your input features. At the very start, these weights are random guesses — training is the process of slowly adjusting them so the model's predictions get closer to the real labels.",
      code: "<span class='keyword'>import</span> numpy <span class='keyword'>as</span> np\n\nweights = np.random.randn(3, 3)\nprint(<span class='string'>\"Starting weights:\"</span>, weights.shape)\n<span class='comment'># at this point, these are just random guesses</span>"
    },
    {
      id: 5,
      type: "quiz",
      title: "Quick Check",
      prompt: "Why do we test a model on data it has never seen before?",
      options: [
        "To make training run faster",
        "To check if it actually learned patterns, instead of just memorizing",
        "To save storage space",
        "It isn't necessary — you can test on training data"
      ],
      correctIndex: 1,
      explanation: "Right — testing on unseen data is the only real way to know if a model generalizes."
    },
    {
      id: 6,
      type: "project",
      title: "Mini Project: Explore a Tiny Dataset",
      description: "This one is exploratory rather than code-heavy — you're getting comfortable looking at real data before building models on it:",
      checklist: [
        "Install pandas (pip install pandas)",
        "Make a tiny CSV file yourself (5 rows, a few columns) in Notepad or Excel",
        "Load it with pandas.read_csv() and print the first rows using .head()",
        "Decide which column would be the label if you were predicting something from this data"
      ],
      note: "Training an actual model comes in a later, more advanced quest — this step is just about getting comfortable looking at real data."
    }
  ]
};