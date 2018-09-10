

function SendEmailOnFormSubmit(namedValues, values) {
// Created by Phil Brown for the USGS, 7/24/2017, pbrown@usgs.gov  >>-PJB->
// Edited  by Phil Brown for the USGS, 8/03/2018, pbrown@usgs.gov  >>-PJB->  
  
    
    var emailGGGSC = "pbrown@usgs.gov,mhpowers@usgs.gov,blburton@usgs.gov,cmoses@usgs.gov,rhorton@usgs.gov,djtaylor@usgs.gov"; //add multiple people seperated by a comma, no space, within the quotes 
    var emailFieldContact = values[43];//44-1
    var editURL = returnLastResponseEditURL();
    var emailOfficeContact = values[45];//46-1 Supervisior Email
    var emailAddress = emailGGGSC + "," + emailFieldContact + "," + emailOfficeContact; //                                          !!!!be sure to comment this back in after editing !!!
    var message = values[0]+ "\n" + "A new field communications form response has been submitted to the "+ "GGGSC" + " from " + values[2] + "." + "\n\n";

    message += "To edit this response, please visit: " + "\n" 
    + editURL + "\n\n";
  
    message += "To view the Google Sheet populated by this response, please visit: " + "\n" 
    + "https://docs.google.com/a/doi.gov/spreadsheets/d/1nt3MLzoP30_S5gO17Wa8vjNoL-RHEPZOdVrik30QGqI/edit?usp=sharing" + "\n\n";
    
    message += "You are receiving this automatic email because you are a team manager or have been identified as a contact for this Field Communications Plan."+ "\n\n";
    message += "Any replies to this email will be sent to Phil Brown, pbrown@usgs.gov; please contact Phil with any questions or problems regarding this automatic email." + "\n\n";
    message += values[2] + "'s Field Work Communications Plan responses are listed below:"+ "\n\n";
    message += "     Originator :: " + values[2] + "\n";
    message += "     Originator's email :: " + values[1] + "\n";
    message += "     Primary Point of Contact (POC) :: " + values[34] + "\n";
    message += "     POC Email :: " + values[35] + "\n";
    message += "     Primary Field Contact Person :: " + values[42] + "\n";
    message += "     Primary Field Contact Email :: " + values[43] + "\n";
    message += "     Supervisor :: " + values[44] + "\n";
    message += "     Supervisor Email :: " + values[45] + "\n";  
    message += "     Additional USGS personnel also on travel to the field :: "+ values[33] + "\n";
    message += "     Detailed Communication Plan :: " + values[8] + "\n";
    message += "     Leave From :: " + values[9] + "\n";
    message += "     Date Leaving :: " + values[10] + "\n";
    message += "     Field Destination :: " + values[11] + "\n";
    message += "     Arrival Date :: " + values[12] + "\n";
    message += "     What Is Being Done For What Project :: " + values[13] + "\n";
    
    if (values[14] == "Yes") { 
      message += "     2nd Destination :: " + values[15] + "\n"
      message += "     2nd Destination Arrival Date :: " + values[16] + "\n"
      message += "     2nd Destination - What Is Being Done For What Project :: " + values[17] + "\n";
      }
  
    if (values[18] == "Yes") { 
      message += "     3rd Destination :: " + values[19] + "\n"
      message += "     3rd Destination Arrival Date :: " + values[20] + "\n"
      message += "     3rd Destination - What Is Being Done For What Project :: " + values[21] + "\n";
      }
  
    if (values[22] == "Yes") { 
      message += "     4th Destination :: " + values[23] + "\n"
      message += "     4th Destination Arrival Date :: " + values[24] + "\n"
      message += "     4th Destination - What Is Being Done For What Project :: " + values[25] + "\n";
      }
      
    if (values[26] == "Yes") { 
      message += "     5th Destination :: " + values[27] + "\n"
      message += "     5th Destination Arrival Date :: " + values[28] + "\n"
      message += "     5th Destination - What Is Being Done For What Project :: " + values[29] + "\n";
      }
  
    message += "     Date Planning To Return From The Field :: " + values[51] + "\n";
    message += "     Final Return Destination :: " + values[52] + "\n";
    message += "     Additional Comments :: " + values[32] + "\n";
  
  
    var subject = "A New Field Communications Form Has Been Submitted By " + values[2];
    
    MailApp.sendEmail(emailAddress, subject, message); //!!!Comment or uncomment this statement to disable mail being sent!!!\\
  
  Logger.log('!!!!executing pushToCalendar!!!!!')
  pushToCalendar(namedValues,values);

}


function SendResponseEditEmail (lastRespondentEmail, lastEditResponseURL, namedValues, values, resDestination1, resStart, resEnd, resOriginator) {
  var emailGGGSC = "pbrown@usgs.gov,mhpowers@usgs.gov,blburton@usgs.gov,aashipp@usgs.gov,rhorton@usgs.gov,djtaylor@usgs.gov"; //add multiple people seperated by a comma, no space, within the quotes 
  var emailAddress = emailGGGSC + "," + lastRespondentEmail;// add additional emails here seperated by a comma
  var subject = resOriginator + "'s communications plan for " +  resDestination1 + " has been edited.";
  var message = resOriginator + "'s communications plan for " +  resDestination1 + " from " + resStart + " to " + resEnd + " has been edited and appropriate USGS personnel have been notified." + "\n";
  message += "The email contact for the editor is: " + lastRespondentEmail +"\n\n";
  message += "The edited values are listed below.  Blank listings indicate values that have not been changed. \n\n";
  for(var field in namedValues) {
           message += '    ' + field + ' :: '
             + namedValues[field].toString() + "\n";
         }
  
  message += "\nTo edit this reservation again visit: " + lastEditResponseURL + "\n\n";
  
   message += "To view the Google Sheet populated by this response, please visit: https://docs.google.com/a/doi.gov/spreadsheets/d/1nt3MLzoP30_S5gO17Wa8vjNoL-RHEPZOdVrik30QGqI/edit?usp=sharing \n";
  
  MailApp.sendEmail(emailAddress, subject, message); //!!!Comment or uncomment this statement to disable mail being sent!!!\\  

}
