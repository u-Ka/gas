//選択列も反映ver.

/*---------------------------------------------------*/
//可変部分
var startCell = 'AK3'; //行動ログの入力開始セル
var interval　= 4; //1回に入力する行動ログの列数
var repetition　= 20; //行動ログの履歴回数
var sheetName = 'リスト'; //参照するシート名
var otherColumn = ['c3:c']; //他に反映させたい範囲、複数ある場合はカンマ(,)区切りで文字列('')で入力

var setSht = 'query'; //どのシートにquery関数を入れるか
var setCell = 'A3';  //どのセルにquery関数を入れるか

/*---------------------------------------------------*/

var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(setSht);

var startColumn = sh.getRange(startCell).getColumn();
var startRow = sh.getRange(startCell).getRow();


function myfunction(){
  
  var func = 'query({';
  for(var i=startColumn; i<=startColumn+interval*(repetition-1); i=i+interval){
    
    func += sheetName + '!';
    
    var temp = sh.getRange(startRow,i).getA1Notation();
    func += temp + ':';
    
    var n = i+interval-1;
    
    var temp = sh.getRange(startRow,n).getA1Notation();
    if(temp.length === 3){ //文字列が3なら左2文字を取得、文字列が2つなら左2文字を取得
      var temp = temp.substr(0,2);
    }else{
      var temp = temp.substr(0,1);
    }
    func += temp + ',';
    
    if(i !== startColumn+interval*(repetition-1)){
      for (var j=0; j<otherColumn.length; j++){
        if(j !== otherColumn.length-1){ 
          func += sheetName + '!' + otherColumn[j] + ',';
        }else{
          func += sheetName + '!' + otherColumn[j] + ';\n';      
        }
      }
      
    }else{
      for (var j=0; j<otherColumn.length; j++){
        if(j !== otherColumn.length-1){
          func += sheetName + '!' + otherColumn[j] + ','; 
        }else{
          func += sheetName + '!' + otherColumn[j] ; 
        }
      }
      func += '},\n"where Col1 is not null")';
      
    }
  }
  
  var func2 = 'query({';
  func2 += sheetName + '!'+ sh.getRange(startRow-1, startColumn).getA1Notation();
  func2 += ':';
  func2 += sh.getRange(startRow-1, startColumn+interval-1).getA1Notation();
  func2 += ',';
  
  for(var i=0; i<otherColumn.length; i++){
    func2 += sheetName + '!'; 
    func2 += otherColumn[i].replace(startRow,startRow-1);
    func2 += startRow-1;
    if(i !== otherColumn.length-1){
      func2 += ',';
    }else{
      func2 += '})';
    }
  }
  
  var setCellRow = sh.getRange(setCell).getRow()-1;
  var setCellColumn = sh.getRange(setCell).getColumn();
  
  sh.getRange(setCell).setFormula(func);
  sh.getRange(setCellRow, setCellColumn).setFormula(func2); 
  
}