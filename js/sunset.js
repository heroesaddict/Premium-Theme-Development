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
});

