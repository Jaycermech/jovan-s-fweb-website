import express from "express";
import cors from "cors";
import members from "./routes/members.mjs";
import eventpic from "./routes/event_image.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// New Routing
app.use("/members", members);
app.use("/eventpic", eventpic);

// Routing
// app.get("/", async (req, res) => {
//   res.send("Hello World").status(200);
// });

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
