//選択列も反映ver.
function queryCreate(){
var sh = SpreadsheetApp.getActiveSheet();

/*---------------------------------------------------*/
//可変部分
var sheetName = sh.getRange('C2').getValue(); //参照するシート名
var startCell = sh.getRange('C3').getValue(); //行動ログの入力開始セル
var interval　= sh.getRange('C4').getValue(); //1回に入力する行動ログの列数
var repetition　= sh.getRange('G2').getValue(); //行動ログの記録回数
var otherColumn = sh.getRange('G3').getValue(); //他に反映させたい範囲、複数ある場合はカンマ(,)区切りで文字列('')で入力
otherColumn = otherColumn.split(',');
  
var setCell = sh.getRange('L2').getValue();  //どのセルにquery関数を入れるか

////関数作成用
//var queryNoColumn = 'E'; //queryシートのNoが入っているセル
//var listNoColumn = 'C'; //リストのnoが入っている列

/*---------------------------------------------------*/
  
 Logger.log(startCell);

  var startColumn = sh.getRange(startCell).getColumn();
  var startRow = sh.getRange(startCell).getRow();
 
  Logger.log(startColumn);
  
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

/*---------------------------------------------------*/
//項目名の入力用
  
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
  
  var setCellRow = sh.getRange(setCell).getRow();
  var setCellColumn = sh.getRange(setCell).getColumn();
  
  sh.getRange(setCell).setFormula(func);
  sh.getRange(setCellRow-1, setCellColumn).setFormula(func2); 
  
}


/*---------------------------------------------------*/
//vlookup作成用
  
  //=ArrayFormula(if($A$3:$A="","",VLOOKUP($E$3:$E,リスト!c3:AE,MATCH(J$2,リスト!c2:2,0))))
  
//  var refelenceValues = sh.getRange(setCellRow-1, 1, 1, sh.getLastColumn()).getValues();
//  
//  Logger.log(refelenceValues);
//  Logger.log(refelenceValues.length);
//  
//  
//  for(var i=0; i<refelenceValues.length; i++){
//    
//    }
//      
//  var vlookupFunc = 'ArrayFormula(if($A$3:$A="","",VLOOKUP('
//  
//  vlookupFunc += queryNoColumn+ setCellRow+ ':'+ queryNoColumn+ ','+ sheetName+ '!'+ listNoColumn+ startRow+ ':'+ startCell.substr(0,2)+ ',MATCH('+ 'J';
//  Logger.log(vlookupFunc);
//  vlookupFunc += setCellRow-1;
//  Logger.log(vlookupFunc);
//  vlookupFunc += ','+ sheetName+ '!'+ listNoColumn; 
//  vlookupFunc += startRow-1; 
//  vlookupFunc += ':'; 
//  vlookupFunc += startRow-1; 
//  vlookupFunc += ',0))))'; 
//  Logger.log(vlookupFunc);
//
//  
//  
//  sh.getRange('J3').setFormula(vlookupFunc);
  
  
