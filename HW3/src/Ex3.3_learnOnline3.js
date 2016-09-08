/**改造网络学堂课程首页**/


//解决溢出的问题
$('.head_l').remove();
$('.head_r').remove();
var content = $('a.ml10.courseNameList.blue');
var detail = $('td.student');
$('.box').attr({
	"class": "hidden"
});
$('.content_c').attr({
	"style": "min-height:0px"
});

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


var sc1 = document.createElement('link');
sc1.setAttribute('href', "http://yangyanzhe.github.io/slides/css/royalslider.css");
sc1.setAttribute('rel', 'stylesheet');

var sc2 = document.createElement('link');
sc2.setAttribute('href', "http://yangyanzhe.github.io/slides/css/reset.css");
sc2.setAttribute('rel', 'stylesheet');

var sc3 = document.createElement('link');
sc3.setAttribute('href', "http://yangyanzhe.github.io/slides/css/slide.css");
sc3.setAttribute('rel', 'stylesheet');

var sc4 = document.createElement('link');
sc4.setAttribute('href', "http://yangyanzhe.github.io/slides/css/skins/minimal-white/rs-minimal-white.css");
sc4.setAttribute('rel', 'stylesheet');

$('head').append(sc1);
$('head').append(sc2);
$('head').append(sc3);
$('head').append(sc4);

sc5 = document.createElement("script");
sc5.src = "http://yangyanzhe.github.io/slides/js/jquery-1.8.3.min.js";
document.head.appendChild(sc5);

sc6 = document.createElement("script");
sc6.src = "http://yangyanzhe.github.io/slides/js/slides.js";
document.body.appendChild(sc6);

sc7 = document.createElement("script");
sc7.src = "http://yangyanzhe.github.io/slides/js/jquery.royalslider.min.js";
document.head.appendChild(sc7);

sc8 = document.createElement("script");
sc8.src = "http://yangyanzhe.github.io/slides/js/jquery.easing-1.3.js";
document.head.appendChild(sc8);


var style = document.createElement('style')
var hover = "li a:hover{ "+" font-size:23px;"+
   			"font-weight:"+ "bold; "+
   			"background:#f6f6f6}";
$(style).html(function(){return hover;});
$('head').append(style);


var ppt = $('<div id="slider-with-blocks-1" class="royalSlider rsMinW"/>');
for(var i = 0; i<content.length-1; i++){
	switch(i%4){
		case 0:var ppt1 = $('<div class="rsContent slide1"/>');
			break;
		case 1:var ppt1 = $('<div class="rsContent slide2"/>');
			break;
		case 2:var ppt1 = $('<div class="rsContent slide3"/>');
			break;
		case 3:var ppt1 = $('<div class="rsContent slide4"/>');
			break;
	}
		
		
		
		var Container = $('<div class="bContainer"/>');	


			var strong = $('<strong class="rsABlock txtCent blockHeadline"/>');
			strong[0].textContent = content[i].textContent;
			var a = $('<a/>');
			a.attr({
				"href": content[i].href,
				"style": "color:#fff top:36%"
			});
			a.append(strong);
			var span1 = $('<span class="rsABlock txtCent" data-move-effect="none"/>');
			span1[0].textContent = detail[i*3].textContent; 
			var span2 = $('<span class="rsABlock txtCent" data-move-effect="none"/>');
			span2[0].textContent = detail[i*3+1].textContent; 
			var span3 = $('<span class="rsABlock txtCent" data-move-effect="none"/>');
			span3[0].textContent = detail[i*3+2].textContent; 
		Container.append(a);
		//Container.append(strong);
		Container.append(span1);
		Container.append(span2);
		Container.append(span3);
	ppt1.append(Container);

	ppt.append(ppt1);
}

$('.content_c').append(ppt);
void(0);
