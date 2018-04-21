jQuery(document).ready( function($){
	// //custom sunset script
	
	var carousel =  '.sunset-carousel-thumb';
	//call slide the first time the page load
	sunset_get_bs_thumbs(carousel);

	$(carousel).on('slid.bs.carousel', function(){
		sunset_get_bs_thumbs(carousel);
	});
	function sunset_get_bs_thumbs(carousel) {

		$(carousel).each(function(){
			var nextThumb = $(this).find('.item.active').find('.next-image-preview').data('image');
			var prevThumb = $(this).find('.item.active').find('.previous-image-preview').data('image');
		 	$(this).find('.carousel-control.right').find('.thumbnail-container').css({ 'background-image' : 'url('+nextThumb+')'});
		 	$(this).find('.carousel-control.left').find('.thumbnail-container').css({ 'background-image' : 'url('+prevThumb+')'});
		});
	}

	/* Ajax Functions */
	$(document).on('click', '.sunset-load-more:not(.loading)', function(){//click event will only execute if no loading class
		//this refers to '.sunset-load-more' element
		var that = $(this);
		var page = $(that).data('page');
		var newPage = page+1;
		var ajaxurl = $(that).data('url');

		that.addClass('loading').find('.text').slideUp(320);
		that.find('.sunset-icon').addClass('spin');

		$.ajax({
			url : ajaxurl,
			type: 'post',//like method ="post" in a form
			data: {
				page: page,
				action: 'sunset_load_more'
			},
			error: function(response){
				console.log(response);
			},
			success: function(response){
				$(that).data('page', newPage);
				$('.sunset-posts-container').append(response);

				setTimeout(function(){
					that.removeClass('loading').find('.text').slideDown(320);
					that.find('.sunset-icon').removeClass('spin');
				}, 2000 );
			}
		});

	});


});

