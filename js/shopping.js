var results = JSON.parse($.cookie("shoplist"));

//判断有没有cookie 如果有 就隐藏空空如野 没有就显示
if(results != ""){
	console.log(1);
	$(".noneDiv").hide();
}else{
	console.log(2);
	$(".noneDiv").show();
}

//使用延时器  在ajax加载完毕之后 可以获取新生产的元素
setTimeout(function(){
	
	var jian = document.getElementsByClassName("jian");
	var jia = document.getElementsByClassName("jia");
	for(var i in jian){
		jian[i].onclick = function(){
			var num = +$(this).next().val();
			--num;
			if(num < 1){
				num = 1;
			}
			$(this).next().val(num);
			//并操作cookie里面的数据
			var ress = $(this).parent().next().data("id");
//			console.log( $(this).parent().next().data("id"));
			//改变cookie里面id为ress的num数量
			var res = JSON.parse($.cookie("shoplist"));
		
			for(var i in res){
				if(res[i].id == ress){
					
					res[i].num = num;
					//从新存cookie
					$.cookie("shoplist",JSON.stringify(res));
					
					
				}
			}
		}
	}
	for(var i in jia){
		jia[i].onclick = function(){
			var num = +$(this).prev().val();
			num++;
			$(this).prev().val(num);
			var ress = $(this).parent().next().data("id");
			//获取cookie
			var res = JSON.parse($.cookie("shoplist"));
			for(var i in res){
				if(res[i].id == ress){					
					res[i].num = num;
					//从新存cookie
					$.cookie("shoplist",JSON.stringify(res));										
				}
			}
		}
	}
	//删除操作
	$(".move").click(function(){
		//删除cookie
		var res = JSON.parse($.cookie("shoplist"));
		var currentID =  $(this).parent().prev().prev().data("id");
		alert(currentID);
		for(var i in res){
			res[i].id == currentID;
			res.splice(i,1);
			//判断数组是否有数组
			$.cookie("shoplist",JSON.stringify(res));													
		}
		//删除商品
		$(this).parents("tr").remove();
		
	})
	
	//

},1000)

//判断cookie里面的数据
$(function(){
	var result = JSON.parse($.cookie("shoplist"));
	console.log(result)
	//[{"id":"10003","num":"6"},{"id":"10001","num":"6"},{"id":"10023","num":"1"}]
	for( var i in result ){
		var num = +result[i].num;
		console.log( typeof num)
		create(result[i].id,num);
	}
	
	//封装函数 根据ID值创建元素
	function create(id,num){
		function json(id){
			if(id>=10000 && id<= 10010){
				return "http://localhost/SaSa/data/goods.json";
			}else if(id > 10010 && id<=10019){
				return "http://localhost/SaSa/data/XianShi.json";
			}else{
				return "http://localhost/SaSa/data/newGoods.json";
			}
		}
		$.ajax({
			type:"get",
			url:json(id),
			success:function(res){
				for(var i in res){
					if( res[i].id == id ){
					 //ajax请求回来数据 生成tr 插入到table中
					 var html = `<tr>
							<td class="clearfix"><input type="checkbox" class="che" name="p"/><img src="${res[i].src}" alt="" /></td>
							<td>${res[i].p}</td>
							<td>${res[i].pic}</td>
							<td class="numTd"><a href="javascript:;" class='jian'>-</a><input class="txt1" type="text" value="${num}"/><a href="javascript:;" class="jia">+</a></td>
							<td data-id=${res[i].id} style="display:none" >123</td>
							<td class="lastTD">￥<i class="zjs">${res[i].pic * num}</i></td>
							<td><a href="javascript:;"  class="move">删除</a></td>
							
						</tr>`;
						$("table").append(html);
							
			
					}
				}

			}
		
		})
		
    }
})
$(function(){
	$(".removeGwc").click(function(){
		//删除所有的cookie
//		var cookies = JSON.parse($.cookie("shoplist"));
		cookies = [];
		$.cookie("shoplist",cookies)
		location.reload(false);
	})
	 setTimeout(function(){
		var inpName = document.getElementsByName("p");
		var num = 0;
		var count = 0;
		for(let i = 0; i < inpName.length; i++){
			inpName[i].onclick = function(){
				if( $(inpName[i]).prop("checked") ){
					//获取当前商品的价格
					var res =$(inpName[i]).parents("tr").find($(".numTd")).find($(".txt1")).val();
					//获取总价格
					var pic = $(inpName[i]).parents("tr").find($(".zjs")).html();
	
					num += +res;
					count += +pic;
					console.log(num,count)
					$(".shopNum").html(num);
					$(".shopZ").html(count);
				}else{
					var res =$(inpName[i]).parents("tr").find($(".numTd")).find($(".txt1")).val();
					//获取总价格
					var pic = $(inpName[i]).parents("tr").find($(".zjs")).html();
					num = num - res;
					count = count - pic;
					$(".shopNum").html(num);
					$(".shopZ").html(count);
				}
			}
			
		}
		
	$("input[name=qx]").click(function(){
		$("input[name=p]").prop("checked",$(this).prop("checked"));
		//判断全选的状态 如果是选中状态的话 就统计
		if( $(this).prop("checked")){
			alert("选中");
			Num();
		}else{
			alert("取消");
			$(".shopNum").html(0);
			$(".shopZ").html(0);
		}
		
	})
	
	},500)
	
})

function Num(){
		//获得商品总计和数量
	var txt = document.getElementsByClassName("txt1");
	var sum = 0;
	var prc = 0;
	for(var i = 0; i < txt.length; i++){
		sum += +(txt[i].value);
		console.log(sum)
		$(".shopNum").html(sum);
					
	}
	
	var spans = document.getElementsByClassName("zjs");
	for(var i = 0; i < spans.length; i++){
		prc += +(spans[i].innerHTML);
		console.log(prc)
		$(".shopZ").html(prc);
	}
}
