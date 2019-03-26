/*---------------------------------------------------*/ 
//可変部分

var shtName = 'アポ獲得一覧';

var calReflectJudgeRow = 6; //カレンダー反映させる列の判断フラグ行

//商談日と商談時間の列
var apoDate = 'E'; //アポ日
var apoTime = 'F'; //アポ時間


//カレンダーのタイトル,locationに使用するために列を入力
var addressCol = 'J'; //住所の列
var corpCol = 'K'; //社名の列

//変更なし準備用
var content = '【詳細】\n';

/*---------------------------------------------------*/ 


function calendar() {
  
  var sht = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(shtName);
  var lastRow = sht.getLastRow();
  
  
  
  for (var i=3; i<=lastRow; i++){
    var judge = sht.getRange(i,1).getValue();
    
    
    //A列がtrueだったらカレンダー反映  
    if(judge == true){
      
      /*---------------------------------------------------*/      
      //SSの変数設定　ほぼ必須の内容
      
      var date = sht.getRange(apoDate+i).getValue(); //商談日
      var time = sht.getRange(apoTime+i).getValue(); //商談時間
      
      var start = new Date(date.getYear(),date.getMonth(),date.getDate(),time.getHours(),time.getMinutes(),time.getSeconds());
      var end = new Date(date.getYear(),date.getMonth(),date.getDate(),time.getHours()+1,time.getMinutes(),time.getSeconds());
      
      //リマインド設定したい場合
      //      var remindDate = sht.getRange('K'+i).getValue(); //リマインド日
      //      var remindTime = sht.getRange('L'+i).getValue(); //リマインド時間
      
      
      /*---------------------------------------------------*/      
      //本文作成
      
      var values = sht.getRange('A' + calReflectJudgeRow + ':' + calReflectJudgeRow).getValues();
      
      for(var j=2; j<=values[0].length; j++){        
        var judge2 = sht.getRange(calReflectJudgeRow,j).getValue(); //対象行でチェックがついている項目だけ反映させる
        if(judge2 !== ''){
          
          var itemNme = sht.getRange(calReflectJudgeRow-2,j).getValue();
          var item = sht.getRange(i,j).getValue();
          
          content += itemNme + '：' + item + '\n'; 
        }
      }
      
      var location = sht.getRange(addressCol+i).getValue(); //住所
      var corp = sht.getRange(corpCol+i).getValue(); //社名
      
      var title = '【商談】'+ corp + '@' + location;
      var title2 = '【リマインド】'+ corp + '@' + location;      
      
      /*---------------------------------------------------*/            
      //カレンダー反映設定
      
      //自分にしか送らない場合
      //      var id = Session.getActiveUser().getEmail();
      
      var id = sht.getRange('C2').getValue();
      var user = sht.getRange('J2').getValue();
      
      
      var cal = CalendarApp.getCalendarById(id);
      cal.createEvent(title,start,end,{description:content, location:location ,gusts:user});
      
      //リマインド設定したい場合      
      //      if(d3 !== '' && d4 !== ''){
      //        var remindStart = new Date(remindDate.getYear(),remindDate.getMonth(),remindDate.getDate(),remindTime.getHours(),remindTime.getMinutes(),remindTime.getSeconds());
      //        var remindEnd =  new Date(remindDate.getYear(),remindDate.getMonth(),remindDate.getDate(),remindTime.getHours()+1,remindTime.getMinutes(),remindTime.getSeconds());
      //        cal.createEvent(title2,remindStart,remindEnd,{description:content, location:location ,gusts:user});
      //      }
      
      
      sht.getRange('A'+i).setValue('済');
      
    }//if終了
    
  } //for終了
}


function onOpen() {
  //独自メニューの追加
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menus = [{name: 'カレンダー反映', functionName: 'calendar'}
              ];
  ss.addMenu('Function', menus);
}



