/*
	1. Ư�� ���� �޴��� ���� �޴��г��� ���� ���·� ����� openSubMenu()�޼��带 �߰�.
	1-1. ���� �޴��г��� ���� ���·� ����� ���� ���� ���� �޴�������($item)�� data-extension �Ӽ����� open ���·�.
	1-2. ���� �޴��г��� margin-top ��Ÿ�� �Ӽ����� 0���� ����� ȭ�鿡�� ���̰�.
	1-3. ���������� setFolderState() �޼��带 ȣ���� ���� ���¸� ���� ���·�.
	2. Ư�� ���� �޴��� ���� �޴��г��� �ݱ� ���·� ����� closeSubMenu() �޼��带 �߰�.
	2-1. openSubMenu()�� ������ ������� ���� �޴��������� data-extension �Ӽ����� open ���·�.
	2-2. ���� �޴��г��� margin-top �Ӽ��� ���� �޴��г��� �������� ������ ���� ���� ������ ȭ�鿡�� �������.
	2-3. ���������� setFolderState() �޼��带 ȣ���� ���� ���¸� �ݱ� ���·�.
	3,4. ���� ���� ���� �ڵ尡 ���� openSubMenu()�� closeSubMenu() �޼��忡 ���յǾ� �����Ƿ� ���� �ڵ� ��� openSubMenu()�� closeSubMenu() �޼��带 ȣ��.
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

/* ���� �޴��г� ���� */
FolderAccordionMenu.prototype.openSubMenu = function($item){//1.
	if($item != null){
		$item.attr('data-extension','open');//1-1.
		var $subMenu = $item.find('.sub');//1-2.
		$subMenu.css({marginTop:0});
		//���� ���¸� open ���·� ����� 1-3.
		this.setFolderState($item,'open');
	}
}

/* ���� �޴��г� �ݱ� */
FolderAccordionMenu.prototype.closeSubMenu = function($item){//2.
	if($item != null){
		$item.attr('data-extension','close');//2-1.
		var $subMenu = $item.find('.sub');//2-2.
		$subMenu.css({marginTop:-$subMenu.outerHeight(true)});
		//���� ���¸� open ���·� ����� 2-3.
		this.setFolderState($item,'close');
	}
}