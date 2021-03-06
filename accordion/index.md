# 01 분석하기

**요구사항**

1. 서브 메뉴가 열리고 접히는 폴더아코디언
2. 메뉴는 2단까지이며 서브 메뉴 항목이 보일 때 부드럽게 열리고 닫히게
3. 또한 서브 메뉴 아이템을 선택할 수 있게 (단, 서브 메뉴아이템은 오직 하나만 선택)
4. 서브 메뉴패널이 열리는 경우에는 open 이벤트, 닫히는 경우는 close 이벤트, 서브 메뉴아이템을 선택하는 경우 select 이벤트 발생
5. 모든 내용은 자바스크립트 prototype 문법을 이용해 클래스로
6. 바메뉴를 jQuery 플러그인으로

**출력효과**

1. 서브 메뉴패널이 열리는 효과
2. 서브 메뉴패널이 닫히는 효과

**동작효과**

1. 메인 메뉴아이템을 클릭하는 경우
2. 서브 메뉴아이템을 클릭하는 경우

# 02 구현하기

1. 레이아웃 잡기

2. 서브 메뉴패널 열고 닫기

   1. 마크업 정보에 따른 폴더 상태 설정(열리고 닫힌 상태를 마크업으로 설정할 수있게 해야함) ->[accordion.js](libs/js/accordion.js)

      1. 마크업에 스타일을 직접 적용하기

         ```html
         <ul class="accordion-menu" id="accordionMenu1">
             <li>
             	<div class="main-title"><span class="folder open"></span><a>menu1</a></div>
                 <ul class="sub show">
                     <li><a>sub1-1</a></li>
                     <li><a>sub1-2</a></li>
                     <li><a>sub1-3</a></li>
                     <li><a>sub1-4</a></li>
                 </ul>
             </li>
             <li>
             	<div class="main-title"><span class="folder close"></span><a>menu2</a></div>
                 <ul class="sub hide">
                     <li><a>sub2-1</a></li>
                     <li><a>sub2-2</a></li>
                     <li><a>sub2-3</a></li>
                     <li><a>sub2-4</a></li>
                 </ul>
             </li>
         </ul>
         ```

         이 방법은 쉽긴 하지만 .folder와 .sub에 스타일을 직접 설정해야 하는 번거로운 단점.

      2. 사용자 정의 속성+스크립트 활용

         사용자 정의 속성에 메뉴 상태를 설정한 후 스크립트로 상태를 읽어 상태에 맞게 방법1에서 수동으로 했던 작업을 자동으로 설정해주는 방식.

         ```html
         <ul class="accordion-menu" id="accordionMenu1">
             <li data-extension="open">
             	<div class="main-title"><span class="folder open"></span><a>menu1</a></div>
                 <ul class="sub show">
                     <li><a>sub1-1</a></li>
                     <li><a>sub1-2</a></li>
                     <li><a>sub1-3</a></li>
                     <li><a>sub1-4</a></li>
                 </ul>
             </li>
             <li data-extension="close">
             	<div class="main-title"><span class="folder close"></span><a>menu2</a></div>
                 <ul class="sub hide">
                     <li><a>sub2-1</a></li>
                     <li><a>sub2-2</a></li>
                     <li><a>sub2-3</a></li>
                     <li><a>sub2-4</a></li>
                 </ul>
             </li>
         </ul>
         ```

      서브 메뉴패널의 열림과 닫힘을 폴더에 표현.

      메뉴아이템에 data-extension이라는 속성을 추가해 상태 정보를 설정한 후 이 값을 읽어 폴더 상태를 설정하는 작업.

       data-extension 값을 읽어 메뉴아이템의 클래스 이름을 설정.

      | 이름            | 서브 메뉴패널 열림 | 서브 메뉴패널 닫힘 | 서브 메뉴패널 없음                                 |
      | :-------------- | ------------------ | ------------------ | -------------------------------------------------- |
      | 상태 아이콘     | -                  | +                  |                                                    |
      | data-extendsion | open               | close(기본)        | empty 또는 스크립트를 이용해 섭서브 패널 유무 확인 |
      | class name      | open               | close(기본)        | empty                                              |

      기능 구현을 담을 FolderAccordionMenu라는 클래스를 만든 후 코드를 순서에 맞게 작성

      *만약 폴더를 열린 상태로 설정하고 싶으면 data-extension 값을 open으로 해주고 닫힌 상태로 하고 싶은 경우 값을 close로 설정. 여기서 진행한 작업은 오직 폴더 상태만을 처리.

   2. 마크업 정보에 따른 서브 메뉴패널 열고닫기 ->[accordion_v2.js](libs/js/accordion_v2.js)

      초기 시작 시 data-extension 속성값에 따라 서브 메뉴 패널의 상태를 열려있거나 닫힌 상태로 표현

   3. 메인 메뉴아이템 클릭 시 서브 메뉴패널 열고 닫기 ->[accordion_v3.js](libs/js/accordion_v3.js)

      스크립트를 활용해 메인 메뉴아이템 클릭 시 서브 메뉴패널이 열고 닫히는 기능 구현.

   4. 서브 메뉴패널 열고 닫기에 애니메이션 추가 ->[accordion_v4.js](libs/js/accordion_v4.js)

      서브 메뉴패널이 부드럽게 열고 닫히는 애니메이션 기능을 구현.

   5. 인덱스 값으로 서브 메뉴패널 열고 닫기 ->[accordion_v5.js](libs/js/accordion_v5.js)

      FolderAccordionMenu 객체의 외부와 내부에서 인덱스 값으로 서브 메뉴패널을 열고 닫을 수 있는 기능을 구현.(ex. 부드럽게 0번째 메뉴 열기, 즉시 2번째 메뉴 닫기)

