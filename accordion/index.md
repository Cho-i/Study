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

   1. 마크업 정보에 따른 폴더 상태 설정(열리고 닫힌 상태를 마크업으로 설정할 수있게 해야함) ->accordion.js

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

         사용자 정의 ㅣ속성에 메뉴 상태를 설정한 후 스크립트로 상태를 읽ㅅ어 상태에 맞게 방법1에서 수동으로 했던 작업을 자동으로 설정해주는 방식.

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

   2. 마크업 정보에 따른 서브 메뉴패널 열고닫기 ->accordion_v2.js

      초기 시작 시 data-extension 속성값에 따라 서브 메뉴 패널의 상태를 열려있거나 닫힌 상태로 표현

   3. 메인 메뉴아이템 클릭 시 서브 메뉴패널 열고 닫기

   4. 서브 메뉴패널 열고 닫기에 애니메이션 추가

   5. 인덱스 값으로 서브 메뉴패널 열고 닫기

3. 서브 메뉴아이템 선택

4. 외부 선택 기능 추가

5. 사용자 정의 이벤트 발생 처리

6. 캡슐화 적용

7. 폴더아코디언 jQuery 플러그인 제작



