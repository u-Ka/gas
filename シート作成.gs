function shtcreate() {
  
/*---------------------------------------------------*/
//可変部分

var setSht = 'プルダウン'; //プルダウン設定シート名
var membersRange = 'A2:A'; //メンバー名のセル範囲
var masterShtName = '個人プロセス(原本) '; //プロセス管理シートのマスターネーム(ボタン以外の時のみ使用)

//複製したシートのどこに名前を入れるか
var nameSetRange = 'B1';

//チームプロセス
var temaShtName = 'チームプロセス';

//関数を入れたい列
var setArray1 = ['F','G','H'];
var setArray2 = ['F','G','H','L','M','N','O','P','Q','R','S','T','U','V'];


/*---------------------------------------------------*/
//人が増えた時に新しいシートを作成


  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var members = ss.getSheetByName(setSht).getRange(membersRange).getValues();
  var shtname = ss.getSheets()
  
  
  for(var i=0; i<members.filter(String).length; i++)//文字列の数で繰り返し数を判定
  {
    var judge = ss.getSheetByName(members[i]);
    Logger.log(i);
    Logger.log(members);
    Logger.log(members[1]);
    Logger.log(judge);
    if(judge === null)//設定の名前のシートがnullの場合にアクティブシート複製して名前変更
    {
      var newsht = ss.duplicateActiveSheet().setName(members[i]); 
      newsht.getRange(nameSetRange).setValue(members[i])
     
    }
  }


/*---------------------------------------------------*/
//チームシートに個人別数値を合計する関数を入力

  var func = 'iferror(';
  
  for(var i=0; i<members.filter(String).length; i++){ //文字列の数で繰り返し数を判定  
    func += 'indirect("' + members[i] + '!"&ADDRESS(row(),column()))';
    if(i != members.filter(String).length-1)　//最後だけ+をつけないように条件指定
    { 
      func += '+\n';
    }
    
  }
  func += ',"-")';
  
  var sht = ss.getSheetByName(temaShtName);
  
  for(var i=0;i<setArray1.length; i++){
    sht.getRange(setArray1[i]+'6:'+setArray1[i]+'17').setFormula(func);
    sht.getRange(setArray1[i]+'22:'+setArray1[i]+'23').setFormula(func);
    sht.getRange(setArray1[i]+'26:'+setArray1[i]+'27').setFormula(func);
  }
  
  for(var i=0;i<setArray2.length; i++){
    sht.getRange(setArray2[i]+'32:'+setArray2[i]+'36').setFormula(func);
    sht.getRange(setArray2[i]+'42:'+setArray2[i]+'53').setFormula(func);
    sht.getRange(setArray2[i]+'59:'+setArray2[i]).setFormula(func);
  }
  
}