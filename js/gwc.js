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
					 var html = `<tr style="border:none;">
							<td class="clearfix"><input type="checkbox" class="che" /><img style="height:30px;width:30px;" src="${res[i].src}" alt="" /></td>
							<td>${res[i].p}</td>
							<td>${res[i].pic}</td>
							<td class="numTd">${num}</td>
							<td><a href="javascript:;"  class="move">删除</a></td>				
						</tr>`;
						$("table").append(html);
							
			
					}
				}

			}
		
		})
		
    }
})