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
	$(document).on('click', '.sunset-load-more', function(){
		//this refers to '.sunset-load-more' element
		var that = $(this);
		var page = $(that).data('page');
		var newPage = page+1;
		var ajaxurl = $(that).data('url');

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
			},
		});

	});


});

