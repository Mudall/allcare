/* 《 고용24 모바일 js 》 */

////////////////////////////////////////////////////////////
// 1. layout

// header 호출
var header =  {};

header.type = (type) => {
	const headerActive = {
		person: function() {
			$('.header_division > li').removeClass('active');
			$('.header_division > li:first-child').addClass('active');
		},
		company: function() {
			$('.header_division > li').removeClass('active');
			$('.header_division > li:last-child').addClass('active');
		}
	}
	switch(type) {
		case 'person': headerActive.person();  break;
		case 'company': headerActive.company();  break;
		default: break;
	}
}

header.subType = (btnType, titleType) => {
	const headerSub = $('.header_sub_area');
	const headerSubBtns = $('.header_sub_btn');
	const subTitleBtn = $('.sub_title > button');
	const subBtn = {
		share: function() {
			headerSub.show();
			headerSubBtns.css('display', 'flex');
			headerSubBtns.find('> li').hide();
		},
		menu: function() {
			this.share();
			headerSubBtns.find('> li:first-child').show();
		},
		back: function() {
			this.share();
			headerSubBtns.find('> li:last-child').show();
		}
	}
	switch(btnType) {
		case 'menu': subBtn.menu();  break;
		case 'back': subBtn.back();  break;
		default: break;
	}
	if (titleType === 'y') {
		subTitleBtn.show();
	}
}

header.title = (title) => {
	const heading = $('.sub_title') && $('.sub_title > strong');
	heading.text(title);
}

// header interaction
const hin = {}

hin.titleMenu = () => {
	const btn = $('.sub_title') && $('.sub_title > button.btn_submenu');
	btn.off('click').on('click', function() {
		const list = $('.sub_menu_list');
		const dimmed = $('.dimmed');
		if($(this).hasClass('on')) {
			$(this).removeClass('on');
			list.slideUp();
			$(this).find('.blind').text('서브메뉴 열기');
			dimmed.hide();
		} else {
			$(this).addClass('on');
			list.slideDown();
			$(this).find('.blind').text('서브메뉴 닫기');
			dimmed.show();
		}
	});
	const last = $('.sub_menu_list > ul > li:last-child > a');
	last.on('focusout', function() {
		btn.focus();
	});
}

hin.search = () => {
	const open = $('.header_btn_search') && $('.search_open');
	const searchLayer = $('.search_layer');
	const close = $('.search_close');
	open.off('click').on('click', function() {

		$('header, .contents, .floating').attr('aria-hidden', true);
		searchLayer.show();
		//close.focus();
		$('html,body').addClass('scroll_off');
		$('html,body').on('touchmove', function(e){
			e.preventDefault();
		});
		// setTimeout(() => {
		// },1000);
		document.querySelector('.search_bar input[type="text"]').focus();
		searchLayer_scroll_on();
	});
	close.off('click').on('click', function() {
		$('header, .contents, .floating').attr('aria-hidden', false);
		searchLayer.hide();

		if($("#untySearchFlag").val()=="bottom")
			$(".bottom_bar_btn_search").focus();
		else
			open.focus();

		$("#untySearchFlag").val("");

		$('html,body').removeClass('scroll_off');
		$('html,body').off('touchmove');
		searchLayer_scroll_off();
	});
	function searchLayer_scroll_on(){
		window.addEventListener('resize',search_layer_resize);
		scroll_height_setting();
	}
	function searchLayer_scroll_off(){
		window.removeEventListener('resize',search_layer_resize);
	}
	function search_layer_resize(){
		scroll_height_setting();
	}
	function scroll_height_setting(){
		var scroll_wrap = document.querySelector('.search_layer .scroll_wrap');
		var scroll_wrap_top = scroll_wrap.offsetTop;
		var scroll_h = window.innerHeight - scroll_wrap_top;
		scroll_wrap.style.height = scroll_h + 'px';
	}
}

hin.sticky = () => {
	let lastScrollTop = 0;
	$(window).on('scroll', function() {

		let st = $(window).scrollTop();

		//console.log("scroll =======", st);
		const headerSub = $('.header_sub_area');
		const headerMain = $('.header_main_area');
		const bar = $('.bottom_bar');
		const floating = $('.floating');


		if (headerMain.length && headerMain.css('display') !== 'none') {
	 		//st > headerMain.outerHeight() + headerSub.outerHeight() ? headerMain.addClass('sticky') : headerMain.removeClass('sticky');
		}

		if (headerMain.length && headerMain.css('display') !== 'none') {
	 		//st > headerMain.outerHeight() + headerSub.outerHeight() ? headerMain.addClass('sticky') : headerMain.removeClass('sticky');
		}

		/*
		if (headerSub.length && headerSub.css('display') !== 'none' && headerMain.length && headerMain.css('display') !== 'none') {
	 		if(st > headerMain.outerHeight() + headerSub.outerHeight()) {
				 headerMain.addClass('sticky');
				 headerSub.addClass('sticky');
			 } else {
				 headerMain.removeClass('sticky');
				 headerSub.removeClass('sticky');
			}
		}
		*/

		// 2025.01.20 스크롤 시 스크롤 초기화 제거
		//util.scrollClear(st);

		if (bar && (st > lastScrollTop)) {
		 	bar.hide();
		 	floating.hide();
		} else if (bar && (st < lastScrollTop)) {
	 		bar.show();
	 		floating.show();
		}

		lastScrollTop = st <= 0 ? 0 : st;

		clearTimeout($.data(this, 'scrollTimer'));
		$.data(this, 'scrollTimer', setTimeout(function() {
	 		bar.show();
	 		floating.show();
		}, 1000));



	});
}

