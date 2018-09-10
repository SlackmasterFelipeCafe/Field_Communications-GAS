
function manualPushToCalendar () {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  Logger.log('Active Sheet: '+ sheet);
  var activeRow = 31; // Set Row to be pushed here
  var namedValues = []; 
  var values = [];
  
  for (var i=1; i < 58; i++) {
       namedValues[i-1] = sheet.getRange(1,i).getValue();
       values[i-1] = sheet.getRange(activeRow,i).getValue();
       //Logger.log ("namedValues[" + i +"]" + namedValues[i]);
                            }
  
  
  //Logger.log('Namedvalues' + namedValues);
  //Logger.log('values' + values);
  Logger.log('!!!!executing pushToCalendar!!!!!');
  pushToCalendar(namedValues,values);
  SendEmailOnFormSubmit(namedValues, values);
}

function pushToCalendar(namedValues,values) {
   
  
  var StartDate = values[10];
  var EndDate = values[51];
  Logger.log('StartDate: '+ StartDate);
  Logger.log('EndDate: '+ EndDate);
  
   
  //calendar variables
  var calendar = CalendarApp.getCalendarById('doi.gov_5p2k6i3litekqc4pdnku9pm0js@group.calendar.google.com');
  var newEventTitle = values[2] + ', ' + values[11];
  Logger.log('newEventTitle: '+ newEventTitle);
  Logger.log('StartDate: '+ StartDate);
  Logger.log('StartDate: '+ StartDate);
  var newEvent = calendar.createEvent(newEventTitle, new Date(StartDate), new Date(EndDate));//data[55] 
  newEvent.setAllDayDates(new Date(StartDate), new Date(EndDate));
  var description = "<a href='https://docs.google.com/a/doi.gov/spreadsheets/d/1nt3MLzoP30_S5gO17Wa8vjNoL-RHEPZOdVrik30QGqI/edit?usp=sharing' title='Field Communications Plan' target='_blank'>View all field communication responses</a>" + "<br>";     
    description += "Primary Point of Contact (POC) :: " + values[34] + "<br>";
    description += "POC Email :: " + values[35] + "<br>";
    description += "Primary Field Contact Person :: " + values[42] + "<br>";
    description += "Primary Field Contact Email :: " + values[43] + "<br>";
    description += "Supervisor :: " + values[44] + "<br>";
    description += "Supervisor Email :: " + values[45] + "<br>";  
    description += "Additional USGS personnel also on travel to the field :: "+ values[33] + "<br>";
    description += "Detailed Communication Plan :: " + values[8] + "<br>";
    description += "Leave From :: " + values[9] + "<br>";
    description += "Date Leaving :: " + values[10] + "<br>";
    description += "Field Destination :: " + values[11] + "<br>";
    description += "Arrival Date :: " + values[12] + "<br>";
    description += "What Is Being Done For What Project :: " + values[13] + "<br>";
    
    if (values[14] == "Yes") { 
      description += "2nd Destination :: " + values[15] + "<br>"
      description += "2nd Destination Arrival Date :: " + values[16] + "<br>"
      description += "2nd Destination - What Is Being Done For What Project :: " + values[17] + "<br>";
      }
  
    if (values[18] == "Yes") { 
      description += "3rd Destination :: " + values[19] + "<br>"
      description += "3rd Destination Arrival Date :: " + values[20] + "<br>"
      description += "3rd Destination - What Is Being Done For What Project :: " + values[21] + "<br>";
      }
  
    if (values[22] == "Yes") { 
      description += "4th Destination :: " + values[23] + "<br>"
      description += "4th Destination Arrival Date :: " + values[24] + "<br>"
      description += "4th Destination - What Is Being Done For What Project :: " + values[25] + "<br>";
      }
      
    if (values[26] == "Yes") { 
      description += "5th Destination :: " + values[27] + "<br>"
      description += "5th Destination Arrival Date :: " + values[28] + "<br>"
      description += "5th Destination - What Is Being Done For What Project :: " + values[29] + "<br>";
      }
  
    description += "Date Planning To Return From The Field :: " + values[51] + "<br>";
    description += "Final Return Destination :: " + values[52] + "<br>";
    description += "Additional Comments :: " + values[32] + "<br>";
  
  newEvent.setDescription(description);
  newEvent.setLocation(values[11]);
  var calEventID = newEvent.getId()
  assignCalendarEventId(calEventID);
}
 
