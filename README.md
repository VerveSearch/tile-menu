# tile-menu 

A tile-menu plugin, that creates an icon menu, for example, for social buttons.

## Dependencies and Libraries 

1. jquery.min.js  

## Usage

Instantiate the pluguin on a DOM element or create a new one,
trigger options specifies the element that triggers menu show(),
className - class to add style to the container,
buttons - array of button that you want to add to the menu,
each object has: 
	type - which is a button or href,
	onClick handles the callback onItemClick,
	label to style the icon,
	settins - className to add a specific calss to each element if necessary.

```javascript

	$('.tile-el').TileMenu({
		trigger: '#tile-menu',
		className : 'common-class',
		buttons:[{
			"type" : "button",
			onClick: function(el,parentEl){ 
			},
			"label" : '<i class="fa fa-facebook fa-4x"></i>',
			"settings" : {
				"className" : "my-class-name"
			}
		},{
			"type" : "button",
			onClick: function(el,parentEl){ 
			},
			"label" : '<i class="fa fa-twitter fa-4x"></i>',
			"settings" : {
				"className" : "my-class-name"
			}
		},{
			"type" : "button",
			onClick: function(el,parentEl){
				console.log(el)
				console.log(parentEl)
				el.toggleClass('active');
			},
			"label" : '<i class="fa fa-times fa-4x"></i>',
			"settings" : {
				"className" : "my-class-name"
			}
		}],
		closeOnClick : false,
		onOutsideClick: true
	});
	 
```

```html

<div id="tile-menu">
	<span>Share</span> 
</div>
<div class="tile-el">

</div>

```	  		
