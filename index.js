const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const audioData = req.file.buffer;

    // Prepare form data to send to Google Colab
    const form = new FormData();
    form.append('audio', audioData, { filename: 'audio.wav' });

    // Example: sending audio data to Google Colab endpoint
    const response = await axios.post('https://your-colab-endpoint', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    // Return the transcription from Google Colab
    res.json({ transcription: response.data.text });
  } catch (error) {
    console.error('Error during transcription:', error);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
