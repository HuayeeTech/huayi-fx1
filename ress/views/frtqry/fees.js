var showFeesWindow = function(datpkid, configs) {
	if (!(HY.isNumber(datpkid) && datpkid > 1000)) {
		HY.alert('参数不是有效值');
		return;
	}
	var _cfgs = {
		title: '附加费浏览窗口',
		gridTbar: {},
		width: 960,
		gridStore: HY.Cmp.createJsonStore({
			fields: ['priceid', 'feeid', 'unit', 'feecode', 'feename_c', 'feename_e', 'cyid', 'feecount', 'amt_x', 'remarks', 'amt_oth','amt_0','amt_1','amt_2','amt_3','amt_4','amt_5','amt_6','amt_7','amt_8','amt_9','amt_10','amt_11'],
			url: ctx + '/frtqry/' + configs.uri + '.do?datfk=' + datpkid,
			sortInfo: {}
		}),
		gridColModel: new Ext.grid.ColumnModel({
			columns:feesCols,
			defaults: HY.Cmp.cmDefaults
		}),
	};
	Ext.apply(_cfgs, configs);
	var _evw = new HY.Cmp.WindowDataView(_cfgs);
	_evw.show();
	_evw.gridStore.load();
};