// layout interaction
const lin = {}

lin.goTop = () => {
	const btn = $('.go-top');
	btn.off('click').on('click', function() {
		$('html, body').stop().animate({ scrollTop: 0 }, 200);
	});
}

// lin.openNotice = () => {
// 	const topNotice = $('.top_notice');
// 	const btn = topNotice.find('.notice_expand');
// 	btn.off('click').on('click', function() {
// 		if(topNotice.hasClass('expand')) {
// 			topNotice.removeClass('expand');
// 			$(this).find('span').text('공지사항 열기');
// 		} else {
// 			topNotice.addClass('expand');
// 			$(this).find('span').text('공지사항 닫기');
// 		}
// 	});
// }

lin.footerQuickLayer = () => {
	let thisPoint;
	$('.quick_links').off('click').on('click', function(e) {
		thisPoint = $(window).scrollTop();
		$('.dimmed').show();
		$('.footer_quick').show();
		$('.footer_quick').focus();
		$('.footer_quick .footer_quick_menu .footer_info_list .list .item').first().find("a").focus();
		util.scrollStop(thisPoint);
	});
	$('.footer_quick .layer_close').off('click').on('click', function() {
		$('.footer_quick').hide();
		$('.quick_links').find("button").focus();
		$('.dimmed').hide();
		util.scrollClear(thisPoint);
	});
}



lin.progress = () => {
	const box = $('.call_progress');
	if (box.length) {
		box.each(function() {
			const attrArray = $(this).data('array') ?? '작성중, 제출완료, 처리중, 처리완료';
			const arr = attrArray.split(',');
			const activeIndex = Number($(this).data('active-index')) ?? 1;
			let list = '';
			let curStatus = "총 ";
			for(let i = 0; i < arr.length; i++) {
				list += (i + 1) === activeIndex ? `<li class="on"><span>${i + 1}</span><em>${arr[i]}</em><p class="blind">현재단계</p></li>` : `<li><span>${i + 1}</span><em>${arr[i]}</em></li>`;
				if( (i + 1) === activeIndex) {
					curStatus += arr.length+"단계 중 현재 " +activeIndex+`단계, ${arr[i]}`;
				}
			}
			$(this).html(`<div class="step_progress" role="img" aria-label="`+curStatus+`"><ol>${list}</ol></div>`);
		});
	}
}

// bottom bar 호출
const bottomBar = {};

bottomBar.check = () => {
	const footer = $('footer');
	footer.length && $('.bottom_bar').length ? footer.addClass('is_bottom') : footer.removeClass('is_bottom');
}

bottomBar.type = (type) => {
	const bar = $('.bottom_bar');
	switch(type) {
		case 'person': bar.addClass('person');  break;
		case 'company': bar.addClass('company');  break;
		default: break;
	}
}

bottomBar.activeMenu = (num) => {
	/*
	const menu = $('.bottom_bar > ul > li');
	menu.removeClass('active');
	switch(num) {
		case 1: menu.eq(0).addClass('active');  break;
		case 2: menu.eq(1).addClass('active');  break;
		case 4: menu.eq(3).addClass('active');  break;
		case 5: menu.eq(4).addClass('active');  break;
		default: break;
	}
	*/
}

// 퍼블용 include
$(function() {
	var includes = $('[data-include]');
	jQuery.each(includes, function() {
		if ($(this)[0].tagName === 'HEADER') {
			// header 유형선택
			const headerType = $(this).data('type');
			header.type(headerType);
			const subBtnType = $(this).data('sub-btn');
			const subBtn = $(this).data('title-btn');
			header.subType(subBtnType, subBtn);
			const headingName = $(this).data('title');
			header.title(headingName);

			// header interaction 실행
			hin.titleMenu();
			hin.search();
		}

		if ($(this)[0].className === 'bottom_bar') {
			// bottom bar 유형선택
			const barType = $(this).data('bar-type');
			bottomBar.type(barType);
			const active = Number($(this).data('active-menu'));
			bottomBar.activeMenu(active);
		}

		// 첨부파일 인쿨루드
		if ($(this).data('include') === 'components/fileList') {
			const subject = $(this).data('subject') ?? '';
			const subText = $(this).data('sub-text') ?? '';
			subject.length ? $(this).find('.file_group_subject strong').text(subject) : $(this).find('.file_group_subject strong').remove();
			subText.length ? $(this).find('.file_group_subject .guide_list > li').text(subText) : $(this).find('.file_group_subject .guide_list').remove();
			if ($(this).data('type') === 'list') {
				$(this).find('.file_group_subject').remove();
				$(this).find('.find_file_area').remove();
			}
		}

		///////// 레이아웃 관련 실행 함수
		// 서브 타이틀 sticky
		$('.header_sub_area').length && hin.sticky();
		// bottom bar 있을 때 간격 주기
		$('footer').length && bottomBar.check();
		// 버튼 클릭 시 스크롤 상단으로 이동
		$('.go-top').length && lin.goTop();
		// 상단 notice 펼침/닫기
		// $('.top_notice').length && lin.openNotice();
		// footer 관련사이트 바로가기
		$('.quick_links').length && lin.footerQuickLayer();

		// 상세검색 띄우기
		$('.search_area .btn_detail , .layer_all_popup').length && ui.detailLayer();
	});
});

