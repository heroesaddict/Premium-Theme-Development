jQuery(document).ready( function($){
	// //custom sunset script

	/* init functions */
	revealPosts(); //show and animate first batch of posts

	/*variable declarations */
	//var carousel =  '.sunset-carousel-thumb';
	var last_scroll = 0;

	/* carousel functions */
	//call slide the first time the page load
	//sunset_get_bs_thumbs(carousel);

	 //slideEvent();
	// $(carousel).on('slid.bs.carousel', function(){
	// 	sunset_get_bs_thumbs(carousel);
	// });
	/* carousel functions */
	$(document).on('click', '.sunset-carousel-thumb', function() {
    	var id = $("#" + $(this).attr("id"));
    	$(id).on('slid.bs.carousel', function () { 
	    	sunset_get_bs_thumbs(id);
    	});
    });
    
    $(document).on('mouseenter', '.sunset-carousel-thumb', function() {
    	var id = $("#" + $(this).attr("id"));
        sunset_get_bs_thumbs(id);
    });
	
	function sunset_get_bs_thumbs( id ){
			
		var nextThumb = $(id).find(".item.active").find(".next-image-preview").data("image");
        var prevThumb = $(id).find(".item.active").find(".previous-image-preview").data("image");
        $(id).find(".carousel-control.right").find(".thumbnail-container").css({"background-image" : "url("+ nextThumb +")"});
        $(id).find(".carousel-control.left").find(".thumbnail-container").css({"background-image" : "url("+ prevThumb +")"});
		
	}
	// function sunset_get_bs_thumbs(carousel) {

	// 	$(carousel).each(function(){
	// 		var nextThumb = $(this).find('.item.active').find('.next-image-preview').data('image');
	// 		var prevThumb = $(this).find('.item.active').find('.previous-image-preview').data('image');
	// 	 	$(this).find('.carousel-control.right').find('.thumbnail-container').css({ 'background-image' : 'url('+nextThumb+')'});
	// 	 	$(this).find('.carousel-control.left').find('.thumbnail-container').css({ 'background-image' : 'url('+prevThumb+')'});
	// 	});
	// }

	/* Ajax Functions */
	//Number of posts load depends on 'Blog pages show at most' Setting on Dashboard
	$(document).on('click', '.sunset-load-more:not(.loading)', function(){//click event will only execute if no loading class
		//this refers to '.sunset-load-more' element
		var that = $(this);
		var page = $(this).data('page');
		var newPage = page+1;
		var ajaxurl = $(that).data('url');
		var prev = that.data('prev');
		var archive = that.data('archive');

		if( typeof prev === 'undefined' ) {
			prev = 0;
		}
		if( typeof archive === 'undefined' ) {
			archive = 0;
		}

		that.addClass('loading').find('.text').slideUp(320);
		that.find('.sunset-icon').addClass('spin');

		$.ajax({
			url : ajaxurl,
			type: 'post',//like method ="post" in a form
			data: {
				page: page,
				prev: prev,
				archive: archive,
				action: 'sunset_load_more'
			},
			error: function(response){
				console.log(response);
			},
			success: function(response){
				if (response == 0) {
					$('.sunset-posts-container').append('<div class="text-center"><h3>You reach the end of the line!</h3><p>No more post to load.</p></div>');
					that.slideUp(320);
				} else {

					setTimeout(function(){
						
						if( prev == 1) {
							$('.sunset-posts-container').prepend(response);
							newPage = page-1;
						} else {
							$('.sunset-posts-container').append(response);
						}
						if( newPage == 1){
							that.slideUp(320);
						} else {
							that.data('page', newPage);
					
							that.removeClass('loading').find('.text').slideDown(320);
							that.find('.sunset-icon').removeClass('spin');
						}
						
						revealPosts();
						
					}, 500 );
				}
			}
		});

	});

	/* scroll functions */

	$(window).scroll( function(){
		var scroll = $(window).scrollTop(); //distance between top of window(0) and top of page as we scroll
		//console.log(scroll);
		//console.log($(window).height())
		//console.log($(window).height()*0.1)
		if( Math.abs(scroll-last_scroll) > $(window).height()*0.1) {
			last_scroll = scroll;
			// console.log('last_scroll: '+last_scroll);
			$('.page-limit').each(function( index) {
				if ( isVisible( $(this) ) ) {
					//console.log('visible');
					//console.log($(this).attr("data-page"));
					history.replaceState( null, null, $(this).attr("data-page") );
					return(false);
				}
			});			
		}
	});

	/* helper functions */
	function revealPosts() {
		var posts = $('article:not(.reveal)');
		var i = 0;

		setInterval( function(){
			if( i>= posts.length) return false;

			var el = posts[i];
			$(el).addClass('reveal').find('.sunset-carousel-thumb').carousel();//call bootstrap carousel again.
			//slideEvent();
			i++;
		}, 200);
	};
	// function slideEvent() {
	//     $(carousel).on('slid.bs.carousel', function(){
	//     sunset_get_bs_thumbs(carousel);
	//     });
	// }﻿;
	function isVisible( element ){
		
		var scroll_pos = $(window).scrollTop();
		var window_height = $(window).height();
		var el_top = $(element).offset().top;
		var el_height = $(element).height();
		var el_bottom = el_top + el_height;
		return ( ( el_bottom - el_height*0.25 > scroll_pos ) && ( el_top < ( scroll_pos+0.5*window_height ) ) );
		
	};
	

});

















