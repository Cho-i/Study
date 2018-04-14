/*
	1. ���� ���� �ڵ� ������ �κп� ���� �޴��г��� ����ݴ� ����� ������ toggleSubMenuPanel()�޼��带 �űԷ� �߰�.
	1-1. �Ű�����($item)���� �Ѿ�� ���� �޴������ۿ��� data-extension �Ӽ����� ����.
	1-2. �Ӽ����� 'empty'�̸� ���� �޴��г��� ���� ���� �ǹ��ϱ� ������ return ������ �̿��� �۾��� ����.
	1-3. ���� �޴��г��� ���� �ִ� ���¸� ���� ���·� ����� ���� ���¸� ���� ���·� ����� �ڵ带 �ۼ�(��۱��).
	2. �̺�Ʈ ������ ����� �������� ó���� initEvent()�޼��带 �űԷ� �߰�.
	2-1. ���� �޴�������($mainMenuItems)�� ���� Ÿ��Ʋ(.main-title)�� click �̺�Ʈ �����ʸ� �߰�.
	2-2. Ŭ�� �̺�Ʈ�� �߻��ϸ� �տ��� �ۼ��� toggleSubMenuPanel() �޼��带 ȣ���� ���� �޴��г��� ��۽��� ��.
	3. �̺�Ʈ�� ������ �� �ְ� �����ڿ��� initEvent() �޼��带 ȣ��.

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

/* ���� �޴��г� ���� */
FolderAccordionMenu.prototype.openSubMenu = function($item){
	if($item != null){
		$item.attr('data-extension','open');
		var $subMenu = $item.find('.sub');
		$subMenu.css({marginTop:0});
		//���� ���¸� open ���·� �����
		this.setFolderState($item,'open');
	}
}

/* ���� �޴��г� �ݱ� */
FolderAccordionMenu.prototype.closeSubMenu = function($item){
	if($item != null){
		$item.attr('data-extension','close');
		var $subMenu = $item.find('.sub');
		$subMenu.css({marginTop:-$subMenu.outerHeight(true)});
		//���� ���¸� open ���·� �����
		this.setFolderState($item,'close');
	}
}

/* �̺�Ʈ �ʱ�ȭ */
FolderAccordionMenu.prototype.initEvent = function(){//2.
	var objThis = this;
	this.$mainMenuItems.children('.main-title').click(function(e){//2-1.
		var $item = $(this).parent();
		objThis.toggleSubMenuPanel($item);//2-2.
	});
}

/* ���� �޴��г� ���� �ݱ� */
FolderAccordionMenu.prototype.toggleSubMenuPanel = function($item){//1.
	var extension = $item.attr('data-extension');//1-1.
	//���갡 ���� ��� ���
	if(extension == 'empty'){//1-2.
		return;
	}

	//����޴��г��� �ִ°�츸 ����
	if(extension == 'open'){//1-3.
		this.closeSubMenu($item);
	}else{
		this.openSubMenu($item);
	}
}