////////////////////////////////////////////////////////////
// 2. ui interaction

const ui = {};

// bottom layer, alert layer click call
ui.layerCall = () => {
	$('.ui-layer').off('click').on('click', function() {

		console.log("layerCalllayerCalllayerCalllayerCalllayerCall");
		const $this = $(this);
		const myLayer = $('#' + $this.data('my-layer'));

		const dimmed = $('.dimmed');
		const thisPoint = $(window).scrollTop();

		if (myLayer.length && dimmed.length) {

			$('header, .floating').attr('aria-hidden', true);
			myLayer.find('.layer_contents').removeAttr('style');

			if ($this.closest('.popup_full,.popup_allmenu').length > 0) {
				dimmed.css('z-index', '130').show();
				myLayer.css('z-index', '140').show();
			} else {

				dimmed.css('z-index', '130').show();
				myLayer.css('z-index', '140').show().focus();
			}
			util.scrollStop(thisPoint);
			const layerSize = myLayer.outerHeight();
			const gap = (+(myLayer.css('padding-top').replace('px', '')) + +(myLayer.find('.title').innerHeight()));


			const x = myLayer.find('.layer_close');

			const childClose = myLayer.last();
	        const childInput = myLayer.find('input:not([type=hidden]), select , button, radio, checkbox, a:not(.closed)');

			if(childInput.length != 0) {
				childInput.first().focus();
			} else if(childClose.length != 0) {
				childClose.focus();
				childClose.siblings(".full_pop .cont").scrollTop(0)
			}

			const cancel = myLayer.find('.cancel');
			const tmAreaSize = myLayer.find('.today_message').length ? $('.today_message').innerHeight() : 0;
			const btnSize = myLayer.find('.btn_group.bottom_btn_group').length ? myLayer.find('.btn_group.bottom_btn_group').innerHeight() : 0;

			myLayer.find('.layer_contents').css('height', ((layerSize - gap) - (tmAreaSize + btnSize)) + 'px');

			x.off('click').on('click', function() {
				$('header, .floating').attr('aria-hidden', false);
				$this.removeAttr("aria_hidden");
				myLayer.hide();
				dimmed.hide();

				// 2025.02.06 팝업 중복 스크롤 이슈 수정 - HI
				if ($(".popup_full:visible").length == 0) {
					util.scrollClear(thisPoint);
				}

				$this.focus();
				dimmed.css('z-index', '');
				myLayer.css('z-index', '');
			});

			cancel.off('click').on('click', function() {
				myLayer.hide();
				dimmed.hide();

				// 2025.02.06 팝업 중복 스크롤 이슈 수정 - HI
				if ($(".popup_full:visible").length == 0) {
					util.scrollClear(thisPoint);
				}

				$this.focus();
				dimmed.css('z-index', '');
				myLayer.css('z-index', '');
			});
		}
	});
}

//공통 전체메뉴 호출함수
ui.call_layer_all_menu = (layer_all_menu) => {

	$(layer_all_menu).show().find('.sitemap a').eq(0).focus();


	$subHeight = window.innerHeight - document.querySelector('.sitemap_sub').offsetTop-10;
	document.querySelector('.sitemap_sub').style.height = $subHeight + 'px';

	ui.accordion();

	$('html,body').addClass('scroll_off');

	$('html,body').on('touchmove', function(e){
		e.preventDefault();
	});

	$('header, .contents, .floating').attr('aria-hidden', true);

	if(ComLib.env.indexOf("app") > -1){
		window.ReactNativeWebView.postMessage(JSON.stringify({"type":"SET_PULL_TO_REFRESH", "data":false}));
	}
	/*
	$(layer_all_menu + ' .sitemap_lnb a').on('click', function() {
		// 해당 sub menu의 target 요소 id 값을 가져온다.
		const $target = $(this).data('sub');
		// 클릭한 요소 활성화, 나머지 비활성화 한다.
		$(this)
			.addClass('active')
			.parent().siblings().find('a').removeClass('active');
		// 모든 sub menu 요소를 숨긴다.
		$(layer_all_menu + ' .sitemap_sub > *').hide();
		// 선택한 요소의 sub menu만 보여준다.
		$('#' + $target).show();
	});
	*/
	$(layer_all_menu + ' .popup_close').off('click').on('click', function() {
		util.scrollClear();
		$('header, .contents, .floating').attr('aria-hidden', false);
		$(layer_all_menu).hide();
		$('html,body').removeClass('scroll_off');
		$('html,body').off('touchmove');
		$(".header_btn_all_menu").find("button").focus();
		if(ComLib.env.indexOf("app") > -1){
			window.ReactNativeWebView.postMessage(JSON.stringify({"type":"SET_PULL_TO_REFRESH", "data":true}));
		}
	});



	//$(".sitemap_lnb > li > a").first().click();
}


