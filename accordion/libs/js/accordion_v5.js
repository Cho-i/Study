/*
	1. openSubMenuAt() �޼��带 �űԷ� �߰��� �� index�� �ش��ϴ� ���� �޴��г��� ���� ���·� ����� �ڵ�.
	2. closeSubMenuAt() �޼��带 �űԷ� �߰��� �� index�� �ش��ϴ� ���� �޴��г��� ���� ���·� ����� �ڵ�.
	3. �űԷ� �߰��� openSubMenuAt() �޼���� closeSubMenuAt() �޼��尡 ���������� �����ϴ��� Ȯ�� �ϱ� ���� �ڵ�.

*/
$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');

	accordion.openSubMenuAt(0,true);//3/
	accordion.closeSubMenuAt(1,true);
});

function FolderAccordionMenu(selector){
	this.$accordionMenu = null;
	this.$mainMenuItems = null;

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
FolderAccordionMenu.prototype.openSubMenuAt = function(index, animation){//1.
	var $item = this.$mainMenuItems.eq(index);
	this.openSubMenu($item, animation);
}

/* index �޴��� ���� �޴��г� �ݱ� */
FolderAccordionMenu.prototype.closeSubMenuAt = function(index, animation){//2.
	var $item = this.$mainMenuItems.eq(index);
	this.closeSubMenu($item, animation);
}
