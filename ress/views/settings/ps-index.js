Ext.ns("Ext.HY.PersonView");
var personView = Ext.HY.PersonView;

Ext.apply(personView,{
	ctx:ctx+'', pkname:'',codeName: '', title: '', iconCls: ''
});

Ext.onReady(function(){
	Ext.QuickTips.init();
	
	var viewport = new Ext.Viewport({
		layout: 'border',
		items:[
			personView.mainPanel
		]
	});
	viewport.doLayout();
});

personView.mainStroe = HY.Cmp.createJsonStore({
	fields: [],
	url: personView.ctx + '',
});

personView.mainPanel = new Ext.form.FormPanel({
	region:'center',
	layout:'absolute',
	bodyStyle: 'padding:5px',
	autoScroll: true,
	bodyCssClass: 'ne-form-panel',
	border:false,
	tbar: new HY.Cmp.Toolbar({
		tarObj: personView,
		editMode: 1,
		enableNav: true,
		statusConfig: ['Delete!00','New!00','Prevrow!00','Nextrow!00'],
	}),
	items:[
		{xtype: 'label', html: '用户代码', width: 80, x: 15, y: 17},
		{xtype: 'textfield', name: '', width: 240, x: 70, y: 16, tabIndex: 101},
		{xtype: 'label', html: '用户名称', width: 80, x: 15, y: 60},
		{xtype: 'textfield', name: '', width: 240, x: 70, y: 59, tabIndex: 101},
		{xtype: 'label', html: '邮箱', width: 80, x: 15, y: 103},
		{xtype: 'textfield', name: '', width: 240, x: 70, y: 102, tabIndex: 101},
		{xtype: 'label', html: '手机', width: 80, x: 15, y: 146},
		{xtype: 'textfield', name: '', width: 240, x: 70, y: 145, tabIndex: 101},
		{xtype: 'label', html: '电话（1）', width: 80, x: 15, y: 189},
		{xtype: 'textfield', name: '', width: 240, x: 70, y: 188, tabIndex: 101},
		{xtype: 'label', html: '电话（2）', width: 80, x: 15, y: 232},
		{xtype: 'textfield', name: '', width: 240, x: 70, y: 231, tabIndex: 101},
		{xtype: 'label', html: '家庭电话', width: 80, x: 15, y: 275},
		{xtype: 'textfield', name: '', width: 240, x: 70, y: 274, tabIndex: 101},
	]
});


//----------------- 功能函数

personView.doSave = function(){
	var me = this;
	var frm = me.mainPanel.getForm();
	if (!frm.isValid()) {
		return;
	}
	HY.confirm({
		callback:function(){
			var params = frm.getValues();
			HY.AjaxRequest({
				params: params,
				showWat: true,
				url: me.ctx + '',
				callback: function(datobj) {
					me.doRefresh();
				}
			});
		}
	});
};

personView.doRefresh = function(){
	var me = this;
	var frm = me.mainPanel.getForm();
	var params = {};
	Ext.apply (params, frm.getValues());
};

personView.doLoadDetail = function(){
	var me = this;
	var frm = me.mainPanel.getForm();
	
	var url = personView.ctx + '' + '.do';
	
	HY.AjaxRequest({url:url, callback:function(datobj){
		HY.Cmp.clearFormData(frm);
		HY.Cmp.parseDateCols(datobj);
		frm.setValues(datobj);
	}});
};

personView.doClose = function(){
	
}