// bottom layer auto call
ui.layerAutoCall = (id, target) => { // 열리는 레이어 id, 창 닫힌 후 포커스 이동할 타겟
	console.log("layerAutoCalllayerAutoCalllayerAutoCalllayerAutoCall");
	const myLayer = $('#' + id);
	const dimmed = $('.dimmed');
	const thisPoint = $(window).scrollTop();
	if (myLayer.length && dimmed.length) {
		dimmed.show();
		myLayer.show().focus();
		$('body').addClass('scroll_off');
		$(window).scrollTop(thisPoint);
		const layerSize = myLayer.outerHeight();
		const gap = (+(myLayer.css('padding-top').replace('px', '')) + +(myLayer.find('.title').innerHeight()));
		const x = myLayer.find('.layer_close');
		const cancel = myLayer.find('.cancel');
		const tmAreaSize = myLayer.find('.today_message').length ? myLayer.find('.today_message').innerHeight() : 0;
		const btnSize = myLayer.find('.btn_group').length ? myLayer.find('.btn_group').innerHeight() : 0;
		myLayer.find('.layer_contents').css('height', ((layerSize - gap) - (tmAreaSize + btnSize)) + 'px');
		x.off('click').on('click', function() {
			myLayer.hide();
			dimmed.hide();
			$('body').removeClass('scroll_off');
			$(target) && $(target).focus();
		});
		cancel.off('click').on('click', function() {
			myLayer.hide();
			dimmed.hide();
			util.scrollClear(thisPoint);
			$(target) && $(target).focus();
		});
	}
}

ui.alertCall = (id, target) => { // 열리는 레이어 id, 창 닫힌 후 포커스 이동할 타겟
	console.log("alertCallalertCallalertCallalertCallalertCall");
	const myLayer = $('#' + id);
	const dimmed = $('.dimmed');
	const thisPoint = $(window).scrollTop();
	if (myLayer.length && dimmed.length) {
		dimmed.css('z-index', '300');
		dimmed.show();
		myLayer.show().focus();
		$('body').addClass('scroll_off');
		$(window).scrollTop(thisPoint);
		const layerSize = myLayer.outerHeight();
		const gap = (+(myLayer.css('padding-top').replace('px', '')) + +(myLayer.find('.title').innerHeight()));
		const x = myLayer.find('.layer_close');
		const cancel = myLayer.find('.cancel');
		const tmAreaSize = myLayer.find('.today_message').length ? myLayer.find('.today_message').innerHeight() : 0;
		const btnSize = myLayer.find('.btn_group').length ? myLayer.find('.btn_group').innerHeight() : 0;
		myLayer.find('.layer_contents').css('height', ((layerSize - gap) - (tmAreaSize + btnSize)) + 'px');
		x.off('click').on('click', function() {
			myLayer.hide();
			dimmed.removeAttr('style');
			dimmed.hide();
			$('body').removeClass('scroll_off');
			$(target) && $(target).focus();
		});
		cancel.off('click').on('click', function() {
			myLayer.hide();
			dimmed.removeAttr('style');
			dimmed.hide();
			util.scrollClear(thisPoint);
			$(target) && $(target).focus();
		});
	}
}

ui.tabMenu = () => {
	const basicInteraction = {
		// tabMenuAlign: () => {
		// 	let boxSize = 0;
		// 	$('.tab_menu').each(function() {
		// 		boxSize = $(this).outerWidth();
		// 		const ul = $(this).find('> ul');
		// 		ul.removeAttr('style');
		// 		if($(this).hasClass('small')) {
		// 			util.ulSizeCall(ul, boxSize, true);
		// 		} else {
		// 			util.ulSizeCall(ul, boxSize, false);
		// 		}
		// 	});
		// },
		tabScroll: () => {
			$('.tab_menu* > ul > li.on > button').each(function() {
				const beParent = $(this).closest('.tab_menu*');
				let left = 0;
				for(let i = 0; i < $(this).parent().index(); i++) {
					left += Number(beParent.find('> ul > li').eq(i).outerWidth());
				}
				beParent.scrollLeft(left);
			});
		}
	}
	basicInteraction.tabScroll();
	$('.tab_menu* > ul > li > button').on('click', function() {

		const contentsArea = $(this).closest('.tab_menu*').data('target');
		const myIndex = $(this).closest('li').index();
		$(this).closest('li').siblings().removeClass('on');
		$(this).closest('li').siblings().children('button').attr("aria-selected", "false");
		$(this).closest('li').addClass('on');
		$(this).closest('li').children('button').attr("aria-selected", "true");
		if (contentsArea != null && contentsArea != "" && $('#' + contentsArea).length) {
			$('#' + contentsArea).find('> div').hide();
			$('#' + contentsArea).find('> div').eq(myIndex).show();
		}
		basicInteraction.tabScroll();
	});
}

