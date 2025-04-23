	<!-- Sidenav Black Overlay-->
	<div class="sidenav-black-overlay"></div>
	<!-- Side Nav Wrapper-->
	<div class="suha-sidenav-wrapper filter-nav" id="sidenavWrapper">
		<div class="catagory-sidebar-area">
			<div class="row mb-1">
				<div class="col-4" style="font-size: 10px;">M/BL No.</div>
				<div class="col-8 text-left"><input type="text" id="srh_blnom" value=""/></div>
			</div>
			<div class="row mb-2">
				<div class="col-4" style="font-size: 10px;">箱号</div>
				<div class="col-8 text-left"><input type="text" id="srh_cntno" value=""/></div>
			</div>
			<div class="row">
				<div class="col-12 text-right"><a href="javascript:void(0)" id="srhbtn" class="btn btn-sm btn-success">查询</a></div>
			</div>
			<div class="selection-panel bg-white mb-3 py-1" id="mcnts-ct">
	    		<div>
	    			<div class="row">
	    				<div class="col-5">M/BL No.</div>
	    				<div class="col-4">箱号</div>
	    				<div class="col-3 text-right">总金额</div>
	    			</div>
	    		</div>
	    		<div id="mcnts-list">
	    			<div class="row mb-1" style="display:none">
	    				<div class="col-6">{blnom}</div>
	    				<div class="col-6">{cntno}</div>
	    			</div>
	    		</div>
	    	</div>
		</div>
		<!-- Go Back Button-->
		<div class="go-home-btn" id="goHomeBtn"><i class="icofont-rounded-left"></i></div>
    </div>