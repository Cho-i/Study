# Lesson 01_this의 정체

## 01_this란?

this는 일반적으로 메서드를 호출한 객체가 저장된어 있는 속성.

일반 객체의 메서드에서 this는 메서드를 호출한 객체.

this 속성은 메서드를 호출할 때뿐 아니라 일반 함수를 호출할 때도 만들어지며 이벤트 리스너가 호출될 떄에도 this 속성이 만들어짐.

문제는 this 속성에 저장되는 값이 동일한 값이 아니라 각각 다르다는 점.

실무작업 시 다음과 같이 다양한 경우에 this에 어떤 값이 들어가는지 판단해서 사용할 수 있어야 함.

| this가 만들어지는 경우           | this 값 |
| -------------------------------- | ------- |
| 일반 함수에서 this               | ?       |
| 중첩 함수에서 this               | ?       |
| 이벤트에서 this                  | ?       |
| 메서드에서 this                  | ?       |
| 메서드 내부의 중첩 함수에서 this | ?       |

## 02_일반 함수에서의 this

```javascript
var data = 10;//1
function outer(){
    this.data = 20;//2
    data = 30;//3
    console.log('1. data1='+data);
    console.log('2. this.data='+this.data);
    console.log('3. window.data='+window.data);
}
outer();
```

일반 함수 내부에소 this는 전역 객체인 window가 저장.

이에따라 2는 window.data와 동일하기 때문에 2구문이 실행되면 전역변수 1에 20이 저장(10 대신 20이 저장된 상태).

3의 구문이 실행되는 경우 먼저 지역변수 내에서 data를 찾고 없으면 outer()를 호출한 영역에서 찾기 때문에 3의 data역시 전역변수 data가 됨.

따라서,전역변수 data에 30이 저장.

최종적으로 모두 다음과 같이 전역변수 data의 가장 최근 값인 30이 출력!



## 03_일반 중첩 함수에서의 this

```javascript
var data = 10;//1
function outer(){
    //중첩함수
    function inner(){
        this.data = 20;//2
        data = 30;//3
        console.log('1. data1='+data);
        console.log('2. this.data='+this.data);
        console.log('3. window.data='+window.data);
    }
    inner();
}
outer();
```

위 inner() 함수는 outer()에 만들어져 있기 때문에 outer() 내부에서만 사용할 수 있는 전형적인 중첩 함수.

일반 중첩 함수에서 this 역시 window가 됨.

모두 30 출력.



## 04_이벤트 리스너에서의 this

```javascript
var data = 10;//1
$(document).ready(function(){
    $('#myButton').click(function(){
        this.data = 20;//2 //프로퍼티는 여기에서 처음으로 만들어짐.
        data = 30;//3
        console.log('1. data1='+data);
        console.log('2. this.data='+this.data);
        console.log('3. window.data='+window.data);
    });
});
```

이벤트 리스너에서 this는 이벤트를 발생시킨 객체가 됨.

그렇기 때문에 this는 #myButton.

이에 따라 2는 #myButton 객체에 data라는 프로퍼티를 동적으로 추가하는 구문이 됨.

this.data = 20이 출력.



## 05_메서드에서의 this

```javascript
var data = 10;
function MyClass(){
    this.data = 0;//프로퍼티는 여기에서 만들어짐.
}
MyClass.prototype.method1 = function(){
    this.data = 20;
    data = 30;
    console.log('1. data1='+data);
    console.log('2. this.data='+this.data);
    console.log('3. window.data='+window.data);
}
//인스턴스 생성
var my1 = new MyClass();
my1.method1();
```

메서드 내부에서 this는 메서드를 호출한 객체를 나타냄.



## 06_메서드 내부의 중첩 함수에서의 this

```javascript
var data = 10;
function MyClass(){
    this.data = 0;
}
MyClass.prototype.method1 = function(){
    function inner(){
        this.data = 20;
        data = 30;
        console.log('1. data1='+data);
        console.log('2. this.data='+this.data);
        console.log('3. window.data='+window.data);        
    }
    inner();
}
//인스턴스 생성
var my1 = new MyClass();
//메서드 호출
my1.method1();
```

객체의 메서드 내부에서 만들어지는 중첩함수에서 this는 객체가 아닌 window가 됨.

정리하자면,

| this가 만들어지는 경우           | this 값                |
| -------------------------------- | ---------------------- |
| 일반 함수에서 this               | window 객체            |
| 중첩 함수에서 this               | window 객체            |
| 이벤트에서 this                  | 이벤트를 발생시킨 객체 |
| 메서드에서 this                  | 메서드를 호출한 객체   |
| 메서드 내부의 중첩 함수에서 this | window 객체            |

# Lesson 02_함수호출() vs. new 함수호출()

## 01_함수호출()

```javascript
var userName = "test";
function User(name){
    this.userName = name;
}
//호출
User("cho");
console.log("userName ="+userName);
```

User()함수는 클래스를 의미한다고 해도 User("cho");와 같이 호출하는 경우 일반적인 함수 호출이 됨.

즉, User()함수 내부에 있는 this.userName = name;의 this는 window가 됨.

userName은 프로퍼티가 아닌 일반 전역변수인 window.userName 됨.

"test"값 대신 "cho"가 대입됨.



## 02_new 함수호출()

```javascript
var userName = "test";
function User(name){
    this.userName = name;
}
//호출
var user = new User("cho");
console.log("userName ="+userName);
```

함수 앞에 new 명령어를 이용해 var user = new User("cho"); 호출.

이때는 일반 함수호출이 아닌 User 클래스의 인스턴스 생성이기 때문에 this.userName = name;의 this는 window가 아닌 인스턴스 자기 자신이 됨.

이에 따라 신규 인스턴스에 userName 이라는 프로퍼티가 생성되면 전역변수 userName과는 전혀 다른 변수가 됨.

| 구분      | 함수이름()              | new 함수이름()                                               |
| --------- | ----------------------- | ------------------------------------------------------------ |
| 해석      | 일반 함수 호출하는 구문 | new 클래스이름()으로 해석, <br />특정 클래서의 인스턴스를 생성하는 구문 |
| this 내용 | window 객체             | 인스턴스                                                     |

