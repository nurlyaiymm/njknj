const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON data in the request body
app.use(bodyParser.json());

// In-memory data store for properties
let properties = [];

// POST route to add a new property
app.post('/api/properties', (req, res) => {
  const { image, name, about, sqft, person, res: rooms, price, location, image2, image3, image4 } = req.body;

  // Validate required fields
  if (!image || !name || !about || !sqft || !person || !rooms || !price || !location) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create new property object
  const newProperty = {
    image,
    name,
    about,
    sqft,
    person,
    rooms,
    price,
    location,
    image2,
    image3,
    image4
  };

  // Add the new property to the in-memory data store
  properties.push(newProperty);

  // Respond with the newly added property
  return res.status(201).json({
    message: 'Property created successfully',
    property: newProperty
  });
});

// GET route to retrieve all properties
app.get('/api/properties', (req, res) => {
  res.status(200).json(properties);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
