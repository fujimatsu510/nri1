;(function($) {

	/* ---- ここから関数 ---- */


	/* ---- ここから既定のイベント ---- */

	$(document).ready(function() {
		// console.log('ready');
		// $('[class^=fxb-col-]').matchHeight();
		// $('[class^=list-] li').matchHeight();
		// $('[class^=card-]').matchHeight();
		// $('[class^=btn-]').matchHeight();
	});

	$(window).on('load', function() {
		// console.log('load');

	});

	$(window).on('scroll', function() {
		// console.log('scroll');
	});

	$(window).on('resize', function() {
		closeGlobalMenu();
		closeGlobalKnowledge();
	});

	/* ---- リサイズ共通 ---- */
	var resizeTimer = false;
	$(window).on("resize", function() {
		if (resizeTimer !== false) {
			clearTimeout(resizeTimer);
		}
		resizeTimer = setTimeout(function() {
			browserResize();
		}, 10);
	});

	/* ---- ここから個別のイベント ---- */

	// Set MarginTop of Image on $('.heading-h2-hasBg') ( for IE11 )
	$(function() {
		try {
			(function SetheadingH2hasBgImgMarginTopforIE() {
				if ( navigator.userAgent.match(/ie\s*\d+|trident/i) ) {
					var a = $('.heading-h2-hasBg');
					if ( a.length ) {
						a.each(function() {
							var b = $('._bg img', $(this));
							b.on('load', function() {
								if (b.prop('complete')) { d(b); } else { b.trigger('load'); }
							});
							$(window).on('load pageshow resize', function() {
								if (b.prop('complete')) { d(b); }
							});
						});
					} else {
						return false;
					}
				} else {
					return false;
				}
				function d(e) {
					var c = e.height() / -2;
					e.css({
						marginTop: c + 'px',
						top: '50%'
					});
				}
			})();
		} catch(e) {
			console.log('SetheadingH2hasBgImgOffsetforIE() -> ' + e.message());
			return false;
		}
	});

	// Global Navigationを開くときの動作
	function openGlobalMenu() {
		$('.btn-modalHeader,.n-ad-irlink').addClass('is-hidden');
		$('header ul.l-globalMenu').addClass('is-nonBg');
		$('#btn-toggleMenu').addClass('is-open');
		$('.l-globalNavWrapper').fadeIn().addClass('is-open');
	}

	// Global Navigationを閉じるときの動作
	function closeGlobalMenu() {
		$('.btn-modalHeader,.n-ad-irlink').removeClass('is-hidden');
		$('header ul.l-globalMenu').removeClass('is-nonBg');
		$('#btn-toggleMenu').removeClass('is-open');
		$('.l-globalNavWrapper').fadeOut().removeClass('is-open');
	}

	// Global Knowledge を開くときの動作
	function openGlobalKnowledge() {
		$('#btn-toggleKnowledge').addClass('is-open');
		if (window.matchMedia('(min-width: 767px)').matches) {
			$('#l-globalKnowledge').addClass('is-open');
		} else {
			$('#l-globalKnowledge').slideDown();
		}
	}

	// Global Knowledge を閉じるときの動作
	function closeGlobalKnowledge() {
		$('#btn-toggleKnowledge').removeClass('is-open');
		if (window.matchMedia('(min-width: 767px)').matches) {
			$('#l-globalKnowledge').removeClass('is-open');
		} else {
			$('#l-globalKnowledge').slideUp(function(){$(this).removeAttr('style');});
		}
	}

	// グロナビのメニューボタンを押したときの動作
	$('#btn-toggleMenu').on('click', function(event) {
		if ($(this).hasClass('is-open')) {
			closeGlobalMenu();
			closeGlobalKnowledge();
		} else {
			openGlobalMenu();
		}
	});

	// グロナビのオーバーレイを押したときの動作
	$('.l-globalNavWrapper').on('click', function(event) {
		var target = $(event.target);
		if (target.hasClass('l-globalNavWrapper')) {
			closeGlobalMenu();
			closeGlobalKnowledge();
		}
	});

	// ナレッジ・インサイトを押したときの動作
	$('#btn-toggleKnowledge').on('click', function(event) {
		event.preventDefault();
		if ($(this).hasClass('is-open')) {
			closeGlobalKnowledge();
		} else {
			openGlobalKnowledge();
		}
	});

	$(document).ready(function () {
		$('.l-headerLogo').children(":first").css('cursor', 'pointer');
		$('.l-headerLogo').children(":first").click(function() {
		window.location.href = window.location.origin;
		});
	});

	// drower height
	// $(function() {
	// 	h = $(document).height();
	// 	$("#l-globalKnowledge, .l-globalNavWrapper").css("min-height", h + "px");
	// 	});
	// 	$(window).resize(function() {
	// 	//画面リサイズ時の高さ取得
	// 	h = $(document).height();
	// 	$("#l-globalKnowledge, .l-globalNavWrapper").css("min-height", h + "px");
	// });

	// viewport change smp / tablet
	$(function() {
		var ua = navigator.userAgent;
		if ((ua.indexOf('iPhone') > 0) || ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
			$('head').prepend('<meta name="viewport" content="width=device-width,initial-scale=1">');
		} else {
			$('head').prepend('<meta name="viewport" content="width=1440">');
		}
	});

	// smooth scroll
	$(function() {
		$('a[href^="#"]' + 'a:not(.non-scroll)').on('click', function() {
			var speed = 200;
			var href = $(this).attr('href');
			var target = $(href == '#' || href == '' ? 'html' : href);
			var position = target.offset().top;
			if (window.matchMedia('(min-width: 767px)').matches) {
				var headerHeight = 60; //固定ヘッダーの高さ
				var headerPosition = target.offset().top - headerHeight; //ターゲットの座標からヘッダの高さ分引く
				$('body,html').animate({ scrollTop: position }, speed, 'swing');
				$('body,html').animate({scrollTop:headerPosition}, speed, 'swing');
			} else {
				var headerHeight = 50; //固定ヘッダーの高さ
				var headerPosition = target.offset().top - headerHeight; //ターゲットの座標からヘッダの高さ分引く
				$('body,html').animate({ scrollTop: position }, speed, 'swing');
				$('body,html').animate({scrollTop:headerPosition}, speed, 'swing');
			}

			return false;
		});
	});

	// top ranking slick slider
	$(function() {
		$('#slide-accessRankingStandardRWD').slick({
			adaptiveHeight: true,
			variableWidth: true,
			infinite: false,
			responsive: [
				{
				breakpoint: 768,
				settings: {
					variableWidth: false,
					slidesToShow: 1,
					dots: true,
					arrows: true,
				}
			}]
		});
	});

	// pagetop
	$(function() {
		$(window).bind("scroll", function() {
			var _winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
				_breakPoint = 767;

			// トップから100px以上スクロールしたら
			if ($(this).scrollTop() > 100) {
				// ページトップのリンクをフェードインする
				$("#l-pagetop").fadeIn();
				// ヘッダーユーティリティアイコンカラー変更（トップページのみ）
				if (_winW < _breakPoint) {
					$('.theme-top header ul.l-globalMenu li i').removeClass('fc-wht');
				}
				
			} else { // それ以外は
				// ページトップのリンクをフェードアウトする
				$("#l-pagetop").fadeOut();
				// ヘッダーユーティリティアイコンカラー変更（トップページのみ）
				if (_winW < _breakPoint) {
					$('.theme-top header ul.l-globalMenu li i').addClass('fc-wht');
				}
			}
		})
	});

	// scroll header stop
	$(function(){
		// 固定する場所が存在することの確認
		if( $('header #l-globalHeader').length > 0 ){
			var baseSelector = 'header'
			var fixingSelector = baseSelector + ' #l-globalHeader'

			$(window).on('load scroll resize', function(){
				var baseTop = $(baseSelector).offset().top

				//固定開始位置より後にスクロールされた場合
				if( $(window).scrollTop() > baseTop ){
					$(baseSelector).addClass('is-fixed')
					$(baseSelector).height($(fixingSelector).outerHeight())
					$(fixingSelector).width($(baseSelector).width())

				//固定開始位置以前にスクロールされた場合
				} else {
					$(baseSelector).removeClass('is-fixed')
					$(baseSelector).height('')
					$(fixingSelector).width('')
				}
			})
		}
	});

	// IE Edge scroll bug
	if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Windows NT 10.+ Edge\//)) {
		$('body').on("mousewheel", function () {
		event.preventDefault();
		var wd = event.wheelDelta;
		var csp = window.pageYOffset;
		window.scrollTo(0, csp - wd);
		});
	}

	//modal
	$(function() {
		// 「.btn-modalHeader」をクリック
		$('.btn-modalHeader').click(function() {
			// オーバーレイ用の要素を追加
			$('body').append('<div id="bg-overlay"></div>');
			// オーバーレイをフェードイン
			$('#bg-overlay').fadeIn('fast');

			// モーダルコンテンツのIDを取得
			var modal = '#' + $(this).attr('data-target');
			// モーダルコンテンツの表示位置を設定
			modalResize();
			// モーダルコンテンツスライドイン
			$(modal).slideDown(100, 'swing');

			// 「#bg-overlay」あるいは「.btn-modalClose」をクリック
			$('#bg-overlay, .btn-modalClose').off().click(function() {
				// モーダルコンテンツとオーバーレイをフェードアウト
				$(modal).slideUp(100, 'swing');
				$('#bg-overlay').fadeOut('fast', function() {
					// オーバーレイを削除
					$('#bg-overlay').remove();
				});
			});

			// リサイズしたら表示位置を再取得
			$(window).on('resize', function() {
				modalResize();
			});

			// モーダルコンテンツの表示位置を設定する関数
			function modalResize() {
				// ウィンドウの横幅、高さを取得
				var w = $(window).width();
				var h = $(window).height();

				// モーダルコンテンツの表示位置を取得
				var x = (w - $(modal).outerWidth(true)) / 2;
				var y = (h - $(modal).outerHeight(true)) / 2;

				// モーダルコンテンツの表示位置を設定
				$(modal).css({ 'left': x + 'px', 'top': y + 'px' });
			}

		});
	});

	// accordion default close
	$(function() {
		var $accSprite = $('.btn-acc:not(.is-show)'),
			$accContents = $('.wrap-acc');
		$accContents.hide(); //contentsを全て隠す
		$accSprite.each(function() {
			var flag = "close"; //flagを初期値を設定
			$(this).click(function(e) {
				e.preventDefault(); //aタグのリンク無効化
			$(this).toggleClass('is-open').next().slideToggle(); //クラスを追加してすぐ次の要素をスライド
			});
		});
	});
	$(function() {
		var $accSprite = $('.btn-accNextAll'),
			$accContents = $('.wrap-accNextAll');
		$accContents.hide(); //contentsを全て隠す
		$accSprite.each(function() {
			var flag = "close"; //flagを初期値を設定
			$(this).click(function(e) {
				e.preventDefault(); //aタグのリンク無効化
			$(this).toggleClass('is-open').nextAll('.wrap-accNextAll').slideToggle(); //クラスを追加してすぐ次の要素をスライド
			});
		});
	});
	// accordion default open
	$(function() {
		var $accOpenClose = $('.btn-acc.is-show');
		$accOpenClose.next().show();
			$accOpenClose.click(function(e) {
				e.preventDefault(); //a link disable
			$(this).toggleClass('is-close').next().slideToggle(); //close
		});
	});


	// acc PC default open / SP PC default close
	$(function() {
		var $accSprite = $('.btn-accInverse'),
			$accContents = $('.wrap-accInverse');
		$accContents.hide(); //contentsを全て隠す
		$accSprite.each(function() {
			var flag = "close"; //flagを初期値を設定
			// デスクトップの場合の処理
			if (window.matchMedia('(min-width: 767px)').matches) {
				$(".wrap-accInverse").show();
				$(".btn-accInverse").addClass("is-open").click(function() {
					$(this).toggleClass("is-open").next().slideToggle("normal");
					return false;
				});
				// モバイルの場合の処理
			} else {
				$(this).click(function(e) {
					e.preventDefault(); //aタグのリンク無効化
					$(this).toggleClass('is-open').next().slideToggle(); //クラスを追加してすぐ次の要素をスライド
				});
			};
		});
	});


	// accNextAll
	// $(".btn-accNextAll").on("click",function(){
	// 	$(this).parent().nextAll(".wrap-accNextAll").slideToggle(500);
	// 	$(this).parent().parent(".panel-tagRefineTab").toggleClass('is-open');
	// });

 //    $(".accSwitchUI").on("click",function(){
 //      $(this).parent().nextAll(".acc_Box").slideToggle(500);
 //      $(this).parent().parent(".acc_Area").toggleClass('open');
 //    });

	// tag tab
	$(function() {

		// タブメニューをクリックしたとき
		$('.l-tab > div').click(function() {
			var elm = this;
			if (!this.hasAttribute('data-content-type'))
			{
				// タブメニューとタブコンテンツのクラス「active」を削除
				$('.l-tab > div,.wrap-tab').removeClass('is-active');
			}

			// タブメニューのクラスを取得し、変数「tabClass」に格納（例：sky）
			var tabClass = $(this).attr('class');
			// クリックしたタブメニューにクラス「is-active」を付与
			$(this).addClass('is-active');

			// それぞれのタブコンテンツに対して
			$('.wrap-tab').each(function() {
				// 変数「tabClass」と、同じクラスがついたタブコンテンツに
				if ($(this).attr('class').indexOf(tabClass) != -1) {
					// クラス「is-active」を付与し、フェードインしながら表示
					$(this).addClass('is-active').fadeIn();
					// それ以外のタブコンテンツは
				} else {
					if (!elm.hasAttribute('data-content-type'))
					{
						// 隠す
						$(this).hide();
					}
				}
			});
		});
	});


	//tag all check and clear
	$(function() {

		var searchRefine = searchRefine || {}
		var checkboxEle = '.panel-searchRefine input[type=checkbox]';
		var btnCheckAllEle = '.is-btnCheckAll';

		searchRefine.CheckAll = {
			init: function() {
				this.bindEvent();
			},
			bindEvent: function() {
				var _self = this;

				$(document).on('click', btnCheckAllEle, function() {
					_self.toggleCheckedAll(this);
				});

				$(document).on('click', checkboxEle, function() {
					_self.toggleBtnCheckedAll(this);
				});
			},
			toggleCheckedAll: function(btnCheckAll) {
				var $checkbox = $(checkboxEle);
				// 同グループのチェックボックスの全チェック・全解除
				var $btnCheckAll = $(btnCheckAll),
					groupName = $btnCheckAll.attr('data-checked-all'),
					$targetCheckbox = $checkbox.filter(function() {
						return $(this).attr('name') === groupName;
					});

				if ($btnCheckAll.is(':checked')) {
					$targetCheckbox.prop('checked', true);
				} else {
					$targetCheckbox.prop('checked', false);
				}
			},
			toggleBtnCheckedAll: function(checkbox) {
				var $btnCheckAll = $(btnCheckAllEle);
				var $checkbox = $(checkbox),
					groupName = $checkbox.attr('name'),
					$targetBtnCheckAll = $btnCheckAll.filter(function() {
						return $(this).attr('data-checked-all') === groupName;
					});

				// グループ内のチェックが1つでも外れたら、ボタンのチェックも外す
				if (!$checkbox.is(':checked')) {
					$targetBtnCheckAll.prop('checked', false);
					return;
				}

				// グループ内のボタンが全てチェックされたら、ボタンにチェックをつける
				var $checkboxGroup = this.$checkbox.filter(function() {
						return $(this).attr('name') === groupName;
					}),
					$checkboxGroupChecked = $checkboxGroup.filter(function() {
						return $(this).prop('checked') === true;
					});

				if ($checkboxGroup.length === $checkboxGroupChecked.length) {
					$targetBtnCheckAll.prop('checked', true);
				}
			}
		};

		searchRefine.CheckAll.init();
	});

	//tag all clear
	$(function() {
		var tagRefine = tagRefine || {}

		tagRefine.CheckAll = {
			init: function() {
				this.setParameter();
				this.bindEvent();
			},
			setParameter: function() {
				this.$checkbox = $('.panel-tagRefineTab input[type=checkbox]');
				this.$btnCheckAll = $('.is-btnCheckAll');
			},
			bindEvent: function() {
				var _self = this;

				this.$btnCheckAll.on('click', function() {
					_self.toggleCheckedAll(this);
				});

				this.$checkbox.on('click', function() {
					_self.toggleBtnCheckedAll(this);
				});
			},
			toggleCheckedAll: function(btnCheckAll) {
				// 同グループのチェックボックスの全チェック・全解除
				var $btnCheckAll = $(btnCheckAll),
					groupName = $btnCheckAll.attr('data-checked-all'),
					$targetCheckbox = this.$checkbox.filter(function() {
						return $(this).attr('name') === groupName;
					});

				if ($btnCheckAll.is(':checked')) {
					$targetCheckbox.prop('checked', false);
				} else {
					$targetCheckbox.prop('checked', false);
				}
			},
			toggleBtnCheckedAll: function(checkbox) {
				var $checkbox = $(checkbox),
					groupName = $checkbox.attr('name'),
					$targetBtnCheckAll = this.$btnCheckAll.filter(function() {
						return $(this).attr('data-checked-all') === groupName;
					});

				// グループ内のチェックが1つでも外れたら、ボタンのチェックも外す
				if (!$checkbox.is(':checked')) {
					$targetBtnCheckAll.prop('checked', false);
					return;
				}
			}
		}

		$(function() {
			tagRefine.CheckAll.init();
		})
	});

	// link in link journalTop
	$('.is-link').on('click', function(e){
		//伝播をストップ
		e.stopPropagation();
		e.preventDefault();

		//リンクを取得して飛ばす
		location.href = $(this).attr('data-url');
	})

	// objectFit
	$(function(){
		objectFitImages('img.img-objectFit');
	});


	// carousel journalTop/segmentTop
	// $(function() {
	// 	$('#slide-selectorStandardRWD').slick({
	// 		settings: "unslick",
	// 		responsive: [{
	// 			breakpoint: 768,
	// 				settings: {
	// 					autoplay:true,
	// 					dots:true,
	// 					arrows: true,
	// 					autoplaySpeed:4000
	// 			}
	// 		}]
	// 	 });
	// });

	// service solution top
	$(function(){
		$('.fxb-cardTypeD').click(function(){
			$(this).toggleClass('is-open');
		});
	});

	function sliderSetting(){
		var width = $(window).width();
		if(width <= 767){
			$('#slide-selectorStandardRWD').not('.slick-initialized').slick({
				autoplay:true,
				dots:true,
				arrows: true,
				autoplaySpeed:4000
			});
		}else{
			$('#slide-selectorStandardRWD .slick-initialized').slick('unslick');
		}
	}

	// 初期表示時の実行
	sliderSetting();

	// リサイズ時の実行
	$(window).resize( function() {
	  sliderSetting();
	});

	// main内で横幅いっぱい
	(function widthFullonMain(_selector) {

		/* Main
		-----------------------------------*/
		$(function() {
			var $elm = $(_selector);
				marginAdjust($elm);

			$(window).on('resize', function() {
				marginAdjust($elm);
			});

		});

		/* Function
		-----------------------------------*/
		function marginAdjust($elm) {
			$elm.each(function(i, elm) {
				var _parentWidth = $(this).parent().width(),
					_winW = $(window).width(),
					_sideMargin = (_winW - _parentWidth) / 2;
				$(this).css({
					width: _winW,
					marginLeft: _sideMargin * -1
				});
			});
		}

	})('.l-fluidAreaA');

	// デスクトップの場合の処理
	if (window.matchMedia('(min-width: 767px)').matches) {

		// 別ページへのアンカーリンクの位置
		$(window).on('load', function() {
			var url = $(location).attr('href');
				if(url.indexOf("#") != -1){
					var anchor = url.split("#");
					var target = $('#' + anchor[anchor.length - 1]);
					if(target.length){
					var pos = Math.floor(target.offset().top) - 40; // 移動分
					$("html, body").animate({scrollTop:pos}, 200);
				}
			}
		});

		// masonry journalTop
		$(function() {
			$('#l-topicsJournal').masonry({
				itemSelector: '.l-topicBox',
				columnWidth: 320,
				isFitWidth: true
			});
		});

		// character limit journalTop
		$(function(){
			var $setElm = $('.l-journalTopContent h2');
			var cutFigure = '26'; // カットする文字数
			var afterTxt = ' …'; // 文字カット後に表示するテキスト

			$setElm.each(function(){
				var textLength = $(this).text().length;
				var textTrim = $(this).text().substr(0,(cutFigure))

				if(cutFigure < textLength) {
					$(this).html(textTrim + afterTxt).css({visibility:'visible'});
				} else if(cutFigure >= textLength) {
					$(this).css({visibility:'visible'});
				}
			});
		})

		$(function(){
			var $setElm = $('.l-topicBox ._title');
			var cutFigure = '46'; // カットする文字数
			var afterTxt = ' …'; // 文字カット後に表示するテキスト

			$setElm.each(function(){
				var textLength = $(this).text().length;
				var textTrim = $(this).text().substr(0,(cutFigure))

				if(cutFigure < textLength) {
					$(this).html(textTrim + afterTxt).css({visibility:'visible'});
				} else if(cutFigure >= textLength) {
					$(this).css({visibility:'visible'});
				}
			});
		})

		$(function(){
			var $setElm = $('.l-topicBox._large ._title');
			var cutFigure = '30'; // カットする文字数
			var afterTxt = ' …'; // 文字カット後に表示するテキスト

			$setElm.each(function(){
				var textLength = $(this).text().length;
				var textTrim = $(this).text().substr(0,(cutFigure))

				if(cutFigure < textLength) {
					$(this).html(textTrim + afterTxt).css({visibility:'visible'});
				} else if(cutFigure >= textLength) {
					$(this).css({visibility:'visible'});
				}
			});
		})

		$(function(){
			var $setElm = $('.l-accessRankingBox ._title');
			var cutFigure = '43'; // カットする文字数
			var afterTxt = ' …'; // 文字カット後に表示するテキスト

			$setElm.each(function(){
				var textLength = $(this).text().length;
				var textTrim = $(this).text().substr(0,(cutFigure))

				if(cutFigure < textLength) {
					$(this).html(textTrim + afterTxt).css({visibility:'visible'});
				} else if(cutFigure >= textLength) {
					$(this).css({visibility:'visible'});
				}
			});
		})

		//matchHeight
		$(function() {
			$('.l-glossary .text-lineNarrow').matchHeight();
		});
		$(function() {
			$('.l-journalTopContent ._content').matchHeight();
		});
		$(function() {
			$('.panel-program ._content').matchHeight();
		});
		$(function() {
			$('.list-typeNumber li').matchHeight();
		});
		$(function() {
			$('.btn-displayBlock').matchHeight();
		});
		$(function() {
			$('.l-anchorLink li a').matchHeight();
		});
		$(function() {
			$('.panel-default ._header').matchHeight();
			$('.panel-default ._content').matchHeight();
		});
		$(function() {
			$('.bg-blueLight').matchHeight();
			$('.bg-grayLight').matchHeight();
		});
		$(function() {
			$('.l-bgImageFilterA ._title').matchHeight();
			$('.l-bgImageFilterA ._outline').matchHeight();
		});

	// モバイルの場合の処理
	} else {

		// 別ページへのアンカーリンクの位置
		$(window).on('load', function() {
			var url = $(location).attr('href');
				if(url.indexOf("#") != -1){
					var anchor = url.split("#");
					var target = $('#' + anchor[anchor.length - 1]);
					if(target.length){
					var pos = Math.floor(target.offset().top) - 25; // 移動分
					$("html, body").animate({scrollTop:pos}, 200);
				}
			}
		});

		// accordion
		$(function() {
			var $accSprite = $('.btn-accMobile'),
				$accContents = $('.wrap-accMobile');
			$accContents.hide(); //contentsを全て隠す
			$accSprite.each(function() {
				var flag = "close"; //flagを初期値を設定
				$(this).click(function(e) {
					e.preventDefault(); //aタグのリンク無効化
					$(this).toggleClass('is-open').next().slideToggle(); //クラスを追加してすぐ次の要素をスライド
				});
			});
		});

		// carousel drawer
		$(function() {
			$('#slide-selectorNavRWD').slick({
				autoplay:true,
				dots:false,
				arrows: true,
				autoplaySpeed:4000
			 });
		});

		// carousel journalTop/segmentTop
		// $(function() {
		// 	$('#slide-selectorStandardRWD').slick({
		// 		autoplay:true,
		// 		dots:true,
		// 		arrows: true,
		// 		autoplaySpeed:4000
		// 	 });
		// });


		// character limit journalTop
		$(function(){
			var $setElm = $('.l-journalTopContent h2');
			var cutFigure = '40'; // カットする文字数
			var afterTxt = ' …'; // 文字カット後に表示するテキスト

			$setElm.each(function(){
				var textLength = $(this).text().length;
				var textTrim = $(this).text().substr(0,(cutFigure))

				if(cutFigure < textLength) {
					$(this).html(textTrim + afterTxt).css({visibility:'visible'});
				} else if(cutFigure >= textLength) {
					$(this).css({visibility:'visible'});
				}
			});
		})

		$(function(){
			var $setElm = $('.l-topicBox ._title');
			var cutFigure = '40'; // カットする文字数
			var afterTxt = ' …'; // 文字カット後に表示するテキスト

			$setElm.each(function(){
				var textLength = $(this).text().length;
				var textTrim = $(this).text().substr(0,(cutFigure))

				if(cutFigure < textLength) {
					$(this).html(textTrim + afterTxt).css({visibility:'visible'});
				} else if(cutFigure >= textLength) {
					$(this).css({visibility:'visible'});
				}
			});
		})

		$(function(){
			var $setElm = $('.l-accessRankingBox ._title');
			var cutFigure = '36'; // カットする文字数
			var afterTxt = ' …'; // 文字カット後に表示するテキスト

			$setElm.each(function(){
				var textLength = $(this).text().length;
				var textTrim = $(this).text().substr(0,(cutFigure))

				if(cutFigure < textLength) {
					$(this).html(textTrim + afterTxt).css({visibility:'visible'});
				} else if(cutFigure >= textLength) {
					$(this).css({visibility:'visible'});
				}
			});
		})

		$(function(){
			var $setElm = $('.fxb-cardTypeB ._title');
			var cutFigure = '27'; // カットする文字数
			var afterTxt = ' …'; // 文字カット後に表示するテキスト

			$setElm.each(function(){
				var textLength = $(this).text().length;
				var textTrim = $(this).text().substr(0,(cutFigure))

				if(cutFigure < textLength) {
					$(this).html(textTrim + afterTxt).css({visibility:'visible'});
				} else if(cutFigure >= textLength) {
					$(this).css({visibility:'visible'});
				}
			});
		})

	};

	/* ---- ここからアセット置き場 ---- */

	if ($('body').hasClass('theme-desktop')) {
		// デスクトップの場合の処理
	}
	if ($('body').hasClass('theme-mobile')) {
		// モバイルの場合の処理
	}
	if ($('.SELECTOR')[0]) {
		// セレクタのNull判定
	}

})(jQuery);

