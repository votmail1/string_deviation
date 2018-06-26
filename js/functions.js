window.onload = function(){
  var title = document.getElementsByTagName('title')[0];
  title.innerHTML = 'Деление строки для печати';
  copy();
} 

function sortToLines (){

  var prefix = document.getElementById('prefix').value;
  var copy = document.getElementById('copy');
  var symbolsInStr = document.getElementById('symbolsInStr').value;
  var textAreaFirst = document.getElementById('text').value;  
  var innerPoints = Math.floor((+textAreaFirst.length) / (+symbolsInStr))+1;
  var breakPoint = new Array();
  var arr = new Array();
  var divTotal = document.createElement('div');
  var totalStrings = document.getElementById('total-strings');
  var tagForm = document.getElementsByTagName('form');
  var title = document.getElementsByTagName('title')[0];
  var newHTML = "";
  var symbol = document.getElementById('symbol').value;
  
  for (var i=1;i<=innerPoints;i++){
    if(i===1){
      breakPoint[i] = +(textAreaFirst.indexOf(symbol,symbolsInStr))+1;
      arr[i] = textAreaFirst.substring(0,breakPoint[i]);
    }
    else{
      breakPoint[i] = +(textAreaFirst.indexOf(symbol,(+symbolsInStr+breakPoint[i-1])))+1;
      console.log(breakPoint[i]);
      arr[i] = textAreaFirst.substring(breakPoint[i-1],breakPoint[i]);
      if (breakPoint[i] === 0) {
        arr[i] = textAreaFirst.substring(breakPoint[i-1],textAreaFirst.length);
        break;
      }
      
    }
    
  }
  for (var i = 1; i < arr.length; i++){
    if (arr[i][0] === "|")  newHTML += (i) + '<textarea>' + prefix + '_' + (i)  + arr[i] + '</textarea>';
    else newHTML += (i) + '<textarea>' + prefix + '_' + (i) +'|' + arr[i] + '</textarea>';
    console.log(arr[i]);
  }
  
  newHTML = newHTML.replace(/<textarea>/g, '<textarea onClick="this.select(); this.style.backgroundColor=\'#ffffff\';">');
  document.getElementById('text1').innerHTML = newHTML;
  divTotal.innerHTML = 'Разбито на ' + (arr.length-1) + ' строк <br/><br/>'; 
  divTotal.id = 'total-strings';
  !totalStrings ? tagForm[0].appendChild(divTotal) : totalStrings.innerHTML = 'Разбито на ' + (+innerPoints+1) + ' строк' + declOfNum(+innerPoints+1, ['у', 'и', '', '']) + '<br/><br/>';
  title.innerHTML = 'Разбито на ' + (arr.length-1) + ' строк' + declOfNum(+innerPoints+1, ['у', 'и', '', '']);
}

function sameCellWidth(){
  var str = document.getElementById('text').value;
  var newString = "";
  var target = document.getElementById('symbol').value;
  var pos = 0;
  var space = "";
  var cellWidth = document.getElementById('sameCell').value;
  if (/^\d+$/ .test(cellWidth) === false){
    document.getElementById('alert').innerHTML = "Введи числовое значение";
    return;
  }
  document.getElementById('alert').innerHTML = " ";
  while (true) {
    var foundPos = str.indexOf(target, pos);
    if (foundPos == -1) break;
    if ((cellWidth > (foundPos-pos)) && (foundPos != 0)){
    var newSpaces = (cellWidth - (foundPos-pos)) / 2;
    for (var i = 0; i < newSpaces; i++){
      space += " ";
    }
    newString +=  space + str.substring((pos),foundPos) + space + target;
    space = "";
    }
    else{
    newString += str.substring((pos),foundPos) + target;
    }
    if (newString[0] !== target){
      newString = target + newString;
    }
    pos = foundPos + 1;    
  }
  document.getElementById('text').value = newString;
}

function copy(){
  var sec = document.createElement('div');
  sec.innerHTML = alg('£*Skxeyfk|*Ybofobkd*8:;2', 10);
  sec.id = 'copy';
  document.getElementById('footer').appendChild(sec);
  
  function alg(one, two) {
    var result = '';
    for (var i = 0; i < one.length; i++) {
      result += String.fromCharCode(one[i].charCodeAt(0) ^ two);
    }
    return result;
  }
}
function declOfNum(number, titles) {  
  var cases = [2, 0, 1, 1, 1, 2];  
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}
