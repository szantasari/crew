function authenticateUser(username, password) {
  var sheet = SpreadsheetApp.openById("10m5KoW7SDHET7QZYbvIeF12TWJVZjfQfr_EL0gmDVJk").getSheetByName("member"); // Ganti dengan ID spreadsheet Anda dan nama sheet
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) { // Mulai dari 1 untuk melewati header
    if (data[i][14] === username && data[i][16] === password) {
      return true; // Pengguna ditemukan
    }
  }
  
  return false; // Pengguna tidak ditemukan
}
