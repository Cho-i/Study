/*
	1. 먼저 기존 코드 마지막 부분에 서브 메뉴패널을 열고닫는 기능을 구현할 toggleSubMenuPanel()메서드를 신규로 추가.
	1-1. 매개변수($item)으로 넘어온 메인 메뉴아이템에서 data-extension 속성값을 구함.
	1-2. 속성값이 'empty'이면 서브 메뉴패널이 없는 것을 의미하기 때문에 return 구문을 이용해 작업을 중지.
	1-3. 서브 메뉴패널이 열려 있는 상태면 닫힌 상태로 만들고 닫힌 상태면 열린 상태로 만드는 코드를 작성(토글기능).
	2. 이벤트 리스너 등록을 전문으로 처리할 initEvent()메서드를 신규로 추가.
	2-1. 메인 메뉴아이템($mainMenuItems)의 메인 타이틀(.main-title)에 click 이벤트 리스너를 추가.
	2-2. 클릭 이벤트가 발생하면 앞에서 작성한 toggleSubMenuPanel() 메서드를 호출해 서브 메뉴패널을 토글시켜 줌.
	3. 이벤트가 동작할 수 있게 생성자에서 initEvent() 메서드를 호출.

*/
$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');
});

function FolderAccordionMenu(selector){
	this.$accordionMenu = null;
	this.$mainMenuItems = null;

	this.init(selector);
	this.initSubMenuPanel();
	this.initEvent();//3.
}

/* 요소초기화 */
FolderAccordionMenu.prototype.init = function(selector){
	this.$accordionMenu = $(selector);
	this.$mainMenuItems = this.$accordionMenu.children('li');
}

/* 폴더 상태 설정 */
FolderAccordionMenu.prototype.setFolderState = function($item,state){
	var $folder = $item.find('.main-title .folder');
	$folder.removeClass();
	$folder.addClass('folder '+state);
}

/* 서브 패널 초기화 - 초기 시작 시 닫힌 상태로 만들기 */
FolderAccordionMenu.prototype.initSubMenuPanel = function(){
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
				objThis.openSubMenu($item);
			}else{
				objThis.closeSubMenu($item);
			}
		}
	});
}

/* 서브 메뉴패널 열기 */
FolderAccordionMenu.prototype.openSubMenu = function($item){
	if($item != null){
		$item.attr('data-extension','open');
		var $subMenu = $item.find('.sub');
		$subMenu.css({marginTop:0});
		//폴더 상태를 open 상태로 만들기
		this.setFolderState($item,'open');
	}
}

/* 서브 메뉴패널 닫기 */
FolderAccordionMenu.prototype.closeSubMenu = function($item){
	if($item != null){
		$item.attr('data-extension','close');
		var $subMenu = $item.find('.sub');
		$subMenu.css({marginTop:-$subMenu.outerHeight(true)});
		//폴더 상태를 open 상태로 만들기
		this.setFolderState($item,'close');
	}
}

/* 이벤트 초기화 */
FolderAccordionMenu.prototype.initEvent = function(){//2.
	var objThis = this;
	this.$mainMenuItems.children('.main-title').click(function(e){//2-1.
		var $item = $(this).parent();
		objThis.toggleSubMenuPanel($item);//2-2.
	});
}

/* 서브 메뉴패널 열고 닫기 */
FolderAccordionMenu.prototype.toggleSubMenuPanel = function($item){//1.
	var extension = $item.attr('data-extension');//1-1.
	//서브가 없는 경우 취소
	if(extension == 'empty'){//1-2.
		return;
	}

	//서브메뉴패널이 있는경우만 실행
	if(extension == 'open'){//1-3.
		this.closeSubMenu($item);
	}else{
		this.openSubMenu($item);
	}
}
