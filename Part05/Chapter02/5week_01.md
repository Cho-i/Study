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

브라우저 호스팅환경에서는 전역 객체는 window 객체.

```javascript
var test = 'window scope';
console.log(window.test);
function sayBlog(){
    console.log(this.test);
}
sayBlog();
```

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

이러한 문제점을 해결하려면 부모 함수의 this를 다른 변수에 저장.

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

## 생성자 함수를 호출

```javascript
function Person(name, age){
    this.name = name;
    this.age = age;
}
var myName = new Person('choi', 28);
console.log(myName.name);
console.log(myName.age);

Person.prototype.isYoung = function(){
    return this.age < 25;
}
console.log(myName.isYoung());
```

생성자로서 사용하게 되면 다른 객체지향 언어와 비슷한 방식.

즉, 생성된 객체의 멤버변수를 참조하게 됨.

이것은 prototype을 사용해서 정의한 객체의 메소드에서도 동일.

**이렇게 this는 부모 객체 그리고 생성자이냐 그냥 함수냐에 따라서 this 바인딩이 완전히 달라짐**

