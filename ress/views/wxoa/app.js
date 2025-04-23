(function ($, owner) {
	owner.get = function(id) {
		return document.getElementById(id);
	};
	owner.getFileInputArray = function(parentObj) {
		return [].slice.call(parentObj.querySelectorAll('input[type="file"]'));
	};
	
	owner.showLogin = function() {
		HyUtils.post('/wxoa/isign.do', {}, function(datobj){
			//window.location.href = _g_ctx + '/wxoa/index.do';
		}, function(datret){
			toastr.info('您未登录，系统正在自动登录');
			setTimeout(function() {
				window.location.href = _g_ctx + '/wxmsg/wxlogin.do';
			}, 2000);
		});
	};
	
	owner.unbind = function() {
		xtip.confirm('是否解除绑定？',function (e) {
			HyUtils.post('/wxmsg/unbind.do', {}, function(datobj){
				window.location.href = _g_ctx + '/wxmsg/wxlogin.do';
			}, function(datret){
				var err = datret.msg;
				if (HyUtils.isEmpty(err)) err = '请尝试重新登录之后操作';
				toastr.info(err);
			});
		},'div');
	};
	
	/**
	 * 创建图片缩略图列表
	 * @param {Object} imageList 图片列表容器对象
	 * @param {String} imageId 图片ID
	 * @param {String} dataUrl 图片地址，base64字符串需要自行增加前缀
	 * @param {Function} deleteCallback 删除图片回调函数
	 */
	owner.newPlaceholderView = function(imageList, imageId, dataUrl, deleteCallback) {
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.addEventListener('tap', function(event) {
			event.stopPropagation();
			event.cancelBubble = true;
			xtip.confirm('是否删除选定的图片？',function () {
				if (deleteCallback && typeof deleteCallback == 'function') 
				{
					deleteCallback(imageId, function(){
						setTimeout(function() {
							imageList.removeChild(placeholder);
						}, 0);
					});
				}
			},'div');
			return false;
		}, false);
		var imgx = document.createElement('img');
		imgx.setAttribute('data-preview-src', _g_ctx + "/edocs/download.do?docid=" + imageId.substr('img-'.length));
		imgx.setAttribute('data-preview-group', '1');
		imgx.setAttribute('src', dataUrl);
		//placeholder.style.backgroundImage = 'url(' + dataUrl + ')';
		placeholder.classList.remove('space');
		placeholder.appendChild(imgx);
		placeholder.appendChild(closeButton);
		imageList.appendChild(placeholder);
	};
	
	/**
	 * 创建图片占位符
	 * @param {Object} imageList 图片列表容器对象
	 * @param {Integer} imageIndexIdNum 当前图片索引值，用于计算图片总数
	 * @param {String} imageIdFix 图片ID前缀，可不填，默认为：image，默认将构建<img id='image-1' ... />、<img id='image-2' ... />
	 */
	owner.newPlaceholder = function(imageList, imageIndexIdNum, imageIdFix) {
		var imgidfix = imageIdFix || 'image';
		imgidfix += '-';
		var fileInputArray = owner.getFileInputArray(imageList);
		if (fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		}
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item image-item-add space');
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.addEventListener('click', function(event) {
			event.stopPropagation();
			event.cancelBubble = true;
			setTimeout(function() {
				imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);
		var fileInput = document.createElement('input');
		fileInput.setAttribute('type', 'file');
		fileInput.setAttribute('accept', 'image/*');
		fileInput.setAttribute('id', imgidfix + imageIndexIdNum);
		fileInput.addEventListener('change', function(event) {
			var file = fileInput.files[0];
			if (file) {
				var reader = new FileReader();
				reader.onload = function() {
					//处理 android 4.1 兼容问题
					var base64 = reader.result.split(',')[1];
					var dataUrl = 'data:image/png;base64,' + base64;
					placeholder.style.backgroundImage = 'url(' + dataUrl + ')';
				}
				reader.readAsDataURL(file);
				placeholder.classList.remove('space');
				owner.newPlaceholder(imageList, imageIndexIdNum, imageIdFix);
			}
		}, false);
		placeholder.appendChild(closeButton);
		placeholder.appendChild(fileInput);
		imageList.appendChild(placeholder);
	};
	
	/**
	 * 压缩图片
	 */
	owner.compressImage = function(file, callback) {
		// 压缩图片需要的一些元素和对象
		var reader = new FileReader(),
		//创建一个img对象
			img = new Image();
			
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		
		img.onload = function() {
			// 图片原始尺寸
			var originWidth = this.width;
			var originHeight = this.height;
			// 最大尺寸限制，可通过设置宽高来实现图片压缩程度
			var maxWidth = 800,
				maxHeight = 800;
			// 目标尺寸
			var targetWidth = originWidth,
				targetHeight = originHeight;
			// 图片尺寸超过800x800的限制
			if(originWidth > maxWidth || originHeight > maxHeight) {
				if(originWidth / originHeight > maxWidth / maxHeight) {
					// 更宽，按照宽度限定尺寸
					targetWidth = maxWidth;
					targetHeight = Math.round(maxWidth * (originHeight / originWidth));
				} else {
					targetHeight = maxHeight;
					targetWidth = Math.round(maxHeight * (originWidth / originHeight));
				}
			}
			// canvas对图片进行缩放
			canvas.width = targetWidth;
			canvas.height = targetHeight;
			// 清除画布
			context.clearRect(0, 0, targetWidth, targetHeight);
			// 图片压缩
			context.drawImage(img, 0, 0, targetWidth, targetHeight);
			/*第一个参数是创建的img对象；第二个参数是左上角坐标，后面两个是画布区域宽高*/
			//压缩后的图片base64 url
			/*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/jpeg';
			 * qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92*/
			var newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式
			//console.log(canvas.toDataURL('image/jpeg', 0.92));
			//preview.style.backgroundImage='url(' + newUrl + ')';
			if (callback && typeof callback == 'function') {
				callback(newUrl);
			}
		};
		
		reader.onload = function(e) {
			img.src = e.target.result;
		};
		
		// 选择的文件是图片
		if(file.type.indexOf("image") == 0) {
			reader.readAsDataURL(file);
		}
	};

	$.fn.serializeObject = function() {  
	    var o = {};  
	    var arr = this.serializeArray();  
	    $.each(arr,function(){  
	        if (o[this.name]) {  //返回json中有该属性
	            if (!o[this.name].push) { //将已存在的属性值改成数组
	                o[this.name] = [ o[this.name] ];
	            }  
	            o[this.name].push(this.value || ''); //将值存放到数组中
	        } else {  //返回json中没有有该属性
	            o[this.name] = this.value || '';  //直接将属性和值放入返回json中
	        }  
	    });  
	    return o;  
	};
}(jQuery, window.app = {}));