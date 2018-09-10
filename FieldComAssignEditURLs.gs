function returnLastResponseEditURL (){
  
  var form = FormApp.openById('1QBmc_emmE1W-0o1Ln0BKdGYOcTtBD8RfdQAccjfRyik');//enter form ID here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FieldWorkCommResponses');//Change the sheet name as appropriate    
  var data = sheet.getDataRange().getValues();
  var urlCol = 57; // column number where URL's should be populated; A = 1, B = 2 etc
  var responses = form.getResponses();
  var timestamps = [], urls = [], resultUrl = [];  
    timestamps.push(responses[(responses.length-1)].getTimestamp().setMilliseconds(0));
    urls.push(responses[(responses.length-1)].getEditResponseUrl()); 
    resultUrl.push([urls[timestamps.indexOf(data[(data.length-1)][0].setMilliseconds(0))]]);  
    
  return (resultUrl); 
  //sheet.getRange(data.length, urlCol).setValues(resultUrl);

}


function assignLastEditUrlsFieldWorkCommResponses() {
  var form = FormApp.openById('1QBmc_emmE1W-0o1Ln0BKdGYOcTtBD8RfdQAccjfRyik');//enter form ID here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FieldWorkCommResponses');//Change the sheet name as appropriate    
  var data = sheet.getDataRange().getValues();
  var urlCol = 56; // column number where URL's should be populated; A = 1, B = 2 etc
  var responses = form.getResponses();
  Logger.log('Data Timestamp: ' + data[(data.length-1)][0]);
  var timestamps = [], urls = [], resultUrls = [];  
    timestamps.push(responses[(responses.length-1)].getTimestamp().setMilliseconds(0));
    urls.push(responses[(responses.length-1)].getEditResponseUrl()); 
    resultUrls.push([urls[timestamps.indexOf(data[(data.length-1)][0].setMilliseconds(0))]]);  
    sheet.getRange(data.length, urlCol).setValues(resultUrls); 
    
};

function assignLastResponseID() {
  var form = FormApp.openById('1QBmc_emmE1W-0o1Ln0BKdGYOcTtBD8RfdQAccjfRyik');//enter form ID here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FieldWorkCommResponses');//Change the sheet name as appropriate    
  var data = sheet.getDataRange().getValues();
  var idCol = 57; // column number where URL's should be populated; A = 1, B = 2 etc
  var responses = form.getResponses();
  var timestamps = [], IDs = [], resultIDs = [];  
    timestamps.push(responses[(responses.length-1)].getTimestamp().setMilliseconds(0));
    IDs.push(responses[(responses.length-1)].getId()); 
    resultIDs.push([IDs[timestamps.indexOf(data[(data.length-1)][0].setMilliseconds(0))]]);  
    sheet.getRange(data.length, idCol).setValues(resultIDs); 
    
};

function mannuallyAssignCalendarEventIDs() {
    
  var row2AssignID = 31;//Row to get ID for - row must have an Edit URL
  
  
  var form = FormApp.openById('1QBmc_emmE1W-0o1Ln0BKdGYOcTtBD8RfdQAccjfRyik');//enter form ID here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FieldWorkCommResponses');//Change the sheet name as appropriate   
  var data = sheet.getDataRange().getValues();
  var editURL2Match = data[(row2AssignID-1)][55];
  Logger.log('Edit URL 2 Match: ' + editURL2Match);
  var formResponses = form.getResponses();
  var formResponseLength = formResponses.length;
  
   for (var i = 0; i < formResponseLength; i++) {
    var responseURL = formResponses[i].getEditResponseUrl()
    Logger.log('Response URL Value: ' + responseURL);
     if(editURL2Match == responseURL) {
      Logger.log('Matching URLs Located at Response #: ' + [i]);
      var responseId = formResponses[i].getId();
      Logger.log('Response Id is : ' + responseId);
      var range = sheet.getRange(row2AssignID, 57);
      range.setValue(responseId);
                          }
  }
}


function assignCalendarEventId(newEventID) {
  var form = FormApp.openById('1QBmc_emmE1W-0o1Ln0BKdGYOcTtBD8RfdQAccjfRyik');//enter form ID here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FieldWorkCommResponses');//Change the sheet name as appropriate    
  var data = sheet.getDataRange().getValues();
  var idCol = 58; // column number where ID's should be populated; A = 1, B = 2 etc    
  
  sheet.getRange(data.length, idCol).setValue(newEventID);  
  
}




