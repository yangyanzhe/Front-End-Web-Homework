/**改造溢出和居中的问题**/

$('.head_l').remove();
$('.head_r').remove();
$('settings').attr({
	"style": "clear:both; overflow:hidden;  height: 52px; width:100%"
});
$('.head_c').attr({
	"style": "clear:both; overflow:hidden;  height: 52px; width:100%"
});
$('.top-bar').attr({
	"style": "clear:both; overflow:hidden;  height: 40px; width:100%;"
});
$('.class-nav').attr({
	"style": "margin-right:20px; margin-bottom:20px"
});

var top_bar = $('.top-bar')[0];
var h1 = top_bar.getElementsByTagName('h1');
h1[0].setAttribute('style', 'line-height:44px, text-shadow:2px 2px 3px #856699');
var e = document.createElement('div');
e.appendChild(h1[0]);
e.setAttribute('style', 'height:44px; width:400px');
top_bar.appendChild(e);

/*
$('#head').attr({
	"style": "position:fixed; clear:both; float:left"
});

$('#content').attr({
	"style": "margin-top:52px"
});*/