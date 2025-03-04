const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS configuration
const corsOptions = {
  origin: "*", // WARNING: Allowing all origins; adjust as needed
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type"
};

app.use(cors(corsOptions));
app.use(express.json());

// Sample data storage (In-memory array, replace with database in production)
let models = [];

// Get all models
app.get("/models", (req, res) => {
  res.json(models);
});

// Add a new model
app.post("/models", (req, res) => {
  const { image, name, about, sqft, person, res: response, price, location, image2, image3, image4 } = req.body;
  
  if (!name || !price || !location) {
    return res.status(400).json({ error: "Name, price, and location are required" });
  }

  const newModel = {
    id: models.length + 1,
    image,
    name,
    about,
    sqft,
    person,
    res: response,
    price,
    location,
    image2,
    image3,
    image4
  };

  models.push(newModel);
  res.status(201).json(newModel);
});

// Get a model by ID
app.get("/models/:id", (req, res) => {
  const model = models.find(m => m.id === parseInt(req.params.id));
  if (!model) return res.status(404).json({ error: "Model not found" });
  res.json(model);
});

// Update a model
app.put("/models/:id", (req, res) => {
  const model = models.find(m => m.id === parseInt(req.params.id));
  if (!model) return res.status(404).json({ error: "Model not found" });
  
  Object.assign(model, req.body);
  res.json(model);
});

// Delete a model
app.delete("/models/:id", (req, res) => {
  models = models.filter(m => m.id !== parseInt(req.params.id));
  res.json({ message: "Model deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
