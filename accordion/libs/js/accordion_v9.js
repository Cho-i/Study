/*
	1. 코드 마지막 부분에 dispatchSelectEvent() 메서드를 신규로 추가. 메서드 내부에는 기존 선택 서브 메뉴 아이템($oldItem)과 신규 선택 서브 메뉴아이템($newItem) 정보를 담아 select라는 사용자 정의 이벤트를 발생하는 코드를 작성.
	2. 서브 메뉴아이템을 선택 처리하는 selectSubMenuItem() 메서드 마지막 부분에 신규로 추가해 줌. 메서드 내부에는 기존 선택 메뉴아이템 정보와 신규 선택 서브 메뉴아이템 정보를 매개변수 값으로 dispatchSelectEvent() 메서드를 호출해 select 이벤트를 발생.
	3. 테스트를 위해 select 이벤트 리스너를 추가해 이벤트에 담겨온 정보를 출력하는 코드를 작성.
*/

$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');

	accordion.$accordionMenu.on('open',function(e){
		console.log('open',e.$target.find('.main-title a').text());
	});
	accordion.$accordionMenu.on('close',function(e){
		console.log('close',e.$target.find('.main-title a').text());
	});
	accordion.$accordionMenu.on('select',function(e){//3.
		var oldText = '없음';
		if(e.$oldItem) oldText = e.$oldItem.text();
		console.log('select old =',oldText+",new ="+e.$newItem.text());
	});
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
		//open 이벤트 발생
		this.dispatchOpenCloseEvent($item,'open');
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
		//close 이벤트 발생
		this.dispatchOpenCloseEvent($item,'close');
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
	var $oldItem = this.$selectSubItem;
	
	if(this.$selectSubItem != null){
		this.$selectSubItem.removeClass('select');
	}
	this.$selectSubItem = $item;
	this.$selectSubItem.addClass('select');

	//선택 이벤트 발생
	this.dispatchSelectEvent($oldItem,this.$selectSubItem);//2.
}

/*
* 메뉴 선택 기능
* @mainIndex:메인 메뉴아이템 index
* @subIndex:서브 메뉴아이템 index
* @animation:애니메이션 실행 유무
*/
FolderAccordionMenu.prototype.selectMenu = function(mainIndex,subIndex,animation){
	//메인 메뉴아이템
	var $item = this.$mainMenuItems.eq(mainIndex);
	//서브 메뉴아이템
	var $subMenuItem = $item.find('.sub li').eq(subIndex);
	//서브 메뉴아이템이 존재하는 경우에만 처리
	if($subMenuItem){
		//서브 메뉴패널 열기
		this.openSubMenu($item,animation);
		//서브 메뉴아이템 선택
		this.selectSubMenuItem($subMenuItem);
	}
}

FolderAccordionMenu.prototype.dispatchOpenCloseEvent = function($item,eventName){
	var event = jQuery.Event(eventName);
	event.$target = $item;
	this.$accordionMenu.trigger(event);
}

//select 이벤트 발생
FolderAccordionMenu.prototype.dispatchSelectEvent = function($oldItem,$newItem){//1.
	var event = jQuery.Event('select');
	event.$oldItem = $oldItem;
	event.$newItem = $newItem;
	this.$accordionMenu.trigger(event);
}
