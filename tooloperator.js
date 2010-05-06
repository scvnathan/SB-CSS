	(function($) {
		$.fn.extend({
			toolOperator :function(options) {
				var selector = $(this).selector;
				var defaults = {
					textElem : null,
					text : "tooltip!",					
					outerDiv: true,
					delegateElem : null,
					callback : function(){}						
				}
				var options = $.extend(defaults, options);
				function showTip(text,obj) {
					var sbTip = obj.find('.sbTipInner');
					if (sbTip.length<=0) {
						var tipStr =(options.outerDiv) ? "<div class='sbTipOuter'><span class='sbTipInner'>&#10230;"+text+"</span></div>" : "<div class='sbTipInner'>&#10230;"+text+"</div>"
						obj.append(tipStr);
					} else {
						sbTip.show();
					}
					(options.callback)(obj);
					
				}				
				function hideTip(obj) {
					obj.find('.sbTipInner, .sbTipOuter').hide();
				}
				this.destroy = function(t) {
					t.find('.sbToolTip').remove();		
					if(options.delegateElem!=null) {
						options.delegateElem.undelegate();
					}			
				}

				
				return this.each(function(){
					var o = options;
					var text = $(this).find(o.textElem).attr('title');
					if (o.delegateElem == null) {					
						$(this).bind("mouseenter",function(){
							showTip(text,$(this));
						});
						$(this).bind("mouseleave",function(){
							hideTip($(this));
						});
						
					} else {
						o.delegateElem.delegate(selector,'mouseenter',function(){
							showTip($(this).find(o.textElem).attr('title'),$(this));
						});
						o.delegateElem.delegate(selector,'mouseleave',function(){
							hideTip($(this));
						});					
					}
					return this
				})		
			}			
		});
	})(jQuery);