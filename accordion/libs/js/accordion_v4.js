/*
	1. 먼저 openSubMenu() 메서드에 애니메이션 유무를 설정할 수 있는 매개변수(animation)을 추가.
	1-1. animation 값이 false 인 경우 css() 메서드를 활용해 애니메이션 없이 서브 메뉴패널이 열릴 수 있게 위치를 설정.
	1-2. animation 값이 true이거나 값이 없는 경우 animate() 메서드를 활용해 서브 메뉴패널이 부드럽게 열릴 수 있게 애니메이션을 추가.
	2. openSubMenu()와 동일하게 closeSubMenu() 메서드에도 애니메이션 유무를 설정할 수 있는 매개변수(animation) 추가.
	2-1. animation 값이 false인 경우 css() 메서드를 활용해 애니메이션 없이 서브 메뉴패널이 닫혀보이게 위치를 설정.
	2-2. animation 값이 true이거나 값이 없는 경우 animate() 메서드를 활용해 서브 메뉴패널이 부드럽게 닫힐 수 있게 애니메이션을 추가.
	3. 초기 실행 시 서브 메뉴패널이 즉시 열려 있거나 닫힌 상태로 나올 수 있게 openSubMenu() 메서드와 closeSubMenu() 메서드 호출 시 animation 파라미터를 false 값으로 호출.

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

/* 서브 메뉴패널 열기 animation 기본은 true */
FolderAccordionMenu.prototype.openSubMenu = function($item, animation){//1.
	if($item != null){
		$item.attr('data-extension','open');
		var $subMenu = $item.find('.sub');

		if(animation == false){//1-1.
			$subMenu.css({marginTop:0});
		}else{
			$subMenu.stop().animate({marginTop:0},300,'easeInCubic');//1-2.
		}

		//폴더 상태를 open 상태로 만들기
		this.setFolderState($item,'open');
	}
}

/* 서브 메뉴패널 닫기 animation 기본값은 true */
FolderAccordionMenu.prototype.closeSubMenu = function($item, animation){//2.
	if($item != null){
		$item.attr('data-extension','close');
		var $subMenu = $item.find('.sub');

		var subMenuPanelHeight = -$subMenu.outerHeight(true);
		if(animation == false){//2-1.
			$subMenu.css({marginTop:subMenuPanelHeight});
		}else{//2-2.
			$subMenu.stop().animate({marginTop:subMenuPanelHeight},300,'easeInCubic');
		}

		//폴더 상태를 open 상태로 만들기
		this.setFolderState($item,'close');
	}
}

/* 이벤트 초기화 */
FolderAccordionMenu.prototype.initEvent = function(){
	var objThis = this;
	this.$mainMenuItems.children('.main-title').click(function(e){
		var $item = $(this).parent();
		objThis.toggleSubMenuPanel($item);
	});
}

/* 서브 메뉴패널 열고 닫기 */
FolderAccordionMenu.prototype.toggleSubMenuPanel = function($item){
	var extension = $item.attr('data-extension');
	//서브가 없는 경우 취소
	if(extension == 'empty'){
		return;
	}

	//서브메뉴패널이 있는경우만 실행
	if(extension == 'open'){
		this.closeSubMenu($item);
	}else{
		this.openSubMenu($item);
	}
}