ui.select = () => {
	$('.select_btn').off('click').on('click', function() {
		if(!$(this).hasClass('disabled')){
			const layer = $(this).closest('.select_area').find('.select_layer');
			const dimmed = $('.dimmed');
			util.scrollStop();
			layer.show();

			// 2025.02.11 팝업 내 레이어 호출 시 팝업 스크롤 되는 현상 수정 - HI
			// 팝업 페이지에서 레이어 팝업 호출 시
			if ($(".popup_full:visible").length > 0) {
				// 팝업 페이지 스크롤 막기
				$(".popup_full:visible").css("overflow-y", "hidden");
			}


			if ($(this).closest('.contents_popup,.layer_contents').length) {
				$(this).closest('.contents_popup,.layer_contents').append('<div class="dimmed" style="z-index: 290; display: block;"></div>');
			} else {
				dimmed.css('z-index', '290').show();
			}

			const pEl = layer.children('ul').children('li').children('button').first().attr("data-link");
			var pVal = $("#"+pEl).val();

			const child = $(this).closest('.select_area').find('.select_layer').children('ul').first().children('li').children('button');

			child.each(function() {

				if(pVal == $(this).attr("data-selval")) {
					$(this).focus();
				}

			});

		}
	});

	$('.select_close').off('click').on('click', function() {

		// 2025.02.06 팝업 중복 스크롤 이슈 수정 - HI
		if ($(".popup_full:visible").length == 0) {
			util.scrollClear();
		}

		// 2025.02.11 팝업 내 레이어 호출 시 팝업 스크롤 되는 현상 수정 - HI
		// 팝업 페이지에서 레이어 팝업 종료 시
		if ($(".popup_full:visible").length > 0) {
			// 팝업 페이지 스크롤 막은 것 풀기
			$(".popup_full:visible").css("overflow-y", "");
		}

		const layer = $(this).closest('.select_area').find('.select_layer');
		$(this).closest('.select_area').find('.select_btn').focus();

		const dimmed = $('.dimmed');
		layer.hide();
		dimmed.removeAttr('style').hide();
		if ($(this).closest('.contents_popup,.layer_contents').length) {
			$(this).closest('.contents_popup,.layer_contents').find('.dimmed').remove();
		}
	});

	$('.select_option > li > button').off('click').on('click', function() {
		// 2025.02.06 팝업 중복 스크롤 이슈 수정 - HI
		if ($(".popup_full:visible").length == 0) {
			util.scrollClear();
		}

		// 2025.02.11 팝업 내 레이어 호출 시 팝업 스크롤 되는 현상 수정 - HI
		// 팝업 페이지에서 레이어 팝업 종료 시
		if ($(".popup_full:visible").length > 0) {
			// 팝업 페이지 스크롤 막은 것 풀기
			$(".popup_full:visible").css("overflow-y", "");
		}

		const thisTxt = $(this).text();
		$(this).closest('.select_area').find('.select_btn').text(thisTxt);
		const layer = $(this).closest('.select_area').find('.select_layer');
		$(this).closest('.select_area').find('.select_btn').focus();

		const dimmed = $('.dimmed');
		layer.hide();
		dimmed.removeAttr('style').hide();
		if ($(this).closest('.contents_popup,.layer_contents').length) {
			$(this).closest('.contents_popup,.layer_contents').find('.dimmed').remove();
		}
	});
}

