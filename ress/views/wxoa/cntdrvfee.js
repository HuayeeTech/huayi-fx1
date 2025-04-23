var feeDatas = null;
var lastJobid = '';
var imageList = app.get('img-list');
var imageView = app.get('img-view');
var isSearch = 0;
$(function(){
	$('#mcnts-ct').hide();
	app.get('srhbtn').addEventListener('click', function() {
		isSearch = 1;
		$('#mcnts-list').empty();
		$('#mcnts-ct').hide();
		doRefresh();
	});
	app.get('dtlbtnadd').addEventListener('click', function() {
		var jobid = getJobid();
		if (!HyUtils.isNumber(jobid) || jobid.length <= 0) {
			return;
		}
		xtip.open({
			type: 'noready',
			content: '#fedtwin',
			title: '费用编辑',
			app: true
		});
		setTimeout(function() {
			loadFeeItem();
		}, 200);
	});
	app.get('attbtnadd').addEventListener('click', function() {
		submitImg();
	});
	app.get('attrefresh').addEventListener('click', function() {
		showDocxView();
	});
	pageInit();
});

function pageInit() {
	initImgUpload();
}

function getJobid() {
	var jobid = "";
	var el = app.get('jobid');
	if (el) {
		jobid = el.value;
	}
	return jobid;
}

