/*
	1. �ڵ� ������ �κп� dispatchSelectEvent() �޼��带 �űԷ� �߰�. �޼��� ���ο��� ���� ���� ���� �޴� ������($oldItem)�� �ű� ���� ���� �޴�������($newItem) ������ ��� select��� ����� ���� �̺�Ʈ�� �߻��ϴ� �ڵ带 �ۼ�.
	2. ���� �޴��������� ���� ó���ϴ� selectSubMenuItem() �޼��� ������ �κп� �űԷ� �߰��� ��. �޼��� ���ο��� ���� ���� �޴������� ������ �ű� ���� ���� �޴������� ������ �Ű����� ������ dispatchSelectEvent() �޼��带 ȣ���� select �̺�Ʈ�� �߻�.
	3. �׽�Ʈ�� ���� select �̺�Ʈ �����ʸ� �߰��� �̺�Ʈ�� ��ܿ� ������ ����ϴ� �ڵ带 �ۼ�.
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
		var oldText = '����';
		if(e.$oldItem) oldText = e.$oldItem.text();
		console.log('select old =',oldText+",new ="+e.$newItem.text());
	});
});

function FolderAccordionMenu(selector){
	this.$accordionMenu = null;
	this.$mainMenuItems = null;
	// ���� ���� �޴�������
	this.$selectSubItem = null;

	this.init(selector);
	this.initSubMenuPanel();
	this.initEvent();
}

/* ����ʱ�ȭ */
FolderAccordionMenu.prototype.init = function(selector){
	this.$accordionMenu = $(selector);
	this.$mainMenuItems = this.$accordionMenu.children('li');
}

/* ���� ���� ���� */
FolderAccordionMenu.prototype.setFolderState = function($item,state){
	var $folder = $item.find('.main-title .folder');
	$folder.removeClass();
	$folder.addClass('folder '+state);
}

/* ���� �г� �ʱ�ȭ - �ʱ� ���� �� ���� ���·� ����� */
FolderAccordionMenu.prototype.initSubMenuPanel = function(){
	var objThis = this;
	this.$mainMenuItems.each(function(index){
		var $item = $(this);
		var $subMenu = $item.find('.sub');
		//���갡 ���� ���
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
		this.setFolderState($item,'open');
		//open �̺�Ʈ �߻�
		this.dispatchOpenCloseEvent($item,'open');
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
		this.setFolderState($item,'close');
		//close �̺�Ʈ �߻�
		this.dispatchOpenCloseEvent($item,'close');
	}
}

/* �̺�Ʈ �ʱ�ȭ */
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
	var $item = this.$mainMenuItems.eq(index);
	this.openSubMenu($item, animation);
}

/* index �޴��� ���� �޴��г� �ݱ� */
FolderAccordionMenu.prototype.closeSubMenuAt = function(index, animation){
	var $item = this.$mainMenuItems.eq(index);
	this.closeSubMenu($item, animation);
}

/* ���� �޴������� ���� */
FolderAccordionMenu.prototype.selectSubMenuItem = function($item){
	var $oldItem = this.$selectSubItem;
	
	if(this.$selectSubItem != null){
		this.$selectSubItem.removeClass('select');
	}
	this.$selectSubItem = $item;
	this.$selectSubItem.addClass('select');

	//���� �̺�Ʈ �߻�
	this.dispatchSelectEvent($oldItem,this.$selectSubItem);//2.
}

/*
* �޴� ���� ���
* @mainIndex:���� �޴������� index
* @subIndex:���� �޴������� index
* @animation:�ִϸ��̼� ���� ����
*/
FolderAccordionMenu.prototype.selectMenu = function(mainIndex,subIndex,animation){
	//���� �޴�������
	var $item = this.$mainMenuItems.eq(mainIndex);
	//���� �޴�������
	var $subMenuItem = $item.find('.sub li').eq(subIndex);
	//���� �޴��������� �����ϴ� ��쿡�� ó��
	if($subMenuItem){
		//���� �޴��г� ����
		this.openSubMenu($item,animation);
		//���� �޴������� ����
		this.selectSubMenuItem($subMenuItem);
	}
}

FolderAccordionMenu.prototype.dispatchOpenCloseEvent = function($item,eventName){
	var event = jQuery.Event(eventName);
	event.$target = $item;
	this.$accordionMenu.trigger(event);
}

//select �̺�Ʈ �߻�
FolderAccordionMenu.prototype.dispatchSelectEvent = function($oldItem,$newItem){//1.
	var event = jQuery.Event('select');
	event.$oldItem = $oldItem;
	event.$newItem = $newItem;
	this.$accordionMenu.trigger(event);
}
