function getId(id){
	return typeof id==='string'?document.getElementById(id):id;
}

function goBack()
{
  window.history.back(-1);
}

window.onload=function(){
	document.getElementsByClassName('body')[0].style.display='block';
	document.getElementsByClassName('spinner-loader')[0].style.display='none';
	var titles=getId('sd_body').getElementsByTagName('a'),
	mains=getId('main').getElementsByClassName('inner'),
	lis=document.querySelectorAll("#main .inner li"),
	subtracts=document.getElementsByClassName('subtract'),
	adds=document.getElementsByClassName('add'),
	inputs=document.getElementsByClassName('in'),
	prices=document.getElementsByClassName('pric_num'),
	close=document.getElementsByClassName('close'),
	buy=document.getElementsByClassName('buy'),
	order=document.getElementsByClassName('order'),
	od_uls=document.querySelectorAll('.order .od_content .od_body ul'),
	od_lis=document.querySelectorAll('.order .od_content .od_body ul li'),
	od_names=document.getElementsByClassName('od_name'),
	ob_nums=document.getElementsByClassName('ob_num'),
	names=document.getElementsByClassName('name'),
	allprices=document.getElementsByClassName('allMoney');
	
	if(titles.length!=mains.length)
		return;
		
		//Tab效果
	for(var i=0;i<titles.length;i++){
		titles[i].id=i;
		titles[i].onclick=function(){
			for(var j=0;j<titles.length;j++){
				titles[j].className=null;
				if(mains[j].style.display='block')
				mains[j].style.display='none';
			}
			titles[this.id].className='cur';
			getId('title').textContent=titles[this.id].textContent;
			mains[this.id].style.display='block';
		}
	}
	
	
	for(var a=0;a<lis.length;a++){
		lis[a].id=a+201230760205;
		//添加减少菜数量
		(function(){
			var self=a;
			subtracts[self].onclick=function(){
				inputs[self].value--;
				if(inputs[self].value<0){
					inputs[self].value=0;
				}
				else{
					getId('num').textContent--;
					if(getId('num').textContent<0){
						getId('num').textContent=0;
					}else{
						getId('foot_price_num').textContent=(Number(getId('foot_price_num').textContent)
						-Number(prices[self].textContent)).toFixed(2);
					}
				}

			}
			adds[self].onclick=function(){
				inputs[self].value++;
				if(inputs[self].value>99){
					inputs[self].value=99;
				}
				getId('num').textContent++;
				getId('foot_price_num').textContent=(Number(getId('foot_price_num').textContent)
				+Number(prices[self].textContent)).toFixed(2);
			}			
			
			
		})();	
	}
	
	
	

	//实现个人菜单的出现于关闭
	close[0].onclick=function(){
		order[0].style.display='none';
	}
	buy[0].onclick=function(){
		order[0].style.display='block';
		
		for(var b=0;b<inputs.length;b++){
			var self=b;	
			if(inputs[self].value>0){	
				od_lis[self].style.display='block';		
				od_names[self].textContent=names[self].textContent;
				ob_nums[self].textContent=inputs[self].value+'份';
			}else{
				od_lis[self].style.display='none';
			}	
		}
		allprices[0].textContent=getId('foot_price_num').textContent;
	}

}

