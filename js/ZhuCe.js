$(function(){
	$("#nav>li").mouseenter(function(){
		$(this).css("backgroundColor","#fff").siblings().css("background-color","#bfbfbf");
	}).mouseleave(function(){
		$("#nav>li").css("background-color","#bfbfbf")
	})
	
	var name_f = true;//用户名
	var pass_f = true;//密码
	var tpass_f = true;//确认密码
	var yz_f = true; 
	////失去焦点的时候验证输入框的内容
	$(":input[type != checkbox]").focus(function(){
		//判断span的内容是不是输入有误  如果是 就清空内容 删除span里的文字 如果不是 也删除文字
		if( $(this).nextAll("span").text() =="输入有误" ){
			
			$(this).val("");
		}
		$(this).nextAll("span").text("");
		$(this).css({
			'outline':'none',
			'border':'1px solid red',
			'box-shadow':"1px 1px 10px red"
		})
		
	}).blur(function(){
		$(this).css({
			'border':'1px solid black',
			'box-shadow':"0px 0px 0px #000"
		})
	})
	
	$(":input[name=email]").blur(function(){
		name_f = true;
		var email = $(this).val();
		var regF = /^\w{5,18}$/;
		if( !(regF.test(email)) && $(this).val() != ""){
			$(this).nextAll("span").html("<span style='color:red;'>输入有误</span>")//
			name_f = false;
		}
	})
	
	$(":input[name=pass]").blur(function(){
		pass_f = true;
		var pass = $(this).val();
		var reg = /^\w{6,16}$/;
		if( !reg.test(pass) && $(this).val() != ""){
			$(this).nextAll("span").html("<span style='color:red;'>输入有误</span>");
			pass_f = false;
		}
	})
	//确认密码
	$(":input[name=tpass]").blur(function(){
		tpass_f = true;
		var pass = $(":input[name=pass]").val();
		var tpas = $(this).val();
		if( pass != tpas ){
			$(this).nextAll("span").html("<span style='color:red;'>两次输入的密码不相同！</span>");
			tpass_f = false;
		}
	})
	//验证码
	$(":input[name=yz]").focus(function(){
			$(this).parent().next().html("")
			ranTxt()
		
	}).blur(function(){
		var yz = $(this).val();
		yz_f = true;
		//获取验证框的内容
		var yzx = $(this).next().text();
		yzx = yzx.toLocaleLowerCase();
		if( yz != yzx  && $(this).val() != ""){
			$(this).parent().next().html("<span style='color:red;'>验证错误！</span>");
			yz_f = false;
		}
	})
	
//	随机函数
	
	function ranTxt(){
		var str = "0123456789QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
		var txt = "";
		for(var i = 0; i < 4; i++){
			txt += str[ran(0,str.length - 1)];
		}
		$(":input[name=yz]").nextAll("span").html(txt);
	}
	
	$(":input[name=yz]").nextAll("a").click(function(){
		ranTxt();	
	}).mouseover(function(){
		$(this).css("color","royalblue");
	}).mouseout(function(){
		$(this).css("color","#ccc");
	})
	
	function ran(min,max){
			return Math.floor(Math.random()*(max - min + 1) + min);
		}
	$("#btn").click(function(){
		if( name_f && pass_f && tpass_f && yz_f && $(":input[type=checkbox]").prop("checked")){
			$.ajax({
				type:"post",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					"status":"register",
					"userID": $(":input[name=email]").val(),
					"password":$(":input[name=pass]").val(),
				},
				success : function(res){
					switch(res){
						case '0' : alert("用户名重名") ;break;
						case "2" : alert("服务器出错") ;break;
						default:alert("恭喜，注册成功！");location.href = "index.html?id="+ $(":input[name=email]").val();
					}
				}
			})
		}
	})
	
})


