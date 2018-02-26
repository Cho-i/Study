# 클래스를 이해하기 위해 반드시 알고 있어야 하는 내용

## 1. 함수를 사용하는 이유를 알고 있나요?

함수 : 호출되거나 실행될 수 있는 자바스크립트코드 블록

자바스크립트에서 함수는 first-class object다.

first-class object란?

1. 변수에 저장할 수 있어야함.
2. 함수의 파라미터로 전달할 수 있어야함.
3. 함수의 반환값으로 사용할 수 있어야함.
4. 자료 구조에 저장할 수 있어야함.

위와같은 조건들을 충족시키는 객체를 first-class object!

또한, 함수는 변수의 스코프를 결정하고 private변수 또는 메소드 뿐만 아니라 함수의 특징을 이용하여 public 속성과 메소드를 제공하며 자바스크립트 모듈을 작성하는 좋은 도구. 

- 한 번 정의하면 몇 번이든 실행할 수 있고 호출 할 수 있음.

  ​

## 2. 지역변수와 전역변수를 이해하고 있나요?

지역변수(로컬변수) : 일정한 또는 지정된 지역(scope)에서만 사용할 수 있는 특정한 변수, 함수가 실행되면 만들어지고 함수가 종료되면 소멸하는 변수, 함수 외부에서는 접근할 수 없음.

전역변수(글로벌변수) : 함수 정의 외부에 선언된 변수, 프로그램 전체에서 접근할 수 있는 변수.

전역변수를 남발하면 변수가 내부코드 또는 사용중인 라이브러리나 플러그인을 통해 충돌할 수도 있음.

이런 충돌로 부터 에러가 발생 되므로 이를 감안하여 최대한 전역변수의 사용을 줄여야함.

예제)

```javascript
a = 0;
var b = 0;
test = function(){
    c = 0;
    var d = 0;
}
```

a, b, c //전역변수

d //지역변수

b : var의 사용여부를 떠나 선언 위치에 영향을 받음.

c : 함수내에 선언되었으나 var 키워드가 없기 때문에 전역변수로 선언.



## 3. 매개변수가 있는 함수를 만들 수 있나요?

매개변수 : 함수에 변수값이 전달되어 처리해야 하는 경우에 함수에 전달되는 변수.

```javascript
function 함수명(매개변수1, 매개변수2, ...){
    실행문;
}
함수명(매개변수1값, 매개변수2값, ...);
    
var 변수명 = function(매개변수1, 매개변수2, ...){
    실행문;
}
함수명(매개변수1값, 매개변수2값, ...);
```



예제1)

```javascript
var subject = "subject";
function subjectName(subject){
    consloe.log(subject);
}
subjectName("jQuery");
```

subjectName(subject)함수 호출하고 subject 매개 변수값으로 "jQuery"를 전달.

subjectName(subject)함수 실행.

매개 변수값을 "jQuery"로 보내 주었기 때문에 subject = "jQuery".



예제2)

```javascript
var name = "cho";
function exam(kor, eng, math){
    var result = kor + eng + math;
    return result;
}
console.log(name +" 점수는"+exam(80, 90, 100)+"점 입니다.");
```

name 변수에 cho 저장.

exam() 함수를 실행.

매개 변수값을 80, 90, 100으로 주었기 때문에 kor=80, eng=90, math=100.

result를 exam()함수로 되돌려 줌.

cho 점수는 270점 입니다. 

매개 변수가 있는 함수의 경우 매개 변수값이 어떻게 전달되고 처리되는지에 대한 흐름을 이해해야함.



예제3)

```javascript
function view(a, b){
    console.log(a[0]);
    console.log(b.s1);
}
var ary = ["javascript","jquery"];
var obj = {s1:100, s2:90};
view(ary, obj);
```



## 4. 리턴값이 있는 함수를 만들 수있나요?

함수에서 return statement가 호출될 경우, 함수는 더 이상 실행되지 않음.

만약 return 값이 주어진다면, 그 값이 function을 호출한  caller에 반환.

return이 생략되는 경우에는 undefined가 반환.



예제1)

```javascript
function square(x){
    return x*x;
}
```

x가 숫자일 때, x의 제곱을 반환.



예제2)

```javascript
function counter(){
    for(var count = 1; ; count++){
        console.log(count +"A");
        if(count === 5){
            return;
        }
        console.log(count +"B");
    }
    console.log(count +"C");
}
counter();
```

return이 쓰여지는 지점에서 즉시 실행을 멈춤.



## 5. 중첩 함수를 이해하고 있나요?

자바스크립트에서 함수는 다른 함수와 중첩될 수 있음.

변수 범위규칙이 중첩된 함수는 해당 함수가 속한 함수의 매개변수와 변수에 접근할 수 있음.

