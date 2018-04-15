/*
	1. 
*/

$(document).ready(function(){
	//폴더아코디언 메뉴 플러그인 실행
	$('#accordionMenu1').folderAccordionMenu();//2.

	//이벤트 등록
	$('#accordionMenu1').on('open',function(e){
		console.log('open',e.$target.find('.main-title a').text());
	});
	$('#accordionMenu1').on('close',function(e){
		console.log('close',e.$target.find('.main-title a').text());
	});
	$('#accordionMenu1').on('select',function(e){
		var oldText = '없음';
		if(e.$oldItem) oldText = e.$oldItem.text();
		console.log('select old =',oldText+",new ="+e.$newItem.text());
	});
});
(function($){
	//folderAccordionMenu 플러그인
	$.fn.folderAccordionMenu = function(){//1.
		//선택자에 해당하는 요소 개수만큼 FolderAccordionMenu 객체 생성.
		this.each(function(index){//1-1.
			var $this = $(this);
			var menu = new FolderAccordionMenu($this);
		});
		return this;//1-2.
	}
})(jQuery);

function FolderAccordionMenu(selector){
	this.$accordionMenu = null;
	this._$mainMenuItems = null;
	// 선택 서브 메뉴아이템
	this._$selectSubItem = null;

	this._init(selector);
	this._initSubMenuPanel();
	this._initEvent();
}

/* 요소초기화 */
FolderAccordionMenu.prototype._init = function(selector){
	this.$accordionMenu = $(selector);
	this._$mainMenuItems = this.$accordionMenu.children('li');
}

/* 이벤트 초기화 */
FolderAccordionMenu.prototype._initEvent = function(){
	var objThis = this;
	this._$mainMenuItems.children('.main-title').click(function(e){
		var $item = $(this).parent();
		objThis.toggleSubMenuPanel($item);
	});

	this._$mainMenuItems.find('.sub li').click(function(e){
		objThis._selectSubMenuItem($(this));
	});
}

/* 서브 패널 초기화 - 초기 시작 시 닫힌 상태로 만들기 */
FolderAccordionMenu.prototype._initSubMenuPanel = function(){
	var objThis = this;
	this._$mainMenuItems.each(function(index){
		var $item = $(this);
		var $subMenu = $item.find('.sub');
		//서브가 없는 경우
		if($subMenu.length==0){
			$item.attr('data-extension','empty');
			objThis._setFolderState($item,'empty');
		}else{
			if($item.attr('data-extension')=='open'){
				objThis.openSubMenu($item);
			}else{
				objThis.closeSubMenu($item);
			}
		}
	});
}

/* 폴더 상태 설정 */
FolderAccordionMenu.prototype._setFolderState = function($item,state){
	var $folder = $item.find('.main-title .folder');
	$folder.removeClass();
	$folder.addClass('folder '+state);
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
		this._setFolderState($item,'open');
		//open 이벤트 발생
		this._dispatchOpenCloseEvent($item,'open');
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
		this._setFolderState($item,'close');
		//close 이벤트 발생
		this._dispatchOpenCloseEvent($item,'close');
	}
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
	var $item = this._$mainMenuItems.eq(index);
	this.openSubMenu($item, animation);
}

/* index 메뉴의 서브 메뉴패널 닫기 */
FolderAccordionMenu.prototype.closeSubMenuAt = function(index, animation){
	var $item = this._$mainMenuItems.eq(index);
	this.closeSubMenu($item, animation);
}

/* 서브 메뉴아이템 선택 */
FolderAccordionMenu.prototype._selectSubMenuItem = function($item){
	var $oldItem = this._$selectSubItem;

	if(this._$selectSubItem != null){
		this._$selectSubItem.removeClass('select');
	}
	this._$selectSubItem = $item;
	this._$selectSubItem.addClass('select');

	//선택 이벤트 발생
	this._dispatchSelectEvent($oldItem,this._$selectSubItem);
}

/*
* 메뉴 선택 기능
* @mainIndex:메인 메뉴아이템 index
* @subIndex:서브 메뉴아이템 index
* @animation:애니메이션 실행 유무
*/
FolderAccordionMenu.prototype.selectMenu = function(mainIndex,subIndex,animation){
	//메인 메뉴아이템
	var $item = this._$mainMenuItems.eq(mainIndex);
	//서브 메뉴아이템
	var $subMenuItem = $item.find('.sub li').eq(subIndex);
	//서브 메뉴아이템이 존재하는 경우에만 처리
	if($subMenuItem){
		//서브 메뉴패널 열기
		this.openSubMenu($item,animation);
		//서브 메뉴아이템 선택
		this._selectSubMenuItem($subMenuItem);
	}
}

//open, close 이벤트 발생
FolderAccordionMenu.prototype._dispatchOpenCloseEvent = function($item,eventName){
	var event = jQuery.Event(eventName);
	event.$target = $item;
	this.$accordionMenu.trigger(event);
}

//select 이벤트 발생
FolderAccordionMenu.prototype._dispatchSelectEvent = function($oldItem,$newItem){
	var event = jQuery.Event('select');
	event.$oldItem = $oldItem;
	event.$newItem = $newItem;
	this.$accordionMenu.trigger(event);
}
