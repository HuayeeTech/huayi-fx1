var feeDatas = null;
var lastJobid = '';
var imageList = app.get('img-list');
var imageView = app.get('img-view');
var isSearch = 0;
$(function(){
	$('#mcnts-ct').show();
	app.get('btnSearch').addEventListener('click', function() {
		isSearch = 1;
		doRefresh();
	});
//	app.get('dtlbtnadd').addEventListener('click', function() {
//		var jobid = getJobid();
//		if (!HyUtils.isNumber(jobid) || jobid.length <= 0) {
//			return;
//		}
//		xtip.open({
//			type: 'noready',
//			content: '#fedtwin',
//			title: '箱号上传',
//			app: true
//		});
//	});
	app.get('attbtnadd').addEventListener('click', function() {
		submitImg();
	});
	app.get('attrefresh').addEventListener('click', function() {
		showDocxView();
	});
	app.get('srtbtn').addEventListener('click', function() {
		loadMyList();
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
function getDatPkid() {
	var pk = "";
	var el = app.get('docdatpkid');
	if (el) {
		pk = el.value;
	}
	return pk;
}

function bindDtlEvent() {
	$(".cntno-edt").bind('click', function() {
		loadEdit(this);
	});
}

//刷新
function doRefresh(pkid) {
	var jobno = document.getElementById('srh_jobno').value;
	if (HyUtils.isEmpty(jobno) && HyUtils.isEmpty(pkid)) {
		toastr.info('请输入工作号');
		return;
	}
	var data = {"jobno": jobno};
	if (HyUtils.isNumber(pkid)) {
		data = {"jobid": pkid};
	}
	HyUtils.post("/wxoa/cntdrvupvw.do", data, function (datobj) {
		isSearch = 0;
		var dat = datobj;
		$('#mst-container').empty();
		$('#dtl-container').empty();
		if (lastJobid != dat.jobid) {
			$('#img-view').empty();
		}
		if (dat && dat.results > 0) {
			var tpl = $('script[type="text/template"][id="mst"]').html();
			var arr = [];
			let om = dat.rows[0];
			om.etd = HyUtils.getFormatDate(om.etd, 'yyyy-MM-dd');
			om.cmdate = HyUtils.getFormatDate(om.cmdate, 'yyyy-MM-dd');
			arr.push(HyUtils.formatTemplate(om, tpl));
			$('#mst-container').append(arr.join(''));
			
			arr = [];
			tpl = $('script[type="text/template"][id="dtl"]').html();
			$.each(dat.rows, function(i, o) {
				o.cntno_bl = HyUtils.isEmpty(o.cntno_bl) ? "上传" : o.cntno_bl;
				o.drvsubmittime = HyUtils.getFormatDate(o.drvsubmittime, 'yyyy-MM-dd HH:mm');
				o.drvacptedtime = HyUtils.getFormatDate(o.drvacptedtime, 'yyyy-MM-dd HH:mm');
				arr.push(HyUtils.formatTemplate(o, tpl));
			});
			$('#dtl-container').append(arr.join(''));
			bindDtlEvent();

			if (lastJobid != dat.jobid) {
				lastJobid = dat.jobid;
				showDocxView();
			}
		} else {
			toastr.info('没有数据');
		}
	});
}
//提交
function doSubmit() {
	var jobidObj = document.getElementById('jobid');
	if (HyUtils.isEmpty(jobidObj)) {
		toastr.info('请先查询');
		return;
	}
	var cntno 	= document.getElementById('edt_cntnobl').value;
	var selno	= document.getElementById('edt_sealnobl').value;
	var jobid 	= document.getElementById('jobid').value;
	var cntpkid = document.getElementById('edt_cntpkid').value;
	var vehno	= document.getElementById('edt_vehnobl').value;
	var drvtel	= document.getElementById('edt_drvtelbl').value;
	if (!HyUtils.isNumber(cntpkid)) {
		toastr.error('未获取到关键数据，请重试');
		return;
	}
	if (HyUtils.isEmpty(cntno)) {
		toastr.error('请输入新箱号');
		return;
	}
	cntno = cntno.toUpperCase();
	var bcode = HyUtils.checkCntnoCode(cntno, function(isValid, num){
		if (isValid === true) {
			
		} else {
			toastr.error("箱号校验位不正确，应为：" + num);
		}
		return isValid;
	});
	if (!bcode) {
		toastr.error("新箱号未通过校验");
		return;
	}

	var data = {
		"cntpkid": cntpkid
		,"jobid": jobid
		,"cntno": cntno
		,"sealno": selno
		,"vehno": vehno
		,"drvtel": drvtel
	};
	HyUtils.post("/wxoa/cntdrvupsave.do", data, function (datobj) {
		xtip.closeAll();
		doRefresh(jobid);
	});
}
function loadEdit(el) {
	var pkid = $(el).attr('data-id');
	if (!HyUtils.isNumber(pkid)) {
		return;
	}
	var data = {
		"cntpkid": pkid
	};
	HyUtils.post("/wxoa/cntdrvupone.do", data, function (datobj) {
		xtip.open({
			type: 'noready',
			content: '#fedtwin',
			title: '填报箱号',
			app: true
		});
		setTimeout(function() {
			fillEditData(datobj);
		}, 300);
	});
}
function fillEditData(datobj) {
	document.getElementById('edt_cntno').value = datobj.cntno;
	document.getElementById('edt_sealno').value = datobj.sealno;
	document.getElementById('edt_cntnobl').value = datobj.cntno_bl;
	document.getElementById('edt_sealnobl').value = datobj.sealno_bl;
	document.getElementById('edt_vehnobl').value = datobj.vehno_bl;
	document.getElementById('edt_drvtelbl').value = datobj.drvtel_bl;
	document.getElementById('edt_cntpkid').value = datobj.cntpkid;
}
function initImgUpload() {
	app.newPlaceholder(imageList, 0);
}
//显示
function deleteImg(pkid) {
	var jobid = getJobid();
	var datpkid = getDatPkid();
	if (!(HyUtils.isNumber(datpkid) && datpkid + 0 > 0)) return;
	xtip.confirm('是否删除选定的图片？',function () {
		//删除图片
		var docid = pkid;
		var parms = {
			datpkid: datpkid,
			docid: docid
		};
		HyUtils.post("/wxoa/cntdrvuplocked.do", {"jobid": jobid}, function(msg1) {
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
	var datpkid = getDatPkid();
	if (HyUtils.isNumber(jobid) && jobid.length > 1 && HyUtils.isNumber(datpkid) && datpkid.length > 1) {}
	else {
		return toastr.info('请先输入工作号查询。');
	}
	var imgArr = app.getFileInputArray(imageList);
	if (imgArr.length == 0) {
		return;
	}
	
	var data = {"jobid": jobid};
	HyUtils.post("/wxoa/cntdrvuplocked.do", data, function (datobj) {
		imgArr.forEach(function(fileInput) {
			var file = fileInput.files[0];
			if (file) {
				app.compressImage(file, function(dataUrl){
					if (!HyUtils.isEmpty(dataUrl)) {
						var sendData = {
							"image": dataUrl
						};
						HyUtils.post("/edocs/upload/DCU" + datpkid + ".do", sendData, function(dataret) {
							imageList.removeChild(imageList.childNodes[0]);
							toastr.info('上传成功');
							showDocxView();
						});
					}
				});
			}
		});
	});
}
function showDocxView () {
	var pkid = getDatPkid();
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
//加载已录入列表
function loadMyList() {
	var jobno = app.get('srt_jobno').value;
	var cntno = app.get('srt_cntno').value;
	var data = {"jobno": jobno, "cntno": cntno, "isme": 11};
	HyUtils.post("/wxoa/cntdrvupvw.do", data, function (datobj) {
		var dat = datobj;
		$('#mcnts-list').empty();
		if (dat && dat.results > 0) {
			var tpl = $('script[type="text/template"][id="mcnts"]').html();
			var arr = [];
			$.each(dat.rows, function(i, o) {
				o.cntno_bl = HyUtils.isEmpty(o.cntno_bl) ? "上传" : o.cntno_bl;
				o.subtmshort = HyUtils.getFormatDate(o.drvsubmittime, 'MM/dd');
				o.acptmshort = HyUtils.getFormatDate(o.drvacptedtime, 'MM-dd');
				o.stacsl = (o.drvacpted == "Y") ? "sta-acpted" : "";
				arr.push(HyUtils.formatTemplate(o, tpl));
			});
			$('#mcnts-list').append(arr.join(''));
		} else {
			toastr.info('没有数据');
		}
	});
}