/*******************************************************
** search.js
** Author: 杨妍喆
** Time: 2014/7/3
** 思路：1. 判断参数二的类型分别处理；
**		 2. 如果是一个对象，则
**			2.1 按name、age、hometown的顺序依次筛选
**	 		2.2 如果参数二没有age、name或hometown类型，则跳过；
**	 		2.3 如果参数二有该类型，但不匹配，直接返回false
**		 3. 将函数封装为方法
**
*********************************************************/

//对象构造器
function person(name, age,hometown)
{
	this.name = name;
	this.age = age;
	this.hometown = hometown;
}

function searchByAge(myArray, query){
	var resultArray = new Array()
	var flag = false;
	var k = 0;
	var num = myArray.length;

	for(var i = 0; i<num; ++i){
		if(myArray[i].age == query){
			resultArray[k++] = myArray[i];
			flag = true;
		}
	}
	if(flag){
		return resultArray;
	}
	else return false;
}

function searchByNameOne(myArray, query){
	var resultElement = new Object()
	var flag = false;
	var num = myArray.length;

	for(var i = 0; i<num; ++i){
		if(myArray[i].name == query){
			resultElement = myArray[i];
			flag = true;
			break;
		}
	}
	if(flag) return resultElement;
	else return false;
}

function func(myArray, query)
{
	if(myArray.length <= 0) return false;

	var type = typeof query;
	var num = myArray.length;
	var resultArray = new Array()
	var resultElement = new Object()
	var k = 0;
	var flag = false;

	if(type == "number"){			//第一种情况
		return searchByAge(myArray, query);
	}

	else if(type == "string"){		//第二种情况
		return searchByNameOne(myArray, query);
	}

	else if(type == "object"){		//第三种情况
		var nameArray = new Array()
		var ageArray = new Array()
		var flag_name = false;		
		var flag_age = false;
		var flag_ht = false;

		//flat_type用来判断给的对象中是否有该元素
		if(typeof query.name == "string"){flag_name = true;}
		if(typeof query.age == "number"){flag_age = true;}
		if(typeof query.hometown == "string"){flag_ht = true;}
		if(!flag_name && !flag_age && !flag_ht)	return false;

		if(flag_name){
			var name_k = 0;

			for(var i = 0; i<num; ++i){
				if(myArray[i].name == query.name){
					nameArray[name_k++] = myArray[i];
				}
			}
		}
		else if(!falg_name){
			nameArray = myArray;
		}

		if(flag_age){
			var age_k = 0;
			var age_n = nameArray.length;
			if(age_n == 0)	return false;

			for(var i = 0; i<age_n; ++i){
				if(nameArray[i].age == query.age){
					ageArray[age_k++] = nameArray[i];
				}
			}
		}
		else if(!flag_age){
			ageArray = nameArray;
		}

		if(flag_ht){
			var ht_k = 0;
			var ht_n = ageArray.length;
			if(ht_n == 0)	return false;

			for(var i = 0; i<ht_n; ++i){
				if(ageArray[i].hometown == query.hometown){
					resultArray[ht_k++] = ageArray[i];
				}
			}
		}
		else if(!flag_ht){
			resultArray = ageArray;
		}
	}
	if(resultArray.length != 0)	{
		return resultArray;
	}

	return false;
}

var search = function(myArray, query){
	this.myArray = myArray;
	this.query = query;
	this.run = function(){
		return func(myArray, query);
	}
}

//测试
//创建实例对象
var stu1 = new person("Amy", 21, 'Beijing');
var stu2 = new person("Bob", 22, 'Beijing');
var stu3 = new person("Amy", 23, 'Shanghai');
var stu4 = new person("Sam", 22, 'Shanghai');
var myArray = new Array(stu1, stu2, stu3, stu4)
var test1 = "Annie";
var test2 = 23;
var test3 = {name: "Amy", hometown: 'Shanghai'};

var a = new search(myArray, test1);
a.run();