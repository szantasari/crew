const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
const port = process.env.PORT || 3000;

// Konfigurasi CORS
app.use(cors());
app.use(express.json());

// Konfigurasi Google Spreadsheet
const doc = new GoogleSpreadsheet('SPREADSHEET_ID');
const sheetName = 'member';
const creds = require('./google-credentials.json');

// Middleware untuk verifikasi kredensial
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Autentikasi pengguna dengan data di spreadsheet
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetName];
    const rows = await sheet.getRows();

    let authenticated = false;
    for (const row of rows) {
      if (row.Username === username && row.Password === password) {
        authenticated = true;
        break;
      }
    }

    res.json({ authenticated: authenticated });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
