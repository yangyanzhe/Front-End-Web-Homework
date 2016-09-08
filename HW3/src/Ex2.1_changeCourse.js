var courseArray = document.getElementsByClassName('coursename');
var nameArray = document.getElementsByClassName('name');
var liArray = document.getElementsByTagName('ul')[0].getElementsByTagName('li');

for(var i = 0; i<courseArray.length; i++){
	var item = courseArray[i].getElementsByTagName('a')[0];

	if(item.text == "数据库技术及应用（计算机系）"){
		item.textContent = "Web前端技术实训（软件学院）";
		nameArray[i].textContent = "刘强";
		document.getElementsByTagName('ul')[0].insertBefore(liArray[i+1], liArray[1]);
	}
}
void(0);
