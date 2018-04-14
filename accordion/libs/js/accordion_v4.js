/*
	1. ���� openSubMenu() �޼��忡 �ִϸ��̼� ������ ������ �� �ִ� �Ű�����(animation)�� �߰�.
	1-1. animation ���� false �� ��� css() �޼��带 Ȱ���� �ִϸ��̼� ���� ���� �޴��г��� ���� �� �ְ� ��ġ�� ����.
	1-2. animation ���� true�̰ų� ���� ���� ��� animate() �޼��带 Ȱ���� ���� �޴��г��� �ε巴�� ���� �� �ְ� �ִϸ��̼��� �߰�.
	2. openSubMenu()�� �����ϰ� closeSubMenu() �޼��忡�� �ִϸ��̼� ������ ������ �� �ִ� �Ű�����(animation) �߰�.
	2-1. animation ���� false�� ��� css() �޼��带 Ȱ���� �ִϸ��̼� ���� ���� �޴��г��� �������̰� ��ġ�� ����.
	2-2. animation ���� true�̰ų� ���� ���� ��� animate() �޼��带 Ȱ���� ���� �޴��г��� �ε巴�� ���� �� �ְ� �ִϸ��̼��� �߰�.
	3. �ʱ� ���� �� ���� �޴��г��� ��� ���� �ְų� ���� ���·� ���� �� �ְ� openSubMenu() �޼���� closeSubMenu() �޼��� ȣ�� �� animation �Ķ���͸� false ������ ȣ��.

*/
$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');
});

function FolderAccordionMenu(selector){
	this.$accordionMenu = null;
	this.$mainMenuItems = null;

	this.init(selector);
	this.initSubMenuPanel();
	this.initEvent();//3.
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
FolderAccordionMenu.prototype.openSubMenu = function($item, animation){//1.
	if($item != null){
		$item.attr('data-extension','open');
		var $subMenu = $item.find('.sub');

		if(animation == false){//1-1.
			$subMenu.css({marginTop:0});
		}else{
			$subMenu.stop().animate({marginTop:0},300,'easeInCubic');//1-2.
		}

		//���� ���¸� open ���·� �����
		this.setFolderState($item,'open');
	}
}

/* ���� �޴��г� �ݱ� animation �⺻���� true */
FolderAccordionMenu.prototype.closeSubMenu = function($item, animation){//2.
	if($item != null){
		$item.attr('data-extension','close');
		var $subMenu = $item.find('.sub');

		var subMenuPanelHeight = -$subMenu.outerHeight(true);
		if(animation == false){//2-1.
			$subMenu.css({marginTop:subMenuPanelHeight});
		}else{//2-2.
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
