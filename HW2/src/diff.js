//对象构造器
function person(name, age,hometown)
{
	this.name = name;
	this.age = age;
	this.hometown = hometown;
}

function sortObj(a,b)
{
	var a_name = a.name;
	var b_name = b.name;
	if(a_name == b_name){return 0;}
	else if(a_name > b_name){return 1;}
	else if(a_name < b_name){return -1;}
}

function search(myArray, query)
{
	var flag = false;
	var num = myArray.length;
	if(num == 0){return false;}

	for(var i = 0; i<num; ++i){
		if(myArray[i].name == query){
			resultElement = myArray[i];
			return true;
		}
	}
	return false;
}

function diff(first, second)
{	
	//按照名字排序
	first.sort(sortObj); 
	second.sort(sortObj);

	var n = second.length;
	var result = new Array()
	var k = 0;

	//用i遍历第二个数组，如果该元素不在第一个数组中，添加到结果数组中
	for(var i = 0; i<n; ++i){
		if(!search(first, second[i].name)){
			result[k++] = second[i];
		}
	}
	if(k==0)	return false;
	else return result;

}

//测试
//创建实例对象
var stu1 = new person("Amy", 21, 'Beijing');
var stu2 = new person("Bob", 22, 'Beijing');
var stu3 = new person("Amy", 23, 'Shanghai');
var stu4 = new person("Sam", 22, 'Shanghai');
var stu5 = new person("Jane", 10, 'Anhui');
var stu6 = new person("Annie", 20, 'Henan');
var stu7 = new person("Daming", 30, 'Beijing');
var stu8 = new person();
var first = new Array(stu1, stu2, stu3, stu4)
var second = new Array(stu2, stu5, stu6, stu3)
diff(first, second);