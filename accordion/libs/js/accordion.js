/*
	1. ���� �������ڵ�� ����� ���� FolderAccordionMenu Ŭ������ ����.
	1-1. �������ڵ�� ����(#accordionMenu1)�� ���� ������Ƽ�� ����� �ݴϴ�.
	1-2. �������ڵ�� ���� �޴��������� ���� ������Ƽ�� ����� �ݴϴ�.
	2. Ŭ���� �������� ����� DOM ��Ҹ� ã�� ������ �� init() �޼��带 ���� �� �������ڵ�� ���ΰ� �������ڵ�� ���� �޴��������� ã�� ������Ƽ�� �����.
	3. ���� �޴��г��� ����(open, close, empty)�� ������ ǥ���� ���� �޼����� setFolderState()�� ����� ����� ��������.
	4. ���� �޴��г��� �ʱ�ȭ�ϴ� initSubMenuPanel() �޼��带 ���� �� ���� �޴� ������ �±�(ul.accordion-menu > li)�� data-extension �Ӽ��� �Էµ� �ִ� ���� �޴� ���� ���� ���� �� 
	�� ���� �Ű����� ������ �ؼ� setFolderState() �޼��带 ȣ���ϴ� ������ �ۼ�.
	5. �����ڿ��� init()�� initSubMenuPanel()�޼��带 ȣ��.
	6. ���������� �������ڵ�� �޴� �ν��Ͻ��� ������ ��.
*/
$(document).ready(function(){
	var accordion = new FolderAccordionMenu('.accordion-menu');
});
function FolderAccordionMenu(selector){//1.
	this.$accordionMenu = null;//1-1.
	this.$mainMenuItems = null;//1-2.

	this.init(selector);//5.
	this.initSubMenuPanel();
}
/* ����ʱ�ȭ */
FolderAccordionMenu.prototype.init = function(selector){//2.
	this.$accordionMenu = $(selector);
	this.$mainMenuItems = this.$accordionMenu.children('li');
}
/* ���� ���� ���� */
FolderAccordionMenu.prototype.setFolderState = function($item,state){//3.
	var $folder = $item.find('.main-title .folder');
	$folder.removeClass();
	$folder.addClass('folder '+state);
}
/* ���� �г� �ʱ�ȭ - �ʱ� ���� �� ���� ���·� ����� */
FolderAccordionMenu.prototype.initSubMenuPanel = function(){//4.
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
				objThis.setFolderState($item,'open');
			}else{
				$item.attr('data-extension','close');
				objThis.setFolderState($item,'close');
			}
		}
	});
}
