/*
	1. ���� �ڵ� ������ �κп� ���� �޴��г��� ������(open) ������(close) �̺�Ʈ�� �������� �߻��ϴ� dispatchOpenCloseEvent() �޼��带 �űԷ� �߰�. $item �Ű��������� ������ ������ ���� �޴��г��� ��� ���� �޴��������� ���� �Ǹ�, eventName �Ű��������� �߻��� �̺�Ʈ ��ü�� ����.
	1-1. jQuery�� Event() �޼��带 ����� �̺�Ʈ �߻� ����� ��� �̺�Ʈ ��ü�� ����. �̶� �̺�Ʈ ��ü�� ����� �߻��� �̺�Ʈ �̸��� �����ڿ� �Ѱ���.
	1-2. �̺�Ʈ�� ��� ���� �����͸� �̺�Ʈ ��ü�� �־���. ���⿡���� ������ ������ ���� �޴��г��� ������ �ִ� ���� �޴��������� ��ü�� �־���.
	1-3. ���������� trigger() �޼��带 ȣ���� �̺�Ʈ�� �߻�.
	2. ���� �޴��г� ���⸦ ó���ϴ� �޼����� ������ �κп� ���� ���� �޴������۰� 'open'�� �Ű����� ������ �տ��� ���� dispatchOpenCloseEvent() �̺�Ʈ �߻� �޼��带 ȣ��.
	3. ���� �޴��г� �ݱ⸦ ó���ϴ� �޼����� ������ �κп� ���� ���� �޴������۰� 'close'�� �Ű����� ������ �տ��� ���� dispatchOpenCloseEvent() �̺�Ʈ �߻� �޼��带 ȣ��.
	4,5. �̺�Ʈ�� ���������� �߻��ϴ��� Ȯ���ϱ� ���� ready()�� �̺�Ʈ �����ʸ� �߰��� ������ ����ϴ� �ڵ带 �ۼ�.
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
		this.dispatchOpenCloseEvent($item,'open');//2.
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
		this.dispatchOpenCloseEvent($item,'close');//3.
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
	if(this.$selectSubItem != null){
		this.$selectSubItem.removeClass('select');
	}
	this.$selectSubItem = $item;
	this.$selectSubItem.addClass('select');
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

FolderAccordionMenu.prototype.dispatchOpenCloseEvent = function($item,eventName){//1.
	var event = jQuery.Event(eventName);//1-1.
	event.$target = $item;//1-2.
	this.$accordionMenu.trigger(event);//1-3.
}
