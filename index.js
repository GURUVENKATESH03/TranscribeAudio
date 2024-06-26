const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/transcribe', upload.single('audio'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }

    // Perform transcription or any processing here
    // For demonstration, we'll just echo back the received file details

    const fileInfo = {
      name: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    };

    res.send(fileInfo);
  } catch (err) {
    console.error('Error handling file upload:', err);
    res.status(500).send('Error handling file upload');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
