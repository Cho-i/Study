/*
	1. 먼저 선택 서브 메뉴아이템을 담을 $selectSubItem 변수를 만듦.
	2. 코드 마지막 부분에 selectSubMenuItem() 메서드를 신규로 추가한 후 서브 메뉴아이템 선택 처리 코드를 작성.
	3. 마지막으로 서브 메뉴아이템에 클릭 이벤트 리스너를 추가한 후 클릭한 서브 메뉴아이템이 선택될 수 있게 selectSubMenuItem()을 호출.

*/
$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');

	accordion.openSubMenuAt(0,true);
	accordion.closeSubMenuAt(1,true);
});

function FolderAccordionMenu(selector){
	this.$accordionMenu = null;
	this.$mainMenuItems = null;
	// 선택 서브 메뉴아이템
	this.$selectSubItem = null;//1.

	this.init(selector);
	this.initSubMenuPanel();
	this.initEvent();
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
FolderAccordionMenu.prototype.openSubMenu = function($item, animation){
	if($item != null){
		$item.attr('data-extension','open');
		var $subMenu = $item.find('.sub');

		if(animation == false){
			$subMenu.css({marginTop:0});
		}else{
			$subMenu.stop().animate({marginTop:0},300,'easeInCubic');
		}

		//폴더 상태를 open 상태로 만들기
		this.setFolderState($item,'open');
	}
}

/* 서브 메뉴패널 닫기 animation 기본값은 true */
FolderAccordionMenu.prototype.closeSubMenu = function($item, animation){
	if($item != null){
		$item.attr('data-extension','close');
		var $subMenu = $item.find('.sub');

		var subMenuPanelHeight = -$subMenu.outerHeight(true);
		if(animation == false){
			$subMenu.css({marginTop:subMenuPanelHeight});
		}else{
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

	this.$mainMenuItems.find('.sub li').click(function(e){//3.
		objThis.selectSubMenuItem($(this));
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

/* index 메뉴의 서브 메뉴패널 열기 */
FolderAccordionMenu.prototype.openSubMenuAt = function(index, animation){
	var $item = this.$mainMenuItems.eq(index);
	this.openSubMenu($item, animation);
}

/* index 메뉴의 서브 메뉴패널 닫기 */
FolderAccordionMenu.prototype.closeSubMenuAt = function(index, animation){
	var $item = this.$mainMenuItems.eq(index);
	this.closeSubMenu($item, animation);
}

/* 서브 메뉴아이템 선택 */
FolderAccordionMenu.prototype.selectSubMenuItem = function($item){//2.
	if(this.$selectSubItem != null){
		this.$selectSubItem.removeClass('select');
	}
	this.$selectSubItem = $item;
	this.$selectSubItem.addClass('select');
}
