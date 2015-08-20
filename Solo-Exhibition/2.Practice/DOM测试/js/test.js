var year=document.getElementById('year');
var month=document.getElementById('month');
var day=document.getElementById('date');
//num为“日”选择器里面option的数量
var num=0;

//通过year跟month的value的值来计算判断'日'有多少个option
function day_num(){
	if(month.value==1||month.value==3||month.value==5||month.value==7||month.value==8||month.value==10||month.value==12){
		num=31;
	}else if(month.value==4||month.value==6||month.value==9||month.value==11){
		num=30;
	}else if(year.value%4==0&&month.value==2){
		num=29;
	}else if(month.value==2){
		num=28;
	}
}

//移除跟填充
function fillSelect(select,num){
	for(var i=select.length-1;i>0;i--){
		select.remove(i);
	}
	for(var j=1;j<=num;j++){
		var option=new Option(j,j);
		select.add(option);
	}
}

//监听“年”的改变来限制“月”跟“日“的取零操作
year.addEventListener('change',function(){
	if(year.value==0){
		month.value=0;
		day.value=0;
	}
	//监听”年“的改变，获取改变后全局变量num的值
	day_num();
	//刷新”日“的选择器
	fillSelect(day,num);
});

//监听“月”的改变来限制“日“的取零操作
month.addEventListener('change',function(){
	//假设”年“为0，则”月“不可选取，这部分必须有
	if(year.value==0)
		month.value=0;
	if(month.value==0)
		day.value=0;
	//监听”月“的改变，获取改变后全局变量num的值
	day_num();
	fillSelect(day,num);
});

day.addEventListener('change',function(){
	//假设”月“为0，则”日“不可选取，这部分必须有
	if(month.value==0)
	day.value=0;
});


