// 기존 include.js 파일은 개발환경에서만 보여 html 내용 정리용도로 js파일을 사용.
// 현재 파일은 일반 file:/// 환경에서도 작동하기에 해당 파일을 공유용 js파일로 사용.

const includes = {
    header: `
        <header>
            <script type="text/javascript">
                var popList = '';
                //메시지 출력
                if (``) {
                    alert(``);
                } else if (``) {
                    alert(``);
                }if ("") {
                    var strUrl = "";
                    if(strUrl.indexOf("Post.do") <= -1){
                        location.href = strUrl;
                    }else{
                        var form = new FormLib.Form();
                        form.createForm("dummy0001", strUrl, "POST", null,null).addHidden("_csrf", $("meta[name='_csrf']").attr("content"));
                        form.addBody();        ComLib.submit("dummy0001");
                    }
                }function fn_saveSurvay(){
                    if($("#satisRgstedYn").val() == "Y"){
                        alert("만족도조사는 1번만 가능합니다");
                        return;
                    }	$("input[name='rating']:checked").val();	var data = {
                            "stdgTrgtMenuId" : _menuId
                        , "stdgTrgtUrla": window.location.href
                        , "stdgScor" : $("input[name='rating']:checked").val()
                        , "stdgQsinRspnCn" : $("#stdgQsinRspnCn").val()
                        , "stdgQsinDsfcCn" : $("#stdgQsinDsfcCn").val()
                        , "evtAgreeYn" : $("#evtAgreeYn").val()
                    };	var request = ComLib.ajaxReqObj("/wk/common/insertSatifyRate.do", data);
                    request.done(function (responseObj, statusText, xhr) {
                        $("#satisRgstedYn").val("Y");
                        if($("#evtAgreeYn").val() == "Y"){
                            alert("이벤트 참여가 완료되었습니다.\n소중한 의견 감사합니다.");
                        }else{
                            alert('소중한 의견 감사합니다.');
                        };
                    });
                }$(document).ready(function() {    var showSearchFlag = "";    if(!ComLib.isEmpty(showSearchFlag)) {
                        $(".header_search").hide();
                    } else {
                        $(".header_search").show();
                    }    $('.btn_quick_login').on('click', function() {
                        $('.quick_login_guide').toggle();
                    });	//금지여부 체크
                    fn_checkProhibit();
                    fn_checkMenuAuth();    $("#btn_survayRate").on("click", function() {
                        fn_saveSurvay();
                    });	//추천검색어
                    var recommandMode = 'EXPIRED';
                    var myRecommandListmm;
                    if(localStorage.recommandWordObj == null){
                        var recommandMode = 'EXPIRED';
                    }else{
                        myRecommandListmm = JsonLib.parse(localStorage.getItem("recommandWordObj"));
                        if(myRecommandListmm.expday != DateLib.getToday("YYYYMMDD")){
                            recommandMode = 'EXPIRED';
                        } else {
                            recommandMode = 'KEEP';
                        }
                    }	// 상단 배너 - play, pause 버튼 클릭 시
                    $(document).on('click', '.noti_banner_slide .btn', function() {
                        if($(this).hasClass('noti_pause')) {
                            headerNotiSwiper01.autoplay.pause();
                            $(this).hide();
                            $('.btn.noti_play').show();
                        } else {
                            headerNotiSwiper01.autoplay.start();
                            $(this).hide();
                            $('.btn.noti_pause').show();
                        }
                    });
                    // 상단 배너 닫기
                    $('.top_noti_area .btn_close').on('click', function() {
                        $('.top_noti_area').hide();
                    });
                    // 상단 배너
                    var headerNotiSwiper01 = new Swiper(".noti_banner_slide", {
                        direction: "vertical",
                        autoplay: {
                            delay: 3500,
                        },
                        loop: true,
                    });	if(recommandMode == 'EXPIRED'){
                        var request = ComLib.ajaxReqObj("/cm/f/c/0100/retrieveRecommandWord.do", {"query":""});
                        var recommandWordObj = {};
                        recommandWordObj.expday = DateLib.getToday("YYYYMMDD");		request.done(function(responseObj, statusText, xhr) {			recommandWordObj.wordList = [];
                            if(responseObj.recommandValue == null){
                                return;
                            }
                            //2025-03 추천검색어 return값 구조 변경으로 인하여 처리
                            //if(responseObj.recommandValue.Data.Return > 0){
                            //	$("#sub_recommendArea").empty();
                            //	for(var idx in responseObj.recommandValue.Data.Word){
                            //		var w = responseObj.recommandValue.Data.Word;
                            //		$("#sub_recommendArea").append('<li><a href="javascript:void(0);" onclick="fn_subPopWordClick(\''+w[idx]+'\')">'+w[idx]+'</a></li>');
                            //		recommandWordObj.wordList.push(w[idx]);
                            //	}
                            //	localStorage.setItem("recommandWordObj", JsonLib.stringify(recommandWordObj) );
                            //}
                            if(responseObj.recommandValue.result.TotalCount > 0){
                                $("#sub_recommendArea").empty();
                                var wordArr = [];
                                for(var i=0; i<responseObj.recommandValue.result.Item.length; i++){
                                    wordArr.push(responseObj.recommandValue.result.Item[i].Word);
                                }
                                for(var idx in wordArr) {
                                    var w = wordArr;
                                    $("#sub_recommendArea").append('<li><a href="javascript:void(0);" onclick="fn_subPopWordClick(\''+w[idx]+'\')">'+w[idx]+'</a></li>');
                                    recommandWordObj.wordList.push(w[idx]);
                                }
                                localStorage.setItem("recommandWordObj", JsonLib.stringify(recommandWordObj) );
                            }
                        });
                    }else{ // KEEP
                        myRecommandListmm = JsonLib.parse(localStorage.getItem("recommandWordObj"));		for(var idx in myRecommandListmm.wordList){
                            var w = myRecommandListmm.wordList[idx];
                            $("#sub_recommendArea").append('<li><a href="javascript:void(0);" onclick="fn_subPopWordClick(\''+w+'\')">'+w+'</a></li>');
                        }
                    }
                    //엔터키 이벤트
                    $("#sub_topQuery").keydown(function(theEvent){
                        var keyCode=window.event?event.keyCode:theEvent.which;
                        if(keyCode== 13){
                            $("#sub_findSearchData").click();
                            return false;
                        }
                    });    $("#sub_findSearchData").on('click', function() {
                        $("#sub_topQueryData").val($("#sub_topQuery").val());
                        var ret = $("#sub_topQueryData").val();
                        if(ret != "" && ret != null){
                            //검색어 인코딩 --S
                            $("#sub_topQueryData").val(encodeURIComponent($("#sub_topQueryData").val()));
                            //검색어 인코딩 --E
                            ComLib.submit("subSearchDataForm");
                        }else{
                            $("#sub_topQuery").focus();
                            alert("검색어를 입력하세요.");
                        }
                    });// 	$('ul.header_util .header_search a:first').on('click', function(){
                // 		$("#sub_keyword").empty();
                // 	    $("#sub_topQuery").val("");
                // 	    $(".layer_auto_search_wrap").css("display", "none");// 	    if($('.sub_search_wrap').hasClass('active')){
                // 	        $('.sub_search_wrap').removeClass('active');
                // 	        $(this).removeClass('on');
                // 	        $(".layer_search.layer_cate_search").css("display", "none");
                // 	        $("#sub_topQuerySelect").attr("title","검색 유형 열기");
                // 	    } else {
                // 	        $('.sub_search_wrap').addClass('active');
                // 	        $(this).addClass('on');
                // 	        $("#sub_topQuerySelect").focus();
                // 	    }// 	});	$('#sub_topQuerySelect').on('click', function(){//		if($(".layer_search.layer_cate_search").css('display') == 'none'){
                //			$(".layer_search.layer_cate_search").css("display", "block");
                        if($("#sub_topQueryCateLayer").css('display') == 'none'){
                            $("#sub_topQueryCateLayer").css("display", "block");			$("#sub_topQuerySelect").attr("title","검색 유형 닫기");			$('.layer_search.layer_cate_search ul li a').each(function(){
                                $(this).removeClass('active');
                // 				$(this).attr("aria-selected", "false");
                                $(this).attr("title",$(this).attr("data-title"));				if($("#sub_topQuerySearchArea").val() == $(this).data('value')) {					$(this).addClass("active");
                // 					$(this).attr("aria-selected", "true");
                                    $(this).attr("title",$(this).attr("data-title")+" 선택함");
                                    $(this).focus();
                                }
                            });		}else{
                            $(".layer_search.layer_cate_search").css("display", "none");
                            $("#sub_topQuerySelect").attr("title","검색 유형 열기");
                        }	});	$('.layer_search.layer_cate_search ul li a').on('click', function(){
                        $('.layer_search.layer_cate_search ul li a').each(function(){
                            $(this).removeClass('active');
                // 			$(this).attr("aria-selected", "false");
                            $(this).attr("title",$(this).attr("data-title"));
                        });
                        $(this).addClass("active");
                // 		$(this).attr("aria-selected", "true");
                        $(this).attr("title",$(this).attr("data-title")+" 선택함");		$("#sub_topQuerySelect span").text($(this).data('title'));
                        $("#sub_topQuerySearchArea").val($(this).data('value'));
                        $(".layer_search.layer_cate_search").css("display", "none");
                        $("#sub_topQuerySelect").attr("title","검색 유형 열기");
                        $("#sub_topQuerySelect").focus();
                    });	$("#sub_topQuery").autocomplete({
                        source: function(req,res){
                // 			req.term = StrLib.trimSpecialChar(req.term);
                            $("#sub_topQuery").val(req.term);
                            if( req.term == null || req.term == '') { return };
                            var request = ComLib.ajaxReqObj("/cm/f/c/0110/autoComplete.do", {"query": encodeURIComponent(req.term)});
                            request.done(function (responseObj, statusText, xhr) {
                                $("#sub_keyword").empty();
                                $("#sub_policyList").empty();
                            //	2025-03
                            //	var retList = responseObj.ret.result;
                            //	var retList2 = [];
                            //	if(responseObj.retList2.result != null){
                            //		retList2 = responseObj.retList2.result[0].items;//정책
                            //	}
                            //	let mergeAry = new Array();
                            //	$.each(retList,function(i,key){//배열 합치고
                            //		if(retList[i].totalcount > 0){
                            //			mergeAry = $.merge(mergeAry, retList[i].items);
                            //		}
                            //	});
                                var retList;
                                let mergeAry = new Array();
                                if(null != responseObj.ret){ //2025-03 자동완성 결과 없을 경우 처리 추가
                                    retList = responseObj.ret.result;					$.each(retList,function(i,key){//배열 합치고
                                        //if(retList[i].totalcount > 0){
                                        if(retList[i].totalCount > 0){
                                            mergeAry = $.merge(mergeAry, retList[i].items);
                                        }
                                    });
                                    $.each(mergeAry,function(i,key){//label 추가 한다.
                                        mergeAry[i].label = mergeAry[i].hkeyword;
                                    });
                                }
                                var retList2 = [];
                                //if(responseObj.retList2.result != null){
                                //	retList2 = responseObj.retList2.result[0].items;//정책
                                //}
                                if(null != responseObj.retList2){ //2025-03 자동완성 결과 없을 경우 처리 추가
                                    if(responseObj.retList2.result != null){
                                        retList2 = responseObj.retList2.result[0].items;//정책
                                    }
                                }
                                if(mergeAry != null && mergeAry.length > 0){
                                    $(".layer_auto_search_wrap").css("display", "");
                                    if(retList2 != null && retList2.length > 0){
                                        $.each(retList2,function(i,key){
                                            var hkeyword = retList2[i].hkeyword.replace("@stag@","<span class='point_color02'>").replace("@etag@","</span>");
                                            var sp = retList2[i].linkUrl.split('?wn?');
                                            if(retList2[i].linkName=="menu"){
                                                //contextPath, menuId, strUrl, menuPurpSecd, pwdCfrmYn, netFunnel
                                                var ret = '<li class="txt_list"><a href="#none" onclick="fn_goPageUrl(\''+ sp[0] +'\', \''+sp[2]+'\', \''+sp[1]+'\', \''+sp[3]+'\');">'+hkeyword+'</a></li>';
                                            }else{
                                                var ret = '<li class="txt_list"><a href="#none" onclick="fn_goPolicyIntrotop(\''+ sp[1] +'\', \''+sp[0]+'\');">'+hkeyword+'</a></li>';
                                            }
                                            $("#sub_policyList").append(ret);
                                        });
                                    }
                                }else if(retList2 != null && retList2.length > 0){
                                    $.each(retList2,function(i,key){
                                        //2025-03
                                        var hkeyword = retList2[i].hkeyword.replace("@stag@","<span class='point_color02'>").replace("@etag@","</span>");
                                        var sp = retList2[i].linkUrl.split('?wn?');
                                        if(retList2[i].linkName=="menu"){
                                            var ret = '<li class="txt_list"><a href="#none" onclick="fn_goPageUrl(\''+ sp[0] +'\', \''+sp[2]+'\', \''+sp[1]+'\', \''+sp[3]+'\');">'+hkeyword+'</a></li>';
                                        }else{
                                            var ret = '<li class="txt_list"><a href="#none" onclick="fn_goPolicyIntrotop(\''+ sp[1] +'\', \''+sp[0]+'\');">'+hkeyword+'</a></li>';
                                        }
                                        $("#sub_policyList").append(ret);
                                    });					$(".layer_auto_search_wrap").css("display", "");
                                }
                                res(mergeAry);//autocomplete에 추가 한다.
                            });
                        },
                        focus: function(event, item){
                            return false;
                        },
                        delay: 600,
                        minLength: 2,
                        autofocus: true
                    });	//검색창 입력값 특수문자 제거 로직
                // 	$("#sub_topQuery").keypress(function(e){ $(this).val(StrLib.trimSpecialChar($(this).val())) });
                // 	$("#sub_topQuery").keyup(	function(e){ $(this).val(StrLib.trimSpecialChar($(this).val())) });	$("#sub_topQuery").keyup(function(){
                        var ret = $(this).val();
                        if(ret == ""){
                            $("#sub_keyword").empty();
                            $("#sub_policyList").empty();
                            $(".layer_search.layer_cate_search").css("display", "none");
                            $(".layer_auto_search_wrap").css("display", "none");
                        }
                    });
                    //css변경 및 제어등
                    $("#sub_topQuery").autocomplete("instance")._renderItem = function(ul, item){
                        //2025-03 자동완성 v7 하이라이팅 수정
                        var hkeyword = item.hkeyword.replace("@stag@","<span class='point_color02'>").replace("@etag@","</span>");
                        var ret = '<li><a href="javascript:void(0);" onclick="fn_subTopQuerySet(\''+item.value+'\')">'+hkeyword+'</a></li>';
                        return $( ret ).appendTo( $("#sub_keyword") );
                    };
                });function fn_checkMenuAuth(){
                    if(document.referrer != '') return;
                    if(location.pathname == "/cm/z/b/0210/openLginPage.do") return ;
                    if(location.pathname == "/cm/main.do") return ;	var menuId = "";
                    var menuUrla = "";
                    var menuPurpSecd = "";
                    var pwdCfrmYn = "";	 var data = {
                            "url" : location.pathname
                    };
                    var request = ComLib.ajaxReqObj("/wk/cmm/menu/checkMenuAuth.do", data, false);
                    request.done(function (responseObj, statusText, xhr) {		 if(responseObj != null){
                            menuId 		= responseObj.menuInfo.menuId;
                            menuUrla 		= responseObj.menuInfo.menuUrla;
                            menuPurpSecd 	= responseObj.menuInfo.menuPurpSecd;
                            pwdCfrmYn 		= responseObj.menuInfo.pwdCfrmYn;
                        }
                    });	fn_checkAuth("/wk", menuId, menuUrla, "EBM01", pwdCfrmYn,)}
                function fn_checkProhibit(){	var request = ComLib.ajaxReqObj("/wk/cmm/menu/checkProhibitedUrl.do", data);
                    var data = {
                            "menuId" : _menuId
                        , "stdgTrgtUrla": window.location.href
                    };	 request.done(function (responseObj, statusText, xhr) {
                        if(responseObj.auth == 'fail'){
                            alert(responseObj.authMsg);
                            location.href = responseObj.authRedirect;
                        }
                    });
                }//개인/기업 메뉴 선택 시
                function fn_click_header_top_area(gbn){
                    $("#topArea_header").val(gbn);
                    $("#headerMenuVO").submit();
                }// 2레벨 메뉴 선택 시
                function fn_click_top_menu(menuId){
                    $("#currentMenuId_header").val(menuId);
                    $("#headerMenuVO").attr("action","/wk/cmm/menu/clickMenu.do");
                    ComLib.submit("headerMenuVO");
                }
                function fn_goMenuUrl(contextPath, urla, a,b,c,e){
                    if(urla.indexOf('http') != -1){
                        window.open(urla, '_blank');
                    } else {
                        //$("#HPCMCD0150VO").attr("action",contextPaht+urla);
                        //ComLib.submit("HPCMCD0150VO");
                        fn_goPageUrl(contextPath, b, urla, a, c,e);
                    }
                }
                function fn_goPageUrl(contextPath, menuId, strUrl, menuPurpSecd, pwdCfrmYn, netFunnel){	if(strUrl.indexOf('http') != -1){
                        window.open(strUrl, '_blank');
                        return;
                    }	var go = true;
                    if(menuId != null && menuId.length > 10){
                        var request = ComLib.ajaxReqObj(contextPath+"/cmm/menu/checkMenuInfo.do", {"menuId":menuId}, false);
                        request.done(function (responseObj, statusText, xhr) {            if(responseObj != null && responseObj.ssoRedirectUrl != null){
                                window.open(responseObj.ssoRedirectUrl, '_blank');
                                go = false;
                                return;
                            }
                        });
                    }
                    if(!go){
                        return;
                    }
                    $("#currentMenuId_header").val(menuId);
                    $("#redirectUrl_header").val(strUrl);
                    $("#menuPurpSecd_header").val(menuPurpSecd);
                    $("#headerMenuVO").attr("action",contextPath+"/cmm/menu/clickMenu.do");    if($("#pwdCfrmForm000")[0] != null){
                        $("#pwdCfrmForm000")[0].reset();
                    }    // 정책신청 공통기능화면에서는 안쓰임.
                    if($("#empDtlMenuView").val() != menuId){
                        var rtnObj = {};
                        var request = ComLib.ajaxReqObj("/cm/c/f/1300/checkEmpPolyDtlCodeAjax.do", {"menuUrl":strUrl, "menuId":menuId}, false);	    request.done(function (responseObj, statusText, xhr) {		    if(!ComLib.isEmpty(responseObj.auth)){
                                if(responseObj.auth == "ok" ){
                                        rtnObj.stat = true;
                                        rtnObj.menuId 			 = responseObj.menuId;
                                        rtnObj.menuPurpSecd 	 = responseObj.menuPurpSecd;
                                        rtnObj.exnwMenuConcSecd  = responseObj.exnwMenuConcSecd;
                                        rtnObj.pwdCfrmYn 		 = responseObj.pwdCfrmYn;
                                        rtnObj.contextPath 		 = responseObj.contextPath;
                                        rtnObj.smtmConcCtrlId 	 = responseObj.smtmConcCtrlId;
                                        rtnObj.dtlForwardPolyUrl = responseObj.menuUrla;
                                        //rtnObj.headerUrl = "/cmm/menu/clickMenu.do";
                                }else{
                                    rtnObj.stat = false;
                                }
                            }
                        });	    //정책 상세 대상 여부인지 확인.
                        if(rtnObj != null){
                            if(rtnObj.stat) {// true
                                var goDtl = false;
                                if(rtnObj.exnwMenuConcSecd == 'ESD01'){	    			if(confirm("정책소개 화면을 보지 않고 신청서 화면으로 이동하시겠습니까?")){
                                        //정책상세로 안감.
                                        goDtl = false;
                                    }else{
                                        //정책상세로 감.
                                        goDtl = true;
                                    }
                                }else if(rtnObj.exnwMenuConcSecd == 'ESD00'){					goDtl = true; //정책상세로 감.
                                }
                                if(goDtl){
                                    $("#dtlMenuId"			).val(rtnObj.menuId);
                                    $("#dtlMenuPurpSecd"	).val(rtnObj.menuPurpSecd);
                                    $("#dtlExnwMenuConcSecd").val(rtnObj.exnwMenuConcSecd);
                                    $("#dtlPwdCfrmYn"		).val(rtnObj.pwdCfrmYn);
                                    $("#dtlSmtmConcCtrlId"	).val(rtnObj.smtmConcCtrlId);
                                    $("#dtlContextPath"		).val(rtnObj.contextPath);
                                    $("#dtlForwardPolyUrl"	).val(rtnObj.dtlForwardPolyUrl);
                                    $("#headerMenuVO"		).attr("action","/cm/c/f/1300/empPolyDtlInfoPost.do");			       	 if(netFunnel != null && netFunnel != ""){
                                        ComLib.submit("headerMenuVO",{"isNetfunnel":true, "actionId":netFunnel});
                                        return;
                                    }else{
                                        ComLib.submit("headerMenuVO");
                                        return;
                                    }
                                }
                            }
                        }
                    }    var quitAlert = false;
                    var request = ComLib.ajaxReqObj("/cm/z/b/0220/countChkPwdCfrmYn.do", {"menuUrl":strUrl, "menuId":menuId}, false);    //로그인 화면에서 바운스 하는경우 URL에 파라미터가 있었던 경우 해당 파라미터를 만들어서 넣어준다.
                    if(location.pathname == "/cm/z/b/0210/openLginPage.do" && strUrl.indexOf("?") > -1 && strUrl.split("?").length > 1 ){    	//추가 파라미터가 붙어서 올 시 로그인 화면에서만 해당 추가파라미터 파싱.
                        var paramStr = strUrl.split("?")[1];
                        var paramArr = paramStr.split("&");        //하나씩 만들어서 폼에 주입.
                        for(var i = 0 ; i < paramArr.length ; i++){
                            if(paramArr[i].split("=").length == 2){            	$("#headerMenuVO").append("<input type='hidden' name='"+paramArr[i].split("=")[0]+"' value='"+paramArr[i].split("=")[1]+"'/>")
                            }
                        }
                    };
                    request.done(function (responseObj, statusText, xhr) {    	if(!ComLib.isEmpty(responseObj.auth)){            if(responseObj.auth != "ok" ){
                                if(responseObj.authMsg != null && responseObj.authMsg != ""){
                                    alert(responseObj.authMsg);
                                    quitAlert = true;
                                }                if(responseObj.authRedirect != null && responseObj.authRedirect != ""){
                                    //비로그인상태에서 기업로그인이 필요한 경우, 로그인페이지에 기업회원 탭 활성화 안됨으로 인한 menuPurpSecd로 구분 추가(조훈희 과장 요청(예)비로그인>(사이트맵) 기업 인증서등록)_2025.6.5. KSL
                                    var authRedirect = responseObj.authRedirect;
                                    var paramUrlStr = authRedirect.split("?")[0];
                                    var paramStr = authRedirect.split("?")[1];					if(menuPurpSecd == "EBM00" || menuPurpSecd == "EBM03"){
                                        paramStr = paramStr + "&loginGbn=EBM00";
                                        authRedirect = paramUrlStr + "?" + paramStr;					} else { //EBM01, EBM02, EBM04 일때 개인로그인 탭
                                        paramStr = paramStr + "&loginGbn=EBM01";
                                        authRedirect = paramUrlStr + "?" + paramStr;
                                    }                    location.href = authRedirect;
                                    quitAlert = true;
                                }
                                return;
                            }
                        }        if(responseObj.ret == "NA"){
                            if(netFunnel != null && netFunnel != ""){
                                ComLib.submit("headerMenuVO",{"isNetfunnel":true, "actionId":netFunnel});
                            }else{
                                ComLib.submit("headerMenuVO");
                            }
                        } else if(responseObj.ret == null){
                            if(netFunnel != null && netFunnel != ""){
                                ComLib.submit("headerMenuVO",{"isNetfunnel":true, "actionId":netFunnel});
                            }else{
                                ComLib.submit("headerMenuVO");
                            }
                        } else if(responseObj.ret.cnt == "0"){
                            //로그인등록 화면			spin.stop();
                            //ui.dimShow() 이미 열려있음.
                            $("#chkPwdCfrmYnAdd").show();
                        } else if(responseObj.ret.cnt > 0){
                            //로그인 확인화면
                            spin.stop();
                            //ui.dimShow(); 이미 열려있음.
                            $("#chkPwdCfrmYn").show();
                        }
                    });
                    if (quitAlert) {
                        return;
                    }
                    ui.dimShow()
                    spin.spin($("#spin")[0]);};function fn_chkPwdCfrmYn(){
                    var request = ComLib.ajaxReqObj("/wk/cmm/menu/chkPwdCfrmYn.do", {"pwdCfrmYnPwd":$("#pwdCfrmYnPwd").val()}, false);
                    request.done(function (responseObj, statusText, xhr) {
                        if(responseObj.ret == "Y"){
                            ComLib.submit("headerMenuVO");
                        }else if(responseObj.ret == "NA"){
                            alert("등록된 비밀번호가 없습니다. 등록 페이지로 이동합니다.");
                            location.href = "/cm";
                        }else{
                            alert("비밀번호가 다릅니다.");
                        }
                    });
                }function fn_goPopPageUrl(contextPath, menuId, strUrl, menuPurpSecd){    $("#currentMenuId_header").val(menuId);
                    $("#redirectUrl_header").val(strUrl);
                    $("#menuPurpSecd_header").val(menuPurpSecd);
                    $("#headerMenuVO").attr("action",contextPath+"/cmm/menu/clickMenu.do");    var name = "firmCare";
                    var height = 800;
                    var width = 1200;
                    var scroll = true;    PopLib.openPostPup($("#headerMenuVO"), name, height, width, scroll);}function fn_goPopPage() {
                    window.open('/cm/pub/index.html')
                }function fn_goPopList() {
                    window.open('/cm/pub/guide/guide.html')
                }function fn_checkAuth(contextPath, menuId, strUrl, menuPurpSecd, pwdCfrmYn, netFunnel){    var go = true;
                    if(menuId != null && menuId.length > 10){
                        var request = ComLib.ajaxReqObj(contextPath+"/cmm/menu/checkMenuInfo.do", {"menuId":menuId}, false);
                        request.done(function (responseObj, statusText, xhr) {            if(responseObj != null && responseObj.ssoRedirectUrl != null){
                                window.open(responseObj.ssoRedirectUrl, '_blank');
                                go = false;
                                return;
                            }
                        });
                    }
                    if(!go){
                        return;
                    }
                    $("#currentMenuId_header").val(menuId);
                    $("#redirectUrl_header").val(strUrl);
                    $("#menuPurpSecd_header").val(menuPurpSecd);
                    $("#headerMenuVO").attr("action",contextPath+"/cmm/menu/clickMenu.do");    if($("#pwdCfrmForm000")[0] != null){
                        $("#pwdCfrmForm000")[0].reset();
                    }    var request = ComLib.ajaxReqObj("/cm/z/b/0220/countChkPwdCfrmYn.do", {"menuUrl":strUrl, "menuId":menuId}, false);    request.done(function (responseObj, statusText, xhr) {
                        if(!ComLib.isEmpty(responseObj.auth)){            if(responseObj.auth != "ok" ){
                                if(responseObj.authMsg != null && responseObj.authMsg != ""){
                                    alert(responseObj.authMsg);
                                }                if(responseObj.authRedirect != null && responseObj.authRedirect != ""){
                                    location.href=responseObj.authRedirect;
                                }
                                return;
                            }
                        }        if(responseObj.ret == "NA"){
                            if(netFunnel != null && netFunnel != ""){
                                ComLib.submit("headerMenuVO",{"isNetfunnel":true, "actionId":netFunnel});
                            }else{
                                ComLib.submit("headerMenuVO");
                            }
                        } else if(responseObj.ret == null){
                            console.log("무사통과")
                        } else if(responseObj.ret.cnt == "0"){
                            //로그인등록 화면
                            ui.dimShow();
                            $("#chkPwdCfrmYnAdd").show();
                        } else if(responseObj.ret.cnt > 0){
                            //로그인 확인화면
                            ui.dimShow();
                            $("#chkPwdCfrmYn").show();
                        }
                    });
                };function fn_subPopWordClick(w){
                    $("#sub_topQuery").val(w);
                    $("#sub_findSearchData").click();
                }function fn_subTopQuerySet(v){
                    $("#sub_topQuery").val(v);
                    var request = ComLib.ajaxReqObj("/cm/f/c/0100/retrieveRecommandWord.do", {"query":v});
                    request.done(function(responseObj, statusText, xhr) {
                        if(null != responseObj.recommandValue){
                            if(responseObj.recommandValue.result.TotalCount > 0){
                                $("#sub_recommendArea").empty();
                                    var wordArr = [];
                                    for(var i=0; i<responseObj.recommandValue.result.Item.length; i++){
                                        wordArr.push(responseObj.recommandValue.result.Item[i].Word);
                                    }
                                for(var idx in wordArr) {
                                    var w = wordArr;
                                    $("#sub_recommendArea").append('<li><a href="javascript:void(0);" onclick="fn_subPopWordClick(\''+w[idx]+'\')">'+w[idx]+'</a></li>');
                                    //recommandWordObj.wordList.push(w[idx]);
                                }
                            }
                        }
                //     	if(responseObj.recommandValue.Data.Return > 0){
                //     		$("#sub_recommendArea").empty();
                // 			for(var idx in responseObj.recommandValue.Data.Word){
                // 				var w = responseObj.recommandValue.Data.Word;
                // 				$("#sub_recommendArea").append('<li><a href="javascript:void(0);" onclick="fn_subPopWordClick(\''+w[idx]+'\')">'+w[idx]+'</a></li>');
                // 			}
                //     	}
                    });
                    $(".layer_search.layer_cate_search").css("display", "none");
                    $(".layer_auto_search_wrap").css("display", "none");
                }//정책바로가기 이동
                function fn_goPolicyIntrotop(systClId, systId){
                    $("#topsystClId").val(systClId);
                    $("#topsystId").val(systId);	if(ComLib.isEmpty(systId))	//정책분류인 경우
                        $("#subSearchDataForm").attr("action", '/wk/c/f/1100/selecPolicyInfoPost.do');
                    else	//제도인 경우
                        $("#subSearchDataForm").attr("action", '/wk/c/f/1100/selecSystInfoPost.do');
                    ComLib.submit("subSearchDataForm");
                }//공지사항 상세보기
                function fn_headerBbsDetailInfo(ntceStno){
                    $("#header_ntceStno").val(ntceStno);
                    ui.dimShow()
                    spin.spin($("#spin")[0]);
                    ComLib.submit("bbsGoForm");
                }//로그아웃</script><form id="headerMenuVO" action="/wk/cmm/menu/topArea.do" method="POST">
                <input type="hidden" name="topArea" id="topArea_header">
                <input type="hidden" name="currentMenuId" id="currentMenuId_header">
                <input type="hidden" name="redirectUrl" id="redirectUrl_header">
                <input type="hidden" name="menuPurpSecd" id="menuPurpSecd_header">
                <input type="hidden" name="dtlMenuId" id="dtlMenuId">
                <input type="hidden" name="dtlForwardPolyUrl" id="dtlForwardPolyUrl">
                <input type="hidden" name="dtlMenuPurpSecd" id="dtlMenuPurpSecd">
                <input type="hidden" name="dtlExnwMenuConcSecd" id="dtlExnwMenuConcSecd">
                <input type="hidden" name="dtlPwdCfrmYn" id="dtlPwdCfrmYn">
                <input type="hidden" name="dtlSmtmConcCtrlId" id="dtlSmtmConcCtrlId">
                <input type="hidden" name="dtlContextPath" id="dtlContextPath">
                <input type="hidden" name="serverToday" id="serverToday" value="20250820">
                </form><form id="subSearchDataForm" action="/cm/f/c/0100/selectUnifySearchPost.do" method="POST">
                <input type="hidden" id="sub_topQuerySearchArea" name="topQuerySearchArea" value="all">
                <input type="hidden" id="sub_topQueryData" name="topQueryData">
                <input type="hidden" id="sub_startCount" name="startCount" value="1">
                <input type="hidden" id="sub_listCount" name="listCount" value="5"><input type="hidden" name="systClId" id="topsystClId">
                <input type="hidden" name="systId" id="topsystId">
                </form><form id="bbsGoForm" action="/cm/c/a/0100/selectBbttInfoPost.do" method="POST">
                <input type="hidden" id="header_ntceStno" name="ntceStno" value="5">
                </form>
                    <!-- #header_top -->
                    <div id="header_top">
                        <div class="header_lt">
                            <div class="get_top">
                                <i class="icon"></i>
                                <span class="text">이 누리집은 대한민국 공식 전자정부 누리집입니다.</span>
                            </div>
                        </div>
                        <div class="header_top_area">
                            <ul class="header_type">
                                <li><a href="javascript:void(0);" onclick="fn_click_header_top_area('EBM01')" title="개인 선택됨">개인</a></li>
                                <li><a href="javascript:void(0);" onclick="fn_click_header_top_area('EBM00')">기업</a></li>
                                
                                    <li class="top_noti_area">
                                    
                                        <div class="noti_banner_slide swiper-initialized swiper-vertical swiper-backface-hidden">
                                            <div class="swiper-wrapper" style="flex-direction: column; transition-duration: 0ms; transform: translate3d(0px, -52px, 0px);" id="swiper-wrapper-1641d154d18437510" aria-live="off">
                                                
                                                
                                                
                                                
                                                
                                            <div class="swiper-slide swiper-slide-next swiper-slide-prev" role="group" aria-label="1 / 2" data-swiper-slide-index="0" style="height: 52px;">
                                                    <span class="ad_title_p"><span class="ico16_loudspeaker_white"></span>메인화면 개편 작업으로 인한 캐시 삭제 안내</span>
                                                    <a href="https://www.work24.go.kr/cm/c/a/0100/selectBbttInfo.do?ntceStno=319&amp;bbsClCd=kf9cT1sUygs8E64dnqWAxg%3D%3D&amp;currentPageNo=1&amp;recordCountPerPage=10&amp;sortTycd=1&amp;startDt=&amp;endDt=&amp;searchDeTpCd=termSearchGbn0&amp;searchTxt=&amp;searchTycd=3&amp;upprJobClCd=&amp;jobClCd=&amp;bbsUrl=%2Fc%2Fa%2F0100%2FselectBbttListPost.do" class="link btn xxsmall btn_round type02"><span>자세히 보기</span></a>
                                                </div><div class="swiper-slide swiper-slide-active" role="group" aria-label="2 / 2" data-swiper-slide-index="1" style="height: 52px;">
                                                    <span class="ad_title_p"><span class="ico16_loudspeaker_white"></span>고용24 메인화면 개편 안내 (8.20(수))</span>
                                                    <a href="https://www.work24.go.kr/cm/c/a/0100/selectBbttInfo.do?ntceStno=312&amp;bbsClCd=kf9cT1sUygs8E64dnqWAxg%3D%3D&amp;currentPageNo=1&amp;recordCountPerPage=10&amp;sortTycd=1&amp;startDt=&amp;endDt=&amp;searchDeTpCd=termSearchGbn0&amp;searchTxt=&amp;searchTycd=3&amp;upprJobClCd=&amp;jobClCd=&amp;bbsUrl=%2Fc%2Fa%2F0100%2FselectBbttListPost.do" class="link btn xxsmall btn_round type02"><span>자세히 보기</span></a>
                                                </div></div>
                                            <div class="btn_container">
                                                <button type="button" class="btn noti_pause"><span class="blind">멈춤</span></button>
                                                <button type="button" class="btn noti_play" style="display:none"><span class="blind">재생</span></button>
                                            </div>
                                        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                                    
                                    </li>
                                
                                
                            </ul>
                        </div>
                    </div>
                    <!-- //#header_top -->	<!-- #header_menu -->
                    <div id="header_menutree">
                        <div class="header_lt">
                            <ul class="header_info">
                                <li><a href="javascript:void(0);" onclick="fn_goPageUrl('/cm', 'x', '/c/d/0180/retrieveSiteEasyHpcmPost.do')" id="tmp_siteInfro">이용안내</a></li>
                                <li class="line"><a href="javascript:void(0);" onclick="fn_goPageUrl('/cm', 'EBG020000001589', '/c/c/0120/selectUtzeInqrLstPost.do', 'EBM02', 'N', '')">질문과 답변</a></li>
                                <!-- 20250625 GNB 화면/확대축소 설정(임정규) -->
                                <li class="line">
                                    <a href="http://as82.kr/keis" target="_blank" title="새창 열림">원격지원</a>
                                </li>
                                <li class="line">
                                    <button type="button" class="btn_screen JS-screenToggle" aria-controls="fontSize" aria-expanded="false"><span>크기 설정</span></button>
                                    <div id="fontSize" class="screen_size">
                                        <ul>
                                            <li>
                                                <button type="button" class="btn_size sm" aria-selected="false"><span>작게</span></button>
                                            </li>
                                            <li>
                                                <button type="button" class="btn_size md active" aria-selected="true"><span>보통</span></button> <!-- [D] 활성화 시 active 추가 -->
                                            </li>
                                            <li>
                                                <button type="button" class="btn_size lg" aria-selected="false"><span>조금 크게</span></button>
                                            </li>
                                            <li>
                                                <button type="button" class="btn_size xlg" aria-selected="false"><span>크게</span></button>
                                            </li>
                                            <li>
                                                <button type="button" class="btn_size xxlg" aria-selected="false"><span>가장 크게</span></button>
                                            </li>
                                        </ul>
                                        <button type="button" class="screen_reset"><span>초기화</span></button>
                                    </div>
                                </li>
                                <!-- // 20250625 GNB 화면/확대축소 설정(임정규) -->
                            </ul>			<ul class="header_util">
                                <!-- 로그인 전 -->
                                
                                <li class="before">
                                    <a href="javascript:void(0);" onclick="fn_goPageUrl('/cm', 'EBG020000001564', '/z/b/0210/openLginPagePost.do', 'EBG02', 'N', 'ZB0210M00')">
                                        <span class="ico ico11"></span><span>로그인</span>
                                    </a>
                                    <a href="javascript:void(0);" onclick="fn_goPageUrl('/cm', '2', '/a/a/0110/openJoinPagePost.do')">
                                        <span class="ico ico12"></span><span>회원가입</span>
                                    </a>
                                </li>
                                
                                <!-- //로그인 전 -->				<!-- 로그인 후 -->
                                
                                <!-- //로그인 후 -->				<!-- utility -->
                                <li class="header_search">
                                    <a href="javascript:void(0);" class="JS-searchToggle" aria-pressed="false" aria-labelledby="searchEx">
                                        <span class="ico ico09"></span>
                                        <span>검색</span>
                                    </a>
                                    <!-- 서브검색 : 메인에서는 예외처리, 서브만 노출 -->
                                    <div id="searchEx" class="sub_search_wrap">
                                        <div class="top_search_form pt16">							<!-- 검색영역 -->
                                            <div class="topsearch_wrap">
                                                <div class="form_search_wrap">
                                                    <div class="main_search_area">
                                                        <div class="inner_search">
                                                            <button type="button" class="btn_cate_select" id="sub_topQuerySelect" title="검색 유형 열기"><span>전체</span></button>
                                                            <span class="bar"></span>
                                                            <input type="text" placeholder="필요한 서비스를 찾아보세요" title="검색어 입력" id="sub_topQuery" name="sub_topQuery" maxlength="150" class="ui-autocomplete-input" autocomplete="off">
                                                            <a href="javascript:void(0);" id="sub_findSearchData" class="btn_main_search"><span class="blind">검색</span></a>
                                                        </div>
                                                    </div>
                                                    <!-- 카테고리레이어 -->
                                                    <div class="layer_search layer_cate_search" id="sub_topQueryCateLayer" style="display: none;">
                                                        <ul>
                                                            <li><a href="javascript:void(0);" class="active" data-value="all" data-title="전체"><span>전체</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="report" data-title="신고·신청"><span>신고·신청</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="policy_emp" data-title="정책"><span>정책</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="tb_workinfo" data-title="채용"><span>채용</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="tb_bizinfo" data-title="기업"><span>기업</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="training" data-title="훈련"><span>훈련</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="news" data-title="뉴스·자료"><span>뉴스·자료</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="jobCourse" data-title="직업·진로"><span>직업·진로</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="qual" data-title="자격"><span>자격</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="tb_resident" data-title="인재"><span>인재</span></a></li>
                                                            <li><a href="javascript:void(0);" data-value="etc" data-title="기타"><span>기타</span></a></li>
                                                        </ul>
                                                    </div>
                                                    <!-- //카테고리레이어 -->
                                                    <!-- 자동완성레이어 -->
                                                    <div class="layer_auto_search_wrap" style="display:none">
                                                        <div class="layer_search layer_auto_search">
                                                            <ul class="keyword" id="sub_keyword">
                                                            </ul>
                                                            <div class="service">  <p class="b1_sb">정책/서비스 바로가기</p>  <ul class="box_list_area" id="sub_policyList">												</ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- 자동완성레이어 -->
                                                </div>
                                            </div>
                                            <!-- //검색영역 -->							<!-- 추천검색어 -->
                                            <dl class="recommend_keyword">
                                                <dt>추천검색어</dt>
                                                <dd>
                                                    <ul id="sub_recommendArea">
                                                    <li><a href="javascript:void(0);" onclick="fn_subPopWordClick('실업급여')">실업급여</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('근로계약서')">근로계약서</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('육아휴직')">육아휴직</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('국민내일배움카드')">국민내일배움카드</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('일자리채움청년지원금')">일자리채움청년지원금</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('직업훈련')">직업훈련</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('실업급여')">실업급여</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('근로계약서')">근로계약서</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('육아휴직')">육아휴직</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('국민내일배움카드')">국민내일배움카드</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('청년일자리도약장려금')">청년일자리도약장려금</a></li><li><a href="javascript:void(0);" onclick="fn_subPopWordClick('직업훈련')">직업훈련</a></li></ul>
                                                </dd>
                                            </dl>
                                            <!-- //추천검색어 -->
                                        </div>
                                    </div>
                                    <!-- //서브검색 -->
                                </li>
                                <!-- //utility -->
                            </ul>
                        </div>
                    </div>
                    <!-- //#header_menu -->    <!-- #header_bottom : hover시 extend 클래스 추가 -->
                    <div id="header_bottom" class="">
                        <div class="header_bottom_area">
                            <h1><!-- 23/12/04 퍼블: .temp 추가 시 "고용24(시범운영)" 로고 -->
                                <a class="go24_ci" onclick="fn_click_header_top_area('EBM01')" href="javascript:void(0);" title="홈으로">
                                    <span class="blind">고용24</span>
                                </a>
                            </h1>
                            <div class="gnb_wrap">
                                <!-- gnb -->
                                <div id="gnb">
                                    <ul>
                                        <li>
                                            <a href="javascript:void(0);" title="채용정보"><span>채용정보</span></a>
                                            <ul class="gnb2depth">    
                                                <li>
                                                    <a href="javascript:void(0);" title="일자리 찾기"><span>일자리 찾기</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="채용정보 상세검색" onclick="fn_goPageUrl('/wk', 'EBG020000000003', '/a/b/1200/retriveDtlEmpSrchListPost.do', 'EBM01', 'N', '')"><span>채용정보 상세검색</span></a>
                                                </li>      
                                                <li class="txt_list">
                                                    <a href="javascript:void(0);" title="직종별" onclick="fn_goPageUrl('/wk', 'EBG020000000006', '/a/b/1300/retrieveJobsIntroCountListPost.do', 'EBM01', 'N', '')"><span>직종별</span></a>
                                                </li>      
                                                <li class="txt_list">
                                                    <a href="javascript:void(0);" title="지역별" onclick="fn_goPageUrl('/wk', 'EBG020000000007', '/a/b/1400/retrieveWorkRegionEmpIntroListPost.do', 'EBM01', 'N', '')"><span>지역별</span></a>
                                                </li>      
                                                <li class="txt_list">
                                                    <a href="javascript:void(0);" title="테마별" onclick="fn_goPageUrl('/cm', 'EBG020000000008', '/empInfo/themeEmp/themeEmpInfoMain.do', 'EBM01', 'N', '')" class="btn_link_new right"><span>테마별</span></a>
                                                </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="채용 캘린더" onclick="fn_goPageUrl('/cm', 'EBG020000000009', '/empInfo/empInfoSrch/calendar/empCalendarMonth.do', 'EBM01', 'N', '')" class="btn_link_new right"><span>채용 캘린더</span></a>
                                                </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="4차산업혁명 채용관" onclick="fn_goPageUrl('/cm', 'EBG020000000010', '/empInfo/indRev/indRevMain.do', 'EBM01', 'N', '')" class="btn_link_new right"><span>4차산업혁명 채용관</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="e-채용마당 서비스안내" onclick="fn_goPageUrl('/wk', 'EBG020000000011', '/e/b/1100/retriveEnEmpSrchList.do', 'EBM01', 'N', '')"><span>e-채용마당</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="통합기업정보" onclick="fn_goPageUrl('/wk', 'EBG020000000014', '/a/d/1000/retrieveBusiSearchPost.do', 'EBM01', 'N', '')"><span>통합기업정보</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="해외취업" onclick="fn_goPageUrl('/cm', 'EBG020000000015', '/empInfo/empInfoSrch/list/worldJobEmpSrchList.do', 'EBM01', 'N', '')" class="btn_link_new right"><span>해외취업</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="내 주변 채용정보" onclick="fn_goPageUrl('/wk', 'EBG020010110001', '/a/b/1600/retriveAroundMeEmpInfoListPost.do', 'EBM01', 'N', '')"><span>내 주변 채용정보</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="구직신청"><span>구직신청</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="구직신청 현황" onclick="fn_goPageUrl('/wk', 'EBG020000000018', '/a/b/2100/resumeMngMainPost.do', 'EBM01', 'N', '')"><span>구직신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="이력서/자기소개서 관리" onclick="fn_goPageUrl('/wk', 'EBG020000000017', '/z/a/0000/redirectPost.do?type=resumeMng', 'EBM01', 'N', '')"><span>이력서/자기소개서 관리</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="채용행사"><span>채용행사</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="채용행사 목록" onclick="fn_goPageUrl('/wk', 'EBG020000000045', '/a/f/1100/retrieveEmpEventListPost.do', 'EBM01', 'N', '')"><span>채용행사</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="채용박람회 목록" onclick="fn_goPageUrl('/wk', 'EBG020000000048', '/a/f/1100/retrieveOnlineEmpExhbListPost.do', 'EBM01', 'N', '')"><span>채용박람회</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="강소기업" onclick="fn_goPageUrl('/cm', 'EBG020000000050', '/jobyoung/smallGiants/corpInfoSrchList.do?coGbCd=small', 'EBM01', 'N', '')" class="btn_link_new"><span>강소기업</span></a>
                                            </li>          </ul>    
                                                </li><li>
                                                    <a href="javascript:void(0);" title="취업지원"><span>취업지원</span></a>
                                                <ul class="gnb2depth">    
                                                        <li>
                                                    <a href="javascript:void(0);" title="취업역량강화"><span>취업역량강화</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="구직자취업역량 강화프로그램 소개" onclick="fn_goPageUrl('/wk', 'EBG020000000057', '/b/a/1110/retriveIntroPost.do', 'EBM01', 'N', '')"><span>구직자취업역량 강화프로그램</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="중장년내일센터" onclick="fn_goPageUrl('/wk', 'EBG020000000077', '/u/b/1000/seniorChgJobSptSvcPost.do', 'EBM01', 'N', '')"><span>중장년내일센터</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="청년도전지원사업" onclick="fn_goPageUrl('/wk', 'EBG020020105030', '/g/b/1100/busiIntroPost.do', 'EBM01', '', '')"><span>청년도전지원사업</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="청년성장프로젝트" onclick="fn_goPageUrl('/wk', 'EBG020020105001', '/v/a/1000/youngGrowIntroPost.do', 'EBM01', 'N', '')"><span>청년성장프로젝트</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="직장적응지원" onclick="fn_goPageUrl('/wk', 'EBG020020105031', '/v/a/1000/workPlaceIntroPost.do', 'EBM01', 'N', '')"><span>직장적응지원</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="취업지원실 목록" onclick="fn_goPageUrl('/wk', 'EBG020000000081', '/a/i/1110/weSchEmpConsltRoomSvcInvitePost.do', 'EBM01', 'N', '')"><span>우리학교 취업지원실</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="재학생 맞춤형 고용서비스" onclick="fn_goPageUrl('/wk', 'EBG020020106001', '/w/a/1000/centerListPost.do', 'EBM01', 'N', '')"><span>재학생 맞춤형 고용서비스</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="중장년 경력지원제" onclick="fn_goPageUrl('/wk', 'EBG020020107001', '/m/m/0200/retrieveMasBusiIntroPost.do', 'EBM01', '', '')"><span>중장년 경력지원제</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="취업가이드"><span>취업가이드</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="이력서" onclick="fn_goPageUrl('/wk', 'EBG020000000086', '/r/d/1110/resumeSelfIntroGuide1Post.do', 'EBM01', 'N', '')"><span>이력서, 자소서 작성가이드</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="직무별 자소서 작성가이드" onclick="fn_goPageUrl('/wk', 'EBG020000000091', '/r/d/1150/retrieveSelfintroWriteGuideViewListPost.do', 'EBM01', 'N', '')"><span>직무별 자소서 작성가이드</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="면접전략" onclick="fn_goPageUrl('/cm', 'EBG020020201001', '/empSpt/empGuide/empTrend/interviewGuide.do', 'EBM01', 'N', '')" class="btn_link_new right"><span>면접전략</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="직업심리검사" onclick="fn_goPageUrl('/wk', 'EBG020000000085', '/r/c/1000/jobPsyExamListPost.do', 'EBM01', 'N', '')"><span>직업심리검사</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="사이버진로교육센터" onclick="fn_goPageUrl('/cm', 'EBG020000001850', ' ', 'EBM01', 'N', '')" class="btn_link_new right"><span>사이버진로교육센터</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="취업동향 모아보기" onclick="fn_goPageUrl('/wk', 'EBG020000000100', '/r/e/1140/pictureEmpTrendPost.do', 'EBM01', 'N', '')"><span>취업동향 모아보기</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="취업뉴스 목록" onclick="fn_goPageUrl('/wk', 'EBG020000000110', '/r/g/1110/retrieveEmpNewsListPost.do', 'EBM01', 'N', '')"><span>취업뉴스</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="직업정보" onclick="fn_goPageUrl('/cm', 'EBG00201070001', 'https://www.wagework.go.kr', 'EBM01', 'N', '')" class="btn_link_new right"><span>직업정보</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="학과정보" onclick="fn_goPageUrl('/cm', 'EBG00201080001', '/consltJobCarpa/srch/schdpt/schdptSrch.do', 'EBM01', 'N', '')" class="btn_link_new right"><span>학과정보</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="국민취업지원제도"><span>국민취업지원제도</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="취업지원신청 소개" onclick="fn_goPageUrl('/ua', 'EBG120000000052', '/z/z/1300/selectEmssRqutIntro.do', 'EBM01', 'N', '')"><span>국취이야기</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="취업지원신청" onclick="fn_goPageUrl('/ua', 'EBG120000000002', '/t/a/1100/selectEmssRqutCeck.do', 'EBM01', 'N', '')"><span>취업지원신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="구직활동보고 및 수당 현황" onclick="fn_goPageUrl('/ua', 'EBG120000000003', '/t/b/1100/selectEmpmActFlflMngn.do', 'EBM01', 'N', '')"><span>Ⅰ유형 구촉수당신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="참여수당 지급 신청" onclick="fn_goPageUrl('/ua', 'EBG120000000004', '/t/c/1100/selectPrcpAoStp1Post.do', 'EBM01', 'N', '')"><span>Ⅱ유형 취업활동비용 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="취업지원 유예 신청" onclick="fn_goPageUrl('/ua', 'EBG120000000005', '/t/d/1100/selectEmssPtpmRqut.do', 'EBM01', 'N', '')"><span>유예·재참여 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="취업성공수당 신청" onclick="fn_goPageUrl('/ua', 'EBG120000000006', '/t/e/1100/selectEmpmSucsAoRqut.do', 'EBM01', 'N', '')"><span>(조기)취업성공 수당 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="운영기관 목록" onclick="fn_goPageUrl('/ua', 'EBG120000000007', '/z/z/1100/selectOperInst.do', 'EBM01', 'N', '')"><span>운영기관 찾기</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="미래내일 일경험" onclick="fn_goPageUrl('/cm', 'EBG020000000120', '/', 'EBM01', 'N', '')" class="btn_link_new"><span>미래내일 일경험</span></a>
                                            </li>    
                                                <li>
                                                    <a href="javascript:void(0);" title="취업지원금"><span>취업지원금</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="운영기관" onclick="fn_goPageUrl('/wk', 'EBG020000000142', '/l/a/1100/internOperListPost.do', 'EBM01', 'N', '')"><span>청년내일채움공제 운영기관</span></a>
                                            </li>        </ul>      </li>      </ul>      
                                                </li><li>
                                                    <a href="javascript:void(0);" title="실업급여"><span>실업급여</span></a>
                                                <ul class="gnb2depth">    
                                                        <li>
                                                    <a href="javascript:void(0);" title="수급자격"><span>수급자격</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="수급자격 온라인 교육 메인 화면" onclick="fn_goPageUrl('/ei', 'EBG020000000161', '/a/b/1100/retrievePuIncqualClmntOnlineViewPost.do', 'EBM01', 'N', '')"><span>수급자격 신청자 온라인 교육</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="수급자격 신청서 인터넷 제출" onclick="fn_goPageUrl('/ei', 'EBG020000000170', '/a/b/1200/openHPEIAB1200M01Post.do', 'EBM01', 'N', '')"><span>수급자격 신청서 인터넷 제출</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="수급자격증 기재사항 변경 신고" onclick="fn_goPageUrl('/ei', 'EBG020000000179', '/a/c/1100/openHPEIAC1100M01Post.do', 'EBM01', 'N', '')"><span>수급자격증 기재사항 변경 신고</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="수급기간 연기(변경) 신고 처리상태조회" onclick="fn_goPageUrl('/ei', 'EBG020000000185', '/a/c/1200/openHPEIAC1200M02Post.do', 'EBM01', 'N', '')"><span>수급기간 연기(변경) 신고</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="수급자격증 재교부 신청 입력" onclick="fn_goPageUrl('/ei', 'EBG020000000192', '/a/b/1300/openHPEIAB1300M01Post.do', 'EBM01', 'N', '')"><span>수급자격증 재교부 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="수급자격 인정명세서 발급 청구서 입력화면" onclick="fn_goPageUrl('/ei', 'EBG020000000198', '/a/b/1400/createPuIncqualRcognDtstmnViewPost.do', 'EBM01', 'N', '')"><span>수급자격 인정명세서 발급청구</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="실업인정"><span>실업인정</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="온라인 취업드림수첩 조회-재취업을위한 약속" onclick="fn_goPageUrl('/ei', 'EBG020000000207', '/a/h/1100/retrieveEmpymnHopeCardInfoPost.do', 'EBM01', 'N', '')"><span>온라인 취업드림수첩 조회</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="실업인정 인터넷 신청" onclick="fn_goPageUrl('/ei', 'EBG020000000210', '/a/h/1200/openHPEIAH1200M01Post.do', 'EBM01', 'N', '')"><span>실업인정 인터넷 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="온라인 취업특강(1차 실업인정 교육 포함)" onclick="fn_goPageUrl('/ei', 'EBG020000000235', '/a/g/1100/openHPEIAG1100M01Post.do', 'EBM01', 'N', '')"><span>온라인 취업특강(1차 실업인정 교육 포함)</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="취업사실 신고서 작성" onclick="fn_goPageUrl('/ei', 'EBG020000000236', '/a/m/1100/retrievePuEmpymnFactDclrtView.do', 'EBM01', 'N', '')"><span>취업사실 신고</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="상병급여(일반)청구" onclick="fn_goPageUrl('/ei', 'EBG020000000241', '/a/j/1100/openHPEIAJ1100M01Post.do', 'EBM01', 'N', '')"><span>상병급여(일반)청구</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="상병급여(출산) 청구서 입력 화면" onclick="fn_goPageUrl('/ei', 'EBG020000000247', '/a/j/1200/openHPEIAJ1200M01Post.do', 'EBM01', 'N', '')"><span>상병급여(출산시)청구</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="개별연장급여 신청서" onclick="fn_goPageUrl('/ei', 'EBG020000000254', '/a/j/1300/openHPEIAJ1300M02Post.do', 'EBM01', 'N', '')"><span>개별연장급여 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="반복수급자 재취업계획서 작성" onclick="fn_goPageUrl('/ei', 'EBG020000002004', '/a/h/1200/openHPEIAH1200M30Post.do', 'EBM01', 'N', '')"><span>반복수급자 재취업계획서 작성</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="취업촉진수당"><span>취업촉진수당</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="조기재취업수당 청구 입력" onclick="fn_goPageUrl('/ei', 'EBG020000000268', '/a/m/1200/createPuElempAllwncViewPost.do', 'EBM01', 'N', '')"><span>조기재취업수당 청구</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="이주비 청구" onclick="fn_goPageUrl('/ei', 'EBG020000000275', '/a/i/1100/openHPEIAI1100M01Post.do', 'EBM01', 'N', '')"><span>이주비 청구</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="광역구직활동비 청구 등록" onclick="fn_goPageUrl('/ei', 'EBG020000000282', '/a/i/1200/openHPEIAI1200M01Post.do', 'EBM01', 'N', '')"><span>광역구직활동비 청구</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="이직확인서"><span>이직확인서</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="이직확인서" onclick="fn_goPageUrl('/cm', 'EBG020012030006', '/d/b/0003/selectCvplNotiEILI20Post.do', 'EBM01', 'N', '')"><span>이직확인서</span></a>
                                            </li>        </ul>      </li>      </ul>      
                                                </li><li>
                                                    <a href="javascript:void(0);" title="직업능력개발"><span>직업 능력 개발</span></a>
                                                <ul class="gnb2depth">    
                                                        <li>
                                                    <a href="javascript:void(0);" title="훈련 찾기·신청"><span>훈련 찾기·신청</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="훈련 통합검색" onclick="fn_goPageUrl('/hr', 'EBG020000510010', '/a/a/1100/trnnCrsInf0Post.do', 'EBM01', 'N', '')"><span>훈련 통합검색</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="국민내일배움카드 훈련과정" onclick="fn_goPageUrl('/hr', 'EBG020000000310', '/a/a/1100/trnnCrsInfPost.do', 'EBM01', 'N', '')"><span>국민내일배움카드 훈련과정</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="K-디지털 아카데미" onclick="fn_goPageUrl('/hr', 'EBG020000000313', '/a/a/1100/trnnCrsInf2Post.do', 'EBM01', 'N', '')"><span>K-디지털 아카데미</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="사업주 훈련과정" onclick="fn_goPageUrl('/hr', 'EBG020000000319', '/a/a/1100/trnnCrsInf3Post.do', 'EBM01', 'N', '')"><span>사업주 훈련과정</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="일학습병행과정" onclick="fn_goPageUrl('/hr', 'EBG020000000320', '/a/a/1100/trnnCrsInf4Post.do', 'EBM01', 'N', '')"><span>일학습병행과정</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="유관기관 훈련과정" onclick="fn_goPageUrl('/hr', 'EBG020000000321', '/a/a/1100/trnnCrsInf5Post.do', 'EBM01', 'N', '')"><span>유관기관 훈련과정</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="정부부처별 훈련과정" onclick="fn_goPageUrl('/hr', 'EBG020000000322', '/a/a/1100/trnnCrsInf6Post.do', 'EBM01', 'N', '')"><span>정부부처별 훈련과정</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="STEP 이러닝" onclick="fn_goPageUrl('/hr', 'EBG020000000323', '/a/a/1200/selectLearnPost.do', 'EBM01', 'N', '')"><span>STEP 이러닝</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="국가인적자원개발컨소시엄훈련" onclick="fn_goPageUrl('/hr', 'EBG020000510008', '/a/a/1100/trnnCrsInf7Post.do', 'EBM01', 'N', '')"><span>국가인적자원개발컨소시엄훈련</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="국민내일배움카드"><span>국민내일배움카드</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="발급 신청 안내" onclick="fn_goPageUrl('/hr', 'EBG020000000296', '/h/a/1100/selectIssueRequestPost.do', 'EBM01', 'N', '')"><span>발급 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="지원대상 및 휴직기간변경" onclick="fn_goPageUrl('/hr', 'EBG020000000304', '/h/a/1200/selectSupTargetLevChgReqListPost.do', 'EBM01', 'N', '')"><span>지원대상 및 휴직기간변경</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="계좌한도 추가지원 안내" onclick="fn_goPageUrl('/hr', 'EBG020000000306', '/h/a/1300/selectAccLmtAddSprtPost.do', 'EBM01', 'N', '')"><span>계좌한도 추가지원 안내</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="훈련 기관·강사"><span>훈련 기관·강사</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="훈련교사 자격증발급신청" onclick="fn_goPageUrl('/hr', 'EBG020000000326', '/i/b/1100/selectCrqfcIssuReqstPost.do', 'EBM01', 'N', '')"><span>훈련교사관리</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="NCS확인강사 신청" onclick="fn_goPageUrl('/hr', 'EBG020000000368', '/i/b/1200/selectProfInfoPost.do', 'EBM01', 'N', '')"><span>NCS확인강사 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="K-DT 교강사 신청" onclick="fn_goPageUrl('/hr', 'EBG020000000382', '/i/b/1500/HPHRIB1500M01Post.do', 'EBM01', 'N', '')"><span>K-DT 교강사 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="인재뱅크신청" onclick="fn_goPageUrl('/hr', 'EBG020000000388', '/i/b/1400/selectMpBankAplyListPost.do', 'EBM01', 'N', '')"><span>인재뱅크신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="훈련기관평가정보" onclick="fn_goPageUrl('/cm', 'EBG020000000325', '/hrdp/ti/ptiio/PTIIO0100T.do', 'EBM01', 'N', '')" class="btn_link_new right"><span>훈련기관평가정보</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="훈련교강사조회" onclick="fn_goPageUrl('/cm', 'EBG020000000390', '/hrdp/kc/pkcfo/PKCFO0100L.do', 'EBM01', 'N', '')" class="btn_link_new right"><span>훈련교강사조회</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="스타훈련교사조회" onclick="fn_goPageUrl('/cm', 'EBG020000000391', '/hrdp/kc/pkceo/PKCEO0100L.do', 'EBM01', 'N', '')" class="btn_link_new right"><span>스타훈련교사조회</span></a>
                                            </li>        </ul>      </li>      </ul>      
                                                </li><li>
                                                    <a href="javascript:void(0);" title="출산휴가·육아휴직"><span>출산휴가·육아휴직</span></a>
                                                <ul class="gnb2depth">    
                                                        <li>
                                                    <a href="javascript:void(0);" title="출산휴가"><span>출산휴가</span></a>
                                                    <ul class="gnb3depth"> <li class="txt_list">
                                                    <a href="javascript:void(0);" title="출산전후 휴가 급여 신청" onclick="fn_goPageUrl('/ei', 'EBG020000000395', '/b/a/1100/openHPEIBA1100M02Post.do', 'EBM01', 'N', '')"><span>출산전후(유산,사산,배우자,난임치료)휴가 급여신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="출산전후휴가 급여상당액 신청" onclick="fn_goPageUrl('/ei', 'EBG020000000401', '/b/a/1200/openHPEIBA1200M01Post.do', 'EBM01', 'N', '')"><span>기간제·파견근로자 출산전후휴가 급여등에 상당하는 금액 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="예술인·노무제공자 출산전후급여등 신청" onclick="fn_goPageUrl('/ei', 'EBG020000000406', '/b/e/1100/openHPEIBE1100M01Post.do', 'EBM01', 'N', '')"><span>예술인·노무제공자 출산전후급여등 신청</span></a>
                                            </li>      
                                                    <li class="txt_list">
                                                    <a href="javascript:void(0);" title="고용보험 미적용자 출산(유산·사산) 급여 신청 작성" onclick="fn_goPageUrl('/ei', 'EBG020000000412', '/b/d/1100/retrieveCs0100Info.do', 'EBM01', 'N', '')"><span>고용보험 미적용자 출산(유산·사산) 급여 신청</span></a>
                                            </li></ul>
                                                </li><li>
                                                    <a href="javascript:void(0);" title="육아휴직"><span>육아휴직</span></a>
                                                    <ul class="gnb3depth">
                                                <li class="txt_list">
                                                    <a href="javascript:void(0);" title="육아휴직 급여 신청 내역 작성" onclick="fn_goPageUrl('/ei', 'EBG020000000419', '/b/b/1100/openHPEIBB1100M01Post.do', 'EBM01', 'N', '')"><span>육아휴직급여 신청</span></a>
                                            </li>  <li class="txt_list">
                                                    <a href="javascript:void(0);" title="육아기 근로시간 단축 급여 신청" onclick="fn_goPageUrl('/ei', 'EBG020000000425', '/b/b/1200/openHPEIBB1200M02Post.do', 'EBM01', 'N', '')"><span>육아기 근로시간 단축 급여 신청</span></a>
                                            </li><li class="txt_list">
                                                    <a href="javascript:void(0);" title="육아휴직/육아기 근로시간 단축 사용현황" onclick="fn_goPageUrl('/ei', 'EBG020000000429', '/b/b/1200/openHPEIBB1200M06Post.do', 'EBM01', 'N', '')"><span>육아휴직/육아기 근로시간 단축 사용현황</span></a>  </li>
                                                <li class="txt_list">
                                                    <a href="javascript:void(0);" title="육아휴직 급여 사후지급금 확인 요청 작성" onclick="fn_goPageUrl('/ei', 'EBG020000000430', '/b/b/1300/retrievePa0100InfoPost.do', 'EBM01', 'N', '')"><span>육아휴직 급여 사후지급금 확인 요청</span></a>
                                                </li>
                                                </ul>
                                                </li>
                                    </ul>
                                </li></ul></div>
                                <!-- //gnb -->
                                <a href="javascript:void(0)" class="header_allmenu" onclick="ComFnLib.fn_openLayerSiteMapPopup('sitemappopup', '/cm/c/d/0150/retrieveStmpPop.do?menuPurpSecd=EBM01', null, 'fn_callBack');" aria-controls="sitemappopup">
                                    <div class="lines">
                                        <span class="t"></span>
                                        <span class="c"></span>
                                        <span class="b"></span>
                                    </div>
                                    <span>전체 메뉴</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- //#header_bottom -->

        </header>
    `,
    footer: `
        <footer>
            <div class="site">
                <div class="area">
                    <button type="button" class="btnsite btn_family" title="확장됨" aria-expanded="false">
                        <span class="text">패밀리사이트</span>
                        <span class="icon"></span>
                    </button>
                    <div class="site_list">
                        <div class="list list--family" style="display: none;">
                            <ul>
                                <li class="item"><a href="https://www.eps.go.kr" target="_blank" title="새창 열림">외국인고용(외국인전용)</a></li>
                            
                                <li class="item"><a href="https://eis.work24.go.kr" target="_blank" title="새창 열림">고용행정통계</a></li>
                                <li class="item"><a href="https://www.workplus.go.kr" target="_blank" title="새창 열림">고용복지센터</a></li>
                                <li class="item"><a href="https://www.worktogether.or.kr" target="_blank" title="새창 열림">장애인고용포털</a></li>
                                <li class="item"><a href="https://www.work.go.kr/cyberedu/main.do" target="_blank" title="새창 열림">사이버진로교육센터</a></li>
                                <li class="item"><a href="https://saeil.mogef.go.kr/hom/HOM_Main.do" target="_blank" title="새창 열림">여성새로일하기센터</a></li>
                                <li class="item"><a href="https://www.gasarang.go.kr/hpgsMain.do" target="_blank" title="새창 열림">가사랑</a></li>
                                <li class="item"><a href="https://www.work.go.kr/gongsi/empReportInfo/retrieveGetGongsiList.do" target="_blank" title="새창 열림">고용형태공시제</a></li>
                                <li class="item"><a href="https://www.wagework.go.kr" target="_blank" title="새창 열림">임금직업포털</a></li>
                            </ul>
                        </div>
                    </div>
                    <button type="button" class="btnsite btn_related" title="확장됨" aria-expanded="false">
                        <span class="text">유관기관</span>
                        <span class="icon"></span>
                    </button>
                    <div class="site_list">
                        <div class="list list--related" style="display: none;">
                            <ul>
                                <li class="item"><a href="https://www.4insure.or.kr/ins4/ptl/Main.do" target="_blank" title="새창 열림">4대사회보험정보연계센터</a></li>
                                <li class="item"><a href="https://www.comwel.or.kr" target="_blank" title="새창 열림">근로복지공단</a></li>
                                <li class="item"><a href="https://www.hrdkorea.or.kr" target="_blank" title="새창 열림">한국산업인력공단</a></li>
                                <li class="item"><a href="https://ncs.go.kr" target="_blank" title="새창 열림">직무능력표준</a></li>
                                <li class="item"><a href="https://c.q-net.or.kr" target="_blank" title="새창 열림">CQ넷</a></li>
                                <li class="item"><a href="https://www.koreatech.ac.kr" target="_blank" title="새창 열림">한국기술교육대학교</a></li>
                                <li class="item"><a href="https://www.kopo.ac.kr" target="_blank" title="새창 열림">한국폴리텍대학</a></li>
                                <li class="item"><a href="https://www.hikorea.go.kr" target="_blank" title="새창 열림">하이코리아</a></li>
                                <li class="item"><a href="https://eps.hrdkorea.or.kr/h2/main/main.do" target="_blank" title="새창 열림">외국국적동포(H-2)취업교육홈페이지</a></li>
                                <li class="item"><a href="http://www.hugkorea.or.kr" title="새창 열림" target="_blank">외국인력상담센터</a></li>
                                <li class="item"><a href="https://www.kosha.or.kr" title="새창 열림" target="_blank">안전보건공단</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <script>
                $('.site .btnsite').on('click', function() {
                    var _btnIndex = $(this).index();
                    console.log("_btnIndex============",_btnIndex);
                    if(0 == _btnIndex) {
                        if($('.list--family').is(':visible') === false) {
                            $(this).addClass('active').attr('title', '축소됨');
                            $(this).addClass('active').attr('aria-expanded', 'true');
                            $('.list--family').slideDown(200);
                            $('.list--family').children('ul').children('li').children('a').first().focus();
                        } else {
                            $(this).removeClass('active').attr('title', '확장됨');
                            $(this).removeClass('active').attr('aria-expanded', 'false');
                            $('.list--family').slideUp(200);
                        }
                    } else {
                        if($('.list--related').is(':visible') === false) {
                            $(this).addClass('active').attr('title', '축소됨');
                            $(this).addClass('active').attr('aria-expanded', 'true');
                            $('.list--related').slideDown(200);
                            $('.list--related').children('ul').children('li').children('a').first().focus();
                        } else {
                            $(this).removeClass('active').attr('title', '확장됨');
                            $(this).removeClass('active').attr('aria-expanded', 'false');
                            $('.list--related').slideUp(200);
                        }
                    }

                });
            </script>

            <div class="group">
                <div class="area">
                    <div class="logos">
                        <img src="../pc/include/images/footer_ci01.png" alt="고용24">
                    </div>
                    <div class="flex">
                        <div class="flex_left">
                            <p>(27740) 충청북도 음성군 맹동면 태정로 6 한국고용정보원</p>
                            <p><strong>홈페이지 전산 이용 문의 1577-7114</strong> (유료, 한국고용정보원 고객상담센터, 평일 09시 ~ 18시)</p>
                            <p><strong>고용·노동 분야 제도 문의 국번없이 1350</strong> (유료, 고용노동부 고객상담센터, 평일 09시 ~ 18시)</p>
                            <p class="etc">
                                고용24는 <strong>통신판매중개자</strong>이며, 통신판매의 당사자가 아닙니다.<br>
                                상품(훈련), 상품(훈련)정보, 거래에 관한 <strong>의무와 책임은 판매자(훈련기관)</strong>에게 있습니다.
                            </p>
                        </div>
                        <div class="flex_right">
                                <div class="guide">
                                    <a role="button" href="javascript:void(0);" onclick="fn_goPageUrl('/cm', 'x', '/c/d/0180/retrieveSiteEasyHpcmPost.do');">
                                        <span>이용안내</span>
                                        <i class="icon"></i>
                                    </a>
                                <a role="button" href="http://as82.kr/keis" target="_blank" title="새창 열림">
                                    <span>원격지원</span>
                                    <i class="icon"></i>
                                </a>
                            </div>
            <!-- 					<div class="sns"> -->
            <!-- 						<a href="#" title="새창 열림"><img src="../cm/static/images/main_new/img-youtube.svg" alt="유튜브"></a> -->
            <!-- 						<a href="#" title="새창 열림"><img src="../cm/static/images/main_new/img-instagram.svg" alt="인스타그램"></a> -->
            <!-- 						<a href="#" title="새창 열림"><img src="../cm/static/images/main_new/img-naverblog.svg" alt="블로그"></a> -->
            <!-- 						<a href="#" title="새창 열림"><img src="../cm/static/images/main_new/img-facebook.svg" alt="페이스북"></a> -->
            <!-- 					</div> -->
                        </div>
                    </div>
                        <div class="control">
                            <div class="links">
                                <!-- 메인일시 노출-->
                                <a href="#none" onclick="fn_goPageUrl('/cm', 'X', '/c/d/0130/retrieveUtzeStptPost.do')">이용약관</a>
                                <a href="#none" onclick="fn_goPageUrl('/cm', 'X', '/c/d/0130/selectBbttListPost.do')"><strong class="point_color02">개인정보처리방침</strong></a>
                                <a href="#none" onclick="fn_goPageUrl('/cm', 'X', '/c/d/0130/retrieveEmailAdrPrssPlcyPost.do')">이메일무단수집거부</a>
                                <a href="#none" onclick="fn_goPageUrl('/cm', 'X', '/c/d/0130/retrieveCpyrPolyPost.do')">저작권보호정책</a>
                                <a href="#none" onclick="fn_goPageUrl('/cm', 'X', '/e/a/0110/selectOpenApiIntroPost.do')">오픈API 서비스</a>
                                <a href="#none" onclick="fn_goPageUrl('/wk', 'EBG020000001790', '/s/a/1100/loginForm.do');">화상상담 관리자</a>
                                <a href="#none" onclick="ComFnLib.fn_openLayerSiteMapPopup('sitemappopup', '/cm/c/d/0150/retrieveStmpPop.do?menuPurpSecd=EBM01', null, 'fn_callBack');">사이트맵</a>
                                <!--  <a href="#none" onclick="fn_goPageUrl('/cm', 'X', '/c/d/0150/retrieveStmpPost.do')">사이트맵</a>-->
                                <a href="#none" class="quick_chatbot">챗봇</a>

                                

                                <a href="#none" style="margin-left:auto;">
                                    <img src="../pc/include/images/WA_Mark.png" style="cursor:default;width:54px;height:40px;" alt="과학기술정보통신부 WA(WEB접근성) 품질인증 마크, 웹와치(WebWatch) 2025.2.3 ~ 2026.2.2" title="WA 품질인증 마크, 웹와치(WebWatch) 2025.2.3 ~ 2026.2.2">
                                </a>
                                <a href="#none" onclick="window.open('https://www.eprivacy.or.kr/front/certifiedSiteMark/certifiedSiteMarkPopup.do?certCmd=EP&amp;certNum=2024-EP-N007','seal','width=527,height=720,location=no,status=no,scrollbars=no')" title="새창 열림">
                                    <img src="../pc/include/images/eprivacyplus_text.png" style="cursor:pointer;width:45px;height:40px;margin-left: 16px;" alt="개인정보보호우수앱 시스템 인증마크">
                                </a>

                            </div>
                            <span class="copyright">© Ministry of Employment and Labor, Korea Employment Information <span class="quick_chatbot">Service.</span> All rights reserved.</span>
                        </div>

                    <div class="logos gov">
                        <a href="http://www.moel.go.kr" target="_blank" title="새창 열림"><img src="../pc/include/images/footer_ci02.png" alt="고용노동부"></a>
                        <a href="https://www.keis.or.kr" target="_blank" title="새창 열림"><img src="../pc/include/images/footer_ci03.png" alt="한국고용정보원"></a>
                        <span class="copyright">이 누리집은 고용노동부와 고용노동부 산하기관 한국고용정보원의 누리집 입니다.</span>
                    </div>
                </div>
            </div>



            <form id="pwdCfrmForm000">
            <section class="full_pop large full_01" id="chkPwdCfrmYnAdd" tabindex="0">
            <!-- 헤더 -->
            <div class="head type2">
                <h1 class="h2_sb">비밀번호 신규 추가</h1>
            </div>
            <!--// 헤더 -->
            <!-- 본문 컨텐츠 -->
            <div class="cont">
                <div class="box_notice_wrap">
                    <p class="tit">안내</p>
                    <ul class="box_list_area">
                        <li class="txt_list">다량의 개인정보가 포함된 메뉴를 특정사용자만 이용하시려면 비밀번호 설정 후 이용하실 수 있습니다.</li>
                        <li class="txt_list">인증서로 로그인한 사용자가 모든 메뉴를 같이 이용하려면 비밀번호 "미사용"으로 설정하시기 바랍니다.</li>
                        <li class="txt_list">비밀번호 사용여부는 기업회원 정보 수정 메뉴에서 설정 가능합니다.</li>
            <!-- 				<li class="txt_list">비밀번호 사용여부는 기업회원 정보 수정 메뉴에서 설정 가능합니다.</li> -->
            <!-- 				<li class="txt_list"> -->
            <!-- 					<p class="txt">다음과 같은 비밀번호는 피해 주십시요.</p> -->
            <!-- 					<ul class="box_list_area"> -->
            <!-- 						<li class="txt_list">아이디와 같은 비밀번호</li> -->
            <!-- 						<li class="txt_list">주민등록번호, 생일, 학번, 일반전화 등 개인정보와 관련된 숫자</li> -->
            <!-- 					</ul> -->
            <!-- 				</li> -->
                    </ul>
                </div>

                <!-- 팝업 1 -->
                <div class="box_form_login">
                    <h3 class="t1_sb">비밀번호 신규 추가<span class="cir_required">(<span><i class="blind">필수</i></span>표시된 부분은 필수 입력 항목입니다.)</span></h3>

                    <ul class="box_form_table">
                        <li class="type2">
                            <label class="list_tit" for="pwdCfrmYnPwd01">새 비밀번호<span class="essential"><i class="blind">필수</i></span></label>
                            <div class="list_txt">
                                <div class="box_table_group">
                                    <div class="cell">
                                        <div class="cell_wrap">
                                            <span class="box_ipt new_ipt">
                                                <input type="password" class="input_txt big" title="신규 비밀번호를 입력" placeholder="신규 비밀번호를 입력해 주세요." name="pwdCfrmYnPwd01" id="pwdCfrmYnPwd01" maxlength="24">
                                                <button type="reset" class="ico16_delete"><span class="blind">삭제</span></button>
                                            </span>
                                        </div>
                                        <p class="txt_notice">비밀번호는 영문(대/소문자)과 숫자, 특수문자 중 3가지 이상 종류로 조합하여 8~24 이내로 입력합니다. (단 , ^, _, \, ‘, [, ], 〮, -, &lt;, &gt; 제외)</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="list_tit" for="pwdCfrmYnPwd02">새 비밀번호 확인<span class="essential"><i class="blind">필수</i></span></label>
                            <div class="list_txt">
                                <div class="box_table_group">
                                    <div class="cell">
                                        <span class="box_ipt new_ipt">
                                            <input type="password" class="input_txt big" title="신규 비밀번호를 한번 더 입력" placeholder="신규 비밀번호를 한번 더 입력해 주세요." name="pwdCfrmYnPwd02" id="pwdCfrmYnPwd02" maxlength="24">
                                            <button type="reset" class="ico16_delete"><span class="blind">삭제</span></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="list_tit" for="pwdCfrmUsrNm">변경자 성명<span class="essential"><i class="blind">필수</i></span></label>
                            <div class="list_txt">
                                <div class="box_table_group">
                                    <div class="cell">
                                        <div class="cell_wrap">
                                            <span class="box_ipt new_ipt">
                                                <input type="text" class="input_txt big" title="성명입력" placeholder="성명을 입력해 주세요." name="pwdCfrmUsrNm2" id="pwdCfrmUsrNm2" maxlength="24">
                                                <button type="reset" class="ico16_delete"><span class="blind">삭제</span></button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="box_btn_wrap flex_al_c">
                        <a href="#none" class="btn big closed type02" id="btn_chkPwdCfrmYnAddClose">취소</a>
                        <a href="#none" class="btn fill big type01" id="btn_chkPwdCfrmYnAdd">저장</a>
                        <a href="#none" class="btn fill big type01" id="btn_chkPwdCfrmYnCancel">미사용</a>
                    </div>
                </div>
                <!--// 팝업 1 -->
            </div>
            <!-- 닫기 -->
            <a href="#none" class="closed">
                <span class="blind">팝업 닫기</span>
            </a>
            <!--// 닫기 -->
            </section>
            <!--  비밀번호 확인 -->
            <section class="full_pop large full_01" id="chkPwdCfrmYn" tabindex="0">
            <!-- 헤더 -->
            <div class="head type2">
                <h1 class="h2_sb">비밀번호 확인</h1>
            </div>
            <!--// 헤더 -->
            <div class="cont">
                <div class="box_notice_wrap">
                    <p class="tit">안내</p>
                    <ul class="box_list_area">
                        <li class="txt_list">다량의 개인정보가 포함된 메뉴를 특정사용자만 이용하시려면 비밀번호 설정 후 이용하실 수 있습니다.</li>
                        <li class="txt_list">"비밀번호 초기화" 버튼을 누르시는 경우 기업회원정보에 등록된 대표담당자 휴대전화로 초기화 비밀번호가 전송됩니다.</li>
                        <li class="txt_list">인증서로 로그인한 사용자가 모든 메뉴를 같이 이용하려면 기업회원 정보 수정 메뉴에서 비밀번호 "미사용"으로 설정하시기 바랍니다.</li>
                    </ul>
                </div>
                <!-- 팝업 2 -->
                <div class="box_form_login">
                    <h3 class="t1_sb">비밀번호 확인<span class="cir_required">(<span><i class="blind">필수</i></span>표시된 부분은 필수 입력 항목입니다.)</span></h3>

                    <ul class="box_form_table">
                        <li>
                            <label class="list_tit" for="pwdCfrmYnPwd00">비밀번호<span class="essential"><i class="blind">필수</i></span></label>
                            <div class="list_txt">
                                <div class="box_table_group">
                                    <div class="cell">
                                        <div class="cell_wrap">
                                            <span class="box_ipt new_ipt">
                                                <input type="password" class="input_txt big" title="비밀번호를 입력" placeholder="비밀번호를 입력해 주세요." name="pwdCfrmYnPwd00" id="pwdCfrmYnPwd00" maxlength="24">
                                                <button type="reset" class="ico16_delete"><span class="blind">삭제</span></button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <input type="hidden" id="chkPwdCfrmYn_sPopDivId">
                    <input type="hidden" id="chkPwdCfrmYn_sUrl">
                    <input type="hidden" id="chkPwdCfrmYn_oData">
                    <input type="hidden" id="chkPwdCfrmYn_oCallbackFunc">
                    <div class="box_btn_wrap flex_al_c">
                        <a href="#none" class="btn big closed type02">취소</a>
                        <a href="#none" class="btn fill big type01 text_center" onclick="(function fn(){$('#pwdCfrmForm000')[0].reset(); $('#chkPwdCfrmYn').hide(); $('#chkPwdCfrmYnChg').show(); })();">비밀번호<br>재설정</a>
                        <a href="#none" class="btn big type01 text_center" onclick="(function fn(){ $('#pwdCfrmForm000')[0].reset(); $('#chkPwdCfrmYn').hide(); $('#chkPwdCfrmYnReset').show(); })();">비밀번호<br>초기화</a>
                        <a href="#none" class="btn fill big type01" id="btn_chkPwdCfrmYn">확인</a>
                    </div>
                </div>
                <!--// 팝업 2 -->
            </div>
            <!-- 닫기 -->
            <a href="#none" class="closed">
                <span class="blind">팝업 닫기</span>
            </a>
            <!--// 닫기 -->
            </section>

            <!--  비밀번호 변경 -->
            <section class="full_pop large full_01" id="chkPwdCfrmYnChg" tabindex="0">
            <!-- 헤더 -->
            <div class="head type2">
                <h1 class="h2_sb">비밀번호 변경</h1>
            </div>
            <!--// 헤더 -->
            <!--// 헤더 -->
            <!-- 본문 컨텐츠 -->
            <div class="cont">
                <div class="box_notice_wrap">
                    <p class="tit">안내</p>
                    <ul class="box_list_area">
                        <li class="txt_list">다량의 개인정보가 포함된 메뉴를 특정사용자만 이용하시려면 비밀번호 설정 후 이용하실 수 있습니다.</li>
                        <li class="txt_list">비밀번호 사용여부는 기업회원 정보 수정 메뉴에서 가능합니다.</li>
                    </ul>
                </div>
                <!-- 팝업 3 -->
                <div class="box_form_login">
                    <h3 class="t1_sb">비밀번호 변경<span class="cir_required">(<span><i class="blind">필수</i></span>표시된 부분은 필수 입력 항목입니다.)</span></h3>

                    <ul class="box_form_table">
                        <li>
                            <label class="list_tit" for="pwdCfrmYnPwd04">기존 비밀번호<span class="essential"><i class="blind">필수</i></span></label>
                            <div class="list_txt">
                                <div class="box_table_group">
                                    <div class="cell">
                                        <div class="cell_wrap">
                                            <span class="box_ipt new_ipt">
                                                <input type="password" class="input_txt big" title="비밀번호를 입력" placeholder="비밀번호를 입력해 주세요." name="pwdCfrmYnPwd04" id="pwdCfrmYnPwd04" maxlength="24">
                                                <button type="reset" class="ico16_delete"><span class="blind">삭제</span></button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="list_tit" for="pwdCfrmYnPwd05">새 비밀번호<span class="essential"><i class="blind">필수</i></span></label>
                            <div class="list_txt">
                                <div class="box_table_group">
                                    <div class="cell">
                                        <div class="cell_wrap">
                                            <span class="box_ipt new_ipt">
                                                <input type="password" class="input_txt big" title="신규 비밀번호를 입력" placeholder="신규 비밀번호를 입력해 주세요." name="pwdCfrmYnPwd05" id="pwdCfrmYnPwd05" maxlength="24">
                                                <button type="reset" class="ico16_delete"><span class="blind">삭제</span></button>
                                            </span>
                                        </div>
                                    </div>
                                    <p class="txt_notice">비밀번호는 영문(대/소문자)과 숫자, 특수문자 중 3가지 이상 종류로 조합하여 8~24 이내로 입력합니다. (단 , ^, _, \, ‘, [, ], 〮, -, &lt;, &gt; 제외)</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="list_tit" for="pwdCfrmYnPwd06">새 비밀번호 확인<span class="essential"><i class="blind">필수</i></span></label>
                            <div class="list_txt">
                                <div class="box_table_group">
                                    <div class="cell">
                                        <div class="cell_wrap">
                                            <span class="box_ipt new_ipt">
                                                <input type="password" class="input_txt big" title="신규 비밀번호를 입력" placeholder="신규 비밀번호를 입력해 주세요." name="pwdCfrmYnPwd06" id="pwdCfrmYnPwd06" maxlength="24">
                                                <button type="reset" class="ico16_delete"><span class="blind">삭제</span></button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="list_tit" for="pwdCfrmUsrNm">변경자 성명<span class="essential"><i class="blind">필수</i></span></label>
                            <div class="list_txt">
                                <div class="box_table_group">
                                    <div class="cell">
                                        <div class="cell_wrap">
                                            <span class="box_ipt new_ipt">
                                                <input type="text" class="input_txt big" title="성명입력" placeholder="성명을 입력해 주세요." name="pwdCfrmUsrNm" id="pwdCfrmUsrNm" maxlength="24">
                                                <button type="reset" class="ico16_delete"><span class="blind">삭제</span></button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="box_btn_wrap flex_al_c">
                        <a href="#none" class="btn big closed type02" id="btn_chkPwdCfrmYnChgClose">취소</a>
                        <a href="#none" class="btn fill big type01" id="btn_chkPwdCfrmYnChg">변경</a>
                    </div>
                </div>
                <!--// 팝업 3 -->
            </div>
            <!-- 닫기 -->
            <a href="#none" class="closed">
                <span class="blind">팝업 닫기</span>
            </a>
            <!--// 닫기 -->
            </section>

            <!--  비밀번호 초기화 -->
            <section class="full_pop large full_01" id="chkPwdCfrmYnReset" tabindex="0">
            <!-- 헤더 -->
            <div class="head">
                <!-- 타이틀 -->
                <h1 class="h2_sb">비밀번호 초기화</h1>
                <!--// 타이틀 -->
            </div>
            <!--// 헤더 -->
            <!-- 본문 컨텐츠 -->
            <div class="cont">
                <div class="box_notice_wrap">
                    <p class="tit">안내</p>
                    <ul class="box_list_area">
                        <li class="txt_list">"비밀번호 초기화" 버튼을 누르시는 경우 기업회원정보에 등록된 대표담당자 휴대전화로 초기화 비밀번호가 전송됩니다.</li>
                    </ul>
                </div>
                <div class="box_form_login">
                    <h3 class="t1_sb">비밀번호 초기화<span class="cir_required">(<span><i class="blind">필수</i></span>표시된 부분은 필수 입력 항목입니다.)</span></h3>

                    <ul class="box_form_table">
                        <li>
                            <label class="list_tit" for="pwdCfrmUsrNm">변경자 성명<span class="essential"><i class="blind">필수</i></span></label>
                            <div class="list_txt">
                                <div class="box_table_group">
                                    <div class="cell">
                                        <div class="cell_wrap">
                                            <span class="box_ipt new_ipt">
                                                <input type="text" class="input_txt big" title="성명입력" placeholder="성명을 입력해 주세요." name="pwdCfrmUsrNm1" id="pwdCfrmUsrNm1" maxlength="24">
                                                <button type="reset" class="ico16_delete"><span class="blind">삭제</span></button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 버튼 -->
            <div class="box_btn_wrap flex_al_r">
                <a href="#none" class="btn fill big type01" id="btn_chkPwdCfrmYnReset">초기화</a>
                <a href="#none" class="btn big closed type02" id="btn_chkPwdCfrmYnResetClose"><span>닫기</span></a>
            </div>
            <!--// 버튼 -->
            <!-- 닫기 -->
            <a href="#none" class="closed">
                <span class="blind">팝업 닫기</span>
            </a>
            <!--// 닫기 -->
            </section>
            </form>

            <section class="full_pop large full_01" id="fileValidationView" style="z-index:10000;" tabindex="0">
            <!-- 헤더 -->
            <div class="head">
                <!-- 타이틀 -->
                <h1 class="h2_sb">첨부 파일 실패</h1>
                <!--// 타이틀 -->
            </div>
            <!--// 헤더 -->
            <!-- 본문 컨텐츠 -->
            <div class="cont">
                <div class="box_notice_wrap">
                    <ul class="box_list_area" id="fileValidationViewList">
                    </ul>
                </div>
            </div>
            <!-- 버튼 -->
            <div class="box_btn_wrap flex_al_r">
                <a href="#none" class="btn big closed type02" id="btn_fileValidationViewClose"><span>닫기</span></a>
            </div>
            <!--// 버튼 -->
            <!-- 닫기 -->
            <a href="#none" class="closed" id="btn_fileValidationViewClose2">
                <span class="blind">팝업 닫기</span>
            </a>
            <!--// 닫기 -->
            </section>

            <section class="full_pop small popup_01" id="loginTime" tabindex="0"><!-- 팝업open : class="on"추가, small : 640px, middle : 800px, large : 1040px 로 각각 클래스 적용  -->
                <!-- 헤더 -->
                <div class="head border_clr_333">
                    <!-- 타이틀 -->
                    <h1 class="h2_sb">자동 로그아웃 안내</h1>
                    <!--// 타이틀 -->
                </div>
                <!--// 헤더 -->
                <!-- 본문 컨텐츠 -->
                <div class="cont">
                    <p class="b1_sb">로그아웃까지 남은 시간 : 	<span class="btn_txt primary">5분 00초</span></p>
                    <p>잠시 후 자동으로 로그아웃될 예정입니다.</p>
                    <p>로그인 시간을 연장하시겠습니까?</p>
                </div>
                <!--// 본문 컨텐츠 -->

                <div class="box_btn_wrap type2 flex_al_c">
                    <button type="button" class="btn big fill type02" id="btn_logout"><span>로그아웃</span></button>
                    <button type="button" class="btn big fill type01" id="btn_expad"><span>로그인 연장</span></button>
                </div>
            </section>
        </footer>
    `,
    quick_menu: `
<div class="quick_tl"><span class="blind">quick menu</span></div>
	<ul class="quick_menu_btn">
		<li>
			<a href="javascript:void(0)" onclick="fn_goPageUrl('/cm', 'x', '/c/d/0190/retrieveInstSrchLstViewPost.do');" title="고용센터찾기">
				<span class="quick_menu_txt">고용센터찾기</span>
				<span class="quick_ico ico01"></span>
			</a>
		</li>
		<li>
			<a href="javascript:void(0)" onclick="fn_goPageUrl('/cm', 'x', '/c/a/0130/selectBbttListPost.do');" title="자주하는 질문">
				<span class="quick_menu_txt">자주하는 질문</span>
				<span class="quick_ico ico02"></span>
			</a>
		</li>
		<li>
			<a href="javascript:void(0);" onclick="fn_goPageUrl('/cm', 'EBG020000001691', '/c/d/0180/retrieveSiteEasyHpcmPost.do', 'EBM02', 'N', '')" title="이용안내">
				<span class="quick_menu_txt">이용안내</span>
				<span class="quick_ico ico03"></span>
			</a>
		</li>
		<li>
			<a href="javascript:void(0)" onclick="fn_goPageUrl('/cm', 'x', '/c/f/1100/selecPolicyListPost.do');" title="정책/제도">
				<span class="quick_menu_txt">정책/제도</span>
				<span class="quick_ico ico04"></span>
			</a>
		</li>
		<li>
			<a href="javascript:void(0)" onclick="fn_goPageUrl('/cm', 'EBG020000001581', '/c/c/0120/selectUtzeInqrLstPost.do', 'EBM02', 'N');" title="고객센터">
				<span class="quick_menu_txt">고객센터</span>
				<span class="quick_ico ico05"></span>
			</a>
		</li>
		<li>
			<a href="javascript:void(0)" onclick="fn_goPageUrl('/cm', 'x', '/c/f/1200/selecSimulateCalcPost.do');" title="모의계산">
				<span class="quick_menu_txt">모의계산</span>
				<span class="quick_ico ico06"></span>
			</a>
		</li>
		<li>
			<a href="javascript:void(0)" onclick="fn_goPageUrl('/wk', 'x', '/p/a/5110/retrievePopJobsSalary.do');" title="직종별 임금정보">
				<span class="quick_menu_txt">직종별 임금정보</span>
				<span class="quick_ico ico07"></span>
			</a>
		</li>
		<li>
			<a href="javascript:void(0)" onclick="fn_goPageUrl('/cm', 'x', 'https://www.moel.go.kr/local/WebFax.do');" title="전자팩스 수신조회">
				<span class="quick_menu_txt">전자팩스 수신조회</span>
				<span class="quick_ico ico08"></span>
			</a>
		</li>
	</ul>
	<!-- <div class="quick_chatbot">
		<a href="javascript:void(0)" onclick="alert('서비스 준비중') title="챗봇""><span class="blind">챗봇</span></a>
	</div> -->

    `,
    section_bottom: `
        <div class="box_pagination">
    <button type="button" class="btn_page first" onclick="fn_Search(1); return false;"><span class="blind">처음으로 가기</span></button>&nbsp;
    <button type="button" class="btn_page prev" onclick="fn_Search(1); return false;"><span class="blind">이전</span></button>&nbsp;
    <button type="button" class="active" title="1 페이지 이동" aria-current="true">1</button>  &nbsp;
    <button type="button" onclick="fn_Search(2); return false;" title="2 페이지 이동">2</button>&nbsp;
    <button type="button" onclick="fn_Search(3); return false;" title="3 페이지 이동">3</button>&nbsp;
    <button type="button" onclick="fn_Search(4); return false;" title="4 페이지 이동">4</button>&nbsp;
    <button type="button" onclick="fn_Search(5); return false;" title="5 페이지 이동">5</button>&nbsp;
    <button type="button" onclick="fn_Search(6); return false;" title="6 페이지 이동">6</button>&nbsp;
    <button type="button" onclick="fn_Search(7); return false;" title="7 페이지 이동">7</button>&nbsp;
    <button type="button" onclick="fn_Search(8); return false;" title="8 페이지 이동">8</button>&nbsp;
    <button type="button" onclick="fn_Search(9); return false;" title="9 페이지 이동">9</button>&nbsp;
    <button type="button" onclick="fn_Search(10); return false;" title="10 페이지 이동">10</button>&nbsp;
    <button type="button" class="btn_page next" onclick="fn_Search(11); return false;"><span class="blind">다음</span></button>&nbsp;
    <button type="button" class="btn_page last" onclick="fn_Search(9847); return false;"><span class="blind">마지막으로 가기</span></button>&nbsp;
</div>
    `,
    "location.type_a": `
<ul class="location_cont form_search_wrap">
    <li class="home"><a href="/cm/main.do" title="홈으로 이동">홈</a></li>
    <li><button type="button" class="btn_downgrill" title="1번째 카테고리 선택하기" onclick=""><span>청년일자리 첫걸음 보장제</span></button>
        <!-- 카테고리 목록 -->
        <div class="layer_search layer_cate_search" style="display:none" id="loc_1">
            <ul class="location_list">
                <li><a href="#none" onclick="" class="active" title="선택됨"><span>Depth1</span></a></li>
            </ul>
        </div>
        <!--// 카테고리 목록 -->
    </li>
    <li>
        <button type="button" class="btn_downgrill" title="2번째 카테고리 선택하기" onclick=""><span>졸업생 특화프로그램</span></button>
        <!-- 카테고리 목록 -->
        <div class="layer_search layer_cate_search" style="display:none" id="loc_2">
            <ul class="location_list">
                <li><a href="#none" onclick="" class="active" title="선택됨"><span>Depth1</span></a></li>
            </ul>
        </div>
        <!--// 카테고리 목록 -->
    </li>
    <li class="on"><a href="#none" title="Depth3">운영대학 목록</a></li>

</ul>
<div class="lct_area">
    <a href="#none" class="quickshare_icon facebook" onclick="" title="새창 열림"><span class="blind">페이스북</span></a>
    <a href="#none" class="quickshare_icon twitter" onclick="" title="새창 열림"><span class="blind">트위터</span></a>
    <a href="#none" class="quickshare_icon kakao" onclick="" title="새창 열림"><span class="blind">카카오</span></a>
    <input type="hidden" id="kakaoShareInitYn" value="N">
    <a href="#none" class="lct_btn_print" title="출력"><span class="blind">프린트하기</span></a>
</div>
    `,
    "location.type_b": `
       <ul class="location_cont form_search_wrap">
    <li class="home"><a href="/cm/main.do" title="홈으로 이동">홈</a></li>
    <li><button type="button" class="btn_downgrill" title="1번째 카테고리 선택하기" onclick=""><span>마이페이지(개인)</span></button>
        <!-- 카테고리 목록 -->
        <div class="layer_search layer_cate_search" style="display:none" id="loc_1">
            <ul class="location_list">
                <li><a href="#none" onclick="" class="active" title="선택됨"><span>Depth1</span></a></li>
            </ul>
        </div>
        <!--// 카테고리 목록 -->
    </li>
    <li>
        <button type="button" class="btn_downgrill" title="2번째 카테고리 선택하기" onclick=""><span>참여 프로그램 관리</span></button>
        <!-- 카테고리 목록 -->
        <div class="layer_search layer_cate_search" style="display:none" id="loc_2">
            <ul class="location_list">
                <li><a href="#none" onclick="" class="active" title="선택됨"><span>Depth1</span></a></li>
            </ul>
        </div>
        <!--// 카테고리 목록 -->
    </li>
    <li>
        <button type="button" class="btn_downgrill" title="3번째 카테고리 선택하기" onclick=""><span>졸업생 특화프로그램 관리</span></button>
        <!-- 카테고리 목록 -->
        <div class="layer_search layer_cate_search" style="display:none" id="loc_3">
            <ul class="location_list">
                <li><a href="#none" onclick=""><span>Depth3-4</span></a></li>
            </ul>
        </div>
        <!--// 카테고리 목록 -->
    </li>
    <li class="on"><a href="#none" title="Depth3">참여신청서</a></li>
</ul>
<div class="lct_area">
    <a href="#none" class="quickshare_icon facebook" onclick="" title="새창 열림"><span class="blind">페이스북</span></a>
    <a href="#none" class="quickshare_icon twitter" onclick="" title="새창 열림"><span class="blind">트위터</span></a>
    <a href="#none" class="quickshare_icon kakao" onclick="" title="새창 열림"><span class="blind">카카오</span></a>
    <input type="hidden" id="kakaoShareInitYn" value="N">
    <a href="#none" class="lct_btn_print" title="출력"><span class="blind">프린트하기</span></a>
</div>
    `,
    "lnb.type_a": `
        <h2 class="h2_sb">취업지원</h2>
<ul>
    
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">취업역량강화</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">취업가이드</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">국민취업지원제도</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">미래내일 일경험</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">취업지원금</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" title="선택됨" aria-expanded="true" class="on">청년일자리 첫걸음 보장제</a>
        <ul class="menuLevel3LiClassChk" style="display: block;">
            <li><a href="javascript:void(0);" onclick="">사업소개</a></li>
            <li><a href="javascript:void(0);" onclick="" >참여 기관</a></li>
            <li class="on"><a href="javascript:void(0);" onclick="" class="right blue" title="새창 열림">졸업생 특화프로그램</a></li>
            <li><a href="javascript:void(0);" onclick="">고교 맞춤형 고용서비스</a></li>
            <li><a href="javascript:void(0);" onclick="">대학생 맞춤형 고용서비스</a></li>
        </ul>
    </li>
</ul>
    `,
    "lnb.type_b": `
<h2 class="h2_sb">마이페이지(개인)</h2>
<ul>
    
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">마이페이지(개인)</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">회원정보관리</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">맞춤정보</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">잡케어</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">민원신청 현황</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">서비스이력</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">구직관리</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">훈련관리</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" title="선택됨" aria-expanded="true" class="on">참여 프로그램 관리</a>
        <ul class="menuLevel3LiClassChk" style="display: block;">
            <li><a href="javascript:void(0);" onclick="">구직자취업역량강화프로그램</a></li>
            <li><a href="javascript:void(0);" onclick="" >청년도전지원사업</a></li>
            <li class="on"><a href="javascript:void(0);" onclick="" class="right blue" title="새창 열림">졸업생 특화프로그램</a></li>
            <li><a href="javascript:void(0);" onclick="">고교 맞춤형 고용서비스</a></li>
            <li><a href="javascript:void(0);" onclick="">대학생 맞춤형 고용서비스</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">상담내역</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">외국인고용사업주</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
    <li class="depth"><a href="javascript:void(0);" onclick="" aria-expanded="false">내 전자지갑</a>
        <ul class="menuLevel3LiClassChk">
            <li><a href="javascript:void(0);" onclick="">LNB Depth3</a></li>
        </ul>
    </li>
</ul>
    `
};

function loadSection(id) {
    const elById = document.getElementById(id);
    if (elById && includes[id]) elById.innerHTML = includes[id];

    document.querySelectorAll(`.${id}`).forEach(el => {
        if (includes[id]) el.innerHTML = includes[id];
    });
}

// 모든 include 적용
Object.keys(includes).forEach(id => loadSection(id));
