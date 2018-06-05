<?php
/*
	
@package sunsettheme
	
	========================
		SHORTCODES OPTIONS
	========================
*/
function sunset_tooltip( $atts, $content = null){
	//get the attributes
	$atts = shortcode_atts(
		array(
			'placement' => 'top',
			'title' => "",
		),
		$atts,
		'tooltip'
	);
	$title = ($atts['title'] == '' ? $content : $atts['title']);
	//return html
	return '<span class="sunset-tooltip" data-toggle="tooltip" data-placement="'. $atts['placement'].'" title="' . $title . '">'. $content .'</span>';
}
/* [tooltip placement='top' title='This is the title']This is the content[/tooltip] */
add_shortcode('tooltip', 'sunset_tooltip');