# Lesson 01_클래스 소개

클래스는 만들어진 수많은 변수와 함수 중 연관있는 변수와 함수만을 선별해 포장.

자바스크립트에서는 클래스처럼 사용할 수 있는 방법 세가지.

1. 리터럴방식

   ```javascript
   var 인스턴스 = {
       프로퍼티1:초깃값,
       프로퍼티2:초깃값,
       
       메서드1:function(){        
       },
       메서드2:function(){        
       }
   }
   ```

   ​

2. 함수방식

   ```javascript
   function 클래스이름(){
       this.프로퍼티1=초깃값;
       this.프로퍼티2=초깃값;
       
       this.메서드1=function(){        
       }
       this.메서드2=function(){        
       }
   }
   ```

   ​

3. 프로토타입방식

   ```javascript
   function 클래스이름(){
       this.프로퍼티1=초깃값;
       this.프로퍼티2=초깃값;
   }

   클래스이름.prototype.메서드1=function(){    
   }
   클래스이름.prototype.메서드2=function(){    
   }
   ```



# Lesson 02_클래스 관련 기본 개념과 용어정리

함수를 사용하려면 함수 호출을 해줘야 하듯 클래스를 사용하려면 일반적으로 인스턴스를 생성해야함.

붕어빵 틀 = 클래스 (설계도)

붕어빵 = 인스턴스 또는 객체 (결과물)

한 페이지에 두 개의 탭패널이 있는 경우 두 개의 클래스를 만드는 것이 아니라 하나의 탭패널 클래스를 만든 후 두 개의 탭패널 인스턴스를 사용.

**TabPanel 클래스**

```javascript
var $선택메뉴=null;
var $전체탭패널=null;

function 초기화기능(){    
}

function 이벤트 처리(){    
}

function 탭패널 선택기능(){    
}
```

인스턴스는 주로 new라는 키워드를 이용해 만듦.

`var 인스턴스 = new TabPanel();`



객체는 인스턴스의 다른 말일 뿐 두 용어 모두 클래스의 실체를 나타내는 용어.

인스턴스 : new 키워드를 이용해 클래스의 실체를 생성할 때 주로 사용.

객체 : 인스턴스 생성 후 클래스에서 제공하는 프로퍼티와 메서드를 사용할 때 주로 사용.



클래스 내부에 만드는 변수를 프로퍼티라고 부르며 멤버변수라고도 부름.

`var 변수 = 값;`



클래스에 만드는 함수를 메서드라고 부르며 멤버함수라고도 부름.

`function 함수(){}`



# Lesson 03_오브젝트 리터럴 방식으로 클래스 만들기

리터럴 방식은 객체 리터럴을 의미하는 {} 내부에 프로퍼티와 메서드를 정의하는 구조.

**예제01**

```javascript
//클래스 정의 및 인스턴스 생성
var user = {
    name:"cho",
    age:28,
    showInfo:function(){
        document.write("name = "+this.name+", age = "+this.age);
    }
}
//메서드 접근하기
user.showInfo();
```



**프로퍼티**

콜론(:)을 기준으로 왼쪽에는 프로퍼티 이름 오른쪽에는 값.

프로퍼티 구분은 세미콜론(;)이 아닌 ***콤마(,)로 구분.***

**메서드**

리터럴 방식에서는 프로퍼티 정의 밥법과 동일하게 메서드를 정의.

**인스턴스**

리터럴 방식은 클래스를 정의함과 동시에 자동으로 인스턴스가 만들어짐.

인스턴스를 만들기 위해 다른 작업 필요없음.

하지만 다른 클래스 정의 방법과 달리 인스턴스를 하나 이상 만들 수 없는 단점.



객체 외부에서 프로퍼티와 메서드에 접근하려면 다음과 같이 ***접근연산자인 점(.)을 사용.***



객체 내부에서 자신의 프로퍼티와 메서드에 접근하려면 현재 객체 자신을 나타내는 this라는 속성과 접근 연산자인 점(.)을 사용.

```javascript
var 인스턴스 = {
    프로퍼티1:초깃값,
    프로퍼티2:초깃값,
    메서드1:function(){
        alert(this.프로퍼티1);
        this.메서드2();
    },
    메서드2:function(){        
    }
}
인스턴스.프로퍼티;
인스턴스.메서드();
```



**예제02**

