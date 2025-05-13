function doGet(e) {
  var id = "15jefa84g0U_85JAJeIbeNYMw9ajdE5JKeKnumk9FpRg";
  var sheet = SpreadsheetApp.openById(id).getSheetByName('Pagos');
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  var result = data.map(function(row) {
    var obj = {};
    headers.forEach(function(h,i){ obj[h] = row[i]; });
    return obj;
  });
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var params = JSON.parse(e.postData.contents);
  var id = "15jefa84g0U_85JAJeIbeNYMw9ajdE5JKeKnumk9FpRg";
  var sheet = SpreadsheetApp.openById(id).getSheetByName('Pagos');
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  var colIdx = headers.indexOf('Estado');
  var emailIdx = headers.indexOf('Email');
  for (var i=0; i<data.length; i++) {
    if (data[i][emailIdx] === params.Email && data[i][0] === params.Fecha) {
      sheet.getRange(i+2, colIdx+1).setValue(params.Estado);
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify({status:'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}