function EditCalendarEvent (lastEditResponseURL) {

  var ss = SpreadsheetApp.openById('1nt3MLzoP30_S5gO17Wa8vjNoL-RHEPZOdVrik30QGqI');  //Set Equipment Response ID here
  var sheet = ss.getSheetByName('FieldWorkCommResponses');
  var data = sheet.getDataRange().getValues();
  var calendar = CalendarApp.getCalendarById('doi.gov_5p2k6i3litekqc4pdnku9pm0js@group.calendar.google.com');
  
    for(var i = 0; i<data.length;i++){
      Logger.log('Edit URL Value: ' + data[i][55])
    if(data[i][55] == lastEditResponseURL){ //[14] because column N
      //Logger.log('Calendar Event to Edit Row: ' + (i+1));
      var itemRow = i;
                          }
                                    }
   Logger.log('itemRow Row: ' + (itemRow)); 
   var newEventTitle = data[itemRow][2] + ', ' + data[itemRow][11];
   Logger.log('newEventTitle: '+ newEventTitle);
   var calID = data[itemRow][57];
  Logger.log('calID: ' + calID);
  var calEvent = calendar.getEventById(calID);
   Logger.log('calID: ' + calEvent);
  calEvent.setAllDayDates(new Date(data[itemRow][10]), new Date(data[itemRow][51]));
  calEvent.setTitle(newEventTitle); 
  var description = "<a href='https://docs.google.com/a/doi.gov/spreadsheets/d/1nt3MLzoP30_S5gO17Wa8vjNoL-RHEPZOdVrik30QGqI/edit?usp=sharing' title='Field Communications Plan' target='_blank'>View all field communication responses</a>" + "<br>";     
    description += "Primary Point of Contact (POC) :: " + data[itemRow][34] + "<br>";
    description += "POC Email :: " + data[itemRow][35] + "<br>";
    description += "Primary Field Contact Person :: " + data[itemRow][42] + "<br>";
    description += "Primary Field Contact Email :: " + data[itemRow][43] + "<br>";
    description += "Supervisor :: " + data[itemRow][44] + "<br>";
    description += "Supervisor Email :: " + data[itemRow][45] + "<br>";  
    description += "Additional USGS personnel also on travel to the field :: "+ data[itemRow][33] + "<br>";
    description += "Detailed Communication Plan :: " + data[itemRow][8] + "<br>";
    description += "Leave From :: " + data[itemRow][9] + "<br>";
    description += "Date Leaving :: " + data[itemRow][10] + "<br>";
    description += "Field Destination :: " + data[itemRow][11] + "<br>";
    description += "Arrival Date :: " + data[itemRow][12] + "<br>";
    description += "What Is Being Done For What Project :: " + data[itemRow][13] + "<br>";
    
    if (data[itemRow][14] == "Yes") { 
      description += "2nd Destination :: " + data[itemRow][15] + "<br>"
      description += "2nd Destination Arrival Date :: " + data[itemRow][16] + "<br>"
      description += "2nd Destination - What Is Being Done For What Project :: " + data[itemRow][17] + "<br>";
      }
  
    if (data[itemRow][18] == "Yes") { 
      description += "3rd Destination :: " + data[itemRow][19] + "<br>"
      description += "3rd Destination Arrival Date :: " + data[itemRow][20] + "<br>"
      description += "3rd Destination - What Is Being Done For What Project :: " + data[itemRow][21] + "<br>";
      }
  
    if (data[itemRow][22] == "Yes") { 
      description += "4th Destination :: " + data[itemRow][23] + "<br>"
      description += "4th Destination Arrival Date :: " + data[itemRow][24] + "<br>"
      description += "4th Destination - What Is Being Done For What Project :: " + data[itemRow][25] + "<br>";
      }
      
    if (data[itemRow][26] == "Yes") { 
      description += "5th Destination :: " + data[itemRow][27] + "<br>"
      description += "5th Destination Arrival Date :: " + data[itemRow][28] + "<br>"
      description += "5th Destination - What Is Being Done For What Project :: " + data[itemRow][29] + "<br>";
      }
  
    description += "Date Planning To Return From The Field :: " + data[itemRow][51] + "<br>";
    description += "Final Return Destination :: " + data[itemRow][52] + "<br>";
    description += "Additional Comments :: " + data[itemRow][32] + "<br>";
  
  
  calEvent.setDescription(description);
  calEvent.setLocation(data[itemRow][11]);

}


function TestDateMath () {
  var newEvent = new Date()
  var chnEvent = new Date(newEvent.getTime()+3600000*12)
  Logger.log('Org Date: ' + newEvent);
  Logger.log('New Date: ' + chnEvent);
  
}
