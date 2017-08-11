$(document).ready(hzdInitPage);
function hzdInitPage(){
	/*导航页*/
	function navLinkClick(){
		$(this).addClass("current");
		$(this).siblings("li").removeClass("current");
	}

	var navLis = $(".hzd-tnav-r");
	navLis.find('li')
		.on("click",navLinkClick);

	/*首页轮播设置*/
	var bannerSlider = new Slider($('#banner_tabs'), {
		time: 5000,
		delay: 400,
		event: 'hover',
		auto: true,
		mode: 'fade',
		controller: $('#bannerCtrl'),
		activeControllerCls: 'active'
	});
	$('#banner_tabs .flex-prev').click(function() {
		bannerSlider.prev()
	});
	$('#banner_tabs .flex-next').click(function() {
		bannerSlider.next()
	});
	
	/*登录之后个人中心下拉菜单*/
	var selected = $(".selected");
	selected.on("mouseover",function(){
		$(this).find("ul").css("display","block");
		$(this).siblings(".selected").find("ul").css("display","none");
	});
	selected.on("mouseleave",function(){
		$(this).find("ul").css("display","none");
		$(this).siblings(".selected").find("ul").css("display","none");
	});
	/*职位列表每行最后一个加一个样式*/
	var rJobList = $(".recommend-job").find("li");
	var hJobList = $(".hot-job").find("li");
	var rmaxcount = rJobList.length;
	var hmaxcount = hJobList.length;
	if (rmaxcount >= 3) {//推荐职位
		for (var i=2;i<=rmaxcount;i++){
			if ((i-2)%3 == 0) {
				rJobList.eq(i).addClass("last");
			}
		}
	};
	if (hmaxcount >= 3) {//最热职位
		for (var i=2;i<=hmaxcount;i++){
			if ((i-2)%3 == 0) {
				hJobList.eq(i).addClass("last");
			}
		}
	};


}

