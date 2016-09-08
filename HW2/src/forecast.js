/*************************************************
** forecast.js
** Author: 杨妍喆
** Time: 2014/7/3
** 思路：1. 将对象转换为数组方便计算，分别计算16→8→4→2→1
**		 2. 利用条件概率及全概率公式，分别计算每个队第一轮至第四轮获胜的概率，
**	     计算规则如下(以8进4的A1为例)：
**		      在八进四的时候，A1可能会与C1、D2比赛，所以A1进入四强的概率为 
**		      p = p(A1进入八强) * {p(A1胜C1)*p(C1进入八强) + p(A1胜D2)*p(D2进入八强)}
**	
**		2. 将函数封装为方法，使之在调用时使用特定的this引用的简单方法。
**
****************************************************/

function chance(num1, num2){
	if(num1 == 0 && num2 != 0){return 0;}
	if(num1 == 0 && num2 == 0){return 0.5;}
	if(num1 != 0 && num2 == 0){return 1;}
	return num1/(num1+num2);
}

function sum(myArray){
	var n = myArray.length;
	var sum = 0;
	for(var i = 0; i<n; i++){
		sum += myArray[i];
	}
	return sum;
}

//n表示现在入选的有几只队伍，如八强进四强，n=8
function round(myArray, prob, n){
	var result = new Array()
	var group_number = parseInt(16/n);	
	//如果n=8，认为是会有8个group, group_number为每个group中的球队个数

	for(var i = 0; i<16; i++){
		//优化性能
		if(prob[i] == 0){
			result[i] = 0;
			continue;
		}

		var group = parseInt(i/group_number);			
		var j = i % (group_number*2);		
		
		var num = new Array()				//记录在下一级的角逐中与每一个可能遇到队伍比赛的获胜率
		var a;								//临时变量，记录应该可能遇到的队伍组开始的下标

		if(j<group_number){
			a = (group+1)*group_number;
		}
		else{
			a = (group-1)*group_number;
		}	
		for(var k = 0; k<group_number; k++){
			num[k] = chance(myArray[i], myArray[a+k]) * prob[a+k] * prob[i];
		}
		result[i] = sum(num); 
		
	}
	return result;
}

function func(value, order){
	//将它转为数组，方便进行运算
	var myArray = new Array(value.A1, value.B2, value.C1, value.D2,
							value.E1, value.F2, value.G1, value.H2,
							value.B1, value.A2, value.D1, value.C2,
							value.F1, value.E2, value.H1, value.G2)
	var prob_init = new Array()
	for(var i = 0; i<16; i++){prob_init[i] = 1;}
	var prob_round1 = round(myArray, prob_init, 16);
	var prob_round2 = round(myArray, prob_round1, 8);
	var prob_round3 = round(myArray, prob_round2, 4);
	var prob_round4 = round(myArray, prob_round3, 2);

	var num;
	switch(order){
		case 'A1': num = 0; break;
		case 'B2': num = 1; break;
		case 'C1': num = 2; break;
		case 'D2': num = 3; break;
		case 'E1': num = 4; break;
		case 'F2': num = 5; break;
		case 'G1': num = 6; break;
		case 'H2': num = 7; break;
		case 'B1': num = 8; break;
		case 'A2': num = 9; break;
		case 'D1': num = 10; break;
		case 'C2': num = 11; break;
		case 'F1': num = 12; break;
		case 'E2': num = 13; break;
		case 'H1': num = 14; break;
		case 'G2': num = 15; break;
		fault: break;
	}
	return prob_round4[num];
}

//方法forecast
var forecast = function(obj, str){
	this.obj = obj;
	this.str = str+"";
    this.run = function(){
    	return func(obj, str);
	}
}

//测试
var value = {
	A1: 1, A2: 1, B1: 1, B2: 1,
	C1: 1, C2: 1, D1: 1, D2: 1,
	E1: 1, E2: 1, F1: 1, F2: 1,
	G1: 1, G2: 1, H1: 1, H2: 1
};
var order = 'H1'; 
var a = new forecast(value, order);
a.run();

