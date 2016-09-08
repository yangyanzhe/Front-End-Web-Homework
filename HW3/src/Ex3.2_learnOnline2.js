/**改造讨论区**/
//解决溢出的问题
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
h1[0].setAttribute('style', 'line-height:44px; text-shadow:2px 2px 3px #856699');
var e = document.createElement('div');
e.appendChild(h1[0]);
e.setAttribute('style', 'height:44px; width:400px');
top_bar.appendChild(e);

//解决排版的问题
$('.hw-table-c').attr({
	"style": "padding-left:20px"
});

//移除旧布局
$('.hw-table-title').remove();
var content = $('.hw-table-c')[0];
$('.hw-table-c').remove();

//给出新布局
var list = content.getElementsByTagName('tr');
// 创建一个文档碎片
var docFrag = document.createDocumentFragment();
// 在碎片上加入100个div节点
for(var i = 0;i < list.length;i++){
	var t = list[i].getElementsByTagName('td');
	var div = document.createElement('div');
	$(div).attr({
		"style": "margin:20px; height:120px; font-size:18px; padding:20px"
	});
	div.style.border = "dotted";
	div.style.borderRadius = "5px";
	div.style.borderColor = "#DDDDDD";
	div.style.boxShadow = "5px 5px 7px #808080";
	div.style.fontFamily = "微软雅黑";

		var img = $('<img src="http://learn.cic.tsinghua.edu.cn:80/res/fzjx/images/common/zh_CN/book_cover.png" alt="">');
		img.attr({
			"style": "float:left"
		});
		$(div).append(img);

		var title = $('<div/>');
		$(title).append(t[0].children[0]);
		$(title).attr({
			"style": "font-weight: bold"
		});
		$(div).append(title);

		
		var p = document.createElement('div');
		$(p).attr({
			"style": "margin-top:20px; margin-left:160px; height:100px"
		});
		p.style.fontFamily = "楷体";
		p.style.fontSize = 18;
		var author = "作者：" +  t[2].textContent + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		var time = "发帖时间：" + t[1].textContent;
		$(p).html(function(){
			return "<p>" + author + time+ "<br/>" + "这里可以有返回的内容简介...";
		});
		div.appendChild(p);

		

    docFrag.appendChild(div);
}

// 加docFrag加入到DOM-Tree
$('.hw-content').append(docFrag);