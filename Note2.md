# 자바스크립트 객체지향 프로그래밍의 다형성

다형성은 객체지향 프로그래밍 특징 중 가장 핵심적인 기능이라고 할 수 있음.

다형성의 개념을 학습하고 자바스크립트에서 다형성을 사용하는 방법을 알아보쟈.

![](http://cfile4.uf.tistory.com/image/2717FF4557512BBA34616D)

------



## 다형성이란?

다형성(polymorphism)은 특정 기능을 선언(설계)부분과 구현(동작)부분으로 분리한 후 구현부분을 다양한 방법으로 만들어 선택해서 사용할 수 있게 하는 기능.

여기서 선언부분은 인터페이스라고도 함.

선언부분은 구현코드가 전혀 없는 텅 빈 상태이며 일종의 지켜야 할 약속(규약)으로 가득 ㅊ찬 일종의 규약 문서.

개발자는 문제를 해결하는 구현 코드를 선언부분에 맞게 구현하기만 하면 됨.

즉, 선언부분과 구현 부분은 1:N의 다형성 관계가 형성.

**[예제1]**

멀티탭과 전원 케이블

![](http://cfile10.uf.tistory.com/image/214F3C3B57512E1820FC00)

다형성의 예는 현실에서도 쉽게 찾아 볼 수 있음.

주변에 가장 많이 사용되는 멀티탭을 생각하자.

멀티탭을 다형성 개념으로 접근한다면 선언부분은 구명이 두 개 뚫린 부분이라고 할 수 있음.

구현 부분은 멀티탭에 연결하는 전원 케이블.

이 멀티탭에 연결하려면 전원케이블은 반드시 연결 부분이 두개 튀어 나와 있어야 하며, 튀어 나와 있는 부분이 한 개거나 세 개여서는 절대 안됨.

그리고 튀어 나온 부분이 사각형이에도 안되고 반드시 둥그런 원형이어야 함.



참고로 선언부분을 실제 코드로 만들 때 객체지향 프로그래밍의 기본 기능인 인터페이스와 추상 클래스가 사용되며 구현 부분은 일반 클래스와 추상 클래스가 사용됨.

**[예제2]**

USB와 USB 기기들

다형성은 즐겨 사용하는 USB 기기에서도 찾을 수 있음.

모든 USB 기기는 USB 규격에 맞춰 만들어져 있음.

또한 USB를 연결해서 사용하는 컴퓨터 역시 USB 규격에 맞춰 만들어져 있음.

USB 규격에 맞춰 만들어져 있는 기기라면 그 어떤 기기라도 연결해서 사용할 수 있음.

심지어 아직 출시되지 않은 USB제품까지. 여기서 USB규격은 설계 부분인 인터페이스에 해당하며 USB기기들은 구현 부분을 담당하게 됨.



## 다형성과 데이터 타입과의 관계

이번엔 다형성과 데이터 타입과의 관계에 대해 알아보자.

자바스크립트에서는 데이터 타입이 중요하게 사용되진 않지만 일반 프로그래밍에서 데이터 타입은 매우 중요.



### 일반 객체지향 프로그래밍에서의 데이터 타입의 의미

먼저 자바스크립트에서 변수를 선언할 때 데이터 타입을 작성하진 않지만 일반 프로그래밍에서는 대부분 변수에 저장할 데이터 타입을 미리 작성해야 함.

그리고 이와 같은 개념은 함수와 메서드에서도 그대로 사용.

만약 함수를 만든 후 매개변수에 문자열 타입으로 선언하는 경우에도 문자열 데이터 값으로 메서드를 호출해야 하지 다른 값으로 하는 경우 에러가 발생하게 됨.

이처럼 일반 프로그래밍에서의 데이터 타입은 일종의 반드시 지켜야할 규약처럼 사용.



일반 객체지향 프로그래밍에서 데이터 타입은 다음과 같은 규칙을 가지고 있음.

- 변수 및 매개변수 선언 시 특정 인터페이스 타입인 경우 반드시 특정 인터페이스를 구현한 클래스의 인스턴스만을 저장하고나 매개변수 값으로 넘길 수 있음.
- 변수 및 매개변수 선언 시 특정 클래스 타입인 경우 반드시 특정 클래스 또는 특정 클래스를 상속받은 자식 클래스의 인스턴스만을 저장하거나 매개변수 값으로 넘길 수있음.

## 자바스크립트에서 다형성

자바스크립트에서 다형성을 구현하는 방법을 알아보자.

먼저 일반 객체지향 프로그래밍의 다형성 관련 문법을 살펴보면 선언부분과 구현부분으로 나눠 구성되며 다음과 같이 사용됨.

- 다형성 선언부분 : 인터페이스와 추상클래스
- 다형성 구현부분 : 클래스

### 자바스크립트에서 다형성 지원 유무

자바스크립트는 인터페이스와 추상 클래스 그리고 엄격한 데이터 타입 체크 등의 다형성과 관련된 문법을 전혀 지원하지 않음.

그렇게 때문에 그저 자바스크립트에서는 <u>다형성을 지원한다는 가정하에 다형성스럽게 코드를 만듦.</u>

문법만 제공하지 않을 뿐 다형성 개념을 사용해 코드를 만들게 되면 좀 더 월등한 프로그래밍을 할 수 있을 것.



자바스크립트에서 다형성 개념을 적용하여 사용하면 일반적으로 다음고 같은 구조를 갖게 됨.

```javascript
//자바스크립트는 선언부분이 없음.
//그냥 선언부분이 있다고 생각하고 작성함.

//합성을 이용해 구현부분을 사용하는 클래스
function 이미지정렬(선언부분){//이 부분을 선언부분이라고 가정하고 사용.
    선언부분.기능1();
    선언부분.기능2();
}
/*
* 구현 부분
* 구현도 선언부분이 있다는 가정하에 선언부분에 맞춰 구현함.
*/
//구현 부분 클래스 첫번째 묶음
function 기능1(){
    //구현 코드
}
function 기능1(){
    //구현 코드
}

//구현 부분 클래스 두번째 묶음
function 기능2(){
    //구현 코드
}
function 기능2(){
    //구현 코드
}

//구현 부분 클래스 세번째 묶음
function 기능3(){
    //구현 코드
}
function 기능3(){
    //구현 코드
}
```



## 다형성을 이용하여 심플 갤러리 만들어보기

요구사항

- 버튼을 누르면 버튼에 맞는 이미지 정렬 기능을 구현.
- 버튼을 4개로 가로정렬, 세로정렬, 랜덤정렬, 바둑판정렬 기능 동작을 요구.

```html
<div class="btn-gruop">
    <button id="btnHorizontal">가로정렬</button>
    <button id="btnVertical">세로정렬</button>
    <button id="btnRandom">랜덤정렬</button>
    <button id="btnGrid">바둑판정렬</button>
</div>
<div class="image-container" id="container1">
    <img src="src/images/1.jpg">
    <img src="src/images/2.jpg">
    <img src="src/images/3.jpg">
    <img src="src/images/4.jpg">
    <img src="src/images/5.jpg">
    <img src="src/images/6.jpg">
    <img src="src/images/7.jpg">
    <img src="src/images/8.jpg">
</div>
```

```css
.btn-gruop{margin-bottom:10px;}
.btn-gruop button{background-color:#222;color:#fff;border-radius:4px;border:1px solid #ccc;line-height:1;padding:5px 10px;}
div.image-container{position:relative;border:1px solid #000;}
div.image-container img{position:absolute;left:0;top:0;width:120px;}
```

```javascript
$(function(){
    var gallery = new Gallery('#container1 img');
    var $btnHorizn = $('#btnHorizontal');
    $btnHoriz.on('click',function(){
        gallery.show();
    });
});
function Gallery(selector){
    this.$images = null;
    this.init(selector);
}
Gallery.prototype.init = function(selector){
    this.$images = $(selector);
}
//이미지를 정렬 기본 기능
Gallery.prototype.show = function(){
    //이미지 개수 구하기
    var length = this.$images.length;
    for(var i=0; i<length; i++){
        var $img = this.$images.eq(i);
        var x = i*150;
        $img.css({left:x});
    }
}
```



```javascript
$(function(){
    var gallery = new Gallery('#container1 img');
    var $btnHorizn = $('#btnHorizontal'),
        $btnRandom = $('#btnRandom'),
        $btnVertical = $('#btnVertical'),
        $btnGrid = $('#btnGrid');

    $btnHorizn.on('click',function(){
        gallery.show('horizontal');
    });
    $btnVertical.on('click',function(){
        gallery.show('vertical');
    });
    $btnRandom.on('click',function(){
        gallery.show('random');
    });
    $btnGrid.on('click',function(){
        gallery.show('grid');
    });
});
function Gallery(selector){
    this.$images = null;
    this.init(selector);
}
Gallery.prototype.init = function(selector){
    this.$images = $(selector);
}
//이미지 정렬 방향 처리
Gallery.prototype.show = function(type){
    switch(type){
        case 'horizontal':
            this.horizontal();
            break;
        case 'vertical':
            this.vertical();
            break;
        case 'random':
            this.random();
            break;
        case 'grid':
            this.grid();
            break;
        default:
            this.horizontal();
    }
}
//이미지 가로 정렬 처리
Gallery.prototype.horizontal = function(){
    //이미지 개수 구하기
    var length = this.$images.length;
    for(var i=0; i<length; i++){
        var $img = this.$images.eq(i);
        var x = i*150;

        $img.css({left:x});
    }
}

//이미지 세로 정렬 처리
Gallery.prototype.vertical = function(){
    //이미지 개수 구하기
    var length = this.$images.length;

    //이미지 배열하기
    for(var i=0; i<length; i++){
        var $img = this.$images.eq(i);
        var y = i*150;

        $img.css({left:0,top:y});
    }
}

//이미지 랜덤 정렬 처리
Gallery.prototype.random = function(){
    //이미지 개수 구하기
    var length = this.$images.length;
    //이미지 배열하기
    for(var i=0; i<length; i++){
        var $img = this.$images.eq(i);
        var x = 200*Math.random();
        var y = 200*Math.random();

        $img.css({left:x,top:y});
    }
}

//이미지 바둑판 정렬 처리
Gallery.prototype.grid = function(){
    //이미지 개수 구하기
    var length = this.$images.length,
        count = 3;
    //이미지 배열하기
    for(var i=0; i<length; i++){
        var $img = this.$images.eq(i);
        var x = (i % count)*150;
        var y = parseInt(i / count)*150;

        $img.css({left:x,top:y});
    }
}
```

위 코드를 살펴보면 네 개의 이미지 정렬기능이 모두 Gallery 생성자(클래스) 내부에 구현되어 있음.

이는 다음과 같은 문제점이 있음.

**사용하지 않는 코드가 많다.**

- 세로, 가로, 바둑판식, 랜덤 이미지 정렬까지 네 가지의 이미지 정렬 기능이 모두 Gallery 클래스에 구현되어 있기 때문에 기능 하나를 선택하면 세 개의 기능은 사용하고 있지 않게 되어 불필요한 코드가 됨.

**코드 재사용성이 떨어진다.**

- Gallery 내부에 이미지 정렬 기능이 모두 구현되어 있기 때문에 만약 이미지 정렬 기능을 독립적으로 사용하고 싶어도 사용할 수가 없음. 원하는 정렬 기능을 사용하려면 반드시 Gallery 클래스의 인스턴스를 만들어야함.

**유지보수가 어렵다.**

- 네 가지 정렬 기능 이외에 새로운 이미지 정렬 기능을 추가해야 하는 경우 Gallery 클래스에 추가해서 구현해야 하기 때문에 클래스 기능이 점점 거대해져 유지보수가 어려워짐.

### 다형성을 적용한 코드

참고로 일반적으로 다형성 적용 전 코드와 같이 switch를 활용해 여러 조건을 처리하는 코드는 다형성으로 바꿀 수 있는 전형적인 경우.

위 코드를 가지고 다형성 적용을 위해 5단계로 나눠보자.

1. 다형성 선언부분 만들기
2. 다형성 구현부분 만들기(정렬기능 구현)
3. 다형성과 합성을 활용한 정렬 기능 연결
4. 정렬 기능 호출
5. 독립적으로 정렬 기능을 사용할 수 있는지 확인
6. 정리

**단계01:다형성 선언부분 만들기**

다형성을 만드는 첫 번째 작업은 구현 부분에 공통적으로 구현해야 하는 기능을 선별해 선언부분으로 만드는 작업.

지금 이미지 정렬 갤러리의 경우는 정렬 기능을 선언부분으로 만들어주면 좋을 것.

```javascript
function align($images){
    //이곳에 정렬 기능을 구현
}
```

정리하자면 선언부분은 앞에서 알아본 것 처럼 반드시 지켜야할 약속으로 구현부분에서는 반드시 선언부분에 정의되어 있는 메서드의 이름과 매개변수 개수까지 동일하게 메서드를 정의해서 구현해야함.

또한 자바스크립트의 경우 다향성의 선언부분을 정의하는 문법을 제공하지 않기 때문에 선언부분을 만들었다는 가정을 하고 진행하도록함.

**단계02:다형성 구현부분 만들기**

이번에는 선언부분에 맞게 코드를 구현하는 단계입니다.

아래 코드와 같이 네 가지의 정렬 기능 클래스를 생성한 후 선언부분에 작성된 메서드와 동일하게 메서드를 추가해 정렬 기능을 구현해 주도록 함.

인스턴스는 여러 개 생성할 필요없이 하나만 생성하면 되니 프로토타입 방식보다 리터럴 방식을 이용해 클래스를 만들어 보도록 하겠음.

```javascript
//가로 정렬 기능
var horizontal = {
    align : function($images){
        //이미지 개수 구하기
        var length = $images.length;
        //이미지 배열하기
        for(var i = 0; i < length; i++){
            var $img = $images.eq(i);
            var x = i*150;
            $img.css({left:x,top:0});
        }
    }
};

//세로 정렬 기능
var vertical = {
    align : function($images){
        //이미지 개수 구하기
        var length = $images.length;
        //이미지 배열하기
        for(var i = 0; i < length; i++){
            var $img = $images.eq(i),
                y = i*150;
            $img.css({left:0,top:y});
        }
    }
};

//랜덤 정렬 기능
var random = {
    align : function($images){
        //이미지 개수 구하기
        var length = $images.length;
        //이미지 배열하기
        for(var i = 0; i < length; i++){
            var $img = $images.eq(i),
                x = 200*Math.random(),
                y = 200*Math.random();
            $img.css({left:x,top:y});
        }
    }
};

//바둑판 정렬 기능
var grid = {
    align : function($images){
        //이미지 개수 구하기
        var length = $images.length,
            count = 3;
        //이미지 배열하기
        for(var i = 0; i < length; i++){
            var $img = $images.eq(i),
                x = (i%count)*150,
                y = parseInt(i/count)*150;
            $img.css({left:x,top:y});
        }
    }
};
```

**단계03:다형성과 합성을 활용한 정렬 기능 연결**

이제 Gallery 클래스의 show() 메서드에 다형성을 적용해 주기 위해 정렬 기능을 구현한 클래스의 인스턴스를 받을 수 있는 매개변수를 추가.

```javascript
//이미지 정렬 기능 실행
Gallery.prototype.show = function(alignable){
    alignable.align(this.$images);
}
```

정렬 기능 버튼을 누를 때 선택한 정렬 기능이 alignable 매개변수로 넘어와 사용될 것.

즉 합성을 사용해 정렬 기능을 빌려 사용하게 되는 것.

**단계04:정렬 기능 호출**

정렬 버튼 클릭시 버튼에 맞는 이미지 정렬 기능(align)의 인스턴스를 매개변수 값으로 show() 메서드를 호출해 줌.

```javascript
$(function(){
    var alignImg = new Gallery('#container1 img');
    var $btnHorizn = $('#btnHorizontal'),
        $btnRandom = $('#btnRandom'),
        $btnVertical = $('#btnVertical'),
        $btnGrid = $('#btnGrid');

    $btnHorizn.on('click',function(){
        alignImg.show(horizontal);//가로정렬 인스턴스 전달
    });
    $btnVertical.on('click',function(){
        alignImg.show(vertical);//세로정렬 인스턴스 전달
    });
    $btnRandom.on('click',function(){
        alignImg.show(random);//랜덤정렬 인스턴스 전달
    });
    $btnGrid.on('click',function(){
        alignImg.show(grid);//바둑판 정렬 인스턴스 전달
    });
});
```

**단계05:독립적으로 정렬 기능을 사용할 수 있는지 확인하기**

정렬 기능이 Gallery 내부에 구현되어 있지 않고 외부에 독립적으로 구현되어 있기 때문에 랜덤 정렬 기능을 다음과 같이 독립적으로 사용할 수 있을 것.

```javascript
$(function(){
    var $btnRandom = $('#btnRandom');
    $btnRandom.on('click',function(){
        //독립적으로 랜덤 정렬 기능만 사용
        random.align($('#container1 img'));
    });
});
```

**단계06:정리**

이미지 정렬 기능은 Gallery 클래스 내부에 구현되어 있지 않고 각각 독립적인 클래스로 구현.

**장점**

- 가벼워진 코드(Gallery 클래스 내부에 이미지 정렬 기능을 직접 구현하지 않고 모두 외부에 구현되어 있기 때문에 많이 가벼워짐, 이와 동시에 코드를 간결하게)
- 코드 재사용성이 높아짐(이미지 정렬 기능이 각각 독립적으로 구현되어 있어서 Gallery 도움없이 이미지 정렬 기능을 사용할 수 있음)
- 유지보수가 쉬어짐(새로운 이미지 정렬 기능을 추가해야 하는 경우 이미지 정렬 기능 인터페이스에 맞게 클래스를 만들어 Gallery에 연결해서 사용하면 됨. Gallery 클래스를 전혀 수정하지 않고.)

http://webclub.tistory.com/406
