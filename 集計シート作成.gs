function aggregation() {
  
  
  /*---------------------------------------------------*/
  //可変部分
  var itemCell = 'K1'; //作成したいセルが入ったセル
  var getShtName = 'リスト';　//リスト名
  var getShtRange = 'A2:2';　//行動ログの入力開始セル
  
  //リストの入力開始行
  var getShtStartRow = 3;
  
  /*---------------------------------------------------*/
  
  
  var setSht = SpreadsheetApp.getActiveSheet();
  var itemNameCell = setSht.getRange(itemCell).getValue();
  itemNameCell = itemNameCell.split(',');
  
  var itemName = [];
  
  for(var i=0; i<itemNameCell.length; i++){
    var temp = setSht.getRange(itemNameCell[i]).getValue();
    itemName.push(temp);
  }
  
  //リストの何列目に欲しい情報が入っているかを配列で取得  
  var getSht = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(getShtName);
  var getShtItemValues = getSht.getRange(getShtRange).getValues();
  
  var getColumnNum = [];
  for(var i=0; i<itemName.length; i++){
    getColumnNum.push(getShtItemValues[0].indexOf(itemName[i])+1);
  }
  
  //リストから項目一覧を取得した後に項目名を鵜ユニークにする
  var itemNameUnique = [];
  for(var i=0; i<getColumnNum.length; i++){
    var temp = getSht.getRange(getShtStartRow, getColumnNum[i], getSht.getLastRow(), 1).getValues();
    var temp = Array.prototype.concat.apply([],temp); //2次元配列を1次元配列へ変換
    itemNameUnique[i] = temp.filter(function(x, y, z){
      if(x !== ''){
        return temp.indexOf(x) === y;
      }
    });
  }
  
  //欲しい項目のユニークの配列を二次元配列にしてスプレッドシートへセット 
  for(var i=0; i<itemNameUnique.length; i++){
    var setArray = [];
    for(var j=0; j<itemNameUnique[i].length; j++){
      setArray.push([itemNameUnique[i][j]]);
    }
    var row = setSht.getRange(itemNameCell[i]).getRow()+3;
    var column = setSht.getRange(itemNameCell[i]).getColumn();
    setSht.getRange(row, column, setArray.length, setArray[0].length).setValues(setArray);
  }
}