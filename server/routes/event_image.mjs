import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get eventpic
router.get("/", async (req, res) => {
  let collection = await db.collection("eventpic");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Create a new eventpic
router.post("/", async (req, res) => {
  let newDocument = {
    eventpic: req.body.eventpic,
  };
  let collection = await db.collection("eventpic");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = await db.collection("eventpic");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
