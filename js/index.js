//轮播图
$(function(){
	var timer = setInterval(autoPlay,2000)
	var index = 0;
	//鼠标移动到当前a上面
	$(".ban-list a").on("click",function(){
		clearInterval(timer);
	//	console.log($(this).index() )
		index = $(this).index() - 1;
		autoPlay();
		timer = setInterval(autoPlay,2000)
	})
	function autoPlay(){
		index++;
		index = index > 6 ? 0 :index;
		$(".banner li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
		$(".ban-list a").eq(index).addClass("active").siblings().removeClass("active");
	}
	
	$(function(){
	$("#nav>li").mouseenter(function(){
		$(this).css("backgroundColor","#fff").siblings().css("background-color","#bfbfbf");
	}).mouseleave(function(){
		$("#nav>li").css("background-color","#bfbfbf")
	})
})

})
//公告的移动
$(function(){
	autoPlay();
	var timer = setInterval(autoPlay,5000)
	 function autoPlay(){
			$("#gao ul").css("top",0)
			$("#gao ul").animate({top:-90},4800);
		}
})

//每日必看 动态加载图片
$(function(){
	//加载json文件
	$.ajax({
		type:"get",
		url:"http://localhost/SaSa/data/goods.json",
		success:function(res){
			//加载商品列表
			var str="";//必须要指定空字符串
			
			for(let i = 0 ; i < 10; i++){
					 str +=`<div class="goods">
								<a href="http://localhost/SaSa/goods.html?id=${res[i].id}">
									<img src="${res[i].src}" alt="每日必看">
								</a>
								
								<div>
									<h3>${res[i].h3}</h3>
									<p>${res[i].p}</p>
									<h6>${res[i].h6}</h6>
									<a href="http://localhost/SaSa/goods.html?id=${res[i].id}">立即疯抢</a>
								</div>
							</div>`;
			}			
			$("#goodList").html(str);
			
			
		}
	})
})

//新品上市
$(function(){
	$.ajax({
		type:"get",
		url:"http://localhost/SaSa/data/newGoods.json",
		success:function(res){
			var html = `<div class="dayLook">
							<div class="dl1"></div>
							<div class="dlm">新品 ＮＥＷ ＡＲＲＩＶＡＬ</div>
							<div class="dlr"></div>
							
						</div>`;
			for(var i in res){
				html += `<div class="new-good">
							<div>
								<div class="clearfix goods-top">
									<h5>新品上市</h5>
									<h4><img src="${res[i].dsrc}" alt="新品上市" /><span>韩国品牌</span></h4>
								</div>
								
								<a href="http://localhost/SaSa/goods.html?id=${res[i].id}" class="goods-img"><img src="${res[i].src}"></a>
								<p>${res[i].p}</p>
								<h3 class="price clearfix"><span>￥1228</span><span>￥3235</span></h3>
							</div>
						</div>`
			}
			$("#newGoods").html(html);
			}
	})
})

//限时抢购
$(function(){
	$.ajax({
		type:"get",
		url:"http://localhost/SaSa/data/XianShi.json",
		success:function(res){
			var str = "";
			for( var i in res ){
				str +=`<div class="goods">
							<a href="http://localhost/SaSa/goods.html?id=${res[i].id}">
								<img src="${res[i].src}" alt="限时折扣">
								<h2><i>${res[i].dz}</i>折</h2>
							</a>
							
							<div style="display: relative">
								<h3 class="time">剩余:9:00:00</h3>
								<p class="sm"><span >“</span>${res[i].psm}<span>”</span></p>
								<p style="color:#686666">${res[i].p}</p>
								<h3 class="price clearfix"><span>￥</span><span>${res[i].pir}</span><i>￥${res[i].pirc}</i></h3>
								<p class="lastP"><a href="http://localhost/SaSa/goods.html?id=${res[i].id}" class="a1">已售1件</a><a href="http://localhost/SaSa/goods.html?id=${res[i].id}" class="a2">马上抢</a></p>
								
							</div>
						</div>`
			}
			$("#shopping").html(str);
				showTime()
				var timer = setInterval(showTime,1000);
				function showTime(){
					//获取当前的时间
					var now = new Date();
					//把时间设定在明天的中午十二点
					var tYear = now.getFullYear();
					var tMonth = now.getMonth();
					var tDay = now.getDate() + 1;//获取明天的天数
					var later = new Date(tYear,tMonth,tDay,9,0,0);
					//计算时间差
					var res = later.getTime() - now.getTime();
					//小时的秒数
					var h = 60*60*1000;
					var m = 60*1000;
					var s = 1000;
					
					var hou = Math.floor(res/h);
					var min = Math.floor((res - hou*h)/m);
					var sec = Math.floor( (res - hou*h - min*m)/s );
					var strTime = ling(hou) + ":" + ling(min) + ":" + ling(sec);
					$(".time").html("剩余 " + strTime);
					function ling(num){
						return num >= 10 ? num + "" : "0" + num;
					}
					
				}
			
		}
	})
})
// 侧边栏
$(function(){
	$("#cebian>div").on({
		"mouseenter" : function(){$(this).children("div").show().animate({"left":-(160 - $(this).children("div").width() +40 )})},
		"mouseleave" : function(){$(this).children("div").stop().animate({"left":-160}).fadeOut(200)  }

	})
	
})
$(function(){
	//获取地址栏信息
//http://127.0.0.1:8020/SaSa/index.html?id=qweas
		var add = location.href;
		console.log(add);
 
		if( add.indexOf("?") != -1 ){
			var res = add.split("?")[1].split("=")[1];
			$("#head .dengl").html("欢迎回来"+res).css("color","orangered");
		}

	// for( var i in location.href ){
	// 	if( location.href.indexOf("?") ){

	// 		var add = location.href.split("?")[1].split("=")[1];
	// 		$("#head .dengl").html("欢迎回来"+add).css("color","orangered");
	// 	}
	// }
	
})

	
