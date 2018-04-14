/*
	1. 먼저 코드 마지막 부분에 서브 메뉴패널이 열리고(open) 닫히는(close) 이벤트를 전문으로 발생하는 dispatchOpenCloseEvent() 메서드를 신규로 추가. $item 매개변수에는 열리고 닫히는 서브 메뉴패널이 담긴 메인 메뉴아이템이 담기게 되며, eventName 매개변수에는 발생할 이벤트 객체를 생성.
	1-1. jQuery의 Event() 메서드를 사용해 이벤트 발생 기능이 담긴 이벤트 객체를 생성. 이때 이벤트 객체를 사용해 발생한 이벤트 이름을 생성자에 넘겨줌.
	1-2. 이벤트에 담아 보낼 데이터를 이벤트 객체에 넣어줌. 여기에서는 열리고 닫히는 서브 메뉴패널을 가지고 있는 메인 메뉴아이템을 객체에 넣어줌.
	1-3. 마지막으로 trigger() 메서드를 호출해 이벤트를 발생.
	2. 서브 메뉴패널 열기를 처리하는 메서드의 마지막 부분에 열린 서브 메뉴아이템과 'open'을 매개변수 값으로 앞에서 만든 dispatchOpenCloseEvent() 이벤트 발생 메서드를 호출.
	3. 서브 메뉴패널 닫기를 처리하는 메서드의 마지막 부분에 닫힌 서브 메뉴아이템과 'close'를 매개변수 값으로 앞에서 만든 dispatchOpenCloseEvent() 이벤트 발생 메서드를 호출.
	4,5. 이벤트가 정상적으로 발생하는지 확인하기 위해 ready()에 이벤트 리스너를 추가해 정보를 출력하는 코드를 작성.
*/

$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');

	//accordion.openSubMenuAt(0,true);
	//accordion.closeSubMenuAt(1,true);
	//accordion.selectMenu(1,1,true);

	accordion.$accordionMenu.on('open',function(e){//4.
		console.log('open',e.$target.find('.main-title a').text());
	});
	accordion.$accordionMenu.on('close',function(e){//5.
		console.log('close',e.$target.find('.main-title a').text());
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
		this.dispatchOpenCloseEvent($item,'open');//2.
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
		this.dispatchOpenCloseEvent($item,'close');//3.
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

FolderAccordionMenu.prototype.dispatchOpenCloseEvent = function($item,eventName){//1.
	var event = jQuery.Event(eventName);//1-1.
	event.$target = $item;//1-2.
	this.$accordionMenu.trigger(event);//1-3.
}
