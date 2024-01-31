function doGet() {
  var ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
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
