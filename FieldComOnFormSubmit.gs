function RunOnFormSubmit(e) {
  var namedValues = e.namedValues; //define form event object namedValues
  var values = e.values;
  CheckIfResponseIdExists(namedValues, values);
}

function CheckIfResponseIdExists(namedValues, values){ 

  var form = FormApp.openById('1QBmc_emmE1W-0o1Ln0BKdGYOcTtBD8RfdQAccjfRyik');//enter form ID here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ResponseIDs');
  var sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FieldWorkCommResponses');//Change the sheet name as appropriate  
  var data = sheet.getDataRange().getValues();
  var data2 = sheet2.getDataRange().getValues();
  var formResponses = form.getResponses();
  var formResponse = formResponses[formResponses.length - 1];
  var itemResponses = formResponse.getItemResponses();
  var itemResponse = itemResponses[0];
  var lastRow = sheet.getLastRow();
  var lastRow2 = sheet2.getLastRow(); 
  var lastResponseID = formResponse.getId();
  var lastEditResponseURL = formResponse.getEditResponseUrl();
  var lastRespondentEmail = formResponse.getRespondentEmail();
  
    
  //Check for ID
  var responseIdExits = 'No';
  for (var i = 0; i < lastRow + 1; i++) {
    Logger.log('Response Id Value: ' + data[i]);
    if(data[i] == lastResponseID){ //[0] because column A
      responseIdExits = 'Yes';
                          }
  }
  
  if(responseIdExits == 'Yes'){ //[0] because column A
      Logger.log('Entered Yes Loop');
      for (var j = 0; j < lastRow2; j++) {
      //Logger.log('Edit response Email lastEditResponseURL: ' + data2[j][13]);
      if(data2[j][55] == lastEditResponseURL){ //[13] because column N
      var itemRow = (j);
                          }
      }
      var resDestination1 = data2[itemRow][11]; 
      var resStart = data2[itemRow][10]; 
      var resEnd = data2[itemRow][51];
      var resOriginator = data2[itemRow][2]; 
      SendResponseEditEmail (lastRespondentEmail, lastEditResponseURL, namedValues, values, resDestination1, resStart, resEnd, resOriginator);
      EditCalendarEvent (lastEditResponseURL);
                          }
  
   if(responseIdExits == 'No'){ 
      Logger.log('Entered No Loop');
      assignLastEditUrlsFieldWorkCommResponses();
      assignLastResponseID();
      SendEmailOnFormSubmit(namedValues, values);
     sheet.getRange('A' + (lastRow + 1)).setValue(lastResponseID);
                          }
  
}