```javascript
$(document).ready(function(){
    //객체 외부에서 메서드 호출
    tabMenu1.init();
    tabMenu1.initEvent();
});
var tabMenu1 = {
    //프로퍼티 생성
    $tabMenu:null,
    $menuItems:null,
    $selectMenuItem:null,
    
    //메서드 생성
    //요소 초기화
    init:function(){
        this.$tabMenu = $("#tabMenul");
        this.$menuItems = this.$tabMenu.find("li");
    },
    //이벤트 등록
    initEvent:function(){//이곳에 this는 탭메뉴 인스턴스(tabMenu1)
    	var objThis = this;
        this.$menuItems.on("click",function(){
            objThis.setSelectItem($(this));//이곳에 this는 이벤트를 발생시킨 메뉴 아이템 항목(li)
        });
    },
    //$menuItem에 해당하는 메뉴 아이템 선택하기
    setSelectItem:function($menuItem){
        //기존 선택메뉴 아이템을 비활성화 처리하기
        if(this.$selectMenuItem){
           this.$selectMenuItem.removeClass("select");
        }
        //신규 아이템 활성화 처리하기
        this.$selectMenuItem = $menuItem;
        this.$selectMenuItem.addClass("select");
    }
}
```



입력한 코드 중 initEvent() 메서드 내부 중 objThis에 this를 대입한 후 사용.

click 이벤트 리스너로 사용한 익명함수 내부의 this는 탭메뉴 객체가 아니라 이벤트를 발생시킨 메뉴 아이템 항목인 li 태그의 객체이기 때문에 만약 this.setSelectItem()을 하게 되는 경우 li 태그 객체에 존재하지도 않는 setSelectItem() 메서드를 호출하게 되어 에러발생!

objThis라는 지역변수를 만들어 탭메뉴의 setSelectItem() 메서드를 호출하게 함.



**장점** : 정의함과 동시에 인스턴스가 자동으로 만들어지기 때문에 인스턴스를 만드는 구문을 작성하지 않아도 됨.

**단점** : 인스턴스를 여러 개 만들 수 없음.



**<u>주 용도는 여러 개의 데이터 포장용.</u>**



# Lesson 04_함수 방식으로 클래스 만들기

함수 방식으로 클래스를 만드는 방법 역시 동일.

함수 방식 클래스의 경우는 하나의 함수 내부에 프로퍼티와 메서드를 정의하는 구조.

프로퍼티와 메서드는 반드시 자기 자신을 나타내는 this에 정의해야 함.

**예제01**

```javascript
//클래스 정의
function User(){
    this.name="cho";
    this.age=28;
    this.showInfo=function(){
        document.write("name = "+this.name+", age = "+this.age);
    }
}
//인스턴스 생성
var user = new User();
//메서드 호출
user.showInfo();
```

자바스크립트에서는 클래스를 만드는 방법은 함수 만드는 방법과 동일.

둘 다 function이라는 키워드를 사용하기 때문에 내부 구문을 확인하지 않고서는 일반 함수인지 클래스인지 구분할 방법은 없음.

일반적으로 함수이름을 소문자로 시작하며 클래스는 대문자로 시작함.

특별한 경우를 제외하고는 대문자로 작성하자.



**생성자**

인스턴스가 만들어지면서 자동으로 호출되는 함수.

주로 프로퍼티를 초기화하는 구문을 작성.

**프로퍼티**

함수방식에서 프로퍼티는 this에 만들어 줌.

**메서드**

메서드 역시 this에 만들어 줌.

**인스턴스**

'클래스이름' 함수를 호출할 때 앞에 new 키워드를 추가해 호출.

만약 new를 붙이지 않으면 인스턴스 생성이 아닌 함수 호출이 되어 정상적으로 동작하지 않게 됨.



함수 방식에서도 객체 외부에서 객체 내부에 있는 프로퍼티와 메서드에 접근하려면 접근 연산자를 이용.

```javascript
function 클래스이름(){
    this.프로퍼티1 = 초깃값;
    this.프로퍼티2 = 초깃값;
    this.메서드1=function(){
        alert(this.프로퍼티1);
        this.메서드2();
    }
    this.메서드2=function(){        
    }
}
var 인스턴스 = new 클래스이름();
인스턴스.프로퍼티1;
인스턴스.메서드1();
```


**예제02**