3. 서브 메뉴아이템 선택 ->[accordion_v6.js](libs/js/accordion_v6.js)

   모든 서브메뉴 아이템을 통틀어 오직 하나의 서브 메뉴 아이템만이 선택될 수 있게.

4. 외부 선택 기능 추가 ->[accordion_v7.js](libs/js/accordion_v7.js)

   객체 외부에서 인덱스 값을 활용해 특정 서브메뉴패널과 서브 메뉴아이템을 선택하는 기능을 구현.

   (ex. 메서드를 호출하면 1번째 서브 메뉴패널의 1번째 서브 메뉴아이템은 선택상태)

5. 사용자 정의 이벤트 발생 처리

   서브 메뉴패널이 열리는 경우 open이벤트를 발생, 닫히는 경우 close 이벤트를 발생, 서브 메뉴아이템을 선택하는 경우 select 이벤트를 발생.

   1. 서브 메뉴패널 열리고 닫힐 때 이벤트 발생 ->[accordion_v8.js](libs/js/accordion_v8.js)

      서브 메뉴패널이 열릴 때는 열린 서브 메뉴패널 정보를 open이라는 사용자 정의 이벤트에 담아 발생, 서브 메뉴패널이 닫힐 때는 닫힌 서브 메뉴패널 정보를 close라는 사용자 정의 이벤트에 담아 발생하는 기능 구현.

   2. 서브 메뉴아이템 선택 이벤트 발생 ->[accordion_v9.js](libs/js/accordion_v9.js)

      서브 메뉴아이템이 선택될 때 선택정보를 외부에 알려주는 선택 이벤트를 발생하는 기능 구현.

6. 캡슐화 적용 ->[accordion_10.js](libs/js/accordion_v10.js)

   외부에서 접근하지 말아야 하는 프로퍼티와 메서드에 언더바(_) 붙이기.

   | 요소     | 접근가능(public)                                             | 접근 불가능(private)                                         |
   | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
   | 프로퍼티 | $accordionMenu                                               | ```_$mainMenuItems```<br>```_$selectSubItem```               |
   | 메서드   | closeSubMenu()<br>closeSubMenuAt()<br>openSubMenu()<br>openSubMenuAt()<br>toggleSubMenuPanel()<br>selectMenu() | ```_init()```<br>```_initEvent()```<br>```_initSubMenuItem()```<br>```_setFolderState()```<br>```_dispatchOpenCloseEvent()```<br>```_dispatchSelectEvent()``` |

7. 폴더아코디언 jQuery 플러그인 제작

   1. 폴더아코디언 플러그인 만들기 ->[accordion_v11.js](libs/js/accordion_v11.js)
   2. 폴더아코디언 선택 처리 플러그인 만들기 ->[accordion_v12.js](libs/js/accordion_v12.js)



