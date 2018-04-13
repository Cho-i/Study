/*
	1. 특정 메인 메뉴의 서브 메뉴패널을 열기 상태로 만드는 openSubMenu()메서드를 추가.
	1-1. 서브 메뉴패널을 열기 상태로 만들기 위해 먼저 메인 메뉴아이템($item)의 data-extension 속성값을 open 상태로.
	1-2. 서브 메뉴패널의 margin-top 스타일 속성값을 0으로 만들어 화면에서 보이게.
	1-3. 마지막으로 setFolderState() 메서드를 호출해 폴더 상태를 열기 상태로.
	2. 특정 메인 메뉴의 서브 메뉴패널을 닫기 상태로 만드는 closeSubMenu() 메서드를 추가.
	2-1. openSubMenu()와 동일한 방식으로 메인 메뉴아이템의 data-extension 속성값을 open 상태로.
	2-2. 서브 메뉴패널의 margin-top 속성에 서브 메뉴패널의 마진까지 포함한 높이 값을 대입해 화면에서 사라지게.
	2-3. 마지막으로 setFolderState() 메서드를 호출해 폴더 상태를 닫기 상태로.
	3,4. 폴더 상태 변경 코드가 각각 openSubMenu()와 closeSubMenu() 메서드에 통합되어 있으므로 기존 코드 대신 openSubMenu()와 closeSubMenu() 메서드를 호출.
*/
$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');
});
function FolderAccordionMenu(selector){
	this.$accordionMenu = null;
	this.$mainMenuItems = null;

	this.init(selector);
	this.initSubMenuPanel();
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
				//objThis.setFolderState($item,'open');
				objThis.openSubMenu($item);//3.
			}else{
				//$item.attr('data-extension','close');
				//objThis.setFolderState($item,'close');
				objThis.closeSubMenu($item);//4.
			}
		}
	});
}

/* 서브 메뉴패널 열기 */
FolderAccordionMenu.prototype.openSubMenu = function($item){//1.
	if($item != null){
		$item.attr('data-extension','open');//1-1.
		var $subMenu = $item.find('.sub');//1-2.
		$subMenu.css({marginTop:0});
		//폴더 상태를 open 상태로 만들기 1-3.
		this.setFolderState($item,'open');
	}
}

/* 서브 메뉴패널 닫기 */
FolderAccordionMenu.prototype.closeSubMenu = function($item){//2.
	if($item != null){
		$item.attr('data-extension','close');//2-1.
		var $subMenu = $item.find('.sub');//2-2.
		$subMenu.css({marginTop:-$subMenu.outerHeight(true)});
		//폴더 상태를 open 상태로 만들기 2-3.
		this.setFolderState($item,'close');
	}
}