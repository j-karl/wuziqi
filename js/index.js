$(function(){

	var state;
	var isAi;
	var flag = true;

	$('.renji').on('click',function(){
		$('.bounds').addClass('noshow');
		isAi = true;
	});
	$('.renren').on('click',function(){
		$('.bounds').addClass('noshow');
		isAi = false;
	});
	$('.quitGame').on('click',function(){
		$('.confirm').addClass('show');
	});
	$('.cqueding').on('click',function(){
		alert(1);
		window.close();
	});
	$('.cfanhui').on('click',function(){
		$('.confirm').removeClass('show');
	});
	$('.start').on('click',function(){
		if(state == undefined||state == null){
			start();
			state="play";
		}else{
			$('.qipan').empty();
			state = 'over';
			start();
		}
	});

	$('.admitDefeat').on('click',function(){
		if(state == 'play'){
			endTime();
			endTime1();
			$('.qizi').off('click');
			$('.aDtishi').addClass('show');
			state='over';
		}else{
			$('.huiqiMessage').html('请先开始游戏').addClass('show');
		 	setTimeout(function(){
		 		$('.huiqiMessage').removeClass('show');
		 	},1000);
		}
	});
	$('.restart').on('click',function(){
		$('.aDtishi').removeClass('show');
		$('.qipan').empty();
		flag = true;
		start();
	});
	$('.quit').on('click',function(){
		$('.bounds').removeClass('noshow');
		$('.aDtishi').removeClass('show');
		$('.qipan').empty();
		endTime();
		endTime1();
		state = 'over';
	});
	$('.fan').on('click',function(){
		$('.bounds').removeClass('noshow');
		$('.aDtishi').removeClass('show');
		$('.qipan').empty();
		endTime();
		endTime1();
		state = 'over';
	});
	$('.regret').on('click',function(){
		var changdu = getJsonLength(hei);
		var changdu1 = getJsonLength(bai);
		if(isAi == true){
			if(state == 'play'){
				if(changdu){
					var arrHei = [];
					for(var i in hei){
						arrHei.push(i);
					}
					var arrBai = [];
					for(var i in bai){
						arrBai.push(i);
					}
					var h = arrHei[parseInt(arrHei.length)-1];
					var lastHei = h.split('_').join('-');
					$('#'+lastHei).removeClass('heizi');
					var b = arrBai[parseInt(arrBai.length)-1];
					var lastBai = b.split('_').join('-');
					$('#'+lastBai).removeClass('baizi');

					delete hei[h];
					delete bai[b];
					kongbai[h] = {x:h.split('_')[0],y:h.split('_')[1]};
					kongbai[b] = {x:b.split('_')[0],y:b.split('_')[1]};
			 	}else{
			 		$('.huiqiMessage').html('没有棋子').addClass('show');
			 		setTimeout(function(){
			 			$('.huiqiMessage').removeClass('show');
			 		},1000);
			 		return;
			 	}
			}else if(state == undefined || state == null){
				$('.huiqiMessage').html('请先开始游戏').addClass('show');
			 		setTimeout(function(){
			 			$('.huiqiMessage').removeClass('show');
			 		},1000);
				return;
			}
		}else{
			if(flag == true){
				if(changdu){
					var arrBai = [];
					for(var i in bai){
						arrBai.push(i);
					}
					var b = arrBai[parseInt(arrBai.length)-1];
					var lastBai = b.split('_').join('-');
					$('#'+lastBai).removeClass('baizi');
					delete bai[b];
					// console.log(kongbai);
					// delete kongbai[b];
					kongbai[b] = {x:b.split('_')[0],y:b.split('_')[1]};
					flag = false;
					return;
				}else{
					$('.huiqiMessage').html('没有棋子').addClass('show');
			 		setTimeout(function(){
			 			$('.huiqiMessage').removeClass('show');
			 		},1000);
			 		return;
				}
			}else if(flag == false){
				if(changdu){
					var arrHei = [];
					for(var i in hei){
						arrHei.push(i);
					}
					var h = arrHei[parseInt(arrHei.length)-1];
					// console.log(h);
					var lastHei = h.split('_').join('-');
					$('#'+lastHei).removeClass('heizi');
					// console.log(kongbai);
					delete hei[h];
					// delete kongbai[h];
					// console.log(kongbai);
					kongbai[h] = {x:h.split('_')[0],y:h.split('_')[1]};
					flag = true;
					return;
				}else{
					$('.huiqiMessage').html('没有棋子').addClass('show');
			 		setTimeout(function(){
			 			$('.huiqiMessage').removeClass('show');
			 		},1000);
			 		return;
				}
			}
		}
	});

	function getJsonLength(data){
		var length = 0;
		for(var i in data){
			length += 1;
		}
		return length;
	}
	var ss;
	var qipan = $('.qipan');
	function start(){
		hei = {};
		bai = {};
		kongbai = {};
		for(var i=0; i<15; i++){
			for(var j=0; j<15; j++){
				kongbai[i+'_'+j] = {x:i,y:j};
				$('<div>').addClass('qizi')
				.attr('id',i+'-'+j)
				.data('pos',{x:i,y:j})
				.appendTo(qipan);
			}
		}
		console.log(kongbai);
		for(var i=0; i<15; i++){
			$('<b>').addClass('shuxian').appendTo(qipan);
		}
		for(var i=0; i<15; i++){
			$('<i>').addClass('hengxian').appendTo(qipan);
		}
		for(var i=0; i<5; i++){
			$('<span>').addClass('heidian').appendTo(qipan);
		}
		startTime();
		$('.qizi').on('click',function(){
			if($(this).hasClass('heizi') || $(this).hasClass('baizi')){
				return;
			}
			if(flag){
				$(this).addClass('heizi');
				var pos = $(this).data('pos');
				hei[pos.x+'_'+pos.y] = true;
				delete kongbai[pos.x+'_'+pos.y];
				if(panduan(pos,hei)>=5){
					$('.qizi').off('click');
					$('.admitDefeat').off('click');
					$('.regret').off('click');
					$('.aDtishi').addClass('show')
					$('.renshuword').html('黑棋胜');
					return;
				}
				ss = "reset";
				endTime();
				startTime1();
				if(isAi){
					var pos = ai();
					$('#'+pos.x+'-'+pos.y).addClass('baizi');
					bai[pos.x+'_'+pos.y] = true;
					delete kongbai[pos.x+'_'+pos.y];
					console.log(kongbai);
					if(panduan(pos,bai) >= 5){
						$('.qizi').off('click');
						$('.admitDefeat').off('click');
						$('.regret').off('click');
						$('.aDtishi').addClass('show')
						$('.renshuword').html('白棋胜');
					}
					endTime1();
					startTime();
					return;
				}
				flag = false;
			}else{
				ss = "reset";
				$(this).addClass('baizi');
				var pos = $(this).data('pos');
				bai[pos.x+'_'+pos.y] = true;
				if(panduan(pos,bai)>=5){
					$('.qizi').off('click');
					$('.admitDefeat').off('click');
					$('.regret').off('click');
					$('.aDtishi').addClass('show')
					$('.renshuword').html('白棋胜');
				}
				endTime1();
				startTime();
				flag = true;
			}
		});

	}
	function ai(){
		var zuobiao;
		console.log(kongbai);
		var max = -Infinity;
		for(var i in kongbai){
			var weixie = panduan(kongbai[i],hei);
			if(weixie>max){
				max = weixie;
				zuobiao = kongbai[i];
			}
		}
		var zuobiao2;
		var max2 = -Infinity;
		for(var i in kongbai){
			var weixie = panduan(kongbai[i],bai);
			if(weixie>max2){
				max2 = weixie;
				zuobiao2 = kongbai[i];
			}
		}
		console.log(zuobiao);
		console.log(zuobiao2);
		return (max>max2)?zuobiao:zuobiao2;
	}

	function panduan(pos,biao){
		var h=1,s=1,zx=1,yx=1;
		var tx = pos.x , ty = pos.y;
		while(biao[tx+'_'+(ty-1)]){
			h++;ty--;
		}
		var tx = pos.x , ty = pos.y;
		while(biao[tx+'_'+(ty+1)]){
			h++;ty++;
		}

		var tx = pos.x , ty = pos.y;
		while(biao[(tx-1)+'_'+ty]){
			s++;tx--;
		}
		var tx = pos.x , ty = pos.y;
		while(biao[(tx+1)+'_'+ty]){
			s++;tx++;
		}

		var tx = pos.x , ty = pos.y;
		while(biao[(tx-1)+'_'+(ty-1)]){
			yx++;tx--;ty--;
		}
		var tx = pos.x , ty = pos.y;
		while(biao[(tx+1)+'_'+(ty+1)]){
			yx++;tx++;ty++;
		}

		var tx = pos.x , ty = pos.y;
		while(biao[(tx+1)+'_'+(ty-1)]){
			zx++;tx++;ty--;
		}
		var tx = pos.x , ty = pos.y;
		while(biao[(tx-1)+'_'+(ty+1)]){
			zx++;tx--;ty++;
		}

		return Math.max(h,s,zx,yx);
	}

	var tt;
	var time=0;
	var min=0;
	var second=0;
	function jishi(){
		if(state=="over" || ss=="reset"){
			time = 0;
			min=0;
			second=0;
			$(".jishi1").next().html("0:00");
			$(".jishi2").next().html("0:00");
		}
		time +=1;
		second=time%60;
		if(time%60 == 0){
			min = parseInt(min);
			min += 1;
			min = (min<10)?'0'+min:min;
		}
		second = (second<10)?'0'+second:second;
		$(".jishi1").next().html(min +':'+second);
		ss="no";
	}

	var tt1;
	var time1=0;
	var min1=0;
	var second1=0;
	function jishi1(){
		if(state=="over" || ss=="reset"){
			time1 = 0;
			min1=0;
			second1=0;
			$(".jishi1").next().html("0:00");
			$(".jishi2").next().html("0:00");
		}
		time1 +=1;
		second1=time1%60;
		if(time1%60 == 0){
			min1 = parseInt(min1);
			min1 += 1;
			min1 = (min1<10)?'0'+min1:min1;
		}
		second1 = (second1<10)?'0'+second1:second1;
		$(".jishi2").next().html(min1 +':'+second1);
		ss="no";
	}
	var t;
	var daoshutime = 60;
	var daoshumin = 9;
	var daoshusecond =0;
	function daoshujishi(){
		if(state=="over" || ss=="reset"){
			daoshutime = 60;
			daoshumin = 9;
			daoshusecond =0;
			$('.zongshijian1').next().html('10:00');
			$('.zongshijian2').next().html('10:00');
		}
		daoshutime-=1;
		if(daoshutime == -1){
			daoshutime = 59;
		}
		daoshusecond = daoshutime%60;
		if(daoshutime%60 == 0){
			daoshumin = parseInt(daoshumin);
			daoshumin -= 1;
			daoshumin = (daoshumin<10)?'0'+daoshumin:daoshumin;
		}
		daoshusecond = (daoshusecond<10)?'0'+daoshusecond:daoshusecond;
		$(".zongshijian1").next().html(daoshumin +':'+daoshusecond);
		ss="no";
		state="play";
	}
	var t2;
	var daoshutime2 = 60;
	var daoshumin2 = 9;
	var daoshusecond2 =0;
	function daoshujishi2(){
		if(state=="over" || ss=="reset"){
			daoshutime2 = 60;
			daoshumin2 = 9;
			daoshusecond2 =0;
			$('.zongshijian1').next().html('10:00');
			$('.zongshijian2').next().html('10:00');
		}
		daoshutime2-=1;
		if(daoshutime2 == -1){
			daoshutime2 = 59;
		}
		daoshusecond2 = daoshutime2%60;
		if(daoshutime2%60 == 0){
			daoshumin2 = parseInt(daoshumin2);
			daoshumin2 -= 1;
			daoshumin2 = (daoshumin2<10)?'0'+daoshumin2:daoshumin2;
		}
		daoshusecond2 = (daoshusecond2<10)?'0'+daoshusecond2:daoshusecond2;
		$(".zongshijian2").next().html(daoshumin2 +':'+daoshusecond2);
		ss="no";
		state="play";
	}
	function startTime(){
		clearInterval(tt);
		clearInterval(t);
		tt = setInterval(jishi,1000);
		t = setInterval(daoshujishi,1000);
	}
	function startTime1(){
		clearInterval(tt1);
		clearInterval(t2);
		tt1 = setInterval(jishi1,1000);
		t2 = setInterval(daoshujishi2,1000);
	}
	function endTime(){
		clearInterval(tt);
		clearInterval(t);
	}
	function endTime1(){
		clearInterval(tt1);
		clearInterval(t2);
	}
})