var list=[];
var guess="";

// listPermutations(6,4);
// console.log(list);
// console.log(list.length);

// console.log(getPegs("1241","0211"));
// console.log(getPegs("31251","01238"));
list=listPermutations(6,4);
$(document).ready(function(){
	$(".peg").click(function(){
		if($(this).css("background-color")==="rgb(0, 0, 0)") //black
		{
			$(this).css("background-color","rgb(255, 255, 255)");
			$(this).css("box-shadow","1px 1px 5px #33334C");
		}
		else if($(this).css("background-color")==="rgb(255, 255, 255)") //white
		{
			$(this).css("background-color", "rgb(117, 117, 163)");
			$(this).css("box-shadow","none");
			// $(this).width("10px");
			// $(this).height("10px");


		}
		else if($(this).css("background-color")=== "rgb(117, 117, 163)") //gray
		{
			$(this).css("background-color","rgb(0, 0, 0)");
			$(this).css("box-shadow","1px 1px 5px #33334C");
			$(this).css("border","none");
		}
		// console.log(readPegs());	
	});
	$("#newgame").click(function(){
		list=listPermutations(6,4);
		guess=chooseRandomly(list);
		console.log(guess);
		$("#guessdisplay").html(guess);
	});
	$("#submit").click(function(){
		var newList=thin(list, guess, readPegs());
		var newGuess=chooseRandomly(list);
		list=newList;
		guess=newGuess;
		console.log(readPegs());
		console.log(list);
		console.log(guess);
		$("#guessdisplay").html(guess);
	});
});


function test()
{
	listPermutations(3,3);
	console.log(list.length+" permutations");
	console.log(list);
	console.log(getPegs("201","011"));
	var res=thin(list, "011", getPegs("201","011"));
	console.log(res);
	console.log(res.length);
}
function readPegs()
{
	var result=[];
	result=readColor($("#first"), result);
	result=readColor($("#second"), result);
	result=readColor($("#third"), result);
	result=readColor($("#fourth"), result);
	return result.sort();
}
function readColor(element, array)
{
	if(element.css("background-color")==="rgb(0, 0, 0)")
		array.push("black");
	else if(element.css("background-color")==="rgb(255, 255, 255)")
		array.push("white");
	return array;
}
function mainFunction(n, spaces)
{
	listPermutations(n, spaces);
	console.log(list.length+" permutations");
	var guess=list[0];
	var pegresult=prompt(guess);



}
function listPermutations(n,s){
	list=[];
	return permute(n,s, "");
}
function permute(n,s,subsequence){
	for(var i=0; i<n; i++)
	{
		var newsubseq=subsequence+i.toString();
		if(newsubseq.length===s)
		{
			list.push(newsubseq);
		}
		else
		{
			permute(n, s, newsubseq);
		}
	}
	return list;
}
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}   

function arrayEquals(array1, array2) {
    // if the other array is a falsy value, return
    if (!array1 || !array2)
        return false;

    // compare lengths - can save a lot of time 
    if (array1.length != array2.length)
        return false;

    for (var i = 0, l=array1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!arrayEquals(array1[i], array2[i]))
                return false;       
        }           
        else if (array1[i] != array2[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}   
function getPegs(code, guess){
	if (code.length!==guess.length)
	{
		console.log("UNEXPECTED INPUT, different lengths of code "+
					code+" and guess "+guess);
		return;
	}
	var pegs=[];
	var cAwardIdxs=[];
	var gAwardIdxs=[];
	for(var i=0; i<code.length; i++)
	{
		if(code.charAt(i)===guess.charAt(i))
		{
			pegs.push("black");
			cAwardIdxs.push(i);
			gAwardIdxs.push(i);
		}

		for(var j=0; j<code.length; j++)
		{
			if(code.charAt(i)===guess.charAt(j) 
				&& !contains(cAwardIdxs, i) 
				&& !contains(gAwardIdxs, j))
			{
					pegs.push("white");
					cAwardIdxs.push(i);
					gAwardIdxs.push(j);
			}
		}
	}
	return pegs.sort();
}
function thin(possible, guess, result)
{
	var refined=[];
	for (var i = possible.length - 1; i >= 0; i--) 
	{
		var tmp=getPegs(possible[i], guess);
		// console.log("tmp: "+tmp+"; res: "+result+arrayEquals(result,tmp));
		if(arrayEquals(result, tmp))
		{
			refined.push(possible[i]);
		}
	}
	return refined;
}
function chooseRandomly(array)
{
	var rand=Math.floor((Math.random() * array.length));
	return array[rand];
}