ui.accordion = () => {
	$('.ui-accordion_btn').off('click').on('click', function () {
		var parentAccordion = $(this).parents('.accordion:eq(0)');
		if (parentAccordion.hasClass('manual')) {
			// 이미 열려있는 아코디언 자동으로 닫히지 않게 하는 코드
			if($(this).closest('li').hasClass('on')) {
				$(this).next('.accordion_contents').stop().slideUp('fast');
				$(this).closest('li').removeClass('on');
			} else {
				$(this).next('.accordion_contents').stop().slideDown('fast');
				$(this).closest('li').addClass('on');
				ui.tabMenu();
			}
		} else {

			if($(this).closest('li').hasClass('on')) {
				$(this).next('.accordion_contents').stop().slideUp('fast');
				$(this).closest('li').removeClass('on');
				$(this).attr("aria-expanded", "false");
				// 더보기 버튼 텍스트 변경 HPWKPA1300M02
				if($(this).find('.more_acco_btn')) {
					$(this).find('.more_acco_btn').text("더보기");
				}
			} else {
				$(this).closest('.accordion').find('> ul > li').removeClass('on');
				$(this).closest('.accordion').find('.accordion_contents').stop().slideUp('fast');
				$(this).next('.accordion_contents').stop().slideDown('fast');
				$(this).closest('li').addClass('on');
				$(this).attr("aria-expanded", "true");
				// 더보기 버튼 텍스트 변경 HPWKPA1300M02
				if($(this).find('.more_acco_btn')) {
					$(this).find('.more_acco_btn').text("접기");
				}
				ui.tabMenu();
			}
		}

	});

	$('.menu-accordion_btn').off('click').on('click', function () {

		var menuPurpSecd = $(this).data("menuPurpSecd");
		var menuSjnm = $(this).data("menuSjnm");

		//var color = '#29c78e';
		var color = 'var(--col_green2)';

		var bExpandFlag = $(this).closest('li').hasClass('on');

//		if(menuPurpSecd == "EBM01")
		// TODO GNB 개편때 수정해야됨 20250707
		if(menuPurpSecd == "EBM00")
			color = '#4d65e1';

		$('.menu-accordion > ul > li').removeClass('on');
		$('.accordion_contents').stop().slideUp('fast');
		$('.menu-accordion_btn > strong').css('color', '');

		if(bExpandFlag) {
			$(this).next('.accordion_contents').stop().slideUp('fast');
			$(this).closest('li').removeClass('on');
			$(this).closest('.menu-accordion > ul > li').first().find('.menu-accordion_btn > strong').css('color', '');
			$(this).closest('.menu-accordion > ul > li').first().find('.menu-accordion_btn > span').attr('title', menuSjnm + ' 닫힘');
			$(this).closest('.menu-accordion > ul > li').first().find('.menu-accordion_btn > span').attr("aria-expanded", "false");
		} else {
			$(this).closest('.menu-accordion').find('> ul > li').removeClass('on');
			$(this).closest('.menu-accordion').find('.accordion_contents').stop().slideUp('fast');
			$(this).next('.accordion_contents').stop().slideDown('fast');
			$(this).closest('li').addClass('on');
			$(this).closest('.menu-accordion > ul > li').first().find('.menu-accordion_btn > strong').css('color', color);
			$(this).closest('.menu-accordion > ul > li').first().find('.menu-accordion_btn > span').attr('title', menuSjnm + ' 펼쳐짐');
			$(this).closest('.menu-accordion > ul > li').first().find('.menu-accordion_btn > span').attr("aria-expanded", "true");
		}


	});

	// 아코디언 전체 펼치기, 접기 버튼
	$('.acd_all_btn').on('click',function(){
		if($(this).hasClass('all')) {
			$(this).removeClass('all');
			$('.accordion > ul > li').removeClass('on');
			$('.accordion_contents').stop().slideUp('fast');
			$(this).text("펼치기");
		} else {
			$(this).addClass('all');
			$('.accordion > ul > li').addClass('on');
			$('.accordion_contents').stop().slideDown('fast');
			$(this).text("접기");
		}

	});
}

ui.radioGroup = () => {
	$('.radio_group').each(function() {
		const raDiv = $(this).find('.radio_area');
		raDiv.each(function(index, item) {
			if($(item).offset().left < 100) {
				$(item).css('margin-left', '0');
			}
			if($(item).offset().top > raDiv.eq(0).offset().top) {
				$(item).css('margin-top', '1rem');
			}
		});
	});
}

ui.overBoxSize = (box) => {
	let iCnt = 0;
	$(box).each(function() {
		const els = $(this).find('> *');
		let elSize = 0;
		els.each(function(index, item) {

			if($(item).css("display") != "none")
				elSize = (elSize + ($(item).outerWidth() + Number($(item).css('margin-left').replace('px', ''))));
		});
		$(this).css({ 'width': elSize + 'px', 'display' : 'flex', 'align-items' : 'center' });
		iCnt = iCnt + 1;
	});

	//console.log("iCnt =========== ", iCnt);
}

ui.popInnerScr = () => {
	// $('.popup_full').each(function() {
	// 	const popupH = $(this).innerHeight();
	// 	const headerH = $(this).find('.popup_header').innerHeight();
	// 	const btnH = $(this).find('> .btn_group').length ? $(this).find('> .btn_group').outerHeight() : 0;
	// 	$(this).find('.contents_popup').css({'height': (popupH - (headerH + btnH)) + 'px'});
	// });
}

ui.board_fold_onoff = (obj) => {
    if(obj.closest('.board_list .board_list_item').classList.contains('on')){
		obj.querySelector('.blind').innerText = '열기';
        obj.closest('.board_list').querySelectorAll('.board_list_item').forEach(element => {
			//console.log(element.querySelectorAll('.btn_fold .blind'));
			element.querySelector('.btn_fold .blind').innerText = '열기';
            element.classList.remove('on');
        });
    }else{
        obj.closest('.board_list').querySelectorAll('.board_list_item').forEach(element => {
			element.querySelector('.btn_fold .blind').innerText = '열기'
            element.classList.remove('on');
        });
		obj.querySelector('.blind').innerText = '닫기';
        obj.closest('.board_list .board_list_item').classList.add('on');
    }
 }

//  if(this.dataset.item) {
// 	let dataName = this.dataset.item;