//刷新
function doRefresh(pkid) {
	var blnom = document.getElementById('srh_blnom').value;
	var cntno = document.getElementById('srh_cntno').value;
	if (HyUtils.isEmpty(blnom) && HyUtils.isEmpty(cntno) && HyUtils.isEmpty(pkid)) {
		return;
	}
	var data = {"cntno": cntno, "blnom": blnom};
	if (HyUtils.isNumber(pkid)) {
		data = {"cntpkid": pkid};
	}
	HyUtils.post("/wxoa/cntdrvfview.do", data, function (datobj) {
		if (datobj.mstgrid) {
			showCntsWin(datobj.mstgrid);
			return;
		} else {
			if (isSearch == 1) $('#goHomeBtn').click();
		}
		isSearch = 0;
		var dat = datobj;
		$('#mst-container').empty();
		$('#gds-container').empty();
		if (lastJobid != dat.jobid) {
			$('#img-view').empty();
		}
		if (dat) {
			var tpl = $('script[type="text/template"][id="mst"]').html();
			var arr = [];

			dat.etd = (dat.etd) ? HyUtils.getFormatDate (dat.etd, 'yyyy-MM-dd') : '';
			dat.cmdate = (dat.cmdate) ? HyUtils.getFormatDate (dat.cmdate, 'yyyy-MM-dd') : '';
			
			arr.push(HyUtils.formatTemplate(dat, tpl));
			$('#mst-container').append(arr.join(''));
			var gd = dat.dtlgrid;
			if (gd && gd.rows && gd.rows.length > 0) {
				arr = [];
				tpl = $('script[type="text/template"][id="gds"]').html();
				$.each(gd.rows, function(i, o) {
					arr.push(HyUtils.formatTemplate(o, tpl));
				});
				$('#gds-container').append(arr.join(''));
			}

			if (lastJobid != dat.jobid) {
				lastJobid = dat.jobid;
				showDocxView();
			}
		} else {
			toastr.info('没有数据');
		}
	});
}
//提交费用
function doSubmitFee() {
	var jobidObj = document.getElementById('jobid');
	if (HyUtils.isEmpty(jobidObj)) {
		toastr.info('请先输入箱号查询');
		return;
	}
	var feeid 	= document.getElementById('fedt_feeid').value;
	var amt 	= document.getElementById('fedt_amt').value;
	var arap 	= document.getElementById('fedt_arap').value;
	var jobid 	= document.getElementById('jobid').value;
	var cntpkid = document.getElementById('cntpkid').value;
	if (!HyUtils.isNumber(feeid)) {
		toastr.info('请选择费用名称');
		return;
	}
	if (HyUtils.isNumber(amt) && amt == 0) {
		
	} else {
		if (!HyUtils.isNumeric(amt)) {
			toastr.info('请输入金额'+amt);
			return;
		}
	}

	if (!HyUtils.isNumber(jobid) || !HyUtils.isNumber(cntpkid)) {
		toastr.info('请先输入箱号查询');
		return;
	}
	var data = {
		"cntpkid": cntpkid
		,"jobid": jobid
		,"feeid": feeid
		,"amt": amt
		,"arap": arap
	};
	HyUtils.post("/wxoa/cntdrvfsave.do", data, function (datobj) {
		xtip.closeAll();
		doRefresh(cntpkid);
	});
}
function loadFeeItem() {
	$('#fedt_feeid').get(0).options.length = 0;
	if (feeDatas != null) {
		var total = feeDatas.results + 0;
		for (var i = 0; i < total; i ++) {
			$('#fedt_feeid').append("<option value='" + feeDatas.rows[i].feeid + "'>" + feeDatas.rows[i].feename_c + "</option>");
		}
	} else {
		var data = {
				
			};
		HyUtils.post("/wxoa/cntdrvfitem.do", data, function (datobj) {
			if (datobj.results && datobj.results > 0) {
				feeDatas = datobj;
				var total = datobj.results + 0;
				for (var i = 0; i < total; i ++) {
					$('#fedt_feeid').append("<option value='" + datobj.rows[i].feeid + "'>" + datobj.rows[i].feename_c + "</option>");
				}
			} else {
				feeDatas = null;
			}
		});
	}
}
function loadArapEdit(el) {
	var pkid = $(el).attr('data-id');
	if (!HyUtils.isNumber(pkid)) {
		return;
	}
	var cntpkid = document.getElementById('cntpkid').value;
	if (!HyUtils.isNumber(cntpkid)) {
		toastr.info('请先输入箱号查询');
		return;
	}
	var data = {
		"cntpkid": cntpkid
		,"pkid": pkid
	};
	HyUtils.post("/wxoa/cntdrvfdata.do", data, function (datobj) {
		xtip.open({
			type: 'noready',
			content: '#fedtwin',
			title: '费用编辑',
			app: true
		});
		setTimeout(function() {
			loadFeeItem();
		}, 100);
		setTimeout(function() {
			fillArapEditData(datobj);
		}, 300);
	});
}
function fillArapEditData(datobj) {
	$('#fedt_feeid').val(datobj.feeid);
	document.getElementById('fedt_amt').value = datobj.amt;
	document.getElementById('fedt_arap').value = datobj.arap;
}
function initImgUpload() {
	app.newPlaceholder(imageList, 0);
}
//显示
function deleteImg(pkid) {
	var cntpkid = 0;
	var elpk = app.get('cntpkid');
	if (elpk) {
		cntpkid = elpk.value;
	} else {
		return;
	}
	var datpkid = getJobid();
	if (!(HyUtils.isNumber(datpkid) && datpkid + 0 > 0)) return;
	xtip.confirm('是否删除选定的图片？',function () {
		//删除图片
		var docid = pkid;
		var parms = {
			datpkid: datpkid,
			docid: docid
		};
		HyUtils.post("/wxoa/cntdrvfeelocked.do", {"cntpkid": cntpkid}, function(msg1) {
			HyUtils.post("/edocs/delete.do", parms, function(dataret) {
				imageView.removeChild(app.get('img-'+pkid));
				return toastr.info('已成功删除图片');
			});
		});
	},'div');
}
//上传图片
function submitImg() {
	var jobid = getJobid();
	if (HyUtils.isNumber(jobid) && jobid.length > 0) {}
	else {
		return toastr.info('请先查找箱号详情。');
	}
	var cntid = app.get('cntpkid').value;
	var imgArr = app.getFileInputArray(imageList);
	if (imgArr.length == 0) {
		return;
	}
	
	var data = {"jobid": jobid, "cntpkid": cntid};
	HyUtils.post("/wxoa/cntdrvfeelocked.do", data, function (datobj) {
		imgArr.forEach(function(fileInput) {
			var file = fileInput.files[0];
			if (file) {
				app.compressImage(file, function(dataUrl){
					if (!HyUtils.isEmpty(dataUrl)) {
						var sendData = {
							"image": dataUrl
						};
						HyUtils.post("/edocs/upload/DCF" + jobid + ".do", sendData, function(dataret) {
							imageList.removeChild(imageList.childNodes[0]);
							return toastr.info('上传成功');
						});
					}
				});
			}
		});
	});
}
function showDocxView () {
	var pkid = getJobid();
	if (!HyUtils.isNumber(pkid)) {
		toastr.warning('程序异常：无效参数值');
		return;
	}
	var data = {"datpkid": pkid};
	HyUtils.post("/edocs/listdat.do", data, function (datobj) {
		var dat = datobj;
		$('#img-view').empty();
		if (dat) {
			var tpl = $('script[type="text/template"][id="docx"]').html();
			var arr = [];
			
			$.each(dat.rows, function(i, o) {
				if (curuid == o.createuser) {
					o.rowindex = '{index: ' + (i + 1) + '}';
					arr.push(HyUtils.formatTemplate(o, tpl));
				}
			});
			$('#img-view').append(arr.join(''));
		} else {
			toastr.info('没有数据');
		}
	});
}

function showCntsWin(datgrid) {
	$('#mcnts-ct').show();
	var tpl = $('script[type="text/template"][id="mcnts"]').html();
	var arr = [];
	
	$.each(datgrid.rows, function(i, o) {
		o.rowindex = (i + 1);
		arr.push(HyUtils.formatTemplate(o, tpl));
	});
	$('#mcnts-list').append(arr.join(''));
}