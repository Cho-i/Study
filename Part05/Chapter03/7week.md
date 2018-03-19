# Lesson 01_jQuery 확장 소개

jQuery 확장에는 유틸리티와 플러그인 두가지가 있음.

## 01_jQuery 확장이란?

jQuery는 jQuery가 제공하는 기능 이외의 기능이 필요한 경우 다른 개발자가 만들어놓은 기능을 아주 손쉽게 확장해서 사용할 수 있음.

jQuery 플러그인으로 만들면 좀더 쉽고 간결해짐.

**자바스크립트 방식**

`var tab1 = new TabMenu('#tabMenu1');`

`tab1.setSelectMenuItemAt(1);`

**jQuery 플러그인 방식**

`$('#tabMenu1').selectTabItemAt(1);`



## 02_jQuery 확장 요소 종류

1.유틸리티

유틸리티는 주로 도움을 주는 기능을 함.(ex. jQuery의 trim())

jQuery 인스턴스를 생성하지 않고 다음과 같이 jQuery 클래스에 직접 접근해서 사용.

`jQuery.유틸리티()`

OR

`$.유틸리티();`

2.플러그인

주로 노드를 다루는 특정 기능을 재사용하고자 할 때 사용하는 포장기능.(ex. 아코디언 메뉴, 탭 메뉴)

jQuery 객체를 생성한 후 사용.

`$('선택자').플러그인(옵션);`

OR

`var $결과 = $('선택자');`

`$결과.플러그인(옵션);`



# Lesson 02_jQuery 유틸리티 만들기

**문법**

```javascript
(function($){
    $.유틸리티 = function(){
        //기능 구현
    }
})(jQuery);
jQuery.유틸리티();//사용하기
```

**사용법**

일반 메서들 호출하듯 호출하면 됨.

```javascript
$(document).ready(function(){
    var data ="  abcde  ";
    console.log("실행전="+data+",실행후="+$.trim(data));
    console.log("실행전="+data+",실행후="+jQuery.trim(data));
});
```

## 03_사용자 정의 jQuery 유틸리티 만들기

```javascript
(function($){
    $.addComma = function(value){
        //숫자를 문자로 형변환
        var data = value +"";
        //문자를 배열로 만들기
        var aryResult = data.split("");
        //배열 요소를 뒤에서 3자리수마다 콤마 추가하기
        var startIndex = aryResult.length-3;
        for(var i=startIndex; i>0; i-=3){
            aryResult.splice(i, 0, ",");
        }
        //결과값 리턴
        return aryResult.join("");//배열의 원소들을 연결하여 하나의 값으로 만듦
    }
 })(jQuery);
$(document).ready(function(){
    console.log("123 >",$.addComma("123"));
    console.log("1234 >",$.addComma("1234"));
    console.log("12345 >",$.addComma("12345"));
    console.log("123456 >",$.addComma("123456"));
    console.log("1234567 >",$.addComma("1234567"));
});
```