중첩 함수에서는 중첩 함수를 포함하고 있는 함수의 지역변수에 접근해서 사용할 수 있음.

예제)

```javascript
var a = 10;
var b = 20;
var c = 30;
function outer(){
    var b = 200;
    var c = 300;
    function inner(){
        var c = 3000;
        console.log("a = "+a);
        console.log("b = "+b);
        console.log("c = "+c);
        
    }
    inner();
}
outer();
```

a = 10

b = 200

c = 3000

안쪽 함수는 바깥쪽 함수 영역 내에서만 동작, 바깥 함수와 인자에 접근할 수 있음, 하지만 바깥 함수는 안쪽 함수 변수에 접근할 수 없음.



## 6. 콜백 함수를 이해하고 있나요?

**함수를 인자로 넘겨 사용하겠다.**

```javascript
$('#btn').click(function(){
    alert('btn clicked');
});
```

```javascript
var friends = ["Mike", "Stacy", "Andy", "Rick"];
friends.forEach(function(eachName, index){
    console.log(index+1+"."+eachName); // 1. Mike, 2. Stacy, 3. Andy, 4. Rick
});
```

forEach라는 함수안에 익명의 함수를 넣어서 forEach 구문 내에서 동작.



호출했던 부분으로 다시 돌아간다.

```javascript
function doFunction(callback){
    //doFunction에서 실행 될 내용들
    var a = 1;
    var b = 1;
    var c = a+b;
    alert('doFunction 에서 실행 될 내용이 실행된다.');
    //doFunction에서 실행 될 내용들이 다 실행 된 후 인자값으로 받은 callback을 실행한다.
    //넘겨받은 callback이 함수이기 때문에 실행 가능.
    //이때 c 값을 인자값으로 넘겨준다.
    if(typeof callback === 'function'){
        callback(c);
    }
}
//먼저 doFunction을 실행 시키고 callback함수에 의해 function 안의 내용이 실행된다.
doFunction(function(msg){
    //doFunction 함수의 호출에 의해서 실행된다.
    //인자값으로 받은 c값을 msg로 받는다.
    alert('callback 함수의 실행 될 내용');
    alert('c의 값은?'+msg);
});
```

doFunction 함수를 호출해서 doFunction에서 실행 될 내용들이 다 실행 된 이후 다시 doFunction을 호출했던 부분으로 돌아오는것.



## 7. 클로저를 이해하고 있나요?

**scope**

자바스크립트에서 스코프는 작성된 코드를 둘러싼 환경(유효범위).

스코프는 전역(global) 또는 지역적(local)으로 정의 될 수 있음.

스코프이 개념은 쉽게 생각해 scopeA와 scopeB중 우리가 어디있는지 파악하는것.

**lexical scope**

하나의 function내 다른 function이 있다면, 내부 function의 스코프에 접근 할 수 있음.

이것을 lexical scope 또는 클로저라고 부르며, static scope라 하기도 함.

**scope chain**

정의된 function 각각은 자신만의 중첩된 스코프를 가지고 있음.

다른 function안에 정의된 local scope를 가진 내부 function은 바깥 function과 연결되어 있음.

그 연결을 scope chain이라 함.

**closure**

자바스크립트에서 클로저는 함수가 생성되는 시점에 생성됨.

함수가 생성될 때 그 함수는 렉시컬 환경을 포섭하여 실행될 때 이용.



예제1)

```javascript
function makeFunc(){
    var name = "cho";
    function myName(){
        alert(name);
    }
    return myName;
}
var myFunc = makeFunc();
myFunc();
```

몇몇 프로그래밍 언어에서, 함수 안의 지역 변수들은 그 함수가 수행되는 기간 동안에만 존재.

makeFunc() 실행이 끝나면 name 변수에 더 이상 접근할 수 없게 될 것으로 예상.

하지만, 자바스크립트는 자바스크립트의 함수가 클로저를 형성하기 때문.

클로저는 함수와 함수가 선언된 어휘적 환경의 조합.

이 환경은 클로저가 생성된 시점의 범위 내에 있는 모든 지역 변수로 구성.

myFunc은 makeFunc이 실행될 때 생성된 myName 함수의 인스턴스에 대한 참조.

myName의 인스턴스는 그 변수, name이 있는 어휘적 환경에 대한 참조를 유지.

이런 이유로 myFunc가 호출될 때 변수 name은 사용할 수 있는 상태로 남게 되고 'cho'가 alert에 전달됨.



예제2)

```javascript
function makeAdder(x){
    return function(y){
        return x+y;
    }
}
var add5 = makeAdder(5);
var add10 = makeAdder(10);
console.log(add5(2));
console.log(add10(2));
```

단일 인자 x를 받아서 새 함수를 반환하는 함수 makeAddr(x)를 정의.

반환되는 함수는 단일 인자 y를 받아서 x와 y의 합을 반환.

