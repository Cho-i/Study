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

ex) 탭메뉴 생성 플러그인과 탭메뉴 선택 플러그인은 탭메뉴와 연관된 플러그인

```javascript
(function($){
    //플러그인 구현코드
    function TabMenu(){
        this.프로퍼티1;
        this.프로퍼티2;
        ...
    }
    TabMenu.prototype.선택기능 = function(){
            
    }
    TabMenu.prototype.메서드2 = function(){
            
    }
    ...
    //탭메뉴생성플러그인과 탭메뉴선택플러그인은 탭메뉴 플러그인 그룹
    //탭메뉴생성플러그인과 탭메뉴선택플러그인에서 TabMenu 클랫의 기능을 사용
    $.fn.탭메뉴생성플러그인 = function(){
        this.each(function(index){
            탭메뉴 생성//탭메뉴 인스턴스 생성
        });
    }
    $.fn.탭메뉴선택플러그인 = function(){
        this.each(function(index){
            탭메뉴의 선택기능() 사용
        });
    }
})(jQuery);
```



# Lesson 07_extend() 메서드를 활용한 플러그인 옵션 처리

## 01_ 기본 옵션값

플러그인 호출 시 넘겨야 하는 매개변수 값이 많은 경우가 있음. 주로 옵션값임.

ex)

```javascript
(function($){
    $.fn.removeAni = function(){
        this.each(function(index){
            var $target = $(this);
            $target.delay(index*1000).animate({height:0},500,"easeInQuint",function(){
                $target.remove();
            });
        });
        return this;
    }
})(jQuery);
$(document).ready(function(){
    $(".menu li").removeAni();
});
```

```javascript
(function($){
    //오브젝트 리터럴을 이용해 기본 옵션값
    $.defaultOptions = {
        duration:500,
        easing:"daseInQuint",
        delayTime:1000
    }
    //removeAni 플러그인에 매개변수(duration, easing, delayTime) 추가
    $.fn.removeAni = function(duration, easing, delayTime){
        //옵션값이 없는 경우 기본 옵션값으로 설정할 수 있게
        duration = duration || $.defaultOptions.duration;
        easing = easing || $.defaultOptions.easing;
        delayTime = delayTime || $.defaultOptions.delayTime;
        this.each(function(index){
            var $target = $(this);
            $target.delay(index*delayTime).animation({height:0},duration,easing,function(){
                $target.remove();
            });
        });
        return this;
    }
    $(document).ready(function(){
    	$(".menu li").removeAni();
    });
})(jQuery);
```

## 02_ jQuery의 extend() 메서드 소개

jQuery의 extend() 메서드는 객체의 기능(프로퍼티와 메서드)을 합칠 때 사용하는 메서드.

**사용법**

`var result = jQuery.extend(target[,object1][,objectN]);`

**매개변수**

`target : 합쳐진 기능을 최종적으로 저장할 객체`

`object1, objectN : 합쳐질 기능을 가진 객체`

**리턴값**

리턴값은 target에 저장되는 값과 같음.

ex)

```javascript
$(document).ready(function(){
    var target = {
        property1:"a",
        property2:"b",
        method1:function(){
            console.log("m1()");
        },
        method2:function(){
        	console.log("m2()");
    	}
    };
    var object1 = {
        property1:"1_a",
        property3:"1_c",
        method1:function(){
            console.log("1_m1()");
        },
        method3:function(){
            console.log("1_m3()");
        }
    };
    var result = jQuery.extend(target,object1);
    console.log("target=",target);
    console.log("object1=",object1);
    console.log("result=",result);
});
```

object1의 기능이 모두 target으로 합쳐지는 것을 확인할 수 있음.

또, target과 object1이 같은 기능을 가진 경우 target의 기능은 무시되고 object1의 기능이 우선적으로 합쳐지는 것을 확인.

<u>target과 extend() 메서드의 결과값이 같아</u>

## 03_extend() 메서드를 활용한 플러그인 옵션 처리

```javascript
(function($){
    $.defaultOptions = {
        duration:500,
        easing:"easeInQuint",
        delayTime:1000
    }
    $.fn.removeAni = function(options){
        //사용자 옵션 정보 유무 판단 후, 값이 없는 경우 기본값으로 설정
        options = $.extend(null, $.defaultOptions, options);
        //옵션값을 변경
        this.each(function(index){
            var $target = $(this);
            $target.delay(index*options.delayTime).animate({
                height:0
            }, options.duration, options.easing, function(){
                $target.remove();
            });
        });
        return this;
    }
})(jQuery);
$(document).ready(function(){
    //플러그인 호출
    $(".menu li").removeAni({
        durtain:1000
    });
});
```

extend() 메서드를 활용해 기본 옵션값과 사용자가 입력한 옵션값을 합침.

옵션값을 오브젝트 리터럴로 변경.
