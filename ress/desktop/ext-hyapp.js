// required: Ext.app.Module
Ext.ns("HY.App");

/**
 * 查询面板，扩展了一些事件监听，操作菜单等
 */
HY.App.QueryPanel = Ext.extend(Ext.FormPanel, {
	region: 'north',
	height: 64,
	border: false,
	frame: false,
	initComponent: function() {
		var me = this;
		me.keys = [
			{
				key: [10, 13],
				fn: function() {
					if (!me.getForm().isValid()) return;
					me.doQuery();
				}
			}
		];
		HY.App.QueryPanel.superclass.initComponent.call(me);
	},
	doQuery: function() {
		HY.alert('do nothing');
	}
});

HY.App.GridWindow = Ext.extend(Ext.app.Module, {
	id: "grid-win",
	init: function(){
		this.launcher = {
			text: 'Grid Window',
			iconCls: 'icon-grid',
			handler: this.createWindow,
			scope: this
		};
	},
	
	createWindow: function(configs){
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow(configs.windowId);
		if(!win){
			win = desktop.createWindow({
				id: configs.windowId,
				title: configs.title||'Grid Window',
				width: 740,
				height: 480,
				iconCls: configs.iconCls||'icon-grid',
				shim: false,
				animCollapse: false,
				constrainHeader: true,
				layout: 'fit',
				
				items: [
					new Ext.FormPanel({
						region: 'north',
						height: 64,
						border: false,
						frame: false,
					}),
					new Ext.grid.GridPanel({
						border: false,
						ds: new Ext.data.Store({
							reader: new Ext.data.ArrayReader({}, [
								{name: 'company'},
								{name: 'price', type: 'float'},
								{name: 'change', type: 'float'},
								{name: 'pctChange', type: 'float'}
							]),
							data: Ext.grid.dummyData
						}),
						cm: new Ext.grid.ColumnModel([
							new Ext.grid.RowNumberer(),
							{header: 'Company', width: 120, sortable: true, dataIndex: 'company'},
							{header: 'Price', width: 70, sortable: true, dataIndex: 'price', renderer: Ext.util.Format.usMoney},
							{header: 'Change', width: 70, sortable: true, dataIndex: 'change'},
							{header: '% Change', width: 70, sortable: true, dataIndex: 'pctChange'}
						]),
						
						viewConfig: {
							forceFit: true
						},
						
						tbar: [{
							text: '添加',
							tooltip: '新增一条记录',
							iconCls: 'add'
						}, '-', {
							text: '操作',
							tooltip: '操作一条记录',
							iconCls: 'option'
						}, '-', {
							text: '删除',
							tooltip: '删除一条记录',
							iconCls: 'remove'
						}]
					})
				]
			});
		}
		win.show();
	}
});