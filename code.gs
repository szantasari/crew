function doGet() {
  return HtmlService.createHtmlOutputFromFile('register')
      .setTitle('Register New User');
}

function registerNewUser(formData) {
  var ss = SpreadsheetApp.openById('10m5KoW7SDHET7QZYbvIeF12TWJVZjfQfr_EL0gmDVJk');
  var sheet = ss.getSheetByName('member');
  var data = formData.split('&').reduce(function(obj, item) {
    var parts = item.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    return obj;
  }, {});
  sheet.appendRow([data.name, data.email]);
  return "User registered successfully!";
}
