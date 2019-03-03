//対象行から今日の日付の列番号を取得するスクリプト

/*---------------------------------------------------*/
//可変部分
var shtName = '報告書'; //参照するシート名
var rowNum = 1; //参照する行

/*---------------------------------------------------*/

function myFunction() {
  
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(shtName);
  
  var date = new Date();  
  var dateStr = Utilities.formatDate(date,'JST','yyyy/MM/dd');
  
  var values = sh.getRange('A' + rowNum + ':' + rowNum).getValues();
  
  var valuesStr = values[0].map(function(date){
    return Utilities.formatDate(new Date(date),'JST','yyyy/MM/dd');
  });
  
  Logger.log(valuesStr.indexOf(dateStr));
}

