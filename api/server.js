// BUILD YOUR SERVER HERE
const express = require("express");
const Model = require("./users/model");

const server = express();

server.use(express.json());

// module.exports = {}; // EXPORT YOUR SERVER instead of {}

//[Post]
server.post("/api/users", async (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const { name, bio } = req.body;
      const newUser = await Model.insert({ name, bio });
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
      error: err.message,
    });
  }
});

//[Get]

server.get("/api/users", (req, res) => {
  Model.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

//[Get] get by ID
server.get(`/api/users/:id`, async (req, res) => {
  try {
    const user = await Model.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
      error: err.message,
    });
  }
});

//[Delete] delete by ID
server.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await Model.remove(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "the user with the specified ID does not exist",
      });
    } else {
      res.status(200).json({
        message: "user deleted",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
      error: err.message,
    });
  }
});

module.exports = server;
