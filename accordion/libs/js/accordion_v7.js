/*
	1. �ڵ� ������ �κп� selectMenu() �޼��带 �űԷ� �߰�.
	1-1. mainIndex �Ű����� ���� �ش��ϴ� �ε��� ���� �ش��ϴ� ���� �޴��г��� ����.
	1-2. subIndex �Ű����� ���� �ش��ϴ� ���� �޴��������� ����. �����ϴ� ����� ����.
	1-3. openSubMenu() �޼��带 Ȱ���� 1-1���� ���� ���� �޴��г��� ������.
	1-4. selectSubMenuItem() �޼��带 Ȱ���� 1-2���� ���� ���� �޴��������� ����.
	2. �űԷ� �߰��� selectMenu() �޼��尡 ���������� �����ϴ��� Ȯ���ϱ� ���� �ڵ带 �߰�.
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
FolderAccordionMenu.prototype.selectMenu = function(mainIndex,subIndex,animation){//1.
	//���� �޴�������
	var $item = this.$mainMenuItems.eq(mainIndex);//1-1.
	//���� �޴�������
	var $subMenuItem = $item.find('.sub li').eq(subIndex);//1-2.
	//���� �޴��������� �����ϴ� ��쿡�� ó��
	if($subMenuItem){
		//���� �޴��г� ����
		this.openSubMenu($item,animation);//1-3.
		//���� �޴������� ����
		this.selectSubMenuItem($subMenuItem);//1-4.
	}
}