// 	let dataItem = document.querySelectorAll(`[data-parent="${dataName}"]`);


 ui.btnFolder = () => {
	$('.btn_txt_fold').on('click', function(){
		$(this).attr('button');
		const _text = $(this).find('.txt');
		const _textSec = $(this).find('.txt_sec');
		const _textView = $(this).find('.text_view');
		const slideBtn = $(this).hasClass('on');

		if(slideBtn) {
			$(this).removeClass('on');

			//중복일 경우: 높이값 조절 안 됨
			if($(this).data('item')) {
				let dataName = $(this).data('item');
				let dataItem = $(`[data-parent="${dataName}"]`);

				$(dataItem).stop().slideDown();
			} else {
				$( '.slide_list02').animate({maxHeight: '100vh'});
				$('.slide_list').stop().slideDown();
			}

			_text.text('닫기');
			_textSec.text('접기');
			_textView.text('간략히 보기');
		} else {
			$(this).addClass('on');

			//중복일 경우: 높이값 조절 안 됨
			if($(this).data('item')) {
				let dataName = $(this).data('item');
				let dataItem = $(`[data-parent="${dataName}"]`);

				$(dataItem).stop().slideUp();
			} else {
				$( '.slide_list02').animate({maxHeight: '70px'});
				$('.slide_list').stop().slideUp();
			}

			_text.text('열기');
			_textSec.text('펼치기');
			_textView.text('자세히 보기');
		}
	});
}

ui.detailLayer = () => {
	$('.search_area .btn_detail').unbind('click');
	$('.search_area .btn_detail').on('click', function() {

		const $this = $(this);
		// 2024.12.10 검색 상세 버튼 클릭 시 뒷부분 스크롤 되는 현상 수정 - HI
		$('html,body').addClass('scroll_off');
		$('html,body').on('touchmove', function(e){
			e.preventDefault();
		});

		$('.popup_full:not(.abc)').show().focus();

		const myLayer = $('.popup_full:not(.abc)');

		$('header, .floating').attr('aria-hidden', true);

		const mDiv = $('form > div');
		mDiv.each(function(index) {
			if($(this).attr("class") != myLayer.attr("class")) {
				$(this).attr('aria-hidden', true);
			}
		});

		const childClose = $('.popup_full .popup_close').last();
        const childInput = myLayer.find('input:not([type=hidden]), select , button, radio, checkbox, a:not(.closed)');

		if(childInput.length != 0) {
			childInput.first().focus();
		} else if(childClose.length != 0) {
			childClose.focus();
		}

		$('.dimmed').remove('style');

		ui.mapClick();

		$('.popup_close').on('click', function() {
			mDiv.each(function(index) {
				$(this).removeAttr('aria-hidden');
			});

			// 2024.12.10 검색 상세 버튼 클릭 시 뒷부분 스크롤 되는 현상 수정 - HI
			util.scrollClear();
			$('header, .contents, .floating').attr('aria-hidden', false);
			$('html,body').removeClass('scroll_off');
			$('html,body').off('touchmove');

			$('.popup_full').hide();
			$('.dimmed').remove('style');
			$this.focus();
		});


	});

	$('.layer_all_popup').on('click', function() {
		const $this = $(this);
		const detailLayer = $('#' + $this.data('full-detail'));
		detailLayer.attr('tab-index', '0');
		detailLayer.show().focus();
		$('.dimmed').remove('style');
		ui.mapClick();
	});

	$('.popup_close').on('click', function() {
		// 2024.12.10 검색 상세 버튼 클릭 시 뒷부분 스크롤 되는 현상 수정 - HI
		util.scrollClear();
		$('header, .contents, .floating').attr('aria-hidden', false);
		$('html,body').removeClass('scroll_off');
		$('html,body').off('touchmove');

		$('.popup_full').hide();
		$('.dimmed').remove('style');
		$('.search_area .btn_detail').focus();
	});

	$('.detail_all_layer .popup_close').on('click', function () {
		util.scrollClear();
		$('header, .contents, .floating').attr('aria-hidden', false);
		$('.detail_all_layer').hide();
		$('.popup_full').attr('tab-index', '0');
		$('.popup_full:not(.abc)').show().focus();
		//$('.popup_full:not(.temp)')
	});
}

ui.scrollEvent = function() {
	//console.log('scroll');

	$('.flexible_contents_area').each(function() {
		const $this = $(this);
		const box = $this.find('.scroll');
		const tabMenu = $this.find('.scroll_tabmenu');
		const tabList = tabMenu.find('> ul > li');
		const btn = tabMenu.find('> ul > li > button');
		tabList.removeClass('on');
		tabList.eq(0).addClass('on');
		const scrollPoint = tabMenu.offset().top;
		const tabScroll = () => {
			$('.tab_menu* > ul > li.on > button').each(function() {
				const beParent = $(this).closest('.tab_menu*');
				let left = 0;
				for(let i = 0; i < $(this).parent().index(); i++) {
					left += Number(beParent.find('> ul > li').eq(i).outerWidth());
				}
				beParent.scrollLeft(left);
			});
		}
		$(window).scroll(function() {
			//console.log('scroll');
			const scroll = $(this).scrollTop();
			//console.log(scroll)

			if (scroll > scrollPoint) {
				tabMenu.addClass('fixed');
			} else {
				tabMenu.removeClass('fixed');
			}
			box.each(function(index, item) {
				if (item.getBoundingClientRect().top < 200) {
					tabList.removeClass('on');
					tabList.eq(index).addClass('on');
					tabScroll();
				}
			});
		});
		btn.off('click').on('click', function() {
			const myIndex = $(this).parent('li').index();
			$('html, body').stop().animate({ scrollTop : (box.eq(myIndex).offset().top) - 100 }, 200);
		});
	});
}

