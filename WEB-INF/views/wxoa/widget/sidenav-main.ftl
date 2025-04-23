	<!-- Sidenav Black Overlay-->
	<div class="sidenav-black-overlay"></div>
	<!-- Side Nav Wrapper-->
	<div class="suha-sidenav-wrapper" id="sidenavWrapper">
		<!-- Sidenav Profile-->
		<div class="sidenav-profile">
			<div class="user-profile"><img src="<@spring.ctx/>/ress/images/userfaces/11.png" alt=""></div>
	  		<div class="user-info">
				<h6 class="user-name mb-0">
					<#if CURRENT_USER??>
					${CURRENT_USER.username}
					<#else>
					游客
					</#if>
				</h6>
				<p class="available-balance">
					
				</p>
			</div>
		</div>
		<!-- Sidenav Nav-->
		<ul class="sidenav-nav">
			<li><a href="#"><i class="icofont-star"></i>我的个人资料</a></li>
			<li><a href="#"><i class="icofont-exclamation-tringle"></i>消息<span class="ml-3 badge badge-warning">3</span></a></li>
			<li><a href="<@spring.ctx/>/wxoa/settings.action"><i class="icofont-gear-alt"></i>设置</a></li>
			<#if CURRENT_USER??>
			<#if CURRENT_USER.type.typeCode == "SYS">
			<li><a href="<@spring.ctx/>/wxoa/istkquery.do"><i class="icofont-search-document"></i>入库查询</a></li>
			<li><a href="<@spring.ctx/>/wxoa/stkquery.do"><i class="icofont-search-document"></i>库存查询</a></li>
			<li><a href="<@spring.ctx/>/wxoa/stkcntld.do"><i class="icofont-search-document"></i>装柜货物</a></li>
			<li><a href="<@spring.ctx/>/wxoa/settle.do"><i class="icofont-search-document"></i>结算管理</a></li>
			</#if>
			</#if>
			<li><a href="<@spring.ctx/>/wxoa/stktrace.do"><i class="icofont-search-document"></i>货物追踪</a></li>
			<#if CURRENT_USER??>
			<li><a href="javascript:void(0)" onclick="app.unbind()"><i class="icofont-broken"></i>解除绑定</a></li>
			<li><a href="<@spring.ctx/>/wxmsg/wxlogout.do"><i class="icofont-power"></i>退出</a></li>
			<#else>
			<li><a href="<@spring.ctx/>/wxmsg/wxlogin.do"><i class="icofont-key"></i>微信登录</a></li>
			</#if>
		</ul>
		<!-- Go Back Button-->
		<div class="go-home-btn" id="goHomeBtn"><i class="icofont-rounded-left"></i></div>
    </div>