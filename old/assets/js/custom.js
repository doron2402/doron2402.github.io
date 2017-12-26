/* (function($) { */
	$(document).ready(function($) {
		"use strict";
		$('.owl-carousel.carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
			responsive:{
				0:{
					items:1
				},
				767:{
					items:2
				}
			}
		});
		$('.owl-carousel.slideshow').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
			responsive:{
				0:{
					items:1
				},
			}
		});
		
		$('[data-toggle="tooltip"]').tooltip();
		
		$(".entry-title").dotdotdot({
			ellipsis	: ' ...',
		});
		
		$('.recipe-step li').on('click',function(){
			$(this).toggleClass('done');
			return false;
		});
		
		/* START FIX TOP MENU */
		function fix_menu_bar(class_menu,min_width){
			"use strict";
			var window_width = $( window ).innerWidth();

			if( window_width >= min_width ){
				var offset_top = $(class_menu).offset().top;
				var element_height = $(class_menu).innerHeight();
				
				var min_scrool = offset_top+element_height;
				var min_scrool_top = offset_top+element_height;
				
				var lastScrollTop = 0;
				$(window).scroll(function () {
					var st = $(this).scrollTop();

					if (st > min_scrool && st > lastScrollTop) {
						/* Scroll Down */
						$(class_menu).addClass('fixed');
						$(class_menu).css({'position':'fixed','top':0-element_height,'left':'0','right':'0','z-index':'1000'});
						$('body').css('padding-top',element_height);
					} else if ( st > min_scrool && st < lastScrollTop ) {
						$(class_menu).css('top',0);
					} else if ( st < min_scrool ) {
						/* Scroll Top */
						$(class_menu).removeClass('fixed');
						$(class_menu).removeAttr('style');
						$('body').css('padding-top','');
					}
					lastScrollTop = st;
				});
			}
		}
		fix_menu_bar('.fix-header-menu',1024);
		/* END FIX TEP MENU */
		
		/* START BACK TO TOP */
		$(".back-to-top").hide();
		$(function () {
			$(window).scroll(function () {
				var to_top_btn = $('.back-to-top');
				if ($(this).scrollTop() > 100) {
					to_top_btn.fadeIn();
				} else {
					to_top_btn.fadeOut();
				}
			});

			// scroll body to 0px on click
			$('a.back-to-top-btn').on('click',function () {
				$('body,html').animate({
					scrollTop: 0
				}, 800);
				return false;
			});
		});
		/* END BACK TO TOP */
		
		/* START MENU TOGGLE */
		function navbar_toggle_add(){
			"use strict";
			if($('.navbar-toggle-overlay').length == 0){
				$('body').append('<div class="navbar-toggle-overlay"></div>');
			}
			$('.navbar-toggle-overlay').fadeIn(100);
			
			var navbar_menu = $('.navbar-toggle-menu');
			navbar_menu.addClass('open');
			navbar_menu.animate({ "left": "0"}, "fast");
			navbar_menu.parent().addClass('open');
			navbar_menu.parent().parent().addClass('open');
		}
		function navbar_toggle_remove(){
			"use strict";
			var navbar_menu = $('.navbar-toggle-menu');
			navbar_menu.animate({ "left": "-200"},"fast");
			navbar_menu.removeClass('open');
			navbar_menu.parent().removeClass('open');
			navbar_menu.parent().parent().removeClass('open');
			$('.navbar-toggle-overlay').fadeOut(100);
		}
		var window_width = $( window ).innerWidth();
		if( window_width < 768 ){
			/* SHOW MENU */
			$('.navbar-toggle-btn').on('click',function(){
				navbar_toggle_add();
				return false;
			});
			$('body').on("swiperight",function(){
				navbar_toggle_add();
				return false;
			});
			
			/* -> HIDE MENU */
			$(document).on('click','.navbar-toggle-overlay',function(){
				navbar_toggle_remove();
				return false;
			});
			$('body').on("swipeleft",function(){
				navbar_toggle_remove();
				return false;
			});
		} else {
			navbar_toggle_remove();
		}
		/* END MENU TOGGLE */
		
		/* START NAV DROPDOWN */
		var DELAY = 300, clicks = 0, timer = null;
		$(document).on('click','.navbar-toggle-menu .nav.navbar-nav  li.dropdown > a',function( event ){
			var window_width = $( window ).innerWidth();
			if( window_width < 768 ){
				clicks++;
				if(clicks === 1) {
					var menuParent = $(this);
					$(this).find('.fa').toggleClass('opn');
					
					var dropdown = $(menuParent).next();
					var parent_dropdown = $(dropdown).parent().closest('.dropdown-menu');
					
					if( dropdown.hasClass('show') ){
						var dropdown_height = $(dropdown).innerHeight();
						dropdown.css('height', dropdown_height+'px');
						dropdown.animate({height: '0px'}, 100);
						dropdown.delay(100).queue(function(next){
							$(this).removeClass('show');
							next();
						});
						dropdown.delay(100).queue(function(next){
							$(this).addClass('hide');
							next();
						});
						
						dropdown.delay(100).queue(function(next){
							dropdown.css('height', 'auto');
							next();
						});
					} else {
						dropdown.removeClass('hide');
						dropdown.addClass('show');
						
						dropdown.css('height', '');
						var dropdown_height = dropdown.innerHeight();
						
						dropdown.css('height', '0px');
						dropdown.animate({height: dropdown_height+'px'}, 100);
						
						dropdown.delay(100).queue(function(next){
							dropdown.css('height', 'auto');
							next();
						});					
					}
					
					timer = setTimeout(function() {
						clicks = 0;             //after action performed, reset counter
					}, DELAY);
					
					event.preventDefault();
					return false;
				} else {
					clearTimeout(timer);    //prevent single-click action
					clicks = 0;
				}	
			}
		});
		
		/* END NAV DROPDOWN */
		
		/* START OPEN SEARCH OVERLAY */
		$('.open-search-form').on('click',function(){
			$('.search-overlay').fadeIn();
			return false;
		});
		$('.close-search-overlay').on('click',function(){
			$('.search-overlay').fadeOut();
			return false;
		});
		
		/* END OPEN SEARCH OVERLAY */
		
		/* START RESIZED FUNCTION */
		$(function () {
			$( window ).on('resize',function() {
				var window_width = $( window ).width();
				if( window_width >= 768 ){
					navbar_toggle_remove();
				}
				$(".entry-title").trigger("update.dot");
				
				verticat_align_center();
			})
		});
		/* END RESIZED FUNCTION */
		
		/* START DUPLICATE CONTENT */
		$('.btn-duplicate').on('click',function(){
			var wraper = $(this).closest('.duplicate-area');
			var wraper_item = wraper.find('.duplicate-content');
			
			var item = wraper_item.find('.duplicate-item:first-child').clone();
			item.find('.form-control').val('');
			wraper_item.append(item);
			return false;
		});
		/* -> REMOVE ITEM */
		$(document).on('click','.remove-item',function(){
			var remove_item = $(this);
			var wrapper = remove_item.closest('.duplicate-content');
			var count_item = $(wrapper).find('.duplicate-item').length;
			
			if(count_item > 1){
				remove_item.closest('.duplicate-item').remove();
			} else {
				remove_item.closest('.duplicate-item').find('.form-control').val('');
			}
			return false;
		});
		/* END DUPLICATE CONTENT */
		
		/* BEGIN VERTICAL ALIGN CENTER */
		function verticat_align_center(){
			"use strict";
			
			var post_overlay = $('.post.image-overlay .entry-header-wrapper');
			for (var i = 0, item = post_overlay.length; i < item; i++) {
				var post_item = post_overlay[i];
				var height = $(post_item).innerHeight();
				
				var margin_top = (height/2)-2;
				$(post_item).css({
					'top' : '50%',
					'margin-top' : '-'+ margin_top +'px',
				});
			}			
		}
		verticat_align_center();
		/* END VERTICAL ALIGN CENTER */
	});
/* }); */