ui.mapClick = function() {
	$('.map-area > ul > li > button').off('click').on('click', function() {
		const myText = $(this).text();
		const myTarget = $(this).parent().data('target');
		$(this).parent('li').siblings().removeClass('on');
		$(this).parent('li').addClass('on');
		$('.region_title').text(myText);
		$('.region_group > ul').hide();
		$('#' + myTarget).show();
	});

	$('.region_group > ul > li > button').off('click').on('click', function() {
		$(this).parent('li').siblings().removeClass('on');
		$(this).parent('li').addClass('on');
	});
}

// 모바일 popup h1 -> h2 변경
$(function() {
	var headers = document.querySelectorAll('.popup_header');

	headers.forEach(function(header) {
		var h1Element = header.querySelector('h1');

		if(h1Element) {
			var h2Element = document.createElement('h2');
			h2Element.innerHTML = h1Element.innerHTML;

			h2Element.classList.add('popup_title');

			h1Element.parentNode.replaceChild(h2Element, h1Element);
		}
	})
})

	// 모바일 테이블에 scope 넣기
$(function() {
	var tables = document.querySelectorAll('table');

	tables.forEach(function(table) {
		var thead = table.querySelector('thead');
		var tbody = table.querySelector('tbody');

		if(thead) {
			var theadThs = thead.querySelectorAll('th');
			theadThs.forEach(function(th) {
				th.setAttribute('scope', 'col');
			});
		}

		if(tbody) {
			var tbodyThs = tbody.querySelectorAll('td');
			tbodyThs.forEach(function(td) {
				td.setAttribute('scope', 'col');
			});
		}


	});

	var checkboxs = document.querySelectorAll("input[type=checkbox]");

	//console.log("checkboxs ============", checkboxs);
	checkboxs.forEach(function(chk) {
		chk.setAttribute('role', 'checkbox');
	});

	var radios = document.querySelectorAll("input[type=radio]");

	//console.log("radios ============", radios);
	radios.forEach(function(rdo) {
		rdo.setAttribute('role', 'radio');
	});
})

$(function() {

	//if (window && window.ReactNativeWebView) {

		//if(ComLib.deviceInfo)
			//console.log("mobile_ui.js =====>", ComMobLib.chkVersionDevice());
	//}
	/////// 공통 함수 실행
	// bottom layer
	$('.ui-layer').length && ui.layerCall();
	// tab menu
	$('.tab_menu*').length && ui.tabMenu();
	// select
	$('.select_btn').length && ui.select();
	// accordion
	$('.accordion').length && ui.accordion();
	// radio group align
	$('.radio_group').length && ui.radioGroup();
	// form size
	$('.over_box').length && ui.overBoxSize('.over_box > div');
	// form size list type
	$('.form_list').length && ui.overBoxSize('.form_list .write_form_area > div');
	// text fold button
	$('.btn_txt_fold').length && ui.btnFolder();

	// $('.popup_full').length && ui.popInnerScr();

	// progress 유형선택
	lin.progress();
});

// select alert 동적일때
$(document).on("click", '.select_btn', function(){
	$('.select_btn').length && ui.select();
});

$(window).resize(function() {
	/////// Resize 공통 함수 실행
	// tab menu
	$('.tab_menu*').length && ui.tabMenu();
	// radio group align
	$('.radio_group').length && ui.radioGroup();
	// form size
	$('.over_box').length && ui.overBoxSize('.over_box > div');
	// form size list type
	$('.form_list').length && ui.overBoxSize('.form_list .write_form_area > div');

	$('.popup_full').length && ui.popInnerScr();
});


// 메인 스와이퍼 높이값 조정
document.addEventListener("DOMContentLoaded", function(){
	// 2024.12.16 화면 최상단 시 맨 위로 버튼 숨기기 처리 - HI
	$(".quick_top").css("display", "none");

	let serviceSwiper = document.querySelector('.service_swiper_wrap.type02');

	if(serviceSwiper) {
		let serviceListTit = document.querySelectorAll('.service_swiper_wrap.type02 .service_list .tit');
		let titH = [];

		serviceListTit.forEach(function(item){
			titH.push(item.offsetHeight);
		});

		let titHMax = Math.max(...titH);

		serviceListTit.forEach(function(item){
			item.style.height = titHMax + 'px';
		});

		serviceSwiper.querySelectorAll('.swiper-slide').forEach(function(item){
			item.style.height = serviceSwiper.offsetHeight + 'px';
		});
	}

	// 2024.12.16 화면 최상단 시 맨 위로 버튼 숨기기 처리 - HI
	window.addEventListener("scroll", function () {
		if(window.scrollY === 0) {
			$(".quick_top").css("display", "none");
		} else {
			$(".quick_top").css("display", "block");
		}


	});

});

