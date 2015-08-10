(function(W,$){
	W.vs =  W.vs || {};

	W.vs.TileMenu = function(el, opts){  
		this.parentEl = el || $('body');
		this.el = null;
		this.className = opts.className;
		this.trigger = $(opts.trigger); 
		this.buttons = opts.buttons || [];
		this.closeOnClick = opts.closeOnClick || false;
		this.onOutsideClick = opts.onOutsideClick || false; 
		this.buttonsEl = null;
		this.overlayEl = null;
	 };

	W.vs.TileMenu.boot = function(){
		$('.tile-menu[data-tile-menu]').each(function(k,o){ 
			if(!$(this).data('__TILE_MENU__')){
				$(this).data('__TILE_MENU__', new W.vs.TileMenu(this));
			}
		});
	};

	W.vs.TileMenu.prototype = {
		render: function(){  
			var rowNum = Math.ceil(this.buttons.length/2),self=this;
				rowHeight = 100/(rowNum), mod = this.buttons.length % 2, str='';
			for(var i=0;i<this.buttons.length-mod;i=i+2){
				str += '<div class="tile-menu-row"><div class="tile-menu-item" index="'+i+'""><div class="'+this.buttons[i].settings.className+'">'+this.buttons[i].label+'</div></div><div class="tile-menu-item"  index="'+Math.min(this.buttons.length-mod, (i+1))+'"><div class="'+this.buttons[Math.min(this.buttons.length-mod, (i+1))].settings.className+'">'+this.buttons[Math.min(this.buttons.length-mod, (i+1))].label+'</div></div></div>';
			}
			if (mod){ 
				str +='<div class="tile-menu-row"><div class="tile-menu-item" index="'+(this.buttons.length-1)+'" style="width:100%;"><div class="'+this.buttons[this.buttons.length-1].settings.className+'">'+this.buttons[this.buttons.length-1].label+'</div></div></div></div>';
			}
			this.el = $('<div class="tile-menu-container '+this.className+'"><div class="overlay"></div>'+str+'</div>').appendTo(this.parentEl);
			this.el.find('.tile-menu-row').css('height', rowHeight+'%');
			this.buttonsEl = this.el.find('.tile-menu-item'); 
			this.overlayEl = this.el.find('.overlay');
			this.buttonsEl.on('click',function(e){
				self.onItemClick(parseInt($(this).attr('index')));
				e.stopPropagation();
			});
			this.trigger.on('click', $.proxy(this.onTriggerClick, this)); 
			var overlay = this.onOutsideClick && this.overlayEl.on('click', $.proxy(this.hide, this);
			if(this.onOutsideClick){ 
				this.overlayEl.on('click', $.proxy(this.hide, this));
			}
			$(window).on('resize', $.proxy(this.onResize, this));
			$(window).trigger('resize');
		},
		onResize: function(e){ 
			this.el.css({
				width: '80%',
				height: $(window).height()-100
			}); 
		},
		hide:function(e){
			this.el.removeClass('active');
		},
		show:function(){
			this.el.addClass('active');
		},
		onTriggerClick: function(){
			this.el.toggleClass('active');
		},
		onItemClick: function(index){  
			var m = this.buttons[index].onClick;
			if(m){
				m(this.el, this.parentEl);
			}
			// if (this.buttons[index].onClick){  
			// 	this.buttons[index].onClick(this.el, this.parentEl);
			// }
			var n = (this.closeOnClick) && this.hide();
			// if (this.closeOnClick){
			// 	this.hide();
			// }
		}
	};

	$.fn.TileMenu = function(options){
		return this.each(function(){ 
			$(this).data('__TILE_MENU__', (p = new W.vs.TileMenu($(this), options)).render());
		});
	};

	$(document).ready(function(){
		W.vs.TileMenu.boot(); 
	});

})(window,jQuery);
