<?php
/*
	
@package sunsettheme
	
	========================
		AJAX FUNCTIONS
	========================
*/
add_action( 'wp_ajax_nopriv_sunset_load_more', 'sunset_load_more' );
add_action( 'wp_ajax_sunset_load_more', 'sunset_load_more' );

add_action( 'wp_ajax_nopriv_sunset_save_user_contact_form', 'sunset_save_contact' );
add_action( 'wp_ajax_sunset_save_user_contact_form', 'sunset_save_contact' );

function sunset_load_more() {
	
	$paged = $_POST["page"]+1;
	//echo $paged;
	$prev = $_POST["prev"];
	$archive = $_POST["archive"];
	
	if( $prev == 1 && $_POST["page"] != 1) {
		$paged = $_POST["page"]-1;
	}
	$args = array(
		'post_type' 	=> 'post',
		'post_status'	=> 'publish',
		'paged' 		=> $paged
	);
	if ( $archive != '0' ) { //check if in archive page
		$archVal = explode( '/', $archive );
		// $type = ( $archVal[3] == 'category' ? 'category_name' : $archVal[3] ) ;
		// $args[$type] = $archVal[4];
		
		// $page_trail = get_site_url(). '/' .$archVal[3] .  '/' .$archVal[4] .  '/';
		
		// $args_archive_names = array ('category', 'tag', 'author');

		// foreach($args_archive_names as $name ) {
		// 	if( in_array( $name, $archVal ) ){
		
		// 		$type = $name;
		// 		$currKey = array_keys( $archVal,  $name );
		// 		$nextKey = $currKey[0]+1;
		// 		$value = $archVal[ $nextKey ];
				
		// 		$args[ $type ] = $value;
				
		// 	}
		// }
		
		// if( in_array( "category", $archVal ) ){
		
		// $type = "category_name";
		// $currKey = array_keys( $archVal, "category" );
		// $nextKey = $currKey[0]+1;
		// $value = $archVal[ $nextKey ];
		
		// $args[ $type ] = $value;
		
		// }

		// if( in_array( "tag", $archVal ) ){
		
		// $type = "tag";
		// $currKey = array_keys( $archVal, "tag" );
		// $nextKey = $currKey[0]+1;
		// $value = $archVal[ $nextKey ];
		
		// $args[ $type ] = $value;
		
		// }

		// if( in_array( "page", $archVal ) ){
		// 	$pageVal = explode('page', $archive);
		// 	$page_trail =$archVal[0];
		// } else {
		// 	//echo $archive;
		// 	$page_trail =$archive .'/';
		// }

		$flipped = array_flip($archVal);
		// if ( isset( $flipped["category"]) || isset( $flipped["tag"]) || isset( $flipped["author"])) {
		// 	if ( isset( $flipped["category"])) {
		// 		$type = "category_name";
		// 		$key = "category";
		// 	} else if ( isset( $flipped["tag"])){
		// 		$type = "tag";
		// 		$key = $type;
		// 	} else if ( isset( $flipped["tag"])){
		// 		$type = "author";
		// 		$key = $type;
		// 	}

		// 	$currKey = array_keys( $archVal, $key );
		// 	$nextKey = $currKey[0]+1;
		// 	$value = $archVal[ $nextKey ];
			
		// 	$args[ $type ] = $value;
		// }

		switch( isset( $flipped ) ) {
			
			case $flipped["category"] :
				$type = "category_name";
				$key = "category";
				break;
				
			case $flipped["tag"] :
				$type = "tag";
				$key = $type;
				break;
				
			case $flipped["author"] :
				$type = "author";
				$key = $type;
				break;
			
		}
		$currKey = array_keys( $archVal, $key );
		$nextKey = $currKey[0]+1;
		$value = $archVal[ $nextKey ];
			
		$args[ $type ] = $value;



		//check page trail and remove "page" value
		if ( isset( $flipped["page"])){
			$pageVal = explode('page', $archive);
			$page_trail =$pageVal[0];
		} else {
			//echo $archive;
			$page_trail =$archive ;
		}
		
		
	
		
	} else { // usual
		$page_trail =get_site_url().'/';

	}
	$query = new WP_Query( $args );
	
	if( $query->have_posts() ):
		//echo '<div class="page-limit" data-page="'. get_site_url() . '/page/' . $paged . '">';
		//echo '<div class="page-limit" data-page="'.get_site_url().'/page/'.$paged.'">';	
		echo '<div class="page-limit" data-page="'.$page_trail.'page/'.$paged. '/' . '">';		
		while( $query->have_posts() ): $query->the_post();
		
			get_template_part( 'template-parts/content', get_post_format() );
		
		endwhile;
		echo '</div>';
	else:
		echo 0;
	endif;
	
	wp_reset_postdata();
	
	die();
	
}
function sunset_check_paged( $num = null ){
	
	$output = '';
	
	if( is_paged() ){ $output = get_query_var( 'paged' ); }
	
	if( $num == 1 ){
		$paged = ( get_query_var( 'paged' ) == 0 ? 1 : get_query_var( 'paged' ) );
		return $paged;
	} else {
		return $output;
	}
	
}

function sunset_save_contact(){
	$title = wp_strip_all_tags($_POST["name"]);
	$email = wp_strip_all_tags($_POST["email"]);
	$message = wp_strip_all_tags($_POST["message"]);
	echo $title . ',' . $email . ',' .$message;
	// wp_insert_post();
	die();
}
