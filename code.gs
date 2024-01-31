function doGet() {
  var ss = SpreadsheetApp.openById('10m5KoW7SDHET7QZYbvIeF12TWJVZjfQfr_EL0gmDVJk');
  var sheet = ss.getSheetByName('Sheet1');
  var data = sheet.getDataRange().getValues();

  // Mengonversi data menjadi array JSON
  var jsonData = data.slice(1).map(function(row) {
    return { name: row[0], email: row[1] };
  });

  // Membuat objek template untuk di-render di HTML
  var template = HtmlService.createTemplateFromFile('index');
  template.data = jsonData;
  return template.evaluate();
}
