	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/static/build/js/jquery-1.10.2.min.js"><\/script>')</script>
    <!--[if lte IE 8]>
    <script type="text/javascript" src="/static/build/js/selectivizr.js"></script>
    <![endif]-->
	<script src="/static/build/js/Belter.js"></script>
	<script type="text/javascript">
		$(function(){ Core.init({ static_url: '/static/' }); });
	</script>
    <?php if (strpos($_SERVER['SERVER_NAME'], '.dev')): ?>
        <script src="//localhost:35729/livereload.js"></script>
    <?php endif ?>
</body>
</html>