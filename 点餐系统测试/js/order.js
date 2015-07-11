function goBack()
{
  window.history.back(-1);
}

window.onload=function(){
	document.getElementsByClassName('head')[0].style.display='block';
	document.getElementsByClassName('bd_head')[0].style.display='block';
	document.getElementsByClassName('body')[0].style.display='block';
	document.getElementsByClassName('foot')[0].style.display='block';
	document.getElementsByClassName('spinner-loader')[0].style.display='none';
	var lis=document.getElementsByTagName('li'),
	prices=document.getElementsByClassName('pr_num'),
	nums=document.getElementsByClassName('num');
	subtracts=document.getElementsByClassName('subtract'),
	adds=document.getElementsByClassName('add'),
	allprice=document.getElementById('foot_price_num'),
	allnum=document.getElementById('allnum'),
	buy=document.getElementsByClassName('buy'),
	cancle=document.getElementsByClassName('cancel');
	decide=document.getElementsByClassName('decide');
		
	buy[0].onclick=function(){
		decide[0].style.display='block';
	}
	cancle[0].onclick=function(){
		decide[0].style.display='none';
	}
	
	for(var i=0;i<lis.length;i++){
		lis[i].id=i;
		//添加减少菜数量
		(function(){
			var self=i;
			if(nums[self].textContent==0){
				lis[self].style.display='none';
			}else{
				lis[self].style.display='block';
			}
			subtracts[self].onclick=function(){
				nums[self].textContent--;
				if(nums[self].textContent<0){
					nums[self].textContent=0;
				}
				else{
					allnum.textContent--;
					if(allnum.textContent<0){
						allnum.textContent=0;
					}else{
						allprice.textContent=(Number(allprice.textContent)
						-Number(prices[self].textContent)).toFixed(2);
					}
				}

			}
			adds[self].onclick=function(){
				nums[self].textContent++;
				if(nums[self].textContent>99){
					nums[self].textContent=99;
				}
				allnum.textContent++;
				allprice.textContent=(Number(allprice.textContent)
				+Number(prices[self].textContent)).toFixed(2);
			}		
		})();	
	}

}
