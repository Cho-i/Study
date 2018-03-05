# this

자바스크립트에서 함수를 호출할 때 기존 매개변수로 전달되는 인자 값에 더해, arguments객체 및 this 인자가 함수 내부로 암묵적으로 전달되어짐.

this가 이해하기 어려운 이유는 자바스크립트의 여러가지 함수가 호출 패턴에 따라 this가 다른 객체를 참조(this 바인딩) 하기 때문.

this 바인딩에는 3가지 패턴이 있음.

- 객체의 메소드를 호출 : 해당 메소드를 호출한 객체로 바인딩
- 함수를 호출 : 전역 객체에 바인딩
- 생성자 함수를 호출 : 새로 생성되는 객체에 바인딩

## 객체를 호출할 때 this 바인딩

객체의 메소드를 호출할 경우, 메소드 내부 코드에서 사용된 this는 해당 메소드를 호출한 객체로 바인딩 됨. 

```javascript
//test 객체 생성
var test = {
    name : 'choi',
    sayName : function(){
        console.log(this.name);
    }
};
//other_test 객체 생성
var other_test = {
    name : 'na'
};
//other_test.sayName 메소드
other_test.sayName = test.sayName;
test.sayName();
other_test.sayName();
```

test 객체에서 sayName 메소드를 호출할때, this는 test객체를 참조.

other_test 객체에서 sayName 메소드를 호출 할 때, this는 other_test 객체를 참조.

**객체의 메소드를 호출하면 this는 자신을 호출한 객체에 바인딩된다.**

## 함수를 호출할 때 this 바인딩

함수를 호출하면, 해당 함수 내부 코드에서 사용된 this는 전역 객체에 바인딩됨.

브라우저에서 자바스크립트를 실행하는 경우 전역 객체는 window 객체.

```javascript
var test = 'window scope';
console.log(window.test);
function sayBlog(){
    console.log(this.test);
}
sayBlog();
```

test는 전역 변수이므로 전역 객체인 window의 프로퍼티로 접근이 가능.

sayBlog()함수 호출 시 this는 전역 객체에 바인딩됨.

**내부함수**

<u>메소드의 내부함수(inner function)를 호출했을 경우에도 그대로 적용된다.</u>

```javascript
var value = 77;
//test 객체 생성
var test = {
    value :18,
    get_value : function(){
        console.log('get_value:'+this.value);
        //get_value의 내부함수
        inner_get_value = function(){
            console.log('inner_get_value:'+this.value);
            //inner_get_value의 내부함수
            inner_get_value2 = function(){
                console.log('inner_get_value2:'+this.value);
            }
            inner_get_value2();
        }
        inner_get_value();
    }
}
test.get_value();
```

내부 함수도 결국 함수이므로 이를 호출할 때는 함수 호출로 취급!

함수 호출 패턴 규칙에 따라 내부 함수의 this는 전역 객체(window)에 바인딩.

<u>이러한 문제점을 해결하려면 부모 함수의 this를 다른 변수에 저장.</u>

```javascript
var value = 77;
//test 객체 생성
var test = {
    value :18,
    get_value : function(){
        var that = this;
        console.log('get_value:'+that.value);
        //get_value의 내부함수
        inner_get_value = function(){
            console.log('inner_get_value:'+that.value);
            //inner_get_value의 내부함수
            inner_get_value2 = function(){
                console.log('inner_get_value2:'+that.value);
            }
            inner_get_value2();
        }
        inner_get_value();
    }
}
test.get_value();
```

this값을 that 변수에 저장.

inner_get_value()와 inner_get_value2() 내부 함수는 자신을 둘러싼 부모 함수인  get_value()의 변수에 접근 가능,

inner_get_value()와 inner_get_value2()도 that 변수로 get_value()의 this가 바인딩된 객체인 test에 접근 가능.

## 생성자 함수를 호출할 때 this 바인딩

기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작.

반대로 생각하면 일반 함수에 new를 붙여 호출하면 원치 않는 생성자 함수처럼 동작할 수 있음.

따라서 대부분의 자바스크립트 코딩 가이드에서는 특정 함수가 생성자 함수로 정의되어 있음을 알리려고 함수 이름의 첫문자를 대문자로 쓰기를 권함.

생성자 함수 코드 내부에서 this는 앞서 알아본 메서드와 함수 호출 방식에서의 this 바인딩과는 다르게 동작.

new 연산자로 자바스크립트 함수를 생성자로 호출하면

1. 빈 객체 생성 및 this 바인딩

   생성자 함수 코드가 실행되기 전 빈 객체가 생성됨.

   바로 이 객체가 생성자 함수가 새로 생성하는 객체이며, 이 객체는 this로 바인딩됨.

   이후 생성자 함수의 코드 내부에서 사용된 this는 이 빈 객체를 가리킴.

   생성자 함수가 생성한 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정.

2. this를 통한 프로퍼티 생성

   이후에는 함수 코드 내부에서 this를 사용, 앞서 생성된 빈 객체에 동적으로 프로퍼티나 메서드가 생성 가능.

3. 생성된 객체 리턴

   특별하게 리턴문이 없을 경우, this로 바인딩된 새로 생성한 객체가 리턴.

   일반 함수는 리턴문이 없을 경우 undefined가 리턴되지만 생성자 함수는 새로 생성한 객체가 리턴.

   하지만, 리턴값이 새로 생성한 객체(this)가 아닌 다른 객체를 반환하는 경우, this가 아닌 다른 객체가 리턴.

```javascript
//Person 생성자 함수
function Person(name, age){
    this.name = name;
    this.age = age;
}
//myName 객체 생성
var myName = new Person('choi', 28);
console.log(myName.name);
console.log(myName.age);
```

새롭게 객체를 생성하고 생성자 함수 코드에서 사용되는 this로 바인딩됨.

this가 가리키는 빈 객체에 name, age라는 동적 프로퍼티를 생성.

리턴값이 특별히 없으므로 this로 바인딩한 객체가 생성자 함수의 리턴값으로 반환되서, myName 변수에 저장.



생성자로서 사용하게 되면 다른 객체지향 언어와 비슷한 방식.

즉, 생성된 객체의 멤버변수를 참조하게 됨.

이것은 prototype을 사용해서 정의한 객체의 메소드에서도 동일.

**이렇게 this는 부모 객체 그리고 생성자이냐 그냥 함수냐에 따라서 this 바인딩이 완전히 달라짐**!



[참고]http://programmer-seva.tistory.com/28
