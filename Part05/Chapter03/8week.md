# Lesson 04_함수 기반 플러그인 만들기

## 01_ 구문

```javascript
(function($){
    $.fn.플러그인이름 = function(속성값){
        this.each(function(index){
            var 변수1;
            var 변수2;
            ...
            function 함수1(){
                
            }
            function 함수1(){
                
            }
            ...
        });
        return this;
    }
})(jQuery);
```

*플러그인을 호출 할 때마다 플러그인 내부에 들어있는 3개의 함수가 중복해서 만들어짐.



# Lesson 05_클래스 기반 플러그인 만들기

## 01_ 문법

```javascript
(function($){
    function MyClass(){
        this.프로퍼티1;
        this.프로퍼티2;
        ...
    }
    MyClass.prototype.메서드1 = function(){

    }
    MyClass.prototype.메서드2 = function(){

    }
    ...
    $.fn.플러그인이름 = function(){
        this.each(function(index){
            //플러그인 구현 코드가 들어있는 클래스 인스턴스를 생성
            var obj = new MyClass();
        });
    }
})(jQuery);
```

기능을 prototype 기반 클래스로 만든 후 플러그인에서 클래스 인스턴스를 생성한 후 사용하는 구조로 돼 있음.

이렇게 하면 함수 기반 플러그인이 가지고 있던 문제점을 해결할 수 있게 됨.

*만들어져 있는 메서드를 공유해서 사용.(메서드들은 오직 한 번만 만들어짐)



# Lesson 06_플러그인 그룹 만들기

연관된 클래스 기반으로 jQuery 플러그인을 만들 떄 클래스 인스턴스를 연관 있는 플러그인에서 공유해서 사용하는 구조를 뜻함.

