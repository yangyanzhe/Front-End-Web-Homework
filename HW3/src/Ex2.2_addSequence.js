var notice = document.getElementsByClassName('newNotice red bold');
var file = document.getElementsByClassName('newFile red bold');
var unhandHw = document.getElementsByClassName('unhandHw');
for(var i = 0; i<notice.length; i++){
	notice[i].textContent = 1073741824;
	file[i].textContent = 1073741824;
	unhandHw[i].textContent = 1073741824;
}

var table = document.getElementsByClassName('lh30');
for(var i = 1; i<table.length-1; i++){
	var x = document.createElement('td');
	var y = document.createElement('a');
	y.style.marginLeft = "10px";
	y.textContent = i;
	x.appendChild(y);
	var line = table[i].getElementsByTagName('td');
	table[i].insertBefore(x, line[0]);
}

