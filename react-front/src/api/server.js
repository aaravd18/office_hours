const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint to serve the JSON file
app.get("/data", (req, res) => {
  const filePath = path.join(__dirname, "test.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send({ error: "Failed to read data file." });
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

const txtResponsesDir = path.join(__dirname, "../../../agents");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, txtResponsesDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
