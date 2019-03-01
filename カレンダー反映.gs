/*---------------------------------------------------*/ 
//可変部分

var shtName = 'アポ獲得';


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
      
      var date = sht.getRange('D'+i).getValue(); //商談日
      var time = sht.getRange('E'+i).getValue(); //商談時間
      
      var start = new Date(date.getYear(),date.getMonth(),date.getDate(),time.getHours(),time.getMinutes(),time.getSeconds());
      var end = new Date(date.getYear(),date.getMonth(),date.getDate(),time.getHours()+1,time.getMinutes(),time.getSeconds());
      
//リマインド設定したい場合
//      var remindDate = sht.getRange('K'+i).getValue(); //リマインド日
//      var remindTime = sht.getRange('L'+i).getValue(); //リマインド時間
      
      var location = sht.getRange('N'+i).getValue(); //住所

      /*---------------------------------------------------*/      
      //SS変数設定　PJによって変わる内容
      
      var d1 = sht.getRange('M'+i).getValue(); //店舗名
      var d2 = sht.getRange('G'+i).getValue(); //アポの質
      var d3 = sht.getRange('H'+i).getValue(); //駅
      var d4 = sht.getRange('I'+i).getValue(); //駅から徒歩何分か
      var d5 = sht.getRange('J'+i).getValue(); //先方担当者
      var d6 = sht.getRange('F'+i).getValue(); //アポ時メモ
      var d7 = sht.getRange('O'+i).getValue(); //電話番号
            
      /*---------------------------------------------------*/            
      //本文作成
      
      var title = '【' + d13[0] + '商談】'+ d5 + '@' + d7;
      var title2 = '【リマインド】'+ d5 + '@' + d8;
      
      var content = '';
      content += '【詳細】'+'\n';
      content += '駅徒歩：'+ d8 +'\n';
      content += '先方担当者：'+ d9 +'\n';
      content += 'アポの質：'+ d6 +'\n';
      content += '電話番号：'+d12+'\n';
      content += 'アポ時メモ：'+d11; 
      
      /*---------------------------------------------------*/            
      //カレンダー反映設定

//自分にしか送らない場合
//      var id = Session.getActiveUser().getEmail();
     
      var id = sht.getRange('C1').getValue();
      var user = sht.getRange('E1').getValue();
      
      
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

