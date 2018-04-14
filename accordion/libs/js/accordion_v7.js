/*
	1. 코드 마지막 부분에 selectMenu() 메서드를 신규로 추가.
	1-1. mainIndex 매개변수 값에 해당하는 인덱스 값에 해당하는 서브 메뉴패널을 구함.
	1-2. subIndex 매개변수 값에 해당하는 서브 메뉴아이템을 구함. 선택하는 기능을 구현.
	1-3. openSubMenu() 메서드를 활용해 1-1에서 구한 서브 메뉴패널을 열어줌.
	1-4. selectSubMenuItem() 메서드를 활용해 1-2에서 구한 서브 메뉴아이템을 선택.
	2. 신규로 추가한 selectMenu() 메서드가 정상적으로 동작하는지 확인하기 위한 코드를 추가.
*/

$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');

	//accordion.openSubMenuAt(0,true);
	//accordion.closeSubMenuAt(1,true);
	accordion.selectMenu(1,1,true);//2.
});

function FolderAccordionMenu(selector){
	this.$accordionMenu = null;
	this.$mainMenuItems = null;
	// 선택 서브 메뉴아이템
	this.$selectSubItem = null;

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

	this.$mainMenuItems.find('.sub li').click(function(e){
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
FolderAccordionMenu.prototype.selectSubMenuItem = function($item){
	if(this.$selectSubItem != null){
		this.$selectSubItem.removeClass('select');
	}
	this.$selectSubItem = $item;
	this.$selectSubItem.addClass('select');
}

/*
* 메뉴 선택 기능
* @mainIndex:메인 메뉴아이템 index
* @subIndex:서브 메뉴아이템 index
* @animation:애니메이션 실행 유무
*/
FolderAccordionMenu.prototype.selectMenu = function(mainIndex,subIndex,animation){//1.
	//메인 메뉴아이템
	var $item = this.$mainMenuItems.eq(mainIndex);//1-1.
	//서브 메뉴아이템
	var $subMenuItem = $item.find('.sub li').eq(subIndex);//1-2.
	//서브 메뉴아이템이 존재하는 경우에만 처리
	if($subMenuItem){
		//서브 메뉴패널 열기
		this.openSubMenu($item,animation);//1-3.
		//서브 메뉴아이템 선택
		this.selectSubMenuItem($subMenuItem);//1-4.
	}
}
