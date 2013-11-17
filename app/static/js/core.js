var Core = {};

Core = (function()
{
	var fn = {};
	var settings = {};

	/**
	 * Initialisation function. Loads in any settings passed to the script
	 * @param  {Object} obj
	 * @return none
	 */
	fn.init = function(obj)
	{
		Core.settings = obj;
		Core.getUserAgent();
		Core.globalConsole();
		Core.placeholderPolyfill();
		console.log('Script loaded: '+Core.settings.static_url+'js/core.js');
	};


	/**
	 * Function to set whether an iOS handheld device is being used or not.
	 * @return none
	 */
	fn.getUserAgent = function()
	{
		if (navigator.userAgent && navigator.userAgent.match(/(ipad)/i)) {
			Core.settings.ipad = true;
			Core.settings.ios = true;
		}
		else if (navigator.userAgent && navigator.userAgent.match(/(iphone|ipod)/i)) {
			Core.settings.iphone = true;
			Core.settings.ios = true;
		}
		else {
			Core.settings.ios = false;
		}

		if (Core.settings.ios) {
			// disable :hover on touch devices - This is a bugfixer
			if ('createTouch' in document && Core.settings.ios) {
			  try {
				var ignore = /:hover/;
				for (var i=0; i<document.styleSheets.length; i++) {
				  var sheet = document.styleSheets[i];
				  for (var j=sheet.cssRules.length-1; j>=0; j--) {
					var rule = sheet.cssRules[j];
					if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
					  sheet.deleteRule(j);
					}
				  }
				}
			  }
			  catch(e){}
			}
		};
	};


	/**
	 * Function to prevent console.log errors on IE
	 * @return none
	 */
	fn.globalConsole = function()
	{
		var method;
		var noop = function noop(){};
		var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
		var length = methods.length;
		var console = (window.console = window.console || {});
		while (length--) {
			method = methods[length];
			if (!console[method]) {
				console[method] = noop;
			}
		}
	};


	/**
	 * Function to give IE placeholder text
	 * @return none
	 */
	fn.placeholderPolyfill = function()
	{
		if(!Modernizr.input.placeholder){
			$('[placeholder]').focus(function() {
			  var input = $(this);
			  if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			  }
			}).blur(function() {
			  var input = $(this);
			  if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			  }
			}).blur();
			$('[placeholder]').parents('form').submit(function() {
			  $(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
				  input.val('');
				}
			  })
			});
		}
	};

	return fn;
}());