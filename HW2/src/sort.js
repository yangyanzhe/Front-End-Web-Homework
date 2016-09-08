function InsertSort(myArray){
	var n = myArray.length;
	for(var j = 1; j<n; j++){
		var key = myArray[j];
		var i = j-1;
		while(i>=0 && myArray[i]>key){
			myArray[i+1] = myArray[i];
			i = i-1;
		}
		myArray[i+1] = key;
	}
	return myArray;
}

function BubbleSort(myArray){
	var n = myArray.length;
	for(var i = 0; i<n; i++){
		for(var j = n-1; j>i; j--){
			if(myArray[j] < myArray[j-1]){
				var temp = myArray[j];
				myArray[j] = myArray[j-1];
				myArray[j-1] = temp;
			}
		}
	}
	return myArray;
}

function SelectionSort(myArray){
	var n = myArray.length;

	for(var i = 0; i<n; i++){
		var index = i;

		for(var j = i+1; j<n; j++){
			if(myArray[j] < myArray[index]){
				index = j;
			}
		}

		if(index != i){
			var temp = myArray[i];
			myArray[i] = myArray[index];
			myArray[index] = temp;
		}
	}
	return myArray;
}

function test(myArray){
	console.info("插入排序的结果是:", InsertSort(myArray));
	console.info("冒泡排序的结果是:", BubbleSort(myArray));
	console.info("选择排序的结果是:", SelectionSort(myArray));
}

var a = new Array(1, 2, 10, 7, 6);
var b = new Array(9, 0, 5, 0, 8);
var c = new Array(3, 2, 9, 8, 3);
test(c);

