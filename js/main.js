(function ($) {
	"use strict";
	
	/*----------------------------
	Toggle Menu  Active
	------------------------------ */
	    $('.toggle i').on('click', function() {
        $('.sidemenu').toggleClass('active');
    });
	/*----------------------------
	Animation js Active
	------------------------------ */
	AOS.init();
	/*----------------------------
    Counter Js Active
    ------------------------------ */
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});
	/*----------------------------
	Scroll Active JS
	----------------------------*/
	$.scrollIt({
		upKey: 0,
		downKey: 140,
		easing: 'linear',
		scrollTime: 600,
		activeClass: 'current',
		onPageChange: null,
		topOffset: -160
	});
	/*-----------------------------
	Project Carousel
	------------------------------*/
	$('.dot-list').owlCarousel({
		loop: true,
		autoplayHoverPause: true,
		autoplay: true,
		dots: true,
		smartSpeed: 1000,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 3
			},
			1369: {
				items: 4
			}
		}
	});


	/*----------------------------
	 Video Popup JS
	 ----------------------------*/
	$('.popup-youtube').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	/* ---------------------------------------------
	  Blog filtering
	 --------------------------------------------- */

	$('.container-fluid').imagesLoaded(function () {
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			layoutMode: 'masonry',
			masonry: {
				columnWidth: '.grid-item'
			}
		})

		$('.blog-filter').on('click', 'a', function (e) {
			e.preventDefault();
			$(this).parent().addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
	});
	/*----------------------------
	Smooth Scrool
	------------------------------ */
	$('a').on('click', function (event) {
		var $anchor = $($(this).attr('href')).offset().top - 60;
		$('body, html').animate({
			scrollTop: $anchor
		}, 1500);
		event.preventDefault();
		return false;
	});

	/*-----------------
	Scroll-Up
	-----------------*/
	$.scrollUp({
		scrollText: '<i class="fas fa-chevron-up"></i>',
		easingType: 'linear',
		scrollSpeed: 1000,
		animation: 'fade'
	});
	/*-----------------
	Preload
	-----------------*/
	$(document).on('ready', function () {
		var count = 0;
		var counter = setInterval(function () {
			if (count < 101) {
				$('.count').text(count + '%');
				$('.loader').css('width', count + '%');
				count++
			} else {
				clearInterval(counter);
			}
		});
	});
    	/*-------------
	Move Background
	-------------------- */
	$(function () {
		$('.header-area-3').backgroundMove();
	});
		
})(jQuery);