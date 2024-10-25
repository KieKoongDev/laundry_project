// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/send-line-notify', async (req, res) => {
  const { message } = req.body;
  const lineToken = 'fJpRS5dZt1KYdWZMPDMe6CO6nEv5O9Jg5CR2VAozKH8';

  await axios.post(
    'https://notify-api.line.me/api/notify',
    {
      message: message,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${lineToken}`,
      },
    }
  )
    .then(response => {
      res.json({ success: true, data: response.data });
    })
    .catch(error => {
      res.status(500).json({ success: false, error: error.message });
    });
});

app.get('/', (req, res) => {
  res.send('Welcome to Moodeng Laundry server!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
