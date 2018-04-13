/*
	1. 먼저 폴더아코디언 기능을 담을 FolderAccordionMenu 클래스를 만듦.
	1-1. 폴더아코디언 메인(#accordionMenu1)을 담을 프로퍼티를 만들어 줍니다.
	1-2. 폴더아코디언 메인 메뉴아이템을 담을 프로퍼티를 만들어 줍니다.
	2. 클래스 전역에서 사용한 DOM 요소를 찾는 역할을 할 init() 메서드를 만든 후 폴더아코디언 메인과 폴더아코디언 메인 메뉴아이템을 찾아 프로퍼티에 담아줌.
	3. 서브 메뉴패널의 상태(open, close, empty)를 폴더에 표현할 전담 메서드인 setFolderState()를 만들어 기능을 구현해줌.
	4. 서브 메뉴패널을 초기화하는 initSubMenuPanel() 메서드를 만든 후 메인 메뉴 아이템 태그(ul.accordion-menu > li)의 data-extension 속성에 입력돼 있는 서브 메뉴 상태 값을 읽은 후 
	이 값을 매개변수 값으로 해서 setFolderState() 메서드를 호출하는 구문을 작성.
	5. 생성자에서 init()와 initSubMenuPanel()메서드를 호출.
	6. 마지막으로 폴더아코디언 메뉴 인스턴스를 생성해 줌.
*/
$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');
});
function FolderAccordionMenu(selector){//1.
	this.$accordionMenu = null;//1-1.
	this.$mainMenuItems = null;//1-2.

	this.init(selector);//5.
	this.initSubMenuPanel();
}
/* 요소초기화 */
FolderAccordionMenu.prototype.init = function(selector){//2.
	this.$accordionMenu = $(selector);
	this.$mainMenuItems = this.$accordionMenu.children('li');
}
/* 폴더 상태 설정 */
FolderAccordionMenu.prototype.setFolderState = function($item,state){//3.
	var $folder = $item.find('.main-title .folder');
	$folder.removeClass();
	$folder.addClass('folder '+state);
}
/* 서브 패널 초기화 - 초기 시작 시 닫힌 상태로 만들기 */
FolderAccordionMenu.prototype.initSubMenuPanel = function(){//4.
	var objThis = this;
	this.$mainMenuItems.each(function(index){
		var $item = $(this);
		var $subMenu = $item.find('.sub');
		//서브가 없는 경우
		if($subMenu.length==0){
			$item.attr('data-extension','empty');
			objThis.setFolderState($item,'empty');
		}else{
			if($item.attr('data-extension')=='open'){
				objThis.setFolderState($item,'open');
			}else{
				$item.attr('data-extension','close');
				objThis.setFolderState($item,'close');
			}
		}
	});
}