```javascript
$(document).ready(function(){
    //인스턴스 생성
    var tabMenu1 = new TabMenu();
    //요소 초기화 및 이벤트 등록 호출하기
    tabMenu1.init();
    tabMenu1.initEvent();
});
function TabMenu(){
    //프로퍼티 생성
    this.$tabMenu=null;
    this.$menuItems=null;
    this.$selectMenuItem=null;
    //메서드 생성
    //요소 초기화
    this.init=function(){
        this.$tabMenu = $("#tabMenu1");
        this.$menuItems = this.$tabMenu.find("li");
    }
    //이벤트 등록
    this.initEvent=function(){
        var objThis = this;
        this.$menuItems.on("click",function(){
            objThis.setSelectItem($(this));
        });
    }
    //$menuItem에 해당하는 메뉴 아이템 선택하기
    this.setSelectItem=function($menuItem){
        //기존 선택메뉴 아이템을 비 활성화 처리 하기
        if(this.$selectMenuItem){
           this.$selectMenuItem.removeClass("select");
        }
        //신규 아이템 활성화 처리 하기
        this.$selectMenuItem = $menuItem;
        this.$selectMenuItem.addClass("select");
    }
}
```



**두 번째 탭메뉴가 독립적으로 동작하게**

init()메서드에 선택자를 매개변수 값으로 설정할 수 있게 만들어 줌.

```javascript
$(document).ready(function(){
    //tabMenu1
    var tab1 = new TabMenu();
    tab1.init("#tabMenu1");
    tab1.initEvent();
    
    //tabMenu2
    var tab2 = new TabMenu();
    tab2.init("#tabMenu2");
    tab2.initEvent();
});
function TabMenu(){
    //프로퍼티 생성
    this.$tabMenu=null;
    this.$menuItems=null;
    this.$selectMenuItem=null;
    //메서드 생성
    //요소 초기화
    this.init=function(selector){//매개변수 추가
        this.$tabMenu = $(selector);
        this.$menuItems = this.$tabMenu.find("li");
    }
    //이벤트 등록
    this.initEvent=function(){
        var objThis = this;
        this.$menuItems.on("click",function(){
            objThis.setSelectItem($(this));
        });
    }
    //$menuItem에 해당하는 메뉴 아이템 선택하기
    this.setSelectItem=function($menuItem){
        //기존 선택메뉴 아이템을 비 활성화 처리 하기
        if(this.$selectMenuItem){
           this.$selectMenuItem.removeClass("select");
        }
        //신규 아이템 활성화 처리 하기
        this.$selectMenuItem = $menuItem;
        this.$selectMenuItem.addClass("select");
    }
}
```



**좀 더 쉽게 탭메뉴 바꾸자.**

탭메뉴 선택자 정보는 인스턴스 생성시 생성자(TabMenu)에서 시작해 init() 메서드로 흐르게 됨.

```javascript
$(document).ready(function(){
    //tabMenu1
    var tab1 = new TabMenu("#tabMenu1");
    
    //tabMenu2
    var tab2 = new TabMenu("#tabMenu2");
});

//탭메뉴 클래스
function TabMenu(selector){
    //프로퍼티 생성
    this.$tabMenu=null;
    this.$menuItems=null;
    this.$selectMenuItem=null;
    //메서드 생성
    //요소 초기화
    this.init=function(selector){
        this.$tabMenu = $(selector);
        this.$menuItems = this.$tabMenu.find("li");
    }
    //이벤트 등록
    this.initEvent=function(){
        var objThis = this;
        this.$menuItems.on("click",function(){
            objThis.setSelectItem($(this));
        });
    }
    //$menuItem에 해당하는 메뉴 아이템 선택하기
    this.setSelectItem=function($menuItem){
        //기존 선택메뉴 아이템을 비 활성화 처리 하기
        if(this.$selectMenuItem){
           this.$selectMenuItem.removeClass("select");
        }
        //신규 아이템 활성화 처리 하기
        this.$selectMenuItem = $menuItem;
        this.$selectMenuItem.addClass("select");
    }
    //초기화 메서드 호출
    this.init(selector);
    this.initEvent();
}
```



**장점** : 하나의 탭메뉴 클래스로 여러 개의 탭메뉴를 만들 수 있음.

**단점** : 인스턴스마다 내부의 모든 메서드가 독립적으로 만들어짐.

메서드가 객체마다 중복해서 만들어져 실무에서 잘 안 씀.