var add = location.href.split("?")[1].split("=")[1];
	//判断商品在哪一个JSON里面
	function json(add){
		if(add>=10000 && add<= 10010){
			return "http://localhost/SaSa/data/goods.json";
		}else if(add > 10010 && add<=10019){
			return "http://localhost/SaSa/data/XianShi.json";
		}else{
			return "http://localhost/SaSa/data/newGoods.json"
		}
	}
	console.log(add)
	$.ajax({
		type:"get",
		url:json(add),
		success:function(res){
			for(var i in res){
				if( res[i].id == add ){
				console.log(res[i].src)
					$(".isId").html(`<img src=${res[i].src}>`);
					$(".bigs").html(`<img src=${res[i].src}>`);
					$("#imgs").children("img").attr("src",res[i].src)
					
					$(".img-goods").on("mouseenter","li",function(){
						$src =  $(this).children("img").attr("src");
						$(".bigs").children("img").attr("src",$src)
						$("#imgs>img").attr("src",$src);
					})
					
					//更新右侧说明的内容
		
				}
			}
		}
		
	})
$(function(){
	
	//鼠标移入ul下图片的时候 图片变成当前的图片
	
	//放大镜
	$("#imgs").on("mouseenter",function(e){
		var e = e || window.event;
		$(".shadow").show();
		$(".bigs").show();
		var x = e.offsetX;
		var y = e.offsetY;
		$("#box").mousemove(function(e){
			var e = e || window.event;
			var l = e.pageX - $("#imgs").offset().left - $(".shadow").width()/2;
			var t = e.pageY - $("#imgs").offset().top - $(".shadow").height()/2;
			//最大的宽度和高度
			var maxL = $('#imgs').width() - $(".shadow").width();
			var maxT = $('#imgs').height() - $(".shadow").height();
			
			y = Math.min(maxT,Math.max(0,t));
 		    x = Math.min(maxL,Math.max(0,l));
			console.log(maxL,maxT)
			$("#box .shadow").css({
				'top':y,
				'left':x//如果大于零 就是 maxL 如果小于零 就是0
			})
			
			//控制背景图的移动
			var bgX = - 2*x;
			var bgY = - 2*y;
			$(".bigs img").css({
				"top" : bgY,
				"left": bgX
			})
			
		}).mouseleave(function(){
			$(".bigs").hide();
			$(".shadow").hide();
		})
	})
})

$(function(){
	//点击微信扫一扫出现的图片
	$(".sys").mouseenter(function(){
		console.log(this)
		$(this).next().show();
	}).mouseleave(function(){
		$(this).next().hide();
	})
})

//侧边栏
// 侧边栏
$(function(){
	$("#cebian>div").on({
		"mouseenter" : function(){$(this).children("div").show().animate({"left":-(160 - $(this).children("div").width() +40 )})},
		"mouseleave" : function(){$(this).children("div").stop().animate({"left":-160}).fadeOut(200)  }

	})
	
})
//点击 + - 号 添加数据
$(function(){
	$(".jian").click(function(){
		//获取输入框的数组 并-- 如果小于一  提示商品最小购买数量为1件
		var $num =$(".txt1").val();
			
			if( $num <= 1 ){
				$(".sop").show();
				setTimeout(function(){
					$(".sop").hide(200);
				},1000)
				$num = 1;
			}else{
				$(".txt1").val( --$num );
			}
		
	})
	
	$(".jia").click(function(){
		var $num = +$(".txt1").val();
		var res = ++$num;
		$(".txt1").val(res);
	})
	
	$(".add").click(function(){
		var arr = [];
		var flag = true; //开关变量 向数组中 如个数据ID相同 就改变商品数量 并禁止添加数据flag=false   如果为true 证明新增的数据和原数据ID不能 可以添加数据
		
		var $num = $(".txt1").val();
		//存cookie
		var _json = {
			"id" : add,
			"num": $num
		}
		//先用一个数组 存放cookie里面的信息
		var cookieArr =$.cookie("shoplist");
		if( cookieArr ){//代表里面有数据
			arr = JSON.parse(cookieArr) ; //把数据传递给arr  遍历数组里面每一个数据的ID 和 新传递的数据的ID是否一致 如果是 数量++ 并且flag = false 
			console.log(arr);
			for(var i in arr){
				if(arr[i].id == _json.id ){
					++arr[i].num;
					flag = false;
				}
			}
		}
		
		if(flag){
			arr.push(_json);
		}
		//console.log(arr);
		$.cookie("shoplist",JSON.stringify(arr));
		location.href = "shopping.html";
	})
})

