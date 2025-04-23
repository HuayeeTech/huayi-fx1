	<div class="modal fade" id="loginModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">登录系统</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<iframe style="position:relative;background-color:transparent;" allowtransparency="true" width="100%" height="100%"  frameborder="0" src="" id="logw-frame"></iframe>
				</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript">
	$(function() {
		$('#loginbtn').click(function(){
			$('#goHomeBtn').click();
			$('#loginModal').modal('show');
	    	$('#logw-frame').attr('src', '<@spring.ctx/>/wxmsg/wxlogin.do');
		});
	});
	</script>