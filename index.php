<?php 
	/*
		@package sunsettheme
	*/
?>
<?php get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<?php if( is_paged() ): ?><!--  check if page is in pagination->meaning not in page 1 -->
				<div class="container text-center container-load-previous">
					<a class="btn-sunset-load sunset-load-more" data-prev="1" data-page="<?php echo sunset_check_paged(1);  ?>" data-url="<?php echo admin_url('admin-ajax.php'); ?>">
						<span class="sunset-icon sunset-loading"></span>
						<span class="text"> Load Previous</span>
					</a>
				</div><!-- container -->
			<?php endif; ?>
			<div class="container sunset-posts-container">
				<?php 
					if( have_posts() ):
						//echo '<div class="page-limit" data-page="'.get_site_url(). '/page/' . sunset_check_paged() . '">';
						echo '<div class="page-limit" data-page="'. get_site_url().'/page/'. sunset_check_paged() .'">';
						//echo get_site_url();
						while( have_posts() ): the_post();

							//$class = 'reveal';
							//set_query_var( 'post-class', $class );//set post-class as global variable-> can be retrieve by get_query_var()
							get_template_part( 'template-parts/content', get_post_format() );
						endwhile;
						echo '</div>';
					endif;
				?>
			</div><!-- .container -->
			<!-- more posts append here -->
			<div class="container text-center">
				<a class="btn-sunset-load sunset-load-more" data-page="<?php echo sunset_check_paged(1);  ?>" data-url="<?php echo admin_url('admin-ajax.php'); ?>">
					<span class="sunset-icon sunset-loading"></span>
					<span class="text"> Load More</span>
				</a>
			</div>
		</main>
	</div><!-- #primary -->

<?php get_footer(); ?>
