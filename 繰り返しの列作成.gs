//繰り返しの列作成

/*---------------------------------------------------*/
//可変部分
var startCell = 'BI3'; //行動ログの入力開始セル
var interval　= 14; //1回に入力する行動ログの列数
var repetition　= 31; //行動ログの履歴回数

var setSht = 'シート1'; //どのシートにquery関数を入れるか
var setCell = 'A1';  //どのセルにquery関数を入れるか

/*---------------------------------------------------*/

var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(setSht);
var startColumn = sh.getRange(startCell).getColumn();
var startRow = sh.getRange(startCell).getRow();



function myfunction(){
  
  Logger.log(startColumn);
  
  var func = '';
  for(var i=startColumn; i<=startColumn+interval*(repetition-1); i=i+interval){
    
    var temp = sh.getRange(startRow,i).getA1Notation();
    
    func += temp + ',';
    
    
  }
  
  Logger.log(func);
  sh.getRange().setFormula(func);
}