// SP tap
(function () {
  var tapClass = "";
  var hoverClass = "";

	var Hover = window.Hover = function (ele) {
		return new Hover.fn.init(ele);
	};
	Hover.fn = {
		//Hover Instance
		 init : function (ele) {
			this.prop = ele;
		}

		, bind : function (_hoverClass, _tapClass) {
			hoverClass = _hoverClass;
			tapClass = _tapClass;

			$(window).bind("touchstart", function(event) {
				var target = event.target || window.target;

				var bindElement = null;
				if (target.tagName == "A" || $(target).hasClass(tapClass)) {
					bindElement = $(target);
				} else if ($(target).parents("a").length > 0) {
					bindElement = $(target).parents("a");
				} else if ($(target).parents("." + tapClass).length > 0) {
					bindElement = $(target).parents("." + tapClass);
				}

				if (bindElement != null) {
					Hover().touchstartHoverElement(bindElement);
				}
			});
		}
		, touchstartHoverElement : function (bindElement) {
			bindElement.addClass(hoverClass);
			bindElement.unbind("touchmove", Hover().touchmoveHoverElement);
			bindElement.bind("touchmove", Hover().touchmoveHoverElement);

			bindElement.unbind("touchend", Hover().touchendHoverElement);
			bindElement.bind("touchend", Hover().touchendHoverElement);
		}
		, touchmoveHoverElement : function (event) {
			$(this).removeClass(hoverClass);
		}
		, touchendHoverElement : function (event) {
			$(this).removeClass(hoverClass);
		}
	}
	Hover.fn.init.prototype = Hover.fn;

	Hover().bind("hover", "tap");
}
)();

$(function() {
	headingBgFit('.l-titleDetailImg.is-img');
});

function headingBgFit(_selector) {
	try {
		var $wrapper = $(_selector);
		$wrapper.each(function(i, elm) {
			if ($(this).hasClass('bgImg')) {
				var $imgWrapper = $('._image', $(this)),
					$img = $('img', $imgWrapper),
					_src = $img.attr('src');
				$imgWrapper.remove();
				$(this).css({
					background: 'url(' + _src + ') no-repeat center',
					backgroundSize: 'cover'
				});
			}
		});
	} catch(e) {
		return false;
	}
}