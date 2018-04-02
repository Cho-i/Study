# var, let, const

## var (function-scoped)

var로 선언한 변수의 범위는 함수의 범위(function scope)를 가지고 있음.

하나의 함수 내에서는 적용범위가 유효하게 됨.



## let, const (block-scoped)

let과 const는 블록단위(block scope)의 범위를 가지고 있어서 {}로 감싸고 있는 범위내에서 유효.

const는 Primitive 타입인 string, number, boolean, null, undefined의 상수 선언에 사용되어짐.

한번 선언하고 다시 선언하면 에러가 남.

상수를 선언하는 const를 사용하고 변수를 사용하는데 let을 사용하면됨.

let에는 const와는 반대로, 변화되는 값을 대입할 수 있음.

```javascript
const constTest = 'constTest1';
constTest = 'isChangable';//에러

let letTest = 'letTest1';
letTest = 'isChangable';//OK
```



상수로 선언한 객체변수의 property는 변할 수 있음.

```javascript
const dog ={
    name:"waley",
    breed:"something"
};
dog.name = "tesler";

console.log(dog);
```

dog로 선언한 객체 자체를 변경하고자 하면, 에러.

*array나 object 또는 function 같은 경우에 const를 쓰는것 권장.



# for in

```javascript
//for in 문의 문법
for(변수 in 객체식){
    //문장
}
```

in의 왼쪽에는 대입할 곳으로 사용할 수 있는 식을 사용.

문법상으로는 좌변값을 씀.

좌변값이란 대입식의 좌변에 쓸 수 있는 값을 말하는데, 변수명을 쓴다고 생각하면 충분.

for 문과 같이 for in 문 안에서 변수 선언(루프변수)도 할 수 있음.

in의 우측에는 객체 타입인 식을 사용.

자바스크립트에는 암묵적 형변환이 있고, 어떤 값이라도 객체 타입으로 형변환을 할 수 있으므로 사실상 어떤 타입의 값이라도 쓸 수 있음.

따라서 불린값이나 숫자값을 써도 에러가 발생하지는 않음.

하지만 의미도 없으므로 현실적으로는 객체 타입의 식을사용.

객체식에 쓴 객체의 프로퍼티명에 해당하는 문자역이 루프변수에 차례대로 대입되는 방식으로 동작.

ex)

```javascript
var obj = {
    x : 1,
    y : true,
    z : 'cho'
};
for(var k in obj){
    console.log(k+":"+obj[k]);
}
```

위의 예제의 객체 obj에는 세 개의 프로퍼티가 있으며 for in 문에서 프로퍼티명인 x,y,z 문자열이 루프변수 k에 대입. 루프변수에는 객체를 연관 배열로 하고, 키를 연산하는 k나 key, 또는 프로퍼티명을 상기시키는 p나n(=name)이란 변수명을 자주 사용하는 것이 관례. 프로퍼티값을 표시할 때는 obj[k]와 같이 대괄호 연산을 사용.

## 배열과  for in 문

배열도 객체로 놓고 보자면 인덱스의 숫자가 프로퍼티명에 해당하기 때문에 다음과 같이 for in 문에 나열 할 수 있음. 하지만, 배열 요소를 나열할 때는 for in 문의 사용을 권장하지는 않음. 

```javascript
var arr = [10, 20, 30];
for(var n in arr){
    console.log(n + ":" + arr[n]);
}
```

**IE8의 경우, 위와 같이 사용할 경우 정상적으로 동작하지 않는다.**

array의 갯수를 정확하게 가져오지 못하는 까닭인지 초과해서 루프를 도는 경우가 많고 이에 따라 에러 발생.

IE를 고려하는 경우 되도록 지양하는것이 바람직.

배열을 탐색할 목적이라면 아래와 같이 for문을 사용하는 것을 추천.

```javascript
for(var i=0; item; item=arry[i]; i++){
    //item 처리
}
```



## for in문 주의할 사항

1. 프로퍼티를 열거하는 순서
2. 열거할 수 없는 프로퍼티의 존재
3. 프로토타입 상속한 프로퍼티

**프로퍼티를 열거하는 순서**

위의 예제 중 객체 리터럴 식에 쓴 것에 대한 결과값이 순서대로 나오기는 하였지만 객체 리터럴에 쓴 순서대로 열거되지 않음. 

순서가 보장되는 것이 아님. 원래 프로퍼티 간에는 순서가 없는 것으로 순서를 의식하는 것 자체가 잘못.

배열의 경우는 순서를 의식하는 데이터.

위의 배열 코드에서도 마찬가지로 기대한 순서를 보이고는 있지만 for in문은 순서를 보장하지 않기 때문에 이 같은 동작 방식에 지나치게 의존해서는 안됨.

**열거할 수 없는 프로퍼티의 존재**

두번째로 주의할 점은 for in문에 나열할 수 없는 프로퍼티의 경우.

예를 들어, 배열 객체에는 length 프로퍼티가 존재하지만 위의 코드에서와 같이 for in 문에서는 열거할 수 없음.

length 프로퍼티는 열거할 수 없는 속성의 프로퍼티이기 때문.

**프로토타입 상속한 프로퍼티**

세번째로 주의할 점은 for in 문은 프로토타입에서 상속한 프로퍼티도 나열한다는 것.



참고 : http://webclub.tistory.com/243