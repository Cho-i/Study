/*
	1. 
*/

$(document).ready(function(){
	//�������ڵ�� �޴� �÷����� ����
	$('#accordionMenu1').folderAccordionMenu();//2.

	//�̺�Ʈ ���
	$('#accordionMenu1').on('open',function(e){
		console.log('open',e.$target.find('.main-title a').text());
	});
	$('#accordionMenu1').on('close',function(e){
		console.log('close',e.$target.find('.main-title a').text());
	});
	$('#accordionMenu1').on('select',function(e){
		var oldText = '����';
		if(e.$oldItem) oldText = e.$oldItem.text();
		console.log('select old =',oldText+",new ="+e.$newItem.text());
	});
});
(function($){
	//folderAccordionMenu �÷�����
	$.fn.folderAccordionMenu = function(){//1.
		//�����ڿ� �ش��ϴ� ��� ������ŭ FolderAccordionMenu ��ü ����.
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
	// ���� ���� �޴�������
	this._$selectSubItem = null;

	this._init(selector);
	this._initSubMenuPanel();
	this._initEvent();
}

/* ����ʱ�ȭ */
FolderAccordionMenu.prototype._init = function(selector){
	this.$accordionMenu = $(selector);
	this._$mainMenuItems = this.$accordionMenu.children('li');
}

/* �̺�Ʈ �ʱ�ȭ */
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

/* ���� �г� �ʱ�ȭ - �ʱ� ���� �� ���� ���·� ����� */
FolderAccordionMenu.prototype._initSubMenuPanel = function(){
	var objThis = this;
	this._$mainMenuItems.each(function(index){
		var $item = $(this);
		var $subMenu = $item.find('.sub');
		//���갡 ���� ���
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

/* ���� ���� ���� */
FolderAccordionMenu.prototype._setFolderState = function($item,state){
	var $folder = $item.find('.main-title .folder');
	$folder.removeClass();
	$folder.addClass('folder '+state);
}

/* ���� �޴��г� ���� animation �⺻�� true */
FolderAccordionMenu.prototype.openSubMenu = function($item, animation){
	if($item != null){
		$item.attr('data-extension','open');
		var $subMenu = $item.find('.sub');

		if(animation == false){
			$subMenu.css({marginTop:0});
		}else{
			$subMenu.stop().animate({marginTop:0},300,'easeInCubic');
		}

		//���� ���¸� open ���·� �����
		this._setFolderState($item,'open');
		//open �̺�Ʈ �߻�
		this._dispatchOpenCloseEvent($item,'open');
	}
}

/* ���� �޴��г� �ݱ� animation �⺻���� true */
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

		//���� ���¸� open ���·� �����
		this._setFolderState($item,'close');
		//close �̺�Ʈ �߻�
		this._dispatchOpenCloseEvent($item,'close');
	}
}

/* ���� �޴��г� ���� �ݱ� */
FolderAccordionMenu.prototype.toggleSubMenuPanel = function($item){
	var extension = $item.attr('data-extension');
	//���갡 ���� ��� ���
	if(extension == 'empty'){
		return;
	}

	//����޴��г��� �ִ°�츸 ����
	if(extension == 'open'){
		this.closeSubMenu($item);
	}else{
		this.openSubMenu($item);
	}
}

/* index �޴��� ���� �޴��г� ���� */
FolderAccordionMenu.prototype.openSubMenuAt = function(index, animation){
	var $item = this._$mainMenuItems.eq(index);
	this.openSubMenu($item, animation);
}

/* index �޴��� ���� �޴��г� �ݱ� */
FolderAccordionMenu.prototype.closeSubMenuAt = function(index, animation){
	var $item = this._$mainMenuItems.eq(index);
	this.closeSubMenu($item, animation);
}

/* ���� �޴������� ���� */
FolderAccordionMenu.prototype._selectSubMenuItem = function($item){
	var $oldItem = this._$selectSubItem;

	if(this._$selectSubItem != null){
		this._$selectSubItem.removeClass('select');
	}
	this._$selectSubItem = $item;
	this._$selectSubItem.addClass('select');

	//���� �̺�Ʈ �߻�
	this._dispatchSelectEvent($oldItem,this._$selectSubItem);
}

/*
* �޴� ���� ���
* @mainIndex:���� �޴������� index
* @subIndex:���� �޴������� index
* @animation:�ִϸ��̼� ���� ����
*/
FolderAccordionMenu.prototype.selectMenu = function(mainIndex,subIndex,animation){
	//���� �޴�������
	var $item = this._$mainMenuItems.eq(mainIndex);
	//���� �޴�������
	var $subMenuItem = $item.find('.sub li').eq(subIndex);
	//���� �޴��������� �����ϴ� ��쿡�� ó��
	if($subMenuItem){
		//���� �޴��г� ����
		this.openSubMenu($item,animation);
		//���� �޴������� ����
		this._selectSubMenuItem($subMenuItem);
	}
}

//open, close �̺�Ʈ �߻�
FolderAccordionMenu.prototype._dispatchOpenCloseEvent = function($item,eventName){
	var event = jQuery.Event(eventName);
	event.$target = $item;
	this.$accordionMenu.trigger(event);
}

//select �̺�Ʈ �߻�
FolderAccordionMenu.prototype._dispatchSelectEvent = function($oldItem,$newItem){
	var event = jQuery.Event('select');
	event.$oldItem = $oldItem;
	event.$newItem = $newItem;
	this.$accordionMenu.trigger(event);
}
