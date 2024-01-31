const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const doc = new GoogleSpreadsheet('10m5KoW7SDHET7QZYbvIeF12TWJVZjfQfr_EL0gmDVJk');
const sheetName = 'Sheet1';
const creds = require('./begitu.json');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req, res) => {
  const { name, email } = req.body;

  try {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetName];
    await sheet.addRow({ Name: name, Email: email });
    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on web`);
});
